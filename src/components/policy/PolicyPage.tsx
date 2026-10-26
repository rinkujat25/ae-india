import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PolicyStyles } from "@/components/policy/PolicyStyles";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import type { PolicyDocument } from "@/content/policies";
import { policyIndex, policyTrail } from "@/content/policies";
import { fillCompanyTokens, getCompany } from "@/lib/company";

/**
 * The shell every policy page renders in: heading, last-reviewed date, the
 * sections, and a list of the sibling policies.
 *
 * The copy itself lives in `src/content/policies.ts` so these documents can be
 * edited without touching layout.
 */
export function PolicyPage({ document }: { document: PolicyDocument }) {
    const company = getCompany();

    return (
        <>
            <SiteHeader />
            <main className="policy-page">
                <div className="wrap">
                    <Breadcrumbs trail={policyTrail(document)} />

                    <header className="policy-head">
                        <h1>{fillCompanyTokens(document.title)}</h1>
                        <p>{fillCompanyTokens(document.intro)}</p>
                        <p className="policy-updated">Last reviewed {document.updated}</p>
                    </header>

                    <div className="policy-layout">
                        <article className="policy-body">
                            {document.sections.map((section) => (
                                <section key={section.heading}>
                                    <h2>{fillCompanyTokens(section.heading)}</h2>
                                    {section.paragraphs?.map((paragraph) => (
                                        <p key={paragraph}>{fillCompanyTokens(paragraph)}</p>
                                    ))}
                                    {section.points ? (
                                        <ul>
                                            {section.points.map((point) => (
                                                <li key={point}>{fillCompanyTokens(point)}</li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </section>
                            ))}

                            <section>
                                <h2>Contact us</h2>
                                <p>
                                    Questions about this policy can go to{" "}
                                    <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a> or{" "}
                                    <a href={`tel:${company.telHref}`}>{company.phoneDisplay}</a>. We are {company.legalName}, based in
                                    {company.postalAddress.addressLocality}, {company.postalAddress.addressRegion}, India.
                                </p>
                            </section>
                        </article>

                        <aside className="policy-aside" aria-label="Other policies">
                            <h2>Other policies</h2>
                            <ul>
                                {policyIndex.map((entry) => (
                                    <li key={entry.href}>
                                        {entry.href === document.href ? (
                                            <span aria-current="page">{entry.title}</span>
                                        ) : (
                                            <Link href={entry.href}>{entry.title}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    </div>
                </div>
            </main>
            <SiteFooter />
            <PolicyStyles />
        </>
    );
}
