import type { Metadata } from "next";
import { AboutJsonLd } from "@/components/about/AboutJsonLd";
import {
    AboutClients,
    AboutContact,
    AboutDealers,
    AboutDivisions,
    AboutHero,
    AboutReasons,
    AboutSectors,
    AboutWho,
} from "@/components/about/AboutSections";
import { AboutStyles } from "@/components/about/AboutStyles";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { storeName, storeOwner } from "@/constants/brand";
import { absoluteUrl } from "@/lib/site";

const path = "/about-us";
const title = `About Us | ${storeName}`;
const description =
    "AE India (Amit Enterprises) has spent 15+ years supplying cleaning, maintenance and architectural surface products to offices, hotels, airports, malls and hospitals across India.";

export const metadata: Metadata = {
    title,
    description,
    authors: [{ name: storeOwner }],
    alternates: { canonical: path, languages: { "en-IN": path, "x-default": path } },
    openGraph: { type: "website", siteName: storeName, url: absoluteUrl(path), title, description, locale: "en_IN" },
    twitter: { card: "summary", title, description },
};

export default function AboutUsPage() {
    return (
        <>
            <AboutStyles />
            <SiteHeader active="about-us" />
            <div className="wrap">
                <Breadcrumbs trail={[{ label: "About Us" }]} />
            </div>
            <main className="ab">
                <AboutHero />
                <AboutWho />
                <AboutDivisions />
                <AboutSectors />
                <AboutClients />
                <AboutReasons />
                <AboutDealers />
                <AboutContact />
            </main>
            <SiteFooter />
            <AboutJsonLd title={title} description={description} />
        </>
    );
}
