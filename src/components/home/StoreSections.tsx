/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/services/hyperinventory/product.service";
import type { ProductModel } from "@/types/models/product.model";

/** Six gifts is one tidy row of three, twice over, and keeps the page short. */
const storeProductCount = 6;

/** Ten minutes: a shop window, not a stock report, and it keeps the page static. */
const revalidateSeconds = 600;

/**
 * The budget this store runs on: gifts from Rs. 1,000 to Rs. 3,000.
 *
 * The band does two jobs. It keeps the shelf inside the per-recipient budget,
 * so nothing on the page is something the reader cannot actually claim. And
 * because a priced band excludes products with no selling price, it also keeps
 * out the "Price on request" tiles -- the right answer on the listing, where a
 * quote is a normal next step, but a contradiction on a page whose whole
 * message is that the gift is already paid for.
 *
 * The provider applies it, not this code, so the page still gets a full six.
 * Filtering the fetched array instead would leave a short row whenever one of
 * the six fell outside the band.
 *
 * Both bounds are required, not just the one that matters here: a band with
 * only a lower bound -- `selling_price=[{"gte":1000}]` -- is answered with
 * **409**, so the fetch fails and the shelf empties.
 */
const budgetBand = [{ from: 1000, to: 3000 }];

/**
 * The gifts shown on the home page.
 *
 * Fetched once in the page and shared between the hero and the grid, so the
 * product the hero points at is one that is actually on the page. A provider
 * outage empties the shelf rather than failing the route -- the sections below
 * each render a plain fallback.
 */
export async function loadStoreProducts(): Promise<ProductModel[]> {
    try {
        const { products } = await getProducts(
            { size: storeProductCount, priceRanges: budgetBand },
            revalidateSeconds,
        );

        return products;
    } catch (error) {
        console.error(
            "Unable to load the home page gifts:",
            error instanceof Error ? error.message : "Unknown error",
        );

        return [];
    }
}

export function StoreAnnouncement() {
    return (
        <div className="store-announce">
            <div className="wrap">
                <p>
                    <b>One gift each, on the company.</b> Pick yours and we will deliver it.
                </p>
                <span className="announce-tag">The Wingback edit</span>
            </div>
        </div>
    );
}

export function StoreHero({ featured }: { featured?: ProductModel }) {
    return (
        <section className="store-hero wrap" aria-labelledby="hero-title">
            <div className="hero-copy">
                <p className="store-eyebrow">
                    <span className="star">&#10022;</span> A small store. Good things.
                </p>
                <h1 id="hero-title">
                    Your gift.
                    <br />
                    <em>Your choice.</em>
                </h1>
                <p>
                    Wingback picked the budget. You pick the gift. Browse the edit, choose the one
                    you actually want, and tell us where to send it.
                </p>
                <Link className="store-cta" href="/products">
                    Find your gift <span aria-hidden="true">&#8594;</span>
                </Link>
                <div className="hero-footnote">
                    <span className="mini-line" /> Chosen by you. Delivered to your door.
                </div>
            </div>

            <div className="hero-art">
                <span className="art-note">
                    Your next
                    <br />
                    good thing.
                </span>
                {featured?.imageUrl ? (
                    <img
                        src={featured.imageUrl}
                        alt={featured.name}
                        referrerPolicy="no-referrer"
                        fetchPriority="high"
                    />
                ) : null}
                {featured ? (
                    <Link
                        className="hero-product"
                        href={featured.slug ? `/products/${featured.slug}` : "/products"}
                    >
                        <span className="hero-product-copy">
                            <span className="label">In the edit this week</span>
                            <strong>{featured.name}</strong>
                        </span>
                        <span className="go" aria-hidden="true">
                            &#8594;
                        </span>
                    </Link>
                ) : null}
            </div>
        </section>
    );
}

export function StoreProductsSection({ products }: { products: ProductModel[] }) {
    return (
        <section className="store-section wrap" id="gifts" aria-labelledby="gifts-title">
            <div className="store-section-head">
                <div>
                    <p className="store-eyebrow">Less scrolling. More finding.</p>
                    <h2 id="gifts-title">A few good things.</h2>
                </div>
                <p>Pick your favourite.</p>
            </div>

            {products.length ? (
                <>
                    <div className="store-grid">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} showWishlist />
                        ))}
                    </div>
                    <div className="store-foot">
                        <p>Prices include taxes. Your budget is applied at checkout.</p>
                        <Link className="store-link" href="/products">
                            Browse every gift <span aria-hidden="true">&#8594;</span>
                        </Link>
                    </div>
                </>
            ) : (
                <div className="store-foot">
                    <p>The catalogue is not reachable right now.</p>
                    <Link className="store-link" href="/products">
                        Try the full catalogue <span aria-hidden="true">&#8594;</span>
                    </Link>
                </div>
            )}
        </section>
    );
}

export function StoreEditSection() {
    return (
        <section className="store-edit wrap" aria-labelledby="edit-title">
            <div className="edit-symbol" aria-hidden="true">
                &#10038;
            </div>
            <div>
                <p className="store-eyebrow">The beauty of keeping it small</p>
                <h2 id="edit-title">
                    Fewer things.
                    <br />
                    More thought.
                </h2>
            </div>
            <p>
                Every gift here was chosen for the days it has to survive — the desk, the commute,
                the slow Sunday morning. A short list, so picking one is easy.
            </p>
            <Link className="store-link" href="/products">
                Explore the edit <span aria-hidden="true">&#8594;</span>
            </Link>
        </section>
    );
}

export function StoreNotesSection() {
    return (
        <section className="store-notes wrap" aria-label="How the store works">
            <article>
                <svg className="icon" aria-hidden="true">
                    <use href="#i-store" />
                </svg>
                <div>
                    <h3>One simple cart</h3>
                    <p>Add what you like, review it together, confirm once.</p>
                </div>
            </article>
            <article>
                <svg className="icon" aria-hidden="true">
                    <use href="#i-truck" />
                </svg>
                <div>
                    <h3>Delivered to you</h3>
                    <p>Your address, not your office. Tracked pan-India.</p>
                </div>
            </article>
            <article>
                <svg className="icon" aria-hidden="true">
                    <use href="#i-check" />
                </svg>
                <div>
                    <h3>Help along the way</h3>
                    <p>Something wrong with a delivery? Sampley sorts it out.</p>
                </div>
            </article>
        </section>
    );
}
