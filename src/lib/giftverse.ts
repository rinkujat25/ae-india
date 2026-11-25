/**
 * Links to GiftVerse.
 *
 * This site is the store, and most of what surrounds it lives here too --
 * contact, about, how it works, the seasonal pages. One thing is GiftVerse's
 * and is only ever linked to: the **policies**, which are written once and
 * shared across every store the platform runs.
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

/**
 * Spread onto every `<a>` a reader follows to GiftVerse.
 *
 * A new tab, because the reader is usually mid-task here -- checking the
 * returns policy before buying, or the terms before registering -- and should
 * not lose their cart or form to find out.
 *
 * `noopener` and not `noreferrer`. `noopener` is the part that matters for a
 * new tab: it keeps the opened page from reaching back into this one through
 * `window.opener`. `noreferrer` would also strip the Referer header, and the
 * site's `strict-origin-when-cross-origin` policy already limits that to the
 * bare origin -- which is exactly what GiftVerse needs to see this store sent
 * the visit, and nothing it should not.
 */
export const giftverseLinkProps = { target: "_blank", rel: "noopener" } as const;
