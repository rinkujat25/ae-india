# API Response Structures

This folder keeps sample API payloads and compact structure notes for API integration work. Read this file before opening the large JSON samples.

## Product Listing

Sample files:

- `product-list-api-respone.json`
- `product-list-api-respone-2.json`

Service location:

- `src/services/hyperinventory/product.service.ts`

DTO location:

- `src/types/dto/hyperinventory/product.dto.ts`

Application model location:

- `src/types/models/product.model.ts`
- `src/types/models/product-brand.model.ts`
- `src/types/models/product-category.model.ts`
- `src/types/models/product-price-filter.model.ts`
- `src/types/models/product-tag.model.ts`

Mapper location:

- `src/utils/mappers/product.mapper.ts`
- `src/utils/mappers/product-brand.mapper.ts`
- `src/utils/mappers/product-category.mapper.ts`
- `src/utils/mappers/product-price-filter.mapper.ts`
- `src/utils/mappers/product-tag.mapper.ts`

Request query shape:

```ts
type HyperinventoryProductQueryDto = {
    size?: number;
    offset?: number;
    isCollapseByVariants?: boolean;
    categories?: string[];
    brands?: string[];
};
```

API query parameter mapping:

```text
size -> size
offset -> offset
isCollapseByVariants -> is_collapse_by_variants
categories -> categories as comma-separated bucket keys
brands -> brands as comma-separated bucket keys
```

Response shape:

```ts
type ProductListingResponse = {
    hits: {
        total: {
            value: number;
        };
        hits: Array<{
            _id: string;
            _index?: string;
            _score?: number;
            _source: {
                variant_group?: string | null;
                variants: Array<{
                    id: string;
                    sku?: string;
                    name?: string;
                    display_name?: string;
                    one_line_description?: string;
                    selling_price?: number;
                    mrp?: number;
                    price_for_everyone?: number;
                    brand?: {
                        id?: string;
                        name?: string;
                    };
                    url_path?: string;
                    featured_images?: Array<{
                        position?: number;
                        url?: string;
                        tags?: string[];
                    }>;
                    is_active?: boolean;
                    is_visible?: boolean;
                    is_exposed?: boolean;
                    in_stock?: boolean;
                    can_order?: boolean;
                    tags?: string[] | null;
                }>;
            };
        }>;
    };
    aggregations?: ProductListingAggregations;
};
```

Aggregation shape:

```ts
type ProductListingAggregations = {
    doc_count: number;

    tag_Filter?: {
        doc_count_error_upper_bound: number;
        sum_other_doc_count: number;
        buckets: Array<{
            key: string;
            doc_count: number;
        }>;
    };

    brand_filter?: {
        doc_count_error_upper_bound: number;
        sum_other_doc_count: number;
        buckets: Array<{
            key: string;
            doc_count: number;
        }>;
    };

    category_filter?: {
        doc_count_error_upper_bound: number;
        sum_other_doc_count: number;
        buckets: Array<{
            key: string;
            doc_count: number;
        }>;
    };

    price_filter?: {
        buckets: Array<{
            key: string;
            from?: number;
            to?: number;
            doc_count: number;
        }>;
    };

    attribute_filter?: {
        doc_count: number;
        key: {
            doc_count_error_upper_bound: number;
            sum_other_doc_count: number;
            buckets: Array<{
                key: string;
                doc_count: number;
                value: {
                    doc_count_error_upper_bound: number;
                    sum_other_doc_count: number;
                    buckets: Array<{
                        key: string;
                        doc_count: number;
                    }>;
                };
            }>;
        };
    };
};
```

Currently consumed aggregation fields:

| API field | Model | Mapper |
| --- | --- | --- |
| `brand_filter.buckets[]` | `ProductBrandModel[]` | `mapHyperinventoryBrands` |
| `category_filter.buckets[]` | `ProductCategoryModel[]` | `mapHyperinventoryCategories` |
| `tag_Filter.buckets[]` | `ProductTagModel[]` | `mapHyperinventoryTags` |
| `price_filter.buckets[]` | `ProductPriceFilterModel[]` | `mapHyperinventoryPriceFilters` |

Important notes:

- API field casing matters. `tag_Filter` uses a capital `F`, while `brand_filter` and `category_filter` are lowercase.
- Components must use application models, not these provider DTOs directly.
- Price filter labels are formatted in the mapper; keep API values as the original bucket `key`.
- Product searching, filtering and sorting should be sent to Hyperinventory as API requests.
- Do not parse additional aggregation filters until that feature is requested.
- Do not keep dummy product data as a runtime fallback.

## Product Detail

Structure guide:

- `product-detail-structure.md`

Sample file:

- `product-detail.json`

Endpoint shape:

```text
GET /consumer/products/{slug}?seller={sellerId}&time={timestamp}
```

Service location:

- `src/services/hyperinventory/product-detail.service.ts`

DTO location:

- `src/types/dto/hyperinventory/product-detail.dto.ts`

Application model location:

- `src/types/models/product-detail.model.ts`

Mapper location:

- `src/utils/mappers/product-detail.mapper.ts`

Important notes:

- Detail pages use `/products/[slug]`.
- Detail DTOs are separate from listing DTOs, but reuse shared image, brand and variant DTO building blocks where the API fields match.
- The current page keeps a static product fallback until the detail API response shape is fully validated against live data.
