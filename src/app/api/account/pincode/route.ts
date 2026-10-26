import { NextResponse } from "next/server";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { getPincode } from "@/services/hyperinventory/pincode.service";
import { getAuthAccessToken } from "@/utils/auth-profile";

/** Six digits, never starting with zero — same rule the address form applies. */
const pincodePattern = /^[1-9]\d{5}$/;

export async function GET(request: Request) {
    const accessToken = await getAuthAccessToken();

    if (!accessToken) {
        return NextResponse.json({ message: "Please sign in again." }, { status: 401 });
    }

    const pincode = new URL(request.url).searchParams.get("pincode")?.trim() ?? "";

    if (!pincodePattern.test(pincode)) {
        return NextResponse.json({ message: "Enter a valid 6-digit pin code." }, { status: 400 });
    }

    try {
        const match = await getPincode(accessToken, pincode);

        if (!match) {
            return NextResponse.json({ message: "We could not find that pin code." }, { status: 404 });
        }

        return NextResponse.json({ pincode: match });
    } catch (error) {
        if (error instanceof HyperinventoryApiError && (error.status === 401 || error.status === 403)) {
            return NextResponse.json({ message: "Your session expired. Please sign in again." }, { status: 401 });
        }

        return NextResponse.json({ message: "Pin code lookup is unavailable right now." }, { status: 502 });
    }
}
