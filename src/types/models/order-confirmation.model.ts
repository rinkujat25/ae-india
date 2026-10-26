export type OrderConfirmationModel = {
    id: string;
    /** Human-facing reference, e.g. "SA/SO/91"; may be blank. */
    number: string;
    total: number;
    status: string;
};
