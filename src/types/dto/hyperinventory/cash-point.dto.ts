export type HyperinventoryCashPointDto = {
    total_cashpoints?: number;
    expiring_cash_points?: number;
    redeemed_cashpoints?: number;
    coming_cash_points?: number;
    /** False when the seller runs no cash points programme for this buyer. */
    cash_points_data?: boolean;
};
