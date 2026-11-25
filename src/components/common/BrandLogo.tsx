import Link from "next/link";
import { storeMonogram, storeName, storeOwner } from "@/constants/brand";

type BrandLogoProps = {
    /** `light` sits on white (header, auth, checkout); `dark` on the footer. */
    tone?: "light" | "dark";
    /** The footer drops the owner line, as the design does. */
    showOwner?: boolean;
    className?: string;
};

/**
 * The AE India lockup: a square "AE" mark beside the wordmark, with "AMIT
 * ENTERPRISES" underneath.
 *
 * It is type rather than an image because that is what the design draws --
 * there is no logo file yet. It therefore scales and recolours with the theme,
 * and the link's text is its own accessible name. Replace the mark with an
 * image here, once, when a logo file is supplied.
 */
export function BrandLogo({ tone = "light", showOwner = true, className }: BrandLogoProps) {
    return (
        <Link
            className={["brand-logo", `brand-logo--${tone}`, className].filter(Boolean).join(" ")}
            href="/"
            aria-label={`${storeName} - home`}
        >
            <span className="brand-logo-mark" aria-hidden="true">
                {storeMonogram}
            </span>
            <span className="brand-logo-text" aria-hidden="true">
                <span className="brand-logo-name">{storeName}</span>
                {showOwner ? <span className="brand-logo-owner">{storeOwner}</span> : null}
            </span>
        </Link>
    );
}
