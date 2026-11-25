/**
 * Why people reach the contact page, and what to have ready. Every "Get a Bulk
 * Quote", "Quote", "Join Now" and "Forgot Password?" in the site leads here, so
 * each of those needs an entry.
 *
 * No reply times are promised: none has been confirmed.
 */
type ContactTopic = {
    id: string;
    title: string;
    body: string;
    ready: string[];
    link?: { href: string; label: string };
};

export const contactTopics: ContactTopic[] = [
    {
        id: "bulk-quotes",
        title: "Bulk quotes",
        body: "Pricing for a whole facility or a regular supply schedule.",
        ready: ["Your facility type and city", "Product names or links", "Quantity, and how often you need it"],
        link: { href: "/facility-maintenance", label: "Facility Maintenance" },
    },
    {
        id: "samples",
        title: "Samples & projects",
        body: "Architectural films, graphics and entrance matting for a project.",
        ready: ["Your firm and role", "Project type, city and stage", "Surfaces and rough areas"],
        link: { href: "/architectural-interiors", label: "Architectural & Interiors" },
    },
    {
        id: "dealers",
        title: "Become a dealer",
        body: "Sell AE India's range in your region.",
        ready: ["Your business name and city", "The area you cover", "The categories you sell today"],
    },
    {
        id: "orders",
        title: "Help with an order",
        body: "Delivery, a wrong or damaged item, or an invoice.",
        ready: ["Your order number", "The product concerned", "Photos, if something is damaged"],
        link: { href: "/account/orders", label: "Your orders" },
    },
    {
        id: "account",
        title: "Account & password",
        body: "Forgotten your password? You can sign in with a one-time code sent to your email instead.",
        ready: ["The email address on your account"],
        link: { href: "/auth/login", label: "Sign in with a code" },
    },
];
