import type { HyperinventoryProductSearchSuggestionsResponseDto } from "@/types/dto/hyperinventory/product.dto";
import type { ProductSearchSuggestionsModel } from "@/types/models/product-search.model";

function isSafeImageUrl(value: string | undefined): value is string {
    if (!value) return false;

    try {
        const { protocol } = new URL(value);
        return protocol === "https:" || protocol === "http:";
    } catch {
        return false;
    }
}

export function mapProductSearchSuggestions(
    response: HyperinventoryProductSearchSuggestionsResponseDto,
): ProductSearchSuggestionsModel {
    const products = (response.products ?? []).flatMap(({ _source: product }) => {
        if (!product?.id || !product.url_path?.trim()) return [];

        const imageUrl = [...(product.featured_images ?? [])]
            .sort((left, right) => (left.position ?? 0) - (right.position ?? 0))
            .map((image) => image.url)
            .find(isSafeImageUrl) ?? "";

        return [{
            id: product.id,
            name: product.display_name?.trim() || product.name?.trim() || "Unnamed product",
            slug: product.url_path.trim(),
            imageUrl,
            price: Number(product.selling_price ?? product.price_for_everyone ?? 0),
            mrp: Number(product.mrp ?? 0),
        }];
    });

    return {
        products,
        keywords: Array.from(new Set((response.seo_detail_keywords ?? []).map((keyword) => keyword.trim()).filter(Boolean))),
    };
}
