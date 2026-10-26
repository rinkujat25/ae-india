import { specificationRank } from "@/constants/specificationOrder";
import { hasMarkup, sanitizeRichText, toPlainText } from "@/utils/rich-text";
import { toYouTubeEmbedUrl } from "@/utils/video-embed";
import type {
    HyperinventoryProductDetailAssetDto,
    HyperinventoryProductAssetsResponseDto,
    HyperinventoryProductDetailDto,
    HyperinventoryProductDetailResponseDto,
    HyperinventoryProductDownloadsResponseDto,
} from "@/types/dto/hyperinventory/product-detail.dto";
import type { HyperinventoryImageDto, HyperinventoryProductVariantDto } from "@/types/dto/hyperinventory/product.dto";
import type {
    ProductDetailModel,
    ProductDetailOptionGroupModel,
    ProductDetailVariantModel,
} from "@/types/models/product-detail.model";

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function unwrapProductDetail(response: HyperinventoryProductDetailResponseDto): HyperinventoryProductDetailDto {
    const wrappedResponse = response as {
        hits?: {
            hits?: Array<{
                _source?: HyperinventoryProductDetailDto;
            }>;
        };
        product?: HyperinventoryProductDetailDto;
        data?: HyperinventoryProductDetailDto;
        result?: HyperinventoryProductDetailDto;
    };

    const firstHit = wrappedResponse.hits?.hits?.[0]?._source;

    if (firstHit) {
        return firstHit;
    }

    if (wrappedResponse.product) {
        return wrappedResponse.product;
    }

    if (wrappedResponse.data) {
        return wrappedResponse.data;
    }

    if (wrappedResponse.result) {
        return wrappedResponse.result;
    }

    return response as HyperinventoryProductDetailDto;
}

function firstText(...values: Array<string | number | boolean | null | undefined>) {
    return values
        .map((value) => (value === undefined || value === null ? "" : String(value).trim()))
        .find(Boolean) ?? "";
}

function isSafeImageUrl(value: string | undefined): value is string {
    if (!value) {
        return false;
    }

    try {
        const { protocol } = new URL(value);
        return protocol === "https:" || protocol === "http:";
    } catch {
        return false;
    }
}

function getImageUrl(image: HyperinventoryImageDto | HyperinventoryProductDetailAssetDto | string) {
    if (typeof image === "string") {
        return image;
    }

    return (
        ("url" in image ? image.url : undefined) ??
        ("src" in image ? image.src : undefined) ??
        ("file_url" in image ? image.file_url : undefined)
    );
}

function getImagePosition(image: HyperinventoryImageDto | HyperinventoryProductDetailAssetDto | string) {
    return typeof image === "string" ? 0 : image.position ?? 0;
}

function flattenAssetGroups(groups?: Record<string, HyperinventoryProductDetailAssetDto[]>) {
    return Object.values(groups ?? {}).flat();
}

function collectAssetMedia(assetsResponse?: HyperinventoryProductAssetsResponseDto) {
    const images = flattenAssetGroups(assetsResponse?.assets?.images)
        .sort((left, right) => getImagePosition(left) - getImagePosition(right))
        .map((asset, index) => ({
            type: "image" as const,
            src: getImageUrl(asset) ?? "",
            alt: asset.alt ?? `Product image ${index + 1}`,
        }));
    const videos = flattenAssetGroups(assetsResponse?.assets?.videos)
        .sort((left, right) => getImagePosition(left) - getImagePosition(right))
        .map((asset, index) => {
            const src = getImageUrl(asset) ?? "";
            // A brand supplying a YouTube link rather than a file is common, and
            // that link cannot go in a <video>. Resolved here so the page only
            // ever sees which element to render.
            const embedUrl = toYouTubeEmbedUrl(src);

            return {
                type: embedUrl ? ("embed" as const) : ("video" as const),
                src: embedUrl ?? src,
                alt: asset.alt ?? `Product video ${index + 1}`,
                thumbnailUrl: isSafeImageUrl(asset.thumbnail_url) ? asset.thumbnail_url : undefined,
            };
        });

    return [...images, ...videos]
        .filter((item) => isSafeImageUrl(item.src))
        .filter((item, index, allItems) =>
            allItems.findIndex((candidate) => candidate.type === item.type && candidate.src === item.src) === index,
        );
}

