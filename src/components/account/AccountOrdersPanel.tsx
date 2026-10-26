/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { LinkLoadingIndicator } from "@/components/common/LinkLoadingIndicator";
import type { OrderModel } from "@/types/models/order.model";
import { formatInr } from "@/utils/currency";

type AccountOrdersPanelProps = {
    orders: OrderModel[];
};

/** Two thumbnails, then a "+N" tile for whatever else is in the order. */
const maxThumbnails = 2;

const dateFormatter = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" });

function formatPlacedOn(value: string) {
    const date = new Date(value);

    return Number.isNaN(date.getTime()) ? "—" : dateFormatter.format(date);
}

export function AccountOrdersPanel({ orders }: AccountOrdersPanelProps) {
    if (orders.length === 0) {
        return (
            <section className="account-card">
                <div className="account-blank">
                    <div className="account-blank-icon">
                        <svg aria-hidden="true">
                            <use href="#account-bag" />
                        </svg>
                    </div>
                    <h2>No orders yet.</h2>
                    <p>Orders you place will appear here with their status, items and totals.</p>
                    <Link className="btn btn-primary" href="/products">
                        Browse all products →
                        <LinkLoadingIndicator />
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <div className="account-orders">
            {orders.map((order) => {
                const thumbnails = order.items.filter((item) => item.imageUrl).slice(0, maxThumbnails);
                const hiddenCount = order.productCount - thumbnails.length;

                return (
                    <article key={order.id} className="account-order">
                        <div className="account-order-top">
                            <div>
                                <span>Order</span>
                                <b>{order.orderNumber || "—"}</b>
                            </div>
                            <div>
                                <span>Placed</span>
                                <b>{formatPlacedOn(order.placedOn)}</b>
                            </div>
                            <div>
                                <span>Total</span>
                                <b>{formatInr(order.total)}</b>
                            </div>
                            <span className={`account-pill account-pill-${order.statusTone}`}>{order.statusLabel}</span>
                        </div>

                        <div className="account-order-body">
                            <div className="account-order-thumbs">
                                {thumbnails.map((item) => (
                                    <span key={item.id || item.productId}>
                                        <img src={item.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" />
                                    </span>
                                ))}
                                {hiddenCount > 0 ? <span>+{hiddenCount}</span> : null}
                            </div>

                            <p className="account-order-summary">
                                {order.productCount} {order.productCount === 1 ? "product" : "products"} ·{" "}
                                <b>
                                    {order.unitCount} {order.unitCount === 1 ? "unit" : "units"}
                                </b>
                                {order.paymentStatusLabel ? ` · ${order.paymentStatusLabel}` : ""}
                            </p>

                            <Link className="btn btn-soft account-btn-sm" href={`/account/orders/${order.id}`}>
                                View details
                            </Link>
                            <button className="btn btn-soft account-btn-sm" type="button" disabled>
                                {order.actionLabel}
                            </button>
                        </div>
                    </article>
                );
            })}

            <p className="account-note account-gap">
                Track and reorder need endpoints the provider does not expose yet, so both stay disabled.
            </p>
        </div>
    );
}
