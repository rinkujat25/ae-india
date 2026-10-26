import { NextResponse } from "next/server";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { getQuotationPaymentMethods } from "@/services/hyperinventory/payment.service";
import { getAuthAccessToken, getAuthProfile } from "@/utils/auth-profile";

const quotationIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(request: Request) {
    const [accessToken, profile] = await Promise.all([getAuthAccessToken(), getAuthProfile()]);

    if (!accessToken || !profile) {
        return NextResponse.json({ message: "Please sign in again." }, { status: 401 });
    }

    const quotationId = new URL(request.url).searchParams.get("quotationId") ?? "";

    if (!quotationIdPattern.test(quotationId)) {
        return NextResponse.json({ message: "Unknown quotation." }, { status: 400 });
    }

    try {
        return NextResponse.json({ methods: await getQuotationPaymentMethods(accessToken, quotationId) });
    } catch (error) {
        if (error instanceof HyperinventoryApiError) {
            if (error.status === 401) {
                return NextResponse.json({ message: "Your session expired. Please sign in again." }, { status: 401 });
            }

            // 403 is what the provider answers for a quotation belonging to
            // someone else, so it is reported as not found either way.
            if (error.status === 403 || error.status === 404) {
                return NextResponse.json({ message: "Unknown quotation." }, { status: 404 });
            }

            return NextResponse.json(
                { message: "Payment modes could not be loaded." },
                { status: error.status },
            );
        }

        return NextResponse.json({ message: "Payment modes are unavailable right now." }, { status: 502 });
    }
}
