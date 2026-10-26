export type GstBusinessModel = {
    gstin: string;
    businessName: string;
    /** "Active", "Cancelled", etc. — worth surfacing before an address is reused. */
    status: string;
    /** Pre-joined for the "Company, Building No., Apartment" field. */
    building: string;
    /** Pre-joined for the "Area, Street" field. */
    street: string;
    pincode: string;
    city: string;
    state: string;
};
