/** Drives the status pill colour. */
export type OrderStatusTone = "success" | "pending" | "cancelled" | "neutral";

export type OrderItemModel = {
    id: string;
    productId: string;
    name: string;
    sku: string;
    slug: string;
    imageUrl: string;
    price: number;
    quantity: number;
    lineTotal: number;
};

export type OrderModel = {
    id: string;
    orderNumber: string;
    placedOn: string;
    status: string;
    statusLabel: string;
    statusTone: OrderStatusTone;
    paymentStatusLabel: string;
    paymentMethodLabel: string;
    total: number;
    /** "Track order" while in flight, "Reorder" once it is finished. */
    actionLabel: string;
    productCount: number;
    unitCount: number;
    items: OrderItemModel[];
};

export type OrderAddressModel = {
    /** Company or person the delivery is addressed to. */
    name: string;
    /** The street lines, already joined in reading order. */
    lines: string;
    contact: string;
    gstNumber: string;
};

export type OrderDetailModel = {
    id: string;
    orderNumber: string;
    placedOn: string;
    status: string;
    statusLabel: string;
    statusTone: OrderStatusTone;
    paymentStatusLabel: string;
    paymentMethodLabel: string;
    /** When payment was taken; empty while nothing has been collected. */
    paidOn: string;
    subtotal: number;
    gst: number;
    shipping: number;
    additionalCharges: number;
    discount: number;
    total: number;
    /** Already paid, derived as total minus what is still due. */
    paidAmount: number;
    pendingAmount: number;
    itemCount: number;
    items: OrderItemModel[];
    shippingAddress: OrderAddressModel | null;
    billingAddress: OrderAddressModel | null;
};
