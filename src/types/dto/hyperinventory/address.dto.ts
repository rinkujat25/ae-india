export type HyperinventoryAddressType = "billing_address" | "shipping_address";

export type HyperinventoryAddressRefDto = {
    id: number;
    name: string;
    code: string;
};

export type HyperinventoryCreateAddressRequestDto = {
    contact_person_name: string;
    contact_person_number: string;
    display_name: string;
    legal_name: string;
    address_line_1: string;
    address_line_2: string;
    landmark: string;
    city: string;
    /** State id, not the name. */
    state: number;
    country: number;
    pincode: string;
    gst_number: string;
    address_type: HyperinventoryAddressType;
    tag: string;
};

export type HyperinventoryAddressDto = {
    id: string;
    address_type: HyperinventoryAddressType;
    display_name?: string;
    legal_name?: string;
    contact_person_name?: string;
    contact_person_number?: string;
    address_line_1?: string;
    address_line_2?: string;
    landmark?: string;
    city?: string;
    state?: HyperinventoryAddressRefDto | null;
    country?: HyperinventoryAddressRefDto | null;
    pincode?: string;
    gst_number?: string;
    tag?: string;
    is_active?: boolean;
    is_editable?: boolean;
};

export type HyperinventoryAddressListDto = {
    count: number;
    next: string | null;
    previous: string | null;
    results: HyperinventoryAddressDto[];
};
