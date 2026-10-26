/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { LinkLoadingIndicator } from "@/components/common/LinkLoadingIndicator";
import type { WishlistItemModel } from "@/types/models/wishlist.model";
import { formatInr } from "@/utils/currency";

type AccountWishlistPanelProps = {
    items: WishlistItemModel[];
    /** Saved products the catalogue no longer returns. */
    unavailableCount?: number;
};

export function AccountWishlistPanel({ items, unavailableCount = 0 }: AccountWishlistPanelProps) {
    if (items.length === 0) {
        return (
            <section className="account-card">
                <div className="account-blank">
                    <div className="account-blank-icon">
                        <svg aria-hidden="true">
                            <use href="#account-heart" />
                        </svg>
                    </div>
                    <h2>Nothing saved yet.</h2>
                    <p>Tap the heart on any product and it waits for you here until you are ready to build a cart.</p>
                    <Link className="btn btn-primary" href="/products">
                        Browse all products →
                        <LinkLoadingIndicator />
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <>
            <div className="account-wish-grid">
                {items.map((item) => {
                    const hasDiscount = item.mrp > item.price && item.price > 0;

                    return (
                        <article key={item.slug} className="account-wish">
                            <Link className="account-wish-media" href={`/products/${item.slug}`}>
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" />
                                ) : (
                                    <span>No image</span>
                                )}
                                <LinkLoadingIndicator />
                            </Link>

                            <div className="account-wish-body">
                                {item.brand ? <span className="account-wish-brand">{item.brand}</span> : null}
                                <h2>
                                    <Link href={`/products/${item.slug}`}>
                                        {item.name}
                                        <LinkLoadingIndicator />
                                    </Link>
                                </h2>

                                {item.price > 0 ? (
                                    <p className="account-wish-price">
                                        {formatInr(item.price)}
                                        {hasDiscount ? <s>{formatInr(item.mrp)}</s> : null}
                                    </p>
                                ) : (
                                    <p className="account-wish-quote">Price on request</p>
                                )}

                                <Link className="btn btn-primary account-btn-sm" href={`/products/${item.slug}`}>
                                    View product
                                    <LinkLoadingIndicator />
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>

            {unavailableCount > 0 ? (
                <p className="account-note account-gap">
                    {unavailableCount} saved {unavailableCount === 1 ? "product is" : "products are"} no longer
                    available in the catalogue and {unavailableCount === 1 ? "is" : "are"} not shown.
                </p>
            ) : null}
        </>
    );
}
