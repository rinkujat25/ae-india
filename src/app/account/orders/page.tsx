import type { Metadata } from "next";
import { AccountOrdersPanel } from "@/components/account/AccountOrdersPanel";
import { AccountSectionShell } from "@/components/account/AccountSectionShell";
import { getCompanyOrders } from "@/services/hyperinventory/order.service";
import { requireCompanyId } from "@/utils/account-data";
import { getAuthAccessToken } from "@/utils/auth-profile";

export const metadata: Metadata = {
    title: "My Orders | AE India",
    robots: { index: false, follow: false },
};

export default async function OrdersPage() {
    const [accessToken, companyId] = await Promise.all([getAuthAccessToken(), requireCompanyId()]);
    const orders = await getCompanyOrders(accessToken, companyId).catch(() => []);

    return (
        <AccountSectionShell section="orders">
            <AccountOrdersPanel orders={orders} />
        </AccountSectionShell>
    );
}
