/**
 * The answer-ready questions shown on the home page.
 *
 * One list, rendered as visible text and mirrored into the page's FAQPage
 * JSON-LD. Keeping both from the same array is what stops the structured data
 * from drifting into claiming answers the page does not actually show, which is
 * the thing search engines penalise.
 *
 * Every answer here restates something the site already commits to elsewhere —
 * the two models, the budget cap, the one-week store setup, the quote route for
 * a brief the catalogue does not cover. Nothing asserts a customer, a volume, a
 * rating or a performance figure.
 */
export type HomeAnswer = {
    question: string;
    answer: string;
};

export const homeAnswers: HomeAnswer[] = [
    {
        question: "What is Wingback?",
        answer:
            "Sampley is the corporate gifting platform behind the Wingback employee gift store. Companies use it to run employee gifting and client gifting from one place: you set the budget, the audience and the approved catalogue, and Sampley handles curation, sourcing, branding, delivery and reporting.",
    },
    {
        question: "How does an employee gift store work?",
        answer:
            "You get a branded employee gift store on your own rules. You define the occasion, the per-person budget, who is eligible and which categories are switched on. Recipients open a private link, browse only the approved gifts, pick one, and confirm their own size and delivery address. Nothing outside the budget is ever visible to them.",
    },
    {
        question: "Can recipients choose within a fixed budget?",
        answer:
            "Yes — that is the point of recipient-choice corporate gifting. The per-person cap is applied before the store opens, so recipients only ever see items priced inside it. Going over budget is not discouraged, it is impossible. A single store can also carry different budget tiers for different groups.",
    },
    {
        question: "How is direct corporate gifting different?",
        answer:
            "In direct corporate gifting you choose the gift instead of the recipient. It suits client gifting in India, partner and channel rewards, CXO gifting and event guests, where one well-presented gift matters more than choice. Each recipient still gets a private link to confirm their own delivery address, so your team never collects addresses by email.",
    },
    {
        question: "Does Wingback deliver across India?",
        answer:
            "Yes. Pan-India corporate gift delivery to individual doorstep addresses is the default, not an add-on. Recipients spread across many cities are handled the same way as a single office, and bulk delivery to one venue is supported where that suits the campaign better.",
    },
    {
        question: "What does Wingback manage?",
        answer:
            "Catalogue curation, vendor sourcing and negotiation, quality checks, logo branding and personalisation, address and size collection, kitting and packing, dispatch, delivery tracking, recipient support, and reporting at the end of the programme. Your team sets the rules and approves the shortlist.",
    },
    {
        question: "How long does a gifting store take to launch?",
        answer:
            "A branded employee gift store can open in about five working days from kickoff: brief and rules on day one, catalogue curation and your sign-off next, then preview and go live. A direct gifting campaign runs to roughly two weeks end to end. Custom packaging or logo application needs about a week on top.",
    },
    {
        question: "What happens when no catalogue gift fits the brief?",
        answer:
            "The catalogue is a starting point, not the limit. If nothing on it suits the occasion, the audience or the budget, send the brief across and it goes to sourcing as a quote instead — bulk corporate gifting in India often starts this way. You approve the shortlist before anything reaches a recipient.",
    },
];
