import { serializeJsonLd } from "@/utils/json-ld";
import { absoluteUrl } from "@/lib/site";
import { fillCompanyTokens } from "@/lib/company";

/**
 * The direct gifting page's structured data.
 *
 * An object rather than a string of escaped JSON, per the project rule, so the
 * URLs come from `absoluteUrl` instead of being spelled out.
 *
 * `HowTo` mirrors DirectGiftingTimelineSection stage for stage and `FAQPage`
 * mirrors DirectGiftingFaqSection question for question. The `Service` node
 * carries the budget range the tiers section shows and the audiences the page
 * lists; it described neither before, while the employee store's did both.
 *
 * No `BreadcrumbList`: `Breadcrumbs` emits one from the trail it renders.
 */
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
        areaServed: {
          "@type": "Country",
          name: "India",
        },
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
        "@id": absoluteUrl("/direct-gifting#webpage"),
        url: absoluteUrl("/direct-gifting"),
        name: "Client & Partner Corporate Gift Campaigns",
        description: "Direct corporate gifting run end to end: you approve one gift, Wingback collects every recipient's address, brands and packs it, and delivers individually across India.",
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
        name: "Direct corporate gifting campaigns",
        provider: {
          "@type": "Organization",
          name: "Wingback by Sampley",
          url: absoluteUrl("/"),
        },
        areaServed: "India",
        audience: {
          "@type": "Audience",
          audienceType: "Sales, Marketing, CXO offices and Admin teams",
        },
        description: "Company-selected gifting for clients, CXOs, channel partners, event attendees and customers. Wingback collects delivery addresses through private gift links, brands and packs each gift, dispatches pan-India and reports on the campaign.",
        serviceType: "Direct corporate gift campaigns",
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: "2500",
          highPrice: "10000",
          description: "Per-recipient budget tiers from Rs. 2,500 to Rs. 10,000.",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Campaigns run as direct gifting",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Client gifting",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "CXO & executive",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Partners & channel",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Events & conferences",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Customer campaigns",
              },
            },
          ],
        },
      },
      {
        "@type": "HowTo",
        name: "How to run a direct corporate gifting campaign",
        description: "Roughly two weeks end to end: brief and shortlist, approve and brand, collect addresses, then dispatch and report.",
        totalTime: "P16D",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Brief & shortlist",
            text: "Audience, headcount, budget and tone. We come back with a shortlist. Days 1-3.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Approve & brand",
            text: "You pick the gift and sign off packaging, branding and the note. Days 4-6.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Links go out",
            text: "Each recipient confirms their address. Reminders chase whoever hasn't. Days 7-12.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Dispatch & report",
            text: "Packed, checked and shipped individually, then one campaign report. Days 10-16.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "We don't have our clients' addresses. Is that a problem?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No Ã¢ÂÂ that is the normal starting point, and it is what gift links are for. A name and a work email is enough. Each recipient gets a private link on your branding and enters their own address, so nobody on your team has to ask a client where they live.",
            },
          },
          {
            "@type": "Question",
            name: "Why do you recommend non-food gifts for clients?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You rarely know a client's dietary rules or allergies, and a food gift that lands wrong is worse than no gift. Non-food also travels better and has no shelf life. We run gourmet campaigns happily Ã¢ÂÂ we just flag the risk on senior or unfamiliar lists.",
            },
          },
          {
            "@type": "Question",
            name: "Can different recipients get different gifts in one campaign?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Tiered values are common on partner campaigns Ã¢ÂÂ top dealers at one value, the rest at another Ã¢ÂÂ running as one campaign with one report. A named list can also be given a choice of two or three gifts.",
            },
          },
          {
            "@type": "Question",
            name: "Can you deliver to an event venue instead?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Bulk delivery to a venue for on-site handout is supported, as is shipping to each attendee afterwards from a registration list. Post-event shipping usually gets a warmer reception, since nobody wants to carry a box home from a conference.",
            },
          },
          {
            "@type": "Question",
            name: "How much branding should a client gift carry?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "That is set per campaign. Partner and event gifting usually carries clear branding; CXO gifting usually does not, beyond the packaging and the note. We will advise, but it is your call and it is decided before production.",
            },
          },
        ],
      },
    ],
  };
}

export function DirectGiftingJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: fillCompanyTokens(serializeJsonLd(buildJsonLd())) }}
    />
  );
}
