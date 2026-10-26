import type { ProductBrandModel } from "@/types/models/product-brand.model";
import type { ProductCategoryModel } from "./product-category.model";
import type { ProductPriceFilterModel } from "./product-price-filter.model";
import type { ProductTagModel } from "./product-tag.model";

export type ProductVariantSummaryModel = {
    id: string;
    name: string;
    imageUrl: string;
    slug: string;
};

export type ProductModel = {
    id: string;
    sku: string;
    name: string;
    brand: string;
    price: number;
    mrp: number;
    category: string;
    subCategory: string;
    imageUrl: string;
    slug: string;
    description: string;
    inStock: boolean;
    canOrder: boolean;
    variants: ProductVariantSummaryModel[];
};

export type ProductListModel = {
    products: ProductModel[];
    total: number;
    size: number;
    offset: number;
    brands: ProductBrandModel[];
    categories: ProductCategoryModel[];
    tags: ProductTagModel[];
    priceFilters: ProductPriceFilterModel[];
};
