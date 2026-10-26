import type { ProductModel } from "@/types/models/product.model";
import { productDiscount } from "@/components/product/ProductCard";

/**
 * Product sorting, shared by the catalogue listing and the category page so
 * the same options mean the same thing on both.
 */
export type SortKey = "latest" | "price-asc" | "price-desc" | "discount" | "name-asc";

export const sortLabels: Record<SortKey, string> = {
    latest: "Latest Products",
    "price-asc": "Price low to high",
    "price-desc": "Price high to low",
    discount: "Discount",
    "name-asc": "Name A-Z",
};

export function sortProducts(products: ProductModel[], sort: SortKey) {
    const sortedProducts = [...products];

    if (sort === "price-asc") {
        return sortedProducts.sort((left, right) => (left.price || Number.MAX_SAFE_INTEGER) - (right.price || Number.MAX_SAFE_INTEGER));
    }

    if (sort === "price-desc") {
        return sortedProducts.sort((left, right) => right.price - left.price);
    }

    if (sort === "discount") {
        return sortedProducts.sort((left, right) => productDiscount(right) - productDiscount(left));
    }

    if (sort === "name-asc") {
        return sortedProducts.sort((left, right) => left.name.localeCompare(right.name, "en", { sensitivity: "base" }));
    }

    return sortedProducts;
}
