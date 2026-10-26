"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { CartModel } from "@/types/models/cart.model";
import { cartUpdatedEvent, getTemporaryCartReference } from "@/utils/cart-storage";

type CartResponse = { cart: CartModel | null; mode: "guest" | "user" };

/**
 * `icon` is the round header button. `menu` is the row inside the mobile
 * navigation panel, where the cart moves once the header collapses -- same
 * live count, rendered as a labelled list item instead of a bare glyph.
 */
type CartHeaderLinkProps = {
    variant?: "icon" | "menu";
};

export function CartHeaderLink({ variant = "icon" }: CartHeaderLinkProps) {
    const [count, setCount] = useState(0);

    /**
     * Always asks the cart route: a signed-in buyer has no cart id in this
     * browser, so bailing out without one left the badge permanently empty.
     *
     * Uses a plain fetch rather than `useApiRequest` because this runs on every
     * page load, and the global loader is a full-screen blocking overlay.
     */
    const refresh = useCallback(async () => {
        const reference = getTemporaryCartReference();
        const query = reference ? `?temporaryCartId=${encodeURIComponent(reference.temporaryCartId)}` : "";

        try {
            const response = await fetch(`/api/cart${query}`);

            if (!response.ok) {
                setCount(0);
                return;
            }

            const { cart } = (await response.json()) as CartResponse;

            setCount(cart?.totalItems ?? 0);
        } catch {
            setCount(0);
        }
    }, []);

    useEffect(() => {
        const handleRefresh = () => void refresh();
        handleRefresh();
        window.addEventListener(cartUpdatedEvent, handleRefresh);
        window.addEventListener("storage", handleRefresh);

        return () => {
            window.removeEventListener(cartUpdatedEvent, handleRefresh);
            window.removeEventListener("storage", handleRefresh);
        };
    }, [refresh]);

    const label = count ? `Shopping cart, ${count} products` : "Shopping cart, empty";
    const badge = count ? (count > 99 ? "99+" : String(count)) : null;

    if (variant === "menu") {
        return (
            <Link className="nav-extra" href="/cart" aria-label={label}>
                Cart
                {badge ? <span className="nav-extra-count">{badge}</span> : null}
            </Link>
        );
    }

    return (
        <Link className="cart-header-link" href="/cart" aria-label={label}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 4h2.2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.55L21 8H6.4" />
                <circle cx="10" cy="20" r="1.4" />
                <circle cx="18" cy="20" r="1.4" />
            </svg>
            {badge ? <span>{badge}</span> : null}
        </Link>
    );
}
