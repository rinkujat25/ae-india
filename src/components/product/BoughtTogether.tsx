"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import type { BoughtTogetherItemModel } from "@/types/models/bought-together.model";
import type { HyperinventoryTemporaryCartResponseDto } from "@/types/dto/hyperinventory/cart.dto";
import { getTemporaryCartReference, notifyCartUpdated, saveTemporaryCartId } from "@/utils/cart-storage";

type AddCartResponse =
    | { mode: "guest"; cart: HyperinventoryTemporaryCartResponseDto }
    | { mode: "user"; cart: { id: string; totalItems: number } };

function formatMoney(value: number) {
    return new Intl.NumberFormat("en-IN").format(value);
}

/**
 * The "Frequently bought together" bundle: a row of thumbnails joined by plus
 * signs, a running total, and one button that adds everything still ticked.
 *
 * The page's own product leads the row and cannot be unticked, so the bundle
 * always includes the thing being read about.
 */
export function BoughtTogether({ items }: { items: BoughtTogetherItemModel[] }) {
    const router = useRouter();
    const apiRequest = useApiRequest();
    const [excludedIds, setExcludedIds] = useState<string[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState("");

    // Tracking what is *off* rather than what is on keeps "everything ticked"
    // as the natural starting state without seeding it from props.
    const selected = useMemo(
        () => items.filter((item) => item.isCurrent || !excludedIds.includes(item.id)),
        [excludedIds, items],
    );

    const total = useMemo(() => selected.reduce((sum, item) => sum + item.price, 0), [selected]);
    const listTotal = useMemo(
        () => selected.reduce((sum, item) => sum + (item.mrp > item.price ? item.mrp : item.price), 0),
        [selected],
    );
    const saving = listTotal - total;

    // One product on its own is not a bundle.
    if (items.length < 2) return null;

    function toggle(item: BoughtTogetherItemModel) {
        if (item.isCurrent) return;

        setExcludedIds((current) =>
            current.includes(item.id)
                ? current.filter((id) => id !== item.id)
                : [...current, item.id],
        );
    }

    async function handleAddAll() {
        if (isAdding || !selected.length) return;

        setIsAdding(true);
        setError("");

        try {
            // Sequential rather than parallel: a guest cart is created by the
            // first call and its id has to be carried into the next one.
            for (const item of selected) {
                const temporaryCartId = getTemporaryCartReference()?.temporaryCartId;
                const response = await apiRequest<AddCartResponse>("/api/cart/items", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        productId: item.id,
                        quantity: 1,
                        applicableAmount: item.price,
                        temporaryCartId,
                    }),
                });

                if (response.mode === "guest") {
                    saveTemporaryCartId(response.cart.sales_channel_id, response.cart.temporary_cart_id);
                }
            }

            notifyCartUpdated();
            router.push("/cart");
        } catch (caught) {
            setError(
                caught instanceof Error
                    ? caught.message
                    : "We could not add these products to your cart. Please try again.",
            );
        } finally {
            setIsAdding(false);
        }
    }

    return (
        <section className="bt" aria-labelledby="bought-together-title">
            <h2 id="bought-together-title">Frequently bought together</h2>

            <div className="bt-body">
                <div className="bt-row" aria-hidden="true">
                    {selected.map((item, index) => (
                        <div className="bt-thumb-wrap" key={item.id}>
                            {index > 0 ? <span className="bt-plus">+</span> : null}
                            <span className="bt-thumb">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" />
                                ) : (
                                    <span className="bt-noimg">No image</span>
                                )}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="bt-summary">
                    <p className="bt-total">
                        <span>Total price</span>
                        <strong>₹{formatMoney(total)}</strong>
                        {saving > 0 ? <small>You save ₹{formatMoney(saving)}</small> : null}
                    </p>
                    <button
                        className="btn btn-primary bt-add"
                        type="button"
                        onClick={handleAddAll}
                        disabled={isAdding || !selected.length}
                    >
                        {isAdding
                            ? "Adding..."
                            : `Add ${selected.length} ${selected.length === 1 ? "item" : "items"} to cart`}
                    </button>
                    {error ? (
                        <p className="bt-error" role="alert">
                            {error}
                        </p>
                    ) : null}
                </div>
            </div>

            <ul className="bt-list">
                {items.map((item) => {
                    const isOn = item.isCurrent || !excludedIds.includes(item.id);

                    return (
                        <li className="bt-item" key={item.id}>
                            <label className="bt-check">
                                <input
                                    type="checkbox"
                                    checked={isOn}
                                    disabled={item.isCurrent}
                                    onChange={() => toggle(item)}
                                />
                                <span className="bt-name">
                                    {item.isCurrent ? <b>This item: </b> : null}
                                    {item.slug ? (
                                        <Link href={`/products/${item.slug}`}>{item.name}</Link>
                                    ) : (
                                        item.name
                                    )}
                                </span>
                            </label>
                            <span className="bt-price">
                                {item.price ? `₹${formatMoney(item.price)}` : "Price on request"}
                                {item.mrp > item.price ? <s>₹{formatMoney(item.mrp)}</s> : null}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
