import type { NextConfig } from "next";
import { giftverseUrl } from "./src/lib/giftverse";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Content-Security-Policy.
 *
 * `'unsafe-inline'` is currently required for both scripts and styles because the
 * HTML migration renders each section through `dangerouslySetInnerHTML` with inline
 * <style> blocks, and Next injects its own inline bootstrap script. It still blocks
 * script loads from any third-party origin, which is the main win.
 *
 * To tighten this to a nonce-based policy, the inline <style> blocks need to move
 * into CSS modules / globals first — see AGENTS.md rule 8.
 */
/**
 * Google Analytics needs three of the directives below widened, and is blocked
 * outright without all three: the tag loads from googletagmanager.com, it beacons
 * measurement data to the analytics hosts, and it falls back to a pixel on those
 * same hosts when the beacon is unavailable.
 */
const googleAnalyticsScriptSrc = "https://www.googletagmanager.com";
const googleAnalyticsConnectSrc = [
    "https://www.google-analytics.com",
    "https://*.google-analytics.com",
    "https://*.analytics.google.com",
    "https://*.googletagmanager.com",
].join(" ");
/**
 * Where catalogue media is served from. The provider stores each brand's assets
 * wherever that brand supplied them, so this is an allowlist of the hosts seen
 * in the catalogue rather than a single origin.
 */
const productMediaHosts = [
    "https://media-assets.hyperinvento.com",
    "https://videos.ctfassets.net",
    "https://assets.ctfassets.net",
].join(" ");

const googleAnalyticsImgSrc = "https://www.google-analytics.com https://*.google-analytics.com";

const contentSecurityPolicy = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    `script-src 'self' 'unsafe-inline' ${googleAnalyticsScriptSrc}${isProduction ? "" : " 'unsafe-eval'"}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    `img-src 'self' data: blob: https://media-assets.hyperinvento.com ${googleAnalyticsImgSrc}`,
    `connect-src 'self' ${googleAnalyticsConnectSrc}`,
    // Without media-src, a <video> falls back to default-src 'self' and every
    // brand-supplied file is blocked -- which is what stopped the catalogue's
    // videos playing at all. frame-src is for YouTube links, which arrive in the
    // same assets.videos list and render as embeds.
    `media-src 'self' blob: data: ${productMediaHosts}`,
    "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com",
    "manifest-src 'self'",
    "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
    { key: "Content-Security-Policy", value: contentSecurityPolicy },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
    { key: "X-DNS-Prefetch-Control", value: "on" },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
];

/** Same path on both hosts; verified to answer 200 on GiftVerse. */
const policyPaths = [
    "/privacy-policy",
    "/privacy-policy/terms-and-conditions",
    "/privacy-policy/return-exchange",
    "/shipping-policy",
    "/payment-policy",
];

const nextConfig: NextConfig = {
    agentRules: false,
    output: "standalone",
    poweredByHeader: false,
    async headers() {
        return [{ source: "/:path*", headers: securityHeaders }];
    },
    async redirects() {
        return [
            // The policies are GiftVerse's: written once and shared across
            // every store the platform runs. This site used to carry its own
            // copies, which nothing linked to and which could drift from the
            // real text unnoticed -- two versions of a legal document is one
            // too many. Each old URL now answers 308 to its twin, so a link
            // anyone saved still reaches the current wording.
            ...policyPaths.map((source) => ({
                source,
                destination: giftverseUrl(source),
                permanent: true,
            })),
            {
                // The store is the home page now, so both of the URLs it used
                // to live at redirect rather than 404 (`permanent: true` is a
                // 308, which passes the page's standing on the same way a 301
                // does). `/gift-store` is indexed and linked from outside, and
                // `/employee-gift-store` is where it pointed until the store
                // moved -- that one was left redirecting to a page that no
                // longer exists, so it redirected straight into a 404.
                source: "/gift-store",
                destination: "/",
                permanent: true,
            },
            {
                source: "/employee-gift-store",
                destination: "/",
                permanent: true,
            },
            {
                // The phase 2 prototype is plain static HTML in public/phase2.
                // Next doesn't serve a folder's index.html, and a rewrite would
                // leave the page's relative css/js paths resolving from "/", so
                // the bare folder URL redirects to the page itself.
                source: "/phase2",
                destination: "/phase2/index.html",
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
