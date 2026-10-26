import type { HyperinventoryTotalDto } from "@/types/dto/hyperinventory/pagination.dto";

export type HyperinventoryImageDto = {
    position?: number;
    url?: string;
    tags?: string[];
};

export type HyperinventoryBrandDto = {
    id?: string;
    name?: string;
    display_name?: string | null;
};

export type HyperinventoryKeyValueDto = {
    key?: string;
    name?: string;
    label?: string;
    value?: string | number | boolean | null;
};

export type HyperinventoryProductVariantDto = {
    id: string;
    sku?: string;
    name?: string;
    display_name?: string;
    one_line_description?: string;
    selling_price?: number;
    mrp?: number;
    price_for_everyone?: number;
    brand?: HyperinventoryBrandDto;
    url_path?: string;
    featured_images?: HyperinventoryImageDto[];
    is_active?: boolean;
    is_visible?: boolean;
    is_exposed?: boolean;
    in_stock?: boolean;
    can_order?: boolean;
    total_available_stock?: number;
    is_allow_back_orders?: boolean;
    tags?: string[] | null;
    variant_values?: HyperinventoryKeyValueDto[];
};

export type HyperinventoryProductHitDto = {
    _id: string;
    _source: {
        variant_group?: {
            id?: string;
            name?: string;
            owner?: string;
            product_type?: string;
            is_active?: boolean;
        } | null;
        variants: HyperinventoryProductVariantDto[];
    };
};

export type HyperinventoryBrandBucketDto = {
    key: string;
    doc_count: number;
};

export type HyperinventoryCategoryBucketDto = {
    key: string;
    doc_count: number;
};

export type HyperinventoryTagBucketDto = {
    key: string;
    doc_count: number;
};

export type HyperinventoryPriceBucketDto = {
    key: string;
    from?: number;
    to?: number;
    doc_count: number;
};

export type HyperinventoryAggregationDto = {
    doc_count: number;
    tag_Filter?: {
        doc_count_error_upper_bound: number;
        sum_other_doc_count: number;
        buckets: HyperinventoryTagBucketDto[];
    };
    brand_filter?: {
        doc_count_error_upper_bound: number;
        sum_other_doc_count: number;
        buckets: HyperinventoryBrandBucketDto[];
    };
    category_filter?: {
        doc_count_error_upper_bound: number;
        sum_other_doc_count: number;
        buckets: HyperinventoryCategoryBucketDto[];
    };
    price_filter?: {
        buckets: HyperinventoryPriceBucketDto[];
    };
};

export type HyperinventoryProductsResponseDto = {
    hits: {
        total: HyperinventoryTotalDto;
        hits: HyperinventoryProductHitDto[];
    };
    aggregations?: HyperinventoryAggregationDto;
};

export type HyperinventoryProductQueryDto = {
    size?: number;
    offset?: number;
    isCollapseByVariants?: boolean;
    /** Category **names**, as the aggregation returns them. */
    categories?: string[];
    /**
     * Category **slugs**. Preferred over `categories` where a slug is known:
     * a slug is stable, while a name can be edited. Sub-category slugs work
     * here too, in the form `<parent-slug>-<sub-slug>`.
     */
    categoryUrlPaths?: string[];
    brands?: string[];
    /** Tag **names**, as the `tag_Filter` aggregation returns them. */
    tags?: string[];
    search?: string;
    /**
     * Selling-price windows, as the `price_filter` aggregation returns them.
     * Several are OR-ed together upstream, so picking two bands widens the
     * result set rather than narrowing it to their (empty) intersection.
     */
    priceRanges?: HyperinventoryPriceRangeDto[];
};

/** One selling-price window. Open-ended on either side. */
export type HyperinventoryPriceRangeDto = {
    from?: number;
    to?: number;
};

export type HyperinventoryProductSearchSuggestionDto = {
    _source?: HyperinventoryProductVariantDto;
};

export type HyperinventoryProductSearchSuggestionsResponseDto = {
    products?: HyperinventoryProductSearchSuggestionDto[];
    seo_detail_keywords?: string[];
};
