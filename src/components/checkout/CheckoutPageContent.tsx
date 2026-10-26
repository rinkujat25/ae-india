"use client";

import { useRouter } from "next/navigation";
import { useApiRequest } from "@/hooks/useApiRequest";
import { useCallback, useEffect, useRef, useState } from "react";
import { CheckoutAddressPicker } from "@/components/checkout/CheckoutAddressPicker";
import { CheckoutBar } from "@/components/checkout/CheckoutBar";
import { CheckoutOrderSummary } from "@/components/checkout/CheckoutOrderSummary";
import { CheckoutPaymentPanel } from "@/components/checkout/CheckoutPaymentPanel";
import { CheckoutReviewPanel } from "@/components/checkout/CheckoutReviewPanel";
import type { CompanyAddressModel } from "@/types/models/address.model";
import type { CartItemModel } from "@/types/models/cart.model";
import type { CashPointsModel } from "@/types/models/cash-point.model";
import type { OrderConfirmationModel } from "@/types/models/order-confirmation.model";
import type { PaymentMethodModel } from "@/types/models/payment.model";
import type { QuotationModel } from "@/types/models/quotation.model";
import { notifyCartUpdated } from "@/utils/cart-storage";
import { buildOrderSuccessHref } from "@/utils/order-success";

type CheckoutPageContentProps = {
    items: CartItemModel[];
    cashPoints: CashPointsModel | null;
    billingAddresses: CompanyAddressModel[];
    shippingAddresses: CompanyAddressModel[];
};

/** The provider has no coupon endpoint yet, so Apply reports that rather than pretending. */
const couponUnavailableMessage = "Coupons are not connected yet. Ask your account manager for program pricing.";

const steps = ["Billing", "Delivery", "Review", "Payment"];

/** Mirrors the guard in `/api/checkout/order`: Cash on Delivery is all we can complete. */
const supportedGateway = "cash_on_delivery";

/** Both address steps come back to checkout once the address is saved. */
const addAddressHref = "/account/addresses/new?next=%2Fcheckout";

