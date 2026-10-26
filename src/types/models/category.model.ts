export type CategoryModel = {
    id: string;
    /** The name the product API filters on — not the slug. */
    name: string;
    /** Shown to the reader; falls back to `name` when the provider has none. */
    label: string;
    slug: string;
    description: string;
    imageUrl: string;
    bannerUrl: string;
    /** The provider's own ordering; lower comes first. */
    position: number;
    /** Provider-authored SEO copy; empty when it has none, so the page writes its own. */
    metaTitle: string;
    metaDescription: string;
};
