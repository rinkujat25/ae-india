import type { AuthLoginMode, AuthLoginStep } from "@/types/models/auth.model";
import { resolveInternalPath } from "@/utils/return-path";

const defaultMode: AuthLoginMode = "otp";
const defaultStep: AuthLoginStep = "request";

function firstValue(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value;
}

/** Narrows a `?mode=` query value; anything unknown falls back to OTP. */
export function resolveLoginMode(value: string | string[] | undefined): AuthLoginMode {
    return firstValue(value) === "password" ? "password" : defaultMode;
}

/** Narrows a `?step=` query value; only the OTP flow has a second step. */
export function resolveLoginStep(value: string | string[] | undefined): AuthLoginStep {
    return firstValue(value) === "verify" ? "verify" : defaultStep;
}

/** Narrows the `?next=` return path carried through the login flow. */
export function resolveLoginNext(value: string | string[] | undefined) {
    return resolveInternalPath(value);
}

/** Reads back the email carried through the OTP request step. */
export function resolveLoginEmail(value: string | string[] | undefined) {
    return (firstValue(value) ?? "").trim();
}

type LoginHrefOptions = {
    mode?: AuthLoginMode;
    step?: AuthLoginStep;
    email?: string;
    /** Where to send the visitor once they are signed in. */
    next?: string;
};

/** OTP request is the bare `/auth/login` route; everything else is a query. */
export function buildLoginHref({ mode = defaultMode, step = defaultStep, email, next }: LoginHrefOptions = {}) {
    const params = new URLSearchParams();

    if (mode !== defaultMode) params.set("mode", mode);
    if (mode === "otp" && step !== defaultStep) params.set("step", step);
    if (email) params.set("email", email);

    // A return path that fails the guard is dropped, not silently forwarded.
    const safeNext = resolveLoginNext(next);
    if (safeNext) params.set("next", safeNext);

    const query = params.toString();

    return query ? `/auth/login?${query}` : "/auth/login";
}
