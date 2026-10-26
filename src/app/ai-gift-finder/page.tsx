import type { Metadata } from "next";
import { AiGiftFinderForm } from "@/components/ai-gift-finder/AiGiftFinderForm";
import { AiGiftFinderStyles } from "@/components/ai-gift-finder/AiGiftFinderStyles";
import { SiteFooter } from "@/components/common/SiteFooter";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SiteHeader } from "@/components/common/SiteHeader";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Gift Finder | Wingback",
  description:
    "Describe your gifting requirement and prepare it for Wingback AI product search.",
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
    canonical: "/ai-gift-finder",
    languages: {
      "en-IN": "/ai-gift-finder",
      "x-default": "/ai-gift-finder",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Wingback Employee Gift Store",
    url: absoluteUrl("/ai-gift-finder"),
    title: "AI Gift Finder | Wingback",
    description:
      "Describe your gifting requirement and prepare it for Wingback AI product search.",
    images: [
      {
        url: absoluteUrl("/assets/wingback-logo-full@2x.png"),
        alt: "Wingback employee gift store — AI Gift Finder",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Gift Finder | Wingback",
    description:
      "Describe your gifting requirement and prepare it for Wingback AI product search.",
    images: [absoluteUrl("/assets/wingback-logo-full@2x.png")],
  },
};

export default function AiGiftFinderPage() {
  return (
    <>
      <AiGiftFinderStyles />
      <SiteHeader active="ai-gift-finder" />
      <div className="wrap">
          <Breadcrumbs trail={[{ label: "AI Gift Finder" }]} />
      </div>
      <AiGiftFinderForm />
      <SiteFooter />
    </>
  );
}
