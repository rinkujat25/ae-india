/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { CartItemModel } from "@/types/models/cart.model";
import type { CashPointsModel } from "@/types/models/cash-point.model";
import { formatInr } from "@/utils/currency";

type CheckoutOrderSummaryProps = {
    items: CartItemModel[];
    /** Null when the read failed; hidden entirely when the seller runs no programme. */
    cashPoints: CashPointsModel | null;
};

export function CheckoutOrderSummary({ items, cashPoints }: CheckoutOrderSummaryProps) {
    // Only what is actually charged. An MRP-versus-price saving does not come off
    // the order total, so showing it as an applied discount would misstate the bill.
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <section className="co-summary" aria-label="Order summary">
            <h2>Order Summary</h2>

            {items.map((item) => {
                const productHref = item.slug ? `/products/${item.slug}` : "/products";

                return (
                    <article className="co-line" key={item.itemId ?? item.productId}>
                        <span className="co-line-media">
                            {item.imageUrl ? (
                                <img src={item.imageUrl} alt="" referrerPolicy="no-referrer" />
                            ) : (
                                <span>No image</span>
                            )}
                        </span>
                        <div>
                            <h3 className="co-line-name">
                                <Link href={productHref}>{item.name}</Link>
                            </h3>
                            <p className="co-line-qty">Qty: {item.quantity}</p>
                            {item.quantity > 1 ? (
                                <p className="co-line-unit">
                                    <b>{formatInr(item.price)}</b> per unit
                                </p>
                            ) : null}
                        </div>
                        <b className="co-line-amount">{formatInr(item.price * item.quantity)}</b>
                    </article>
                );
            })}

            <div className="co-total">
                <div>
                    <span>Products total</span>
                    <small>Inclusive GST</small>
                </div>
                <b>{formatInr(subtotal)}</b>
            </div>

            {cashPoints?.isEnabled ? (
                <div className="co-points">
                    <b>{cashPoints.balance.toLocaleString("en-IN")} CashPoints</b>
                    <span>
                        available with this seller
                        {cashPoints.pending > 0
                            ? `, ${cashPoints.pending.toLocaleString("en-IN")} more on the way`
                            : ""}
                        {cashPoints.expiring > 0
                            ? `. ${cashPoints.expiring.toLocaleString("en-IN")} expiring soon`
                            : ""}
                        .
                    </span>
                    <small>Redeeming them at checkout needs the endpoint that applies points to a quotation.</small>
                </div>
            ) : null}

            <div className="co-total co-total-grand">
                <div>
                    <span>Order Total</span>
                    <small>Inclusive of shipping and payment charges if any</small>
                </div>
                <b>{formatInr(subtotal)}</b>
            </div>
        </section>
    );
}
