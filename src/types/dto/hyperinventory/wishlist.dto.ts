/** The wishlist stores slugs only; product data comes from the detail endpoint. */
export type HyperinventoryWishlistDto = {
    url_paths?: string[];
    created_at?: string;
    updated_at?: string;
};
