import { storeName, storeOwner, storeTagline } from "@/constants/brand";
import { homeSolutions } from "@/constants/home";
import { logoSrc } from "@/components/common/BrandLogo";
import { getCompany } from "@/lib/company";
import { absoluteUrl } from "@/lib/site";
import { serializeJsonLd } from "@/utils/json-ld";

/**
 * The home page's structured data: AE India as one organisation, the site, the
 * two divisions the page shows, and the page itself, linked through `@id` so
 * the graph resolves as one entity.
 *
 * Contact facts come from `getCompany`, the same source as the footer, and an
 * empty one is left out rather than published as "" -- there is no support
 * email configured yet. No FAQ node, because the page renders
 * no FAQ.
 */
export function HomeJsonLd() {
    const company = getCompany();
    const organizationId = absoluteUrl("/#organization");
    const websiteId = absoluteUrl("/#website");

    const contactPoint = {
        "@type": "ContactPoint",
        contactType: "sales",
        ...(company.telHref ? { telephone: company.telHref } : {}),
        ...(company.supportEmail ? { email: company.supportEmail } : {}),
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
    };

    const graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": organizationId,
                name: storeName,
                legalName: company.legalName || storeOwner,
                url: absoluteUrl("/"),
                slogan: storeTagline,
                logo: absoluteUrl(logoSrc),
                ...(company.telHref ? { telephone: company.telHref } : {}),
                ...(company.supportEmail ? { email: company.supportEmail } : {}),
                areaServed: { "@type": "Country", name: "India" },
                address: {
                    "@type": "PostalAddress",
                    streetAddress: company.postalAddress.streetAddress,
                    addressLocality: company.postalAddress.addressLocality,
                    addressRegion: company.postalAddress.addressRegion,
                    postalCode: company.postalAddress.postalCode,
                    addressCountry: company.postalAddress.addressCountry,
                },
                contactPoint,
                knowsAbout: [
                    "Facility maintenance supplies",
                    "Floor care and cleaning products",
                    "Entrance matting",
                    "Architectural surface films",
                    "Bulk and dealer supply in India",
                ],
            },
            {
                "@type": "WebSite",
                "@id": websiteId,
                url: absoluteUrl("/"),
                name: storeName,
                publisher: { "@id": organizationId },
                inLanguage: "en-IN",
            },
            ...homeSolutions.map((solution) => ({
                "@type": "Service",
                "@id": absoluteUrl(`/#${solution.tone}`),
                name: solution.title,
                provider: { "@id": organizationId },
                areaServed: { "@type": "Country", name: "India" },
                description: solution.body,
                ...(solution.href ? { url: absoluteUrl(solution.href) } : {}),
            })),
            {
                "@type": "WebPage",
                "@id": absoluteUrl("/#webpage"),
                url: absoluteUrl("/"),
                name: `${storeName} | ${storeTagline}`,
                isPartOf: { "@id": websiteId },
                about: { "@id": organizationId },
                inLanguage: "en-IN",
            },
        ],
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }} />;
}
