"use client";

import { useId, useState } from "react";

type PasswordFieldProps = {
    label: string;
    name: string;
    autoComplete?: string;
    placeholder?: string;
};

/**
 * The only Client Component in the auth flow — a password field needs a
 * show/hide toggle, which is browser interaction and nothing else.
 */
export function PasswordField({ label, name, autoComplete, placeholder }: PasswordFieldProps) {
    const inputId = useId();
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="auth-field">
            <label htmlFor={inputId}>{label}</label>
            <div className="auth-input-wrap">
                <input
                    id={inputId}
                    name={name}
                    type={isVisible ? "text" : "password"}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    required
                />
                <button
                    className="auth-reveal"
                    type="button"
                    onClick={() => setIsVisible((current) => !current)}
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    aria-pressed={isVisible}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
                        <circle cx="12" cy="12" r="3" />
                        {isVisible ? null : <path d="M4 20 20 4" />}
                    </svg>
                </button>
            </div>
        </div>
    );
}
