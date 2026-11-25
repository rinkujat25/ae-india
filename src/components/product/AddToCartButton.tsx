"use client";

import { useState } from "react";
import { useToast } from "@/components/common/ToastProvider";
import { useApiRequest } from "@/hooks/useApiRequest";
import type { HyperinventoryTemporaryCartResponseDto } from "@/types/dto/hyperinventory/cart.dto";
import { getTemporaryCartReference, notifyCartUpdated, saveTemporaryCartId } from "@/utils/cart-storage";

type AddCartResponse =
    | { mode: "guest"; cart: HyperinventoryTemporaryCartResponseDto }
    | { mode: "user"; cart: { id: string; totalItems: number } };

type AddToCartButtonProps = {
    productId: string;
    /** The price the card shows; the cart route checks it is a sane number. */
    price: number;
    name: string;
    className?: string;
};

/**
 * One unit into the cart, straight from a product card.
 *
 * It goes through the same `/api/cart/items` route as the product page, so a
 * guest's temporary cart id is carried and saved the same way and a signed-in
 * buyer's company cart is used instead. The caller decides whether the product
 * can be ordered at all; this only renders for one that can.
 *
 * The global loader covers the request, as it does for every user-initiated
 * call, and the header badge is refreshed through `notifyCartUpdated`. The
 * visitor stays on the listing rather than being sent to the cart.
 */
export function AddToCartButton({ productId, price, name, className }: AddToCartButtonProps) {
    const apiRequest = useApiRequest();
    const { showToast } = useToast();
    const [isAdding, setIsAdding] = useState(false);

    async function handleAdd() {
        if (isAdding) return;
        setIsAdding(true);

        try {
            const response = await apiRequest<AddCartResponse>("/api/cart/items", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    productId,
                    quantity: 1,
                    applicableAmount: price,
                    temporaryCartId: getTemporaryCartReference()?.temporaryCartId,
                }),
            });

            if (response.mode === "guest") {
                saveTemporaryCartId(response.cart.sales_channel_id, response.cart.temporary_cart_id);
            }

            notifyCartUpdated();
            showToast(`${name} added to your cart.`);
        } catch (caught) {
            showToast(
                caught instanceof Error ? caught.message : "We could not add this product. Please try again.",
                "error",
            );
        } finally {
            setIsAdding(false);
        }
    }

    return (
        <button className={className} type="button" onClick={handleAdd} disabled={isAdding} aria-label={`Add ${name} to cart`}>
            {isAdding ? "Adding…" : "Add to Cart"}
        </button>
    );
}
