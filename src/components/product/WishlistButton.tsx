"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/common/ToastProvider";
import { useWishlist } from "@/hooks/useWishlist";

/**
 * The heart on a product card.
 *
 * The wishlist belongs to the account, so a signed-out visitor is sent to log
 * in and brought back rather than being told it failed. Until the cached list
 * has loaded the heart renders unfilled, which is what an unsaved product looks
 * like anyway, so nothing flickers for the common case.
 */
export function WishlistButton({
    productId,
    slug,
    name,
}: {
    productId: string;
    slug: string;
    name: string;
}) {
    const router = useRouter();
    const { isSaved, toggle, isSaving } = useWishlist();
    const { showToast } = useToast();
    const saved = isSaved(slug);

    async function handleClick() {
        // Read before the toggle: afterwards this reflects the new state, and
        // the message needs to describe what just happened.
        const wasSaved = saved;
        const result = await toggle({ id: productId, slug });

        if (result.ok) {
            showToast(wasSaved ? "Removed from your wishlist." : "Saved to your wishlist.");
            return;
        }

        if (result.status === 401) {
            showToast("Sign in to save products.", "error");
            router.push(`/auth/login?next=${encodeURIComponent(window.location.pathname)}`);
            return;
        }

        // A zero status is the in-flight guard rejecting a second click, which
        // is not something worth reporting.
        if (result.status !== 0) {
            showToast(
                wasSaved ? "We could not remove this product." : "We could not save this product.",
                "error",
            );
        }
    }

    return (
        <button
            type="button"
            className="wish"
            aria-label={saved ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
            aria-pressed={saved}
            disabled={isSaving}
            onClick={handleClick}
        >
            <svg aria-hidden="true" viewBox="0 0 24 24" className={saved ? "filled" : undefined}>
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
            </svg>
        </button>
    );
}
