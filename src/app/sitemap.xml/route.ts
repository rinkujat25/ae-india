import { buildSitemapIndex, sitemapChildren, xmlResponse } from "@/lib/sitemap";

/**
 * `/sitemap.xml` — the index, and the only sitemap URL robots.txt advertises.
 *
 * The children are split by how often they change and by what they depend on,
 * not by size: the catalogue is nowhere near the 50,000-URL limit for a single
 * file. Splitting buys two things. The static pages keep being served from a
 * file the provider cannot affect, and a failed catalogue read can no longer
 * shrink a combined sitemap from every URL to thirteen — which is what a search
 * engine reads as "these pages are gone".
 *
 * Static: it lists three fixed paths and reads nothing.
 */
export const dynamic = "force-static";

export async function GET() {
    return xmlResponse(buildSitemapIndex(sitemapChildren), 3600);
}
