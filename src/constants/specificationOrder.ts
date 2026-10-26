/**
 * The order specifications are shown in when the provider does not give one.
 *
 * The catalogue's specifications arrive as a bare `{ name, details }` list with
 * no position, and the order is whatever the source feed happened to use — so
 * one product opens with "Product Dimensions" and the next with "Department".
 * This puts every product in the same shape: what the thing is, then what it is
 * like, then what comes with it, then what it works with, then who it is for,
 * and finally the legal and warranty small print.
 *
 * Names are matched loosely (case, spacing and punctuation are ignored), which
 * is what folds the real-world variants — "Colour"/"Color", "Country of
 * Origin"/"Country Of Origin" — onto one entry.
 *
 * Anything not listed keeps the provider's own order and follows the known
 * entries, so a new specification appears rather than disappearing.
 */
const canonicalOrder = [
    // What it is
    "Brand",
    "Brand Name",
    "Manufacturer",
    "Generic Name",
    "Item Type Name",
    "Model Number",
    "Item model number",
    "Manufacturer Part Number",
    "Part Number",
    "SKU",

    // What it is like
    "Colour",
    "Color",
    "Size",
    "Pattern",
    "Material",
    "Outer Material Type(s)",
    "Enclosure Material",
    "Shell Type",
    "Theme",
    "Style",
    "Form Factor",
    "Closure Type",
    "Strap Type",
    "Handle Type",
    "Product Dimensions",
    "Item Dimensions L x W x H",
    "Item Dimensions",
    "Dimension",
    "Picture size",
    "Item Weight",
    "Item Weight Unit of Measure",
    "Weight",

    // What comes with it
    "Unit Count",
    "Number of Items",
    "Number of Compartments",
    "Included Components",
    "Box Contents",

    // What it does and works with
    "Product Features",
    "Compatible Devices",
    "Compatible Device Size Maximum",
    "Compatible Phone Models",
    "Screen",
    "Camera Resolution",
    "Focal Length",
    "Flash",
    "Exposure Adjustment",
    "ISO",
    "Photo resolution max.",
    "Printing technology",
    "Power Source",
    "Connectivity",
    "Compatibility",
    "Water Resistance",
    "Water Resistance Level",

    // Who it is for
    "Department",
    "Age Range",
    "Age Range Description",
    "Gender",

    // Small print
    "Warranty Description",
    "Country of Origin",
    "Importer",
    "Packer",
    "Packer Contact Information",
];

function normalise(label: string) {
    return label.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const ranks = new Map(canonicalOrder.map((label, index) => [normalise(label), index]));

/** Position in the canonical order; unlisted names sort after every known one. */
export function specificationRank(label: string): number {
    return ranks.get(normalise(label)) ?? Number.MAX_SAFE_INTEGER;
}
