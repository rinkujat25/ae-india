import type { Metadata } from "next";
import { SiteFooter } from "@/components/common/SiteFooter";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SiteHeader } from "@/components/common/SiteHeader";
import { HowItWorksAfterDeliverySection } from "@/components/how-it-works/HowItWorksAfterDeliverySection";
import { HowItWorksCtaSection } from "@/components/how-it-works/HowItWorksCtaSection";
import { HowItWorksDataSection } from "@/components/how-it-works/HowItWorksDataSection";
import { HowItWorksFaqSection } from "@/components/how-it-works/HowItWorksFaqSection";
import { HowItWorksHeroSection } from "@/components/how-it-works/HowItWorksHeroSection";
import { HowItWorksIconSprite } from "@/components/how-it-works/HowItWorksIconSprite";
import { HowItWorksJourneySection } from "@/components/how-it-works/HowItWorksJourneySection";
import { HowItWorksJsonLd } from "@/components/how-it-works/HowItWorksJsonLd";
import { HowItWorksModesSection } from "@/components/how-it-works/HowItWorksModesSection";
import { HowItWorksResponsibilitySection } from "@/components/how-it-works/HowItWorksResponsibilitySection";
import { HowItWorksRunwaySection } from "@/components/how-it-works/HowItWorksRunwaySection";
import { HowItWorksStyles } from "@/components/how-it-works/HowItWorksStyles";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "How Corporate Gifting Works, Step by Step | AE India",
  description:
    "See how a Wingback gifting program runs end to end: brief, budget rules, curated catalogue, branded store, recipient choice, sourcing and pan-India delivery.",
  keywords: [
    "how corporate gifting works",
    "corporate gifting process",
    "employee gifting program setup",
    "gifting program timeline",
    "corporate gift fulfillment process",
    "HR gifting workflow",
    "bulk gifting delivery timeline",
  ],
  authors: [{ name: "Sampley" }],
  alternates: {
    canonical: "/how-it-works",
    languages: {
      "en-IN": "/how-it-works",
      "x-default": "/how-it-works",
    },
  },
  openGraph: {
    type: "website",
    siteName: "AE India",
    url: absoluteUrl("/how-it-works"),
    title: "How Corporate Gifting Works, Step by Step | AE India",
    description:
      "Brief to doorstep in six stages. See exactly who does what, how long each stage takes, and what your team is left holding.",
    images: [
      {
        url: absoluteUrl("/assets/wingback-logo-full@2x.png"),
        alt: "Wingback Gift Store - how it works",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Corporate Gifting Works | AE India",
    description:
      "Brief to doorstep in six stages. See exactly who does what, how long each stage takes, and what your team is left holding.",
    images: [absoluteUrl("/assets/wingback-logo-full@2x.png")],
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksStyles />
      <HowItWorksIconSprite />
      <SiteHeader active="how-it-works" />
      <div className="wrap">
          <Breadcrumbs trail={[{ label: "How it works" }]} />
      </div>
      <HowItWorksHeroSection />
      <HowItWorksJourneySection />
      <HowItWorksRunwaySection />
      <HowItWorksModesSection />
      <HowItWorksResponsibilitySection />
      <HowItWorksAfterDeliverySection />
      <HowItWorksDataSection />
      <HowItWorksFaqSection />
      <HowItWorksCtaSection />
      <SiteFooter />
      <HowItWorksJsonLd />
    </>
  );
}
