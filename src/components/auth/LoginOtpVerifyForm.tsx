"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import type { AuthProfileModel } from "@/types/models/auth.model";
import { buildLoginHref } from "@/utils/auth-mode";
import { clearResendDeadline, readResendDeadline, writeResendDeadline } from "@/utils/otp-resend";

type LoginOtpVerifyFormProps = {
    email: string;
    /** Already narrowed by `resolveLoginNext`; where to land once signed in. */
    next: string;
    /** Seconds before Resend works again, from `OTP_RESEND_SECONDS`. */
    resendSeconds: number;
};

type VerifyResponse = { profile: AuthProfileModel };

export function LoginOtpVerifyForm({ email, next, resendSeconds }: LoginOtpVerifyFormProps) {
    const router = useRouter();
    const apiRequest = useApiRequest();
    const [error, setError] = useState("");
    const [resendNote, setResendNote] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);

    /**
     * The countdown is driven off a deadline rather than by decrementing on a
     * tick: a backgrounded tab throttles timers, and counting ticks there would
     * leave the button locked long after the wait had really passed.
     *
     * It starts locked so the server and the first client render agree, then the
     * real deadline — written when the code was actually sent — is read from
     * storage on mount. That is what survives a refresh; without it every reload
     * would hand out a fresh minute the provider would then refuse.
     */
    const [resendAt, setResendAt] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(resendSeconds);

    useEffect(() => {
        // Deferred: reading storage and setting state inline during an effect
        // makes React re-render in a cascade.
        const timeoutId = window.setTimeout(() => {
            const stored = readResendDeadline(email);

            setResendAt(stored);
            setSecondsLeft(stored ? Math.max(0, Math.ceil((stored - Date.now()) / 1000)) : 0);
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, [email]);

    useEffect(() => {
        if (!resendAt) return undefined;

        const tick = () => setSecondsLeft(Math.max(0, Math.ceil((resendAt - Date.now()) / 1000)));
        const intervalId = window.setInterval(tick, 500);

        return () => window.clearInterval(intervalId);
    }, [resendAt]);

    const startResendWait = useCallback(() => {
        const until = Date.now() + resendSeconds * 1000;

        writeResendDeadline(email, until);
        setResendAt(until);
        setSecondsLeft(resendSeconds);
    }, [email, resendSeconds]);

    const canResend = secondsLeft <= 0 && !isResending && Boolean(email);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isSubmitting) return;

        const form = event.currentTarget;
        const code = String(new FormData(form).get("otp") ?? "").trim();

        setError("");
        setResendNote("");
        setIsSubmitting(true);

        try {
            await apiRequest<VerifyResponse>("/api/auth/otp/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            });

            // The code is a credential, so the field is cleared before leaving.
            form.reset();
            clearResendDeadline();
            router.replace(next || "/account");
            router.refresh();
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "That code did not work.");
            setIsSubmitting(false);
        }
    }

    async function handleResend() {
        if (!canResend) return;

        setError("");
        setResendNote("");
        setIsResending(true);

        try {
            await apiRequest("/api/auth/otp/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            setResendNote("A new code is on its way.");
            startResendWait();
        } catch (resendError) {
            setError(resendError instanceof Error ? resendError.message : "We could not send a new code right now.");
            // The provider throttles too. If it refused, the wait restarts so
            // the button cannot be hammered against it.
            startResendWait();
        } finally {
            setIsResending(false);
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <p className="auth-sent">
                We have sent a 6-digit code to <b>{email || "your email"}</b>.
                <Link href={buildLoginHref({ mode: "otp", email, next })}>Change email</Link>
            </p>

            <div className="auth-field">
                <label htmlFor="otp-code">Enter OTP</label>
                <input
                    id="otp-code"
                    name="otp"
                    className="auth-otp"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    autoComplete="one-time-code"
                    placeholder="------"
                    required
                />
            </div>

            {error ? (
                <p className="auth-error" role="alert">
                    {error}
                </p>
            ) : null}

            {resendNote ? (
                <p className="auth-hint" role="status">
                    {resendNote}
                </p>
            ) : null}

            <button className="auth-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Verifying…" : "Verify & Login"}
            </button>

            <button className="auth-alt auth-alt-strong" type="button" onClick={handleResend} disabled={!canResend}>
                {isResending
                    ? "Sending…"
                    : secondsLeft > 0
                      ? `Resend OTP in ${secondsLeft}s`
                      : "Resend OTP"}
            </button>

            <p className="auth-hint">Didn&apos;t get the code? Check your spam folder.</p>
        </form>
    );
}