function collectFeaturedImages(product: HyperinventoryProductDetailDto, variant?: HyperinventoryProductVariantDto) {
    return Array.from(
        new Set(
            [...(variant?.featured_images ?? []), ...(product.featured_images ?? [])]
                .sort((left, right) => getImagePosition(left) - getImagePosition(right))
                .map(getImageUrl)
                .filter(isSafeImageUrl),
        ),
    );
}

function formatDownloadType(value: string) {
    return value
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (character) => character.toUpperCase());
}

function collectDownloads(downloadsResponse?: HyperinventoryProductDownloadsResponseDto) {
    return Object.entries(downloadsResponse?.downloads ?? {}).flatMap(([type, downloads]) =>
        downloads
            .filter((download) => isSafeImageUrl(download.link))
            .map((download) => ({
                type: formatDownloadType(type),
                name: firstText(download.name, formatDownloadType(type)),
                url: download.link as string,
            })),
    );
}

function getPrimaryVariant(product: HyperinventoryProductDetailDto, requestedSlug: string) {
    const normalizedSlug = requestedSlug.trim();
    const requestedVariant = product.variants?.find(
        (variant) =>
            variant.url_path?.trim() === normalizedSlug &&
            variant.is_active !== false &&
            variant.is_visible !== false &&
            variant.is_exposed !== false,
    );

    return (
        requestedVariant ??
        product.variants?.find(
            (variant) => variant.is_active !== false && variant.is_visible !== false && variant.is_exposed !== false,
        ) ?? product.variants?.[0]
    );
}

function getAttributeValue(product: HyperinventoryProductDetailDto, names: string[]) {
    const normalizedNames = names.map((name) => name.toLowerCase());
    const allAttributes = [...(product.attributes ?? []), ...(product.variant_values ?? [])];

    return firstText(
        allAttributes.find((attribute) =>
            [attribute.key, attribute.name, attribute.label]
                .map((value) => value?.toLowerCase())
                .some((value) => value && normalizedNames.includes(value)),
        )?.value,
    );
}

function getVariantValue(variant: HyperinventoryProductVariantDto | undefined, names: string[]) {
    const normalizedNames = names.map((name) => name.toLowerCase());

    return firstText(
        variant?.variant_values?.find((attribute) =>
            attribute.key ? normalizedNames.includes(attribute.key.toLowerCase()) : false,
        )?.value,
    );
}

function mapSpecifications(product: HyperinventoryProductDetailDto): Array<[string, string]> {
    const specifications = product.specifications;

    if (Array.isArray(specifications)) {
        const rows = specifications
            .map((item) => ({
                label: firstText(item.label, item.name, item.key),
                value: firstText(item.details, item.value),
                position: Number.isFinite(Number(item.position)) ? Number(item.position) : null,
            }))
            .filter((row) => row.label && row.value);

        // The provider's own order wins whenever it gives one. Otherwise the
        // curated order applies, and because sort is stable, unlisted names keep
        // the order they arrived in.
        const hasProviderOrder = rows.some((row) => row.position !== null);

        const sorted = hasProviderOrder
            ? [...rows].sort((first, second) => (first.position ?? 0) - (second.position ?? 0))
            : [...rows].sort((first, second) => specificationRank(first.label) - specificationRank(second.label));

        return sorted.map((row) => [row.label, row.value] as [string, string]);
    }

    if (isRecord(specifications)) {
        return Object.entries(specifications)
            .map(([label, value]) => [label, firstText(value as string | number | boolean | null)] as [string, string])
            .filter(([, value]) => value);
    }

    return [];
}

/**
 * Categories arrive as one flat list: the entries with no `parent_category` are
 * the top-level ones, and the rest are their children. A product can sit in more
 * than one of either, so both sides are joined rather than picking the first.
 *
 * `display_name` is routinely null on these, so `name` carries the label.
 */
