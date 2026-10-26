import { NextResponse } from "next/server";
import { createCompanyAddress, defaultCountryId } from "@/services/hyperinventory/address.service";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import type {
    HyperinventoryAddressType,
    HyperinventoryCreateAddressRequestDto,
} from "@/types/dto/hyperinventory/address.dto";
import { getAuthAccessToken, getAuthProfile } from "@/utils/auth-profile";
import { type AddressValues, validateAddress } from "@/utils/address-validation";

type CreateAddressRequestBody = {
    billing?: Partial<AddressValues>;
    shipping?: Partial<AddressValues>;
    sameForShipping?: boolean;
};

function toValues(input: Partial<AddressValues> | undefined): AddressValues {
    return {
        firstName: (input?.firstName ?? "").trim(),
        lastName: (input?.lastName ?? "").trim(),
        mobile: (input?.mobile ?? "").trim(),
        building: (input?.building ?? "").trim(),
        street: (input?.street ?? "").trim(),
        pincode: (input?.pincode ?? "").trim(),
        state: (input?.state ?? "").trim(),
        city: (input?.city ?? "").trim(),
        gstin: (input?.gstin ?? "").trim().toUpperCase(),
    };
}

/** Shipping addresses never carry a GSTIN — that belongs to the billing entity. */
function toPayload(values: AddressValues, addressType: HyperinventoryAddressType): HyperinventoryCreateAddressRequestDto {
    const fullName = `${values.firstName} ${values.lastName}`.trim();

    return {
        contact_person_name: fullName,
        contact_person_number: values.mobile,
        display_name: fullName,
        legal_name: fullName,
        address_line_1: values.building,
        address_line_2: values.street,
        landmark: "",
        city: values.city,
        state: Number(values.state),
        country: defaultCountryId,
        pincode: values.pincode,
        gst_number: addressType === "billing_address" ? values.gstin : "",
        address_type: addressType,
        tag: "",
    };
}

function getProviderErrorMessage(details: unknown) {
    if (!details || typeof details !== "object" || Array.isArray(details)) return "";

    const error = details as Record<string, unknown>;
    const message = error.message ?? error.detail ?? error.error;

    if (typeof message === "string") return message;

    // DRF-style field errors: { pincode: ["..."] }
    const firstField = Object.values(error)[0];

    if (Array.isArray(firstField) && typeof firstField[0] === "string") return firstField[0];

    return "";
}

export async function POST(request: Request) {
    const accessToken = await getAuthAccessToken();
    const profile = await getAuthProfile();
    const companyId = profile?.company.id ?? "";

    if (!accessToken || !companyId) {
        return NextResponse.json({ message: "Please sign in again." }, { status: 401 });
    }

    let input: CreateAddressRequestBody;

    try {
        input = (await request.json()) as CreateAddressRequestBody;
    } catch {
        return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const sameForShipping = input.sameForShipping !== false;
    const billing = toValues(input.billing);
    const shipping = sameForShipping ? billing : toValues(input.shipping);

    // Re-validated here because anything in the browser can be bypassed.
    const billingErrors = validateAddress(billing);
    const shippingErrors = sameForShipping ? {} : validateAddress({ ...shipping, gstin: "" });

    if (Object.keys(billingErrors).length > 0 || Object.keys(shippingErrors).length > 0) {
        return NextResponse.json(
            { message: "Check the highlighted fields.", errors: { billing: billingErrors, shipping: shippingErrors } },
            { status: 400 },
        );
    }

    try {
        // The provider stores one address per type, so this is two calls.
        const billingAddress = await createCompanyAddress(
            accessToken,
            companyId,
            toPayload(billing, "billing_address"),
        );
        const shippingAddress = await createCompanyAddress(
            accessToken,
            companyId,
            toPayload(shipping, "shipping_address"),
        );

        return NextResponse.json({ billing: billingAddress, shipping: shippingAddress }, { status: 201 });
    } catch (error) {
        if (error instanceof HyperinventoryApiError) {
            if (error.status === 401 || error.status === 403) {
                return NextResponse.json({ message: "Your session expired. Please sign in again." }, { status: 401 });
            }

            return NextResponse.json(
                { message: getProviderErrorMessage(error.details) || "That address could not be saved." },
                { status: error.status },
            );
        }

        return NextResponse.json({ message: "Saving addresses is unavailable right now." }, { status: 502 });
    }
}
