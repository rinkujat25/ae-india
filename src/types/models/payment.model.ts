export type PaymentMethodModel = {
    id: string;
    name: string;
    description: string;
    /** Machine-readable mode, e.g. `cash_on_delivery`, used to pick an icon. */
    gatewayType: string;
    /** Extra charged for using this method; 0 when there is none. */
    charge: number;
    payableAmount: number;
    supportsPartialPayment: boolean;
    /** Free-form provider string, shown as-is when present. */
    creditBalance: string;
};
