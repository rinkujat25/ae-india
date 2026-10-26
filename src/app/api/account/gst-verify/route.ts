import { NextResponse } from "next/server";
import { verifyGstin } from "@/services/hyperinventory/gst.service";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { getAuthAccessToken } from "@/utils/auth-profile";
import { gstinPattern } from "@/utils/address-validation";

type GstVerifyRequestBody = {
    gstin?: string;
};

export async function POST(request: Request) {
    const accessToken = await getAuthAccessToken();

    if (!accessToken) {
        return NextResponse.json({ message: "Please sign in again." }, { status: 401 });
    }

    let input: GstVerifyRequestBody;

    try {
        input = (await request.json()) as GstVerifyRequestBody;
    } catch {
        return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const gstin = (input.gstin ?? "").trim().toUpperCase();

    if (!gstinPattern.test(gstin)) {
        return NextResponse.json({ message: "Enter a valid 15-character GSTIN." }, { status: 400 });
    }

    try {
        const business = await verifyGstin(accessToken, gstin);

        if (!business) {
            return NextResponse.json({ message: "No business found for that GSTIN." }, { status: 404 });
        }

        return NextResponse.json({ business });
    } catch (error) {
        if (error instanceof HyperinventoryApiError) {
            if (error.status === 401 || error.status === 403) {
                return NextResponse.json({ message: "Your session expired. Please sign in again." }, { status: 401 });
            }

            // The provider answers an unknown GSTIN with a 404 rather than success:false.
            if (error.status === 404) {
                return NextResponse.json({ message: "No business found for that GSTIN." }, { status: 404 });
            }
        }

        return NextResponse.json({ message: "GSTIN lookup is unavailable right now." }, { status: 502 });
    }
}
