"use client";

import { useLinkStatus } from "next/link";
import { useEffect } from "react";
import { useGlobalApiLoader } from "@/components/common/GlobalApiLoaderProvider";

/**
 * Drives the shared loader while its parent `<Link>` navigation is pending.
 *
 * `loading.tsx` covers route segment changes, but it does not fire for links
 * that only change a query parameter, and it can be skipped for a cached
 * segment that still refetches. Render this inside any Link whose target does
 * server-side work so the wait is never silent.
 */
export function LinkLoadingIndicator() {
    const { pending } = useLinkStatus();
    const { startApiLoading, stopApiLoading } = useGlobalApiLoader();

    useEffect(() => {
        if (!pending) return;

        startApiLoading();

        return () => stopApiLoading();
    }, [pending, startApiLoading, stopApiLoading]);

    return null;
}
