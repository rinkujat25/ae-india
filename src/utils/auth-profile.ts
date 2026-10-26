import "server-only";

import { cookies } from "next/headers";
import { authAccessTokenCookie, authProfileCookie } from "@/constants/auth";
import type { AuthProfileModel } from "@/types/models/auth.model";

/** Reads the session access token for authenticated provider calls. */
export async function getAuthAccessToken(): Promise<string> {
    const store = await cookies();

    return store.get(authAccessTokenCookie)?.value ?? "";
}

/** Reads the signed-in profile for server-rendered pages, or null when signed out. */
export async function getAuthProfile(): Promise<AuthProfileModel | null> {
    const store = await cookies();

    if (!store.get(authAccessTokenCookie)?.value) {
        return null;
    }

    const raw = store.get(authProfileCookie)?.value;

    if (!raw) {
        return null;
    }

    try {
        const parsed = JSON.parse(raw) as AuthProfileModel;

        return parsed?.user?.id ? parsed : null;
    } catch {
        return null;
    }
}
