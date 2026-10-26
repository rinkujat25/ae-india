import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
    title: string;
    description: string;
    backHref: string;
    backLabel: string;
    children: ReactNode;
};

const highlights = [
    "Approved catalogues by budget",
    "Recipient choice with rules",
    "Pan-India fulfilment tracking",
];

export function AuthShell({ title, description, backHref, backLabel, children }: AuthShellProps) {
    return (
        <main className="auth-page">
            <div className="auth-shell">
                <section className="auth-panel" aria-labelledby="auth-heading">
                    <Link className="auth-logo" href="/">
                        <Image
                            src="/assets/wingback-logo-supplied.png"
                            alt="Wingback"
                            width={196}
                            height={65}
                            priority
                        />
                    </Link>

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
                        <h2>Run every gifting program from one place.</h2>
                        <p>
                            Wingback keeps recipient choice, catalogue controls, fulfilment, tracking and reporting
                            together for HR, admin and business teams.
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
