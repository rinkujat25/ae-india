import type { Metadata } from "next";
import { SiteFooter } from "@/components/common/SiteFooter";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SiteHeader } from "@/components/common/SiteHeader";
import { ContactUsJsonLd } from "@/components/contact-us/ContactUsJsonLd";
import { ContactUsFaqSection } from "@/components/contact-us/ContactUsFaqSection";
import { ContactUsPageContent } from "@/components/contact-us/ContactUsPageContent";
import { ContactUsStyles } from "@/components/contact-us/ContactUsStyles";
import { fillCompanyTokens } from "@/lib/company";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Wingback | Corporate Gifting Enquiries India",
  description: fillCompanyTokens(
    "Talk to Wingback about a corporate gifting program, an order already running, or supplying our catalogue. Email {{support_email_id}} or call {{toll_free_number}}.",
  ),
  keywords: [
    "contact Wingback",
    "corporate gifting enquiry India",
    "corporate gift supplier contact",
    "gifting program support",
    "Sampley gifting contact",
  ],
  authors: [{ name: "Wingback by Sampley" }],
  alternates: {
    canonical: "/contact-us",
    languages: {
      "en-IN": "/contact-us",
      "x-default": "/contact-us",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Wingback by Sampley",
    url: absoluteUrl("/contact-us"),
    title: "Contact Wingback | Corporate Gifting Enquiries India",
    description:
      "Programs, live orders or supplying to the catalogue - here's who to reach and how fast we reply.",
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
    title: "Contact Wingback | Corporate Gifting Enquiries",
    description:
      "Programs, live orders or supplying to the catalogue - here's who to reach and how fast we reply.",
    images: [absoluteUrl("/assets/wingback-logo-full@2x.png")],
  },
};

export default function ContactUsPage() {
  return (
    <>
      <ContactUsStyles />
      <SiteHeader active="contact-us" />
      <div className="wrap">
          <Breadcrumbs trail={[{ label: "Contact us" }]} />
      </div>
      <ContactUsPageContent />
      <ContactUsFaqSection />
      <SiteFooter />
      <ContactUsJsonLd />
    </>
  );
}
