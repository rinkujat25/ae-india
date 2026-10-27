"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CategoryUnavailable } from "@/components/category/CategoryUnavailable";
import { ProductCard } from "@/components/product/ProductCard";
import type { CategoryModel } from "@/types/models/category.model";
import type { ProductCategoryModel } from "@/types/models/product-category.model";
import type { ProductModel } from "@/types/models/product.model";
import { type SortKey, sortLabels, sortProducts } from "@/utils/product-sort";

type CategoryPageContentProps = {
    products: ProductModel[];
    /**
     * The read that fills the grid failed. Not the same as `products` being
     * empty: an empty category says so, a failed read says it could not tell.
     */
    failed: boolean;
    /** The category's own URL, for "Try again". */
    retryHref: string;
    /** Sub-categories of this category, each with the URL it lives at. */
    subCategories: Array<ProductCategoryModel & { slug: string }>;
    /** The sub-category currently applied, already validated by the page. */
    activeSub: string;
    /** Where the chips link: the category's own URL. */
    categoryHref: string;
    /** Products in the whole category, for the "All" chip. */
    totalInCategory: number;
    /** The other top-level categories, for the strip at the bottom. */
    siblings: CategoryModel[];
};

type ViewKey = "cols-3" | "cols-4" | "list";

const views: Array<{ key: ViewKey; label: string; bars: number[] }> = [
    { key: "cols-3", label: "Three columns", bars: [4, 12, 20] },
    { key: "cols-4", label: "Four columns", bars: [3, 9, 15, 21] },
    { key: "list", label: "List", bars: [] },
];

const pageSize = 24;

export function CategoryPageContent({
    products,
    failed,
    retryHref,
    subCategories,
    activeSub,
    categoryHref,
    totalInCategory,
    siblings,
}: CategoryPageContentProps) {
    const [view, setView] = useState<ViewKey>("cols-4");
    const [sort, setSort] = useState<SortKey>("latest");
    const [shown, setShown] = useState(pageSize);

    const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);
    const visible = sorted.slice(0, shown);

    return (
        <>
            {/* View, count and sort all act on products that did not load. */}
            {failed ? null : (
                <div className="cat-toolbar">
                    <span className="cat-tlabel">View as</span>
                    <div className="cat-views">
                        {views.map((option) => (
                            <button
                                className="cat-vbtn"
                                type="button"
                                key={option.key}
                                aria-pressed={view === option.key}
                                aria-label={option.label}
                                onClick={() => setView(option.key)}
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    {option.bars.length ? (
                                        option.bars.map((x) => <path d={`M${x} 4v16`} key={x} />)
                                    ) : (
                                        <>
                                            <path d="M4 6h16" />
                                            <path d="M4 12h16" />
                                            <path d="M4 18h16" />
                                        </>
                                    )}
                                </svg>
                            </button>
                        ))}
                    </div>

                    <span className="cat-count">
                        {sorted.length} {sorted.length === 1 ? "product" : "products"}
                    </span>

                    <div className="cat-sortwrap">
                        <span className="cat-tlabel">Sort by</span>
                        <select
                            aria-label="Sort by"
                            value={sort}
                            onChange={(event) => setSort(event.target.value as SortKey)}
                        >
                            {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                                <option value={key} key={key}>
                                    {sortLabels[key]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {subCategories.length ? (
                <nav className="cat-subs" aria-label="Sub-categories">
                    {/* Links, not buttons: the catalogue holds no per-product
                        sub-category, so narrowing means asking the API again.
                        Each sub-category is a page of its own, on the same URL
                        pattern as the category it belongs to. */}
                    <Link
                        className="cat-sub"
                        href={categoryHref}
                        aria-current={activeSub ? undefined : "page"}
                    >
                        All <span>{totalInCategory}</span>
                    </Link>
                    {subCategories.map((item) => (
                        <Link
                            className="cat-sub"
                            key={item.value}
                            href={`/category/${item.slug}`}
                            aria-current={activeSub === item.value ? "page" : undefined}
                        >
                            {item.label} <span>{item.count}</span>
                        </Link>
                    ))}
                </nav>
            ) : null}

            {failed ? (
                <CategoryUnavailable subject="these products" retryHref={retryHref} />
            ) : visible.length ? (
                <>
                    <div className={`cat-grid ${view}`}>
                        {visible.map((product) => (
                            <ProductCard product={product} key={product.id || product.slug} showWishlist />
                        ))}
                    </div>

                    {shown < sorted.length ? (
                        <div className="cat-more">
                            <button
                                className="btn btn-soft"
                                type="button"
                                onClick={() => setShown(shown + pageSize)}
                            >
                                Show more ({sorted.length - shown} left)
                            </button>
                        </div>
                    ) : null}
                </>
            ) : (
                <section className="cat-empty" aria-live="polite">
                    {/* Four of the six categories currently hold no products at
                        all, so the empty state has to say which case it is. */}
                    <b>{activeSub ? "Nothing in this sub-category yet." : "Nothing in this category yet."}</b>
                    <p>
                        {activeSub
                            ? "Try another sub-category, or browse the full catalogue."
                            : "We are still adding products here. Browse the full catalogue in the meantime."}
                    </p>
                    <Link className="btn btn-primary" href="/products">
                        Browse all products →
                    </Link>
                </section>
            )}

            {siblings.length ? (
                <section className="cat-siblings">
                    <h2>Other categories</h2>
                    <div className="cat-sib-grid">
                        {siblings.map((item) => (
                            <Link className="cat-sib" href={`/category/${item.slug}`} key={item.id}>
                                <b>{item.label}</b>
                                {item.description ? <span>{item.description}</span> : null}
                            </Link>
                        ))}
                    </div>
                </section>
            ) : null}
        </>
    );
}
