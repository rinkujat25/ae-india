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

const contactTitle = "Contact AE India | Bulk Orders, Dealers & Support";
const contactDescription =
  "Bulk quotes, dealer enquiries or help with an order: call AE India, or visit us in Palam Village, New Delhi.";

export const metadata: Metadata = {
  title: contactTitle,
  description: fillCompanyTokens(
    "Call AE India on {{toll_free_number}} for bulk quotes, dealer enquiries or help with an order.",
  ),
  authors: [{ name: "Amit Enterprises" }],
  alternates: {
    canonical: "/contact-us",
    languages: {
      "en-IN": "/contact-us",
      "x-default": "/contact-us",
    },
  },
  // No image until AE India has a link-preview card of its own; the one this
  // page used to carry was the previous store's logo.
  openGraph: {
    type: "website",
    siteName: "AE India",
    url: absoluteUrl("/contact-us"),
    title: contactTitle,
    description: contactDescription,
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: contactTitle,
    description: contactDescription,
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
