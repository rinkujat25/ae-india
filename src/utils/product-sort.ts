/**
 * Product sorting, shared by the catalogue listing and the category page so
 * the same options mean the same thing on both.
 *
 * Sorting is the provider's job: each option is a Hyperinventory `ordering`
 * value, sent with the product read. Sorting the loaded array instead only
 * reordered one page — "Price low to high" on page 1 showed the cheapest of
 * those 24, not the cheapest in the catalogue.
 *
 * The URL carries the same value (`?ordering=-selling_price`), so a sorted
 * view is linkable and survives a reload. Only these three are ever sent
 * upstream; anything else in the URL falls back to the default.
 */
export const sortOptions = [
    { value: "-created_at", label: "Newest" },
    { value: "-selling_price", label: "Price: High to Low" },
    { value: "selling_price", label: "Price: Low to High" },
] as const;

export type ProductOrdering = (typeof sortOptions)[number]["value"];

export const defaultOrdering: ProductOrdering = "-created_at";

/** The URL query parameter, named after the provider's own. */
export const orderingParam = "ordering";

export function resolveOrdering(value: string | string[] | null | undefined): ProductOrdering {
    const candidate = Array.isArray(value) ? value[0] : value;

    return sortOptions.find((option) => option.value === candidate)?.value ?? defaultOrdering;
}

/**
 * The same URL with a new ordering. Paging restarts, because page 3 of one
 * order holds different products from page 3 of another; the default is
 * omitted so the plain URL stays clean.
 */
export function buildOrderingHref(pathname: string, searchParams: URLSearchParams, ordering: ProductOrdering) {
    const query = new URLSearchParams(searchParams);

    query.delete("page");

    if (ordering === defaultOrdering) query.delete(orderingParam);
    else query.set(orderingParam, ordering);

    const suffix = query.toString();

    return suffix ? `${pathname}?${suffix}` : pathname;
}
