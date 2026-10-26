export type CashPointsModel = {
    /** Points available to spend now. */
    balance: number;
    expiring: number;
    redeemed: number;
    /** Points earned but not yet released. */
    pending: number;
    /** False when the seller runs no cash points programme; hide the UI entirely. */
    isEnabled: boolean;
};
