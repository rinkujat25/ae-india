import Image from "next/image";
import Link from "next/link";
import { getCompany } from "@/lib/company";

export function SiteFooter() {
    const company = getCompany();

    return (
        <footer className="footer">
            <div className="wrap">
                <div className="footer-grid">
                    <div>
                        <Link className="logo" href="/">
                            <Image
                                src="/assets/wingback-logo-supplied.png"
                                alt="Wingback"
                                width={196}
                                height={65}
                            />
                        </Link>
                        <p className="foot-copy">
                            Corporate gifting reimagined around recipient choice, curated
                            catalogues and fully managed pan-India fulfilment.
                        </p>
                    </div>
                    <div>
                        <h2>Platform</h2>
                        {/* A static page under `public/`, not a route -- a plain
                            anchor so the browser does a real document load
                            instead of asking the router for a match it has. */}
                        <a href="https://wingback.sampley.in/phase2/index.html">
                            Sample Employee Store
                        </a>
                        <Link href="/how-it-works">How it works</Link>
                        <Link href="/about-us">About us</Link>
                        <Link href="/contact-us">Contact us</Link>
                        <Link href="/#faq">FAQ</Link>
                        <Link href="/ai-gift-finder">AI Gift Finder · Coming soon</Link>
                    </div>
                    <div>
                        <h2>Use cases</h2>
                        <Link href="/diwali-gifting">Diwali gifting</Link>
                        <Link href="/diwali-gifting#festivals">Other festivals</Link>
                    </div>
                    <div>
                        <h2>Contact</h2>
                        <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a>
                        <a href="#start" data-open-form>
                            Book a demo
                        </a>
                        <Link href="/contact-us">Contact us</Link>
                        <Link href="/products">Browse gifts</Link>
                    </div>
                    <div>
                        <h2>Policies</h2>
                        {/* The policies are published once, on GiftVerse, and
                            apply to orders placed here too -- plain anchors so
                            the browser leaves the site rather than asking the
                            router for routes on another host. */}
                        <a href="https://giftverse.sampley.in/privacy-policy">Privacy policy</a>
                        <a href="https://giftverse.sampley.in/privacy-policy/terms-and-conditions">
                            Terms &amp; conditions
                        </a>
                        <a href="https://giftverse.sampley.in/privacy-policy/return-exchange">
                            Return &amp; exchange
                        </a>
                        <a href="https://giftverse.sampley.in/shipping-policy">Shipping policy</a>
                        <a href="https://giftverse.sampley.in/payment-policy">Payment policy</a>
                    </div>
                </div>
                <div className="copyright">
                    <span>© 2026 Wingback employee gift store · run by Sampley.</span>
                    <span>
                        Built for employee, client, partner and festive gifting programs.
                    </span>
                </div>
            </div>
        </footer>
    );
}
