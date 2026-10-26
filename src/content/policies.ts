/**
 * The policy documents.
 *
 * These are working drafts written against how the platform actually operates —
 * corporate gifting by {{company_legal_name}}, quoted in rupees inclusive of GST,
 * delivered pan-India. They are **not legal advice and have not been reviewed by
 * a lawyer**: have counsel check them before treating them as binding, and keep
 * `updated` honest when the wording changes.
 */

export type PolicySection = {
    heading: string;
    paragraphs?: string[];
    points?: string[];
};

export type PolicyDocument = {
    href: string;
    title: string;
    /** Used for the page title and meta description. */
    metaTitle: string;
    metaDescription: string;
    intro: string;
    updated: string;
    sections: PolicySection[];
};

const updated = "19 September 2026";

export const privacyPolicy: PolicyDocument = {
    href: "/privacy-policy",
    title: "Privacy Policy",
    metaTitle: "Privacy Policy | Wingback",
    metaDescription:
        "How Sampley collects, uses and protects the personal information of buyers and gift recipients.",
    intro:
        "This policy explains what we collect when you use the Wingback gift store, why we collect it, who we share it with, and the choices you have.",
    updated,
    sections: [
        {
            heading: "Who we are",
            paragraphs: [
                "The Wingback gift store is operated by {{company_legal_name}}, registered in India and based in {{company_city}}, {{company_state}}. Where this policy says we or us, it means {{company_legal_name}}.",
                "We run corporate gifting programmes. That means we usually hold data about two groups: the people who buy from us, and the recipients a buyer asks us to deliver to.",
            ],
        },
        {
            heading: "What we collect",
            points: [
                "Account details you give us: name, work email, mobile number and company name.",
                "Billing and delivery addresses, including GSTIN where you add one for invoicing.",
                "Order information: what you ordered, quantities, prices, payment mode and delivery status.",
                "Recipient details a buyer supplies or a recipient enters themselves, such as name, address, contact number and any size or preference needed to fulfil the gift.",
                "Messages you send us, including quote requests and support enquiries.",
                "Basic technical information your browser sends, such as pages visited, so the site works and we can fix faults.",
            ],
        },
        {
            heading: "Why we use it",
            points: [
                "To take, price, fulfil and deliver orders, and to handle replacements.",
                "To operate your account, including signing you in and showing your orders and addresses.",
                "To issue invoices and meet tax and accounting obligations.",
                "To answer quote requests and support enquiries.",
                "To keep the service secure and to investigate misuse.",
            ],
            paragraphs: [
                "We do not sell personal information, and we do not use recipient details for our own marketing.",
            ],
        },
        {
            heading: "Who we share it with",
            paragraphs: [
                "We share only what is needed to complete the work you have asked for:",
            ],
            points: [
                "Couriers and logistics partners, who need the delivery address and contact number.",
                "Suppliers and branding partners, who need the quantities and personalisation details for an order.",
                "Payment and invoicing providers, where an order is paid through them.",
                "Our technology providers, who host and operate the platform on our behalf.",
                "Authorities, where the law requires it.",
            ],
        },
        {
            heading: "Storing your information",
            paragraphs: [
                "Order, invoice and tax records are kept for as long as Indian tax and company law requires. Account details are kept while your account is open. Recipient details are kept for the life of the programme they belong to, plus the period needed to handle replacements and disputes.",
                "Session tokens are stored in your browser as httpOnly cookies, which means the pages you visit cannot read them. Your cart and recently viewed products are stored in your own browser and never leave it until you place an order.",
            ],
        },
        {
            heading: "Your choices",
            paragraphs: [
                "You can ask us for a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it where we are not required to keep it. Write to {{support_email_id}} and we will respond within a reasonable period.",
                "If you are a gift recipient and would rather we did not hold your address after delivery, tell us and we will remove it once the delivery and any replacement window has closed.",
            ],
        },
        {
            heading: "Changes to this policy",
            paragraphs: [
                "We update this page when our practices change. The date at the top shows when it was last reviewed.",
            ],
        },
    ],
};

