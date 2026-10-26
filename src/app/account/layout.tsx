import type { ReactNode } from "react";
import { AccountIconSprite } from "@/components/account/AccountIconSprite";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { AccountStyles } from "@/components/account/AccountStyles";
import { requireAccountProfile, requireWishlistSlugs } from "@/utils/account-data";

/** Signed-out visitors never reach a section page: the gate runs once, here. */
export default async function AccountLayout({ children }: { children: ReactNode }) {
    const [, wishlistSlugs] = await Promise.all([requireAccountProfile(), requireWishlistSlugs()]);

    return (
        <>
            <SiteHeader />
            <main className="account-page">
                <AccountIconSprite />
                <div className="wrap">
                    <div className="account-layout">
                        <AccountSidebar wishlistCount={wishlistSlugs.length} />
                        {children}
                    </div>
                </div>
            </main>
            <SiteFooter />
            <AccountStyles />
        </>
    );
}
