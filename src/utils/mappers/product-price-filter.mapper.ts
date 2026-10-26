import type { HyperinventoryAggregationDto } from "@/types/dto/hyperinventory/product.dto";
import type { ProductPriceFilterModel } from "@/types/models/product-price-filter.model";

function formatPrice(value?: number) {
    if (typeof value !== "number") {
        return "";
    }

    return `Rs. ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value)}`;
}

function getPriceLabel(from?: number, to?: number, fallback = "") {
    if (typeof from === "number" && typeof to === "number") {
        return `${formatPrice(from)} - ${formatPrice(to)}`;
    }

    if (typeof from === "number") {
        return `${formatPrice(from)}+`;
    }

    if (typeof to === "number") {
        return `Up to ${formatPrice(to)}`;
    }

    return fallback;
}

export function mapHyperinventoryPriceFilters(
    aggregations?: HyperinventoryAggregationDto,
): ProductPriceFilterModel[] {
    return (aggregations?.price_filter?.buckets ?? [])
        .filter((priceRange) => priceRange.key.trim() && priceRange.doc_count > 0)
        .map((priceRange) => ({
            value: priceRange.key,
            label: getPriceLabel(priceRange.from, priceRange.to, priceRange.key),
            from: priceRange.from,
            to: priceRange.to,
            count: priceRange.doc_count,
        }));
}
