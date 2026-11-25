import Link from "next/link";
import { contactTopics } from "@/constants/contact";
import { getCompany } from "@/lib/company";

/**
 * Contact, without a form: nothing receives one yet.
 *
 * Every fact here comes from `getCompany`, and an empty one is left out -- a
 * GSTIN written into this file once published another company's number.
 */
export function ContactPageContent() {
    const company = getCompany();
    const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`;
    const details = [
        { label: "Business name", value: company.name },
        { label: "Registered as", value: company.legalName },
        { label: "GSTIN", value: company.gstin },
        { label: "Phone hours", value: company.businessHours },
        { label: "Delivers to", value: "Pan-India" },
    ].filter((detail) => detail.value);

    return (
        <main className="ct">
            <section className="ct-hero" aria-labelledby="contact-title">
                <div className="wrap ct-hero-inner">
                    <div className="ct-hero-copy">
                        <p className="ct-eyebrow ct-eyebrow--light">Contact AE India</p>
                        <h1 id="contact-title">Let&apos;s talk about your space.</h1>
                        <p>
                            Bulk quotes, project samples, dealer enquiries or help with an order — call us and we will
                            take it from there.
                        </p>
                    </div>
                    <div className="ct-reach">
                        {company.telHref ? (
                            <div className="ct-reach-main">
                                <small>Call us</small>
                                <a className="ct-phone" href={`tel:${company.telHref}`}>
                                    {company.phoneDisplay}
                                </a>
                                <small>{company.businessHours}</small>
                            </div>
                        ) : null}
                        {company.supportEmail ? (
                            <div>
                                <small>Email</small>
                                <a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a>
                            </div>
                        ) : null}
                        {company.whatsappHref ? (
                            <div>
                                <small>WhatsApp</small>
                                <a href={company.whatsappHref} target="_blank" rel="noopener">
                                    Message us
                                </a>
                            </div>
                        ) : null}
                        <div>
                            <small>Office</small>
                            <p>{company.address}</p>
                            <a href={mapHref} target="_blank" rel="noopener">
                                Open in Google Maps
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ct-section" aria-labelledby="contact-topics-title">
                <div className="wrap">
                    <div className="ct-head">
                        <p className="ct-eyebrow">How can we help?</p>
                        <h2 id="contact-topics-title">Have these ready when you call.</h2>
                    </div>
                    <ul className="ct-topics">
                        {contactTopics.map((topic) => (
                            <li id={topic.id} key={topic.id}>
                                <h3>{topic.title}</h3>
                                <p>{topic.body}</p>
                                <ul>
                                    {topic.ready.map((item) => (
                                        <li key={item}>
                                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="m5 12 4.5 4.5L19 7" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                {topic.link ? (
                                    <Link className="ct-link" href={topic.link.href}>
                                        {topic.link.label} <span aria-hidden="true">&#8594;</span>
                                    </Link>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="ct-section ct-section--grey" aria-labelledby="contact-details-title">
                <div className="wrap ct-details">
                    <div>
                        <p className="ct-eyebrow">Business details</p>
                        <h2 id="contact-details-title">Who you are dealing with.</h2>
                    </div>
                    <dl>
                        {details.map((detail) => (
                            <div key={detail.label}>
                                <dt>{detail.label}</dt>
                                <dd>{detail.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>
        </main>
    );
}
