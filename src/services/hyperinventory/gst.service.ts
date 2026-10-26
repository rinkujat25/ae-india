import "server-only";

import { hyperinventoryRequest } from "@/services/hyperinventory/client";
import type {
    HyperinventoryGstVerifyRequestDto,
    HyperinventoryGstVerifyResponseDto,
} from "@/types/dto/hyperinventory/gst.dto";
import type { GstBusinessModel } from "@/types/models/gst.model";
import { mapGstVerifyToBusiness } from "@/utils/mappers/gst.mapper";

/** Verifies a GSTIN and returns its registered business address, or null. */
export async function verifyGstin(accessToken: string, gstin: string): Promise<GstBusinessModel | null> {
    const payload: HyperinventoryGstVerifyRequestDto = { gst_number: gstin };

    const response = await hyperinventoryRequest<HyperinventoryGstVerifyResponseDto>("gst-verify/", {
        apiVersion: "v1",
        method: "POST",
        accessToken,
        body: JSON.stringify(payload),
    });

    return mapGstVerifyToBusiness(response);
}
