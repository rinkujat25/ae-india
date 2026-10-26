import type {
    AccountCashPointsModel,
    AccountProfileModel,
    AccountReferralModel,
    AccountRewardModel,
    AccountSectionModel,
} from "@/types/models/account.model";

/**
 * Static account data for the signed-in dashboard.
 *
 * None of this is wired to a backend yet. Profile, addresses, orders, rewards and
 * CashPoints all become authenticated Hyperinventory reads once the session
 * contract exists — see the Authentication section of AGENTS.md.
 */

export const accountSections: AccountSectionModel[] = [
    { id: "overview", label: "My Account", title: "My Account", href: "/account", iconId: "account-user" },
    { id: "edit", label: "Edit Account", title: "Edit Account", href: "/account/edit-account", iconId: "account-edit" },
    { id: "addresses", label: "Manage Addresses", title: "Manage Addresses", href: "/account/addresses", iconId: "account-pin" },
    { id: "orders", label: "My Orders", title: "My Orders", href: "/account/orders", iconId: "account-bag" },
    { id: "referral", label: "Refer and Earn", title: "Refer and Earn", href: "/account/refer-and-earn", iconId: "account-gift" },
    { id: "rewards", label: "Rewards", title: "Rewards", href: "/account/rewards", iconId: "account-star" },
    { id: "wishlist", label: "My Wishlist", title: "My Wishlist", href: "/account/wishlist", iconId: "account-heart" },
];

export const staticAccountProfile: AccountProfileModel = {
    name: "Priya Menon",
    firstName: "Priya",
    lastName: "Menon",
    email: "priya.menon@acmeretail.in",
    phone: "+91 98765 43210",
    company: "Acme Retail Pvt Ltd",
    role: "Marketing",
    gstin: "27AABCU9603R1ZX",
};

export const accountRoleOptions = [
    "HR / People team",
    "Admin / Workplace",
    "Marketing",
    "Sales",
    "Procurement",
    "Founder / Leadership",
];

export const staticAccountCashPoints: AccountCashPointsModel = {
    balance: 0,
    rupeesPerPoint: 1,
};

export const staticAccountReferral: AccountReferralModel = {
    code: "ACME500",
    refereeReward: "₹500 in CashPoints",
    referrerReward: "₹1,000 in CashPoints",
    steps: [
        "Share your code with another company that gifts at volume.",
        "They get ₹500 in CashPoints on their first order above ₹25,000.",
        "You get ₹1,000 in CashPoints once that order is delivered.",
        "Spend CashPoints on any future order — 1 CashPoint = ₹1.",
    ],
};

export const staticAccountRewards: AccountRewardModel[] = [
    {
        id: "diwali-credit",
        amountLabel: "₹2,000",
        amountSuffix: "off",
        title: "Diwali program credit",
        description: "On orders above ₹1,00,000. Valid until 20 Oct 2026.",
        code: "DIWALI2K",
    },
    {
        id: "branding-waived",
        amountLabel: "Free",
        amountSuffix: "branding",
        title: "Logo branding waived",
        description: "Single-colour branding free on your next 250+ unit order.",
        code: "BRANDFREE",
    },
    {
        id: "welcome-kits",
        amountLabel: "5%",
        amountSuffix: "off",
        title: "New joiner kits",
        description: "On welcome kit programs booked before 31 Dec 2026.",
        code: "WELCOME5",
    },
    {
        id: "referral-bonus",
        amountLabel: "₹500",
        amountSuffix: "points",
        title: "Referral bonus waiting",
        description: "Credited when your referred company's first order ships.",
        code: "ACME500",
    },
];
