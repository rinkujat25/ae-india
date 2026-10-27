/**
 * The Hyperinventory collection this store sells from.
 *
 * The seller's catalogue is shared with other storefronts; this collection is
 * the slice of it that is Wingback's. Every product read is held to it --
 * the listing, the category pages, the home shelf, Similar Products and the
 * search suggestions -- so a gift outside it cannot be reached through any
 * door. It is applied inside the product service rather than by each caller,
 * so a new read cannot forget it.
 *
 * Sent upstream as `collection_ids`, comma-separated.
 */
export const storeCollectionIds = ["cdd65fdd-e2d7-4630-a151-4e9f88bfd8bb"];
