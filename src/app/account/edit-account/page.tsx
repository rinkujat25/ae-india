import type { Metadata } from "next";
import { AccountEditPanel } from "@/components/account/AccountEditPanel";
import { AccountSectionShell } from "@/components/account/AccountSectionShell";
import { requireAccountProfile } from "@/utils/account-data";

export const metadata: Metadata = {
    title: "Edit Account | AE India",
    robots: { index: false, follow: false },
};

export default async function EditAccountPage() {
    const profile = await requireAccountProfile();

    return (
        <AccountSectionShell section="edit">
            <AccountEditPanel profile={profile} />
        </AccountSectionShell>
    );
}
