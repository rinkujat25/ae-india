import type { HyperinventoryCategoryDto } from "@/types/dto/hyperinventory/category.dto";
import type { CategoryModel } from "@/types/models/category.model";

function slugify(value: string) {
    return value
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export function mapCategory(dto: HyperinventoryCategoryDto): CategoryModel {
    const name = (dto.name ?? "").trim();

    return {
        id: dto.id,
        name,
        // `display_name` is routinely null on these, so `name` carries the label.
        label: (dto.display_name ?? "").trim() || name,
        slug: (dto.url_path ?? "").trim() || slugify(name),
        // The provider often repeats the name as the description; that is not
        // worth showing twice, so it is dropped here rather than in the page.
        description: (dto.description ?? "").trim() === name ? "" : (dto.description ?? "").trim(),
        imageUrl: dto.category_images?.[0] ?? "",
        bannerUrl: dto.category_banners?.[0] ?? "",
        // Sub-categories come back as -1, so an absent position sorts last
        // rather than jumping to the front of the tree.
        position: typeof dto.position === "number" ? dto.position : Number.MAX_SAFE_INTEGER,
        metaTitle: (dto.meta_title ?? "").trim(),
        metaDescription: (dto.meta_description ?? "").trim(),
    };
}

/** Sorted by the provider's `position`, which is how the seller orders the tree. */
export function mapCategoryList(results: HyperinventoryCategoryDto[]): CategoryModel[] {
    return results
        .filter((dto) => Boolean(dto?.id) && Boolean(dto.name?.trim()))
        .map(mapCategory)
        .sort((a, b) => a.position - b.position);
}

/**
 * The slug the provider gives a sub-category, rebuilt from its name.
 *
 * Sub-categories are addressable in `category_url_paths` as
 * `<parent-slug>-<sub-slug>`, but nothing lists them: the category endpoint
 * 404s on a sub-slug and the seller tree only ever returns the six parents. The
 * only place the real slug appears is inside a product's own `categories`, so
 * the form has to be rebuilt here.
 *
 * The rule, checked against all ten sub-categories in the catalogue: lower-case,
 * **drop** `&` and `,` entirely, and turn every other non-alphanumeric character
 * into a dash. Dropping rather than replacing is what produces the doubled
 * dashes in `...speakers--audio` and `...decor-plants--festive-essentials`.
 *
 * It is a reconstruction, so callers must not depend on it alone — the category
 * page falls back to filtering by name when a rebuilt slug finds nothing.
 */
export function subCategorySlug(parentSlug: string, name: string) {
    const suffix = [...name]
        .map((character) => {
            if (character === "&" || character === ",") return "";
            return /[a-z0-9]/i.test(character) ? character.toLowerCase() : "-";
        })
        .join("");

    return `${parentSlug}-${suffix}`;
}
