import type { Metadata } from "next";
import { SiteFooter } from "@/components/common/SiteFooter";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SiteHeader } from "@/components/common/SiteHeader";
import { DiwaliBudgetTiersSection } from "@/components/diwali-gifting/DiwaliBudgetTiersSection";
import { DiwaliCtaSection } from "@/components/diwali-gifting/DiwaliCtaSection";
import { DiwaliDeadlineStrip } from "@/components/diwali-gifting/DiwaliDeadlineStrip";
import { DiwaliFaqSection } from "@/components/diwali-gifting/DiwaliFaqSection";
import { DiwaliFestivalEditSection } from "@/components/diwali-gifting/DiwaliFestivalEditSection";
import { DiwaliFestivalsSection } from "@/components/diwali-gifting/DiwaliFestivalsSection";
import { DiwaliGiftingIconSprite } from "@/components/diwali-gifting/DiwaliGiftingIconSprite";
import { DiwaliGiftingJsonLd } from "@/components/diwali-gifting/DiwaliGiftingJsonLd";
import { DiwaliGiftingStyles } from "@/components/diwali-gifting/DiwaliGiftingStyles";
import { DiwaliHeroSection } from "@/components/diwali-gifting/DiwaliHeroSection";
import { DiwaliOperationsSection } from "@/components/diwali-gifting/DiwaliOperationsSection";
import { DiwaliRoutesSection } from "@/components/diwali-gifting/DiwaliRoutesSection";
import { DiwaliRunwaySection } from "@/components/diwali-gifting/DiwaliRunwaySection";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Diwali Corporate Gifts for Employees & Clients | Wingback",
  description:
    "Run Diwali gifting without the chaos. Let employees choose within budget, or send a curated client gift. Branded and delivered pan-India before the festival.",
  keywords: [
    "Diwali corporate gifts",
    "Diwali gifts for employees",
    "corporate Diwali gifting India",
    "bulk Diwali gifts",
    "Diwali hampers for employees",
    "sustainable Diwali gifts",
    "Diwali client gifts",
    "Diwali gift store for companies",
    "festival gifting for employees",
    "Diwali gifting program",
  ],
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
    canonical: "/diwali-gifting",
    languages: {
      "en-IN": "/diwali-gifting",
      "x-default": "/diwali-gifting",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Wingback Gift Store",
    url: absoluteUrl("/diwali-gifting"),
    title: "Diwali Corporate Gifts for Employees & Clients | Wingback",
    description:
      "One hamper sent to everyone, or thousands of choices inside one budget. Run Diwali gifting properly this year.",
    images: [
      {
        url: absoluteUrl("/assets/wingback-diwali-gifting-og.jpg"),
        width: 1200,
        height: 630,
        alt: "Wingback Gift Store - Diwali",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diwali Corporate Gifts for Employees & Clients | Wingback",
    description:
      "One hamper sent to everyone, or thousands of choices inside one budget.",
    images: [absoluteUrl("/assets/wingback-diwali-gifting-og.jpg")],
  },
};

export default function DiwaliGiftingPage() {
  return (
    <>
      <DiwaliGiftingStyles />
      <DiwaliGiftingIconSprite />
      <SiteHeader active="diwali-gifting" />
      <div className="wrap">
          <Breadcrumbs trail={[{ label: "Diwali gifting" }]} />
      </div>
      <DiwaliDeadlineStrip />
      <DiwaliHeroSection />
      <DiwaliRoutesSection />
      <DiwaliBudgetTiersSection />
      <DiwaliFestivalEditSection />
      <DiwaliRunwaySection />
      <DiwaliOperationsSection />
      <DiwaliFestivalsSection />
      <DiwaliFaqSection />
      <DiwaliCtaSection />
      <SiteFooter />
      <DiwaliGiftingJsonLd />
    </>
  );
}
