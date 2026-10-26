export type QuotationModel = {
    id: string;
    /** Human-facing reference, e.g. "SA/QN/116". */
    number: string;
    status: string;
    subtotal: number;
    gstAmount: number;
    discount: number;
    shippingCharges: number;
    /** Authoritative amount payable; not the sum of the line items. */
    total: number;
    isExpired: boolean;
    billingAddressId: string;
    shippingAddressId: string;
};
