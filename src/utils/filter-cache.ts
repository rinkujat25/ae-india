import type { ProductBrandModel } from "@/types/models/product-brand.model";
import type { ProductCategoryModel } from "@/types/models/product-category.model";
import type { ProductTagModel } from "@/types/models/product-tag.model";

const storageKey = "wingback_product_filters_v1";

export type ProductFilterOptions = {
    categories: ProductCategoryModel[];
    brands: ProductBrandModel[];
    tags: ProductTagModel[];
};

/**
 * The full set of filter options, cached for the tab.
 *
 * The provider's aggregations describe **the current result set**, so filtering
 * by one category collapses the sidebar to what is inside it — 21 categories
 * become 5, and the visitor can no longer reach the ones they did not pick.
 * Caching the unfiltered set on the first listing view keeps every option
 * reachable while they narrow down.
 *
 * `sessionStorage`, not `localStorage`: the catalogue changes, and a stale
 * sidebar should not outlive the tab. Closing it throws the cache away, and the
 * next visit starts from a fresh unfiltered read.
 *
 * Every access is guarded — storage throws in a private window — and the page
 * falls back to the server's own aggregations when it is unavailable.
 */
export function readCachedFilters(): ProductFilterOptions | null {
    if (typeof window === "undefined") return null;

    try {
        const raw = window.sessionStorage.getItem(storageKey);

        if (!raw) return null;

        const parsed = JSON.parse(raw) as Partial<ProductFilterOptions>;

        if (!Array.isArray(parsed?.categories) || !Array.isArray(parsed?.brands)) return null;

        return {
            categories: parsed.categories,
            brands: parsed.brands,
            tags: Array.isArray(parsed.tags) ? parsed.tags : [],
        };
    } catch {
        return null;
    }
}

export function writeCachedFilters(options: ProductFilterOptions): void {
    if (typeof window === "undefined") return;

    try {
        window.sessionStorage.setItem(storageKey, JSON.stringify(options));
    } catch {
        // A blocked or full store only costs the wider sidebar, so there is
        // nothing worth reporting to the visitor.
    }
}
