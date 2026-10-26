import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AccountOrderDetailPanel } from "@/components/account/AccountOrderDetailPanel";
import { AccountSectionShell } from "@/components/account/AccountSectionShell";
import { getOrderDetail } from "@/services/hyperinventory/order.service";
import { getAuthAccessToken } from "@/utils/auth-profile";

export const metadata: Metadata = {
    title: "Order Details | Wingback",
    robots: { index: false, follow: false },
};

type OrderDetailPageProps = {
    params: Promise<{ orderId: string }>;
};

/** The provider's order ids are UUIDs; anything else never reaches the API. */
const orderIdPattern = /^[0-9a-f-]{36}$/i;

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
    const { orderId } = await params;

    if (!orderIdPattern.test(orderId)) notFound();

    const accessToken = await getAuthAccessToken();
    const order = await getOrderDetail(accessToken, orderId).catch(() => null);

    // Null covers both "no such order" and "not yours" -- the service maps the
    // provider's 403 and 404 to the same thing, so one buyer cannot probe for
    // another's order ids.
    if (!order) notFound();

    return (
        <AccountSectionShell section="orders">
            <AccountOrderDetailPanel order={order} />
        </AccountSectionShell>
    );
}
