import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckoutBar } from "@/components/checkout/CheckoutBar";
import { CheckoutPageContent } from "@/components/checkout/CheckoutPageContent";
import { CheckoutStyles } from "@/components/checkout/CheckoutStyles";
import { getCompanyAddresses } from "@/services/hyperinventory/address.service";
import { getSellerCashPoints } from "@/services/hyperinventory/cash-point.service";
import { getUserCart } from "@/services/hyperinventory/cart.service";
import { getAuthAccessToken, getAuthProfile } from "@/utils/auth-profile";
import { buildLoginHref } from "@/utils/auth-mode";
import { mapUserCart } from "@/utils/mappers/cart.mapper";

export const metadata: Metadata = {
    title: "Checkout | Wingback",
    robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
    const profile = await getAuthProfile();

    // Checkout needs an account: the cart, the addresses and the order all hang
    // off the buyer's company.
    if (!profile) {
        redirect(buildLoginHref({ next: "/checkout" }));
    }

    const accessToken = await getAuthAccessToken();
    const companyId = profile.company.id;

    const [cart, addresses, cashPoints] = await Promise.all([
        getUserCart(accessToken, companyId).catch(() => null),
        getCompanyAddresses(accessToken, companyId).catch(() => []),
        // A read, so it is safe on render; a missing programme is not an error.
        getSellerCashPoints(accessToken).catch(() => null),
    ]);

    const items = cart ? mapUserCart(cart).items : [];

    if (items.length === 0) {
        return (
            <>
                <div className="co-page">
                    <CheckoutBar />
                    <section className="co-empty">
                        <h1>There is nothing to check out.</h1>
                        <p>
                            Your cart is empty, so there is no order to place. Add the gifts you need and come back to
                            complete the purchase.
                        </p>
                        <Link className="btn btn-primary" href="/products">
                            Browse all products →
                        </Link>
                    </section>
                </div>
                <CheckoutStyles />
            </>
        );
    }

    return (
        <>
            <CheckoutPageContent
                items={items}
                cashPoints={cashPoints}
                billingAddresses={addresses.filter((address) => address.addressType === "billing_address")}
                shippingAddresses={addresses.filter((address) => address.addressType === "shipping_address")}
            />
            <CheckoutStyles />
        </>
    );
}
