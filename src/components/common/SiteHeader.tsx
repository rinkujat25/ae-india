import Image from "next/image";
import Link from "next/link";
import { CartHeaderLink } from "@/components/common/CartHeaderLink";
import { HeaderSearch } from "@/components/common/HeaderSearch";

type ActiveNavItem =
    | "home"
    | "gift-store"
    | "direct-gifting"
    | "catalogue"
    | "how-it-works"
    | "diwali-gifting"
    | "contact-us"
    | "about-us"
    | "ai-gift-finder"
    | "products";

type SiteHeaderProps = {
    active?: ActiveNavItem;
};

const navItems: Array<{
    id: ActiveNavItem;
    href: string;
    label: string;
}> = [
        { id: "home", href: "/", label: "Home" },
        { id: "gift-store", href: "/employee-gift-store", label: "Employee Gift Stores" },
        { id: "direct-gifting", href: "/direct-gifting", label: "Direct gifting" },
        { id: "catalogue", href: "/catalogue", label: "Catalogue" },
        { id: "products", href: "/products", label: "Browse gifts" },
    ];

export function SiteHeader({ active }: SiteHeaderProps) {
    return (
        <nav className="nav">
            <div className="wrap nav-inner">
                {/* Both marks ship; CSS picks one at the nav's own breakpoint.
                    The link carries the accessible name so neither image needs
                    alt text -- with one of them always hidden, alt on both would
                    announce the destination twice. */}
                <Link className="logo" href="/" aria-label="Wingback - home">
                    <Image
                        className="logo-full"
                        src="/assets/wingback-logo-supplied.png"
                        alt=""
                        width={196}
                        height={65}
                        fetchPriority="high"
                        priority
                    />
                    <Image
                        className="logo-mark"
                        src="/assets/wingback-logo-mark.png"
                        alt=""
                        width={44}
                        height={44}
                        fetchPriority="high"
                        priority
                    />
                </Link>
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
                {/* Account and cart live here too, as `nav-extra` rows. Below the
                    nav's breakpoint the round icons are hidden and these take
                    over, so the collapsed bar is just logo, search and toggle. */}
                <div className="links" id="primary-navigation">
                    {navItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            aria-current={active === item.id ? "page" : undefined}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link className="nav-extra" href="/account">
                        My account
                    </Link>
                    <CartHeaderLink variant="menu" />
                </div>
                <div className="nav-actions">
                    <HeaderSearch />
                    <Link className="header-icon-link nav-account" href="/account" aria-label="Your account">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2Z" />
                        </svg>
                    </Link>
                    <CartHeaderLink />
                </div>
            </div>
        </nav>
    );
}
