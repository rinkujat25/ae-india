"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountLogoutButton } from "@/components/account/AccountLogoutButton";
import { LinkLoadingIndicator } from "@/components/common/LinkLoadingIndicator";
import { accountSections } from "@/constants/account";

type AccountSidebarProps = {
    wishlistCount: number;
};

export function AccountSidebar({ wishlistCount }: AccountSidebarProps) {
    const pathname = usePathname();

    /** "/account" only matches itself; every other section also matches its sub-routes. */
    function isActive(href: string) {
        return href === "/account" ? pathname === "/account" : pathname.startsWith(href);
    }

    return (
        <nav className="account-side" aria-label="Account sections">
            {accountSections.map((section) => (
                <Link
                    key={section.id}
                    className="account-side-item"
                    href={section.href}
                    aria-current={isActive(section.href) ? "page" : undefined}
                >
                    <svg aria-hidden="true">
                        <use href={`#${section.iconId}`} />
                    </svg>
                    {section.label}
                    {section.id === "wishlist" ? (
                        <span className="account-side-count">({wishlistCount})</span>
                    ) : null}
                    <LinkLoadingIndicator />
                </Link>
            ))}

            <AccountLogoutButton />
        </nav>
    );
}
