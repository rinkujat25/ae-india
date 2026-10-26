import "server-only";

import { getHyperinventoryEnvironment } from "@/lib/env";
import { hyperinventoryRequest } from "@/services/hyperinventory/client";
import type {
    HyperinventoryCreateTemporaryCartRequestDto,
    HyperinventoryCreateUserCartRequestDto,
    HyperinventoryUpdateUserCartRequestDto,
    HyperinventoryUserCartDetailDto,
    HyperinventoryUserCartListDto,
    HyperinventoryUserCartResponseDto,
    HyperinventoryTemporaryCartResponseDto,
    HyperinventoryUpdateTemporaryCartRequestDto,
} from "@/types/dto/hyperinventory/cart.dto";

export async function createTemporaryCart(input: HyperinventoryCreateTemporaryCartRequestDto, temporaryCartId?: string) {
    return hyperinventoryRequest<HyperinventoryTemporaryCartResponseDto>(
        "/consumer/temporary-carts",
        {
            apiVersion: "v1",
            method: "POST",
            headers: temporaryCartId ? { "X-TEMP-CART-ID": temporaryCartId } : undefined,
            body: JSON.stringify(input),
        },
    );
}

export async function getTemporaryCart(temporaryCartId: string) {
    return hyperinventoryRequest<HyperinventoryTemporaryCartResponseDto>(
        `/consumer/temporary-carts/${encodeURIComponent(temporaryCartId)}`,
        { apiVersion: "v1" },
    );
}

export async function updateTemporaryCart(
    temporaryCartId: string,
    input: HyperinventoryUpdateTemporaryCartRequestDto,
) {
    return hyperinventoryRequest<HyperinventoryTemporaryCartResponseDto | null>(
        `/consumer/temporary-carts/${encodeURIComponent(temporaryCartId)}`,
        {
            apiVersion: "v1",
            method: "PATCH",
            body: JSON.stringify(input),
        },
    );
}

/**
 * Adds a product to the signed-in buyer's cart.
 *
 * The provider accumulates quantity for a product already in the cart, so this
 * is safe to call repeatedly; no client-side cart id is involved.
 */
export async function addToUserCart(
    accessToken: string,
    companyId: string,
    productId: string,
    quantity: number,
) {
    const { sellerId } = getHyperinventoryEnvironment();

    const payload: HyperinventoryCreateUserCartRequestDto = {
        cart_items: [{ product: productId, quantity }],
        seller_company: sellerId,
    };

    return hyperinventoryRequest<HyperinventoryUserCartResponseDto>(
        `/consumer/companies/${encodeURIComponent(companyId)}/carts`,
        {
            apiVersion: "v1",
            method: "POST",
            accessToken,
            body: JSON.stringify(payload),
        },
    );
}

/** The signed-in buyer's active cart, or null when they have none. */
export async function getUserCart(accessToken: string, companyId: string) {
    const { sellerId } = getHyperinventoryEnvironment();

    const response = await hyperinventoryRequest<HyperinventoryUserCartListDto>(
        `/consumer/companies/${encodeURIComponent(companyId)}/carts`,
        {
            apiVersion: "v1",
            accessToken,
            // The provider answers 409 without a seller, so it is always sent.
            query: { seller: sellerId },
        },
    );

    const carts = response?.results ?? [];

    // The provider can return several carts for one company. `is_current` marks
    // the live one; list order is not a reliable stand-in for it.
    return carts.find((cart) => cart.is_current) ?? carts[0] ?? null;
}

/**
 * Sets absolute quantities on a signed-in cart.
 *
 * The provider replaces the quantity for each line sent. A quantity of 0 is
 * ignored, and rejected outright when no line has a positive quantity, so this
 * endpoint cannot remove items.
 */
export async function updateUserCartItems(
    accessToken: string,
    cartId: string,
    items: Array<{ id: string; quantity: number }>,
) {
    const { sellerId } = getHyperinventoryEnvironment();

    const payload: HyperinventoryUpdateUserCartRequestDto = {
        cart_items: items,
        cartId,
        seller_company: sellerId,
    };

    return hyperinventoryRequest<HyperinventoryUserCartDetailDto>(
        `/consumer/carts/${encodeURIComponent(cartId)}`,
        {
            apiVersion: "v1",
            method: "PATCH",
            accessToken,
            body: JSON.stringify(payload),
        },
    );
}

/** Removes one line from a signed-in cart and returns the updated cart. */
export async function removeUserCartItem(accessToken: string, cartItemId: string) {
    return hyperinventoryRequest<HyperinventoryUserCartDetailDto>(
        `/consumer/cart_items/${encodeURIComponent(cartItemId)}/remove/`,
        {
            apiVersion: "v1",
            method: "POST",
            accessToken,
            body: JSON.stringify({}),
        },
    );
}
