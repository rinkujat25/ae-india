import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutStyles } from "@/components/checkout/CheckoutStyles";
import { formatInr } from "@/utils/currency";
import { resolveAmountPaid, resolveOrderNumber } from "@/utils/order-success";

export const metadata: Metadata = {
    title: "Order placed | Wingback",
    robots: { index: false, follow: false },
};

type OrderSuccessPageProps = {
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
    const params = await searchParams;
    const orderNumber = resolveOrderNumber(params?.orderNumber);
    const amountPaid = resolveAmountPaid(params?.amountPaid);

    return (
        <>
            <main className="co-page co-success-page">
                <section className="co-success" aria-labelledby="order-success-heading">
                    <span className="co-success-tick" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                            <path d="m5 12.5 4.5 4.5L19 7.5" />
                        </svg>
                    </span>

                    <h1 id="order-success-heading">
                        Congratulations
                        <span>Order placed successfully.</span>
                    </h1>

                    {orderNumber || amountPaid ? (
                        <dl className="co-success-facts">
                            {orderNumber ? (
                                <div>
                                    <dt>Order number</dt>
                                    <dd>{orderNumber}</dd>
                                </div>
                            ) : null}
                            {amountPaid ? (
                                <div>
                                    <dt>Amount payable</dt>
                                    <dd>{formatInr(amountPaid)}</dd>
                                </div>
                            ) : null}
                        </dl>
                    ) : null}

                    <Link className="btn btn-primary co-success-cta" href="/products">
                        Continue Shopping
                    </Link>
                </section>
            </main>
            <CheckoutStyles />
        </>
    );
}
