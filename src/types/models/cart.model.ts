export type CartItemModel = {
    /** Cart line id. Signed-in updates key on this, not the product id. */
    itemId?: string;
    productId: string;
    name: string;
    sku: string;
    slug: string;
    brand: string;
    imageUrl: string;
    price: number;
    mrp: number;
    quantity: number;
};

export type CartModel = {
    id: string;
    items: CartItemModel[];
    totalItems: number;
    totalQuantity: number;
    subtotal: number;
    discountedSubtotal: number;
};
