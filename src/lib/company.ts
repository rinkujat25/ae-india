/**
 * The company's own details, in one place.
 *
 * These were repeated across the footer, the policies, the contact page and
 * four JSON-LD blocks, which is how the structured data
 * ended up claiming an address the business did not have. Everything
 * reads them from here now, so a change lands everywhere at once.
 *
 * Server-side variables, not `NEXT_PUBLIC_*`: every caller is a Server
 * Component, a route handler or a metadata export, and a `NEXT_PUBLIC_` value
 * is inlined at build time — which for the Docker image means inlining nothing,
 * because the build stage has no environment.
 *
 * The defaults exist for the same reason. The static pages are prerendered in
 * that environment-free build, so without them the policies and the contact
 * page would ship blank where a phone number should be. These are public
 * business details printed on the site, not secrets, so carrying them in the
 * source is safe — unlike the provider credentials, which have no defaults and
 * must come from the environment.
 */

import { getSiteUrl } from "@/lib/site";

type CompanyDetails = {
    name: string;
    legalName: string;
    tollFreeNumber: string;
    /** `tel:` form: no spaces, country code included. */
    telHref: string;
    /** Printed form, grouped for reading. */
    phoneDisplay: string;
    supportEmail: string;
    /** Digits only, country code included. Empty hides the floating button. */
    whatsappNumber: string;
    /** wa.me link, empty when no number is set. */
    whatsappHref: string;
    businessHours: string;
    gstin: string;
    address: string;
    /** The address split for schema.org's PostalAddress. */
    postalAddress: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
    };
};

function read(name: string, fallback: string) {
    return process.env[name]?.trim() || fallback;
}

/** Ten digits, +91 prefixed, with no spaces — what `tel:` needs. */
function toTelHref(number: string) {
    const digits = number.replace(/\D/g, "");

    if (!digits) return "";

    return digits.startsWith("91") && digits.length > 10 ? `+${digits}` : `+91${digits}`;
}

/** 7357603299 -> +91 73576 03299, the grouping the design prints. */
function toPhoneDisplay(number: string) {
    const digits = number.replace(/\D/g, "").replace(/^91/, "");

    if (digits.length !== 10) return number;

    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

export function getCompany(): CompanyDetails {
    const tollFreeNumber = read("COMPANY_TOLL_FREE_NUMBER", "7357603299");
    // Unset falls back to the published number, which the contact page already
    // offers for WhatsApp. Set explicitly to blank -- the variable present with
    // no value -- to take the button off the site; that is why this reads
    // process.env directly rather than going through `read`, which cannot tell
    // "absent" from "deliberately empty".
    const configuredWhatsapp = process.env.COMPANY_WHATSAPP_NUMBER;
    const whatsappSource = configuredWhatsapp === undefined ? tollFreeNumber : configuredWhatsapp;
    const whatsappDigits = whatsappSource.replace(/\D/g, "");
    const whatsappNumber = whatsappDigits
        ? (whatsappDigits.length > 10 && whatsappDigits.startsWith("91")
              ? whatsappDigits
              : `91${whatsappDigits}`)
        : "";

    return {
        name: read("COMPANY_NAME", "AE India"),
        legalName: read("COMPANY_LEGAL_NAME", "Amit Enterprises"),
        tollFreeNumber,
        telHref: toTelHref(tollFreeNumber),
        phoneDisplay: toPhoneDisplay(tollFreeNumber),
        // No default: the design gives no email address for AE India, and printing
        // another company's would send its customers to the wrong inbox. Every
        // caller hides the email when this is empty.
        supportEmail: read("COMPANY_SUPPORT_EMAIL", ""),
        whatsappNumber,
        whatsappHref: whatsappNumber ? `https://wa.me/${whatsappNumber}` : "",
        businessHours: read("COMPANY_BUSINESS_HOURS", "24/7 phone support"),
        // No default for the same reason: AE India's GSTIN has not been supplied.
        gstin: read("COMPANY_GSTIN", ""),
        address: read(
            "COMPANY_ADDRESS",
            "RZ D 6/3, Street No. 6, Dadadev Mandir Road, Palam Village, New Delhi 110077",
        ),
        postalAddress: {
            streetAddress: read(
                "COMPANY_STREET_ADDRESS",
                "RZ D 6/3, Street No. 6, Dadadev Mandir Road, Palam Village",
            ),
            addressLocality: read("COMPANY_CITY", "New Delhi"),
            addressRegion: read("COMPANY_STATE", "Delhi"),
            postalCode: read("COMPANY_POSTAL_CODE", "110077"),
            addressCountry: read("COMPANY_COUNTRY", "IN"),
        },
    };
}

/**
 * Substitutes `{{token}}` placeholders in a block of content.
 *
 * The JSON-LD graphs and the migrated HTML sections are all
 * single large strings. Interpolating a dozen values into each one would mean
 * unpicking the string; a token pass keeps the content readable and leaves one
 * list of names to learn.
 *
 * Unknown tokens are left untouched, so a typo shows up in the page as itself
 * rather than silently becoming an empty string.
 */
export function fillCompanyTokens(content: string): string {
    const company = getCompany();

    const tokens: Record<string, string> = {
        // Not a company fact, but this is the one substitution pass the JSON-LD
        // graphs run through, and every absolute URL in them needs
        // the deployed origin rather than a host written into the source.
        site_url: getSiteUrl(),
        company_name: company.name,
        company_legal_name: company.legalName,
        toll_free_number: company.phoneDisplay,
        toll_free_number_href: company.telHref,
        support_email_id: company.supportEmail,
        whatsapp_number: company.whatsappNumber,
        whatsapp_href: company.whatsappHref,
        business_hours: company.businessHours,
        company_gstin: company.gstin,
        company_address: company.address,
        company_city: company.postalAddress.addressLocality,
        company_state: company.postalAddress.addressRegion,
        company_street_address: company.postalAddress.streetAddress,
        company_postal_code: company.postalAddress.postalCode,
        company_country: company.postalAddress.addressCountry,
    };

    return content.replace(/\{\{(\w+)\}\}/g, (match, name: string) =>
        name in tokens ? tokens[name] : match,
    );
}
