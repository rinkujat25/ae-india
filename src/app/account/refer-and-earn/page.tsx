import type { Metadata } from "next";
import { notFound } from "next/navigation";
// import { AccountReferralPanel } from "@/components/account/AccountReferralPanel";
// import { AccountSectionShell } from "@/components/account/AccountSectionShell";
// import { staticAccountReferral } from "@/constants/account";

export const metadata: Metadata = {
    title: "Refer and Earn | Wingback",
    robots: { index: false, follow: false },
};

/**
 * Refer and Earn is switched off, along with its sidebar entry in
 * `accountSections`. The page answers 404 rather than rendering: its shell
 * looks the section up in that list, and with the entry commented out the
 * lookup would throw.
 *
 * To bring it back, uncomment the entry and the imports and body below.
 */
export default function AccountReferralPage() {
    notFound();

    // return (
    //     <AccountSectionShell section="referral">
    //         <AccountReferralPanel referral={staticAccountReferral} />
    //     </AccountSectionShell>
    // );
}
