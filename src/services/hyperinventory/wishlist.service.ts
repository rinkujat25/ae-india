import "server-only";

import { hyperinventoryRequest } from "@/services/hyperinventory/client";
import { getProductDetail } from "@/services/hyperinventory/product-detail.service";
import type { HyperinventoryWishlistDto } from "@/types/dto/hyperinventory/wishlist.dto";
import type { WishlistItemModel } from "@/types/models/wishlist.model";

/** Saved product slugs, newest last as the provider returns them. */
export async function getWishlistSlugs(accessToken: string): Promise<string[]> {
    const response = await hyperinventoryRequest<HyperinventoryWishlistDto>("consumer/wishlist", {
        apiVersion: "v1",
        accessToken,
    });

    return (response?.url_paths ?? []).filter((slug) => typeof slug === "string" && slug.length > 0);
}

/**
 * Saves a product and returns the wishlist as it now stands.
 *
 * The provider keys the add on the product's **id** but the list it keeps — and
 * the delete below — on the product's **slug**, so the two calls take different
 * identifiers for the same product. Adding something already saved is a no-op
 * that still answers the full list, so the caller can treat the response as the
 * new state either way.
 */
export async function addToWishlist(accessToken: string, productId: string): Promise<string[]> {
    const response = await hyperinventoryRequest<HyperinventoryWishlistDto>("consumer/wishlist", {
        apiVersion: "v1",
        accessToken,
        method: "POST",
        body: JSON.stringify({ product_id: productId }),
    });

    return (response?.url_paths ?? []).filter((slug) => typeof slug === "string" && slug.length > 0);
}

/**
 * Removes a product by **slug**, not id: the provider answers an id here with
 * "Product with URL path <id> not found for this seller".
 */
export async function removeFromWishlist(accessToken: string, slug: string): Promise<string[]> {
    const response = await hyperinventoryRequest<HyperinventoryWishlistDto>(
        `consumer/wishlist/${encodeURIComponent(slug)}`,
        {
            apiVersion: "v1",
            accessToken,
            method: "DELETE",
        },
    );

    return (response?.url_paths ?? []).filter((slug) => typeof slug === "string" && slug.length > 0);
}

/**
 * Expands wishlist slugs into product cards.
 *
 * The detail calls run in parallel and are settled individually: a product that
 * has since been delisted drops out of the list rather than failing the page.
 */
export async function getWishlistProducts(slugs: string[]): Promise<WishlistItemModel[]> {
    if (slugs.length === 0) return [];

    const results = await Promise.allSettled(slugs.map((slug) => getProductDetail(slug)));

    return results.flatMap((result, index) => {
        if (result.status !== "fulfilled") {
            // Expected drift rather than a failure: the product was delisted.
            console.warn(`Wishlist product unavailable: ${slugs[index]}`);

            return [];
        }

        const product = result.value;

        return [{
            slug: product.slug || slugs[index],
            name: product.name,
            brand: product.brand,
            imageUrl: product.images?.[0] ?? "",
            price: product.price,
            mrp: product.mrp,
        }];
    });
}
