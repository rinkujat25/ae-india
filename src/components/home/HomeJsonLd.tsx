import { absoluteUrl } from "@/lib/site";
import { serializeJsonLd } from "@/utils/json-ld";
import { fillCompanyTokens } from "@/lib/company";

/**
 * The home page's structured data.
 *
 * URLs and `@id` anchors are built from the deployed host so the graph always
 * describes the same site the canonical points at — a graph anchored to another
 * domain describes a different entity and is ignored.
 *
 * The home page is a storefront and renders no FAQ, so this graph carries no
 * FAQPage node: structured data that is not in the rendered content is a
 * guidelines violation.
 */

export function HomeJsonLd() {
    const organizationId = absoluteUrl("/#organization");
    const websiteId = absoluteUrl("/#website");

    const graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": organizationId,
                name: "Sampley",
                url: absoluteUrl("/"),
                // The operator's own mark, not Wingback's -- this node is the
                // company running the store, not the company it belongs to.
                logo: absoluteUrl("/assets/sampley-logo.png"),
                email: "{{support_email_id}}",
                telephone: "{{toll_free_number}}",
                legalName: "{{company_legal_name}}",
                areaServed: { "@type": "Country", name: "India" },
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "{{company_city}}",
                    addressRegion: "{{company_state}}",
                    addressCountry: "IN",
                },
                // A reachable contact point is one of the few things an answer
                // engine can quote back verbatim, so it repeats the details the
                // footer already shows rather than introducing new ones.
                contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "sales",
                    email: "{{support_email_id}}",
                    telephone: "{{toll_free_number}}",
                    areaServed: "IN",
                    availableLanguage: ["en", "hi"],
                },
                // Names the subjects this organisation is an authority on, which
                // is what an engine matches a question against.
                knowsAbout: [
                    "Corporate gifting",
                    "Employee gifting programmes",
                    "Client and partner gifting",
                    "Branded merchandise and personalisation",
                    "Bulk gift sourcing and fulfilment in India",
                    "Diwali and festive corporate gifting",
                ],
                description:
                    "Sampley is the corporate gifting platform behind the Wingback store, running two models: branded employee stores where recipients choose within company rules, and direct corporate gifting for clients, partners and events — both with managed pan-India fulfilment.",
            },
            {
                "@type": "WebSite",
                "@id": websiteId,
                url: absoluteUrl("/"),
                name: "Wingback",
                publisher: { "@id": organizationId },
                inLanguage: "en-IN",
            },
            {
                "@type": "Service",
                "@id": absoluteUrl("/#employee-gifting"),
                name: "Corporate employee gifting stores",
                serviceType: "Employee gifting programme",
                provider: { "@id": organizationId },
                areaServed: { "@type": "Country", name: "India" },
                audience: { "@type": "Audience", audienceType: "HR and Admin teams" },
                description:
                    "A branded gifting store where employees choose from approved gifts within company-defined budget, eligibility, catalogue and delivery rules, while Sampley handles sourcing, personalisation, delivery and reporting.",
            },
            {
                "@type": "Service",
                "@id": absoluteUrl("/#direct-gifting"),
                name: "Direct corporate gifting",
                serviceType: "Corporate gifting campaign",
                provider: { "@id": organizationId },
                areaServed: { "@type": "Country", name: "India" },
                audience: { "@type": "Audience", audienceType: "Sales, Marketing and CXO offices" },
                description:
                    "Company-selected gifting for clients, partners, event attendees and customers, delivered through Sampley-managed sourcing, branded packaging, personal notes, bulk dispatch, campaign tracking and fulfilment reporting.",
            },
            {
                // Ties the page itself to the organisation and the site, so the
                // graph resolves as one entity instead of four loose nodes.
                "@type": "WebPage",
                "@id": absoluteUrl("/#webpage"),
                url: absoluteUrl("/"),
                name: "Corporate Gifting Platform for Employees | Wingback",
                isPartOf: { "@id": websiteId },
                about: { "@id": organizationId },
                inLanguage: "en-IN",
                primaryImageOfPage: absoluteUrl("/assets/wingback-logo-supplied.png"),
            },
        ],
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: fillCompanyTokens(serializeJsonLd(graph)) }} />;
}
