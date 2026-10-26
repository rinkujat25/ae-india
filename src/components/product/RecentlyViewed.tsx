"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import type { ProductModel } from "@/types/models/product.model";
import {
    readRecentlyViewed,
    recordRecentlyViewed,
    type RecentlyViewedProduct,
    toProductModel,
} from "@/utils/recently-viewed";

type RecentlyViewedProps = {
    /** The product being viewed: recorded on arrival and kept out of the rail. */
    current: RecentlyViewedProduct;
};

/**
 * Products this visitor has opened before, read from their own browser.
 *
 * It renders nothing on the server — the list only exists client-side — so the
 * rail appears after mount rather than risking a hydration mismatch.
 */
export function RecentlyViewed({ current }: RecentlyViewedProps) {
    const [products, setProducts] = useState<ProductModel[]>([]);

    /**
     * The caller passes a fresh object every render. Depending on it directly
     * re-ran this effect each time, and the cleanup cancelled the pending write
     * before it fired — nothing was ever recorded. The slug is the identity that
     * actually changes; the rest is read from a ref.
     */
    const currentRef = useRef(current);

    // Kept in an effect rather than assigned during render: writing a ref while
    // rendering is not allowed.
    useEffect(() => {
        currentRef.current = current;
    }, [current]);

    useEffect(() => {
        // Deferred: reading storage and setting state inline during an effect
        // makes React re-render in a cascade.
        const timeoutId = window.setTimeout(() => {
            const entry = currentRef.current;

            // Read before recording, so the product being viewed is not in its
            // own rail while still moving to the front for next time.
            const seen = readRecentlyViewed().filter((item) => item.slug !== entry.slug);

            setProducts(seen.map(toProductModel));
            recordRecentlyViewed(entry);
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, [current.slug]);

    return <ProductCarousel title="Recently viewed" titleId="recently-viewed-title" products={products} />;
}
