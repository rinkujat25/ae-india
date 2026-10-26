import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { IconSprite } from "@/components/common/IconSprite";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { AiFinderSection } from "@/components/home/AiFinderSection";
import { CatalogueSection } from "@/components/home/CatalogueSection";
import { DiwaliSection } from "@/components/home/DiwaliSection";
import { FaqSection } from "@/components/home/FaqSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeAnswersSection } from "@/components/home/HomeAnswersSection";
import { HomeDefinitionSection } from "@/components/home/HomeDefinitionSection";
import { HomeJsonLd } from "@/components/home/HomeJsonLd";
import { HomeMotionStyles } from "@/components/home/HomeMotionStyles";
import { HomeProductsSection } from "@/components/home/HomeProductsSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { ModelsSection } from "@/components/home/ModelsSection";
import { StartCtaSection } from "@/components/home/StartCtaSection";

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
    title: "Employee Gift Store | Wingback",
    description:
        "Sampley runs branded employee gift stores and direct corporate gifting with budget controls, curated gifts and managed pan-India delivery.",
    authors: [{ name: "Sampley" }],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
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
        siteName: "Wingback Employee Gift Store",
        url: absoluteUrl("/"),
        title: "Wingback employee gift store",
        description:
            "Let employees choose within your budget\u2014or send a gift to every client, partner or event guest. Sampley manages curation, sourcing, branding and pan-India delivery.",
        images: [
            {
                url: absoluteUrl("/assets/wingback-home-og.jpg"),
                width: 1200,
                height: 630,
                alt: "Wingback employee gift store",
            },
        ],
        locale: "en_IN",
    },
    twitter: {
        card: "summary_large_image",
        // Kept identical to the Open Graph pair: two different cards for the
        // same page is a maintenance trap, and X falls back to og:* anyway.
        title: "Wingback employee gift store",
        description:
            "Let employees choose within your budget\u2014or send a gift to every client, partner or event guest. Sampley manages curation, sourcing, branding and pan-India delivery.",
        images: [absoluteUrl("/assets/wingback-home-og.jpg")],
    },
};

export default function Home() {
    return (
        <>
            <IconSprite />
            <HomeMotionStyles />
            <SiteHeader active="home" />
            <main className="home-motion">
                <DiwaliSection />
                <HeroSection />
                <HomeDefinitionSection />
                <ModelsSection />
                <CatalogueSection />
                <HomeProductsSection />
                <HowItWorksSection />
                <AiFinderSection />
                <HomeAnswersSection />
                <FaqSection />
                <StartCtaSection />
            </main>
            <SiteFooter />
            <HomeJsonLd />
        </>
    );
}
