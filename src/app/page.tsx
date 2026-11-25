import type { Metadata } from "next";
import { storeName, storeOwner, storeTagline } from "@/constants/brand";
import { absoluteUrl } from "@/lib/site";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { HomeJsonLd } from "@/components/home/HomeJsonLd";
import {
    HomeCallouts,
    HomeCategories,
    HomeClients,
    HomeHero,
    HomeIndustries,
    HomeProducts,
    HomeReasons,
    HomeSolutions,
    loadHomeProducts,
} from "@/components/home/HomeSections";
import { HomeStyles } from "@/components/home/HomeStyles";
import { ProductCardStyles } from "@/components/product/ProductCardStyles";

/**
 * Rendered per request, not at build time.
 *
 * The category and product sections read the catalogue, and the provider's
 * credentials only exist at runtime — the Docker image is built without them.
 * Prerendering this page therefore fails the build on a missing environment
 * variable rather than producing a page.
 *
 * The fetches underneath still carry their own `revalidate`, so the API is
 * called once per window and shared across requests; only the render is
 * per-request.
 */
export const dynamic = "force-dynamic";

const homeTitle = `${storeName} | ${storeTagline}`;
const homeDescription =
    "Cleaning, maintenance and architectural surface products for India's offices, hotels, airports, malls and hospitals \u2014 online, in bulk, or through our dealers.";

export const metadata: Metadata = {
    title: homeTitle,
    description: homeDescription,
    authors: [{ name: storeOwner }],
    alternates: {
        // Relative: `metadataBase` in the root layout makes these absolute
        // against whichever host the build is deployed to.
        canonical: "/",
        languages: {
            "en-IN": "/",
            "x-default": "/",
        },
    },
    // No image yet: the card this page carried was the previous store's, and
    // AE India's 1200x630 card has not been made. Add it here with its width,
    // height and alt when it is.
    openGraph: {
        type: "website",
        siteName: storeName,
        url: absoluteUrl("/"),
        title: homeTitle,
        description: homeDescription,
        locale: "en_IN",
    },
    twitter: {
        card: "summary",
        // Kept identical to the Open Graph pair: two different cards for the
        // same page is a maintenance trap, and X falls back to og:* anyway.
        title: homeTitle,
        description: homeDescription,
    },
};

export default async function Home() {
    // The one catalogue read; the products section renders nothing if it fails.
    const products = await loadHomeProducts();

    return (
        <>
            <HomeStyles />
            <ProductCardStyles />
            <SiteHeader active="home" />
            <main>
                <HomeHero />
                <HomeClients />
                <HomeSolutions />
                <HomeCategories />
                <HomeProducts products={products} />
                <HomeIndustries />
                <HomeReasons />
                <HomeCallouts />
            </main>
            <SiteFooter />
            <HomeJsonLd />
        </>
    );
}
