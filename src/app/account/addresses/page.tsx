import type { Metadata } from "next";
import { AccountAddressesPanel } from "@/components/account/AccountAddressesPanel";
import { AccountSectionShell } from "@/components/account/AccountSectionShell";
import { getCompanyAddresses } from "@/services/hyperinventory/address.service";
import { requireCompanyId } from "@/utils/account-data";
import { getAuthAccessToken } from "@/utils/auth-profile";

export const metadata: Metadata = {
    title: "Manage Addresses | Wingback",
    robots: { index: false, follow: false },
};

export default async function AddressesPage() {
    const [accessToken, companyId] = await Promise.all([getAuthAccessToken(), requireCompanyId()]);
    const addresses = await getCompanyAddresses(accessToken, companyId).catch(() => []);

    return (
        <AccountSectionShell section="addresses">
            <AccountAddressesPanel addresses={addresses} />
        </AccountSectionShell>
    );
}
