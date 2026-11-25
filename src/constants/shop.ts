/**
 * The store's categories as the AE India design names them, each mapped to
 * the catalogue's own category names.
 *
 * Fixed rather than read from the seller tree, at the user's request. The home
 * page's "Shop by category" tiles and the chips on the product listing both read
 * this list, so the two cannot drift.
 *
 * `label` is the design's wording; `categories` are the exact names the
 * Hyperinventory catalogue filters on (its `category_filter` keys), sent as
 * `?categories=` and comma-joined when a tile covers several. Every name here
 * was checked against AE India's catalogue and returns products. A name that
 * stops existing upstream simply returns nothing, so re-check them if the
 * seller renames categories -- note "Tapes & Adhesive" is singular there.
 *
 * Avoid names containing a comma (such as "Cleaning Aids (Handpad, Floor
 * Pads)"): the listing splits `?categories=` on commas.
 */
export type ShopCategory = {
    label: string;
    categories: string[];
    /** The home tile's illustration, 360x300, in `public/assets/home/`. */
    image: string;
    /** One line under the name on the Facility Maintenance page. */
    summary: string;
};

export const shopCategories: ShopCategory[] = [
    {
        label: "Wand Pads & Scrub Pads",
        categories: ["Scrub Pads (Hand Pads)"],
        image: "/assets/home/category-scrub-pads.svg",
        summary: "Hand and tool-mounted scrubbing",
    },
    {
        label: "Floor Pads",
        categories: ["Floor Pads"],
        image: "/assets/home/category-floor-pads.svg",
        summary: "Stripping, scrubbing, polishing",
    },
    {
        label: "Cleaning Tools",
        categories: ["Cleaning Tools"],
        image: "/assets/home/category-cleaning-tools.svg",
        summary: "Brooms, squeegees, scrubbers & more",
    },
    {
        label: "Cleaning Chemicals",
        categories: ["Cleaning Chemicals"],
        image: "/assets/home/category-cleaning-chemicals.svg",
        summary: "Surface-specific formulations",
    },
    {
        label: "Floor Mats & Matting",
        categories: ["Entry Way Matting"],
        image: "/assets/home/category-matting.svg",
        summary: "Entrance and carpet matting",
    },
    {
        label: "Tapes & Adhesives",
        categories: ["Tapes & Adhesive", "Anti Skid Tapes"],
        image: "/assets/home/category-tapes.svg",
        summary: "Anti-skid, packaging and mounting",
    },
    {
        label: "Safety & Hygiene",
        categories: ["Personal Safety", "PPE & Masks", "Slip Safety"],
        image: "/assets/home/category-safety.svg",
        summary: "PPE, masks and slip safety",
    },
];

/** The listing URL for one of `shopCategories`. */
export function shopCategoryHref(category: ShopCategory) {
    return `/products?categories=${encodeURIComponent(category.categories.join(","))}`;
}

/** Whether the listing's current `categories` filter is exactly this tile's set. */
export function isShopCategorySelected(category: ShopCategory, selected: string[]) {
    return (
        selected.length === category.categories.length
        && category.categories.every((name) => selected.includes(name))
    );
}

/**
 * The design's label for the listing's current filter, when it is exactly one
 * of these tiles -- so "Floor Mats & Matting" titles the page rather than the
 * catalogue's "Entry Way Matting".
 */
export function shopCategoryLabel(selected: string[]) {
    return shopCategories.find((category) => isShopCategorySelected(category, selected))?.label;
}
