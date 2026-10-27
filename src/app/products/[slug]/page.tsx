import type { Metadata } from "next";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { ProductDetailPageContent } from "@/components/product/ProductDetailPageContent";
import { ProductCardStyles } from "@/components/product/ProductCardStyles";
import { BoughtTogetherStyles } from "@/components/product/BoughtTogetherStyles";
import { ProductDetailStyles } from "@/components/product/ProductDetailStyles";
import { staticProductDetail } from "@/constants/productDetail";
import { getProductDetail } from "@/services/hyperinventory/product-detail.service";
import { getProducts } from "@/services/hyperinventory/product.service";
import type { ProductDetailModel } from "@/types/models/product-detail.model";
import type { ProductModel } from "@/types/models/product.model";
import { giftverseUrl } from "@/lib/giftverse";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

/** A full slider's worth; the rail shows about four at a time and scrolls. */
const similarProductsShown = 10;

type ProductDetailPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

/**
 * The canonical product page, on GiftVerse.
 *
 * The same Hyperinventory catalogue is published on both hosts under the same
 * `url_path`, so every product here has a twin there. Pointing the canonical
 * across says which of the two a search engine should index and keeps the pair
 * from competing as duplicates of each other.
 *
 * Note what it costs: this host's product pages are no longer the ones that
 * rank. Shares keep pointing here -- `og:url` stays local, because somebody
 * sharing a gift from this store means this store -- but search traffic goes
 * to GiftVerse. Changing the path shape there breaks every canonical on this
 * site at once.
 */
function canonicalProductUrl(slug: string) {
    return giftverseUrl(`/products/${slug}`);
}

/**
 * Built from the product, not from its slug.
 *
 * The seller authors `meta_title`, `meta_description` and keywords against each
 * product, so those are used verbatim where they exist. `meta_title` is left
 * unbranded rather than having "| Wingback" appended: it is already written to
 * a length that survives a search result, and the suffix is what pushes it past
 * the point where Google rewrites the title itself.
 *
 * Everything falls back to the product's own display name and description, so a
 * product the seller has not written SEO copy for still gets its own title
 * instead of the slug with the hyphens taken out.
 *
 * `getProductDetail` is memoised per request, so this costs the page nothing.
 */
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductDetail(slug).catch(() => null);

    if (!product) {
        return {
            title: "Product | Wingback",
            alternates: { canonical: canonicalProductUrl(slug) },
        };
    }

    const title = product.metaTitle || `${product.name} | Wingback`;
    const description = product.metaDescription || product.oneLineDescription || product.description;
    const path = `/products/${product.slug}`;
    const canonical = canonicalProductUrl(product.slug);
    // Enough for a crawler to choose from without turning the head into a
    // gallery; the first is the one every card actually shows.
    const images = product.images.slice(0, 4).map((url) => ({ url, alt: product.name }));

    return {
        title,
        description: description || undefined,
        keywords: product.keywords.length > 0 ? product.keywords : undefined,
        authors: [{ name: "Sampley" }],
        alternates: {
            // Absolute and off-site, so `metadataBase` is not applied. The
            // language entries follow it: an hreflang pointing back at this
            // host while the canonical points at GiftVerse is two answers to
            // the same question.
            canonical,
            languages: {
                "en-IN": canonical,
                "x-default": canonical,
            },
        },
        openGraph: {
            type: "website",
            siteName: "Wingback Gift Store",
            url: absoluteUrl(path),
            title,
            description: description || undefined,
            images: images.length > 0 ? images : undefined,
            locale: "en_IN",
        },
        twitter: {
            card: "summary_large_image",
            // Kept identical to the Open Graph pair: two different cards for the
            // same page is a maintenance trap, and X falls back to og:* anyway.
            title,
            description: description || undefined,
            images: images.length > 0 ? [images[0]] : undefined,
        },
        other: createProductMetaTags(product),
    };
}

/**
 * The product-specific tags, which Next has no typed field for.
 *
 * These are the Open Graph product namespace — what a shopping crawler and a
 * link preview read to show a price and a stock state beside the image. Each is
 * omitted when the catalogue cannot support it: a price of zero means the price
 * is arranged, and publishing it as `0` states something else entirely.
 *
 * `og:type` stays `website`. The product namespace is additive, and claiming
 * `og:type: product` while most of the catalogue can quote no price would
 * describe a storefront this one is not.
 */
function createProductMetaTags(product: ProductDetailModel): Record<string, string> {
    const tags: Record<string, string> = {
        "product:brand": product.brand,
        "product:availability": getOpenGraphAvailability(product),
        "product:condition": "new",
    };

    if (product.sku) tags["product:retailer_item_id"] = product.sku;

    if (product.price > 0) {
        tags["product:price:amount"] = String(product.price);
        tags["product:price:currency"] = "INR";
    }

    return tags;
}

/**
 * The Open Graph spelling of the same three flags the buy box reads.
 *
 * A back order is "available for order", not "backorder": the Open Graph product
 * namespace accepts in stock, out of stock, preorder, available for order and
 * discontinued, and a value outside that set is read as no value at all. It is
 * also the truer of the two — the seller will take the order, it is the shelf
 * that is empty — and it matches the buy box, which sells a back order rather
 * than greying it out.
 */
function getOpenGraphAvailability(product: ProductDetailModel): string {
    if (!product.canOrder) return "out of stock";
    if (product.inStock) return "in stock";
    if (product.allowsBackOrders) return "available for order";

    return "out of stock";
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { slug } = await params;
    const product = await getProductDetail(slug).catch((error: unknown) => {
        console.error(
            "Unable to load the Hyperinventory product detail:",
            error instanceof Error ? error.message : "Unknown error",
        );
        return staticProductDetail;
    });

    // Similar products come from the same listing endpoint the catalogue uses,
    // narrowed to this product's category. Products with no category fall back to
    // an unfiltered read rather than leaving the rail empty.
    const similar = await getProducts({
        categories: product.category ? [product.category] : undefined,
        size: similarProductsShown + 1,
    }).catch(() => null);

    const similarProducts: ProductModel[] = (similar?.products ?? [])
        // The page the visitor is already on is not a similar product.
        .filter((candidate) => candidate.slug !== product.slug && candidate.id !== product.id)
        .slice(0, similarProductsShown);

    return (
        <>
            <ProductDetailStyles />
            <BoughtTogetherStyles />
            <ProductCardStyles />
            <SiteHeader active="products" />
            <ProductDetailPageContent
                product={product}
                similarProducts={similarProducts}
                key={product.slug}
            />
            <SiteFooter />
        </>
    );
}
