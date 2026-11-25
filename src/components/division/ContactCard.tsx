import Link from "next/link";
import { getCompany } from "@/lib/company";

export function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m5 12 4.5 4.5L19 7" />
        </svg>
    );
}

/**
 * The phone number and what to have ready, in place of the form both division
 * designs draw. Nothing receives a form yet; put one back when there is an
 * endpoint behind it.
 */
export function ContactCard({ checklist, callLabel }: { checklist: string[]; callLabel: string }) {
    const company = getCompany();

    return (
        <div className="dv-quote-card">
            <h3>Have these ready</h3>
            <ul className="dv-checklist">
                {checklist.map((item) => (
                    <li key={item}>
                        <CheckIcon />
                        {item}
                    </li>
                ))}
            </ul>
            {company.telHref ? (
                <div className="dv-quote-call">
                    <small>Call us</small>
                    <a className="dv-quote-phone" href={`tel:${company.telHref}`}>
                        {company.phoneDisplay}
                    </a>
                    <small>{company.businessHours}</small>
                </div>
            ) : null}
            <div className="dv-quote-actions">
                {company.telHref ? (
                    <a className="dv-btn dv-btn--solid" href={`tel:${company.telHref}`}>
                        {callLabel}
                    </a>
                ) : null}
                <Link className="dv-btn dv-btn--line" href="/contact-us">
                    Contact Page
                </Link>
            </div>
        </div>
    );
}
