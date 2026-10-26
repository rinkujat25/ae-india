export type HyperinventoryQuotationDto = {
    id: string;
    quotation_number?: string;
    status?: string;
    cart?: string;
    subtotal?: number;
    gst_amount?: number;
    total_discount?: number;
    shipping_charges?: number;
    quotation_total?: number;
    /** Total after offers and cash points; what the buyer actually pays. */
    effective_total?: number;
    is_expired?: boolean;
    billing_address?: { id?: string } | null;
    shipping_address?: { id?: string } | null;
    payment_method?: { id?: string } | null;
};

/** `POST /consumer/carts/{cartId}/initiate_quotation/` echoes the cart back too. */
export type HyperinventoryInitiateQuotationResponseDto = {
    cart?: unknown;
    quotation: HyperinventoryQuotationDto;
};

export type HyperinventoryFinaliseQuotationRequestDto = {
    billing_address: string;
    shipping_address: string;
    payment_method: string;
    /** The chosen shipping-charge option; empty when none was opted for. */
    opted_shipping_charges: string;
};

/**
 * `POST /consumer/quotations/{id}/generate_order/`.
 *
 * The order has been seen both at the top level and nested under `order`, so
 * both are read and whichever carries an id wins.
 */
export type HyperinventoryGenerateOrderResponseDto = {
    id?: string;
    order_number?: string;
    order_total?: number;
    status?: string;
    order?: {
        id?: string;
        order_number?: string;
        order_total?: number;
        status?: string;
    } | null;
};
