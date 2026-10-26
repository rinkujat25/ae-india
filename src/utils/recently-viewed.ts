import type { ProductModel } from "@/types/models/product.model";

const storageKey = "wingback_recently_viewed_v1";

/** Enough to fill the rail twice over; older entries drop off the end. */
const maxEntries = 12;

/**
 * Products this visitor has opened, newest first, kept in their own browser.
 *
 * Only the fields the card renders are stored — not the whole product — so the
 * entry stays small and cannot go stale in ways that matter. Price and stock are
 * re-read from the API the moment the visitor opens the product again.
 *
 * Every access is guarded: storage throws in a private window and can come back
 * empty, and the rail simply does not render when that happens.
 */
export type RecentlyViewedProduct = Pick<
    ProductModel,
    "id" | "slug" | "name" | "brand" | "sku" | "price" | "mrp" | "imageUrl"
>;

function isEntry(value: unknown): value is RecentlyViewedProduct {
    if (!value || typeof value !== "object") return false;

    const entry = value as Partial<RecentlyViewedProduct>;

    return typeof entry.slug === "string" && entry.slug.length > 0 && typeof entry.name === "string";
}

export function readRecentlyViewed(): RecentlyViewedProduct[] {
    if (typeof window === "undefined") return [];

    try {
        const raw = window.localStorage.getItem(storageKey);

        if (!raw) return [];

        const parsed: unknown = JSON.parse(raw);

        return Array.isArray(parsed) ? parsed.filter(isEntry).slice(0, maxEntries) : [];
    } catch {
        return [];
    }
}

/** Records a visit, moving an already-seen product back to the front. */
export function recordRecentlyViewed(product: RecentlyViewedProduct): void {
    if (typeof window === "undefined" || !product.slug) return;

    try {
        const existing = readRecentlyViewed().filter((entry) => entry.slug !== product.slug);

        window.localStorage.setItem(storageKey, JSON.stringify([product, ...existing].slice(0, maxEntries)));
    } catch {
        // A blocked store only costs the rail, so there is nothing to report.
    }
}

/** Fills out the card's shape from a stored entry. */
export function toProductModel(entry: RecentlyViewedProduct): ProductModel {
    return {
        ...entry,
        category: "",
        subCategory: "",
        description: "",
        inStock: true,
        canOrder: true,
        variants: [],
    };
}
