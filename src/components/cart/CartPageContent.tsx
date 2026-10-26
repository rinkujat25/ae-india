"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CartQuoteDialog } from "@/components/cart/CartQuoteDialog";
import { useApiRequest } from "@/hooks/useApiRequest";
import { buildLoginHref } from "@/utils/auth-mode";
import type { CartItemModel, CartModel } from "@/types/models/cart.model";
import {
    clearTemporaryCart,
    getTemporaryCartReference,
    notifyCartUpdated,
} from "@/utils/cart-storage";

type CartResponse = { cart: CartModel | null; mode: "guest" | "user" };

function formatMoney(value: number) {
    return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function CartPageContent() {
    const apiRequest = useApiRequest();
    const [cart, setCart] = useState<CartModel | null>(null);
    const [cartError, setCartError] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);
    const [mode, setMode] = useState<"guest" | "user">("guest");
    const [isUpdating, setIsUpdating] = useState(false);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const items = useMemo(() => cart?.items ?? [], [cart]);
    const totals = useMemo(() => items.reduce((result, item) => {
        result.quantity += item.quantity;
        result.subtotal += item.price * item.quantity;
        result.savings += Math.max(0, item.mrp - item.price) * item.quantity;
        return result;
    }, { quantity: 0, subtotal: 0, savings: 0 }), [items]);

    const loadCart = useCallback(async () => {
        // One call for both modes: the route returns the signed-in buyer's cart
        // when there is a session, and the guest cart otherwise.
        const reference = getTemporaryCartReference();
        const query = reference ? `?temporaryCartId=${encodeURIComponent(reference.temporaryCartId)}` : "";

        try {
            const response = await apiRequest<CartResponse>(`/api/cart${query}`);
            setCart(response.cart);
            setMode(response.mode);
            setCartError("");
        } catch (error) {
            setCartError(error instanceof Error ? error.message : "Unable to load the cart right now.");
        } finally {
            setHasLoaded(true);
        }
    }, [apiRequest]);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => void loadCart(), 0);
        return () => window.clearTimeout(timeoutId);
    }, [loadCart]);

    async function updateItems(nextItems: Array<{ itemId?: string; productId: string; quantity: number }>) {
        if (isUpdating) return;

        // Signed-in carts key on the cart line id; guest carts key on the product.
        const reference = getTemporaryCartReference();
        const query = mode === "guest" && reference
            ? `?temporaryCartId=${encodeURIComponent(reference.temporaryCartId)}`
            : "";

        if (mode === "guest" && !reference) return;

        setIsUpdating(true);
        setCartError("");

        try {
            const response = await apiRequest<CartResponse>(`/api/cart${query}`, {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ items: nextItems }),
            });
            setCart(response.cart);
            notifyCartUpdated();
        } catch (error) {
            setCartError(error instanceof Error ? error.message : "Unable to update the cart right now.");
        } finally {
            setIsUpdating(false);
        }
    }

    function updateQuantity(item: CartItemModel, quantity: number) {
        const nextQuantity = Math.max(1, Math.floor(quantity) || 1);
        if (nextQuantity !== item.quantity) {
            void updateItems([{ itemId: item.itemId, productId: item.productId, quantity: nextQuantity }]);
        }
    }

    /** Removal has its own endpoint per mode, so it does not go through updateItems. */
    async function removeItems(targets: CartItemModel[]) {
        if (isUpdating || targets.length === 0) return;

        const reference = getTemporaryCartReference();
        const query = mode === "guest" && reference
            ? `?temporaryCartId=${encodeURIComponent(reference.temporaryCartId)}`
            : "";

        if (mode === "guest" && !reference) return;

        setIsUpdating(true);
        setCartError("");

        try {
            const response = await apiRequest<CartResponse>(`/api/cart${query}`, {
                method: "DELETE",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(
                    mode === "user"
                        ? { itemIds: targets.map((item) => item.itemId).filter(Boolean) }
                        : { productIds: targets.map((item) => item.productId) },
                ),
            });

            setCart(response.cart);

            // A guest cart only exists through the id kept in this browser, so
            // once the last line is gone that id points at a spent cart. Drop it
            // and the next add starts a fresh one. `clearTemporaryCart` notifies
            // the header itself, so it replaces the usual call rather than
            // running alongside it.
            if (mode === "guest" && !response.cart?.items.length) {
                clearTemporaryCart();
            } else {
                notifyCartUpdated();
            }
        } catch (error) {
            setCartError(error instanceof Error ? error.message : "Unable to update the cart right now.");
        } finally {
            setIsUpdating(false);
        }
    }

    function removeItem(item: CartItemModel) {
        void removeItems([item]);
    }

    function clearCart() {
        void removeItems(items);
    }

    // Checkout needs a signed-in buyer, so a guest is sent to sign in first and
    // comes straight back to the cart afterwards.
    const checkoutHref = mode === "user" ? "/checkout" : buildLoginHref({ next: "/cart" });

    return (
        <main className="cart-page">
            <div className="cart-wrap">
                <Breadcrumbs
                    trail={[{ label: "Products", href: "/products" }, { label: "Shopping cart" }]}
                />
                <header className="cart-head">
                    <h1>Shopping cart</h1>
                    <Link className="cart-back" href="/products">‹ Continue shopping</Link>
                    <p>Buy what you need now, or send the list across for bulk pricing if you are gifting at volume.</p>
                </header>
                {cartError ? <p className="cart-load-error" role="alert">{cartError}</p> : null}

                {!hasLoaded ? null : items.length ? (
                    <div className="cart-grid">
                        <section className="cart-lines" aria-label="Cart items">
                            <div className="cart-lines-top">
                                <b>{items.length} {items.length === 1 ? "product" : "products"}</b>
                                <span>· {totals.quantity} {totals.quantity === 1 ? "item" : "items"}</span>
                                <button type="button" disabled={isUpdating} onClick={clearCart}>Clear cart</button>
                            </div>
                            {items.map((item) => {
                                const mrp = item.mrp || item.price;
                                const saving = Math.max(0, mrp - item.price) * item.quantity;
                                const productHref = item.slug ? `/products/${item.slug}` : "/products";
                                return (
                                    <article className="cart-line" key={item.productId}>
                                        <Link className="cart-line-media" href={productHref}>
                                            {item.imageUrl ? <img src={item.imageUrl} alt="" referrerPolicy="no-referrer" /> : <span>No image</span>}
                                        </Link>
                                        <div className="cart-line-body">
                                            <span className="cart-line-brand">{item.brand}</span>
                                            <h2><Link href={productHref}>{item.name}</Link></h2>
                                            {item.sku ? <p className="cart-variant">SKU: {item.sku}</p> : null}
                                            <div className="cart-line-price">
                                                <b>{formatMoney(item.price)}</b>
                                                {mrp > item.price ? <span>MRP: <s>{formatMoney(mrp)}</s></span> : null}
                                            </div>
                                            <p className="cart-subtotal">Subtotal: <b>{formatMoney(item.price * item.quantity)}</b></p>
                                            <div className="cart-line-actions">
                                                <div className="cart-qty">
                                                    <button type="button" aria-label={`Decrease quantity for ${item.name}`} disabled={isUpdating || item.quantity <= 1} onClick={() => updateQuantity(item, item.quantity - 1)}>−</button>
                                                    <input aria-label={`Quantity for ${item.name}`} type="number" min={1} value={item.quantity} disabled={isUpdating} onChange={(event) => updateQuantity(item, Number(event.target.value))} />
                                                    <button type="button" aria-label={`Increase quantity for ${item.name}`} disabled={isUpdating} onClick={() => updateQuantity(item, item.quantity + 1)}>+</button>
                                                </div>
                                                <button className="cart-remove" type="button" disabled={isUpdating} onClick={() => removeItem(item)}>
                                                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>Remove
                                                </button>
                                            </div>
                                            {saving ? <p className="cart-saved">Applied: Discount <b>You saved {formatMoney(saving)} on this item</b></p> : null}
                                        </div>
                                    </article>
                                );
                            })}
                            <div className="cart-lines-foot"><Link href="/products">← Add more products</Link></div>
                        </section>

                        <aside className="cart-summary" aria-label="Cart summary">
                            <h2>Cart Summary</h2>
                            <div className="cart-summary-row"><span>Products Total<small>Inclusive of GST</small></span><b>{formatMoney(totals.subtotal)}</b></div>
                            {totals.savings ? <div className="cart-summary-row cart-summary-saved"><span>Applied: Discount</span><b>− {formatMoney(totals.savings)}</b></div> : null}
                            <div className="cart-summary-total"><span>Total</span><b>{formatMoney(totals.subtotal)}</b></div>
                            <p className="cart-summary-note">Delivery and any branding are confirmed at checkout.</p>
                            <Link className="btn btn-primary" href={checkoutHref}>Proceed To Buy</Link>
                            {mode === "guest" ? <p className="cart-summary-note">You will be asked to sign in before checkout.</p> : null}
                            <button className="btn btn-soft" type="button" onClick={() => setIsQuoteOpen(true)}>Request a quote →</button>
                            <p className="cart-quote-hint">Buying in volume? Ask for bulk pricing before you order. It is usually lower than the listed price.</p>
                            <ul><li>✓ Buy a single unit, or thousands.</li><li>✓ Bulk orders get branding and program pricing.</li><li>✓ Pan-India delivery, managed end to end.</li></ul>
                        </aside>
                    </div>
                ) : (
                    <section className="cart-empty" aria-live="polite">
                        <span className="cart-empty-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 4h2.2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.55L21 8H6.4" /><circle cx="10" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /></svg></span>
                        <h2>Your cart is empty.</h2>
                        <p>Add gifts from the catalogue and they collect here. Buy them outright, or ask us for bulk pricing if you are gifting at volume.</p>
                        <Link className="btn btn-primary" href="/products">Browse all products →</Link>
                    </section>
                )}
            </div>

            <CartQuoteDialog items={items} isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
        </main>
    );
}
