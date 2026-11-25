"use client";

import Link from "next/link";
import { useState } from "react";
import { CategoryUnavailable } from "@/components/category/CategoryUnavailable";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductSortSelect } from "@/components/product/ProductSortSelect";
import type { ProductCategoryModel } from "@/types/models/product-category.model";
import type { ProductModel } from "@/types/models/product.model";

type CategoryPageContentProps = {
    /** Already in the order the URL asked for; the server sorted them. */
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
};

const pageSize = 24;

export function CategoryPageContent({
    products,
    failed,
    retryHref,
    subCategories,
    activeSub,
    categoryHref,
    totalInCategory,
}: CategoryPageContentProps) {
    const [shown, setShown] = useState(pageSize);
    const visible = products.slice(0, shown);

    return (
        <>
            {/* Count and sort both act on products that did not load. */}
            {failed ? null : (
                <div className="cat-toolbar">
                    <span className="cat-count">
                        Showing <b>{visible.length}</b> of {products.length}{" "}
                        {products.length === 1 ? "product" : "products"}
                    </span>

                    <div className="cat-sortwrap">
                        <span className="cat-tlabel">Sort by</span>
                        <ProductSortSelect />
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
                    <div className="cat-grid">
                        {visible.map((product) => (
                            <ProductCard product={product} key={product.id || product.slug} showWishlist showActions />
                        ))}
                    </div>

                    {shown < products.length ? (
                        <div className="cat-more">
                            <button
                                className="btn btn-soft"
                                type="button"
                                onClick={() => setShown(shown + pageSize)}
                            >
                                Show more ({products.length - shown} left)
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

        </>
    );
}
