import { homeAnswers } from "@/constants/homeAnswers";
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
 * Every answer below is also visible on the page in `FaqSection`; structured
 * data that is not in the rendered content is a guidelines violation.
 */
const faqs = [
    {
        question: "Which model should we use?",
        answer:
            "Employees pick better than you can pick for them, so employee gifting runs as a store. Clients, partners and CXO offices usually want one well-presented gift, so those run direct. Most companies end up running both.",
    },
    {
        question: "What is the minimum number of recipients?",
        answer:
            "Around 50 upward for a store, scaling to 50,000+. Below that, a curated one-off usually makes more sense than a store.",
    },
    {
        question: "Can we cap the budget so nobody overspends?",
        answer:
            "The cap is enforced before anything is visible. Recipients only see items inside their budget, so going over is impossible rather than discouraged.",
    },
    {
        question: "Can we run both models at the same time?",
        answer:
            "Yes, and most companies do. Employees run as a choice store and clients as a direct campaign, on separate budgets and often separate cost centres, with separate reports so finance can split them cleanly. One point of contact covers both.",
    },
    {
        question: "What does Wingback actually handle?",
        answer:
            "Everything with a vendor, a courier or a deadline in it: catalogue curation, sourcing and negotiation, quality checks, branding and personalisation, address and size collection, kitting, dispatch, pan-India delivery, recipient support, replacements, and one report and one invoice at the end.",
    },
];

export function HomeJsonLd() {
    const organizationId = absoluteUrl("/#organization");
    const websiteId = absoluteUrl("/#website");

    const graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": organizationId,
                name: "Wingback by Sampley",
                url: absoluteUrl("/"),
                logo: absoluteUrl("/assets/wingback-logo-supplied.png"),
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
                    "Wingback is a corporate gifting platform running two models: branded employee stores where recipients choose within company rules, and direct corporate gifting for clients, partners and events — both with managed pan-India fulfilment.",
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
                    "A branded gifting store where employees choose from approved gifts within company-defined budget, eligibility, catalogue and delivery rules, while Wingback handles sourcing, personalisation, delivery and reporting.",
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
                    "Company-selected gifting for clients, partners, event attendees and customers, delivered through Wingback-managed sourcing, branded packaging, personal notes, bulk dispatch, campaign tracking and fulfilment reporting.",
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
            {
                "@type": "FAQPage",
                "@id": absoluteUrl("/#faq"),
                isPartOf: { "@id": absoluteUrl("/#webpage") },
                // Both blocks of questions the page actually renders: the
                // answer-ready section and the FAQ accordion. Nothing is listed
                // here that a reader cannot find on the page.
                mainEntity: [...homeAnswers, ...faqs].map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: { "@type": "Answer", text: faq.answer },
                })),
            },
        ],
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: fillCompanyTokens(serializeJsonLd(graph)) }} />;
}
