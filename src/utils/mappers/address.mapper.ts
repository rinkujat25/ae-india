import type { HyperinventoryAddressDto } from "@/types/dto/hyperinventory/address.dto";
import type { CompanyAddressModel } from "@/types/models/address.model";

export function mapAddressDtoToModel(dto: HyperinventoryAddressDto): CompanyAddressModel {
    return {
        id: dto.id,
        addressType: dto.address_type,
        displayName: dto.display_name ?? "",
        contactName: dto.contact_person_name ?? "",
        contactNumber: dto.contact_person_number ?? "",
        addressLine1: dto.address_line_1 ?? "",
        addressLine2: dto.address_line_2 ?? "",
        landmark: dto.landmark ?? "",
        city: dto.city ?? "",
        state: dto.state?.name ?? "",
        stateId: dto.state?.id ?? 0,
        country: dto.country?.name ?? "",
        pincode: dto.pincode ?? "",
        gstNumber: dto.gst_number ?? "",
        tag: dto.tag ?? "",
        isActive: dto.is_active !== false,
        isEditable: dto.is_editable !== false,
    };
}

export function mapAddressListToModels(results: HyperinventoryAddressDto[]): CompanyAddressModel[] {
    return results.filter((dto) => Boolean(dto?.id)).map(mapAddressDtoToModel);
}
