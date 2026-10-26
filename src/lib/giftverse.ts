/**
 * Links to GiftVerse.
 *
 * This site is the store. The static pages around it -- how it works, about,
 * contact, the seasonal pages and the policies -- are published once on
 * GiftVerse and shared, so the links that point at them leave this host.
 *
 * They are built here rather than written out at each call site so the host
 * moves in one edit, and so a reader can see at a glance which links go off
 * site. Use them with a plain `<a>`, never `next/link`: the App Router has no
 * route to match on another origin.
 */
const GIFTVERSE_ORIGIN = "https://giftverse.sampley.in";

export function giftverseUrl(path: string) {
    return `${GIFTVERSE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
