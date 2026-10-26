"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import { buildLoginHref } from "@/utils/auth-mode";
import { writeResendDeadline } from "@/utils/otp-resend";

type LoginOtpRequestFormProps = {
    email: string;
    /** Already narrowed by `resolveLoginNext`; carried through to the verify step. */
    next: string;
    /** Seconds before Resend works again, from `OTP_RESEND_SECONDS`. */
    resendSeconds: number;
};

export function LoginOtpRequestForm({ email, next, resendSeconds }: LoginOtpRequestFormProps) {
    const router = useRouter();
    const apiRequest = useApiRequest();
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isSubmitting) return;

        const submitted = String(new FormData(event.currentTarget).get("email") ?? "").trim();

        setError("");
        setIsSubmitting(true);

        try {
            await apiRequest("/api/auth/otp/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: submitted }),
            });

            // The wait is recorded here, where the code actually goes out, so a
            // refresh on the verify step resumes it instead of restarting it.
            writeResendDeadline(submitted, Date.now() + resendSeconds * 1000);

            // The email is carried to the verify step only so it can be shown
            // back. The code itself never goes in the URL.
            router.push(buildLoginHref({ mode: "otp", step: "verify", email: submitted, next }));
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "We could not send a code right now.");
            setIsSubmitting(false);
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
                <label htmlFor="otp-email">Your Email</label>
                <input
                    id="otp-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    defaultValue={email}
                    required
                />
            </div>

            {error ? (
                <p className="auth-error" role="alert">
                    {error}
                </p>
            ) : null}

            <button className="auth-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending code…" : "Request OTP"}
            </button>

            <Link className="auth-alt" href={buildLoginHref({ mode: "password", email, next })}>
                Login with Password
            </Link>
        </form>
    );
}
