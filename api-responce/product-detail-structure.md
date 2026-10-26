# Product Detail API Structure

Source sample:

- `api-responce/product-detail.json`

Endpoint:

```text
GET /consumer/products/{slug}?seller={sellerId}&time={timestamp}
```

The sample response is an Elasticsearch-style wrapper. The product detail is not at the top level.

```ts
type ProductDetailApiResponse = {
    hits: {
        total: {
            value: number;
            relation: string;
        };
        max_score?: number | null;
        hits: Array<{
            _source: ProductDetailSource;
        }>;
    };
};
```

Read the product from:

```ts
const product = response.hits.hits[0]._source;
```

## Product Source

Important fields currently present in `_source`:

```ts
type ProductDetailSource = {
    id: string;
    name: string;
    display_name: string;
    sku: string;
    url_path: string;

    brand: {
        id: string;
        name: string;
        display_name: string | null;
    };

    categories: Array<{
        id: string;
        name: string;
        display_name: string | null;
        parent_category: string | null;
        description: string | null;
        url_path: string;
        position: number;
    }>;

    selling_price: number;
    mrp: number;
    price_for_everyone: number | null;

    short_description: string | null;
    one_line_description: string | null;
    description: string | null;

    featured_images: ProductImage[];
    attributes: ProductKeyValue[];
    variant_values: ProductKeyValue[];
    specifications: ProductSpecification[];
    variants: ProductVariant[];

    seo_detail?: {
        meta_title?: string;
        meta_description?: string;
        keywords?: string[];
        also_known_as_names?: string[];
    };

    ean_number?: string | null;
    hsn_number?: string | null;
    total_available_stock?: number;
    in_stock?: boolean;
    can_order?: boolean;
};
```

The sample also contains many commerce/admin fields such as `accessories`, `buyer_groups`, `collections`, `deal`, `downloads`, `features`, `highlights`, `manufacturer`, `price_list`, `tax`, `unit`, `weight`, and similar product arrays. Do not map those until the UI needs them.

## Gallery Assets

The product detail `assets` field is a URL such as `/v1/products/{product_id}/assets`. Fetch that URL for gallery content. The response groups media by type and usage:

```ts
type ProductAsset = {
    position: number;
    url: string;
    tags: string[];
    thumbnail_url?: string;
};

type ProductAssetsResponse = {
    assets?: {
        images?: Record<string, ProductAsset[]>;
        videos?: Record<string, ProductAsset[]>;
    };
};
```

Notes:

- Use only safe `http` or `https` URLs.
- Sort by `position`.
- Use product and variant `featured_images` for the primary product gallery.
- Use `assets.images` and `assets.videos` only for the lower Images and Videos section.
- Variant-level `featured_images` may still be used as compact variant selector previews.

## Downloadable Assets

The product detail `downloads` field contains a URL. Fetch it and flatten every returned download group:

```ts
type ProductDownloadsResponse = {
    downloads?: Record<string, Array<{
        link: string;
        name: string;
    }>>;
};
```

Known group keys include `catalog`, `howToGuide`, `price_list`, and `user_manuals`. Empty groups are omitted from the page.

## Variants

Variant shape from the sample:

```ts
type ProductVariant = {
    id: string;
    url_path: string;
    featured_images: ProductImage[];
    variant_values: ProductKeyValue[];
    is_active?: boolean;
    is_visible?: boolean;
    is_exposed?: boolean;
    is_disabled?: boolean;
    is_archived?: boolean;
    can_order?: boolean;
};
```

Color variants in the original sample:

| Color | URL path |
| --- | --- |
| Black | `aecooly-foldable-handheld-fan-pocket-01-black` |
| Beige | `aecooly-foldable-handheld-fan-pocket-01-beige` |
| Pink | `aecooly-foldable-handheld-fan-pocket-01-pink` |

Each color comes from:

```ts
variant.variant_values[] where key === "Color"
```

Do not assume variants only contain color. Build selector groups dynamically from every populated `variant_values` entry. For example, a product can expose both `Size` and `Colors`; the selected values must resolve to one valid variant `url_path` before loading that product detail.

## Attributes

Attribute shape:

```ts
type ProductKeyValue = {
    key: string;
    value: string;
};
```

Sample:

```json
{ "key": "Color", "value": "Black" }
```

Use product-level `attributes` or `variant_values` for default selected option text.

## Specifications

Specification shape from the sample:

```ts
type ProductSpecification = {
    name: string;
    details: string;
};
```

Sample values:

| name | details |
| --- | --- |
| Battery capacity | `2000mAh` |
| Charging time | `3-Hour Fast Charging` |
| Usage time | `Low Speed: Up to 24 hours` |
| Noise level | `55 dB` |
| Dimensions Storage state | `4.72" * 1.81" * 1.08"` |

Map to detail model:

```ts
specs: product.specifications.map((item) => [item.name, item.details])
```

## SEO

Use `seo_detail` for metadata when available:

```ts
title = product.seo_detail?.meta_title || product.display_name || product.name
description = product.seo_detail?.meta_description || product.one_line_description || product.short_description
keywords = product.seo_detail?.keywords || []
```

## Current Mapping Plan

Map API fields into `ProductDetailModel` like this:

| Model field | API source |
| --- | --- |
| `slug` | `_source.url_path` first, then fallback slug/current route slug |
| `brand` | `_source.brand.name` |
| `name` | `_source.display_name` then `_source.name` |
| `sku` | `_source.sku` |
| `gtin13` | `_source.ean_number` |
| `category` | first category with `parent_category === null`, else `categories[0].name` |
| `categorySlug` | selected category `url_path` |
| `subCategory` | first category with `parent_category !== null`, else `General` |
| `price` | `_source.selling_price` then `_source.price_for_everyone` |
| `mrp` | `_source.mrp` |
| `description` | `_source.description`, `_source.short_description`, `_source.one_line_description`, then SEO meta description |
| `images` | selected variant `featured_images[].url`, then product `featured_images[].url` |
| `colors` | `_source.variants[].variant_values[Color]` + first variant image |
| `specs` | `_source.specifications[].name/details` |
| `media` | fetched `assets.images` and `assets.videos` |

## Implementation Notes

- Keep detail DTOs separate from listing DTOs.
- The current mapper must support this `hits.hits[0]._source` wrapper.
- The current mapper must support specification objects that use `details`, not only `value`.
- Variant image/color data should power the color swatches.
- Static product detail data should only remain as an unavailable-state fallback while API mapping is being finalized.
