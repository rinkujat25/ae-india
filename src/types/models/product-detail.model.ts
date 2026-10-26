import type { BoughtTogetherItemModel } from "@/types/models/bought-together.model";

export type ProductDetailMediaModel = {
    /**
     * `embed` is a YouTube link, which needs an iframe rather than a `<video>`;
     * `video` is a media file the browser can play directly.
     */
    type: "image" | "video" | "embed";
    src: string;
    alt: string;
    thumbnailUrl?: string;
};

export type ProductDetailVariantModel = {
    id: string;
    slug: string;
    imageUrl: string;
    attributes: Record<string, string>;
};

export type ProductDetailOptionGroupModel = {
    key: string;
    label: string;
    values: string[];
};

export type ProductDetailRelatedModel = {
    name: string;
    brand: string;
    price: number;
    imageUrl: string;
    slug: string;
};

export type ProductDetailDownloadModel = {
    type: string;
    name: string;
    url: string;
};

export type ProductDetailModel = {
    id: string;
    slug: string;
    brand: string;
    name: string;
    sku: string;
    gtin13: string;
    category: string;
    categorySlug: string;
    subCategory: string;
    color: string;
    material: string;
    price: number;
    mrp: number;
    availableStock: number | null;
    inStock: boolean;
    canOrder: boolean;
    /**
     * The seller accepts orders for this product while it is out of stock.
     * Such an order is capped at one unit — see `maxQuantity`.
     */
    allowsBackOrders: boolean;
    /** Most units orderable in one go; null when nothing limits it. */
    maxQuantity: number | null;
    moq: number;
    quantityStep: number;
    oneLineDescription: string;
    /** Plain text, safe for meta descriptions, structured data and summaries. */
    description: string;
    /** Sanitised editor markup; empty when the source carried no formatting. */
    descriptionHtml: string;
    /** The seller's own <title>, empty when it has none so the page writes its own. */
    metaTitle: string;
    /** The seller's own meta description, empty when it has none. */
    metaDescription: string;
    /** The seller's search terms and alternative names for this product, deduplicated. */
    keywords: string[];
    images: string[];
    variants: ProductDetailVariantModel[];
    optionGroups: ProductDetailOptionGroupModel[];
    gifting: Array<[string, string]>;
    specs: Array<[string, string]>;
    media: ProductDetailMediaModel[];
    downloads: ProductDetailDownloadModel[];
    relatedProducts: ProductDetailRelatedModel[];
    /**
     * Companions for the "Frequently bought together" bundle, empty when the
     * provider reports none — which is every product in the catalogue today.
     */
    boughtTogether: BoughtTogetherItemModel[];
};
