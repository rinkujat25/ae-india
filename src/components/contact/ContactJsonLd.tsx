import { storeName, storeOwner } from "@/constants/brand";
import { getCompany } from "@/lib/company";
import { absoluteUrl } from "@/lib/site";
import { serializeJsonLd } from "@/utils/json-ld";

/** The page as a `ContactPage` of the home graph's organisation; empty facts are left out. */
export function ContactJsonLd({ title, description }: { title: string; description: string }) {
    const company = getCompany();
    const organizationId = absoluteUrl("/#organization");
    const reach = {
        ...(company.telHref ? { telephone: company.telHref } : {}),
        ...(company.supportEmail ? { email: company.supportEmail } : {}),
    };
    const graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": organizationId,
                name: storeName,
                legalName: company.legalName || storeOwner,
                url: absoluteUrl("/"),
                ...reach,
                address: { "@type": "PostalAddress", ...company.postalAddress },
                contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer support",
                    ...reach,
                    areaServed: "IN",
                    availableLanguage: ["en", "hi"],
                },
            },
            {
                "@type": "ContactPage",
                "@id": absoluteUrl("/contact-us#webpage"),
                url: absoluteUrl("/contact-us"),
                name: title,
                description,
                inLanguage: "en-IN",
                about: { "@id": organizationId },
            },
        ],
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }} />;
}