export const termsAndConditions: PolicyDocument = {
    href: "/privacy-policy/terms-and-conditions",
    title: "Terms and Conditions",
    metaTitle: "Terms and Conditions | Wingback",
    metaDescription:
        "The terms that apply when you order corporate gifts through the Wingback gift store, operated by Sampley, including quotes, pricing, delivery and liability.",
    intro:
        "These terms apply when you use the Wingback gift store or place an order with us. By placing an order you accept them.",
    updated,
    sections: [
        {
            heading: "Who can order",
            paragraphs: [
                "The Wingback gift store is for businesses. You may place an order if you are authorised to buy on behalf of your organisation and the details you give us are accurate.",
            ],
        },
        {
            heading: "Quotes and orders",
            paragraphs: [
                "Listed prices apply to the quantities shown on the site. For bulk quantities we issue a written quote, and the quote governs that order.",
                "An order is confirmed when we accept it. Until then we may decline an order, for example where stock, branding or a delivery location cannot be met.",
                "Some products are available on back order. Those are accepted at one unit per order and are fulfilled when stock arrives.",
            ],
        },
        {
            heading: "Pricing, tax and invoicing",
            points: [
                "Prices are in Indian rupees and are shown inclusive of GST unless a quote says otherwise.",
                "Shipping, branding and any payment charges are confirmed at checkout or in the written quote.",
                "We issue a GST invoice against the billing entity and GSTIN you provide. Please make sure they are correct before you order; a wrong GSTIN cannot always be corrected after invoicing.",
            ],
        },
        {
            heading: "Delivery",
            paragraphs: [
                "Delivery timelines are estimates and are confirmed per order. Where an order ships to many recipients, the schedule is agreed in writing before dispatch. See our Shipping Policy for detail.",
            ],
        },
        {
            heading: "Cancellation",
            paragraphs: [
                "You can cancel an order before it enters production or dispatch. Once a gift has been branded, personalised or kitted for your programme, it cannot be cancelled, because it cannot be resold.",
            ],
        },
        {
            heading: "Branding and intellectual property",
            paragraphs: [
                "When you ask us to brand a gift, you confirm you have the right to use the logo and artwork you send, and you allow us to use them for that order. Everything on this site other than your own artwork belongs to us or our suppliers.",
            ],
        },
        {
            heading: "Our responsibility",
            paragraphs: [
                "We take care to source, check and deliver what you ordered. Where something goes wrong that is our fault, our liability for an order is limited to the amount paid for that order.",
                "We are not responsible for delays outside our control, such as courier disruption, strikes or acts of government.",
            ],
        },
        {
            heading: "Governing law",
            paragraphs: [
                "These terms are governed by the laws of India, and the courts of {{company_city}}, {{company_state}} have exclusive jurisdiction.",
            ],
        },
    ],
};

export const returnExchange: PolicyDocument = {
    href: "/privacy-policy/return-exchange",
    title: "Return and Exchange Policy",
    metaTitle: "Return and Exchange Policy | Wingback",
    metaDescription:
        "When corporate gift orders can be returned or exchanged with Sampley, how to report a problem, and what is not covered.",
    intro:
        "Corporate gifting is made to order, so returns work differently from retail. This page sets out what we will replace and how to tell us.",
    updated,
    sections: [
        {
            heading: "What we will replace",
            points: [
                "Items that arrive damaged or defective.",
                "The wrong item, or the wrong quantity, against your confirmed order.",
                "Branding that does not match the artwork you approved.",
            ],
            paragraphs: [
                "We replace these at our cost. Where a replacement is not possible, we refund the affected items.",
            ],
        },
        {
            heading: "Telling us",
            paragraphs: [
                "Report the problem within 7 days of delivery, at {{support_email_id}}, with the order number and photographs of the item and its packaging. Photographs let us raise the claim with the supplier or courier, which is usually what makes a replacement quick.",
            ],
        },
        {
            heading: "What is not covered",
            points: [
                "Change of mind once an order has been branded, personalised or kitted for your programme.",
                "Gifts refused or left uncollected by a recipient, where delivery was attempted at the address given.",
                "Wrong or incomplete recipient addresses supplied to us.",
                "Normal variation in natural materials, handmade items and food products.",
            ],
        },
        {
            heading: "Refunds",
            paragraphs: [
                "Approved refunds go back to the original payment method, or against the invoice where the order was paid on account. We start the refund once the return is received or the claim is accepted, and the time it takes to appear depends on your bank or payment provider.",
            ],
        },
        {
            heading: "Recipient-level issues",
            paragraphs: [
                "On programmes where recipients choose their own gift, a recipient can raise a problem with us directly and we handle it without putting it back on your admin team. The buying company is told what was replaced and why.",
            ],
        },
    ],
};

