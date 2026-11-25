import { storeName, storeOwner } from "@/constants/brand";
import { absoluteUrl } from "@/lib/site";
import type { ProductDetailModel } from "@/types/models/product-detail.model";
import { serializeJsonLd } from "@/utils/json-ld";

/**
 * The mapper fills an unknown colour with this, so it reaches us as a value
 * rather than an absence. Publishing it would claim the colour is "Default".
 */
const placeholderColor = "Default";

/**
 * `Product` structured data for one product.
 *
 * Every unknown field is omitted -- `JSON.stringify` drops `undefined` -- rather
 * than published empty. The brand is left out when it is only the mapper's
 * store-name fallback, which is not the product's maker.
 *
 * No `BreadcrumbList`: `Breadcrumbs` emits the one the reader can see. The
 * description is the plain-text field, never `descriptionHtml`.
 */
export function ProductJsonLd({ product }: { product: ProductDetailModel }) {
    const graph = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        url: absoluteUrl(`/products/${product.slug}`),
        sku: product.sku || undefined,
        gtin13: product.gtin13 || undefined,
        brand: product.brand && product.brand !== storeName ? { "@type": "Brand", name: product.brand } : undefined,
        category: [product.category, product.subCategory].filter(Boolean).join(" > ") || undefined,
        description: product.description || undefined,
        color: product.color && product.color !== placeholderColor ? product.color : undefined,
        material: product.material || undefined,
        image: product.images.length > 0 ? product.images : undefined,
        offers: createOffer(product),
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }} />;
}

/**
 * The offer, or nothing: a price of zero means the price is arranged, and
 * publishing it as "0" would say the product is free.
 */
function createOffer(product: ProductDetailModel) {
    if (!(product.price > 0)) return undefined;

    return {
        "@type": "Offer",
        url: absoluteUrl(`/products/${product.slug}`),
        priceCurrency: "INR",
        price: String(product.price),
        availability: getAvailability(product),
        seller: { "@type": "Organization", name: storeOwner },
        areaServed: { "@type": "Country", name: "India" },
    };
}

/** The same rule the buy box follows, so the two cannot contradict. */
function getAvailability(product: ProductDetailModel): string {
    if (!product.canOrder) return "https://schema.org/OutOfStock";
    if (product.inStock) return "https://schema.org/InStock";
    if (product.allowsBackOrders) return "https://schema.org/BackOrder";

    return "https://schema.org/OutOfStock";
}
