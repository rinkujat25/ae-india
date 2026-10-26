export type ProductSearchSuggestionModel = {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
    price: number;
    mrp: number;
};

export type ProductSearchSuggestionsModel = {
    products: ProductSearchSuggestionModel[];
    keywords: string[];
};
