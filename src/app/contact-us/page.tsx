import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { ContactJsonLd } from "@/components/contact/ContactJsonLd";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { ContactStyles } from "@/components/contact/ContactStyles";
import { storeName, storeOwner } from "@/constants/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/contact-us";
const title = `Contact | ${storeName}`;
const description =
    "Call AE India for bulk quotes, project samples, dealer enquiries or help with an order, or find our office in Palam Village, New Delhi.";

export const metadata: Metadata = {
    title,
    description,
    authors: [{ name: storeOwner }],
    alternates: { canonical: path, languages: { "en-IN": path, "x-default": path } },
    // No image until AE India has a link-preview card of its own.
    openGraph: { type: "website", siteName: storeName, url: absoluteUrl(path), title, description, locale: "en_IN" },
    twitter: { card: "summary", title, description },
};

export default function ContactUsPage() {
    return (
        <>
            <ContactStyles />
            <SiteHeader active="contact-us" />
            <div className="wrap">
                <Breadcrumbs trail={[{ label: "Contact" }]} />
            </div>
            <ContactPageContent />
            <SiteFooter />
            <ContactJsonLd title={title} description={description} />
        </>
    );
}
