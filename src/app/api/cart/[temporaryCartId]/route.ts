import { NextResponse } from "next/server";
import { getTemporaryCart, updateTemporaryCart } from "@/services/hyperinventory/cart.service";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { mapTemporaryCart } from "@/utils/mappers/cart.mapper";

type CartRouteProps = {
    params: Promise<{ temporaryCartId: string }>;
};

const cartIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type UpdateCartRequest = {
    items?: Array<{
        productId?: string;
        quantity?: number;
    }>;
};

function getProviderErrorMessage(details: unknown) {
    if (!details || typeof details !== "object" || Array.isArray(details)) return "";
    const error = details as Record<string, unknown>;
    const message = error.message ?? error.detail ?? error.error;
    return typeof message === "string" ? message : "";
}

export async function GET(_request: Request, { params }: CartRouteProps) {
    const { temporaryCartId } = await params;

    if (!cartIdPattern.test(temporaryCartId)) {
        return NextResponse.json({ message: "Invalid temporary cart ID." }, { status: 400 });
    }

    try {
        const cart = await getTemporaryCart(temporaryCartId);
        return NextResponse.json({ cart: mapTemporaryCart(cart), mode: "guest" });
    } catch (error) {
        const status = error instanceof HyperinventoryApiError ? error.status : 500;
        return NextResponse.json(
            { message: status === 404 ? "This temporary cart is no longer available." : "Unable to load the cart right now." },
            { status },
        );
    }
}

export async function PATCH(request: Request, { params }: CartRouteProps) {
    const { temporaryCartId } = await params;

    if (!cartIdPattern.test(temporaryCartId)) {
        return NextResponse.json({ message: "Invalid temporary cart ID." }, { status: 400 });
    }

    const input = (await request.json()) as UpdateCartRequest;
    const items = input.items?.map((item) => ({
        product_id: item.productId?.trim() ?? "",
        quantity: Number(item.quantity),
    })) ?? [];
    const isValid = items.length > 0 && items.every(
        (item) => item.product_id && Number.isInteger(item.quantity) && item.quantity >= 0,
    );

    if (!isValid) {
        return NextResponse.json({ message: "Invalid cart update." }, { status: 400 });
    }

    try {
        const cart = await updateTemporaryCart(temporaryCartId, { items });
        return NextResponse.json({ cart: cart ? mapTemporaryCart(cart) : null, mode: "guest" });
    } catch (error) {
        const status = error instanceof HyperinventoryApiError ? error.status : 500;
        const providerMessage = error instanceof HyperinventoryApiError
            ? getProviderErrorMessage(error.details)
            : "";

        return NextResponse.json(
            { message: providerMessage || "Unable to update the cart right now." },
            { status },
        );
    }
}
