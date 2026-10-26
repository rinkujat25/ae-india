/**
 * The saved-product slugs, cached in the browser under `wishlistItemsUrl`.
 *
 * The heart on a product card has to know whether that product is already saved
 * before the visitor touches it, and asking the API once per card is not an
 * option. The list is small — slugs only — so it is read once per visit and
 * kept here, then refreshed from whatever each add or remove returns.
 *
 * `localStorage`, not `sessionStorage`: the wishlist belongs to the account, so
 * it should survive a closed tab the way the account does.
 *
 * Every access is guarded. Storage throws in a private window and can come back
 * empty at any time, and the cache is only ever an optimisation — the server
 * remains the source of truth, and a miss just means fetching again.
 */

const storageKey = "wishlistItemsUrl";

/** Fired after any local change so every heart on the page can re-read. */
export const wishlistUpdatedEvent = "wingback:wishlist-updated";

export function readWishlistSlugs(): string[] | null {
    if (typeof window === "undefined") return null;

    try {
        const raw = window.localStorage.getItem(storageKey);

        // Absent is not the same as empty: null means "never fetched", and an
        // empty array means "fetched, nothing saved". Only the first should
        // trigger a request.
        if (raw === null) return null;

        const parsed = JSON.parse(raw) as unknown;

        if (!Array.isArray(parsed)) return null;

        return parsed.filter((slug): slug is string => typeof slug === "string" && slug.length > 0);
    } catch {
        return null;
    }
}

export function writeWishlistSlugs(slugs: string[]): void {
    if (typeof window === "undefined") return;

    try {
        window.localStorage.setItem(storageKey, JSON.stringify(slugs));
    } catch {
        // A blocked or full store costs a refetch, nothing more.
    }

    notifyWishlistUpdated();
}

/** Used on sign-out: the next visitor must not inherit the last one's list. */
export function clearWishlistSlugs(): void {
    if (typeof window === "undefined") return;

    try {
        window.localStorage.removeItem(storageKey);
    } catch {
        // Nothing to do; the list is re-fetched on the next read anyway.
    }

    notifyWishlistUpdated();
}

export function notifyWishlistUpdated(): void {
    if (typeof window === "undefined") return;

    window.dispatchEvent(new CustomEvent(wishlistUpdatedEvent));
}
