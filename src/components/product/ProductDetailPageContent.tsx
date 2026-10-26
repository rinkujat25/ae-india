"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { BoughtTogether } from "@/components/product/BoughtTogether";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import type { ProductModel } from "@/types/models/product.model";
import type { HyperinventoryTemporaryCartResponseDto } from "@/types/dto/hyperinventory/cart.dto";
import type { ProductDetailModel } from "@/types/models/product-detail.model";
import { getTemporaryCartReference, notifyCartUpdated, saveTemporaryCartId } from "@/utils/cart-storage";

type AddCartResponse =
    | { mode: "guest"; cart: HyperinventoryTemporaryCartResponseDto }
    | { mode: "user"; cart: { id: string; totalItems: number } };

function formatMoney(value: number) {
    return `Rs. ${new Intl.NumberFormat("en-IN").format(value)}`;
}

function getDiscount(price: number, mrp: number) {
    if (!price || !mrp || mrp <= price) {
        return 0;
    }

    return Math.round(((mrp - price) / mrp) * 100);
}

function findSpecValue(specs: Array<[string, string]>, keywords: string[]) {
    const normalizedKeywords = keywords.map((keyword) => keyword.toLowerCase());

    return specs.find(([label]) => {
        const normalizedLabel = label.toLowerCase();
        return normalizedKeywords.some((keyword) => normalizedLabel.includes(keyword));
    })?.[1] ?? "";
}

