"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PincodeModel } from "@/types/models/pincode.model";

export type PincodeLookupStatus = {
    tone: "pending" | "ok" | "error";
    message: string;
};

type PincodeLookupResponse = { pincode: PincodeModel };

const debounceMs = 450;
const pincodePattern = /^[1-9]\d{5}$/;

/**
 * Debounced pin code lookup for a single address block.
 *
 * Deliberately uses a plain fetch rather than `useApiRequest`: the global API
 * loader is a full-screen blocking overlay, and firing it on each keystroke
 * would blank the page while someone types. Progress is reported inline instead.
 */
export function usePincodeLookup(onResolved: (result: PincodeModel) => void) {
    const [status, setStatus] = useState<PincodeLookupStatus | null>(null);
    const timerRef = useRef<number | undefined>(undefined);
    const requestIdRef = useRef(0);
    const onResolvedRef = useRef(onResolved);

    useEffect(() => {
        onResolvedRef.current = onResolved;
    }, [onResolved]);

    useEffect(() => () => window.clearTimeout(timerRef.current), []);

    const lookup = useCallback((pincode: string) => {
        window.clearTimeout(timerRef.current);

        if (!pincodePattern.test(pincode)) {
            // Anything incomplete just clears the hint; the field's own validation handles the rest.
            requestIdRef.current += 1;
            setStatus(null);
            return;
        }

        timerRef.current = window.setTimeout(async () => {
            const requestId = requestIdRef.current + 1;
            requestIdRef.current = requestId;

            setStatus({ tone: "pending", message: "Looking up pin code…" });

            try {
                const response = await fetch(`/api/account/pincode?pincode=${encodeURIComponent(pincode)}`);

                // A slower earlier request must not overwrite a newer one.
                if (requestId !== requestIdRef.current) return;

                if (!response.ok) {
                    const body = (await response.json().catch(() => null)) as { message?: string } | null;

                    setStatus({ tone: "error", message: body?.message || "We could not find that pin code." });
                    return;
                }

                const { pincode: match } = (await response.json()) as PincodeLookupResponse;

                if (requestId !== requestIdRef.current) return;

                onResolvedRef.current(match);
                setStatus({ tone: "ok", message: `${match.city}, ${match.state}` });
            } catch {
                if (requestId !== requestIdRef.current) return;

                setStatus({ tone: "error", message: "Pin code lookup is unavailable right now." });
            }
        }, debounceMs);
    }, []);

    return { status, lookup };
}
