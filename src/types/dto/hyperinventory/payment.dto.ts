export type HyperinventoryPaymentMethodDto = {
    id: string;
    name: string;
    description?: string | null;
    is_active?: boolean;
    /** Machine-readable mode, e.g. `cash_on_delivery`. `name` is the label. */
    gateway_type?: string;
    /** Lower sorts first; the provider uses negatives to pin a method to the top. */
    position?: number;
    /** Free-form, e.g. "50,000/1,00,000". Display only — never parsed as a number. */
    credit_balance?: string | null;
    partial_payment_details?: {
        is_partial_payment_applicable?: boolean;
        payable_amount?: number;
    } | null;
    payment_method_charges?: {
        applicable_charge?: number;
    } | null;
};

export type HyperinventoryPaymentMethodListDto = {
    count: number;
    next: string | null;
    previous: string | null;
    results: HyperinventoryPaymentMethodDto[];
};
