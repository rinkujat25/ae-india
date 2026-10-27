import Image from "next/image";
import Link from "next/link";
import { getCompany } from "@/lib/company";
import { giftverseLinkProps, giftverseUrl } from "@/lib/giftverse";

export function SiteFooter() {
    const company = getCompany();

    return (
        <footer className="footer">
            <div className="wrap">
                <div className="footer-grid">
                    <div>
                        <Link className="logo" href="/">
                            <Image
                                src="/assets/wingback-logo-trimmed.png"
                                alt="Wingback"
                                width={167}
                                height={65}
                            />
                        </Link>
                        <p className="foot-copy">
                            Corporate gifting reimagined around recipient choice, curated
                            catalogues and fully managed pan-India fulfilment.
                        </p>
                    </div>
                    <div>
                        <h2>Contact</h2>
                        <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a>
                        <Link href="/contact-us">Contact us</Link>
                        <Link href="/products">Browse gifts</Link>
                    </div>
                    <div>
                        <h2>Policies</h2>
                        <a href={giftverseUrl("/privacy-policy")} {...giftverseLinkProps}>Privacy policy</a>
                        <a href={giftverseUrl("/privacy-policy/terms-and-conditions")} {...giftverseLinkProps}>
                            Terms &amp; conditions
                        </a>
                        <a href={giftverseUrl("/privacy-policy/return-exchange")} {...giftverseLinkProps}>
                            Return &amp; exchange
                        </a>
                        <a href={giftverseUrl("/shipping-policy")} {...giftverseLinkProps}>Shipping policy</a>
                        <a href={giftverseUrl("/payment-policy")} {...giftverseLinkProps}>Payment policy</a>
                    </div>
                </div>
                <div className="copyright">
                    <span>© 2026 Wingback Gift Store · run by Sampley.</span>
                    <span>
                        Built for employee, client, partner and festive gifting programs.
                    </span>
                </div>
            </div>
        </footer>
    );
}
