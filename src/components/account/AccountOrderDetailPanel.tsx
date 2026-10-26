/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { OrderDetailModel } from "@/types/models/order.model";

function formatMoney(value: number) {
    return `₹${new Intl.NumberFormat("en-IN").format(Math.round(value))}`;
}

/** Short numeric date, as the order header shows it. */
function formatDate(value: string) {
    if (!value) return "";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
        ? ""
        : date.toLocaleDateString("en-GB", { day: "numeric", month: "numeric", year: "2-digit" });
}

function AddressCard({ heading, address }: { heading: string; address: OrderDetailModel["shippingAddress"] }) {
    if (!address) return null;

    return (
        <section className="order-panel">
            <h2>{heading}</h2>
            <p className="order-address">
                {address.name ? <strong>{address.name}</strong> : null}
                {address.lines}
            </p>
            {address.contact ? <p className="order-meta">Contact : {address.contact}</p> : null}
            {address.gstNumber ? <p className="order-meta">GSTIN : {address.gstNumber}</p> : null}
        </section>
    );
}

/**
 * One order in full.
 *
 * Totals come from the provider rather than being recomputed here: a line's
 * price can be discounted by an offer the item row does not spell out, so
 * adding the lines up locally would disagree with what the buyer was charged.
 */
export function AccountOrderDetailPanel({ order }: { order: OrderDetailModel }) {
    const rows: Array<[string, number]> = [
        ["GST", order.gst],
        ["Shipping", order.shipping],
        ["Other charges", order.additionalCharges],
    ];

    return (
        <div className="order-detail">
            <div className="order-detail-head">
                <h1>Order Details</h1>
                <Link className="order-back" href="/account/orders">
                    ‹ All orders
                </Link>
            </div>

            <p className="order-meta">
                ORDER#: <strong>{order.orderNumber}</strong>
            </p>
            {order.placedOn ? (
                <p className="order-meta">
                    DATE: <strong>{formatDate(order.placedOn)}</strong>
                </p>
            ) : null}
            {order.statusLabel ? (
                <p className={`order-status tone-${order.statusTone}`}>{order.statusLabel}</p>
            ) : null}

            <div className="order-columns">
                <AddressCard heading="Delivery Address" address={order.shippingAddress} />

                <section className="order-panel">
                    <h2>Payment Information</h2>
                    {order.paymentMethodLabel ? (
                        <p className="order-meta">
                            Gateway : <strong>{order.paymentMethodLabel}</strong>
                        </p>
                    ) : null}
                    <p className="order-meta">
                        Date : <strong>{formatDate(order.paidOn) || "N/A"}</strong>
                    </p>
                    <p className="order-meta">
                        Partially paid amount : <strong>{formatMoney(order.paidAmount)}</strong>
                    </p>
                    <p className="order-meta">
                        Pending amount : <strong>{formatMoney(order.pendingAmount)}</strong>
                    </p>
                    <p className="order-meta">
                        Payment Status : <strong>{order.paymentStatusLabel || "—"}</strong>
                    </p>
                </section>
            </div>

            <section className="order-panel order-total-panel">
                <h2>Order Total</h2>

                <ul className="order-items">
                    {order.items.map((item) => (
                        <li className="order-item" key={item.id}>
                            <span className="order-item-media">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" />
                                ) : null}
                            </span>
                            <span className="order-item-body">
                                {item.slug ? (
                                    <Link href={`/products/${item.slug}`}>{item.name}</Link>
                                ) : (
                                    <b>{item.name}</b>
                                )}
                                <small>Qty: {item.quantity}</small>
                            </span>
                            <span className="order-item-price">{formatMoney(item.lineTotal)}</span>
                        </li>
                    ))}
                </ul>

                <dl className="order-sums">
                    <div>
                        <dt>
                            Subtotal:
                            <small>
                                ({order.itemCount} {order.itemCount === 1 ? "item" : "items"})
                            </small>
                        </dt>
                        <dd>{formatMoney(order.subtotal)}</dd>
                    </div>

                    {rows
                        .filter(([, amount]) => amount > 0)
                        .map(([label, amount]) => (
                            <div key={label}>
                                <dt>{label}</dt>
                                <dd>{formatMoney(amount)}</dd>
                            </div>
                        ))}

                    {order.discount > 0 ? (
                        <div>
                            <dt>Discount</dt>
                            <dd>-{formatMoney(order.discount)}</dd>
                        </div>
                    ) : null}

                    <div className="order-sum-total">
                        <dt>Total</dt>
                        <dd>{formatMoney(order.total)}</dd>
                    </div>
                </dl>
            </section>

            <p className="order-note">For order cancellation please contact our support executive.</p>
        </div>
    );
}
