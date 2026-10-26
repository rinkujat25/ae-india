export type HyperinventoryOrderProductImageDto = {
    url?: string;
    /** Sometimes a string, sometimes an array of strings. Not relied on. */
    tags?: string | string[];
    position?: number;
};

export type HyperinventoryOrderProductDto = {
    id?: string;
    name?: string;
    display_name?: string;
    sku?: string;
    url_path?: string;
    featured_images?: HyperinventoryOrderProductImageDto[];
};

export type HyperinventoryOrderItemDto = {
    id?: string;
    position?: number | null;
    product?: HyperinventoryOrderProductDto;
    price?: number;
    price_for_user?: number;
    quantity?: number;
};

export type HyperinventoryOrderDto = {
    id: string;
    order_number?: string;
    order_items?: HyperinventoryOrderItemDto[];
    status?: string;
    payment_status?: string;
    /** Authoritative: it can differ from the sum of the line items. */
    order_total?: number;
    created_at?: string;
    gateway_type?: string | null;
    payment_mode?: string | null;
};

export type HyperinventoryOrderListDto = {
    count: number;
    next: string | null;
    previous: string | null;
    results: HyperinventoryOrderDto[];
};

/** One address as the order detail returns it, already resolved to names. */
export type HyperinventoryOrderAddressDto = {
    id?: string;
    display_name?: string | null;
    legal_name?: string | null;
    address_line_1?: string | null;
    address_line_2?: string | null;
    landmark?: string | null;
    city?: string | null;
    pincode?: string | null;
    gst_number?: string | null;
    contact_person_number?: string | null;
    contact_person_email?: string | null;
    state?: { name?: string } | null;
    country?: { name?: string } | null;
};

export type HyperinventoryOrderPaymentMethodDto = {
    id?: string;
    name?: string | null;
    gateway_type?: string | null;
};

/**
 * `GET /v2/consumer/orders/{id}/`. Richer than the list row: it carries the
 * addresses, the money breakdown and the payment method, none of which the
 * list returns.
 */
export type HyperinventoryOrderDetailDto = {
    id: string;
    order_number?: string | null;
    created_at?: string | null;
    status?: string | null;
    payment_status?: string | null;
    subtotal?: number | string | null;
    gst_amount?: number | string | null;
    shipping_charges?: number | string | null;
    additional_charges?: number | string | null;
    additional_discount?: number | string | null;
    payment_method_charges?: number | string | null;
    order_total?: number | string | null;
    amount_due?: number | string | null;
    total_items?: number | null;
    order_items?: HyperinventoryOrderItemDto[];
    shipping_address?: HyperinventoryOrderAddressDto | null;
    billing_address?: HyperinventoryOrderAddressDto | null;
    payment_method?: HyperinventoryOrderPaymentMethodDto | null;
    payment_detail?: { created_at?: string | null } | null;
};
