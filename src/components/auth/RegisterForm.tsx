"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import { buildLoginHref } from "@/utils/auth-mode";
import {
    describePasswordRules,
    type SignupErrors,
    type SignupValues,
    validateSignup,
} from "@/utils/signup-validation";

type RegisterResponse = { signedIn?: boolean };

const emptyValues: SignupValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
};

export function RegisterForm() {
    const router = useRouter();
    const apiRequest = useApiRequest();
    const passwordId = useId();
    const rulesId = useId();

    const [values, setValues] = useState<SignupValues>(emptyValues);
    const [errors, setErrors] = useState<SignupErrors>({});
    const [formError, setFormError] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [areRulesVisible, setAreRulesVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function setField(field: keyof SignupValues, value: string) {
        setValues((current) => ({ ...current, [field]: value }));

        // Clear this field's error as it is corrected; the full check runs again
        // on submit, so nothing is lost by being optimistic here.
        setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isSubmitting) return;

        const nextErrors = validateSignup(values);

        setErrors(nextErrors);
        setFormError("");

        if (Object.keys(nextErrors).length > 0) return;

        setIsSubmitting(true);

        try {
            const response = await apiRequest<RegisterResponse>("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            // The password is a credential: drop it before navigating either way.
            setValues(emptyValues);

            if (response.signedIn) {
                router.replace("/account");
            } else {
                router.replace(buildLoginHref({ mode: "password", email: values.email }));
            }

            router.refresh();
        } catch (submitError) {
            setFormError(submitError instanceof Error ? submitError.message : "That account could not be created.");
            setIsSubmitting(false);
        }
    }

    function fieldProps(field: keyof SignupValues) {
        return {
            value: values[field],
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => setField(field, event.target.value),
            "aria-invalid": Boolean(errors[field]),
            "aria-describedby": errors[field] ? `${field}-error` : undefined,
        };
    }

    function fieldError(field: keyof SignupValues) {
        return errors[field] ? (
            <p className="auth-field-error" id={`${field}-error`} role="alert">
                {errors[field]}
            </p>
        ) : null;
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-row">
                <div className="auth-field">
                    <label htmlFor="register-first-name">First Name *</label>
                    <input id="register-first-name" autoComplete="given-name" {...fieldProps("firstName")} />
                    {fieldError("firstName")}
                </div>

                <div className="auth-field">
                    <label htmlFor="register-last-name">Last Name *</label>
                    <input id="register-last-name" autoComplete="family-name" {...fieldProps("lastName")} />
                    {fieldError("lastName")}
                </div>
            </div>

            <div className="auth-field">
                <label htmlFor="register-email">Email Address *</label>
                <input
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    {...fieldProps("email")}
                />
                {fieldError("email")}
            </div>

            <div className="auth-field">
                <label htmlFor="register-mobile">Mobile Number *</label>
                <input
                    id="register-mobile"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="10-digit mobile number"
                    {...fieldProps("mobile")}
                />
                {fieldError("mobile")}
            </div>

            <div className="auth-field">
                <label htmlFor={passwordId}>Password *</label>
                <div className="auth-input-wrap auth-input-wrap-2">
                    <input
                        id={passwordId}
                        type={isPasswordVisible ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Example@123"
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={errors.password ? "password-error" : rulesId}
                        value={values.password}
                        onChange={(event) => setField("password", event.target.value)}
                    />
                    <span className="auth-reveal-actions">
                    <button
                        className="auth-reveal"
                        type="button"
                        onClick={() => setIsPasswordVisible((current) => !current)}
                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                        aria-pressed={isPasswordVisible}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
                            <circle cx="12" cy="12" r="3" />
                            {isPasswordVisible ? null : <path d="M4 20 20 4" />}
                        </svg>
                    </button>
                    <button
                        className="auth-reveal"
                        type="button"
                        onClick={() => setAreRulesVisible((current) => !current)}
                        aria-label="What makes a strong password"
                        aria-expanded={areRulesVisible}
                        aria-controls={rulesId}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 11v5.5M12 7.8v.2" />
                        </svg>
                    </button>
                    </span>
                </div>
                {fieldError("password")}
                <p className="auth-rules" id={rulesId} hidden={!areRulesVisible && !errors.password}>
                    {describePasswordRules()}
                </p>
            </div>

            {formError ? (
                <p className="auth-error" role="alert">
                    {formError}
                </p>
            ) : null}

            <button className="auth-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating your account…" : "Complete Registration"}
            </button>

            <p className="auth-terms">
                By creating an account, you&apos;re agreeing to accept the Customer{" "}
                <Link href="/contact-us">Terms and Conditions.</Link>
            </p>
        </form>
    );
}
