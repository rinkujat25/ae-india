import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Paths that must never be crawled: a signed-in buyer's own pages, the checkout
 * flow, and the route handlers. None of them are useful in search, and the
 * order-success page would leak an order reference into an index.
 */
const privatePaths = ["/api/", "/account", "/account/", "/cart", "/checkout", "/checkout/", "/auth/"];

/**
 * Answer-engine crawlers, listed explicitly.
 *
 * Their default when unlisted varies by operator, so being cited is left to
 * chance unless it is stated. They get the same access as a search crawler:
 * public pages yes, a buyer's own pages no. Removing a name here opts this site
 * out of that engine's answers.
 */
const answerEngineAgents = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: privatePaths,
            },
            {
                userAgent: answerEngineAgents,
                allow: "/",
                disallow: privatePaths,
            },
        ],
        sitemap: absoluteUrl("/sitemap.xml"),
        host: absoluteUrl("/"),
    };
}
