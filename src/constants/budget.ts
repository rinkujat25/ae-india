import type { HyperinventoryPriceRangeDto } from "@/types/dto/hyperinventory/product.dto";

/** The per-recipient budget this store runs on, in rupees. */
export const budgetFloor = 1000;
export const budgetCeiling = 3000;

/**
 * The selling-price window every catalogue read is held to.
 *
 * Wingback sets the budget, so the home page shelf and the product listing
 * show what a recipient can actually claim and nothing else. It lives here
 * rather than inside either of them because both ask the provider for the
 * same window, and a band that drifted between the two would put gifts on the
 * listing that the store cannot deliver.
 *
 * It doubles as the "has a price" filter: a priced band excludes products
 * with no selling price, whose card falls back to "Price on request".
 *
 * Both bounds are sent, not just the floor that matters here. A band carrying
 * only a lower bound -- `selling_price=[{"gte":1000}]` -- is answered with a
 * **409**, so the read fails and the page renders its empty state.
 */
export const budgetPriceRanges: HyperinventoryPriceRangeDto[] = [
    // The Rs. 1,000 to Rs. 3,000 band is switched off for now: every read is
    // unfiltered by price. An empty list sends no `selling_price` at all, so
    // the listing, the category pages and the home shelf all show the whole
    // collection. Uncomment the line below to hold them to the budget again.
    // { from: budgetFloor, to: budgetCeiling },
];
