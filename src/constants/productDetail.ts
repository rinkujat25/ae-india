import type { ProductDetailModel } from "@/types/models/product-detail.model";

const mediaBaseUrl =
    "https://media-assets.hyperinvento.com/companies/dce3e9fc-06be-4cc3-8fba-3b85f1f32e19/products/assetss/files/";

const imageNames = [
    "da7e82a3a06b43d6b29b2312c89a4383-product-assets.jpg",
    "d782a81c1f3d46948b87907e26c11c53-product-assets.jpg",
    "461cf7aa2e4d4ac3b5d20e9ac9bb9c66-product-assets.jpg",
    "e06443f3262c4da6b7a7e84c9693a3df-product-assets.jpg",
    "4ecefd863af1437f81e6506c6dccd837-product-assets.jpg",
    "ca65e7d7b8784bd5b51a934e5ee50f54-product-assets.jpg",
];

const images = imageNames.map((name) => `${mediaBaseUrl}${name}`);

export const staticProductDetail: ProductDetailModel = {
    id: "aecooly-pocket-01-black",
    slug: "aecooly-foldable-handheld-fan-pocket-01-black",
    brand: "Aecooly",
    name: "Aecooly Foldable Handheld Fan - Pocket 01, Black",
    sku: "6977924930031",
    gtin13: "6977924930031",
    category: "Home, Kitchen & Festive",
    categorySlug: "home-kitchen-festive",
    subCategory: "Small appliances",
    color: "Black",
    material: "ABS",
    price: 1590,
    mrp: 1990,
    availableStock: null,
    inStock: true,
    canOrder: true,
    descriptionHtml: "",
    // Left empty on purpose: this stands in for a product the provider could not
    // return, so the page composes its own title and description rather than
    // presenting a placeholder's SEO copy as the real product's.
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    allowsBackOrders: false,
    maxQuantity: null,
    moq: 1,
    quantityStep: 1,
    oneLineDescription:
        "A pocket-sized folding fan that doubles as a desk stand with three speeds, 2000 mAh battery and up to 24 hours on low.",
    description:
        "A pocket-sized folding fan that doubles as a desk stand. Three speeds, 2000 mAh battery and up to 24 hours on low, in a body that folds to under five inches. Light, non-food and size-free, which makes it a safe pick at volume for mixed teams.",
    images,
    variants: [
        {
            id: "aecooly-pocket-01-black",
            slug: "aecooly-foldable-handheld-fan-pocket-01-black",
            imageUrl: images[0],
            attributes: { Color: "Black" },
        },
    ],
    optionGroups: [{ key: "Color", label: "Color", values: ["Black"] }],
    gifting: [
        ["Logo branding", "Yes - on body and outer box"],
        ["Needs a size from the recipient", "No"],
        ["Food item", "No - safe for mixed workforces"],
        ["Budget tier", "Rs. 1,000 - Rs. 2,500"],
        ["Delivery", "Pan-India, individual doorstep"],
        ["Dispatch lead time", "7 days - 12 with branding"],
    ],
    specs: [
        ["Battery capacity", "2000 mAh"],
        ["Charging time", "3-hour fast charging"],
        ["Usage time", "Low speed: up to 24 hours"],
        ["Speeds", "3"],
        ["Noise level", "55 dB"],
        ["Dimensions - folded", '4.72" x 1.81" x 1.08"'],
        ["Dimensions - extended", '8.39" x 1.81" x 1.08"'],
        ["Weight", "3.77 oz (107 g)"],
        ["Body material", "ABS"],
        ["Fan blade material", "TPE"],
        ["Country of origin", "China"],
    ],
    media: [
        { type: "image", src: images[0], alt: "Pocket 01 handheld fan - product banner" },
        { type: "image", src: images[1], alt: "Pocket 01 handheld fan - charging and battery detail" },
        { type: "image", src: images[2], alt: "Pocket 01 handheld fan - blue variant" },
        { type: "image", src: images[3], alt: "Pocket 01 handheld fan - white variant" },
        { type: "image", src: images[4], alt: "Pocket 01 handheld fan - desk stand use" },
        { type: "image", src: images[5], alt: "Pocket 01 handheld fan - compact foldable design" },
        {
            type: "image",
            src: `${mediaBaseUrl}385f42596d7048da93d585da9ee2d391-product-assets.jpg`,
            alt: "Pocket 01 handheld fan - feature detail",
        },
        {
            type: "image",
            src: `${mediaBaseUrl}68bab8bb06754e4592fcdef438c01d8a-product-assets.jpg`,
            alt: "Pocket 01 handheld fan - comparison detail",
        },
        {
            type: "image",
            src: `${mediaBaseUrl}306759ce1f344ae092557ccb3b8f4eb1-product-assets.jpg`,
            alt: "Pocket 01 handheld fan - dimensions and capacity",
        },
    ],
    downloads: [],
    relatedProducts: [
        { name: "Aecooly High Speed Table Fan - Chic 01, Beige", brand: "Aecooly", price: 5990, imageUrl: images[1], slug: "aecooly-high-speed-table-fan-chic-01-beige" },
        { name: "Aecooly Portable Handheld Fan - Aero Pro, Blue", brand: "Aecooly", price: 3790, imageUrl: images[2], slug: "aecooly-portable-handheld-fan-aero-pro-blue" },
        { name: "Aquaminder Smart Water Bottle, 770 ml", brand: "Aquaminder", price: 999, imageUrl: images[4], slug: "aquaminder-smart-water-bottle-770-ml" },
        { name: "Xech Rechargeable Torch USB-C, 4 Modes", brand: "Xech", price: 299, imageUrl: images[5], slug: "xech-rechargeable-torch-usb-c-4-modes" },
    ],
    boughtTogether: [],
};