export function ProductDetailPageContent({
    product,
    similarProducts,
}: {
    product: ProductDetailModel;
    similarProducts: ProductModel[];
}) {
    const router = useRouter();
    const apiRequest = useApiRequest();
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWished, setIsWished] = useState(false);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number } | null>(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [cartError, setCartError] = useState("");
    const lightboxRef = useRef<HTMLDialogElement | null>(null);

    const discount = getDiscount(product.price, product.mrp);
    // The provider leaves the price at zero for anything quoted per programme,
    // which is most of this catalogue.
    const hasPrice = product.price > 0;
    const selectedVariant = product.variants.find((variant) => variant.slug === product.slug);
    const selectedAttributes = selectedVariant?.attributes ?? {};
    const selectedColor = (
        Object.entries(selectedAttributes).find(([key]) =>
            ["color", "colors", "colour", "colours"].includes(key.toLowerCase()),
        )?.[1] ?? product.color
    ) || "Default";
    const imageCount = product.media.filter((item) => item.type === "image").length;
    const videoCount = product.media.filter((item) => item.type === "video" || item.type === "embed").length;
    const lineTotal = useMemo(() => quantity * product.price, [product.price, quantity]);
    // Out of stock, but the seller takes back orders: still orderable, capped at
    // one unit, and not described as unavailable.
    const isBackOrder = product.allowsBackOrders && !product.inStock;
    const exceedsMaxQuantity = product.maxQuantity !== null && quantity > product.maxQuantity;
    const canAddToCart = (product.inStock || isBackOrder) && product.canOrder && !exceedsMaxQuantity;
    /**
     * Nothing can be added at any quantity. Distinct from `!canAddToCart`,
     * which is also false when the quantity alone is too high -- that is a
     * number to change, not an unavailable product.
     */
    const isUnavailable = !(product.inStock || isBackOrder) || !product.canOrder;
    const activeImage = product.images[activeImageIndex] ?? product.images[0] ?? selectedVariant?.imageUrl ?? "";
    const activeMedia = product.media[lightboxIndex] ?? product.media[0];
    const titleSummary = product.oneLineDescription || product.description;
    const shouldCollapseSummary = titleSummary.length > 140;
    const visibleTitleSummary =
        shouldCollapseSummary && !isSummaryOpen ? `${titleSummary.slice(0, 140).trim()}...` : titleSummary;
    const descriptionContent = product.description || product.oneLineDescription;
    // Already sanitised in the mapper, on the server: attributes are stripped and
    // only formatting tags survive, so nothing from the feed can execute here.
    const descriptionHtml = product.descriptionHtml;
    const productsInBox = [
        ["Included Components", findSpecValue(product.specs, ["included", "component", "in box"])],
        ["Quantity", findSpecValue(product.specs, ["pack", "quantity"])],
    ].filter(([, value]) => value);
    const hasProductInfo = Boolean(descriptionContent || product.specs.length || productsInBox.length);

    function syncQuantity(nextQuantity: number) {
        const requested = Math.max(1, nextQuantity || 1);

        setQuantity(product.maxQuantity !== null ? Math.min(requested, product.maxQuantity) : requested);
    }

    async function handleAddToCart() {
        if (isAddingToCart || !canAddToCart) {
            return;
        }

        setIsAddingToCart(true);
        setCartError("");

        try {
            const temporaryCartId = getTemporaryCartReference()?.temporaryCartId;
            const response = await apiRequest<AddCartResponse>("/api/cart/items", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    productId: selectedVariant?.id || product.id,
                    quantity,
                    applicableAmount: product.price,
                    temporaryCartId,
                }),
            });

            // Only a guest cart has an id worth keeping in this browser; a
            // signed-in cart lives against the buyer company on the server.
            if (response.mode === "guest") {
                saveTemporaryCartId(response.cart.sales_channel_id, response.cart.temporary_cart_id);
            } else {
                notifyCartUpdated();
            }

            router.push("/cart");
        } catch (error) {
            setCartError(error instanceof Error ? error.message : "We could not add this product to your cart. Please try again.");
        } finally {
            setIsAddingToCart(false);
        }
    }

    function selectVariantOption(attributeKey: string, attributeValue: string) {
        const requestedAttributes = {
            ...selectedAttributes,
            [attributeKey]: attributeValue,
        };
        const exactVariant = product.variants.find((variant) =>
            product.optionGroups.every(
                (group) => variant.attributes[group.key] === requestedAttributes[group.key],
            ),
        );
        const compatibleVariants = product.variants.filter(
            (variant) => variant.attributes[attributeKey] === attributeValue,
        );
        const closestVariant = [...compatibleVariants].sort((left, right) => {
            const score = (variant: typeof left) =>
                Object.entries(requestedAttributes).filter(
                    ([key, value]) => key !== attributeKey && variant.attributes[key] === value,
                ).length;

            return score(right) - score(left);
        })[0];
        const targetVariant = exactVariant ?? closestVariant;

        if (targetVariant && targetVariant.slug !== product.slug) {
            router.push(`/products/${targetVariant.slug}`);
        }
    }

    function openLightbox(index: number) {
        setLightboxIndex(index);
        lightboxRef.current?.showModal();
    }

    function closeLightbox() {
        lightboxRef.current?.close();
    }

    function moveLightbox(offset: number) {
        setLightboxIndex((current) => (current + offset + product.media.length) % product.media.length);
    }

    function updateZoomPosition(event: MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100));
        const y = Math.min(100, Math.max(0, ((event.clientY - rect.top) / rect.height) * 100));

        setZoomPosition({ x, y });
    }

    return (
        <div className="product-detail-page">
            <div className="wrap">
                <Breadcrumbs
                    trail={[
                        { label: "Products", href: "/products" },
                        ...(product.category
                            ? [{ label: product.category, href: `/category/${product.categorySlug}` }]
                            : []),
                        { label: product.name },
                    ]}
                />

                <section className="pdp-title-block">
                    <p className="brandline">
                        By <Link href={`/products?brands=${encodeURIComponent(product.brand)}`}>{product.brand}</Link>
                    </p>
                    <h1>{product.name}</h1>

                    {titleSummary ? (
                        <div className="title-summary">
                            <p>{visibleTitleSummary}</p>
                            {shouldCollapseSummary ? (
                                <button
                                    type="button"
                                    className="title-summary-toggle"
                                    onClick={() => setIsSummaryOpen((current) => !current)}
                                >
                                    {isSummaryOpen ? "View Less" : "View More"}
                                </button>
                            ) : null}
                        </div>
                    ) : null}
                </section>

                <main className="pdp">
                    <div className="pdp-gallery">
                        <div className="pdp-rail" role="tablist" aria-label="Product images">
                            {product.images.map((image, index) => (
                                <button
                                    className="pdp-thumb"
                                    type="button"
                                    role="tab"
                                    aria-current={activeImageIndex === index}
                                    aria-label={`View image ${index + 1}`}
                                    onClick={() => setActiveImageIndex(index)}
                                    key={image}
                                >
                                    <img src={image} alt="" loading="lazy" referrerPolicy="no-referrer" />
                                </button>
                            ))}
                        </div>
                        <div
                            className="pdp-stage"
                            onMouseEnter={updateZoomPosition}
                            onMouseMove={updateZoomPosition}
                            onMouseLeave={() => setZoomPosition(null)}
                        >
                            <button
                                className="pdp-wish"
                                type="button"
                                aria-pressed={isWished}
                                aria-label="Save to wishlist"
                                onClick={() => setIsWished((current) => !current)}
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
                                </svg>
                            </button>
                            {activeImage ? (
                                <img
                                    src={activeImage}
                                    alt={`${product.name}, ${selectedColor}`}
                                    width="700"
                                    height="700"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <span className="no-img">No image</span>
                            )}
                            {activeImage && zoomPosition ? (
                                <>
                                    <span
                                        className="zoom-lens"
                                        aria-hidden="true"
                                        style={{
                                            left: `${zoomPosition.x}%`,
                                            top: `${zoomPosition.y}%`,
                                        }}
                                    />
                                    <div
                                        className="zoom-panel"
                                        aria-hidden="true"
                                        style={{
                                            backgroundImage: `url("${activeImage}")`,
                                            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                        }}
                                    />
                                </>
                            ) : null}
                            <span className="zoom-note">
                                {activeImageIndex + 1} / {product.images.length}
                            </span>
                        </div>
                    </div>

                    <div className="detail">
                        <div className="meta-row">
                            <span>
                                SKU <b>{product.sku}</b>
                            </span>
                            {product.category ? (
                                <span>
                                    Category <b>{product.category}</b>
                                </span>
                            ) : null}
                            {product.subCategory ? (
                                <span>
                                    Sub-category <b>{product.subCategory}</b>
                                </span>
                            ) : null}
                        </div>

                        <div className="price-block">
                            {/* A zero price is the seller saying the rate is
                                arranged, not that the product is free. Rendering
                                it as "Rs. 0" told the buyer the second, so a
                                product without a price asks for the enquiry that
                                would produce one instead. */}
                            <p className="price-label">{hasPrice ? "Price per unit" : "Price on request"}</p>
                            {/* "Get a price", not "Request a quote": the buy box
                                below already offers "Request a quote for bulk",
                                and two identically worded buttons on one screen
                                make the reader stop and choose between them. */}
                            {hasPrice ? (
                                <div className="price">
                                    <b>{formatMoney(product.price)}</b>
                                    {/* Only when there is a reduction to show. A
                                        struck-through price identical to the one
                                        beside it reads as a discount that is not
                                        there. The card already gated this the same
                                        way; the detail page did not. */}
                                    {product.mrp > product.price ? <s>{formatMoney(product.mrp)}</s> : null}
                                    {discount ? <span className="off">{discount}% off</span> : null}
                                </div>
                            ) : (
                                <a
                                    className="btn btn-primary price-enquiry"
                                    href="#start"
                                    data-open-form
                                    data-enquiry-note={`Price request: ${product.name}${product.sku ? ` (SKU ${product.sku})` : ""}`}
                                >
                                    Get a price &rarr;
                                </a>
                            )}
                            <p className="price-note">
                                {hasPrice
                                    ? "Exclusive of GST. Program pricing depends on volume, branding scope and delivery geography, confirmed in your campaign quote."
                                    : "This product is quoted per programme. Tell us the headcount, branding and delivery geography and we will come back with a rate."}
                            </p>
                        </div>

                        {product.optionGroups.length ? (
                            <div className="variant-options">
                                {product.optionGroups.map((group) => (
                                    <fieldset className="variant-group" key={group.key}>
                                        <legend>{group.label}</legend>
                                        <div className="variant-values">
                                            {group.values.map((value) => (
                                                <button
                                                    className="variant-value"
                                                    type="button"
                                                    aria-pressed={selectedAttributes[group.key] === value}
                                                    onClick={() => selectVariantOption(group.key, value)}
                                                    key={value}
                                                >
                                                    {value}
                                                </button>
                                            ))}
                                        </div>
                                    </fieldset>
                                ))}
                            </div>
                        ) : null}

                        <div className="opt">
                            <p className="opt-label">Quantity</p>
                            <div className="qty-wrap">
                                <div className="qty">
                                    <button
                                        type="button"
                                        aria-label="Decrease quantity"
                                        disabled={quantity <= 1}
                                        onClick={() => syncQuantity(quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min={1}
                                        max={product.maxQuantity ?? undefined}
                                        step={1}
                                        value={quantity}
                                        aria-label="Quantity"
                                        onChange={(event) => syncQuantity(Number(event.target.value))}
                                    />
                                    <button
                                        type="button"
                                        aria-label="Increase quantity"
                                        disabled={product.maxQuantity !== null && quantity >= product.maxQuantity}
                                        onClick={() => syncQuantity(quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                {/* Without a unit price this only ever reads
                                    "Rs. 0 at this quantity". */}
                                {hasPrice ? (
                                    <span className="moq">
                                        {formatMoney(lineTotal)} at this quantity
                                    </span>
                                ) : null}
                            </div>
                        </div>

                        <span className={`avail${canAddToCart ? "" : " unavailable"}`}>
                            <i /> {isBackOrder
                                ? "Available on back order - one per order"
                                : canAddToCart
                                  ? product.availableStock !== null
                                      ? `${product.availableStock} available`
                                      : "Available to order"
                                  : "Out of stock"}
                        </span>
                        <div className="cta-row">
                            <button
                                className="btn btn-primary"
                                type="button"
                                disabled={isAddingToCart || !canAddToCart}
                                onClick={handleAddToCart}
                            >
                                {/* `isUnavailable`, not `!canAddToCart`: the
                                    latter is also false when only the quantity
                                    is too high, which is not "out of stock". */}
                                {isAddingToCart ? "Adding..." : isUnavailable ? "Out of stock" : "Add to cart →"}
                            </button>
                            <Link className="btn btn-soft" href="/contact-us">
                                Request a quote for bulk
                            </Link>
                        </div>
                        {cartError ? <p className="cart-error" role="alert">{cartError}</p> : null}

                        {product.gifting.length ? <section className="gifting">
                            <h2>Gifting suitability</h2>
                            <dl>
                                {product.gifting.map(([label, value]) => (
                                    <div className="row" key={label}>
                                        <dt>{label}</dt>
                                        <dd className={value.startsWith("Yes") ? "yes" : undefined}>{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </section> : null}
                    </div>
                </main>

                {hasProductInfo ? <section className="product-info-sections" id="specs">
                    {descriptionContent ? <article className="info-section" id="description">
                        <h2>Description</h2>
                        {descriptionHtml ? (
                            <div
                                className="info-description info-description-rich"
                                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                            />
                        ) : (
                            <div className="info-description">
                                <p>{descriptionContent}</p>
                            </div>
                        )}
                    </article> : null}

                    {product.specs.length ? <article className="info-section spec-section">
                        <h2>Specifications</h2>
                        <p className="spec-sub">
                            Manufacturer data for {product.name}. Branding options and packaging are confirmed per program.
                        </p>
                        <div className="spec-info-grid">
                            {product.specs.map(
                                ([label, value]) => (
                                    <div className="spec-info-row" key={label}>
                                        <strong>{label}</strong>
                                        <span>{value}</span>
                                    </div>
                                ),
                            )}
                        </div>
                    </article> : null}

                    {productsInBox.length ? <article className="info-section spec-section">
                        <h2>Products In Box</h2>
                        <p className="spec-sub">
                            Included product and packaging details are confirmed from manufacturer data before dispatch.
                        </p>
                        <div className="spec-info-grid">
                            {productsInBox.map(([label, value]) => (
                                <div className="spec-info-row" key={label}>
                                    <strong>{label}</strong>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>
                    </article> : null}
                </section> : null}

                {product.media.length ? <section className="media" id="media">
                    <h2>Images and Videos</h2>
                    <p className="sub">{imageCount} images · {videoCount} videos · supplied by the brand</p>
                    <div className="aplus">
                        {product.media.map((item, index) => (
                            <figure
                                tabIndex={0}
                                role="button"
                                aria-label={`Enlarge: ${item.alt}`}
                                onClick={() => openLightbox(index)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                        event.preventDefault();
                                        openLightbox(index);
                                    }
                                }}
                                key={`${item.src}-${index}`}
                            >
                                {item.type === "embed" ? (
                                    <iframe
                                        src={item.src}
                                        title={item.alt}
                                        loading="lazy"
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : item.type === "video" ? (
                                    <video src={item.src} poster={item.thumbnailUrl} controls playsInline preload="metadata" aria-label={item.alt} />
                                ) : (
                                    <img src={item.src} alt={item.alt} loading="lazy" referrerPolicy="no-referrer" />
                                )}
                            </figure>
                        ))}
                    </div>
                    {!videoCount ? <div className="media-note"><p><b>No product video yet.</b> Brand content is supplier-supplied.</p></div> : null}
                </section> : null}

                {product.downloads.length ? (
                    <section className="download-assets" aria-labelledby="download-assets-title">
                        <h2 id="download-assets-title">Downloadable Assets</h2>
                        <div className="download-assets-list">
                            {product.downloads.map((download, index) => (
                                <a
                                    className="download-asset"
                                    href={download.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    key={`${download.type}-${download.url}-${index}`}
                                >
                                    <span>
                                        <strong>{download.type}</strong>
                                        {download.name !== download.type ? <small>{download.name}</small> : null}
                                    </span>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 14v5h14v-5" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </section>
                ) : null}

                {/* Hidden entirely when the provider reports no companions:
                    the page's own product alone is not a bundle. */}
                {product.boughtTogether.length ? (
                    <BoughtTogether
                        items={[
                            {
                                id: product.id,
                                name: product.name,
                                slug: product.slug,
                                imageUrl: product.images[0] ?? "",
                                price: product.price,
                                mrp: product.mrp,
                                isCurrent: true,
                            },
                            ...product.boughtTogether,
                        ]}
                    />
                ) : null}

                <ProductCarousel
                    title="Similar Products"
                    titleId="similar-products-title"
                    products={similarProducts}
                    seeAllHref={
                        product.category
                            ? `/products?categories=${encodeURIComponent(product.category)}`
                            : "/products"
                    }
                />
                <RecentlyViewed
                    current={{
                        id: product.id,
                        slug: product.slug,
                        name: product.name,
                        brand: product.brand,
                        sku: product.sku,
                        price: product.price,
                        mrp: product.mrp,
                        imageUrl: product.images[0] ?? "",
                    }}
                />

                {product.relatedProducts.length ? <section className="related">
                    <h2>Others at this budget tier</h2>
                    <div className="rel-grid">
                        {product.relatedProducts.map((related) => (
                            <Link className="rel" href={`/products/${related.slug}`} key={related.name}>
                                <div className="rel-media">
                                    <img src={related.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" />
                                </div>
                                <div className="rel-body">
                                    <span className="rel-brand">{related.brand}</span>
                                    <h3>{related.name}</h3>
                                    <b>{formatMoney(related.price)}</b>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section> : null}
            </div>

            <dialog
                className="lightbox"
                ref={lightboxRef}
                aria-label="Media viewer"
                onClick={(event) => {
                    if (event.target === lightboxRef.current) {
                        closeLightbox();
                    }
                }}
            >
                <div className="lb-card">
                    <button className="lb-close" type="button" aria-label="Close viewer" onClick={closeLightbox}>
                        x
                    </button>
                    <div className="lb-stage">
                        {activeMedia?.type === "embed" ? (
                            <iframe
                                src={`${activeMedia.src}?autoplay=1`}
                                title={activeMedia.alt}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : activeMedia?.type === "video" ? (
                            <video
                                src={activeMedia.src}
                                poster={activeMedia.thumbnailUrl}
                                controls
                                autoPlay
                                playsInline
                                aria-label={activeMedia.alt}
                            />
                        ) : activeMedia ? (
                            <img
                                src={activeMedia.src}
                                alt={activeMedia.alt}
                                referrerPolicy="no-referrer"
                            />
                        ) : null}
                    </div>
                    <div className="lb-bar">
                        <span>
                            Media {lightboxIndex + 1} of {product.media.length}
                        </span>
                        <span className="lb-nav">
                            <button type="button" onClick={() => moveLightbox(-1)}>
                                ← Prev
                            </button>
                            <button type="button" onClick={() => moveLightbox(1)}>
                                Next →
                            </button>
                        </span>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
