import { NextResponse } from "next/server";
import { archiveAddress, getCompanyAddresses } from "@/services/hyperinventory/address.service";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { getAuthAccessToken, getAuthProfile } from "@/utils/auth-profile";

type AddressRouteProps = {
    params: Promise<{ addressId: string }>;
};

const addressIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function DELETE(_request: Request, { params }: AddressRouteProps) {
    const accessToken = await getAuthAccessToken();
    const profile = await getAuthProfile();
    const companyId = profile?.company.id ?? "";

    if (!accessToken || !companyId) {
        return NextResponse.json({ message: "Please sign in again." }, { status: 401 });
    }

    const { addressId } = await params;

    if (!addressIdPattern.test(addressId)) {
        return NextResponse.json({ message: "Unknown address." }, { status: 400 });
    }

    try {
        // The provider's archive endpoint is not company-scoped, so confirm the
        // address belongs to this session's company before touching it.
        const addresses = await getCompanyAddresses(accessToken, companyId);

        if (!addresses.some((address) => address.id === addressId)) {
            return NextResponse.json({ message: "Unknown address." }, { status: 404 });
        }

        await archiveAddress(accessToken, addressId);

        return NextResponse.json({ archived: true });
    } catch (error) {
        if (error instanceof HyperinventoryApiError) {
            if (error.status === 401 || error.status === 403) {
                return NextResponse.json({ message: "Your session expired. Please sign in again." }, { status: 401 });
            }

            return NextResponse.json({ message: "That address could not be removed." }, { status: error.status });
        }

        return NextResponse.json({ message: "Removing addresses is unavailable right now." }, { status: 502 });
    }
}
