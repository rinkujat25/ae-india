import Link from "next/link";
import { AccountCashPointsCard } from "@/components/account/AccountCashPointsCard";
import { LinkLoadingIndicator } from "@/components/common/LinkLoadingIndicator";
import type {
    AccountCashPointsModel,
    AccountProfileModel,
} from "@/types/models/account.model";
import { accountSectionHref } from "@/utils/account-section";

type AccountOverviewPanelProps = {
    profile: AccountProfileModel;
    cashPoints: AccountCashPointsModel;
};

const shortcuts = [
    {
        id: "orders" as const,
        iconId: "account-truck",
        title: "Track an order",
        description: "See where your last gifting run has reached.",
    },
    {
        id: "addresses" as const,
        iconId: "account-pin",
        title: "Delivery addresses",
        description: "Offices and warehouses we ship to.",
    },
    {
        id: "wishlist" as const,
        iconId: "account-heart",
        title: "Your wishlist",
        description: "Saved gifts, ready to move into a cart.",
    },
];

export function AccountOverviewPanel({ profile, cashPoints }: AccountOverviewPanelProps) {
    return (
        <>
            <AccountCashPointsCard cashPoints={cashPoints} />

            <section className="account-card account-gap">
                <div className="account-card-top">
                    <h2>Profile</h2>
                    <Link className="account-card-edit" href={accountSectionHref("edit")}>
                        <svg aria-hidden="true">
                            <use href="#account-edit" />
                        </svg>
                        Edit
                        <LinkLoadingIndicator />
                    </Link>
                </div>
                <div className="account-card-body">
                    <dl className="account-kv">
                        <div>
                            <dt>Name</dt>
                            <dd>{profile.name}</dd>
                        </div>
                        <div>
                            <dt>Email</dt>
                            <dd>{profile.email}</dd>
                        </div>
                        <div>
                            <dt>Mobile Number</dt>
                            <dd>{profile.phone}</dd>
                        </div>
                        <div>
                            <dt>Company</dt>
                            <dd>{profile.company}</dd>
                        </div>
                    </dl>
                </div>
            </section>

            <div className="account-tiles account-gap">
                {shortcuts.map((shortcut) => (
                    <Link key={shortcut.id} className="account-tile" href={accountSectionHref(shortcut.id)}>
                        <svg aria-hidden="true">
                            <use href={`#${shortcut.iconId}`} />
                        </svg>
                        <b>{shortcut.title}</b>
                        <small>{shortcut.description}</small>
                        <LinkLoadingIndicator />
                    </Link>
                ))}
            </div>
        </>
    );
}
