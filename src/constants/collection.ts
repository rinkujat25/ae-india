/**
 * The Hyperinventory collection(s) this store sells from, sent upstream as
 * `collection_ids`, comma-separated.
 *
 * **Empty for AE India.** The seller's whole catalogue is AE India's -- its own
 * storefront at aeindia.co reads `/consumer/sellers/{id}/products` with no
 * collection at all -- so no read is narrowed. The id that was here was the
 * previous store's ("Wingback Customer"), and under AE India's seller it
 * matched nothing.
 *
 * When this is empty the product service leaves `collection_ids` out of the
 * request entirely, and sorted reads go straight to the provider (it only
 * ignores `ordering` when a collection is present). Add an id here, once, to
 * hold every product read -- listing, category pages, home, Similar Products,
 * search suggestions -- to one collection again.
 */
export const storeCollectionIds: string[] = [];
