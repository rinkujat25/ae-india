import Image from "next/image";
import Link from "next/link";
import { storeName, storeOwner } from "@/constants/brand";

type BrandLogoProps = {
    /** `light` sits on white (header, auth, checkout); `dark` puts it on a white tile for the footer. */
    tone?: "light" | "dark";
    /** The header logo is the page's first paint, so it loads first there. */
    priority?: boolean;
    className?: string;
};

/** The supplied logo, trimmed of its empty margin. Its natural size is 198x134. */
export const logoSrc = "/assets/brand/ae-india-logo.png";
const logoWidth = 198;
const logoHeight = 134;

/**
 * The AE India logo, linking home.
 *
 * Its "INDIA" is dark blue, which disappears on the navy footer, so the dark
 * tone sits it on a white tile instead of recolouring the supplied artwork.
 * Its height is set in CSS per place (`.brand-logo img`); the width follows.
 */
export function BrandLogo({ tone = "light", priority = false, className }: BrandLogoProps) {
    return (
        <Link className={["brand-logo", `brand-logo--${tone}`, className].filter(Boolean).join(" ")} href="/">
            <Image
                src={logoSrc}
                alt={`${storeName} - ${storeOwner}, home`}
                width={logoWidth}
                height={logoHeight}
                priority={priority}
            />
        </Link>
    );
}
