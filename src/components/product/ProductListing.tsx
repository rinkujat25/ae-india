"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductFilters } from "@/components/product/ProductFilters";
import { type ProductFilterOptions, readCachedFilters, writeCachedFilters } from "@/utils/filter-cache";
import { type SortKey, sortLabels, sortProducts } from "@/utils/product-sort";
import { ProductCard } from "@/components/product/ProductCard";
import type {
    ProductListModel,
    ProductModel,
} from "@/types/models/product.model";

type ProductListingProps = {
    catalogue: ProductListModel;
    /** 1-based, from the URL. */
    page: number;
    pageSize: number;
};





function productKey(product: ProductModel) {
    return product.id;
}


function parseCommaSeparatedParam(value: string | null) {
    return value
        ? value
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
        : [];
}

function selectedFilterLabels(options: Array<{ value: string; label: string }>, values: string[], prefix: string) {
    return values.map((value) => {
        const option = options.find((item) => item.value === value);

        return `${prefix}: ${option?.label ?? value}`;
    });
}






/**
 * Keeps every other query parameter, so paging does not drop a filter or a
 * search term. Page 1 omits the parameter entirely, which keeps the canonical
 * listing URL clean.
 */
function buildPageHref(searchParams: URLSearchParams, target: number) {
    const query = new URLSearchParams(searchParams);

    if (target <= 1) query.delete("page");
    else query.set("page", String(target));

    const suffix = query.toString();

    return suffix ? `/products?${suffix}` : "/products";
}

/**
 * A window of page numbers around the current one, with `null` marking a gap.
 * The first and last are always present so the ends stay one click away.
 */
function pageNumbers(current: number, total: number): Array<number | null> {
    if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

    const pages = new Set<number>([1, total, current]);

    if (current - 1 > 1) pages.add(current - 1);
    if (current + 1 < total) pages.add(current + 1);

    const ordered = [...pages].sort((left, right) => left - right);
    const withGaps: Array<number | null> = [];

    ordered.forEach((value, index) => {
        if (index > 0 && value - ordered[index - 1] > 1) withGaps.push(null);
        withGaps.push(value);
    });

    return withGaps;
}

