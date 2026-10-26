import { absoluteUrl } from "@/lib/site";

export type SitemapEntry = {
    path: string;
    priority?: number;
    changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    /** Left out unless the date is a real one. See `buildUrlSet`. */
    lastModified?: Date;
};

/**
 * The public, indexable static routes.
 *
 * Every entry here must be a page that also tells crawlers it may be indexed.
 * A sitemap entry is an invitation and `robots: { index: false }` is a refusal,
 * so listing a no-index page sends both at once and Google resolves it by
 * trusting neither.
 *
 * Account, cart, checkout and auth are absent, and stay no-index: they are
 * disallowed in robots.txt, they are a signed-in buyer's own pages, and
 * `/checkout/order-success` would put an order reference in a search result.
 *
 * `/category` is absent because it is a redirect to `/products`. A redirect
 * never renders metadata, so there is no page there to index either way.
 */
export const staticRoutes: SitemapEntry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/products", priority: 0.9, changeFrequency: "daily" },
    { path: "/diwali-gifting", priority: 0.7, changeFrequency: "monthly" },
    { path: "/how-it-works", priority: 0.6, changeFrequency: "monthly" },
    { path: "/about-us", priority: 0.6, changeFrequency: "monthly" },
    { path: "/ai-gift-finder", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact-us", priority: 0.5, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy-policy/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy-policy/return-exchange", priority: 0.3, changeFrequency: "yearly" },
    { path: "/shipping-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/payment-policy", priority: 0.3, changeFrequency: "yearly" },
];

/** The child sitemaps the index points at, in the order it lists them. */
export const sitemapChildren = ["/sitemaps/pages.xml", "/sitemaps/categories.xml", "/sitemaps/products.xml"];

/**
 * A URL can carry characters that are not legal in XML character data — an `&`
 * in a query string is the common one — and the catalogue supplies its slugs, so
 * nothing here can be assumed clean.
 */
function escapeXml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

/**
 * `lastmod` is written only for entries that carry a real date.
 *
 * The provider exposes no modification time for a product, so the alternative
 * would be stamping every URL with the moment the sitemap was regenerated —
 * claiming the whole catalogue changed on a schedule. Google learns to distrust
 * a `lastmod` that behaves like a clock, and then ignores it where it is true.
 * Omitting it says nothing, which is the honest answer.
 */
export function buildUrlSet(entries: SitemapEntry[]): string {
    const urls = entries
        .map((entry) => {
            const parts = [`    <loc>${escapeXml(absoluteUrl(entry.path))}</loc>`];

            if (entry.lastModified) parts.push(`    <lastmod>${entry.lastModified.toISOString()}</lastmod>`);
            if (entry.changeFrequency) parts.push(`    <changefreq>${entry.changeFrequency}</changefreq>`);
            if (entry.priority !== undefined) parts.push(`    <priority>${entry.priority}</priority>`);

            return `  <url>\n${parts.join("\n")}\n  </url>`;
        })
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function buildSitemapIndex(paths: string[]): string {
    const sitemaps = paths
        .map((path) => `  <sitemap>\n    <loc>${escapeXml(absoluteUrl(path))}</loc>\n  </sitemap>`)
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps}\n</sitemapindex>\n`;
}

export function xmlResponse(body: string, maxAgeSeconds: number): Response {
    return new Response(body, {
        headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": `public, max-age=${maxAgeSeconds}`,
        },
    });
}
