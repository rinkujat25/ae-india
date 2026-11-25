/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { aboutDivisions, aboutReasons, aboutSectors, aboutStats } from "@/constants/about";
import { storeTagline } from "@/constants/brand";
import { clientGroups } from "@/constants/clients";
import { getCompany } from "@/lib/company";

export function AboutHero() {
    return (
        <section className="ab-hero" aria-labelledby="about-title">
            <div className="wrap">
                <p className="ab-eyebrow ab-eyebrow--light">About AE India</p>
                <h1 id="about-title">15+ years of keeping India&apos;s busiest spaces at their best.</h1>
                <p className="ab-lede">
                    Amit Enterprises supplies the products that keep buildings clean, safe and beautiful — to brands
                    and corporate offices, hotels, airports, malls and hospitals across the country.
                </p>
                <img
                    className="ab-skyline"
                    src="/assets/about/hero-skyline.svg"
                    alt="Illustration of a city skyline with an airport, office towers, a hotel, a hospital, a mall and a metro line"
                    width={2400}
                    height={520}
                    fetchPriority="high"
                />
                <dl className="ab-stats">
                    {aboutStats.map((stat) => (
                        <div key={stat.label}>
                            <dt>{stat.label}</dt>
                            <dd>{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}

export function AboutWho() {
    return (
        <section className="ab-section" aria-labelledby="about-who-title">
            <div className="wrap ab-who">
                <div className="ab-who-copy">
                    <p className="ab-eyebrow">Who we are</p>
                    <h2 id="about-who-title">A supply partner, not just a supplier.</h2>
                    <p>
                        Based in New Delhi, AE India has spent more than 15 years supplying cleaning, maintenance and
                        architectural surface products to the organisations that run India&apos;s offices, hotels,
                        airports, malls and hospitals.
                    </p>
                    <p>
                        We work directly with more than 500 clients — from facility managers to architects and
                        procurement teams — and reach further through a network of 100+ dealers, so the right product
                        is available wherever a building needs it.
                    </p>
                    <p>
                        Our promise is simple: <b>{storeTagline}</b>
                    </p>
                </div>
                <img
                    className="ab-who-art"
                    src="/assets/about/warehouse.svg"
                    alt="Illustration of a warehouse team with shelves of cleaning supplies and a delivery truck"
                    width={640}
                    height={500}
                    loading="lazy"
                />
            </div>
        </section>
    );
}

export function AboutDivisions() {
    return (
        <section className="ab-section ab-section--grey" aria-labelledby="about-divisions-title">
            <div className="wrap">
                <div className="ab-head">
                    <p className="ab-eyebrow">What we do</p>
                    <h2 id="about-divisions-title">Two divisions. Every stage of a building&apos;s life.</h2>
                </div>
                <div className="ab-divisions">
                    {aboutDivisions.map((division) => (
                        <Link className={`ab-division ab-division--${division.tone}`} href={division.href} key={division.href}>
                            <p className="ab-division-eyebrow">{division.eyebrow}</p>
                            <h3>{division.title}</h3>
                            <p>{division.body}</p>
                            <span>
                                {division.more} <i aria-hidden="true">&#8594;</i>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function AboutSectors() {
    return (
        <section className="ab-section" aria-labelledby="about-sectors-title">
            <div className="wrap">
                <div className="ab-head">
                    <p className="ab-eyebrow">Sectors we serve</p>
                    <h2 id="about-sectors-title">Where high standards are non-negotiable.</h2>
                </div>
                <ul className="ab-sectors">
                    {aboutSectors.map((sector) => (
                        <li key={sector}>{sector}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export function AboutClients() {
    return (
        <section className="ab-section ab-section--grey" id="clients" aria-labelledby="about-clients-title">
            <div className="wrap">
                <div className="ab-head">
                    <p className="ab-eyebrow">Our clients</p>
                    <h2 id="about-clients-title">Trusted by the brands India works, stays and travels with.</h2>
                    <p>A selection of the 500+ organisations we serve directly.</p>
                </div>
                <div className="ab-client-groups">
                    {clientGroups.map((group) => (
                        <div key={group.name}>
                            <h3>{group.name}</h3>
                            <ul>
                                {group.clients.map((client) => (
                                    <li key={client.name}>
                                        {client.logo ? (
                                            <img src={client.logo} alt="" width={34} height={34} loading="lazy" />
                                        ) : null}
                                        {client.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <p className="ab-note">Client names and logos are trademarks of their respective owners.</p>
            </div>
        </section>
    );
}

export function AboutReasons() {
    return (
        <section className="ab-section" aria-labelledby="about-reasons-title">
            <div className="wrap">
                <div className="ab-head">
                    <p className="ab-eyebrow">Why AE India</p>
                    <h2 id="about-reasons-title">What 15 years has taught us.</h2>
                </div>
                <div className="ab-reasons">
                    {aboutReasons.map((reason) => (
                        <div key={reason.title}>
                            <h3>{reason.title}</h3>
                            <p>{reason.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/** No dealer sign-up exists yet, so it goes to the contact page. */
export function AboutDealers() {
    return (
        <section className="ab-dealers-section" aria-labelledby="about-dealers-title">
            <div className="wrap">
                <div className="ab-dealers">
                    <div>
                        <p className="ab-eyebrow ab-eyebrow--light">Dealer program</p>
                        <h2 id="about-dealers-title">Grow with India&apos;s leading facility-supply network.</h2>
                        <p>
                            Join 100+ dealers selling AE India&apos;s cleaning, maintenance and architectural range in
                            their region.
                        </p>
                    </div>
                    <Link href="/contact-us">Become a Dealer</Link>
                </div>
            </div>
        </section>
    );
}

export function AboutContact() {
    const company = getCompany();

    return (
        <section className="ab-section--grey" aria-labelledby="about-contact-title">
            <div className="wrap ab-contact">
                <div>
                    <h2 id="about-contact-title">Let&apos;s talk.</h2>
                    <p>For bulk quotes, project specifications or dealer enquiries.</p>
                </div>
                {company.telHref ? (
                    <div>
                        <small>{company.businessHours}</small>
                        <a href={`tel:${company.telHref}`}>{company.phoneDisplay}</a>
                    </div>
                ) : null}
                <div>
                    <small>Office</small>
                    <p className="ab-address">{company.address}</p>
                </div>
            </div>
        </section>
    );
}
