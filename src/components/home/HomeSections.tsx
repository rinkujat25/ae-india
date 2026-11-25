/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { budgetPriceRanges } from "@/constants/budget";
import { storeTagline } from "@/constants/brand";
import { shopCategories, shopCategoryHref } from "@/constants/shop";
import {
    homeClients,
    homeHeroScenes,
    homeIndustries,
    homeReasons,
    homeSolutions,
    homeStats,
} from "@/constants/home";
import { getCompany } from "@/lib/company";
import { getProducts } from "@/services/hyperinventory/product.service";
import type { ProductModel } from "@/types/models/product.model";

/** One row of four, as the design draws it. */
const homeProductCount = 4;

/** Ten minutes: a shop window, not a stock report. */
const revalidateSeconds = 600;

/**
 * The products shown on the home page. A provider outage empties the row
 * rather than failing the route; the section then renders nothing.
 */
export async function loadHomeProducts(): Promise<ProductModel[]> {
    try {
        const { products } = await getProducts(
            { size: homeProductCount, priceRanges: budgetPriceRanges },
            revalidateSeconds,
        );

        return products;
    } catch (error) {
        console.error(
            "Unable to load the home page products:",
            error instanceof Error ? error.message : "Unknown error",
        );

        return [];
    }
}

function SectionHead({
    eyebrow,
    title,
    id,
    link,
    tone = "light",
}: {
    eyebrow: string;
    title: string;
    id: string;
    link?: { href: string; label: string };
    tone?: "light" | "dark";
}) {
    return (
        <div className={`home-head${link ? " home-head--split" : ""}`}>
            <div>
                <p className={`home-eyebrow${tone === "dark" ? " home-eyebrow--dark" : ""}`}>{eyebrow}</p>
                <h2 id={id}>{title}</h2>
            </div>
            {link ? (
                <Link className="home-link" href={link.href}>
                    {link.label} <span aria-hidden="true">&#8594;</span>
                </Link>
            ) : null}
        </div>
    );
}

