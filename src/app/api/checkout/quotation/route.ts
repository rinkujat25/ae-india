import { NextResponse } from "next/server";
import { getUserCart } from "@/services/hyperinventory/cart.service";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { initiateQuotation } from "@/services/hyperinventory/quotation.service";
import { getAuthAccessToken, getAuthProfile } from "@/utils/auth-profile";

export async function POST() {
    const [accessToken, profile] = await Promise.all([getAuthAccessToken(), getAuthProfile()]);
    const companyId = profile?.company.id ?? "";

    if (!accessToken || !companyId) {
        return NextResponse.json({ message: "Please sign in again." }, { status: 401 });
    }

    try {
        // The cart id is resolved from the session rather than accepted from the
        // browser: it decides which cart gets quoted and billed.
        const cart = await getUserCart(accessToken, companyId);

        if (!cart) {
            return NextResponse.json({ message: "There is nothing to check out." }, { status: 409 });
        }

        return NextResponse.json({ quotation: await initiateQuotation(accessToken, cart.id) });
    } catch (error) {
        if (error instanceof HyperinventoryApiError) {
            if (error.status === 401 || error.status === 403) {
                return NextResponse.json({ message: "Your session expired. Please sign in again." }, { status: 401 });
            }

            return NextResponse.json(
                { message: "This order could not be prepared for payment." },
                { status: error.status },
            );
        }

        return NextResponse.json({ message: "Checkout is unavailable right now." }, { status: 502 });
    }
}
