"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AccountAddressFields } from "@/components/account/AccountAddressFields";
import { useGlobalApiLoader } from "@/components/common/GlobalApiLoaderProvider";
import { usePincodeLookup } from "@/hooks/usePincodeLookup";
import type { GstBusinessModel } from "@/types/models/gst.model";
import type { PincodeModel } from "@/types/models/pincode.model";
import type { StateModel } from "@/types/models/state.model";
import { LinkLoadingIndicator } from "@/components/common/LinkLoadingIndicator";
import { accountSectionHref } from "@/utils/account-section";
import {
    type AddressErrors,
    type AddressFieldName,
    type AddressValues,
    createEmptyAddress,
    gstinLength,
    gstinPattern,
    validateAddress,
} from "@/utils/address-validation";

type AccountAddressFormProps = {
    states: StateModel[];
    /**
     * Where Save and Cancel return to. Checkout sends buyers here mid-order, so
     * they land back on the step they left instead of in the account section.
     */
    returnHref?: string;
};

export function AccountAddressForm({ states, returnHref }: AccountAddressFormProps) {
    const router = useRouter();
    const { withApiLoader } = useGlobalApiLoader();
    const [billing, setBilling] = useState<AddressValues>(createEmptyAddress);
    const [shipping, setShipping] = useState<AddressValues>(createEmptyAddress);
    const [sameForShipping, setSameForShipping] = useState(true);
    const [billingErrors, setBillingErrors] = useState<AddressErrors>({});
    const [shippingErrors, setShippingErrors] = useState<AddressErrors>({});
    const [gstin, setGstin] = useState("");
    const [gstStatus, setGstStatus] = useState<{ tone: "ok" | "error" | "pending"; message: string } | null>(null);
    const [isFetchingGst, setIsFetchingGst] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<{ tone: "ok" | "error"; message: string } | null>(null);

    /** A resolved pin code fills city and state, and clears any errors on them. */
    const applyBillingPincode = useCallback((match: PincodeModel) => {
        setBilling((current) => ({ ...current, city: match.city, state: String(match.stateId) }));
        setBillingErrors((current) => ({ ...current, city: undefined, state: undefined }));
    }, []);

    const applyShippingPincode = useCallback((match: PincodeModel) => {
        setShipping((current) => ({ ...current, city: match.city, state: String(match.stateId) }));
        setShippingErrors((current) => ({ ...current, city: undefined, state: undefined }));
    }, []);

    const billingPincode = usePincodeLookup(applyBillingPincode);
    const shippingPincode = usePincodeLookup(applyShippingPincode);

    function updateBilling(field: AddressFieldName, value: string) {
        setBilling((current) => ({ ...current, [field]: value }));
        setBillingErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));

        if (field === "pincode") billingPincode.lookup(value.trim());
    }

    function updateShipping(field: AddressFieldName, value: string) {
        setShipping((current) => ({ ...current, [field]: value }));
        setShippingErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));

        if (field === "pincode") shippingPincode.lookup(value.trim());
    }

    /** Fills the billing block from a verified GSTIN's registered address. */
    async function handleGstFetch() {
        const value = gstin.trim().toUpperCase();

        if (!gstinPattern.test(value)) {
            setGstStatus({ tone: "error", message: "Enter a valid 15-character GSTIN." });
            return;
        }

        setGstStatus({ tone: "pending", message: "Verifying GSTIN…" });
        setIsFetchingGst(true);

        try {
            const response = await withApiLoader(() =>
                fetch("/api/account/gst-verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ gstin: value }),
                }),
            );

            if (!response.ok) {
                const body = (await response.json().catch(() => null)) as { message?: string } | null;

                setGstStatus({ tone: "error", message: body?.message || "That GSTIN could not be verified." });
                return;
            }

            const { business } = (await response.json()) as { business: GstBusinessModel };

            setBilling((current) => ({
                ...current,
                building: business.building || current.building,
                street: business.street || current.street,
                pincode: business.pincode || current.pincode,
                gstin: business.gstin || current.gstin,
            }));
            setBillingErrors((current) => ({
                ...current,
                building: undefined,
                street: undefined,
                pincode: undefined,
                gstin: undefined,
            }));

            // The pin code lookup is the authority for city and state id.
            if (business.pincode) billingPincode.lookup(business.pincode);

            const isActive = business.status.toLowerCase() === "active";

            setGstStatus({
                tone: isActive ? "ok" : "error",
                message: isActive
                    ? `${business.businessName} — address filled in below.`
                    : `${business.businessName} — this GSTIN is ${business.status || "not active"}.`,
            });
        } catch {
            setGstStatus({ tone: "error", message: "GSTIN lookup is unavailable right now." });
        } finally {
            setIsFetchingGst(false);
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isSaving) return;

        const nextBillingErrors = validateAddress(billing);
        // Shipping is only checked when it is a separate address.
        const nextShippingErrors = sameForShipping ? {} : validateAddress({ ...shipping, gstin: "" });

        setBillingErrors(nextBillingErrors);
        setShippingErrors(nextShippingErrors);

        const errorCount = Object.keys(nextBillingErrors).length + Object.keys(nextShippingErrors).length;

        if (errorCount > 0) {
            setStatus({
                tone: "error",
                message: `Check ${errorCount} ${errorCount === 1 ? "field" : "fields"} highlighted below.`,
            });
            return;
        }

        setStatus(null);
        setIsSaving(true);

        try {
            const response = await withApiLoader(() =>
                fetch("/api/account/addresses", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ billing, shipping, sameForShipping }),
                }),
            );

            if (!response.ok) {
                const body = (await response.json().catch(() => null)) as
                    | { message?: string; errors?: { billing?: AddressErrors; shipping?: AddressErrors } }
                    | null;

                if (body?.errors) {
                    setBillingErrors(body.errors.billing ?? {});
                    setShippingErrors(body.errors.shipping ?? {});
                }

                setStatus({ tone: "error", message: body?.message || "That address could not be saved." });
                return;
            }

            setStatus({ tone: "ok", message: "Address saved." });
            router.push(returnHref || accountSectionHref("addresses"));
            router.refresh();
        } catch {
            setStatus({ tone: "error", message: "Saving addresses is unavailable right now." });
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <section className="account-card">
            <div className="account-card-body">
                <form className="account-form" onSubmit={handleSubmit} noValidate>
                    <div className="account-field account-field-block">
                        <label htmlFor="fetch-gstin">Fetch Details from GSTIN</label>
                        <div className="account-gstin-row">
                            <input
                                id="fetch-gstin"
                                name="fetchGstin"
                                type="text"
                                placeholder="Enter GSTIN"
                                maxLength={gstinLength}
                                value={gstin}
                                style={{ textTransform: "uppercase" }}
                                onChange={(event) => setGstin(event.target.value)}
                            />
                            <button
                                className="btn btn-soft account-btn-sm"
                                type="button"
                                onClick={handleGstFetch}
                                disabled={isFetchingGst}
                            >
                                {isFetchingGst ? "Verifying…" : "Fetch"}
                            </button>
                        </div>
                        {gstStatus ? (
                            <small
                                className={
                                    gstStatus.tone === "error"
                                        ? "account-field-error"
                                        : "account-field-hint account-field-hint-live"
                                }
                                role="status"
                            >
                                {gstStatus.message}
                            </small>
                        ) : (
                            <small className="account-field-hint">
                                Enter a GSTIN and we will fill the registered business address in below.
                            </small>
                        )}
                    </div>

                    {states.length === 0 ? (
                        <p className="account-status account-status-error" role="status">
                            The state list could not be loaded, so this address cannot be saved right now. Refresh the
                            page to try again.
                        </p>
                    ) : null}

                    <AccountAddressFields
                        idPrefix="billing"
                        states={states}
                        values={billing}
                        errors={billingErrors}
                        includeGstin
                        pincodeStatus={billingPincode.status}
                        onFieldChange={updateBilling}
                    />

                    <label className="account-check">
                        <input
                            type="checkbox"
                            checked={sameForShipping}
                            onChange={(event) => {
                                setSameForShipping(event.target.checked);
                                if (event.target.checked) setShippingErrors({});
                            }}
                        />
                        <span>Use same address for Shipping</span>
                    </label>

                    {sameForShipping ? null : (
                        <div className="account-shipping">
                            <h3>Shipping Address</h3>
                            <AccountAddressFields
                                idPrefix="shipping"
                                states={states}
                                values={shipping}
                                errors={shippingErrors}
                                pincodeStatus={shippingPincode.status}
                                onFieldChange={updateShipping}
                            />
                        </div>
                    )}

                    {status ? (
                        <p
                            className={status.tone === "ok" ? "account-status" : "account-status account-status-error"}
                            role="status"
                        >
                            {status.message}
                        </p>
                    ) : null}

                    <div className="account-form-actions account-form-actions-split">
                        <Link className="btn btn-soft" href={returnHref || accountSectionHref("addresses")}>
                            Cancel
                            <LinkLoadingIndicator />
                        </Link>
                        <button className="btn btn-primary" type="submit" disabled={isSaving || states.length === 0}>
                            {isSaving ? "Saving…" : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
