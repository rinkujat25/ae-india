import type { HyperinventoryAggregationDto } from "@/types/dto/hyperinventory/product.dto";
import type { ProductCategoryModel } from "@/types/models/product-category.model";

export function mapHyperinventoryCategories(
    aggregations?: HyperinventoryAggregationDto,
): ProductCategoryModel[] {
    return (aggregations?.category_filter?.buckets ?? [])
        .filter((category) => category.key.trim() && category.doc_count > 0)
        .map((category) => ({
            value: category.key,
            label: category.key,
            count: category.doc_count,
        }));
}
