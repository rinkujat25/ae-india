import { getCategories } from "@/services/hyperinventory/category.service";
import { buildUrlSet, xmlResponse } from "@/lib/sitemap";

/**
 * The seller's category pages.
 *
 * Only top-level categories appear. A sub-category slug is not addressable on
 * its own — the provider answers 404 for it, and `/category/[slug]` reaches one
 * by narrowing its parent through `?sub=` — so listing them would be listing
 * URLs that do not resolve.
 *
 * Rendered per request, not prerendered. The Docker image is built with no
 * environment, so a build-time read of the provider throws on the first missing
 * credential and takes the whole build down with it. That is not a reason to
 * fetch per crawler hit: the category service asks for its own hour of caching,
 * so the provider is called once an hour however often this URL is requested.
 */
export const dynamic = "force-dynamic";

export async function GET() {
    // Deliberately not caught. A failed read answers 500, which a crawler reads
    // as "come back later" and which leaves the sitemap it already has in place.
    // Catching would publish a sitemap saying the seller has no categories.
    const categories = await getCategories();

    return xmlResponse(
        buildUrlSet(
            categories
                .filter((category) => category.slug)
                .map((category) => ({
                    path: `/category/${category.slug}`,
                    priority: 0.7,
                    changeFrequency: "weekly" as const,
                })),
        ),
        3600,
    );
}
