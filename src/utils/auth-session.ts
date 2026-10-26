import "server-only";

import type { NextResponse } from "next/server";
import {
    authAccessTokenCookie,
    authProfileCookie,
    authRefreshTokenCookie,
    authSessionFallbackSeconds,
} from "@/constants/auth";
import type { AuthProfileModel, AuthSessionModel } from "@/types/models/auth.model";

const isProduction = process.env.NODE_ENV === "production";

const baseCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
} as const;

/**
 * Writes the session to httpOnly cookies.
 *
 * Tokens must never reach the browser's JavaScript — no localStorage, no
 * NEXT_PUBLIC_*, no response body. The profile cookie carries display fields
 * only (name, email, role) so server components can render a signed-in view.
 */
export function writeAuthSession(response: NextResponse, session: AuthSessionModel) {
    const maxAge = session.expiresIn > 0 ? session.expiresIn : authSessionFallbackSeconds;

    response.cookies.set(authAccessTokenCookie, session.accessToken, { ...baseCookieOptions, maxAge });
    response.cookies.set(authRefreshTokenCookie, session.refreshToken, { ...baseCookieOptions, maxAge });

    const profile: AuthProfileModel = { user: session.user, company: session.company };

    response.cookies.set(authProfileCookie, JSON.stringify(profile), { ...baseCookieOptions, maxAge });
}

/** Refreshes only the display profile, leaving the token cookies untouched. */
export function writeAuthProfile(response: NextResponse, profile: AuthProfileModel, maxAge: number) {
    response.cookies.set(authProfileCookie, JSON.stringify(profile), { ...baseCookieOptions, maxAge });
}

export function clearAuthSession(response: NextResponse) {
    [authAccessTokenCookie, authRefreshTokenCookie, authProfileCookie].forEach((name) => {
        response.cookies.set(name, "", { ...baseCookieOptions, maxAge: 0 });
    });
}
