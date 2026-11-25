/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getCompany } from "@/lib/company";

export type ShopChip = {
    label: string;
    href: string;
    current?: boolean;
};

type ShopBannerProps = {
    eyebrow: string;
    title: string;
    description?: string;
    /** The category's banner image; the panel goes text-only without one. */
    imageUrl?: string;
    chips?: ShopChip[];
};

/**
 * The tinted panel at the top of the shop pages, from the AE India "Shop"
 * design: eyebrow, title, a line of copy, "Get bulk pricing", an optional
 * image, and a row of category chips beneath.
 *
 * Shared by `/products` and `/category/[slug]`, so its styles live in
 * `globals.css` under `.shop-banner`.
 */
export function ShopBanner({ eyebrow, title, description, imageUrl, chips = [] }: ShopBannerProps) {
    return (
        <section className="wrap shop-banner-section" aria-labelledby="shop-banner-title">
            <div className="shop-banner">
                <div className="shop-banner-copy">
                    <p className="shop-banner-eyebrow">{eyebrow}</p>
                    <h1 id="shop-banner-title">{title}</h1>
                    {description ? <p className="shop-banner-lede">{description}</p> : null}
                    {/* No quote flow yet: bulk enquiries go to the contact page. */}
                    <Link className="shop-banner-cta" href="/contact-us">
                        Get bulk pricing
                    </Link>
                </div>
                {imageUrl ? (
                    <div className="shop-banner-media">
                        <img src={imageUrl} alt="" referrerPolicy="no-referrer" />
                    </div>
                ) : null}
            </div>
            {chips.length ? (
                <nav className="shop-chips" aria-label="Categories">
                    {chips.map((chip) => (
                        <Link
                            className="shop-chip"
                            key={chip.href}
                            href={chip.href}
                            aria-current={chip.current ? "page" : undefined}
                        >
                            {chip.label}
                        </Link>
                    ))}
                </nav>
            ) : null}
        </section>
    );
}

/**
 * "Buying for a facility?" -- the dark box under the filters. The number comes
 * from the company details; the box is left out when none is configured.
 */
export function FacilityBox() {
    const company = getCompany();

    if (!company.telHref) return null;

    return (
        <div className="facility-box">
            <p className="facility-box-title">Buying for a facility?</p>
            <p>Bulk and contract pricing for businesses and dealers.</p>
            <a href={`tel:${company.telHref}`}>Call {company.phoneDisplay.replace(/^\+91\s*/, "")}</a>
        </div>
    );
}
