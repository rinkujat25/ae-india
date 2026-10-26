import { getProducts } from "@/services/hyperinventory/product.service";
import { buildUrlSet, xmlResponse } from "@/lib/sitemap";

/** The provider's own ceiling; asking for more is silently clamped. */
const pageSize = 100;

/**
 * A stop for a loop driven by numbers the provider supplies. `total` arriving
 * wrong — or a page that keeps answering with a full page of results — would
 * otherwise mean an unbounded walk, so the walk ends at 20,000 products and the
 * sitemap is merely incomplete instead of never finishing.
 */
const maxPages = 200;

const revalidateSeconds = 86_400;

/**
 * Every catalogue product that has a URL.
 *
 * Rendered per request for the same reason as the category sitemap: the Docker
 * image is built without credentials, and a build-time walk of the catalogue
 * would fail the build. The walk itself is cached for a day — the set of
 * products changes far more slowly than their stock and prices do, and a
 * sitemap only has to be fresher than the rate a crawler returns at.
 */
export const dynamic = "force-dynamic";

async function collectProductSlugs(): Promise<string[]> {
    // A Set because the listing collapses variants into one entry per product,
    // and two pages either side of a catalogue edit can repeat one.
    const slugs = new Set<string>();
    let offset = 0;

    for (let page = 0; page < maxPages; page += 1) {
        const listing = await getProducts({ size: pageSize, offset }, revalidateSeconds);

        for (const product of listing.products) {
            if (product.slug) slugs.add(product.slug);
        }

        // An empty page ends the walk whatever `total` claims: without it, a
        // total larger than the catalogue loops until the page cap.
        if (listing.products.length === 0) break;

        offset += listing.size;

        if (offset >= listing.total) break;
    }

    return [...slugs];
}

export async function GET() {
    // Deliberately not caught, for the same reason as the category sitemap: a
    // caught failure would publish an empty catalogue, and a 500 a crawler
    // retries is a far weaker signal than a sitemap saying the products are gone.
    const slugs = await collectProductSlugs();

    return xmlResponse(
        buildUrlSet(
            slugs.map((slug) => ({
                path: `/products/${slug}`,
                priority: 0.6,
                changeFrequency: "weekly" as const,
            })),
        ),
        revalidateSeconds,
    );
}
