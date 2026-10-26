import { serializeJsonLd } from "@/utils/json-ld";
import { absoluteUrl } from "@/lib/site";
import { fillCompanyTokens } from "@/lib/company";

function buildJsonLd() {
  return {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: "Wingback by Sampley",
      legalName: "{{company_legal_name}}",
      url: absoluteUrl("/"),
      logo: absoluteUrl("/assets/wingback-logo-supplied.png"),
      email: "{{support_email_id}}",
      telephone: "{{toll_free_number}}",
      areaServed: { "@type": "Country", name: "India" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "{{company_city}}",
        addressRegion: "{{company_state}}",
        addressCountry: "IN",
      },
      description:
        "Wingback by Sampley helps companies run corporate gifting programs through branded gift stores, recipient choice, curated catalogues and managed pan-India fulfilment.",
    },
    {
      "@type": "AboutPage",
      "@id": absoluteUrl("/about-us#webpage"),
      url: absoluteUrl("/about-us"),
      name: "About Wingback by Sampley",
      isPartOf: {
        "@type": "WebSite",
        name: "Wingback",
        url: absoluteUrl("/"),
      },
      about: {
        "@id": absoluteUrl("/#organization"),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is behind Wingback?",
          acceptedAnswer: { "@type": "Answer", text: "Wingback is the corporate gifting platform from Sampley, operating as {{company_legal_name}} out of {{company_city}}, {{company_state}}. We work with HR, Admin, Sales and Marketing teams running gifting programs across India." },
        },
        {
          "@type": "Question",
          name: "Do you work with small companies?",
          acceptedAnswer: { "@type": "Answer", text: "Employee stores make sense from around 50 recipients upward. Below that the setup outweighs the benefit, and a curated one-off is usually the better answer — we will say so rather than sell you a store you don't need. Direct client campaigns run smaller; a 30-person CXO list is normal." },
        },
        {
          "@type": "Question",
          name: "How is this different from a normal gifting vendor?",
          acceptedAnswer: { "@type": "Answer", text: "A vendor sells you a gift. We run the program: recipients choose their own gift inside your rules, they enter their own addresses, and the sourcing, branding, quality checks, delivery, support and reporting sit with us instead of your inbox." },
        },
        {
          "@type": "Question",
          name: "Where do you deliver?",
          acceptedAnswer: { "@type": "Answer", text: "Pan-India, to individual doorsteps rather than in bulk to one office. Experience vouchers are the one category with thinner coverage outside major cities, so we flag which options are genuinely redeemable everywhere for distributed teams." },
        }
      ],
    },
    ],
  };
}

export function AboutUsJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: fillCompanyTokens(serializeJsonLd(buildJsonLd())) }}
    />
  );
}
