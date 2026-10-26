"use client";

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { GlobalLoader } from "@/components/common/GlobalLoader";

type GlobalApiLoaderContextValue = {
    isApiLoading: boolean;
    startApiLoading: () => void;
    stopApiLoading: () => void;
    withApiLoader: <Result>(request: Promise<Result> | (() => Promise<Result>)) => Promise<Result>;
};

const GlobalApiLoaderContext = createContext<GlobalApiLoaderContextValue | null>(null);

export function GlobalApiLoaderProvider({ children }: { children: ReactNode }) {
    const [activeRequests, setActiveRequests] = useState(0);

    const startApiLoading = useCallback(() => {
        setActiveRequests((current) => current + 1);
    }, []);

    const stopApiLoading = useCallback(() => {
        setActiveRequests((current) => Math.max(current - 1, 0));
    }, []);

    const withApiLoader = useCallback(
        async <Result,>(request: Promise<Result> | (() => Promise<Result>)) => {
            startApiLoading();

            try {
                return await (typeof request === "function" ? request() : request);
            } finally {
                stopApiLoading();
            }
        },
        [startApiLoading, stopApiLoading],
    );

    const value = useMemo(
        () => ({
            isApiLoading: activeRequests > 0,
            startApiLoading,
            stopApiLoading,
            withApiLoader,
        }),
        [activeRequests, startApiLoading, stopApiLoading, withApiLoader],
    );

    return (
        <GlobalApiLoaderContext.Provider value={value}>
            {children}
            {value.isApiLoading ? <GlobalLoader /> : null}
        </GlobalApiLoaderContext.Provider>
    );
}

export function useGlobalApiLoader() {
    const context = useContext(GlobalApiLoaderContext);

    if (!context) {
        throw new Error("useGlobalApiLoader must be used inside GlobalApiLoaderProvider.");
    }

    return context;
}
