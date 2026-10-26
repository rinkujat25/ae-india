import { serializeJsonLd } from "@/utils/json-ld";
import { absoluteUrl } from "@/lib/site";
import { fillCompanyTokens } from "@/lib/company";

/**
 * The employee gift store page's structured data.
 *
 * An object rather than a string of escaped JSON, per the project rule: a
 * hand-maintained string cannot be type-checked, and every URL in it had to be
 * spelled out rather than derived. Built per render so `absoluteUrl` reads the
 * deployed host.
 *
 * `HowTo` mirrors GiftStoreTimelineSection stage for stage, and `FAQPage`
 * mirrors GiftStoreFaqSection question for question. Structured data that
 * describes something the page does not show is what costs a rich result.
 *
 * No `BreadcrumbList`: `Breadcrumbs` emits one from the trail it renders, and
 * two on a page is a conflict.
 */
function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: "Wingback by Sampley",
        url: absoluteUrl("/"),
        logo: absoluteUrl("/assets/wingback-logo-supplied.png"),
        email: "{{support_email_id}}",
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        legalName: "{{company_legal_name}}",
        telephone: "{{toll_free_number}}",
        address: {
          "@type": "PostalAddress",
          addressLocality: "{{company_city}}",
          addressRegion: "{{company_state}}",
          addressCountry: "IN",
        },
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: "Wingback",
        publisher: {
          "@id": absoluteUrl("/#organization"),
        },
        inLanguage: "en-IN",
      },
      {
        "@type": "WebPage",
        "@id": absoluteUrl("/employee-gift-store#webpage"),
        url: absoluteUrl("/employee-gift-store"),
        name: "Branded Employee Gift Store for Companies",
        description: "A branded Wingback store where employees, clients and partners choose approved gifts within your budget, with sourcing, branding, pan-India delivery and reporting managed for you.",
        inLanguage: "en-IN",
        isPartOf: {
          "@id": absoluteUrl("/#website"),
        },
        about: {
          "@id": absoluteUrl("/#organization"),
        },
      },
      {
        "@type": "Service",
        name: "Branded employee gift store",
        serviceType: "Corporate employee gifting store",
        provider: {
          "@type": "Organization",
          name: "Wingback by Sampley",
          url: absoluteUrl("/"),
        },
        areaServed: "India",
        audience: {
          "@type": "Audience",
          audienceType: "HR, Admin, Sales and Marketing teams",
        },
        description: "One branded store that runs every gifting occasion ÃÂ¢ÃÂÃÂ festivals, onboarding kits, milestones, rewards, client and partner gifting. The business sets budget, catalogue, eligibility and expiry rules before anything is visible; recipients choose within them and confirm their own variant and address; Wingback handles sourcing, branding, dispatch, support and reporting.",
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: "1000",
          highPrice: "10000",
          description: "Per-recipient budget tiers from Rs. 1,000 to Rs. 10,000.",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Gifting occasions run from the store",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Festivals & celebrations",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Onboarding kits",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Milestones & anniversaries",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Rewards & recognition",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Client & CXO gifting",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Partners, events & customers",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        name: "How to launch a branded employee gift store",
        description: "From kickoff to go-live in five working days: confirm the rules, curate the catalogue, preview the store, then share the link.",
        totalTime: "P5D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Kickoff",
            text: "Confirm audience, occasion, budget tiers, eligibility, branding and delivery scope.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Curate",
            text: "Shortlist vendors and products, check quality and pricing, and shape the approved catalogue.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Preview",
            text: "Review the branded store, packaging and personalization, then sign off the final selection.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Go live",
            text: "Share the gift link, watch selections come in, and hand fulfillment and tracking to Wingback.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Can one store run more than one budget tier?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. A single store can carry different per-person caps for different groups ÃÂ¢ÃÂÃÂ a festival tier for everyone, a higher tier for five-year milestones, another for client gifting. Each recipient only ever sees the catalogue priced for their own tier.",
            },
          },
          {
            "@type": "Question",
            name: "Can we add our logo and a personal note?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes ÃÂ¢ÃÂÃÂ branded packaging, logo application where the product allows it, and a personal message per recipient. Logo branding needs lead time, so it is agreed at setup rather than after selections come in.",
            },
          },
          {
            "@type": "Question",
            name: "What happens to the store between occasions?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It stays set up. The next occasion becomes a new program inside the same store with its own audience, budget and approved catalogue, so you are not rebuilding from a blank brief every festival.",
            },
          },
          {
            "@type": "Question",
            name: "Can employees see what others chose?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Each recipient sees only their own store, their own budget and their own selection. Aggregate numbers ÃÂ¢ÃÂÃÂ how many have picked, what categories are moving ÃÂ¢ÃÂÃÂ go to your team, never between recipients.",
            },
          },
          {
            "@type": "Question",
            name: "Can we change the catalogue after the store opens?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Items can be swapped in or out while the store is live, usually because something moves faster than expected. Anyone who has already confirmed a selection keeps it.",
            },
          },
        ],
      },
    ],
  };
}

export function GiftStoreJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: fillCompanyTokens(serializeJsonLd(buildJsonLd())) }}
    />
  );
}
