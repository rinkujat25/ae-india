"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordField } from "@/components/auth/PasswordField";
import { useApiRequest } from "@/hooks/useApiRequest";
import type { AuthProfileModel } from "@/types/models/auth.model";
import { buildLoginHref } from "@/utils/auth-mode";

type LoginPasswordFormProps = {
    email: string;
    /** Already narrowed by `resolveLoginNext`; empty means "go to the account". */
    next: string;
};

type LoginResponse = { profile: AuthProfileModel };

export function LoginPasswordForm({ email, next }: LoginPasswordFormProps) {
    const router = useRouter();
    const apiRequest = useApiRequest();
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isSubmitting) return;

        const form = event.currentTarget;
        const data = new FormData(form);

        setError("");
        setIsSubmitting(true);

        try {
            await apiRequest<LoginResponse>("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: String(data.get("email") ?? "").trim(),
                    password: String(data.get("password") ?? ""),
                }),
            });

            form.reset();
            router.replace(next || "/account");
            router.refresh();
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "Unable to sign you in right now.");
            setIsSubmitting(false);
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
                <label htmlFor="login-email">Your Email</label>
                <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    defaultValue={email}
                    required
                />
            </div>

            <PasswordField
                label="Password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
            />

            {error ? (
                <p className="auth-error" role="alert">
                    {error}
                </p>
            ) : null}

            <button className="auth-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing in…" : "Login"}
            </button>

            <Link className="auth-alt" href="/contact-us">
                Forgot Password?
            </Link>

            <Link className="auth-alt auth-alt-strong" href={buildLoginHref({ mode: "otp", email, next })}>
                Login with OTP instead
            </Link>
        </form>
    );
}
