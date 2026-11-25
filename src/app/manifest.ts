import type { MetadataRoute } from "next";
import { storeName } from "@/constants/brand";

/**
 * The web app manifest, served at /manifest.webmanifest.
 *
 * Replaces the generated `site.webmanifest`, whose `name` and `short_name`
 * were empty strings -- an installed shortcut with no name shows the URL
 * instead. The icons are the same two PNGs it referenced.
 */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: storeName,
        short_name: storeName,
        description:
            "Cleaning, maintenance and architectural surface products from AE India, supplied pan-India.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#14305a",
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