export function CheckoutPageContent({
    items,
    cashPoints,
    billingAddresses,
    shippingAddresses,
}: CheckoutPageContentProps) {
    const router = useRouter();
    const apiRequest = useApiRequest();
    const [stepIndex, setStepIndex] = useState(0);
    const [billingId, setBillingId] = useState(billingAddresses[0]?.id ?? "");
    const [shippingId, setShippingId] = useState(shippingAddresses[0]?.id ?? "");
    const [coupon, setCoupon] = useState("");
    const [couponNote, setCouponNote] = useState("");
    const [paymentMethodId, setPaymentMethodId] = useState("");

    const [quotation, setQuotation] = useState<QuotationModel | null>(null);
    const [quotationError, setQuotationError] = useState("");
    const [isAssigning, setIsAssigning] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const hasRequestedQuotation = useRef(false);

    /**
     * Entering checkout turns the cart into a quotation, which is what payment
     * modes, charges and the final amount are all quoted against.
     *
     * It runs once per visit, guarded by a ref: this is a write, and a
     * `router.refresh()` from removing an address would otherwise mint a second
     * quotation. A plain fetch keeps the full-screen loader off page entry.
     */
    useEffect(() => {
        if (hasRequestedQuotation.current) return;

        hasRequestedQuotation.current = true;

        void (async () => {
            try {
                const response = await fetch("/api/checkout/quotation", { method: "POST" });
                const body = (await response.json().catch(() => null)) as
                    | { quotation?: QuotationModel; message?: string }
                    | null;

                if (!response.ok || !body?.quotation) {
                    setQuotationError(body?.message || "This order could not be prepared for payment.");
                    return;
                }

                setQuotation(body.quotation);
            } catch {
                setQuotationError("Checkout is unavailable right now.");
            }
        })();
    }, []);

    const isDeliveryStep = stepIndex === 1;
    const isReviewStep = stepIndex === 2;
    const isPaymentStep = stepIndex === 3;

    const billing = billingAddresses.find((address) => address.id === billingId);
    const delivery = shippingAddresses.find((address) => address.id === shippingId);

    // Each step needs its own answer before the buyer can move on. Placing the
    // order is the one action that cannot run: it needs an order-create endpoint
    // the provider has not supplied.
    const canContinue = isPaymentStep
        ? Boolean(quotation && billingId && shippingId && paymentMethodId)
        : isReviewStep
          ? Boolean(billingId && shippingId)
          : isDeliveryStep
            ? Boolean(shippingId)
            : Boolean(billingId);

    const message = isPaymentStep
        ? paymentMethodId
            ? "You will pay by cash when the order is delivered"
            : "Please choose how you want to pay"
        : isReviewStep
          ? "Please continue for Pay Securely"
          : isDeliveryStep
            ? "Please continue to review your order"
            : "Please continue for selecting Delivery Address";

    const handleMethodsLoaded = useCallback((methods: PaymentMethodModel[]) => {
        const usable = methods.filter((method) => method.gatewayType === supportedGateway);

        setPaymentMethodId((current) => {
            // The list is re-quoted whenever the buyer changes an address, so a
            // mode chosen earlier can disappear. Keeping it would pay with a
            // method this order no longer offers.
            if (current && usable.some((method) => method.id === current)) return current;

            // One usable mode is the common case; preselecting saves a click.
            return usable.length === 1 ? usable[0].id : "";
        });
    }, []);

    function handleBack() {
        if (stepIndex > 0) {
            setStepIndex(stepIndex - 1);
            return;
        }

        router.push("/cart");
    }

    /**
     * Places the order. This is the only irreversible action in checkout, so it
     * is guarded against a double submit and reports failure plainly — the
     * provider either created the order or it did not.
     */
    async function handlePlaceOrder() {
        if (!quotation || !canContinue || isPlacingOrder) return;

        setIsPlacingOrder(true);
        setQuotationError("");

        try {
            const response = await apiRequest<{ order: OrderConfirmationModel }>("/api/checkout/order", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    quotationId: quotation.id,
                    billingAddressId: billingId,
                    shippingAddressId: shippingId,
                    paymentMethodId,
                }),
            });

            // The provider empties the cart behind this, so the header badge
            // would otherwise keep showing the ordered items.
            notifyCartUpdated();

            // `replace`, not `push`: Back must not return to a checkout whose
            // cart and quotation are already spent. The loader stays up until
            // the success page paints, so the button never looks idle while the
            // order is already placed.
            router.replace(
                buildOrderSuccessHref({
                    orderNumber: response.order.number,
                    amountPaid: response.order.total || quotation.total,
                }),
            );

            return;
        } catch (placeError) {
            setQuotationError(
                placeError instanceof Error ? placeError.message : "Your order could not be placed.",
            );
            setIsPlacingOrder(false);
        }
    }

    /**
     * Each address step commits its choice to the quotation before moving on:
     * shipping charges and the payable amount are quoted against the addresses,
     * so advancing without them would price the order from stale figures. A
     * failed assignment keeps the buyer on the step rather than hiding it.
     */
    async function handleContinue() {
        if (!canContinue || isAssigning) return;

        // Only the two address steps commit anything; review just moves on.
        const addressType = stepIndex === 0 ? "billing" : isDeliveryStep ? "shipping" : null;
        const addressId = addressType === "billing" ? billingId : shippingId;

        if (quotation && addressType) {
            setIsAssigning(true);

            try {
                const response = await apiRequest<{ quotation: QuotationModel }>(
                    "/api/checkout/quotation/address",
                    {
                        method: "PATCH",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({ quotationId: quotation.id, addressId, addressType }),
                    },
                );

                setQuotation(response.quotation);
                setQuotationError("");
            } catch (assignError) {
                setQuotationError(
                    assignError instanceof Error ? assignError.message : "That address could not be applied.",
                );
                return;
            } finally {
                setIsAssigning(false);
            }
        }

        setStepIndex(Math.min(stepIndex + 1, steps.length - 1));
    }

    return (
        <div className="co-page">
            <CheckoutBar onBack={handleBack} />

            <div className="co-shell">
                <div className="co-main">
                    <section className="co-panel co-coupon" aria-label="Promo code">
                        <span className="co-coupon-label">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2a2 2 0 0 1-.6-1.4V4.4A1.4 1.4 0 0 1 4.4 3H12a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.6Z" />
                                <circle cx="7.6" cy="7.6" r="1.3" />
                            </svg>
                            <span>
                                <b>Apply Promo Code &amp; Coupons</b>
                                <small>Avail discount on order purchase.</small>
                            </span>
                        </span>

                        <form
                            className="co-coupon-form"
                            onSubmit={(event) => {
                                event.preventDefault();
                                setCouponNote(couponUnavailableMessage);
                            }}
                        >
                            <input
                                aria-label="Coupon code"
                                placeholder="APPLY COUPON"
                                value={coupon}
                                onChange={(event) => setCoupon(event.target.value)}
                            />
                            <button type="submit" disabled={!coupon.trim()}>
                                Apply
                            </button>
                        </form>

                        {couponNote ? (
                            <p className="co-coupon-note" data-tone="error" role="status">
                                {couponNote}
                            </p>
                        ) : null}
                    </section>

                    {isPaymentStep ? (
                        <CheckoutPaymentPanel
                            quotationId={quotation?.id ?? ""}
                            quotationError={quotationError}
                            billing={billing}
                            delivery={delivery}
                            selectedMethodId={paymentMethodId}
                            onSelectMethod={setPaymentMethodId}
                            onMethodsLoaded={handleMethodsLoaded}
                        />
                    ) : isReviewStep ? (
                        <CheckoutReviewPanel
                            billing={billing}
                            delivery={delivery}
                            items={items}
                            onChangeStep={setStepIndex}
                        />
                    ) : isDeliveryStep ? (
                        <CheckoutAddressPicker
                            key="delivery"
                            title="Choose Delivery Address"
                            addresses={shippingAddresses}
                            selectedId={shippingId}
                            onSelect={setShippingId}
                            showGstin={false}
                            addHref={addAddressHref}
                        />
                    ) : (
                        <CheckoutAddressPicker
                            key="billing"
                            title="Choose Billing Address"
                            addresses={billingAddresses}
                            selectedId={billingId}
                            onSelect={setBillingId}
                            showGstin
                            addHref={addAddressHref}
                        />
                    )}

                    {quotationError && !isPaymentStep ? (
                        <p className="cart-load-error" role="alert">
                            {quotationError}
                        </p>
                    ) : null}

                    <section className="co-panel co-next" aria-label="Checkout progress">
                        <div>
                            <ol className="co-steps">
                                {steps.map((label, index) => (
                                    <li
                                        key={label}
                                        data-index={index + 1}
                                        data-state={
                                            index === stepIndex ? "current" : index < stepIndex ? "done" : "todo"
                                        }
                                    >
                                        {label}
                                    </li>
                                ))}
                            </ol>
                            <b>{message}</b>
                            <small>
                                Step {stepIndex + 1} of {steps.length}
                            </small>
                        </div>

                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => void (isPaymentStep ? handlePlaceOrder() : handleContinue())}
                            disabled={!canContinue || isAssigning || isPlacingOrder}
                        >
                            {isPaymentStep ? (isPlacingOrder ? "Placing your order…" : "Pay Securely") : "Continue"}
                        </button>
                    </section>
                </div>

                <aside className="co-aside">
                    <CheckoutOrderSummary items={items} cashPoints={cashPoints} />
                </aside>
            </div>
        </div>
    );
}
