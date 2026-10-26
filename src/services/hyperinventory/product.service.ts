import "server-only";

import { getHyperinventoryEnvironment } from "@/lib/env";
import { hyperinventoryRequest } from "@/services/hyperinventory/client";
import type {
    HyperinventoryPriceRangeDto,
    HyperinventoryProductQueryDto,
    HyperinventoryProductSearchSuggestionsResponseDto,
    HyperinventoryProductsResponseDto,
} from "@/types/dto/hyperinventory/product.dto";
import type { ProductListModel } from "@/types/models/product.model";
import { mapHyperinventoryBrands } from "@/utils/mappers/product-brand.mapper";
import { mapHyperinventoryCategories } from "@/utils/mappers/product-category.mapper";
import { mapHyperinventoryProduct } from "@/utils/mappers/product.mapper";
import { mapHyperinventoryPriceFilters } from "@/utils/mappers/product-price-filter.mapper";
import { mapHyperinventoryTags } from "@/utils/mappers/product-tag.mapper";
import { mapProductSearchSuggestions } from "@/utils/mappers/product-search.mapper";

const DEFAULT_PAGE_SIZE = 21;
const MAX_PAGE_SIZE = 100;

/**
 * Upstream takes the price windows as one JSON-encoded query parameter:
 * `selling_price=[{"gte":1000,"lte":5000}]`. Bounds are omitted rather than
 * sent as null, so an open-ended band stays open-ended.
 */
function serializePriceRanges(ranges?: HyperinventoryPriceRangeDto[]) {
    const windows = (ranges ?? [])
        .map(({ from, to }) => ({
            ...(typeof from === "number" ? { gte: from } : {}),
            ...(typeof to === "number" ? { lte: to } : {}),
        }))
        .filter((window) => "gte" in window || "lte" in window);

    return windows.length ? JSON.stringify(windows) : undefined;
}

/**
 * `revalidateSeconds` opts a caller into caching. The listing, the filters and
 * the category pages all need live stock and prices, so the default stays
 * uncached; the home page's showcase does not, and caching it is what keeps
 * that page prerendered instead of rendering per request.
 */
export async function getProducts(
    query: HyperinventoryProductQueryDto = {},
    revalidateSeconds?: number,
): Promise<ProductListModel> {
    const environment = getHyperinventoryEnvironment();
    const size = Math.min(Math.max(query.size ?? DEFAULT_PAGE_SIZE, 1), MAX_PAGE_SIZE);
    const offset = Math.max(query.offset ?? 0, 0);
    const categories = query.categories?.filter(Boolean).join(",");
    const categoryUrlPaths = query.categoryUrlPaths?.filter(Boolean).join(",");
    const brands = query.brands?.filter(Boolean).join(",");
    const tags = query.tags?.filter(Boolean).join(",");
    const sellingPrice = serializePriceRanges(query.priceRanges);
    const response = await hyperinventoryRequest<HyperinventoryProductsResponseDto>(
        `/consumer/sellers/${encodeURIComponent(environment.sellerId)}/products`,
        {
            query: {
                size,
                offset,
                is_collapse_by_variants: query.isCollapseByVariants ?? true,
                categories: categories || undefined,
                category_url_paths: categoryUrlPaths || undefined,
                brands: brands || undefined,
                tags: tags || undefined,
                selling_price: sellingPrice,
                search: query.search?.trim() || undefined,
            },
            ...(revalidateSeconds === undefined
                ? {}
                : { cache: "force-cache" as const, next: { revalidate: revalidateSeconds } }),
        },
    );

    return {
        products: response.hits.hits
            .map(mapHyperinventoryProduct)
            .filter((product): product is NonNullable<typeof product> => product !== null),
        total: response.aggregations?.doc_count ?? response.hits.total.value,
        size,
        offset,
        brands: mapHyperinventoryBrands(response.aggregations),
        categories: mapHyperinventoryCategories(response.aggregations),
        tags: mapHyperinventoryTags(response.aggregations),
        priceFilters: mapHyperinventoryPriceFilters(response.aggregations),
    };
}

export async function getProductSearchSuggestions(search: string) {
    const environment = getHyperinventoryEnvironment();
    const response = await hyperinventoryRequest<HyperinventoryProductSearchSuggestionsResponseDto>(
        `/consumer/sellers/${encodeURIComponent(environment.sellerId)}/products_search_suggestions`,
        {
            accessToken: environment.searchToken,
            query: { search },
        },
    );

    return mapProductSearchSuggestions(response);
}
