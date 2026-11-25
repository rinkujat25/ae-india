import type {
  HyperinventoryProductHitDto,
  HyperinventoryProductVariantDto,
} from "@/types/dto/hyperinventory/product.dto";
import type { ProductModel } from "@/types/models/product.model";

/** The variant a card shows for a collapsed group; sorting reads it too. */
export function getPrimaryVariant(hit: HyperinventoryProductHitDto) {
  return (
    hit._source.variants.find(
      (variant) => variant.is_active !== false && variant.is_visible !== false && variant.is_exposed !== false,
    ) ?? hit._source.variants[0]
  );
}

/**
 * Only http(s) image URLs are allowed through. The catalogue is upstream data,
 * so a `javascript:` or `data:` value must never reach an <img src>.
 */
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

function getFeaturedImage(variant: HyperinventoryProductVariantDto) {
  return [...(variant.featured_images ?? [])]
    .sort((left, right) => (left.position ?? 0) - (right.position ?? 0))
    .map((image) => image.url)
    .find(isSafeImageUrl) ?? "";
}

function getVariantSummaries(hit: HyperinventoryProductHitDto, fallbackImageUrl: string) {
  return hit._source.variants
    .filter(
      (variant) => variant.is_active !== false && variant.is_visible !== false && variant.is_exposed !== false,
    )
    .map((variant) => ({
      id: variant.id,
      name: variant.display_name?.trim() || variant.name?.trim() || "Product variant",
      imageUrl: getFeaturedImage(variant) || fallbackImageUrl,
      slug: variant.url_path?.trim() ?? "",
    }));
}

export function mapHyperinventoryProduct(hit: HyperinventoryProductHitDto): ProductModel | null {
  const variant = getPrimaryVariant(hit);

  if (!variant) {
    return null;
  }

  const name = variant.display_name?.trim() || variant.name?.trim() || "Unnamed product";
  const imageUrl = getFeaturedImage(variant);

  return {
    id: variant.id || hit._id,
    sku: variant.sku?.trim() ?? "",
    name,
    brand: variant.brand?.name?.trim() || "AE India",
    price: Number(variant.selling_price ?? variant.price_for_everyone ?? 0),
    mrp: Number(variant.mrp ?? 0),
    category: "Other",
    subCategory: "General",
    imageUrl,
    slug: variant.url_path?.trim() ?? "",
    description: variant.one_line_description?.trim() ?? "",
    inStock: variant.in_stock !== false,
    canOrder: variant.can_order !== false,
    variants: getVariantSummaries(hit, imageUrl),
  };
}
