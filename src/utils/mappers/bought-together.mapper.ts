import type {
    HyperinventoryProductHitDto,
    HyperinventoryProductVariantDto,
} from "@/types/dto/hyperinventory/product.dto";
import type { BoughtTogetherItemModel } from "@/types/models/bought-together.model";
import { mapHyperinventoryProduct } from "@/utils/mappers/product.mapper";

/**
 * The bundle endpoint answers a bare JSON array. Every product in the catalogue
 * currently reports `count: 0`, so the element shape has never been seen with
 * data in it — this maps the two envelopes the provider uses everywhere else
 * and ignores anything it does not recognise, rather than guessing further:
 *
 *   - a search hit, `{ _id, _source: { variants: [...] } }`
 *   - a bare variant, `{ id, url_path, selling_price, ... }`
 *
 * If real data turns out to use a third shape, this returns an empty list and
 * the section hides itself, which is the same as having no bundle.
 */
function toHit(entry: unknown): HyperinventoryProductHitDto | null {
    if (!entry || typeof entry !== "object") return null;

    const record = entry as Record<string, unknown>;

    // A search hit, as the listing returns.
    if (record._source && typeof record._source === "object") {
        const source = record._source as Record<string, unknown>;

        if (Array.isArray(source.variants)) {
            return entry as HyperinventoryProductHitDto;
        }

        // A hit whose _source is the variant itself.
        return {
            _id: typeof record._id === "string" ? record._id : "",
            _source: { variants: [source as HyperinventoryProductVariantDto] },
        };
    }

    // A bare variant: wrap it so the one product mapper handles every case.
    if (typeof record.id === "string" || typeof record.url_path === "string") {
        return {
            _id: typeof record.id === "string" ? record.id : "",
            _source: { variants: [record as HyperinventoryProductVariantDto] },
        };
    }

    return null;
}

export function mapBoughtTogether(payload: unknown): BoughtTogetherItemModel[] {
    // The endpoint returns the array directly, but a `{ results: [...] }`
    // envelope is what the provider's paginated endpoints use, so accept both.
    const entries = Array.isArray(payload)
        ? payload
        : Array.isArray((payload as { results?: unknown })?.results)
          ? ((payload as { results: unknown[] }).results)
          : [];

    return entries
        .map((entry): BoughtTogetherItemModel | null => {
            const hit = toHit(entry);

            if (!hit) return null;

            const product = mapHyperinventoryProduct(hit);

            if (!product) return null;

            return {
                id: product.id,
                name: product.name,
                slug: product.slug,
                imageUrl: product.imageUrl,
                price: product.price,
                mrp: product.mrp,
                isCurrent: false,
            };
        })
        .filter((item): item is BoughtTogetherItemModel => item !== null);
}
