import type { Metadata } from "next";
import {
    ArchitecturalEnquiry,
    ArchitecturalFinishes,
    ArchitecturalHero,
    ArchitecturalLines,
    ArchitecturalProcess,
    ArchitecturalProjects,
} from "@/components/architectural/ArchitecturalSections";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { DivisionJsonLd } from "@/components/division/DivisionJsonLd";
import { DivisionStyles } from "@/components/division/DivisionStyles";
import { architecturalLines, architecturalPath as path } from "@/constants/architectural";
import { storeName, storeOwner } from "@/constants/brand";
import { absoluteUrl } from "@/lib/site";

const title = `Architectural & Interior Solutions | ${storeName}`;
const description =
    "DI-NOC architectural films, glass and wall graphics, and entrance matting for new buildings and interiors, specified with architects and supplied pan-India by AE India.";

export const metadata: Metadata = {
    title,
    description,
    authors: [{ name: storeOwner }],
    alternates: { canonical: path, languages: { "en-IN": path, "x-default": path } },
    openGraph: { type: "website", siteName: storeName, url: absoluteUrl(path), title, description, locale: "en_IN" },
    twitter: { card: "summary", title, description },
};

export default function ArchitecturalInteriorsPage() {
    return (
        <>
            <DivisionStyles />
            <SiteHeader active="architectural-interiors" />
            <div className="wrap">
                <Breadcrumbs trail={[{ label: "Architectural & Interiors" }]} />
            </div>
            <main className="dv dv--architectural">
                <ArchitecturalHero />
                <ArchitecturalProjects />
                <ArchitecturalLines />
                <ArchitecturalFinishes />
                <ArchitecturalProcess />
                <ArchitecturalEnquiry />
            </main>
            <SiteFooter />
            <DivisionJsonLd
                path={path}
                name="Architectural & Interior Solutions"
                description={description}
                services={architecturalLines}
            />
        </>
    );
}
