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
            alternates: { canonical: `/products/${slug}` },
        };
    }

    const title = product.metaTitle || `${product.name} | Wingback`;
    const description = product.metaDescription || product.oneLineDescription || product.description;
    const path = `/products/${product.slug}`;
    // Enough for a crawler to choose from without turning the head into a
    // gallery; the first is the one every card actually shows.
    const images = product.images.slice(0, 4).map((url) => ({ url, alt: product.name }));

    return {
        title,
        description: description || undefined,
        keywords: product.keywords.length > 0 ? product.keywords : undefined,
        authors: [{ name: "Sampley" }],
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                // A product sells on its photograph, so the large preview is
                // worth asking for explicitly rather than taking the default.
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
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
            siteName: "Wingback Employee Gift Store",
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
 * omitted when the catalogue cannot support it, for the same reason the
 * structured data omits an offer: a price of zero here means the price is
 * arranged, and publishing it as `0` states something else entirely.
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
 * The Open Graph spelling of the same three flags the buy box and the structured
 * data read. Its vocabulary is words rather than schema.org URLs, so it cannot
 * share `getAvailability`.
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

    const productJsonLd = createProductJsonLd(product);

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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
        </>
    );
}

/**
 * The provider fills a colour it does not know with this, so it reaches us as a
 * value rather than an absence. Publishing it would tell a search engine the
 * product's colour is "Default".
 */
const placeholderColor = "Default";

/**
 * `Product` structured data for one product.
 *
 * Every field is omitted rather than published empty — `JSON.stringify` drops
 * `undefined` — because a blank `gtin13` or `material` is a claim that the
 * product has one and it is nothing, which is worse than saying nothing at all.
 *
 * No `BreadcrumbList` here: `Breadcrumbs` emits its own from the trail it
 * renders, and two of them on one page is a conflict. Its version is the one
 * tied to what the reader can actually see, which is what Google asks for.
 *
 * `description` is the plain-text field, never `descriptionHtml`. Structured
 * data carries text, and markup in it is what gets a rich result rejected.
 */
function createProductJsonLd(product: ProductDetailModel) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        url: absoluteUrl(`/products/${product.slug}`),
        sku: product.sku || undefined,
        gtin13: product.gtin13 || undefined,
        brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
        // Joined only when both sides exist, so an uncategorised product does not
        // publish a stray separator as its category.
        category: [product.category, product.subCategory].filter(Boolean).join(" > ") || undefined,
        description: product.description || undefined,
        color: product.color && product.color !== placeholderColor ? product.color : undefined,
        material: product.material || undefined,
        image: product.images.length > 0 ? product.images : undefined,
        offers: createOfferJsonLd(product),
    };
}

/**
 * The offer, or nothing.
 *
 * Most of this catalogue carries a selling price of zero, which is the provider
 * saying the price is arranged rather than that the product is free. Publishing
 * `price: "0"` states the second, so a product without a real price publishes no
 * offer and the quote request on the page stands on its own.
 */
function createOfferJsonLd(product: ProductDetailModel) {
    if (!(product.price > 0)) return undefined;

    return {
        "@type": "Offer",
        url: absoluteUrl(`/products/${product.slug}`),
        priceCurrency: "INR",
        price: String(product.price),
        availability: getAvailability(product),
        eligibleQuantity: { "@type": "QuantitativeValue", minValue: product.moq || 1, unitCode: "C62" },
        seller: { "@type": "Organization", name: "Sampley" },
        areaServed: { "@type": "Country", name: "India" },
    };
}

/**
 * Availability read from the product rather than asserted.
 *
 * This was pinned to `PreOrder` for every product, in stock or not. A stated
 * availability that contradicts the page is the kind of mismatch that costs the
 * rich result, so it follows the same rule the buy box does: orderable when the
 * seller accepts orders and either holds stock or takes back orders.
 *
 * `BackOrder` is kept rather than collapsed into `InStock`. It is already an
 * available state — Google reads it as purchasable — and claiming stock the
 * seller does not hold is the contradiction this function exists to avoid.
 */
function getAvailability(product: ProductDetailModel): string {
    if (!product.canOrder) return "https://schema.org/OutOfStock";
    if (product.inStock) return "https://schema.org/InStock";
    if (product.allowsBackOrders) return "https://schema.org/BackOrder";

    return "https://schema.org/OutOfStock";
}
