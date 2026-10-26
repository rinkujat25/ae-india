import type { Metadata } from "next";
import { SiteFooter } from "@/components/common/SiteFooter";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SiteHeader } from "@/components/common/SiteHeader";
import { GiftStoreFaqSection } from "@/components/gift-store/GiftStoreFaqSection";
import { GiftStoreComparisonSection } from "@/components/gift-store/GiftStoreComparisonSection";
import { GiftStoreControlsSection } from "@/components/gift-store/GiftStoreControlsSection";
import { GiftStoreCtaSection } from "@/components/gift-store/GiftStoreCtaSection";
import { GiftStoreHeroSection } from "@/components/gift-store/GiftStoreHeroSection";
import { GiftStoreIconSprite } from "@/components/gift-store/GiftStoreIconSprite";
import { GiftStoreJsonLd } from "@/components/gift-store/GiftStoreJsonLd";
import { GiftStoreProgramsSection } from "@/components/gift-store/GiftStoreProgramsSection";
import { GiftStoreRecipientExperienceSection } from "@/components/gift-store/GiftStoreRecipientExperienceSection";
import { GiftStoreStripSection } from "@/components/gift-store/GiftStoreStripSection";
import { GiftStoreStyles } from "@/components/gift-store/GiftStoreStyles";
import { GiftStoreTimelineSection } from "@/components/gift-store/GiftStoreTimelineSection";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
    title: "Branded Employee Gift Store for Companies | Wingback",
    description:
        "A branded gift store where employees and clients choose approved gifts within your budget. Sourcing, branding, pan-India delivery and reporting managed.",
    keywords: [
        "employee gift store",
        "branded gift store for companies",
        "corporate gifting platform India",
        "employee choice gifting",
        "gift store with budget control",
        "corporate gifting portal",
        "HR gifting platform",
        "employee rewards store",
        "onboarding gift store",
        "corporate gift store India",
    ],
    authors: [{ name: "Wingback by Sampley" }],
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
        canonical: "/employee-gift-store",
        languages: {
            "en-IN": "/employee-gift-store",
            "x-default": "/employee-gift-store",
        },
    },
    openGraph: {
        type: "website",
        siteName: "Wingback by Sampley",
        url: absoluteUrl("/employee-gift-store"),
        title: "Branded Employee Gift Store for Companies | Wingback",
        description:
            "One branded store where every recipient chooses within your budget. You set the rules, Wingback runs sourcing, branding and pan-India delivery.",
        images: [
            {
                url: absoluteUrl("/assets/wingback-employee-gift-store-og.jpg"),
                width: 1200,
                height: 630,
                alt: "Wingback by Sampley - branded employee gift store",
            },
        ],
        locale: "en_IN",
    },
    twitter: {
        card: "summary_large_image",
        title: "Branded Employee Gift Store for Companies | Wingback",
        description:
            "One branded store where every recipient chooses within your budget. You set the rules, we run the rest.",
        images: [absoluteUrl("/assets/wingback-employee-gift-store-og.jpg")],
    },
};

export default function GiftStorePage() {
    return (
        <>
            <GiftStoreStyles />
            <GiftStoreIconSprite />
            <SiteHeader active="gift-store" />
            <div className="wrap">
                <Breadcrumbs trail={[{ label: "Employee Gift Stores" }]} />
            </div>
            <GiftStoreHeroSection />
            <GiftStoreStripSection />
            <GiftStoreProgramsSection />
            <GiftStoreRecipientExperienceSection />
            <GiftStoreControlsSection />
            <GiftStoreComparisonSection />
            <GiftStoreTimelineSection />
            <GiftStoreFaqSection />
            <GiftStoreCtaSection />
            <SiteFooter />
            <GiftStoreJsonLd />
        </>
    );
}
