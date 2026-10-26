/**
 * The site's own origin, for canonicals and Open Graph URLs.
 *
 * It comes from `NEXT_PUBLIC_SITE_URL` rather than being hardcoded: the same
 * build runs on localhost, staging and production, and a canonical pointing at
 * the wrong host is worse than none at all — it tells search engines the real
 * pages live somewhere else.
 */
const fallbackSiteUrl = "http://localhost:3000";

export function getSiteUrl(): string {
    const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

    if (!configured) return fallbackSiteUrl;

    // A trailing slash would double up in every joined path.
    return configured.replace(/\/+$/, "");
}

/** Absolute URL for a site-relative path, e.g. `absoluteUrl("/products")`. */
export function absoluteUrl(path = "/"): string {
    return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
