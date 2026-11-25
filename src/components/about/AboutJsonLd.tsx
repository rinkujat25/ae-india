import { storeName, storeOwner } from "@/constants/brand";
import { getCompany } from "@/lib/company";
import { absoluteUrl } from "@/lib/site";
import { serializeJsonLd } from "@/utils/json-ld";

/** The page as an `AboutPage` of the home graph's organisation, linked by `@id`. */
export function AboutJsonLd({ title, description }: { title: string; description: string }) {
    const company = getCompany();
    const organizationId = absoluteUrl("/#organization");
    const graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": organizationId,
                name: storeName,
                legalName: company.legalName || storeOwner,
                url: absoluteUrl("/"),
                ...(company.telHref ? { telephone: company.telHref } : {}),
            },
            {
                "@type": "AboutPage",
                "@id": absoluteUrl("/about-us#webpage"),
                url: absoluteUrl("/about-us"),
                name: title,
                description,
                inLanguage: "en-IN",
                about: { "@id": organizationId },
            },
        ],
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }} />;
}
