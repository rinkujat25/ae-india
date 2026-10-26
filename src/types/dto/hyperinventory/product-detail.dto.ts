import type {
    HyperinventoryBrandDto,
    HyperinventoryImageDto,
    HyperinventoryKeyValueDto,
    HyperinventoryProductVariantDto,
} from "@/types/dto/hyperinventory/product.dto";

export type HyperinventoryProductDetailAssetDto = {
    url?: string;
    src?: string;
    file_url?: string;
    type?: string;
    alt?: string;
    position?: number;
    tags?: string[];
    thumbnail_url?: string;
};

export type HyperinventoryProductAssetsResponseDto = {
    assets?: {
        images?: Record<string, HyperinventoryProductDetailAssetDto[]>;
        videos?: Record<string, HyperinventoryProductDetailAssetDto[]>;
    };
};

export type HyperinventoryProductDownloadDto = {
    link?: string;
    name?: string;
};

export type HyperinventoryProductDownloadsResponseDto = {
    downloads?: Record<string, HyperinventoryProductDownloadDto[]>;
};

export type HyperinventoryProductDetailAttributeDto = {
    key?: string;
    name?: string;
    label?: string;
    details?: string | number | boolean | null;
    value?: string | number | boolean | null;
    /**
     * The provider's ordering field, used by images, cart items and payment
     * methods. Specifications do not carry it today; when they do, it wins over
     * the curated order.
     */
    position?: number;
};

export type HyperinventoryProductDetailCategoryDto = {
    id?: string;
    name?: string;
    display_name?: string | null;
    parent_category?: string | null;
    description?: string | null;
    url_path?: string;
    position?: number;
};

export type HyperinventoryProductDetailSeoDto = {
    meta_title?: string;
    meta_description?: string;
    keywords?: string[];
    also_known_as_names?: string[];
};

export type HyperinventoryProductDetailDto = {
    id?: string;
    _id?: string;
    sku?: string;
    slug?: string;
    url_path?: string;
    name?: string;
    display_name?: string;
    one_line_description?: string;
    description?: string;
    short_description?: string;
    brand?: HyperinventoryBrandDto;
    category?: string;
    category_name?: string;
    categories?: Array<HyperinventoryProductDetailCategoryDto | string>;
    sub_category?: string;
    sub_category_name?: string;
    selling_price?: number;
    mrp?: number;
    price_for_everyone?: number;
    gtin?: string;
    gtin13?: string;
    ean_number?: string;
    hsn_number?: string;
    material?: string;
    featured_images?: HyperinventoryImageDto[];
    images?: HyperinventoryImageDto[];
    media?: Array<HyperinventoryProductDetailAssetDto | string>;
    assets?: string | null;
    downloads?: string | null;
    /**
     * A pointer, not the products: `{ url, count }`, where `count` is 0 for
     * every product in the catalogue today. Fetching the url answers a bare
     * JSON array.
     */
    frequently_bought_together_products?: {
        url?: string | null;
        count?: number;
    } | null;
    product_assets?: Array<HyperinventoryProductDetailAssetDto | string>;
    attributes?: HyperinventoryProductDetailAttributeDto[];
    specifications?: HyperinventoryProductDetailAttributeDto[] | Record<string, string | number | boolean | null>;
    variant_values?: HyperinventoryKeyValueDto[];
    variants?: HyperinventoryProductVariantDto[];
    seo_detail?: HyperinventoryProductDetailSeoDto;
    total_available_stock?: number;
    in_stock?: boolean;
    can_order?: boolean;
    /** Orderable while out of stock, fulfilled once restocked. */
    is_allow_back_orders?: boolean;
};

export type HyperinventoryProductDetailResponseDto =
    | HyperinventoryProductDetailDto
    | {
          hits?: {
              total?: {
                  value?: number;
                  relation?: string;
              };
              max_score?: number | null;
              hits?: Array<{
                  _source?: HyperinventoryProductDetailDto;
              }>;
          };
      }
    | {
          product?: HyperinventoryProductDetailDto;
          data?: HyperinventoryProductDetailDto;
          result?: HyperinventoryProductDetailDto;
      };
