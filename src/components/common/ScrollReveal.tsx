"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Section-level entrance motion, for every page at once.
 *
 * Pages render their sections as plain siblings with no shared wrapper, so
 * there is nothing to hang a class on per page. This runs from the root layout
 * instead and finds the sections itself, which means a new page animates
 * without anyone remembering to wire it up.
 *
 * Two decisions worth knowing:
 *
 * Only sections **below the fold** are hidden. Marking everything would mean
 * the server sends visible HTML that JavaScript then hides and fades back in —
 * a flash on every load. What is already on screen stays as it rendered, and
 * only what the reader has yet to scroll to animates.
 *
 * Nothing is hidden by CSS alone. The attribute is added here, so a visitor
 * with JavaScript off, or one whose observer never runs, sees the page in full.
 */

/**
 * A fixed inset, not a percentage. A percentage of the viewport scales with the
 * window, and on the last section of a short page it can exceed the distance
 * the page is able to scroll -- leaving that section permanently invisible.
 * Sixty pixels is always reachable, because the footer sits below it.
 */
const rootMargin = "0px 0px -60px 0px";

/** Any sliver counts, for the same reason. */
const threshold = 0;

export function ScrollReveal() {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === "undefined") return undefined;

        // Honour the OS setting by doing nothing at all, rather than animating
        // to a zero duration.
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

        const sections = [...document.querySelectorAll<HTMLElement>("section")].filter((section) => {
            // The home page has its own staggered load animation; running both
            // would fight over the same transform.
            if (section.closest(".home-motion")) return false;

            // Only the outermost section of a nest, so a section inside a
            // section does not fade in twice.
            return !section.parentElement?.closest("section");
        });

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;

                    (entry.target as HTMLElement).dataset.reveal = "in";
                    observer.unobserve(entry.target);
                }
            },
            { rootMargin, threshold },
        );

        const viewportHeight = window.innerHeight;
        const hidden: HTMLElement[] = [];

        for (const section of sections) {
            if (section.getBoundingClientRect().top < viewportHeight) continue;

            section.dataset.reveal = "out";
            hidden.push(section);
            observer.observe(section);
        }

        return () => {
            observer.disconnect();
            // Leaving a section mid-fade would strand it invisible if React
            // reuses the node on the next route.
            hidden.forEach((section) => delete section.dataset.reveal);
        };
    }, [pathname]);

    return null;
}
