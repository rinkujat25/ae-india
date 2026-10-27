import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { IconSprite } from "@/components/common/IconSprite";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { HomeJsonLd } from "@/components/home/HomeJsonLd";
import { ProductCardStyles } from "@/components/product/ProductCardStyles";
import { StoreStyles } from "@/components/home/StoreStyles";
import {
    loadStoreProducts,
    StoreAnnouncement,
    StoreEditSection,
    StoreHero,
    StoreNotesSection,
    StoreProductsSection,
} from "@/components/home/StoreSections";

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

export const metadata: Metadata = {
    title: "Wingback Gift Store",
    description:
        "Sampley runs branded employee gift stores and direct corporate gifting with budget controls, curated gifts and managed pan-India delivery.",
    authors: [{ name: "Sampley" }],
    alternates: {
        // Relative: `metadataBase` in the root layout makes these absolute
        // against whichever host the build is deployed to.
        canonical: "/",
        languages: {
            "en-IN": "/",
            "x-default": "/",
        },
    },
    openGraph: {
        type: "website",
        siteName: "Wingback Gift Store",
        url: absoluteUrl("/"),
        title: "Wingback Gift Store",
        description:
            "Let employees choose within your budget\u2014or send a gift to every client, partner or event guest. Sampley manages curation, sourcing, branding and pan-India delivery.",
        images: [
            {
                url: absoluteUrl("/assets/wingback-home-og.jpg"),
                width: 1200,
                height: 630,
                alt: "Wingback Gift Store",
            },
        ],
        locale: "en_IN",
    },
    twitter: {
        card: "summary_large_image",
        // Kept identical to the Open Graph pair: two different cards for the
        // same page is a maintenance trap, and X falls back to og:* anyway.
        title: "Wingback Gift Store",
        description:
            "Let employees choose within your budget\u2014or send a gift to every client, partner or event guest. Sampley manages curation, sourcing, branding and pan-India delivery.",
        images: [absoluteUrl("/assets/wingback-home-og.jpg")],
    },
};

export default async function Home() {
    // One fetch for the page: the hero points at the first gift on the shelf.
    const products = await loadStoreProducts();

    return (
        <>
            <IconSprite />
            <StoreStyles />
            <ProductCardStyles />
            <StoreAnnouncement />
            <SiteHeader active="home" />
            <main>
                <StoreHero featured={products[0]} />
                <StoreProductsSection products={products} />
                <StoreEditSection />
                <StoreNotesSection />
            </main>
            <SiteFooter />
            <HomeJsonLd />
        </>
    );
}
