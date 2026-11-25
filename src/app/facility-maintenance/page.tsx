import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { DivisionJsonLd } from "@/components/division/DivisionJsonLd";
import { DivisionStyles } from "@/components/division/DivisionStyles";
import {
    FacilityHero,
    FacilityProcess,
    FacilityQuote,
    FacilityRange,
    FacilityRefurbish,
    FacilitySectors,
    FacilityServices,
} from "@/components/facility/FacilitySections";
import { storeName, storeOwner } from "@/constants/brand";
import { facilityRefurbishment, facilityServices } from "@/constants/facility";
import { absoluteUrl } from "@/lib/site";

const path = "/facility-maintenance";
const title = `Facility Maintenance Solutions | ${storeName}`;
const description =
    "Cleaning, floor-care, safety and refurbishment supplies for offices, hotels, airports, malls and hospitals, delivered pan-India by AE India.";

export const metadata: Metadata = {
    title,
    description,
    authors: [{ name: storeOwner }],
    alternates: { canonical: path, languages: { "en-IN": path, "x-default": path } },
    openGraph: { type: "website", siteName: storeName, url: absoluteUrl(path), title, description, locale: "en_IN" },
    twitter: { card: "summary", title, description },
};

export default function FacilityMaintenancePage() {
    return (
        <>
            <DivisionStyles />
            <SiteHeader active="facility-maintenance" />
            <div className="wrap">
                <Breadcrumbs trail={[{ label: "Facility Maintenance" }]} />
            </div>
            <main className="dv dv--facility">
                <FacilityHero />
                <FacilitySectors />
                <FacilityServices />
                <FacilityRange />
                <FacilityRefurbish />
                <FacilityProcess />
                <FacilityQuote />
            </main>
            <SiteFooter />
            <DivisionJsonLd
                path={path}
                name="Facility Maintenance Solutions"
                description={description}
                services={[...facilityServices, facilityRefurbishment]}
            />
        </>
    );
}
