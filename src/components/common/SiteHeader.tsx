import Link from "next/link";
import { BrandLogo } from "@/components/common/BrandLogo";
import { CartHeaderLink } from "@/components/common/CartHeaderLink";
import { HeaderSearch } from "@/components/common/HeaderSearch";
import { getCompany } from "@/lib/company";

type ActiveNavItem =
    | "home"
    | "how-it-works"
    | "diwali-gifting"
    | "contact-us"
    | "about-us"
    | "ai-gift-finder"
    | "products";

type SiteHeaderProps = {
    active?: ActiveNavItem;
};

/**
 * The design's menu is Facility Maintenance, Architectural & Interiors, Shop,
 * About Us and Contact. The two division pages do not exist yet, so they are
 * left out rather than pointed at a page that would 404; add them here when
 * their routes land.
 */
const navItems: Array<{
    id: ActiveNavItem;
    href: string;
    label: string;
}> = [
        { id: "products", href: "/products", label: "Shop" },
        { id: "about-us", href: "/about-us", label: "About Us" },
        { id: "contact-us", href: "/contact-us", label: "Contact" },
    ];

/**
 * Three bands, as in the design: a dark strip with the phone number, the main
 * bar (logo, menu, bulk-quote button), and a tools row with categories,
 * search, account and cart.
 *
 * The strip scrolls away; the bar and the tools row are one sticky `.nav`, so
 * search and the cart stay in reach. `.nav` is also what `MobileNavToggle`
 * binds to and what `RouteProgressBar` measures, so the class must stay on the
 * sticky element.
 */
export function SiteHeader({ active }: SiteHeaderProps) {
    const company = getCompany();

    return (
        <>
            <div className="topbar">
                <div className="wrap topbar-inner">
                    <span className="topbar-note">Pan-India supply · B2B &amp; B2C · 100+ dealer partners</span>
                    <div className="topbar-links">
                        {company.telHref ? (
                            <a className="topbar-call" href={`tel:${company.telHref}`}>
                                Call {company.phoneDisplay.replace(/^\+91\s*/, "")}
                            </a>
                        ) : null}
                        <Link href="/products">Shop Online</Link>
                    </div>
                </div>
            </div>
            <header className="nav">
                <div className="nav-main">
                    <div className="wrap nav-inner">
                        <BrandLogo className="logo" />
                        <button
                            className="nav-toggle"
                            type="button"
                            aria-label="Open navigation"
                            aria-expanded="false"
                            aria-controls="primary-navigation"
                        >
                            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                                <path d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        </button>
                        <nav className="links" id="primary-navigation" aria-label="Main">
                            {navItems.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    aria-current={active === item.id ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            {/* The bulk-quote button folds into the menu on a
                                phone, where the bar has no room for it. */}
                            <Link className="nav-extra" href="/contact-us">
                                Get a Bulk Quote
                            </Link>
                        </nav>
                        {/* There is no quote flow yet, so this goes to the
                            contact page, like every other enquiry. */}
                        <Link className="btn btn-primary nav-quote" href="/contact-us">
                            Get a Bulk Quote
                        </Link>
                    </div>
                </div>
                <div className="nav-tools">
                    <div className="wrap nav-tools-inner">
                        <Link className="nav-categories" href="/products">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <span>All Categories</span>
                        </Link>
                        <HeaderSearch />
                        <div className="nav-actions">
                            <Link className="header-icon-link" href="/account" aria-label="My account">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2Z" />
                                </svg>
                            </Link>
                            <CartHeaderLink />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
