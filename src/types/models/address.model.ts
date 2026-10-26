import type { HyperinventoryAddressType } from "@/types/dto/hyperinventory/address.dto";

export type CompanyAddressModel = {
    id: string;
    addressType: HyperinventoryAddressType;
    displayName: string;
    contactName: string;
    contactNumber: string;
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    city: string;
    state: string;
    stateId: number;
    country: string;
    pincode: string;
    gstNumber: string;
    tag: string;
    isActive: boolean;
    isEditable: boolean;
};
