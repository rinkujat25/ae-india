import type { Metadata } from "next";
import { AccountSectionShell } from "@/components/account/AccountSectionShell";
import { AccountWishlistPanel } from "@/components/account/AccountWishlistPanel";
import { getWishlistProducts } from "@/services/hyperinventory/wishlist.service";
import { requireWishlistSlugs } from "@/utils/account-data";

export const metadata: Metadata = {
    title: "My Wishlist | Wingback",
    robots: { index: false, follow: false },
};

export default async function WishlistPage() {
    const slugs = await requireWishlistSlugs();
    const items = await getWishlistProducts(slugs).catch(() => []);

    return (
        <AccountSectionShell section="wishlist">
            <AccountWishlistPanel items={items} unavailableCount={slugs.length - items.length} />
        </AccountSectionShell>
    );
}
