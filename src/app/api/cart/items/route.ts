import { NextResponse } from "next/server";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import {
    addToUserCart,
    createTemporaryCart,
    getTemporaryCart,
    updateTemporaryCart,
} from "@/services/hyperinventory/cart.service";
import type { HyperinventoryCreateTemporaryCartRequestDto } from "@/types/dto/hyperinventory/cart.dto";
import { getAuthAccessToken, getAuthProfile } from "@/utils/auth-profile";

type AddGuestCartItemRequest = {
    productId?: string;
    quantity?: number;
    applicableAmount?: number;
    temporaryCartId?: string;
};

const cartIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function getProviderErrorMessage(details: unknown) {
    if (!details || typeof details !== "object" || Array.isArray(details)) {
        return "";
    }

    const error = details as Record<string, unknown>;
    const message = error.message ?? error.detail ?? error.error;

    return typeof message === "string" ? message : "";
}

export async function POST(request: Request) {
    const input = (await request.json()) as AddGuestCartItemRequest;
    const productId = input.productId?.trim();
    const quantity = Number(input.quantity);
    const applicableAmount = Number(input.applicableAmount);
    const temporaryCartId = input.temporaryCartId?.trim();

    if (
        !productId
        || !Number.isInteger(quantity)
        || quantity < 1
        || !Number.isFinite(applicableAmount)
        || applicableAmount < 0
        || (temporaryCartId && !cartIdPattern.test(temporaryCartId))
    ) {
        return NextResponse.json({ message: "Invalid cart item." }, { status: 400 });
    }

    const payload: HyperinventoryCreateTemporaryCartRequestDto = {
        product_id: productId,
        quantity,
        price_list: {
            recommended_offers: {
                discount_type: "flat",
                applicable_amount: applicableAmount,
                offer_id: null,
                offer_type: "discount",
            },
        },
    };

    try {
        // A signed-in buyer gets the company cart, which the provider keys to
        // their company and accumulates; no temporary cart id is involved.
        const [accessToken, profile] = await Promise.all([getAuthAccessToken(), getAuthProfile()]);
        const companyId = profile?.company.id ?? "";

        if (accessToken && companyId) {
            const userCart = await addToUserCart(accessToken, companyId, productId, quantity);

            return NextResponse.json(
                { mode: "user", cart: { id: userCart.id, totalItems: userCart.total_items ?? 0 } },
                { status: 201 },
            );
        }

        let cart;

        if (temporaryCartId) {
            const currentCart = await getTemporaryCart(temporaryCartId);
            const currentItem = currentCart.items.find((item) => item.product_id === productId);

            cart = currentItem
                ? await updateTemporaryCart(temporaryCartId, {
                    items: [{ product_id: productId, quantity: currentItem.quantity + quantity }],
                })
                : await createTemporaryCart(payload, temporaryCartId);
        } else {
            cart = await createTemporaryCart(payload);
        }

        if (!cart) {
            return NextResponse.json({ message: "The cart is empty." }, { status: 409 });
        }

        return NextResponse.json({ cart, mode: "guest" }, { status: 201 });
    } catch (error) {
        const status = error instanceof HyperinventoryApiError ? error.status : 500;
        const providerMessage = error instanceof HyperinventoryApiError
            ? getProviderErrorMessage(error.details)
            : "";
        const message = providerMessage || (error instanceof HyperinventoryApiError
            ? `Hyperinventory rejected the cart request with status ${error.status}.`
            : "The cart API configuration is incomplete or unavailable.");

        return NextResponse.json(
            { message },
            { status },
        );
    }
}
