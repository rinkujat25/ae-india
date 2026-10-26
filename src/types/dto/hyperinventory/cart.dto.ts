export type HyperinventoryRecommendedOfferDto = {
    discount_type: "flat";
    applicable_amount: number;
    offer_id: string | null;
    offer_type: "discount";
};

export type HyperinventoryCreateTemporaryCartRequestDto = {
    product_id: string;
    quantity: number;
    price_list: {
        recommended_offers: HyperinventoryRecommendedOfferDto;
    };
};

export type HyperinventoryUpdateTemporaryCartRequestDto = {
    items: Array<{
        product_id: string;
        quantity: number;
    }>;
};

export type HyperinventoryTemporaryCartProductImageDto = {
    url: string;
    tags?: string;
    position?: number;
};

export type HyperinventoryTemporaryCartProductDto = {
    product_id: string;
    name: string;
    sku: string;
    selling_price: string;
    mrp: string;
    brand?: string;
    url_path?: string;
    featured_images?: HyperinventoryTemporaryCartProductImageDto[];
};

export type HyperinventoryTemporaryCartItemDto = {
    product_id: string;
    product: HyperinventoryTemporaryCartProductDto;
    quantity: number;
    unit_price: string;
    selling_price: string;
    recommended_offer: HyperinventoryRecommendedOfferDto;
    last_updated_at: string;
};

export type HyperinventoryTemporaryCartResponseDto = {
    temporary_cart_id: string;
    sales_channel_id: string;
    seller_company_id: string;
    items: HyperinventoryTemporaryCartItemDto[];
    totals: {
        subtotal: string;
        discounted_subtotal: string;
        total_items: number;
        total_quantity: number;
    };
    created_at: string;
    updated_at: string;
    device_id: string | null;
    context: Record<string, unknown>;
};

/**
 * Authenticated cart. Unlike the guest temporary cart there is no id to pass
 * back: the provider keys the cart to the buyer company and accumulates
 * quantities across calls.
 */
export type HyperinventoryCreateUserCartRequestDto = {
    cart_items: Array<{
        product: string;
        quantity: number;
    }>;
    seller_company: string;
};

export type HyperinventoryUserCartResponseDto = {
    id: string;
    total_items?: number;
    subtotal?: number;
    cart_total?: number;
    gst_amount?: number;
    discount_amount?: number;
    cart_items?: unknown[];
};

export type HyperinventoryUserCartProductDto = {
    id: string;
    name?: string;
    display_name?: string | null;
    sku?: string;
    url_path?: string;
    mrp?: string | number;
    selling_price?: string | number;
    featured_images?: HyperinventoryTemporaryCartProductImageDto[];
};

export type HyperinventoryUserCartItemDto = {
    id: string;
    product?: HyperinventoryUserCartProductDto;
    quantity?: number;
    price?: number;
    total?: number;
};

export type HyperinventoryUserCartDetailDto = {
    id: string;
    cart_items?: HyperinventoryUserCartItemDto[];
    total_items?: number;
    subtotal?: number;
    cart_total?: number;
    discount_amount?: number;
    /** Marks the live cart when the company has more than one. */
    is_current?: boolean;
};

/** `GET /consumer/companies/{id}/carts?seller=` returns a paged list of carts. */
export type HyperinventoryUserCartListDto = {
    count: number;
    results: HyperinventoryUserCartDetailDto[];
};

export type HyperinventoryUpdateUserCartRequestDto = {
    cart_items: Array<{
        id: string;
        quantity: number;
    }>;
    cartId: string;
    seller_company: string;
};
