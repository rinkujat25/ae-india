import type { Metadata } from "next";
import { SiteFooter } from "@/components/common/SiteFooter";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SiteHeader } from "@/components/common/SiteHeader";
import { DirectGiftingAddressPathsSection } from "@/components/direct-gifting/DirectGiftingAddressPathsSection";
import { DirectGiftingAudiencesSection } from "@/components/direct-gifting/DirectGiftingAudiencesSection";
import { DirectGiftingCtaSection } from "@/components/direct-gifting/DirectGiftingCtaSection";
import { DirectGiftingFaqSection } from "@/components/direct-gifting/DirectGiftingFaqSection";
import { DirectGiftingHeroSection } from "@/components/direct-gifting/DirectGiftingHeroSection";
import { DirectGiftingIconSprite } from "@/components/direct-gifting/DirectGiftingIconSprite";
import { DirectGiftingJsonLd } from "@/components/direct-gifting/DirectGiftingJsonLd";
import { DirectGiftingPresentationSection } from "@/components/direct-gifting/DirectGiftingPresentationSection";
import { DirectGiftingStyles } from "@/components/direct-gifting/DirectGiftingStyles";
import { DirectGiftingTiersSection } from "@/components/direct-gifting/DirectGiftingTiersSection";
import { DirectGiftingTimelineSection } from "@/components/direct-gifting/DirectGiftingTimelineSection";
import { DirectGiftingVersusSection } from "@/components/direct-gifting/DirectGiftingVersusSection";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Client & Partner Corporate Gift Campaigns | Wingback",
  description:
    "Direct corporate gifting for clients, CXOs, partners and event guests. You approve one gift; we collect every address, brand it and deliver pan-India.",
  keywords: [
    "client gifting India",
    "CXO gifting",
    "corporate client gifts",
    "partner gifting",
    "channel partner rewards",
    "event gifting",
    "customer gifting campaign",
    "bulk corporate gift dispatch",
    "branded client gifts",
    "business gifting company",
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
    canonical: "/direct-gifting",
    languages: {
      "en-IN": "/direct-gifting",
      "x-default": "/direct-gifting",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Wingback by Sampley",
    url: absoluteUrl("/direct-gifting"),
    title: "Client & Partner Corporate Gift Campaigns | Wingback",
    description:
      "You have the names. We get the addresses, brand the gift and deliver it. Direct corporate gifting for clients, partners and events.",
    images: [
      {
        url: absoluteUrl("/assets/wingback-direct-gifting-og.jpg"),
        width: 1200,
        height: 630,
        alt: "Wingback by Sampley - client and partner gift campaigns",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client & Partner Gift Campaigns | Wingback",
    description:
      "You have the names. We get the addresses, brand the gift and deliver it.",
    images: [absoluteUrl("/assets/wingback-direct-gifting-og.jpg")],
  },
};

export default function DirectGiftingPage() {
  return (
    <>
      <DirectGiftingStyles />
      <DirectGiftingIconSprite />
      <SiteHeader active="direct-gifting" />
      <div className="wrap">
          <Breadcrumbs trail={[{ label: "Direct gifting" }]} />
      </div>
      <DirectGiftingHeroSection />
      <DirectGiftingAudiencesSection />
      <DirectGiftingAddressPathsSection />
      <DirectGiftingPresentationSection />
      <DirectGiftingTiersSection />
      <DirectGiftingTimelineSection />
      <DirectGiftingVersusSection />
      <DirectGiftingFaqSection />
      <DirectGiftingCtaSection />
      <SiteFooter />
      <DirectGiftingJsonLd />
    </>
  );
}
