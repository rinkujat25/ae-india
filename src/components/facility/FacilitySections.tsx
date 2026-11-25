/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { CheckIcon, ContactCard } from "@/components/division/ContactCard";
import { architecturalPath } from "@/constants/architectural";
import {
    facilityRefurbishment,
    facilitySectors,
    facilityServices,
    facilityStats,
    facilitySteps,
    quoteChecklist,
    refurbishPoints,
} from "@/constants/facility";
import { shopCategories, shopCategoryHref } from "@/constants/shop";

function ServiceIcon({ path }: { path: string }) {
    return (
        <span className="dv-service-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={path} />
            </svg>
        </span>
    );
}

export function FacilityHero() {
    return (
        <section className="dv-hero" aria-labelledby="facility-title">
            <div className="wrap dv-hero-inner">
                <div className="dv-hero-copy">
                    <p className="dv-eyebrow">Facility Maintenance Solutions</p>
                    <h1 id="facility-title">Keep every building looking and working like day one.</h1>
                    <p className="dv-hero-lede">
                        Cleaning, floor-care and maintenance products for existing buildings — plus refurbishment
                        solutions that renew tired surfaces without shutting down the space.
                    </p>
                    <div className="dv-hero-actions">
                        <a className="dv-btn dv-btn--solid" href="#quote">
                            Request a Bulk Quote
                        </a>
                        <a className="dv-btn dv-btn--line" href="#range">
                            Browse Product Range
                        </a>
                    </div>
                    <dl className="dv-stats">
                        {facilityStats.map((stat) => (
                            <div key={stat.label}>
                                <dt>{stat.label}</dt>
                                <dd>{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <figure className="dv-hero-art">
                    <img
                        src="/assets/facility/hero-office-tower.svg"
                        alt="Illustration of a glass corporate office tower"
                        fetchPriority="high"
                    />
                    <figcaption>Corporate offices</figcaption>
                </figure>
            </div>
        </section>
    );
}

export function FacilitySectors() {
    return (
        <section className="dv-sectors" aria-label="Sectors served">
            <div className="wrap">
                <b>Trusted across</b>
                <ul>
                    {facilitySectors.map((sector) => (
                        <li key={sector}>{sector}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export function FacilityServices() {
    return (
        <section className="dv-section" aria-labelledby="facility-services-title">
            <div className="wrap">
                <div className="dv-head">
                    <p className="dv-eyebrow">What we take care of</p>
                    <h2 id="facility-services-title">One supplier for the full life of your building.</h2>
                    <p>
                        From the daily clean to a lobby refresh, we supply the right product for each surface — and
                        help your team use it well.
                    </p>
                </div>
                <div className="dv-services">
                    {facilityServices.map((service) => (
                        <article className="dv-service" key={service.title}>
                            <ServiceIcon path={service.icon} />
                            <h3>{service.title}</h3>
                            <p>{service.body}</p>
                            <p className="dv-service-note">{service.note}</p>
                        </article>
                    ))}
                    <article className="dv-service dv-service--key">
                        <ServiceIcon path={facilityRefurbishment.icon} />
                        <h3>{facilityRefurbishment.title}</h3>
                        <p>{facilityRefurbishment.body}</p>
                        <a className="dv-link" href="#refurbish">
                            How refurbishment works <span aria-hidden="true">&#8594;</span>
                        </a>
                    </article>
                </div>
            </div>
        </section>
    );
}

/** The store's own categories, so every tile lands on real products. */
export function FacilityRange() {
    return (
        <section className="dv-section dv-section--grey" id="range" aria-labelledby="facility-range-title">
            <div className="wrap">
                <div className="dv-head dv-head--split">
                    <div>
                        <p className="dv-eyebrow">Product range</p>
                        <h2 id="facility-range-title">Cleaning &amp; maintenance products</h2>
                    </div>
                    <Link className="dv-link" href="/products">
                        View full catalogue <span aria-hidden="true">&#8594;</span>
                    </Link>
                </div>
                <ul className="dv-range">
                    {shopCategories.map((category) => (
                        <li key={category.label}>
                            <Link className="dv-range-card" href={shopCategoryHref(category)}>
                                <img src={category.image} alt="" width={360} height={300} loading="lazy" />
                                <span className="dv-range-body">
                                    <span className="dv-range-name">{category.label}</span>
                                    <span className="dv-range-note">{category.summary}</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <a className="dv-range-help" href="#quote">
                            <b>Not sure what you need?</b>
                            Share your site details and we&apos;ll recommend the right products.
                            <span>
                                Talk to our team <i aria-hidden="true">&#8594;</i>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export function FacilityRefurbish() {
    return (
        <section className="dv-section" id="refurbish" aria-labelledby="facility-refurbish-title">
            <div className="wrap dv-refurb">
                <div className="dv-refurb-art">
                    <figure>
                        <img
                            src="/assets/facility/lift-before.svg"
                            alt="Illustration of a scratched and dented lift cabin"
                            width={380}
                            height={500}
                            loading="lazy"
                        />
                        <figcaption>BEFORE</figcaption>
                    </figure>
                    <figure>
                        <img
                            src="/assets/facility/lift-after.svg"
                            alt="Illustration of the same lift cabin refinished in wood-grain film"
                            width={380}
                            height={500}
                            loading="lazy"
                        />
                        <figcaption>AFTER</figcaption>
                    </figure>
                </div>
                <div className="dv-refurb-copy">
                    <p className="dv-eyebrow">Refurbishment</p>
                    <h2 id="facility-refurbish-title">Refurbish, don&apos;t rebuild.</h2>
                    <p>
                        Scratched lift cabins, chipped doors and dated reception counters can be re-skinned with
                        architectural films in a fraction of the time and cost of replacement — while your building
                        stays open.
                    </p>
                    <ul className="dv-points">
                        {refurbishPoints.map((point) => (
                            <li key={point.lead}>
                                <CheckIcon />
                                <span>
                                    <b>{point.lead}</b> — {point.rest}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <Link className="dv-link dv-refurb-link" href={`${architecturalPath}#finishes`}>
                        Explore architectural finishes <span aria-hidden="true">&#8594;</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export function FacilityProcess() {
    return (
        <section className="dv-section dv-section--dark" aria-labelledby="facility-process-title">
            <div className="wrap">
                <div className="dv-head">
                    <p className="dv-eyebrow">How we work</p>
                    <h2 id="facility-process-title">Supply you can plan around.</h2>
                </div>
                <ol className="dv-steps">
                    {facilitySteps.map((step) => (
                        <li key={step.title}>
                            <h3>{step.title}</h3>
                            <p>{step.body}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export function FacilityQuote() {
    return (
        <section className="dv-section dv-section--tint" id="quote" aria-labelledby="facility-quote-title">
            <div className="wrap dv-quote">
                <div className="dv-quote-copy">
                    <p className="dv-eyebrow">Bulk &amp; contract supply</p>
                    <h2 id="facility-quote-title">Get a quote for your facility.</h2>
                    <p>
                        Tell us about your building and what you use today. Our team will come back with a recommended
                        range and pricing.
                    </p>
                </div>
                <ContactCard checklist={quoteChecklist} callLabel="Call for a Quote" />
            </div>
        </section>
    );
}
