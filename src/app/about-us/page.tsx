import type { Metadata } from "next";
import { AboutUsFaqSection } from "@/components/about-us/AboutUsFaqSection";
import { AboutUsJsonLd } from "@/components/about-us/AboutUsJsonLd";
import { AboutUsPageContent } from "@/components/about-us/AboutUsPageContent";
import { AboutUsStyles } from "@/components/about-us/AboutUsStyles";
import { SiteFooter } from "@/components/common/SiteFooter";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SiteHeader } from "@/components/common/SiteHeader";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Wingback by Sampley | Corporate Gifting Platform",
  description:
    "Wingback by Sampley runs corporate gifting programs through branded gift stores, recipient choice, curated catalogues and managed pan-India fulfilment.",
  keywords: [
    "about Wingback",
    "Wingback by Sampley",
    "corporate gifting platform India",
    "employee gifting platform",
    "branded gift stores",
    "managed corporate gifting",
  ],
  authors: [{ name: "Wingback by Sampley" }],
  alternates: {
    canonical: "/about-us",
    languages: {
      "en-IN": "/about-us",
      "x-default": "/about-us",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Wingback by Sampley",
    url: absoluteUrl("/about-us"),
    title: "About Wingback by Sampley | Corporate Gifting Platform",
    description:
      "Wingback helps companies make gifting personal without giving up control over budget, catalogue, delivery and reporting.",
    images: [
      {
        url: absoluteUrl("/assets/wingback-logo-full@2x.png"),
        alt: "Wingback by Sampley",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Wingback by Sampley",
    description:
      "Corporate gifting built around recipient choice, business controls and managed fulfilment.",
    images: [absoluteUrl("/assets/wingback-logo-full@2x.png")],
  },
};

export default function AboutUsPage() {
  return (
    <>
      <AboutUsStyles />
      <SiteHeader active="about-us" />
      <div className="wrap">
          <Breadcrumbs trail={[{ label: "About us" }]} />
      </div>
      <AboutUsPageContent />
      <AboutUsFaqSection />
      <SiteFooter />
      <AboutUsJsonLd />
    </>
  );
}
