import "server-only";

import { getHyperinventoryEnvironment } from "@/lib/env";
import { hyperinventoryRequest } from "@/services/hyperinventory/client";
import type {
    HyperinventoryAddressDto,
    HyperinventoryAddressListDto,
    HyperinventoryCreateAddressRequestDto,
} from "@/types/dto/hyperinventory/address.dto";
import type { CompanyAddressModel } from "@/types/models/address.model";
import { mapAddressDtoToModel, mapAddressListToModels } from "@/utils/mappers/address.mapper";

/** India. The address form only collects Indian states, pin codes and GSTINs. */
export const defaultCountryId = 1;

/**
 * The list endpoint pages, and `limit` is honoured, so it is sent explicitly:
 * on the provider's default page size a company with a long address book would
 * silently lose the addresses past the first page.
 */
const addressPageSize = 100;

function addressPath(companyId: string) {
    return `consumer/companies/${encodeURIComponent(companyId)}/addresses`;
}

export async function getCompanyAddresses(
    accessToken: string,
    companyId: string,
): Promise<CompanyAddressModel[]> {
    const { sellerId } = getHyperinventoryEnvironment();

    const response = await hyperinventoryRequest<HyperinventoryAddressListDto>(addressPath(companyId), {
        apiVersion: "v1",
        accessToken,
        // Billing and shipping come back in one list: `address_type` is accepted
        // as a query parameter but ignored, so callers split the result instead.
        query: { seller: sellerId, ordering: "-created_at", limit: addressPageSize },
    });

    return mapAddressListToModels(response?.results ?? []);
}

export async function createCompanyAddress(
    accessToken: string,
    companyId: string,
    payload: HyperinventoryCreateAddressRequestDto,
): Promise<CompanyAddressModel> {
    const { sellerId } = getHyperinventoryEnvironment();

    const response = await hyperinventoryRequest<HyperinventoryAddressDto>(addressPath(companyId), {
        apiVersion: "v1",
        method: "POST",
        accessToken,
        query: { seller: sellerId },
        body: JSON.stringify(payload),
    });

    return mapAddressDtoToModel(response);
}

/** Archiving is the provider's delete: POST to the address's archive endpoint. */
export async function archiveAddress(accessToken: string, addressId: string): Promise<void> {
    await hyperinventoryRequest<unknown>(`consumer/addresses/${encodeURIComponent(addressId)}/archive`, {
        apiVersion: "v1",
        method: "POST",
        accessToken,
        body: JSON.stringify({}),
    });
}
