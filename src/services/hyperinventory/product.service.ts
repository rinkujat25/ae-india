import "server-only";

import { storeCollectionIds } from "@/constants/collection";
import { getHyperinventoryEnvironment } from "@/lib/env";
import { hyperinventoryRequest } from "@/services/hyperinventory/client";
import type {
    HyperinventoryPriceRangeDto,
    HyperinventoryProductHitDto,
    HyperinventoryProductQueryDto,
    HyperinventoryProductSearchSuggestionsResponseDto,
    HyperinventoryProductsResponseDto,
} from "@/types/dto/hyperinventory/product.dto";
import type { ProductListModel } from "@/types/models/product.model";
import { mapHyperinventoryBrands } from "@/utils/mappers/product-brand.mapper";
import { mapHyperinventoryCategories } from "@/utils/mappers/product-category.mapper";
import { getPrimaryVariant, mapHyperinventoryProduct } from "@/utils/mappers/product.mapper";
import { mapHyperinventoryPriceFilters } from "@/utils/mappers/product-price-filter.mapper";
import { mapHyperinventoryTags } from "@/utils/mappers/product-tag.mapper";
import { mapProductSearchSuggestions } from "@/utils/mappers/product-search.mapper";

const DEFAULT_PAGE_SIZE = 21;
const MAX_PAGE_SIZE = 100;
/** Ceiling on the pages a sorted read collects: 1,000 groups. */
const MAX_SORT_PAGES = 10;

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
 * Orders hits the way the provider would if it honoured `ordering`.
 *
 * With `collection_ids` in the request the provider sorts on each product's
 * position in the collection first and on `ordering` only after it. Every
 * position is unique, so the requested order never takes effect -- Newest,
 * High to Low and Low to High all came back identical. Until the provider
 * fixes that, sorted reads collect the whole result set and order it here.
 *
 * Prices come from the same variant the card shows. A product with no
 * selling price goes last either way, so "Price on request" never heads a
 * price-sorted page. Ties fall back to the id, so paging is stable.
 */
function sortHits(hits: HyperinventoryProductHitDto[], ordering: string) {
    const descending = ordering.startsWith("-");
    const field = descending ? ordering.slice(1) : ordering;
    const keyed = hits.map((hit) => {
        const variant = getPrimaryVariant(hit);

        return {
            hit,
            id: variant?.id ?? hit._id,
            price: variant?.selling_price || null,
            createdAt: variant?.created_at ?? "",
        };
    });

    return keyed
        .sort((left, right) => {
            if (field === "selling_price") {
                if (left.price === null || right.price === null) {
                    if (left.price !== right.price) return left.price === null ? 1 : -1;
                } else if (left.price !== right.price) {
                    return descending ? right.price - left.price : left.price - right.price;
                }
            } else if (field === "created_at" && left.createdAt !== right.createdAt) {
                // Same-format ISO strings compare correctly as text.
                return (left.createdAt < right.createdAt ? -1 : 1) * (descending ? -1 : 1);
            }

            return left.id < right.id ? -1 : left.id > right.id ? 1 : 0;
        })
        .map(({ hit }) => hit);
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
    const ordering = query.ordering || undefined;
    const request = (pageSize: number, pageOffset: number) => hyperinventoryRequest<HyperinventoryProductsResponseDto>(
        `/consumer/sellers/${encodeURIComponent(environment.sellerId)}/products`,
        {
            query: {
                size: pageSize,
                offset: pageOffset,
                is_collapse_by_variants: query.isCollapseByVariants ?? true,
                categories: categories || undefined,
                category_url_paths: categoryUrlPaths || undefined,
                brands: brands || undefined,
                tags: tags || undefined,
                selling_price: sellingPrice,
                search: query.search?.trim() || undefined,
                ordering,
                collection_ids: storeCollectionIds.join(","),
            },
            ...(revalidateSeconds === undefined
                ? {}
                : { cache: "force-cache" as const, next: { revalidate: revalidateSeconds } }),
        },
    );

    // Unsorted reads, or no collection filter: the provider's page is right.
    if (!ordering || storeCollectionIds.length === 0) {
        const response = await request(size, offset);

        return toProductList(response, response.hits.hits, response.aggregations?.doc_count ?? response.hits.total.value, size, offset);
    }

    // Sorted reads collect every page, then order and slice them here (see
    // `sortHits`). A short page marks the end. The count is then exact -- it
    // is the number of cards, not the provider's variant-inflated total.
    const first = await request(MAX_PAGE_SIZE, 0);
    const hits = [...first.hits.hits];
    let lastPageLength = hits.length;

    for (let page = 1; page < MAX_SORT_PAGES && lastPageLength === MAX_PAGE_SIZE; page += 1) {
        const next = await request(MAX_PAGE_SIZE, page * MAX_PAGE_SIZE);

        lastPageLength = next.hits.hits.length;
        hits.push(...next.hits.hits);
    }

    return toProductList(first, sortHits(hits, ordering).slice(offset, offset + size), hits.length, size, offset);
}

function toProductList(
    response: HyperinventoryProductsResponseDto,
    hits: HyperinventoryProductHitDto[],
    total: number,
    size: number,
    offset: number,
): ProductListModel {
    return {
        products: hits
            .map(mapHyperinventoryProduct)
            .filter((product): product is NonNullable<typeof product> => product !== null),
        total,
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
            query: { search, collection_ids: storeCollectionIds.join(",") },
        },
    );

    return mapProductSearchSuggestions(response);
}