function categoryNames(product: HyperinventoryProductDetailDto, wantChildren: boolean) {
    const names = (product.categories ?? [])
        .map((category) => {
            if (typeof category === "string") return wantChildren ? "" : category;

            const isChild = Boolean(category.parent_category);

            if (isChild !== wantChildren) return "";

            return firstText(category.display_name, category.name);
        })
        .map((name) => name.trim())
        .filter(Boolean);

    // A product listed twice under the same name should still read once.
    return [...new Set(names)].join(", ");
}

function getCategory(product: HyperinventoryProductDetailDto) {
    // No placeholder: an invented "Other" reads as real data, and the page hides
    // the row when there is nothing to show.
    return firstText(product.category_name, product.category, categoryNames(product, false));
}

function getCategorySlug(product: HyperinventoryProductDetailDto, category: string) {
    const parentCategory =
        product.categories?.find((item) => typeof item !== "string" && !item.parent_category) ??
        product.categories?.[0];

    return firstText(typeof parentCategory === "string" ? undefined : parentCategory?.url_path, slugify(category));
}

function getSubCategory(product: HyperinventoryProductDetailDto) {
    return firstText(product.sub_category_name, product.sub_category, categoryNames(product, true));
}

function getVariantImage(variant: HyperinventoryProductVariantDto) {
    return [...(variant.featured_images ?? [])]
        .sort((left, right) => (left.position ?? 0) - (right.position ?? 0))
        .map((image) => image.url)
        .find(isSafeImageUrl) ?? "";
}

function mapVariants(product: HyperinventoryProductDetailDto, fallbackImage: string): ProductDetailVariantModel[] {
    return (product.variants ?? [])
        .filter(
            (variant) =>
                variant.is_active !== false &&
                variant.is_visible !== false &&
                variant.is_exposed !== false &&
                Boolean(variant.url_path?.trim()),
        )
        .map((variant) => ({
            id: variant.id,
            slug: variant.url_path?.trim() ?? "",
            imageUrl: getVariantImage(variant) || fallbackImage,
            attributes: Object.fromEntries(
                (variant.variant_values ?? [])
                    .map((attribute) => [firstText(attribute.key, attribute.name, attribute.label), firstText(attribute.value)])
                    .filter(([key, value]) => key && value),
            ),
        }))
        .filter((variant) => Object.keys(variant.attributes).length > 0);
}

function getOptionLabel(key: string) {
    return key.toLowerCase() === "colors" ? "Color" : key;
}

function getOptionPriority(key: string) {
    const normalizedKey = key.toLowerCase();

    if (normalizedKey === "size") {
        return 0;
    }

    if (["color", "colors", "colour", "colours"].includes(normalizedKey)) {
        return 1;
    }

    return 2;
}

function mapOptionGroups(variants: ProductDetailVariantModel[]): ProductDetailOptionGroupModel[] {
    const valuesByKey = new Map<string, Set<string>>();

    variants.forEach((variant) => {
        Object.entries(variant.attributes).forEach(([key, value]) => {
            const values = valuesByKey.get(key) ?? new Set<string>();
            values.add(value);
            valuesByKey.set(key, values);
        });
    });

    return Array.from(valuesByKey, ([key, values]) => ({
        key,
        label: getOptionLabel(key),
        values: Array.from(values).sort((left, right) =>
            left.localeCompare(right, "en", { numeric: true, sensitivity: "base" }),
        ),
    })).sort(
        (left, right) =>
            getOptionPriority(left.key) - getOptionPriority(right.key) ||
            left.label.localeCompare(right.label, "en", { sensitivity: "base" }),
    );
}

