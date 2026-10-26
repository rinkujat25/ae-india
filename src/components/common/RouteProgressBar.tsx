"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A page-change progress bar, sitting under whichever header the page has.
 *
 * It lives in the root layout, not in the header. A header is rendered per page,
 * so React tears it down and rebuilds it during the very navigation the bar is
 * meant to be showing — the bar would reset to hidden halfway through and never
 * be seen. Only the root layout survives a route change.
 *
 * Because of that it is positioned rather than nested: the offset is measured
 * from the page's own sticky header, so it still reads as part of it.
 *
 * The App Router has no navigation events, so the two ends are detected
 * separately: a click on an internal link (or a back/forward step) starts it,
 * and the pathname changing finishes it.
 *
 * It creeps toward 90% rather than filling, because the real duration is not
 * knowable — a bar that reaches the end and waits reads as "stuck", while one
 * still inching forward reads as "working".
 */

/** Never sit past this until the navigation actually lands. */
const creepCeiling = 90;

/**
 * Once shown, stay up at least this long.
 *
 * Most in-app navigations land in a couple of hundred milliseconds, and a bar
 * that appears and disappears inside a few frames is never actually seen. The
 * hide is held back to here so every page change gets a visible sweep, however
 * fast the page itself was.
 */
const minVisibleMs = 650;

/** Long enough for the fill to animate to the end before the bar fades. */
const fillMs = 220;

/** A navigation that never resolves must not leave the bar up forever. */
const failsafeMs = 10_000;

/** The sticky headers the bar can sit beneath; pages without one get the top. */
const headerSelector = ".nav, .co-bar";

export function RouteProgressBar() {
    const pathname = usePathname();
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [offsetTop, setOffsetTop] = useState(0);
    const creepId = useRef(0);
    const hideId = useRef(0);
    const failsafeId = useRef(0);
    const shownAt = useRef(0);
    const isFirstRender = useRef(true);
    /** Mirrors `isVisible` so `finish` can read it without re-creating itself. */
    const isShowing = useRef(false);

    const clearTimers = useCallback(() => {
        window.clearInterval(creepId.current);
        window.clearTimeout(hideId.current);
        window.clearTimeout(failsafeId.current);
    }, []);

    const finish = useCallback(() => {
        clearTimers();

        // Landed before the bar was ever shown: drop it silently.
        if (!isShowing.current) {
            setProgress(0);
            return;
        }

        // Fill straight away: the navigation is done, so the sweep to the end
        // is honest. Only the hide waits.
        setProgress(100);

        const shownFor = Date.now() - shownAt.current;
        const hideAfter = Math.max(fillMs, minVisibleMs - shownFor);

        hideId.current = window.setTimeout(() => {
            isShowing.current = false;
            setIsVisible(false);
            setProgress(0);
        }, hideAfter);
    }, [clearTimers]);

    const start = useCallback(() => {
        clearTimers();

        // Shown immediately. Holding back the appearance was what made the bar
        // miss fast pages entirely; the minimum visible time handles flicker
        // instead, without ever skipping a navigation.
        // Measured at the moment of navigation: the header is sticky at the top,
        // so its height is its offset whatever the scroll position.
        const header = document.querySelector(headerSelector);

        setOffsetTop(header ? Math.round(header.getBoundingClientRect().height) : 0);

        isShowing.current = true;
        shownAt.current = Date.now();
        setIsVisible(true);
        setProgress(12);

        creepId.current = window.setInterval(() => {
            // Slows as it advances, so it never looks like it is about to land.
            setProgress((current) => (current >= creepCeiling ? current : current + (creepCeiling - current) * 0.08));
        }, 200);

        failsafeId.current = window.setTimeout(finish, failsafeMs);
    }, [clearTimers, finish]);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            // Let the browser have modified clicks: they open a new tab or
            // window, and this page is not going anywhere.
            if (event.defaultPrevented || event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            const anchor = (event.target as Element | null)?.closest?.("a");

            if (!anchor) return;

            const href = anchor.getAttribute("href");

            if (!href || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

            const destination = new URL(href, window.location.href);

            // Off-site links and in-page anchors are not route changes.
            if (destination.origin !== window.location.origin) return;
            if (destination.pathname === window.location.pathname) return;

            start();
        }

        function handlePopState() {
            start();
        }

        document.addEventListener("click", handleClick, { capture: true });
        window.addEventListener("popstate", handlePopState);

        return () => {
            document.removeEventListener("click", handleClick, { capture: true });
            window.removeEventListener("popstate", handlePopState);
        };
    }, [start]);

    useEffect(() => {
        // The first pass is the initial render, not a navigation.
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        finish();
    }, [pathname, finish]);

    useEffect(() => clearTimers, [clearTimers]);

    return (
        <div
            className="route-progress"
            data-active={isVisible}
            aria-hidden="true"
            style={{ top: `${offsetTop}px`, transform: `scaleX(${progress / 100})` }}
        />
    );
}
