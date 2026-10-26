/**
 * One set of quote-request rules, used by both the form and the route handler.
 * The client copy gives instant feedback; the server copy is the authoritative
 * one, since anything in the browser can be bypassed.
 */

import { normaliseMobile } from "@/utils/signup-validation";

export { normaliseMobile };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobilePattern = /^[6-9]\d{9}$/;

export const quoteNotesMaxLength = 2000;

export type QuoteContactValues = {
    name: string;
    email: string;
    company: string;
    phone: string;
    occasion: string;
    deliverBy: string;
    cities: string;
    branding: string;
    notes: string;
};

export type QuoteErrors = Partial<Record<keyof QuoteContactValues, string>>;

export const emptyQuoteValues: QuoteContactValues = {
    name: "",
    email: "",
    company: "",
    phone: "",
    occasion: "",
    deliverBy: "",
    cities: "",
    branding: "Yes",
    notes: "",
};

export const quoteOccasions = [
    "Diwali / festival gifting",
    "Onboarding & welcome kits",
    "Birthdays & work anniversaries",
    "Rewards & recognition",
    "Client or CXO gifting",
    "Partner or channel gifting",
    "Event or conference gifting",
    "Customer campaign",
    "Something else",
];

export const quoteBrandingOptions = ["Yes", "No", "Not sure yet"];

export function validateQuoteRequest(values: QuoteContactValues): QuoteErrors {
    const errors: QuoteErrors = {};

    if (!values.name.trim()) errors.name = "Your name is required.";

    const email = values.email.trim();

    if (!email) {
        errors.email = "A work email is required.";
    } else if (!emailPattern.test(email)) {
        errors.email = "Enter a valid email address.";
    }

    if (!values.company.trim()) errors.company = "Company is required.";

    const phone = normaliseMobile(values.phone.trim());

    if (!phone) {
        errors.phone = "A phone number is required.";
    } else if (!mobilePattern.test(phone)) {
        errors.phone = "Enter a 10-digit Indian mobile number.";
    }

    if (values.notes.length > quoteNotesMaxLength) {
        errors.notes = `Keep notes under ${quoteNotesMaxLength} characters.`;
    }

    return errors;
}
