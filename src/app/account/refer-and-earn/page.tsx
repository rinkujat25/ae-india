import type { Metadata } from "next";
import { AccountReferralPanel } from "@/components/account/AccountReferralPanel";
import { AccountSectionShell } from "@/components/account/AccountSectionShell";
import { staticAccountReferral } from "@/constants/account";

export const metadata: Metadata = {
    title: "Refer and Earn | Wingback",
    robots: { index: false, follow: false },
};

export default function AccountReferralPage() {
    return (
        <AccountSectionShell section="referral">
            <AccountReferralPanel referral={staticAccountReferral} />
        </AccountSectionShell>
    );
}