export function ProductListing({ catalogue, page, pageSize }: ProductListingProps) {
    const [sort, setSort] = useState<SortKey>("latest");
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const searchParams = useSearchParams();

    // The server renders exactly one page, so there is nothing to slice or
    // accumulate: what arrived is what is shown.
    const products = catalogue.products;
    const visibleProducts = useMemo(() => sortProducts(products, sort), [products, sort]);
    /**
     * `catalogue.total` counts variants while the listing collapses them into
     * groups, so the provider's figure is an upper bound on how many cards
     * exist -- the last page or two of the arithmetic come back empty. The
     * numbers are still derived from it because nothing better is exposed, but
     * an empty page is treated as past the end rather than shown as a blank
     * grid with an inverted range.
     */
    const totalPages = Math.max(1, Math.ceil(catalogue.total / pageSize));
    const pageHref = (target: number) => buildPageHref(searchParams, target);
    const isPastEnd = products.length === 0 && page > 1;

    /**
     * The filter drawer, on phones only.
     *
     * The sidebar renders above the grid in source order, which on a phone put
     * roughly 1,000px of checkboxes between the page and the first product. It
     * becomes a drawer instead: the grid starts at the top, and filters open
     * over it.
     *
     * While it is open the page behind must not scroll, and Escape must close
     * it -- both expected of anything modal.
     */
    useEffect(() => {
        if (!isFilterDrawerOpen) return undefined;

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsFilterDrawerOpen(false);
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isFilterDrawerOpen]);

    const selectedCategoryValues = parseCommaSeparatedParam(searchParams.get("categories"));
    const selectedBrandValues = parseCommaSeparatedParam(searchParams.get("brands"));

    /**
     * The aggregations describe the current results, so a filtered view returns
     * a sidebar containing only what survived the filter. The unfiltered view is
     * the one worth keeping; every narrowed view reuses it so the options a
     * visitor did not pick stay reachable.
     */
    const isUnfiltered =
        selectedCategoryValues.length === 0
        && selectedBrandValues.length === 0
        && !searchParams.get("search");

    const [filterOptions, setFilterOptions] = useState<ProductFilterOptions>({
        categories: catalogue.categories,
        brands: catalogue.brands,
        tags: catalogue.tags,
    });

    useEffect(() => {
        const fromServer: ProductFilterOptions = {
            categories: catalogue.categories,
            brands: catalogue.brands,
            tags: catalogue.tags,
        };

        // Deferred: touching storage and setting state inline during an effect
        // makes React re-render in a cascade.
        const timeoutId = window.setTimeout(() => {
            if (isUnfiltered) {
                writeCachedFilters(fromServer);
                setFilterOptions(fromServer);
                return;
            }

            // Falls back to what the server sent when nothing is cached — a
            // visitor landing straight on a filtered URL still gets a sidebar.
            setFilterOptions(readCachedFilters() ?? fromServer);
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, [catalogue, isUnfiltered]);
    const activeFilterCount = selectedCategoryValues.length + selectedBrandValues.length;
    const activeFilterLabels = [
        ...selectedFilterLabels(filterOptions.categories, selectedCategoryValues, "Category"),
        ...selectedFilterLabels(filterOptions.brands, selectedBrandValues, "Brand"),
    ];

    return (
        <section
            className={`product-listing${isFilterDrawerOpen ? " filters-open" : ""}`}
            aria-label="Product listing"
        >
            {/* Phone-only entry point; the sidebar is always present on desktop. */}
            <button
                type="button"
                className="filters-trigger"
                onClick={() => setIsFilterDrawerOpen(true)}
                aria-expanded={isFilterDrawerOpen}
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 6h16M7 12h10M10 18h4" />
                </svg>
                Filters
                {activeFilterCount ? <span>{activeFilterCount}</span> : null}
            </button>

            <div
                className="filters-backdrop"
                onClick={() => setIsFilterDrawerOpen(false)}
                aria-hidden="true"
            />

            <aside className="listing-sidebar">
                <div className="filters-drawer-head">
                    <strong>Filters</strong>
                    <button
                        type="button"
                        onClick={() => setIsFilterDrawerOpen(false)}
                        aria-label="Close filters"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <ProductFilters
                    brands={filterOptions.brands}
                    categories={filterOptions.categories}
                    tags={filterOptions.tags}
                    isDrawerOpen={isFilterDrawerOpen}
                />

                <div className="filters-drawer-foot">
                    <button type="button" onClick={() => setIsFilterDrawerOpen(false)}>
                        Show products
                    </button>
                </div>
            </aside>

            <div className="listing-results">
                <div className="toolbar">
                    <label className="sort-control">
                        <span>Sort by</span>
                        <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
                            {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                                <option value={key} key={key}>
                                    {sortLabels[key]}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                {activeFilterLabels.length ? (
                    <div className="result-filter-summary" aria-label="Active product filters">
                        {activeFilterLabels.map((label) => (
                            <span key={label}>{label}</span>
                        ))}
                        <Link href="/products">Clear all</Link>
                    </div>
                ) : null}

                {visibleProducts.length ? (
                    <div className="grid">
                        {visibleProducts.map((product) => (
                            <ProductCard
                                product={product}
                                showVariants
                                showWishlist
                                key={productKey(product)}
                            />
                        ))}
                    </div>
                ) : isPastEnd ? (
                    <div className="empty">
                        <p>There is nothing on page {page}.</p>
                        <Link href={pageHref(1)}>Back to the first page</Link>
                    </div>
                ) : (
                    <div className="empty">
                        <p>No products found for these filters.</p>
                        <Link href="/products">Clear filters</Link>
                    </div>
                )}

                {totalPages > 1 ? (
                    <nav className="pager" aria-label="Product pages">
                        <Link
                            className="pager-step"
                            href={pageHref(page - 1)}
                            aria-disabled={page <= 1}
                            tabIndex={page <= 1 ? -1 : undefined}
                            aria-label="Previous page"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
                            Previous
                        </Link>

                        <ol className="pager-pages">
                            {pageNumbers(page, totalPages).map((entry, index) =>
                                entry === null ? (
                                    // A gap, not a page: the surrounding numbers
                                    // are what the reader steps through.
                                    <li className="pager-gap" key={`gap-${index}`} aria-hidden="true">
                                        &hellip;
                                    </li>
                                ) : (
                                    <li key={entry}>
                                        <Link
                                            href={pageHref(entry)}
                                            aria-current={entry === page ? "page" : undefined}
                                            aria-label={`Page ${entry}`}
                                        >
                                            {entry}
                                        </Link>
                                    </li>
                                ),
                            )}
                        </ol>

                        <Link
                            className="pager-step"
                            href={pageHref(page + 1)}
                            aria-disabled={page >= totalPages}
                            tabIndex={page >= totalPages ? -1 : undefined}
                            aria-label="Next page"
                        >
                            Next
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
                        </Link>
                    </nav>
                ) : null}
            </div>
        </section>
    );
}
