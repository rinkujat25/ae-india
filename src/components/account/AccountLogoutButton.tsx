"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import { clearTemporaryCart } from "@/utils/cart-storage";
import { clearWishlistSlugs } from "@/utils/wishlist-storage";

type AccountLogoutButtonProps = {
    /** Rendered beside the page heading rather than as a sidebar row. */
    inline?: boolean;
};

export function AccountLogoutButton({ inline = false }: AccountLogoutButtonProps) {
    const router = useRouter();
    const apiRequest = useApiRequest();
    const [isSigningOut, setIsSigningOut] = useState(false);

    async function handleLogout() {
        if (isSigningOut) return;

        setIsSigningOut(true);

        try {
            await apiRequest("/api/auth/logout", { method: "POST" });
        } finally {
            // Runs even if the request failed: the visitor asked to sign out, so
            // nothing of theirs should be left in this browser.
            clearTemporaryCart();
            // The wishlist belongs to the account too. Left behind, its hearts
            // stay filled for whoever uses this browser next -- signed out, or
            // signed in as somebody else.
            clearWishlistSlugs();
            router.replace("/");
            router.refresh();
        }
    }

    return (
        <button
            className={inline ? "btn btn-soft account-btn-sm" : "account-side-item account-side-logout"}
            type="button"
            onClick={handleLogout}
            disabled={isSigningOut}
        >
            {inline ? null : (
                <svg aria-hidden="true">
                    <use href="#account-logout" />
                </svg>
            )}
            {isSigningOut ? "Signing out…" : "Logout"}
        </button>
    );
}
