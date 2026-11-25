import Link from "next/link";
import { BrandLogo } from "@/components/common/BrandLogo";
import { storeOwner, storeTagline } from "@/constants/brand";
import { getCompany } from "@/lib/company";
import { giftverseLinkProps, giftverseUrl } from "@/lib/giftverse";

/**
 * The dark footer from the AE India design: the lockup and tagline, then
 * Solutions, Company and Contact, then the copyright and policy links.
 *
 * Architectural & Interiors and Dealer Program are left out until those pages
 * exist. The policy links still point at GiftVerse,
 * inherited with the codebase, until AE India has policies of its own.
 */
export function SiteFooter() {
    const company = getCompany();
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="wrap footer-inner">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <BrandLogo tone="dark" showOwner={false} />
                        <p>
                            {storeTagline} Facility maintenance and architectural surface solutions for
                            businesses across India.
                        </p>
                    </div>
                    <div className="footer-col">
                        <h2>Solutions</h2>
                        <Link href="/facility-maintenance">Facility Maintenance</Link>
                        <Link href="/products">Shop Online</Link>
                    </div>
                    <div className="footer-col">
                        <h2>Company</h2>
                        <Link href="/about-us">About Us</Link>
                        <Link href="/contact-us">Contact</Link>
                    </div>
                    <div className="footer-col">
                        <h2>Contact</h2>
                        {company.telHref ? <a href={`tel:${company.telHref}`}>{company.phoneDisplay}</a> : null}
                        {company.supportEmail ? (
                            <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a>
                        ) : null}
                        <span>{company.address}</span>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© {year} {storeOwner}. All rights reserved.</span>
                    <span className="footer-policies">
                        <a href={giftverseUrl("/privacy-policy/terms-and-conditions")} {...giftverseLinkProps}>
                            Terms
                        </a>
                        <a href={giftverseUrl("/privacy-policy/return-exchange")} {...giftverseLinkProps}>
                            Returns
                        </a>
                        <a href={giftverseUrl("/shipping-policy")} {...giftverseLinkProps}>Shipping</a>
                        <a href={giftverseUrl("/privacy-policy")} {...giftverseLinkProps}>Privacy</a>
                    </span>
                </div>
            </div>
        </footer>
    );
}