function slugify(value: string) {
    return value
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export function mapHyperinventoryProductDetail(
    response: HyperinventoryProductDetailResponseDto,
    slug: string,
    assetsResponse?: HyperinventoryProductAssetsResponseDto,
    downloadsResponse?: HyperinventoryProductDownloadsResponseDto,
): ProductDetailModel {
    const product = unwrapProductDetail(response);
    const variant = getPrimaryVariant(product, slug);
    const media = collectAssetMedia(assetsResponse);
    const images = collectFeaturedImages(product, variant);
    const name = firstText(variant?.display_name, variant?.name, product.display_name, product.name, "Unnamed product");
    const brand = firstText(variant?.brand?.display_name, variant?.brand?.name, product.brand?.display_name, product.brand?.name, "Wingback");
    const category = getCategory(product);
    const categorySlug = getCategorySlug(product, category);
    const subCategory = getSubCategory(product);
    const color = getVariantValue(variant, ["color", "colour"]) || getAttributeValue(product, ["color", "colour"]) || "Default";
    const material = firstText(product.material, getAttributeValue(product, ["material"]));
    const price = Number(variant?.selling_price ?? variant?.price_for_everyone ?? product.selling_price ?? product.price_for_everyone ?? 0);
    const mrp = Number(variant?.mrp ?? product.mrp ?? 0);
    const stockValue = variant?.total_available_stock ?? product.total_available_stock;
    const availableStock = Number.isFinite(Number(stockValue)) ? Number(stockValue) : null;
    const inStock = variant?.in_stock ?? product.in_stock ?? (availableStock !== null ? availableStock > 0 : true);
    const canOrder = variant?.can_order ?? product.can_order ?? true;
    const allowsBackOrders = variant?.is_allow_back_orders ?? product.is_allow_back_orders ?? false;

    // A back order is stock the seller does not hold yet, so it is limited to a
    // single unit. With stock on hand the usual stock ceiling applies.
    const isBackOrder = allowsBackOrders && !inStock;
    const maxQuantity = isBackOrder ? 1 : availableStock;
    const specs = mapSpecifications(product);
    const oneLineDescription = toPlainText(
        firstText(variant?.one_line_description, product.one_line_description),
    );
    const rawDescription = firstText(
        product.description,
        product.short_description,
        oneLineDescription,
        product.seo_detail?.meta_description,
    );

    // Descriptions are authored in a rich-text editor, so the same copy is kept
    // twice: markup for the page, plain text for meta tags, structured data and
    // the summary beside the title, none of which may contain tags.
    const descriptionHtml = hasMarkup(rawDescription) ? sanitizeRichText(rawDescription) : "";
    const description = toPlainText(rawDescription);
    // The seller authors these against the product, so they are preferred over
    // anything the page could compose from the name. `also_known_as_names` is the
    // same kind of term as `keywords` — what a buyer might call this product —
    // so the two are one list, deduplicated because they overlap in practice.
    const keywords = [
        ...new Set(
            [...(product.seo_detail?.keywords ?? []), ...(product.seo_detail?.also_known_as_names ?? [])]
                .map((keyword) => keyword.trim())
                .filter(Boolean),
        ),
    ];
    const variants = mapVariants(product, images[0] ?? "");
    const optionGroups = mapOptionGroups(variants);

    return {
        id: firstText(variant?.id, product.id, product._id),
        slug: firstText(variant?.url_path, slug, product.url_path, product.slug),
        brand,
        name,
        sku: firstText(variant?.sku, product.sku),
        gtin13: firstText(product.gtin13, product.gtin, product.ean_number),
        category,
        categorySlug,
        subCategory,
        color,
        material,
        price,
        mrp,
        availableStock,
        inStock,
        canOrder,
        allowsBackOrders,
        maxQuantity,
        moq: 1,
        quantityStep: 1,
        oneLineDescription,
        description,
        descriptionHtml,
        metaTitle: toPlainText(firstText(product.seo_detail?.meta_title)),
        metaDescription: toPlainText(firstText(product.seo_detail?.meta_description)),
        keywords,
        images,
        variants,
        optionGroups,
        gifting: [
            ["Logo branding", "Confirmed at quote stage"],
            ["Needs a size from the recipient", "No"],
            ["Food item", "Confirmed from product category"],
            ["Budget tier", price ? `${price <= 2500 ? "Rs. 1,000 - Rs. 2,500" : "Custom quote"}` : "Custom quote"],
            ["Delivery", "Pan-India, individual doorstep"],
            ["Dispatch lead time", "Confirmed at quote stage"],
        ],
        specs,
        media: media.map((item, index) => ({
            ...item,
            alt: item.type === "image" ? `${name} image ${index + 1}` : `${name} video ${index + 1}`,
        })),
        downloads: collectDownloads(downloadsResponse),
        relatedProducts: [],
        boughtTogether: [],
    };
}
