import "server-only";

import { getHyperinventoryEnvironment } from "@/lib/env";
import { HyperinventoryApiError, hyperinventoryRequest } from "@/services/hyperinventory/client";
import type {
    HyperinventoryCategoryDto,
    HyperinventoryCategoryListDto,
} from "@/types/dto/hyperinventory/category.dto";
import type { CategoryModel } from "@/types/models/category.model";
import { mapCategory, mapCategoryList } from "@/utils/mappers/category.mapper";

/** An hour: long enough to prerender, short enough that an edit lands the same day. */
const categoryRevalidateSeconds = 3600;

/**
 * The seller's own category tree.
 *
 * This is the only place slugs live: the product listing filters by category
 * **name**, and its `category_filter` aggregation returns names with no slug at
 * all. A category URL therefore has to be resolved through this list before the
 * catalogue can be queried.
 */
export async function getCategories(): Promise<CategoryModel[]> {
    const { sellerId } = getHyperinventoryEnvironment();

    const response = await hyperinventoryRequest<HyperinventoryCategoryListDto>(
        `consumer/sellers/${encodeURIComponent(sellerId)}/categories`,
        {
            apiVersion: "v1",
            query: { seller: sellerId, limit: 100 },
            // The tree changes when the seller edits it, which is rare, and the
            // home page renders it. Left on the client's `no-store` default the
            // fetch makes every page that reads it dynamic, so the home page
            // stops prerendering at build time.
            cache: "force-cache",
            next: { revalidate: categoryRevalidateSeconds },
        },
    );

    return mapCategoryList(response?.results ?? []);
}

/**
 * One category, fetched by its slug.
 *
 * Preferred over scanning the list: it answers directly, and it is the only
 * source of the provider's own `meta_title` and `meta_description`. A slug the
 * provider does not know answers 404, which is a missing page rather than a
 * failure, so it comes back as null.
 *
 * Sub-category slugs are **not** addressable here — they answer 404 — which is
 * why sub-categories narrow the parent page through `?sub=` instead.
 */
export async function getCategoryBySlug(slug: string): Promise<CategoryModel | null> {
    const { sellerId } = getHyperinventoryEnvironment();

    try {
        const response = await hyperinventoryRequest<HyperinventoryCategoryDto>(
            `consumer/categories/${encodeURIComponent(slug)}`,
            {
                apiVersion: "v1",
                query: { seller: sellerId },
            },
        );

        return response?.id ? mapCategory(response) : null;
    } catch (error) {
        if (error instanceof HyperinventoryApiError && error.status === 404) return null;

        throw error;
    }
}
