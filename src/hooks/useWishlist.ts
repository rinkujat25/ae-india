"use client";

import { useCallback, useEffect, useState } from "react";
import {
    clearWishlistSlugs,
    readWishlistSlugs,
    wishlistUpdatedEvent,
    writeWishlistSlugs,
} from "@/utils/wishlist-storage";

/**
 * The wishlist, shared by every heart on the page.
 *
 * The cached slug list is read on mount and fetched once if it has never been
 * stored, which is the "new visitor, or `wishlistItemsUrl` is null" case. Each
 * add or remove answers with the full list, so the cache is replaced with the
 * server's own state rather than being patched locally and drifting.
 *
 * Signed-out visitors get a 401, which is remembered as "not signed in" so the
 * hooks on the other cards do not each retry it.
 */
let inFlight: Promise<string[] | null> | null = null;

async function fetchWishlist(): Promise<string[] | null> {
    // One request even when a grid of cards mounts together.
    inFlight ??= (async () => {
        try {
            const response = await fetch("/api/wishlist");

            if (!response.ok) return null;

            const body = (await response.json()) as { slugs?: string[] };
            const slugs = body.slugs ?? [];

            writeWishlistSlugs(slugs);

            return slugs;
        } catch {
            return null;
        } finally {
            inFlight = null;
        }
    })();

    return inFlight;
}

export function useWishlist() {
    const [slugs, setSlugs] = useState<string[]>([]);
    const [isReady, setIsReady] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        let active = true;

        const sync = () => {
            const cached = readWishlistSlugs();

            if (!active) return;

            if (cached === null) {
                void fetchWishlist().then((fetched) => {
                    if (!active) return;

                    setSlugs(fetched ?? []);
                    setIsReady(true);
                });

                return;
            }

            setSlugs(cached);
            setIsReady(true);
        };

        // Deferred so the first paint is not blocked by a storage read, and so
        // state is never set during the effect's own synchronous run.
        const timeoutId = window.setTimeout(sync, 0);

        window.addEventListener(wishlistUpdatedEvent, sync);

        return () => {
            active = false;
            window.clearTimeout(timeoutId);
            window.removeEventListener(wishlistUpdatedEvent, sync);
        };
    }, []);

    const isSaved = useCallback((slug: string) => slugs.includes(slug), [slugs]);

    /**
     * Adds by id and removes by slug, because that is what the provider takes:
     * the add endpoint keys on the product id, the delete on the slug.
     */
    const toggle = useCallback(
        async (product: { id: string; slug: string }): Promise<{ ok: boolean; status: number }> => {
            if (isSaving) return { ok: false, status: 0 };

            const saved = readWishlistSlugs()?.includes(product.slug) ?? false;

            setIsSaving(true);

            try {
                const response = saved
                    ? await fetch(`/api/wishlist/${encodeURIComponent(product.slug)}`, { method: "DELETE" })
                    : await fetch("/api/wishlist", {
                          method: "POST",
                          headers: { "content-type": "application/json" },
                          body: JSON.stringify({ productId: product.id }),
                      });

                if (!response.ok) {
                    // 401 means the session ended without a sign-out -- expiry,
                    // or a cookie cleared elsewhere. The cached list is the old
                    // account's, and since a cache that exists is never
                    // refetched, this is the only moment we learn it is stale.
                    if (response.status === 401) clearWishlistSlugs();

                    return { ok: false, status: response.status };
                }

                const body = (await response.json()) as { slugs?: string[] };

                writeWishlistSlugs(body.slugs ?? []);

                return { ok: true, status: response.status };
            } catch {
                return { ok: false, status: 0 };
            } finally {
                setIsSaving(false);
            }
        },
        [isSaving],
    );

    return { slugs, isSaved, toggle, isReady, isSaving };
}
