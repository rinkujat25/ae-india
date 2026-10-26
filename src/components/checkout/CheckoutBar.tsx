"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CheckoutBarProps = {
    /**
     * Where Back goes. Omit it and Back steps through the checkout instead,
     * which is what the multi-step flow passes `onBack` for.
     */
    backHref?: string;
    onBack?: () => void;
};

export function CheckoutBar({ backHref = "/cart", onBack }: CheckoutBarProps) {
    const router = useRouter();

    return (
        <header className="co-bar">
            <div className="co-bar-inner">
                <button className="co-back" type="button" onClick={() => (onBack ? onBack() : router.push(backHref))}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 12H5M11 18l-6-6 6-6" />
                    </svg>
                    <span>Back</span>
                </button>

                <Link className="co-brand" href="/" aria-label="Wingback by Sampley - home">
                    <Image
                        src="/assets/wingback-logo-supplied.png"
                        alt="Wingback"
                        width={196}
                        height={65}
                        priority
                    />
                </Link>

                <p className="co-secure">
                    <span>Secure Checkout</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 3 5 6v6c0 4.2 2.9 7.9 7 9 4.1-1.1 7-4.8 7-9V6Z" />
                        <path d="M12 11.2v2.4" />
                        <circle cx="12" cy="9.6" r="1.5" />
                    </svg>
                </p>
            </div>
        </header>
    );
}
