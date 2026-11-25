import type { Metadata } from "next";
import { AccountAddressForm } from "@/components/account/AccountAddressForm";
import { AccountSectionShell } from "@/components/account/AccountSectionShell";
import { getStates } from "@/services/hyperinventory/state.service";
import { getAuthAccessToken } from "@/utils/auth-profile";
import { resolveInternalPath } from "@/utils/return-path";

export const metadata: Metadata = {
    title: "Add Address | AE India",
    robots: { index: false, follow: false },
};

type NewAddressPageProps = {
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function NewAddressPage({ searchParams }: NewAddressPageProps) {
    const [states, params] = await Promise.all([
        getStates(await getAuthAccessToken()).catch(() => []),
        searchParams,
    ]);

    return (
        <AccountSectionShell section="addresses" crumb="Add Address">
            <AccountAddressForm states={states} returnHref={resolveInternalPath(params?.next)} />
        </AccountSectionShell>
    );
}
