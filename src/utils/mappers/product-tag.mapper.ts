import type { HyperinventoryAggregationDto } from "@/types/dto/hyperinventory/product.dto";
import type { ProductTagModel } from "@/types/models/product-tag.model";

export function mapHyperinventoryTags(
    aggregations?: HyperinventoryAggregationDto,
): ProductTagModel[] {
    return (aggregations?.tag_Filter?.buckets ?? [])
        .filter((tag) => tag.key.trim() && tag.doc_count > 0)
        .map((tag) => ({
            value: tag.key,
            label: tag.key,
            count: tag.doc_count,
        }));
}
