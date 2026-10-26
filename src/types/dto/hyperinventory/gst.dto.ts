export type HyperinventoryGstAddressDto = {
    buildingName?: string;
    buildingNumber?: string;
    floorNumber?: string;
    streetName?: string;
    locality?: string;
    location?: string;
    landMark?: string;
    districtName?: string;
    stateName?: string;
    pincode?: string;
};

export type HyperinventoryGstDetailsDto = {
    gstIdentificationNumber?: string;
    legalNameOfBusiness?: string;
    tradeName?: string;
    gstnStatus?: string;
    taxpayerType?: string;
    constitutionOfBusiness?: string;
    dateOfCancellation?: string;
    principalPlaceOfBusinessFields?: {
        principalPlaceOfBusinessAddress?: HyperinventoryGstAddressDto;
    };
};

export type HyperinventoryGstVerifyRequestDto = {
    gst_number: string;
};

export type HyperinventoryGstVerifyResponseDto = {
    success?: boolean;
    gst_number?: string;
    gst_details?: HyperinventoryGstDetailsDto;
    error_message?: string | null;
    status_code?: number;
};
