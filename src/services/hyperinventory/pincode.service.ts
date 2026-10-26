import "server-only";

import { hyperinventoryRequest } from "@/services/hyperinventory/client";
import type { HyperinventoryPincodeListDto } from "@/types/dto/hyperinventory/pincode.dto";
import type { PincodeModel } from "@/types/models/pincode.model";
import { mapPincodeDtoToModel } from "@/utils/mappers/pincode.mapper";

/** Resolves a pincode to its city and state, or null when the provider knows none. */
export async function getPincode(accessToken: string, pincode: string): Promise<PincodeModel | null> {
    const response = await hyperinventoryRequest<HyperinventoryPincodeListDto>("pincodes", {
        apiVersion: "v1",
        accessToken,
        query: { pincode },
    });

    const match = response?.results?.[0];

    return match ? mapPincodeDtoToModel(match) : null;
}
