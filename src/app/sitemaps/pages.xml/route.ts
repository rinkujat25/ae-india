import { buildUrlSet, staticRoutes, xmlResponse } from "@/lib/sitemap";

/**
 * The hand-maintained routes. No provider call, so this is built once and is
 * the one sitemap that cannot be affected by the catalogue being unreachable.
 */
export const dynamic = "force-static";

export async function GET() {
    return xmlResponse(buildUrlSet(staticRoutes), 3600);
}
