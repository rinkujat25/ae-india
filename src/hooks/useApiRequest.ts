"use client";

import { useCallback } from "react";
import { useGlobalApiLoader } from "@/components/common/GlobalApiLoaderProvider";

export function useApiRequest() {
    const { withApiLoader } = useGlobalApiLoader();

    return useCallback(
        async <Response,>(input: RequestInfo | URL, init?: RequestInit) => {
            return withApiLoader(async () => {
                const response = await fetch(input, init);

                if (!response.ok) {
                    const errorBody = await response.json().catch(() => null) as { message?: string } | null;
                    throw new Error(errorBody?.message || `API request failed with status ${response.status}`);
                }

                return (await response.json()) as Response;
            });
        },
        [withApiLoader],
    );
}
