import { storeName } from "@/constants/brand";
import { absoluteUrl } from "@/lib/site";
import { serializeJsonLd } from "@/utils/json-ld";

type DivisionJsonLdProps = {
    path: string;
    name: string;
    description: string;
    services: Array<{ title: string; body: string }>;
};

/** A division as a `Service` of the home graph's organisation, linked by `@id`. */
export function DivisionJsonLd({ path, name, description, services }: DivisionJsonLdProps) {
    const graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "@id": absoluteUrl(`${path}#service`),
                name,
                description,
                url: absoluteUrl(path),
                provider: { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: storeName, url: absoluteUrl("/") },
                areaServed: { "@type": "Country", name: "India" },
                hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name,
                    itemListElement: services.map((service) => ({
                        "@type": "Offer",
                        itemOffered: { "@type": "Service", name: service.title, description: service.body },
                    })),
                },
            },
        ],
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }} />;
}
