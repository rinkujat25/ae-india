export type AccountSectionId =
    | "overview"
    | "edit"
    | "addresses"
    | "orders"
    | "referral"
    | "rewards"
    | "wishlist";

export type AccountSectionModel = {
    id: AccountSectionId;
    /** Sidebar wording. */
    label: string;
    /** Page heading and breadcrumb wording. */
    title: string;
    href: string;
    iconId: string;
};

export type AccountProfileModel = {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    role: string;
    gstin: string;
};

export type AccountCashPointsModel = {
    balance: number;
    rupeesPerPoint: number;
};

export type AccountReferralModel = {
    code: string;
    refereeReward: string;
    referrerReward: string;
    steps: string[];
};

export type AccountRewardModel = {
    id: string;
    amountLabel: string;
    amountSuffix: string;
    title: string;
    description: string;
    code: string;
};