export const shippingPolicy: PolicyDocument = {
    href: "/shipping-policy",
    title: "Shipping Policy",
    metaTitle: "Shipping Policy | Wingback",
    metaDescription:
        "How Sampley dispatches and delivers corporate gifts across India, including lead times, tracking and multi-address orders.",
    intro:
        "How we get gifts from a confirmed order to the people they are meant for, anywhere in India.",
    updated,
    sections: [
        {
            heading: "Where we deliver",
            paragraphs: [
                "We deliver across India, to a single office or to individual recipient addresses. We do not ship outside India today.",
            ],
        },
        {
            heading: "Lead times",
            paragraphs: [
                "Dispatch lead time depends on stock, branding and kitting, and is confirmed for each order at checkout or in your written quote rather than promised as a blanket number.",
                "Branded and personalised orders take longer than stock items, because production happens after artwork approval. Festive periods run longer again; for Diwali programmes we ask for the brief well before the date.",
            ],
        },
        {
            heading: "Multi-address programmes",
            paragraphs: [
                "Where an order goes to many recipients, we collect addresses, sizes and preferences, kit each parcel to its recipient and dispatch on an agreed schedule. You get one report of what went where.",
            ],
        },
        {
            heading: "Tracking and failed deliveries",
            paragraphs: [
                "Tracking is shared once a consignment is dispatched. If a courier cannot deliver, they will normally reattempt. Where an address turns out to be wrong or incomplete, we come back to you for a correction, and any re-dispatch cost is quoted before we send it again.",
            ],
        },
        {
            heading: "Shipping charges",
            paragraphs: [
                "Any shipping charge is shown at checkout or stated in your quote before you confirm. Nothing is added after an order is placed.",
            ],
        },
    ],
};

export const paymentPolicy: PolicyDocument = {
    href: "/payment-policy",
    title: "Payment Policy",
    metaTitle: "Payment Policy | Wingback",
    metaDescription:
        "How payment works for corporate gift orders through the Wingback gift store, operated by Sampley, including accepted modes, GST invoicing and refunds.",
    intro: "How payment works, what we accept, and how invoicing and refunds are handled.",
    updated,
    sections: [
        {
            heading: "How to pay",
            paragraphs: [
                "Cash on Delivery is the payment mode available at checkout today. Online payment is being added; until it is live, an order placed on the site is confirmed as Cash on Delivery.",
                "Bulk and programme orders are usually invoiced against a written quote and paid by bank transfer on the agreed terms.",
            ],
        },
        {
            heading: "Prices and tax",
            points: [
                "Prices are in Indian rupees.",
                "Listed prices include GST unless a quote states otherwise.",
                "Shipping, branding and any payment charges are shown before you confirm.",
            ],
        },
        {
            heading: "Invoicing",
            paragraphs: [
                "We raise a GST invoice against the billing entity and GSTIN on your order. Check both before confirming: the invoice follows what was on the order, and a wrong GSTIN cannot always be corrected afterwards.",
            ],
        },
        {
            heading: "Refunds",
            paragraphs: [
                "Where a refund is due under our Return and Exchange Policy, it goes back to the original payment method, or is settled against the invoice for orders paid on account. How long it takes to appear depends on your bank or payment provider.",
            ],
        },
        {
            heading: "Security",
            paragraphs: [
                "We do not store card details. Where an order is paid online, the payment is handled by the payment provider on their own systems.",
            ],
        },
    ],
};

export const policies = [privacyPolicy, termsAndConditions, returnExchange, shippingPolicy, paymentPolicy];

/**
 * The breadcrumb trail for a policy, derived from its own URL.
 *
 * `/privacy-policy/terms-and-conditions` sits under `/privacy-policy`, so the
 * trail says so rather than jumping straight from Home. Deriving it from the
 * href means the trail cannot disagree with the address bar.
 */
export function policyTrail(policy: PolicyDocument) {
    const parents = policies
        .filter((candidate) => policy.href.startsWith(`${candidate.href}/`))
        .map((candidate) => ({ label: candidate.title, href: candidate.href }));

    return [...parents, { label: policy.title }];
}

/** Title and link for each policy, used for the cross-links in the sidebar. */
export const policyIndex = policies.map((policy) => ({ href: policy.href, title: policy.title }));
