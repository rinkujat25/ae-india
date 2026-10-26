import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";
import { staticAccountProfile } from "@/constants/account";
import { getConsumerProfile } from "@/services/hyperinventory/profile.service";
import { getWishlistSlugs } from "@/services/hyperinventory/wishlist.service";
import type { AccountProfileModel } from "@/types/models/account.model";
import { getAuthAccessToken, getAuthProfile } from "@/utils/auth-profile";

/**
 * The signed-in profile for account pages.
 *
 * `cache` dedupes this within a single request, so the layout gate and the page
 * body share one round trip. Login returns the company contact name, which can
 * lag the consumer record, so the consumer profile wins where it has a value.
 */
export const requireAccountProfile = cache(async (): Promise<AccountProfileModel> => {
    const authProfile = await getAuthProfile();

    if (!authProfile) {
        redirect("/auth/login");
    }

    const accessToken = await getAuthAccessToken();
    const consumer = await getConsumerProfile(accessToken).catch(() => null);

    const firstName = consumer?.first_name?.trim() || authProfile.user.firstName;
    const lastName = consumer?.last_name?.trim() || authProfile.user.lastName;

    return {
        ...staticAccountProfile,
        name: `${firstName} ${lastName}`.trim() || authProfile.user.fullName || staticAccountProfile.name,
        firstName: firstName || staticAccountProfile.firstName,
        lastName: lastName || staticAccountProfile.lastName,
        email: consumer?.email?.trim() || authProfile.user.email || staticAccountProfile.email,
        phone: authProfile.company.mobileNumber || staticAccountProfile.phone,
        company: authProfile.company.name || staticAccountProfile.company,
        role: authProfile.user.roleName || staticAccountProfile.role,
    };
});

/** The company id every address call is scoped to. */
export const requireCompanyId = cache(async () => {
    const authProfile = await getAuthProfile();

    if (!authProfile) {
        redirect("/auth/login");
    }

    return authProfile.company.id;
});

/** Saved product slugs, shared by the sidebar count and the wishlist page. */
export const requireWishlistSlugs = cache(async (): Promise<string[]> => {
    const accessToken = await getAuthAccessToken();

    return getWishlistSlugs(accessToken).catch(() => []);
});
