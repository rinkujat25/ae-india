/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getProducts } from "@/services/hyperinventory/product.service";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import type { ProductModel } from "@/types/models/product.model";

/**
 * Ten products from the catalogue.
 *
 * These were hard-coded samples until the catalogue was wired up. There is no
 * selection rule yet — the first ten the listing returns are the ten shown —
 * so the query lives in one place here, ready for the keyword or category
 * filter to be dropped in later.
 *
 * The cards keep the home page's own `.home-product-card` look rather than the
 * catalogue's `ProductCard`: this is the marketing page, and the two designs
 * are deliberately different.
 */
const productCount = 10;

/** Ten minutes: a showcase, not a stock report, and it keeps the page static. */
const revalidateSeconds = 600;

async function loadProducts(): Promise<ProductModel[]> {
    try {
        const { products } = await getProducts({ size: productCount }, revalidateSeconds);

        return products;
    } catch (error) {
        // A provider outage drops this section rather than the whole page, but
        // only the provider's own failures qualify: Next signals things like
        // dynamic-usage by throwing too, and swallowing those hides real bugs.
        if (!(error instanceof HyperinventoryApiError)) throw error;

        console.error("home products failed to load", error);

        return [];
    }
}

function formatPrice(product: ProductModel) {
    if (!product.price) return "Price on request";

    return `₹${new Intl.NumberFormat("en-IN").format(product.price)}`;
}

export async function HomeProductsSection() {
    const products = await loadProducts();

    if (!products.length) return null;

    return (
        <section className="section home-products" aria-labelledby="home-products-title">
            <div className="wrap">
                <div className="section-head">
                    <div>
                        <span className="kicker">Popular gifts</span>
                        <h2 id="home-products-title">Products teams love to receive.</h2>
                    </div>
                    <Link className="home-products-view-all" href="/products">Browse all products</Link>
                </div>

                <div className="home-products-grid">
                    {products.map((product) => {
                        const href = `/products/${product.slug}`;

                        return (
                            <article className="home-product-card" key={product.id || product.slug}>
                                <Link className="home-product-image" href={href} aria-label={`View ${product.name}`}>
                                    {product.imageUrl ? (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            loading="lazy"
                                            referrerPolicy="no-referrer"
                                        />
                                    ) : (
                                        <span className="home-product-noimg">No image</span>
                                    )}
                                </Link>
                                <div className="home-product-body">
                                    <span>{product.brand || "Wingback"}</span>
                                    <h3><Link href={href}>{product.name}</Link></h3>
                                    <strong>{formatPrice(product)}</strong>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
