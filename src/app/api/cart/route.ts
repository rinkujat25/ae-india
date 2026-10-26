import { NextResponse } from "next/server";
import {
    getTemporaryCart,
    getUserCart,
    removeUserCartItem,
    updateTemporaryCart,
    updateUserCartItems,
} from "@/services/hyperinventory/cart.service";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { mapTemporaryCart, mapUserCart } from "@/utils/mappers/cart.mapper";
import { getAuthAccessToken, getAuthProfile } from "@/utils/auth-profile";

const cartIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * The cart for whoever is asking: the buyer company's cart when signed in,
 * otherwise the guest cart named by `temporaryCartId`.
 */
export async function GET(request: Request) {
    const [accessToken, profile] = await Promise.all([getAuthAccessToken(), getAuthProfile()]);
    const companyId = profile?.company.id ?? "";

    try {
        if (accessToken && companyId) {
            const cart = await getUserCart(accessToken, companyId);

            return NextResponse.json({ cart: cart ? mapUserCart(cart) : null, mode: "user" });
        }

        const temporaryCartId = new URL(request.url).searchParams.get("temporaryCartId")?.trim() ?? "";

        if (!cartIdPattern.test(temporaryCartId)) {
            return NextResponse.json({ cart: null, mode: "guest" });
        }

        const cart = await getTemporaryCart(temporaryCartId);

        return NextResponse.json({ cart: cart ? mapTemporaryCart(cart) : null, mode: "guest" });
    } catch (error) {
        const status = error instanceof HyperinventoryApiError ? error.status : 500;

        // A cart that no longer exists reads as empty rather than as an error.
        if (status === 404) {
            return NextResponse.json({ cart: null, mode: accessToken ? "user" : "guest" });
        }

        return NextResponse.json({ message: "Unable to load the cart right now." }, { status });
    }
}

type UpdateCartRequestBody = {
    items?: Array<{ itemId?: string; productId?: string; quantity?: number }>;
};

/** Sets quantities on whichever cart the caller owns. */
export async function PATCH(request: Request) {
    const [accessToken, profile] = await Promise.all([getAuthAccessToken(), getAuthProfile()]);
    const companyId = profile?.company.id ?? "";

    let input: UpdateCartRequestBody;

    try {
        input = (await request.json()) as UpdateCartRequestBody;
    } catch {
        return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const items = (input.items ?? []).filter((item) => Number.isInteger(item.quantity) && (item.quantity ?? 0) >= 0);

    if (items.length === 0) {
        return NextResponse.json({ message: "Nothing to update." }, { status: 400 });
    }

    try {
        if (accessToken && companyId) {
            const current = await getUserCart(accessToken, companyId);

            if (!current) {
                return NextResponse.json({ cart: null, mode: "user" });
            }

            // The provider ignores a zero quantity, so removal is not possible here.
            const lines = items
                .filter((item) => item.itemId && (item.quantity ?? 0) > 0)
                .map((item) => ({ id: item.itemId as string, quantity: item.quantity as number }));

            if (lines.length === 0) {
                return NextResponse.json(
                    { message: "Removing an item from a signed-in cart is not supported yet." },
                    { status: 400 },
                );
            }

            const updated = await updateUserCartItems(accessToken, current.id, lines);

            return NextResponse.json({ cart: mapUserCart(updated), mode: "user" });
        }

        const temporaryCartId = new URL(request.url).searchParams.get("temporaryCartId")?.trim() ?? "";

        if (!cartIdPattern.test(temporaryCartId)) {
            return NextResponse.json({ message: "Unknown cart." }, { status: 400 });
        }

        const cart = await updateTemporaryCart(temporaryCartId, {
            items: items.map((item) => ({ product_id: item.productId ?? "", quantity: item.quantity as number })),
        });

        return NextResponse.json({ cart: cart ? mapTemporaryCart(cart) : null, mode: "guest" });
    } catch (error) {
        const status = error instanceof HyperinventoryApiError ? error.status : 500;

        return NextResponse.json({ message: "Unable to update the cart right now." }, { status });
    }
}

type RemoveCartRequestBody = {
    /** Cart line ids for a signed-in cart; product ids for a guest cart. */
    itemIds?: string[];
    productIds?: string[];
};

/** Removes lines from whichever cart the caller owns. */
export async function DELETE(request: Request) {
    const [accessToken, profile] = await Promise.all([getAuthAccessToken(), getAuthProfile()]);
    const companyId = profile?.company.id ?? "";

    let input: RemoveCartRequestBody;

    try {
        input = (await request.json()) as RemoveCartRequestBody;
    } catch {
        return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    try {
        if (accessToken && companyId) {
            const itemIds = (input.itemIds ?? []).filter(Boolean);

            if (itemIds.length === 0) {
                return NextResponse.json({ message: "Nothing to remove." }, { status: 400 });
            }

            // Removed one at a time so each response reflects the real state;
            // the last one is the cart we hand back.
            let updated = null;

            for (const itemId of itemIds) {
                updated = await removeUserCartItem(accessToken, itemId);
            }

            // An emptied cart comes back with no lines rather than as null.
            return NextResponse.json({
                cart: updated && (updated.cart_items?.length ?? 0) > 0 ? mapUserCart(updated) : null,
                mode: "user",
            });
        }

        const temporaryCartId = new URL(request.url).searchParams.get("temporaryCartId")?.trim() ?? "";
        const productIds = (input.productIds ?? []).filter(Boolean);

        if (!cartIdPattern.test(temporaryCartId) || productIds.length === 0) {
            return NextResponse.json({ message: "Unknown cart." }, { status: 400 });
        }

        // The guest cart removes a line by setting its quantity to zero.
        const cart = await updateTemporaryCart(temporaryCartId, {
            items: productIds.map((productId) => ({ product_id: productId, quantity: 0 })),
        });

        return NextResponse.json({ cart: cart ? mapTemporaryCart(cart) : null, mode: "guest" });
    } catch (error) {
        const status = error instanceof HyperinventoryApiError ? error.status : 500;

        return NextResponse.json({ message: "Unable to update the cart right now." }, { status });
    }
}
