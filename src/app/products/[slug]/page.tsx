import type { Metadata } from "next";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { ProductDetailPageContent } from "@/components/product/ProductDetailPageContent";
import { ProductCardStyles } from "@/components/product/ProductCardStyles";
import { BoughtTogetherStyles } from "@/components/product/BoughtTogetherStyles";
import { ProductDetailStyles } from "@/components/product/ProductDetailStyles";
import { getProductDetail } from "@/services/hyperinventory/product-detail.service";
import { getProducts } from "@/services/hyperinventory/product.service";
import type { ProductDetailModel } from "@/types/models/product-detail.model";
import type { ProductModel } from "@/types/models/product.model";
import { ProductJsonLd } from "@/components/product/ProductJsonLd";
import { storeOwner } from "@/constants/brand";
import { absoluteUrl } from "@/lib/site";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CategoryStyles } from "@/components/category/CategoryStyles";
import { CategoryUnavailable } from "@/components/category/CategoryUnavailable";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";

export const dynamic = "force-dynamic";

/** A full slider's worth; the rail shows about four at a time and scrolls. */
const similarProductsShown = 10;

type ProductDetailPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

/**
 * Built from the product, not from its slug.
 *
 * The seller authors `meta_title`, `meta_description` and keywords against each
 * product, so those are used verbatim where they exist. `meta_title` is left
 * unbranded rather than having "| AE India" appended: it is already written to
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
            title: "Product | AE India",
            alternates: { canonical: `/products/${slug}` },
        };
    }

    const title = product.metaTitle || `${product.name} | AE India`;
    const description = product.metaDescription || product.oneLineDescription || product.description;
    const path = `/products/${product.slug}`;
    // Enough for a crawler to choose from without turning the head into a
    // gallery; the first is the one every card actually shows.
    const images = product.images.slice(0, 4).map((url) => ({ url, alt: product.name }));

    return {
        title,
        description: description || undefined,
        keywords: product.keywords.length > 0 ? product.keywords : undefined,
        authors: [{ name: storeOwner }],
        alternates: {
            // Relative: `metadataBase` in the root layout makes these absolute
            // against whichever host the build is deployed to.
            canonical: path,
            languages: {
                "en-IN": path,
                "x-default": path,
            },
        },
        openGraph: {
            type: "website",
            siteName: "AE India",
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
        // The provider's 404 means there is no such product: a real 404 here.
        if (error instanceof HyperinventoryApiError && error.status === 404) notFound();

        console.error(
            "Unable to load the Hyperinventory product detail:",
            error instanceof Error ? error.message : "Unknown error",
        );
        return null;
    });

    // Any other failure is "could not load", never a stand-in product. This
    // page used to fall back to a hard-coded sample here, which put someone
    // else's product -- with a working Add to Cart -- at the requested URL.
    if (!product) {
        return (
            <>
                <CategoryStyles />
                <SiteHeader active="products" />
                <main className="cat-page">
                    <div className="wrap">
                        <Breadcrumbs trail={[{ label: "Shop", href: "/products" }, { label: "Product" }]} />
                        <CategoryUnavailable subject="this product" retryHref={`/products/${slug}`} />
                    </div>
                </main>
                <SiteFooter />
            </>
        );
    }

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
            <ProductJsonLd product={product} />
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