export function HomeHero() {
    const [wide, ...pair] = homeHeroScenes;

    return (
        <section className="home-hero" aria-labelledby="home-hero-title">
            <div className="wrap home-hero-inner">
                <div className="home-hero-copy">
                    <p className="home-eyebrow home-eyebrow--dark">Facility &amp; architectural supply · 15+ years</p>
                    <h1 id="home-hero-title">{storeTagline}</h1>
                    <p className="home-hero-lede">
                        Cleaning, maintenance and architectural surface products for India&apos;s offices, hotels,
                        airports, malls and hospitals — online, in bulk, or through our dealers.
                    </p>
                    <div className="home-hero-actions">
                        <Link className="home-btn home-btn--white" href="/products">
                            Shop Now
                        </Link>
                        {/* No quote flow yet: enquiries go to the contact page. */}
                        <Link className="home-btn home-btn--outline" href="/contact-us">
                            Get a Bulk Quote
                        </Link>
                    </div>
                    <dl className="home-stats">
                        {homeStats.map((stat) => (
                            <div key={stat.label}>
                                <dt>{stat.label}</dt>
                                <dd>{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className="home-hero-art">
                    {[wide, ...pair].map((scene, index) => (
                        <figure key={scene.src} className={index === 0 ? "home-scene home-scene--wide" : "home-scene"}>
                            <img
                                src={scene.src}
                                alt={scene.alt}
                                fetchPriority={index === 0 ? "high" : undefined}
                            />
                            <figcaption>{scene.label}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function HomeClients() {
    return (
        <section className="home-clients" aria-label="Clients">
            <div className="wrap home-clients-inner">
                <span className="home-clients-title">Trusted by 500+ organisations</span>
                <ul>
                    {homeClients.map((client) => (
                        <li key={client.name}>
                            {client.logo ? <img src={client.logo} alt="" width={22} height={22} /> : null}
                            {client.name}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

/**
 * The two divisions. A card links to its division's page once that page exists
 * (`href`); the title's link is stretched over the whole card.
 */
export function HomeSolutions() {
    return (
        <section className="home-section" aria-labelledby="home-solutions-title">
            <div className="wrap">
                <SectionHead
                    id="home-solutions-title"
                    eyebrow="Our solutions"
                    title="For the building you run — and the one you're building."
                />
                <div className="home-solutions">
                    {homeSolutions.map((solution) => (
                        <article key={solution.title} className={`home-solution home-solution--${solution.tone}`}>
                            <img
                                className="home-solution-media"
                                src={solution.image.src}
                                alt={solution.image.alt}
                                width={1200}
                                height={520}
                                loading="lazy"
                            />
                            <div className="home-solution-body">
                                <p className="home-solution-eyebrow">{solution.eyebrow}</p>
                                <h3>
                                    {solution.href ? <Link href={solution.href}>{solution.title}</Link> : solution.title}
                                </h3>
                                <p>{solution.body}</p>
                                {solution.href ? (
                                    <span className="home-solution-more" aria-hidden="true">
                                        Explore &#8594;
                                    </span>
                                ) : null}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

/** The design's seven categories, from `shopCategories`. */
export function HomeCategories() {
    return (
        <section className="home-section home-section--grey" aria-labelledby="home-categories-title">
            <div className="wrap">
                <SectionHead
                    id="home-categories-title"
                    eyebrow="Shop by category"
                    title="Everything your team cleans with."
                    link={{ href: "/products", label: "View all categories" }}
                />
                <ul className="home-categories">
                    {shopCategories.map((category) => (
                        <li key={category.label}>
                            <Link className="home-category" href={shopCategoryHref(category)}>
                                {/* Empty alt: the name beneath says the same thing. */}
                                <img
                                    className="home-category-media"
                                    src={category.image}
                                    alt=""
                                    width={360}
                                    height={300}
                                    loading="lazy"
                                />
                                <span className="home-category-name">{category.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

/**
 * The design calls this row "Best sellers". The catalogue carries no sales
 * ranking, so it is not labelled as one -- these are the first products in the
 * collection, and the heading says only what is true of them.
 */
export function HomeProducts({ products }: { products: ProductModel[] }) {
    if (!products.length) return null;

    return (
        <section className="home-section" aria-labelledby="home-products-title">
            <div className="wrap">
                <SectionHead
                    id="home-products-title"
                    eyebrow="Shop online"
                    title="Ready to order today."
                    link={{ href: "/products", label: "Shop all products" }}
                />
                <div className="home-products">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} showWishlist showActions />
                    ))}
                </div>
            </div>
        </section>
    );
}

export function HomeIndustries() {
    return (
        <section className="home-section home-section--dark" aria-labelledby="home-industries-title">
            <div className="wrap">
                <SectionHead
                    id="home-industries-title"
                    eyebrow="Industries we serve"
                    title="Built for spaces that never get a day off."
                    tone="dark"
                />
                <ul className="home-industries">
                    {homeIndustries.map((industry) => (
                        <li key={industry.name}>
                            {/* Empty alt: the name beneath says the same thing. */}
                            <img
                                className="home-industry-media"
                                src={industry.image}
                                alt=""
                                width={400}
                                height={280}
                                loading="lazy"
                            />
                            <span className="home-industry-name">{industry.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export function HomeReasons() {
    return (
        <section className="home-section" aria-labelledby="home-reasons-title">
            <div className="wrap home-reasons">
                <div className="home-reasons-intro">
                    <p className="home-eyebrow">Why choose AE India</p>
                    <h2 id="home-reasons-title">One partner for every space you manage.</h2>
                    <p>
                        For over 15 years, AE India has supplied businesses and homes across India with dependable
                        facility products and service that continues after delivery.
                    </p>
                    <Link className="home-link" href="/about-us">
                        About AE India <span aria-hidden="true">&#8594;</span>
                    </Link>
                </div>
                <div className="home-reasons-grid">
                    {homeReasons.map((reason) => (
                        <div key={reason.title} className="home-reason">
                            <h3>{reason.title}</h3>
                            <p>{reason.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * The dealer and bulk-quote bands. Neither has a flow of its own yet, so both
 * go to the contact page; the phone number comes from the company details.
 */
export function HomeCallouts() {
    const company = getCompany();
    const shortPhone = company.phoneDisplay.replace(/^\+91\s*/, "");

    return (
        <section className="home-callouts-section" aria-label="Dealers and bulk orders">
            <div className="wrap home-callouts">
                <div className="home-callout home-callout--navy">
                    <p className="home-eyebrow home-eyebrow--dark">Dealer program</p>
                    <h2>Join the biggest dealer program in the cleaning industry.</h2>
                    <p>Partner with 100+ dealers selling AE India&apos;s range across the country.</p>
                    <Link className="home-btn home-btn--white" href="/contact-us">
                        Join Now
                    </Link>
                </div>
                <div className="home-callout home-callout--teal">
                    <p className="home-eyebrow home-eyebrow--teal">Bulk quotation</p>
                    <h2>Need supplies for a whole facility?</h2>
                    <p>
                        Send your requirement list and get a consolidated quote
                        {company.telHref ? (
                            <>
                                {" "}— or call <a href={`tel:${company.telHref}`}>{shortPhone}</a>
                            </>
                        ) : null}
                        .
                    </p>
                    <Link className="home-btn home-btn--white" href="/contact-us">
                        Request a Quote
                    </Link>
                </div>
            </div>
        </section>
    );
}
