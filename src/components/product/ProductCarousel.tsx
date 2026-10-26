"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import type { ProductModel } from "@/types/models/product.model";

type ProductCarouselProps = {
    title: string;
    products: ProductModel[];
    /** Optional "See all" destination shown beside the arrows. */
    seeAllHref?: string;
    titleId: string;
};

/** A nudge past rounding, so a scroll always clears the card it started on. */
const scrollEpsilon = 4;

/**
 * A horizontal rail of product cards with prev/next arrows.
 *
 * Shared by Similar Products and Recently viewed so both scroll and look the
 * same. The cards themselves are `ProductCard`, as on the catalogue listing.
 */
export function ProductCarousel({ title, products, seeAllHref, titleId }: ProductCarouselProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [canScrollBack, setCanScrollBack] = useState(false);
    const [canScrollOn, setCanScrollOn] = useState(false);

    /**
     * The arrows reflect the track rather than a card count: how many fit
     * depends on the viewport, so measuring is the only honest answer. With
     * everything already visible both arrows stay disabled.
     */
    const syncArrows = useCallback(() => {
        const track = trackRef.current;

        if (!track) return;

        const maxScroll = track.scrollWidth - track.clientWidth;

        setCanScrollBack(track.scrollLeft > scrollEpsilon);
        setCanScrollOn(track.scrollLeft < maxScroll - scrollEpsilon);
    }, []);

    useEffect(() => {
        const track = trackRef.current;

        if (!track) return undefined;

        // Deferred: measuring and setting state inline during an effect makes
        // React re-render in a cascade.
        const timeoutId = window.setTimeout(syncArrows, 0);

        track.addEventListener("scroll", syncArrows, { passive: true });
        window.addEventListener("resize", syncArrows);

        return () => {
            window.clearTimeout(timeoutId);
            track.removeEventListener("scroll", syncArrows);
            window.removeEventListener("resize", syncArrows);
        };
    }, [syncArrows, products.length]);

    function scrollByPage(direction: -1 | 1) {
        const track = trackRef.current;

        if (!track) return;

        // One viewport of cards at a time, so nothing is skipped over.
        track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
    }

    if (products.length === 0) return null;

    return (
        <section className="product-rail" aria-labelledby={titleId}>
            <div className="product-rail-heading">
                <h2 id={titleId}>{title}</h2>
                <div className="product-rail-controls">
                    <button
                        className="product-rail-arrow"
                        type="button"
                        onClick={() => scrollByPage(-1)}
                        disabled={!canScrollBack}
                        aria-label={`Show previous ${title.toLowerCase()}`}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M15 5l-7 7 7 7" />
                        </svg>
                    </button>
                    <button
                        className="product-rail-arrow"
                        type="button"
                        onClick={() => scrollByPage(1)}
                        disabled={!canScrollOn}
                        aria-label={`Show more ${title.toLowerCase()}`}
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    {seeAllHref ? <Link href={seeAllHref}>See all</Link> : null}
                </div>
            </div>

            <div className="product-rail-track" ref={trackRef}>
                {products.map((product) => (
                    <ProductCard product={product} key={product.id || product.slug} />
                ))}
            </div>
        </section>
    );
}
