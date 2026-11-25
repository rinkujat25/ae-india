import Link from "next/link";
import { BrandLogo } from "@/components/common/BrandLogo";
import type { ReactNode } from "react";

type AuthShellProps = {
    title: string;
    description: string;
    backHref: string;
    backLabel: string;
    children: ReactNode;
};

const highlights = [
    "Business and bulk pricing",
    "GST billing and delivery addresses on file",
    "Every order in one place",
];

export function AuthShell({ title, description, backHref, backLabel, children }: AuthShellProps) {
    return (
        <main className="auth-page">
            <div className="auth-shell">
                <section className="auth-panel" aria-labelledby="auth-heading">
                    <BrandLogo className="auth-logo" />

                    <div className="auth-head">
                        <Link className="auth-back" href={backHref} aria-label={backLabel}>
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19 12H5" />
                                <path d="m11 6-6 6 6 6" />
                            </svg>
                        </Link>
                        <h1 id="auth-heading">{title}</h1>
                    </div>

                    <p className="auth-copy">{description}</p>

                    {children}

                    <div className="auth-divider" />

                    <p className="auth-register">
                        Don&apos;t you have an account?{" "}
                        <Link href="/auth/register">Create a New account</Link>
                    </p>
                </section>

                <aside className="auth-side">
                    <div>
                        <h2>Supplies for every space you run.</h2>
                        <p>
                            Order cleaning, maintenance and architectural surface products, keep your billing
                            details on file, and follow every order from one account.
                        </p>
                        <div className="auth-points">
                            {highlights.map((highlight) => (
                                <div key={highlight} className="auth-point">
                                    {highlight}
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="auth-note">
                        Your password or one-time code is sent over a secure connection and never stored in this
                        browser.
                    </p>
                </aside>
            </div>
        </main>
    );
}
