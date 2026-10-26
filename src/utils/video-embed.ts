/**
 * YouTube links in the catalogue's video assets.
 *
 * A YouTube watch URL in a `<video src>` never plays: the element wants a media
 * file and that page is HTML. The provider's `assets.videos` carries whatever
 * the brand supplied, so some entries are files and some are YouTube links, and
 * the two need different elements.
 *
 * Returns the privacy-preserving embed URL, or null when the URL is not
 * YouTube — which is the signal to keep treating it as a media file.
 */
const youTubeHosts = new Set([
    "youtube.com",
    "www.youtube.com",
    "m.youtube.com",
    "youtu.be",
    "www.youtu.be",
    "youtube-nocookie.com",
    "www.youtube-nocookie.com",
]);

/** 11 characters of unreserved base64. Anything else is not a video id. */
const videoId = /^[\w-]{11}$/;

export function toYouTubeEmbedUrl(rawUrl: string): string | null {
    let url: URL;

    try {
        url = new URL(rawUrl);
    } catch {
        return null;
    }

    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (!youTubeHosts.has(url.hostname.toLowerCase())) return null;

    const path = url.pathname.split("/").filter(Boolean);
    // youtu.be/<id> carries it as the path; watch?v=<id> as a query; /embed/<id>
    // and /shorts/<id> as the segment after the marker.
    const id =
        url.hostname.toLowerCase().endsWith("youtu.be")
            ? path[0]
            : url.searchParams.get("v")
              ?? (["embed", "shorts", "v", "live"].includes(path[0]) ? path[1] : undefined);

    if (!id || !videoId.test(id)) return null;

    // youtube-nocookie.com so a product page does not set an advertising cookie
    // the site's own notice does not account for.
    return `https://www.youtube-nocookie.com/embed/${id}`;
}
