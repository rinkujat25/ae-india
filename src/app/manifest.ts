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
        name: "Wingback Employee Gift Store",
        short_name: "Wingback",
        description:
            "Wingback's employee gift store, run by Sampley: choose your own gift within the budget and have it delivered.",
        start_url: "/",
        display: "standalone",
        background_color: "#f6f5f2",
        theme_color: "#dd5a2a",
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
