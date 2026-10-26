import type { Metadata } from "next";
import { AccountLogoutButton } from "@/components/account/AccountLogoutButton";
import { AccountOverviewPanel } from "@/components/account/AccountOverviewPanel";
import { AccountSectionShell } from "@/components/account/AccountSectionShell";
import { staticAccountCashPoints } from "@/constants/account";
import { requireAccountProfile } from "@/utils/account-data";

export const metadata: Metadata = {
    title: "My Account | Wingback",
    description: "Your Wingback account overview.",
    robots: { index: false, follow: false },
};

export default async function AccountPage() {
    const profile = await requireAccountProfile();

    return (
        <AccountSectionShell section="overview" headingSuffix={profile.name} actions={<AccountLogoutButton inline />}>
            <AccountOverviewPanel profile={profile} cashPoints={staticAccountCashPoints} />
        </AccountSectionShell>
    );
}
