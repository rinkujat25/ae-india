import type { Metadata } from "next";
import { AccountRewardsPanel } from "@/components/account/AccountRewardsPanel";
import { AccountSectionShell } from "@/components/account/AccountSectionShell";
import { staticAccountRewards } from "@/constants/account";

export const metadata: Metadata = {
    title: "Rewards | AE India",
    robots: { index: false, follow: false },
};

export default function AccountRewardsPage() {
    return (
        <AccountSectionShell section="rewards">
            <AccountRewardsPanel rewards={staticAccountRewards} />
        </AccountSectionShell>
    );
}
