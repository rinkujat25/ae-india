import type { MetadataRoute } from "next";

/**
 * The web app manifest, served at /manifest.webmanifest.
 *
 * Replaces the generated `site.webmanifest`, whose `name` and `short_name`
 * were empty strings -- an installed shortcut with no name shows the URL
 * instead. The icons are the same two PNGs it referenced.
 */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Wingback by Sampley",
        short_name: "Wingback",
        description:
            "Corporate gifting for teams: a branded store employees choose from, or a direct send you control.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
            {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
