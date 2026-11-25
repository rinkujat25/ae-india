/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { WishlistButton } from "@/components/product/WishlistButton";
import { staticProductDetail } from "@/constants/productDetail";
import type { ProductModel, ProductVariantSummaryModel } from "@/types/models/product.model";

/**
 * One product card, shared by the catalogue listing and the Similar Products
 * rail. Its styles live in `ProductCardStyles`, which both pages load.
 *
 * The variant strip and the wishlist button are opt-in: the listing shows both,
 * the Similar rail neither, and neither is part of what makes a card a card.
 */
type ProductCardProps = {
    product: ProductModel;
    showVariants?: boolean;
    showWishlist?: boolean;
    /**
     * Add to Cart and Quote under the price, as the AE India shop design draws
     * them. Opt-in like the other extras: the home page and the listings pass
     * it, the detail page's rails do not.
     */
    showActions?: boolean;
};

export function productHref(product: ProductModel) {
    return product.slug ? `/products/${product.slug}` : `/products/${staticProductDetail.slug}`;
}

export function productDiscount(product: ProductModel) {
    if (!product.mrp || !product.price || product.mrp <= product.price) {
        return 0;
    }

    return Math.round(((product.mrp - product.price) / product.mrp) * 100);
}

function formatMoney(value: number) {
    return new Intl.NumberFormat("en-IN").format(value);
}

function Price({ product }: { product: ProductModel }) {
    if (!product.price) {
        return <p className="p-price">Price on request</p>;
    }

    return (
        <p className="p-price">
            ₹{formatMoney(product.price)}
            {product.mrp > product.price ? <span>₹{formatMoney(product.mrp)}</span> : null}
        </p>
    );
}

function ProductVariantPreview({ variants }: { variants: ProductVariantSummaryModel[] }) {
    if (variants.length < 2) {
        return null;
    }

    const visibleVariants = variants.slice(0, 2);
    const remainingCount = variants.length - visibleVariants.length;

    return (
        <div className="variant-preview" aria-label={`${variants.length} product variants`}>
            <div className="variant-thumbnails">
                {visibleVariants.map((variant) =>
                    variant.slug ? (
                        <Link
                            className="variant-thumbnail"
                            href={`/products/${variant.slug}`}
                            aria-label={`View ${variant.name}`}
                            key={variant.id}
                        >
                            <img src={variant.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" />
                        </Link>
                    ) : (
                        <span className="variant-thumbnail" key={variant.id}>
                            <img src={variant.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" />
                        </span>
                    ),
                )}
            </div>
            {remainingCount > 0 ? <span className="variant-more">+{remainingCount}</span> : null}
        </div>
    );
}

/**
 * Orderable from the card: in stock, orderable, and priced. A back order needs
 * the detail page, which knows the one-unit cap; the listing model does not
 * carry `is_allow_back_orders`, so an out-of-stock product sends the visitor
 * there instead of guessing.
 */
function canAddFromCard(product: ProductModel) {
    return Boolean(product.id) && product.inStock && product.canOrder && product.price > 0;
}

export function ProductCard({ product, showVariants = false, showWishlist = false, showActions = false }: ProductCardProps) {
    const discount = productDiscount(product);
    const href = productHref(product);

    return (
        <article className="p-card">
            {showVariants ? <ProductVariantPreview variants={product.variants} /> : null}
            {discount ? <span className="off">{discount}% off</span> : null}
            {showWishlist ? (
                <WishlistButton productId={product.id} slug={product.slug} name={product.name} />
            ) : null}

            <Link className="p-link" href={href} aria-label={`View ${product.name}`}>
                <div className="p-media">
                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} loading="lazy" referrerPolicy="no-referrer" />
                    ) : (
                        <span className="no-img">No image</span>
                    )}
                </div>

                <div className="p-body">
                    <p className="brand">{product.brand || "AE India"}</p>
                    <h2>{product.name}</h2>
                    <Price product={product} />
                </div>
            </Link>

            {showActions ? (
                <div className="p-actions">
                    {canAddFromCard(product) ? (
                        <AddToCartButton
                            className="p-add"
                            productId={product.id}
                            price={product.price}
                            name={product.name}
                        />
                    ) : (
                        <Link className="p-add p-add--view" href={href}>
                            {product.inStock ? "View product" : "Out of stock"}
                        </Link>
                    )}
                    {/* No quote flow yet: enquiries go to the contact page. */}
                    <Link className="p-quote" href="/contact-us">
                        Quote
                    </Link>
                </div>
            ) : null}
        </article>
    );
}
