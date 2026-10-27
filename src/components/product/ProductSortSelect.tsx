"use client";

import { useEffect, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGlobalApiLoader } from "@/components/common/GlobalApiLoaderProvider";
import { buildOrderingHref, orderingParam, resolveOrdering, sortOptions } from "@/utils/product-sort";

/**
 * The "Sort by" dropdown on the listing and the category page.
 *
 * Choosing an order changes the URL and the server reads the products again
 * with it; nothing is reordered in the browser. A query-only navigation fires
 * no `loading.tsx`, so the transition drives the shared loader itself, the
 * way `LinkLoadingIndicator` does for links.
 */
export function ProductSortSelect() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const { startApiLoading, stopApiLoading } = useGlobalApiLoader();
    const ordering = resolveOrdering(searchParams.get(orderingParam));

    useEffect(() => {
        if (!isPending) return;

        startApiLoading();

        return () => stopApiLoading();
    }, [isPending, startApiLoading, stopApiLoading]);

    // `appearance: none` drops the browser's own arrow so the control can be
    // styled, which means the chevron has to be drawn here.
    return (
        <span className={`sort-select${isPending ? " is-pending" : ""}`}>
            <select
                aria-label="Sort by"
                value={ordering}
                onChange={(event) => {
                    const href = buildOrderingHref(
                        pathname,
                        new URLSearchParams(searchParams.toString()),
                        resolveOrdering(event.target.value),
                    );

                    startTransition(() => router.replace(href, { scroll: false }));
                }}
            >
                {sortOptions.map((option) => (
                    <option value={option.value} key={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
            </svg>
        </span>
    );
}
