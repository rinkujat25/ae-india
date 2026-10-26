import type {
    HyperinventoryGstDetailsDto,
    HyperinventoryGstVerifyResponseDto,
} from "@/types/dto/hyperinventory/gst.dto";
import type { GstBusinessModel } from "@/types/models/gst.model";

/** Joins the parts the GST record actually filled in, without repeats. */
function joinParts(parts: Array<string | undefined>) {
    const seen = new Set<string>();

    return parts
        .map((part) => (part ?? "").trim())
        .filter((part) => {
            if (!part) return false;

            const key = part.toLowerCase();

            if (seen.has(key)) return false;

            seen.add(key);

            return true;
        })
        .join(", ");
}

export function mapGstVerifyToBusiness(dto: HyperinventoryGstVerifyResponseDto): GstBusinessModel | null {
    const details: HyperinventoryGstDetailsDto | undefined = dto?.gst_details;

    if (!dto?.success || !details) {
        return null;
    }

    const address = details.principalPlaceOfBusinessFields?.principalPlaceOfBusinessAddress ?? {};
    const businessName = (details.tradeName || details.legalNameOfBusiness || "").trim();

    return {
        gstin: (details.gstIdentificationNumber || dto.gst_number || "").trim().toUpperCase(),
        businessName,
        status: (details.gstnStatus || "").trim(),
        building: joinParts([businessName, address.buildingNumber, address.buildingName, address.floorNumber]),
        street: joinParts([address.streetName, address.locality, address.location, address.landMark]),
        pincode: (address.pincode || "").trim(),
        city: (address.districtName || "").trim(),
        state: (address.stateName || "").trim(),
    };
}
