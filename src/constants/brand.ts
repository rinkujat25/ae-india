/**
 * The store's name and lockup, in one place.
 *
 * Page titles, Open Graph cards, the manifest and the logo all read these, so
 * the name changes in one edit. The company's contact facts -- phone, address,
 * legal name -- are a separate concern and live in `src/lib/company.ts`,
 * because they come from the environment.
 */

/** The brand as it is written in titles, `siteName` and the manifest. */
export const storeName = "AE India";

/** The trading company, printed under the wordmark. */
export const storeOwner = "Amit Enterprises";

/** The two letters in the logo's square mark. */
export const storeMonogram = "AE";

/** The line under the logo in the footer, and on the home hero. */
export const storeTagline = "Supplying Quality. Supporting Every Space.";

