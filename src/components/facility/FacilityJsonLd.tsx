import { storeName } from "@/constants/brand";
import { facilityServices, facilityRefurbishment } from "@/constants/facility";
import { absoluteUrl } from "@/lib/site";
import { serializeJsonLd } from "@/utils/json-ld";

/** The division as a `Service` of the home graph's organisation, linked by `@id`. */
export function FacilityJsonLd({ description }: { description: string }) {
    const organizationId = absoluteUrl("/#organization");
    const graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "@id": absoluteUrl("/facility-maintenance#service"),
                name: "Facility Maintenance Solutions",
                description,
                url: absoluteUrl("/facility-maintenance"),
                provider: { "@type": "Organization", "@id": organizationId, name: storeName, url: absoluteUrl("/") },
                areaServed: { "@type": "Country", name: "India" },
                hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Facility maintenance",
                    itemListElement: [...facilityServices, facilityRefurbishment].map((item) => ({
                        "@type": "Offer",
                        itemOffered: { "@type": "Service", name: item.title, description: item.body },
                    })),
                },
            },
        ],
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }} />;
}
