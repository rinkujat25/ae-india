import type { MetadataRoute } from "next";

/**
 * Crawlers, including answer engines, listed by name.
 *
 * `*` already covers every one of them, so this exists for the crawlers that
 * only read their own block and ignore the wildcard. Each gets the same
 * answer.
 */
const namedAgents = [
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

/**
 * Nothing on this host is to be crawled.
 *
 * It is kept out of search: a rule inherited with the codebase, not yet revisited for AE India.
 * The catalogue's public copy is GiftVerse's — every product page here
 * canonicalises there — and the rest of these pages are a client storefront
 * rather than something that should compete in results.
 *
 * `Disallow: /` is the half a crawler reads before fetching anything; the
 * root layout's `robots: { index: false }` is the half that reaches one which
 * fetched anyway. Both are needed, and note the order they work in: a crawler
 * obeying this file never sees the meta tag, so this alone will not remove a
 * URL that is **already** indexed. Nothing here is, because the host has
 * never served this site publicly. If that changes, allow crawling and let
 * the noindex be read, rather than blocking and wondering why a URL lingers.
 *
 * There is no `sitemap` and no `host`: both are invitations, and this file is
 * the opposite of one.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            { userAgent: "*", disallow: "/" },
            { userAgent: namedAgents, disallow: "/" },
        ],
    };
}
