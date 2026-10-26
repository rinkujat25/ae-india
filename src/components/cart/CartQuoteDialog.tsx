"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import type { CartItemModel } from "@/types/models/cart.model";
import { formatInr } from "@/utils/currency";
import {
    emptyQuoteValues,
    type QuoteContactValues,
    type QuoteErrors,
    quoteBrandingOptions,
    quoteOccasions,
    validateQuoteRequest,
} from "@/utils/quote-validation";

const contactEmail = "go@sampley.in";

type CartQuoteDialogProps = {
    items: CartItemModel[];
    isOpen: boolean;
    onClose: () => void;
};

type QuoteResponse = { delivered?: boolean };

/**
 * Builds the prefilled email used when no quote endpoint is configured.
 *
 * The request still has to reach someone, so the cart and the answers are laid
 * out as readable lines rather than being lost.
 */
function buildMailto(values: QuoteContactValues, items: CartItemModel[]) {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const units = items.reduce((sum, item) => sum + item.quantity, 0);
    const dash = "—";

    const lines = [
        "QUOTE REQUEST",
        "",
        `Name: ${values.name}`,
        `Work email: ${values.email}`,
        `Company: ${values.company}`,
        `Phone: ${values.phone}`,
        "",
        `Occasion: ${values.occasion || dash}`,
        `Needs to land by: ${values.deliverBy || dash}`,
        `Delivery cities: ${values.cities || dash}`,
        `Logo branding: ${values.branding || dash}`,
        "",
        "PRODUCTS",
        ...items.map((item, index) =>
            `${index + 1}. ${item.name}${item.brand ? ` (${item.brand})` : ""} ${dash} `
            + `${item.quantity.toLocaleString("en-IN")} ${item.quantity === 1 ? "unit" : "units"}`
            + (item.price > 0 ? ` @ ${formatInr(item.price)} = ${formatInr(item.price * item.quantity)}` : ` ${dash} price on request`),
        ),
        "",
        `Total at listed prices: ${formatInr(total)}`,
        `Total items: ${units.toLocaleString("en-IN")}`,
        "",
        "Notes:",
        values.notes || dash,
    ];

    const subject = `Quote request ${dash} ${values.company} ${dash} ${items.length} ${items.length === 1 ? "product" : "products"}`;

    return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export function CartQuoteDialog({ items, isOpen, onClose }: CartQuoteDialogProps) {
    const apiRequest = useApiRequest();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [values, setValues] = useState<QuoteContactValues>(emptyQuoteValues);
    const [errors, setErrors] = useState<QuoteErrors>({});
    const [formError, setFormError] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [sentVia, setSentVia] = useState<"endpoint" | "email" | null>(null);

    const units = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (isOpen && !dialog.open) dialog.showModal();
        if (!isOpen && dialog.open) dialog.close();
    }, [isOpen]);

    function setField(field: keyof QuoteContactValues, value: string) {
        setValues((current) => ({ ...current, [field]: value }));
        setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
    }

    function handleClose() {
        // Reset only once the request is done, so a failed send keeps what was typed.
        if (sentVia) {
            setValues(emptyQuoteValues);
            setErrors({});
            setSentVia(null);
        }

        setFormError("");
        onClose();
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isSending) return;

        const nextErrors = validateQuoteRequest(values);

        setErrors(nextErrors);
        setFormError("");

        if (Object.keys(nextErrors).length > 0) return;

        if (items.length === 0) {
            setFormError("Your cart is empty - add a product first.");
            return;
        }

        setIsSending(true);

        try {
            const response = await apiRequest<QuoteResponse>("/api/quote-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contact: values,
                    cart: {
                        items: items.map((item) => ({
                            productId: item.productId,
                            name: item.name,
                            brand: item.brand,
                            sku: item.sku,
                            slug: item.slug,
                            quantity: item.quantity,
                            price: item.price,
                            mrp: item.mrp,
                        })),
                    },
                }),
            });

            if (response.delivered) {
                setSentVia("endpoint");
                return;
            }

            // No endpoint configured: hand the request to the visitor's mail app.
            window.location.href = buildMailto(values, items);
            setSentVia("email");
        } catch (sendError) {
            setFormError(
                sendError instanceof Error
                    ? sendError.message
                    : `That did not send. Email ${contactEmail} and we will pick it up from there.`,
            );
        } finally {
            setIsSending(false);
        }
    }

    function fieldError(field: keyof QuoteContactValues) {
        return errors[field] ? (
            <p className="q-field-error" id={`quote-${field}-error`} role="alert">
                {errors[field]}
            </p>
        ) : null;
    }

    function textField(field: keyof QuoteContactValues) {
        return {
            id: `quote-${field}`,
            value: values[field],
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                setField(field, event.target.value),
            "aria-invalid": Boolean(errors[field]),
            "aria-describedby": errors[field] ? `quote-${field}-error` : undefined,
        };
    }

    return (
        <dialog className="q-modal" ref={dialogRef} onClose={handleClose} aria-labelledby="quote-modal-title">
            <div className="q-card">
                <button className="q-close" type="button" onClick={handleClose} aria-label="Close quote request">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                </button>

                <div className="q-head">
                    <span className="q-kicker">Bulk pricing</span>
                    <h2 id="quote-modal-title">Request a quote</h2>
                    <p>
                        We price against your actual quantities. Tell us where it is going and who to reply to, and you
                        will have a written quote within one working day.
                    </p>
                </div>

                <div className="q-body">
                    {sentVia ? (
                        <div className="q-done">
                            <span className="q-done-ico" aria-hidden="true">
                                <svg viewBox="0 0 24 24">
                                    <path d="M5 12.5 10 17l9-10" />
                                </svg>
                            </span>
                            <h3>Quote request sent.</h3>
                            <p>
                                {sentVia === "email"
                                    ? "Your email app should have opened with the cart and your details filled in. Send it and we will reply within one working day."
                                    : "We have your cart and your details. Expect a written quote within one working day."}
                            </p>
                            <button className="btn btn-soft" type="button" onClick={handleClose}>
                                Back to cart
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="q-cart" aria-label="Products in this quote">
                                {items.map((item) => (
                                    <div className="q-cart-line" key={item.itemId ?? item.productId}>
                                        <span className="q-thumb" aria-hidden="true">
                                            {item.imageUrl ? (
                                                <img src={item.imageUrl} alt="" referrerPolicy="no-referrer" />
                                            ) : (
                                                <span>No image</span>
                                            )}
                                        </span>
                                        <span className="q-cart-text">
                                            {item.name}
                                            <small>
                                                {item.quantity.toLocaleString("en-IN")}{" "}
                                                {item.quantity === 1 ? "unit" : "units"}
                                            </small>
                                        </span>
                                        <b>{item.price > 0 ? formatInr(item.price * item.quantity) : "On request"}</b>
                                    </div>
                                ))}
                                <div className="q-cart-total">
                                    <span>
                                        {items.length} {items.length === 1 ? "product" : "products"} ·{" "}
                                        {units.toLocaleString("en-IN")} {units === 1 ? "item" : "items"}
                                    </span>
                                    <b>{formatInr(total)}</b>
                                </div>
                            </div>

                            <div className="q-grid">
                                <div className="q-field">
                                    <label htmlFor="quote-name">
                                        Your name <span className="q-req">*</span>
                                    </label>
                                    <input {...textField("name")} type="text" autoComplete="name" placeholder="Full name" />
                                    {fieldError("name")}
                                </div>

                                <div className="q-field">
                                    <label htmlFor="quote-email">
                                        Work email <span className="q-req">*</span>
                                    </label>
                                    <input {...textField("email")} type="email" autoComplete="email" placeholder="you@company.com" />
                                    {fieldError("email")}
                                </div>

                                <div className="q-field">
                                    <label htmlFor="quote-company">
                                        Company <span className="q-req">*</span>
                                    </label>
                                    <input {...textField("company")} type="text" autoComplete="organization" placeholder="Company name" />
                                    {fieldError("company")}
                                </div>

                                <div className="q-field">
                                    <label htmlFor="quote-phone">
                                        Phone <span className="q-req">*</span>
                                    </label>
                                    <input {...textField("phone")} type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile" />
                                    {fieldError("phone")}
                                </div>

                                <div className="q-field">
                                    <label htmlFor="quote-occasion">Occasion</label>
                                    <select {...textField("occasion")}>
                                        <option value="">Select an occasion</option>
                                        {quoteOccasions.map((occasion) => (
                                            <option key={occasion} value={occasion}>
                                                {occasion}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="q-field">
                                    <label htmlFor="quote-deliverBy">Needs to land by</label>
                                    <input {...textField("deliverBy")} type="date" />
                                </div>

                                <div className="q-field q-wide">
                                    <label htmlFor="quote-cities">Delivery cities</label>
                                    <input
                                        {...textField("cities")}
                                        type="text"
                                        placeholder="e.g. Mumbai, Bengaluru, Delhi NCR - or pan-India, individual addresses"
                                    />
                                </div>

                                <div className="q-field q-wide">
                                    <span className="q-group-label">Logo branding needed?</span>
                                    <div className="q-radio-row">
                                        {quoteBrandingOptions.map((option) => (
                                            <label className="q-radio" key={option}>
                                                <input
                                                    type="radio"
                                                    name="branding"
                                                    value={option}
                                                    checked={values.branding === option}
                                                    onChange={(event) => setField("branding", event.target.value)}
                                                />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="q-field q-wide">
                                    <label htmlFor="quote-notes">Anything else?</label>
                                    <textarea
                                        {...textField("notes")}
                                        placeholder="Packaging, budget ceiling, quantities that might change - anything that shapes the quote."
                                    />
                                    {fieldError("notes")}
                                </div>
                            </div>

                            {formError ? (
                                <p className="q-form-error" role="alert">
                                    {formError}
                                </p>
                            ) : null}

                            <div className="q-submit">
                                <button className="btn btn-primary" type="submit" disabled={isSending}>
                                    {isSending ? "Sending…" : "Send quote request →"}
                                </button>
                                <span className="q-note">
                                    We reply within one working day. Your cart is sent with this request; nothing is
                                    charged.
                                </span>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </dialog>
    );
}
