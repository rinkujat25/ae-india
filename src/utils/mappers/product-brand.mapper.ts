import type { HyperinventoryAggregationDto } from "@/types/dto/hyperinventory/product.dto";
import type { ProductBrandModel } from "@/types/models/product-brand.model";

export function mapHyperinventoryBrands(
    aggregations?: HyperinventoryAggregationDto,
): ProductBrandModel[] {
    return (aggregations?.brand_filter?.buckets ?? [])
        .filter((brand) => brand.key.trim() && brand.doc_count > 0)
        .map((brand) => ({
            value: brand.key,
            label: brand.key,
            count: brand.doc_count,
        }));
}

