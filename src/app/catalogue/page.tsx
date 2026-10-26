import type { Metadata } from "next";
import { SiteFooter } from "@/components/common/SiteFooter";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SiteHeader } from "@/components/common/SiteHeader";
import { CatalogueFaqSection } from "@/components/catalogue/CatalogueFaqSection";
import { CatalogueBudgetTiersSection } from "@/components/catalogue/CatalogueBudgetTiersSection";
import { CatalogueCategoriesSection } from "@/components/catalogue/CatalogueCategoriesSection";
import { CatalogueCtaSection } from "@/components/catalogue/CatalogueCtaSection";
import { CatalogueCurationSection } from "@/components/catalogue/CatalogueCurationSection";
import { CatalogueFeaturedSection } from "@/components/catalogue/CatalogueFeaturedSection";
import { CatalogueHeroSection } from "@/components/catalogue/CatalogueHeroSection";
import { CatalogueIconSprite } from "@/components/catalogue/CatalogueIconSprite";
import { CatalogueJsonLd } from "@/components/catalogue/CatalogueJsonLd";
import { CatalogueStyles } from "@/components/catalogue/CatalogueStyles";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Corporate Gift Catalogue by Budget & Category | Wingback",
  description:
    "Browse corporate gifts across eight categories and budget tiers from Rs. 1,000 to Rs. 10,000, with branded packaging and managed pan-India fulfilment.",
  keywords: [
    "corporate gift catalogue",
    "corporate gifts by budget",
    "employee gift catalogue India",
    "bulk corporate gift list",
    "corporate gift hampers",
    "gift catalogue for companies",
    "branded corporate gifts",
    "Diwali gift catalogue",
    "corporate gift ideas for employees",
    "curated gifting catalogue",
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
    canonical: "/catalogue",
    languages: {
      "en-IN": "/catalogue",
      "x-default": "/catalogue",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Wingback by Sampley",
    url: absoluteUrl("/catalogue"),
    title: "Corporate Gift Catalogue by Budget & Category | Wingback",
    description:
      "Start from the number, not the product. Eight categories and budget tiers from Rs. 1,000 to Rs. 10,000, curated against real demand.",
    images: [
      {
        url: absoluteUrl("/assets/wingback-catalogue-og.jpg"),
        width: 1200,
        height: 630,
        alt: "Wingback by Sampley - corporate gifting catalogue",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Gift Catalogue by Budget & Category | Wingback",
    description:
      "Eight categories and budget tiers from Rs. 1,000 to Rs. 10,000, curated against real demand.",
    images: [absoluteUrl("/assets/wingback-catalogue-og.jpg")],
  },
};

export default function CataloguePage() {
  return (
    <>
      <CatalogueStyles />
      <CatalogueIconSprite />
      <SiteHeader active="catalogue" />
      <div className="wrap">
          <Breadcrumbs trail={[{ label: "Catalogue" }]} />
      </div>
      <CatalogueHeroSection />
      <CatalogueBudgetTiersSection />
      <CatalogueCategoriesSection />
      <CatalogueFeaturedSection />
      <CatalogueCurationSection />
      <CatalogueFaqSection />
      <CatalogueCtaSection />
      <SiteFooter />
      <CatalogueJsonLd />
    </>
  );
}
