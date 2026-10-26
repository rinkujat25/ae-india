import { NextResponse } from "next/server";
import { getCompanyAddresses } from "@/services/hyperinventory/address.service";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { assignQuotationAddress } from "@/services/hyperinventory/quotation.service";
import { getAuthAccessToken, getAuthProfile } from "@/utils/auth-profile";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type AssignAddressRequest = {
    quotationId?: string;
    addressId?: string;
    addressType?: "billing" | "shipping";
};

export async function PATCH(request: Request) {
    const [accessToken, profile] = await Promise.all([getAuthAccessToken(), getAuthProfile()]);
    const companyId = profile?.company.id ?? "";

    if (!accessToken || !companyId) {
        return NextResponse.json({ message: "Please sign in again." }, { status: 401 });
    }

    let input: AssignAddressRequest;

    try {
        input = (await request.json()) as AssignAddressRequest;
    } catch {
        return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const quotationId = input.quotationId?.trim() ?? "";
    const addressId = input.addressId?.trim() ?? "";
    const addressType = input.addressType;

    if (
        !uuidPattern.test(quotationId)
        || !uuidPattern.test(addressId)
        || (addressType !== "billing" && addressType !== "shipping")
    ) {
        return NextResponse.json({ message: "Invalid address selection." }, { status: 400 });
    }

    try {
        // The address id arrives from the browser, so it is checked against this
        // session's own address book — and against the type being assigned, so a
        // billing address cannot be attached as the delivery address.
        const addresses = await getCompanyAddresses(accessToken, companyId);
        const expectedType = addressType === "billing" ? "billing_address" : "shipping_address";
        const address = addresses.find((candidate) => candidate.id === addressId);

        if (!address || address.addressType !== expectedType) {
            return NextResponse.json({ message: "Unknown address." }, { status: 404 });
        }

        return NextResponse.json({
            quotation: await assignQuotationAddress(accessToken, quotationId, addressType, addressId),
        });
    } catch (error) {
        if (error instanceof HyperinventoryApiError) {
            if (error.status === 401) {
                return NextResponse.json({ message: "Your session expired. Please sign in again." }, { status: 401 });
            }

            if (error.status === 403 || error.status === 404) {
                return NextResponse.json({ message: "This order is no longer available." }, { status: 404 });
            }

            return NextResponse.json({ message: "That address could not be applied." }, { status: error.status });
        }

        return NextResponse.json({ message: "Checkout is unavailable right now." }, { status: 502 });
    }
}
