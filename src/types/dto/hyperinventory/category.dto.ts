export type HyperinventoryCategoryDto = {
    id: string;
    name?: string;
    display_name?: string | null;
    description?: string | null;
    url_path?: string;
    parent_category?: string | null;
    position?: number;
    /**
     * Plain URLs, not objects — unlike `featured_images` on a product. The
     * detail endpoint returns `null` when a category has none.
     */
    category_images?: string[] | null;
    category_banners?: string[] | null;
    /** Present on the detail endpoint only, and routinely null. */
    meta_title?: string | null;
    meta_description?: string | null;
    search_keywords?: string[] | null;
};

export type HyperinventoryCategoryListDto = {
    count: number;
    next: string | null;
    previous: string | null;
    results: HyperinventoryCategoryDto[];
};
