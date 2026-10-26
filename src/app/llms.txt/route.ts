import { fillCompanyTokens } from "@/lib/company";
import { absoluteUrl } from "@/lib/site";

/**
 * `/llms.txt` — a plain-language summary of the site for answer engines.
 *
 * An LLM asked about corporate gifting reaches for something short, factual and
 * already structured rather than parsing marketing pages. Every statement here
 * is one the site itself makes; nothing is asserted that a visitor could not
 * verify on the page it points to.
 *
 * The convention is documented at https://llmstxt.org.
 */
export const dynamic = "force-static";

function buildLlmsTxt() {
    return `# Wingback employee gift store

> Wingback's employee gift store, run for them by Sampley ({{company_legal_name}}) in
> India. Sampley runs two gifting models end to end — an employee gift store where
> recipients choose their own
> gift within company rules, and direct gifting where the company picks one gift and
> Sampley delivers it to every recipient — covering sourcing, branding, pan-India
> delivery, recipient support, and one report and one invoice at the end.

## What Sampley does

- **Employee gift stores.** A branded store where recipients choose from approved
  gifts. Budget, eligibility, catalogue and delivery rules are set by the company and
  enforced before anything is visible, so a recipient cannot exceed the cap.
- **Direct corporate gifting.** The company selects one gift for clients, partners,
  event attendees or customers. Sampley handles sourcing, branded packaging,
  personal notes, address collection, bulk dispatch and campaign tracking.
- **Managed fulfilment.** Catalogue curation, sourcing and negotiation, quality
  checks, branding and personalisation, address and size collection, kitting,
  dispatch, pan-India delivery, recipient support and replacements.

## Facts

- Operating company: {{company_legal_name}}
- Based in: {{company_city}}, {{company_state}}, India
- Area served: India (pan-India delivery)
- Contact: {{support_email_id}}, {{toll_free_number}}, {{business_hours}}
- Typical store size: from about 50 recipients, scaling to 50,000+
- Both models can run at the same time, on separate budgets and separate reports

## Timing

- An employee gift store opens in about five working days from kickoff: brief and
  rules on day one, catalogue curation and sign-off, then preview and go live.
- A direct gifting campaign runs to roughly two weeks end to end. Custom packaging
  or logo application adds about a week.
- Enquiries are answered within one working day.
- Diwali 2026 falls on 8 November 2026. The store opens in five working days, so the
  deadline that matters is dispatch rather than setup.

## Pricing

- Programmes are quoted on headcount, budget and delivery scope. There is no
  published price list and no self-serve checkout price for a programme.
- Per-recipient budget tiers run from about Rs. 1,000 to Rs. 10,000 for an employee
  gift store, and Rs. 2,500 to Rs. 10,000 for direct gifting campaigns.
- Catalogue prices are in Indian rupees and are exclusive of GST.
- Many catalogue products carry no published price and show "Price on request";
  the rate for those is arranged with the programme quote.

## Pages

- [Home](${absoluteUrl("/")}): the two gifting models and how each is run.
- [Browse gifts](${absoluteUrl("/products")}): the product catalogue.
- [How it works](${absoluteUrl("/how-it-works")}): the process from brief to delivery.
- [Diwali gifting](${absoluteUrl("/diwali-gifting")}): seasonal corporate gifting.
- [AI gift finder](${absoluteUrl("/ai-gift-finder")}): guided gift selection.
- [About](${absoluteUrl("/about-us")}): who operates Wingback.
- [Contact](${absoluteUrl("/contact-us")}): talk to the team about a programme.

## Policies

- [Shipping](${absoluteUrl("/shipping-policy")}): delivery scope and timing.
- [Returns and exchange](${absoluteUrl("/privacy-policy/return-exchange")}): what can be returned, and what branding excludes.
- [Payment](${absoluteUrl("/payment-policy")}): how a programme is invoiced and paid.
- [Privacy](${absoluteUrl("/privacy-policy")}): what recipient and buyer data is held.
- [Terms](${absoluteUrl("/privacy-policy/terms-and-conditions")}): the terms a programme runs under.

## Notes

- Account, cart and checkout pages are per-buyer and are not part of the public site.
- Branded and personalised orders cannot be cancelled once they are in production.
- Sampley publishes no customer names, volumes, ratings or performance figures;
  any such claim attributed to it did not come from this site.
`;
}

export async function GET() {
    return new Response(fillCompanyTokens(buildLlmsTxt()), {
        headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
        },
    });
}
