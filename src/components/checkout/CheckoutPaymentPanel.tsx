"use client";

import { useCallback, useEffect, useState } from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import type { CompanyAddressModel } from "@/types/models/address.model";
import type { PaymentMethodModel } from "@/types/models/payment.model";
import { formatInr } from "@/utils/currency";

type CheckoutPaymentPanelProps = {
    /** The quotation the modes are priced against; empty until one is created. */
    quotationId: string;
    /** Set when creating that quotation failed, so this step can explain why. */
    quotationError: string;
    billing: CompanyAddressModel | undefined;
    delivery: CompanyAddressModel | undefined;
    selectedMethodId: string;
    onSelectMethod: (methodId: string) => void;
    onMethodsLoaded: (methods: PaymentMethodModel[]) => void;
};

type PaymentMethodsResponse = { methods: PaymentMethodModel[] };

/**
 * The only gateway checkout can complete today. The others are shown, so the
 * buyer can see what is coming, but cannot be chosen: placing an order against
 * one without a payment handshake would leave it unpaid.
 */
const supportedGateway = "cash_on_delivery";

function formatLines(address: CompanyAddressModel) {
    return [address.addressLine1, address.addressLine2, address.landmark, address.city, address.state, address.pincode]
        .map((part) => part.trim())
        .filter(Boolean)
        .join(", ");
}

export function CheckoutPaymentPanel({
    quotationId,
    quotationError,
    billing,
    delivery,
    selectedMethodId,
    onSelectMethod,
    onMethodsLoaded,
}: CheckoutPaymentPanelProps) {
    const apiRequest = useApiRequest();
    const [methods, setMethods] = useState<PaymentMethodModel[]>([]);
    const [error, setError] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);

    const loadMethods = useCallback(async () => {
        if (!quotationId) return;

        try {
            const response = await apiRequest<PaymentMethodsResponse>(
                `/api/checkout/payment-methods?quotationId=${encodeURIComponent(quotationId)}`,
            );

            setMethods(response.methods);
            onMethodsLoaded(response.methods);
            setError("");
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : "Payment modes could not be loaded.");
        } finally {
            setHasLoaded(true);
        }
    }, [apiRequest, onMethodsLoaded, quotationId]);

    useEffect(() => {
        // Deferred like the cart's own load: kicking the fetch off synchronously
        // inside the effect makes React re-render in a cascade.
        const timeoutId = window.setTimeout(() => void loadMethods(), 0);
        return () => window.clearTimeout(timeoutId);
    }, [loadMethods]);

    return (
        <section className="co-panel" aria-label="Choose payment mode">
            <div className="co-section-head co-pay-head">
                <h2>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
                        <path d="M2.5 9.5h19" />
                        <path d="M6 15.5h3" />
                    </svg>
                    Choose Payment Mode
                </h2>
            </div>

            <div className="co-pay">
                {quotationError ? (
                    <p className="co-addr-error" role="alert">
                        {quotationError}
                    </p>
                ) : !quotationId ? (
                    <p className="co-pay-blocked">Preparing your order…</p>
                ) : error ? (
                    <p className="co-addr-error" role="alert">
                        {error}
                    </p>
                ) : !hasLoaded ? null : methods.length === 0 ? (
                    <p className="co-pay-blocked">No payment mode is available for this order.</p>
                ) : (
                    <div className="co-pay-modes" role="radiogroup" aria-label="Payment mode">
                        {methods.map((method) => {
                            const isSelected = method.id === selectedMethodId;
                            const isSupported = method.gatewayType === supportedGateway;

                            return (
                                <button
                                    className="co-pay-mode"
                                    key={method.id}
                                    type="button"
                                    role="radio"
                                    aria-checked={isSelected}
                                    data-selected={isSelected}
                                    disabled={!isSupported}
                                    onClick={() => onSelectMethod(method.id)}
                                >
                                    <span className="co-pay-dot" aria-hidden="true" />
                                    <span>
                                        <b>{method.name}</b>
                                        {method.description ? <small>{method.description}</small> : null}
                                        {method.charge > 0 ? (
                                            <small>Handling charge {formatInr(method.charge)}</small>
                                        ) : null}
                                        {method.creditBalance ? (
                                            <small>Credit balance {method.creditBalance}</small>
                                        ) : null}
                                        {isSupported ? null : <small>Not available yet.</small>}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}

                <p className="co-pay-note">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 11v5.5M12 7.8v.2" />
                    </svg>
                    Review your order and address details to avoid cancellations.
                </p>

                <div className="co-pay-addresses">
                    <div>
                        <h3>Billing Address</h3>
                        <p>{billing ? formatLines(billing) : "Not selected."}</p>
                    </div>
                    <div>
                        <h3>Delivery Address</h3>
                        <p>{delivery ? formatLines(delivery) : "Not selected."}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
