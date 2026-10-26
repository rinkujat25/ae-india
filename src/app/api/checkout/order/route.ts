import { NextResponse } from "next/server";
import { getCompanyAddresses } from "@/services/hyperinventory/address.service";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { getQuotationPaymentMethods } from "@/services/hyperinventory/payment.service";
import { finaliseQuotation, generateOrder } from "@/services/hyperinventory/quotation.service";
import { getAuthAccessToken, getAuthProfile } from "@/utils/auth-profile";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * The only gateway checkout can complete today. Anything else needs a payment
 * handshake that does not exist yet, and placing the order without it would
 * leave an unpaid order behind, so it is refused here as well as in the UI.
 */
const supportedGateway = "cash_on_delivery";

type PlaceOrderRequest = {
    quotationId?: string;
    billingAddressId?: string;
    shippingAddressId?: string;
    paymentMethodId?: string;
};

export async function POST(request: Request) {
    const [accessToken, profile] = await Promise.all([getAuthAccessToken(), getAuthProfile()]);
    const companyId = profile?.company.id ?? "";

    if (!accessToken || !companyId) {
        return NextResponse.json({ message: "Please sign in again." }, { status: 401 });
    }

    let input: PlaceOrderRequest;

    try {
        input = (await request.json()) as PlaceOrderRequest;
    } catch {
        return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const quotationId = input.quotationId?.trim() ?? "";
    const billingAddressId = input.billingAddressId?.trim() ?? "";
    const shippingAddressId = input.shippingAddressId?.trim() ?? "";
    const paymentMethodId = input.paymentMethodId?.trim() ?? "";

    if (
        !uuidPattern.test(quotationId)
        || !uuidPattern.test(billingAddressId)
        || !uuidPattern.test(shippingAddressId)
        || !uuidPattern.test(paymentMethodId)
    ) {
        return NextResponse.json({ message: "This order is not ready to place." }, { status: 400 });
    }

    try {
        // Everything below arrives from the browser and decides what gets
        // charged and where it ships, so each part is checked against the
        // session's own data before anything is committed.
        const [addresses, methods] = await Promise.all([
            getCompanyAddresses(accessToken, companyId),
            getQuotationPaymentMethods(accessToken, quotationId),
        ]);

        const billing = addresses.find((address) => address.id === billingAddressId);
        const shipping = addresses.find((address) => address.id === shippingAddressId);

        if (billing?.addressType !== "billing_address" || shipping?.addressType !== "shipping_address") {
            return NextResponse.json({ message: "Unknown address." }, { status: 404 });
        }

        const method = methods.find((candidate) => candidate.id === paymentMethodId);

        if (!method) {
            return NextResponse.json({ message: "That payment mode is not available." }, { status: 404 });
        }

        if (method.gatewayType !== supportedGateway) {
            return NextResponse.json(
                { message: `${method.name} is not available yet. Choose Cash on Delivery to place this order.` },
                { status: 409 },
            );
        }

        await finaliseQuotation(accessToken, quotationId, {
            billingAddressId,
            shippingAddressId,
            paymentMethodId,
        });

        return NextResponse.json({ order: await generateOrder(accessToken, quotationId) }, { status: 201 });
    } catch (error) {
        if (error instanceof HyperinventoryApiError) {
            if (error.status === 401) {
                return NextResponse.json({ message: "Your session expired. Please sign in again." }, { status: 401 });
            }

            if (error.status === 403 || error.status === 404) {
                return NextResponse.json({ message: "This order is no longer available." }, { status: 404 });
            }

            return NextResponse.json(
                { message: "Your order could not be placed. Nothing has been charged." },
                { status: error.status },
            );
        }

        return NextResponse.json(
            { message: "Checkout is unavailable right now. Nothing has been charged." },
            { status: 502 },
        );
    }
}
