# AGENTS.md

## Current Rules

1. Use Next.js App Router.
2. Use TypeScript everywhere.
3. Use Server Components by default.
4. Add `"use client"` only when browser interaction requires it.
5. Do not install unnecessary dependencies.
6. Do not introduce Redux/global state unless clearly required later.
7. Do not introduce a UI theme or e-commerce template.
8. Existing HTML/CSS design will later become the site's theme.
9. Backend APIs will be the source of truth for products, pricing, inventory, cart, checkout, orders and payments.
10. Do not hard-code API URLs inside components.
11. API integrations must be placed inside `src/services`.
12. Shared application models must go inside `src/types/models`, and provider DTOs must go inside `src/types/dto`.
13. Shared helper functions must go inside `src/utils`.
14. Shared constants must go inside `src/constants`.
15. Keep components small and reusable.
16. Avoid unnecessary Client Components.
17. SEO-sensitive pages should be server-rendered wherever possible.
18. Do not make unrelated architectural changes while working on a specific task.
19. Read existing code before modifying it.
20. Keep the project production-build compatible.
21. Keep this `AGENTS.md` file updated whenever an implementation establishes or changes a project-wide architectural rule.
22. Never place real credentials or secrets in tracked files, examples, Client Components or `NEXT_PUBLIC_*` variables.
23. Treat code enclosed by matching `// ADDED_BY_RINKU` comments as user-owned. Do not remove or rewrite that block unless the user explicitly asks; if it causes a security or build issue, explain the issue before changing it.

## HTML Migration

Reserved for future rules.

## API Integration

- Use `HYPERINVENTORY_API_URL` for commerce APIs and reserve `RANKNOVA_API_URL` for AI product search.
- Keep API credentials server-side. Never expose client secrets through `NEXT_PUBLIC_*` variables or Client Components.
- Put Hyperinventory request and domain services in `src/services/hyperinventory`.
- Define provider request and response contracts in `src/types/dto/hyperinventory`.
- Define application-facing models in `src/types/models`.
- Convert DTOs to application models in `src/utils/mappers`; components must not consume provider DTOs directly.
- Use `api-responce/README.md` as the quick reference for saved product API JSON structure before opening large sample payloads.
- Use `api-responce/product-detail-structure.md` as the quick reference for product detail response mapping.
- Parse only `brand_filter`, `category_filter`, `tag_Filter` and `price_filter` from product aggregations until additional filters are explicitly requested.
- Product searching, filtering and sorting must be performed by server-side API requests, not by filtering an already-loaded product array in Client Components.
- Product listing category and brand selections use the `categories` and `brands` URL query parameters and pass comma-separated bucket keys into the Hyperinventory product request.
- Every product read is held to the store's collection: `collection_ids=<id>` from `storeCollectionIds` in `src/constants/collection.ts` ("Wingback Customer"). It is added **inside** `getProducts` and `getProductSearchSuggestions`, not by callers, so the listing, category pages, home shelf, Similar Products and search suggestions all carry it and a new read cannot forget it.
- The name is exact. `collections`, `collection` and `collection_id` are silently ignored and return the whole seller catalogue; a JSON-array value answers 500. A collection with nothing indexed returns zero hits, not an error, so an empty store means the collection is empty, not that the request failed.
- Sorting is server-side: the product read sends Hyperinventory `ordering`, and the URL carries the same value as `?ordering=`. Three are offered, from `sortOptions` in `src/utils/product-sort.ts`: `-created_at` (Newest, the default and omitted from the URL), `-selling_price` (Price: High to Low) and `selling_price` (Price: Low to High). Anything else falls back to the default through `resolveOrdering`, so nothing arbitrary from the URL reaches the provider.
- **The provider ignores `ordering` once `collection_ids` is in the request.** It sorts on each product's position in the collection first and on `ordering` only as a tie-breaker, and every position is unique, so all three orders came back identical. Other parameter names (`sort`, `sort_by`, `order_by`) do nothing either. Until it is fixed upstream, `getProducts` collects the whole result set for any read with an `ordering` (100 per page, up to 10 pages), sorts it with `sortHits`, and slices out the requested page. Price is read from the variant the card shows (`getPrimaryVariant`), unpriced products go last in both directions, and the returned `total` is the exact card count. Reads without an `ordering` — the home shelf, Similar Products — still take the provider's single page. Remove the workaround once the provider honours `ordering` with a collection.
- Never sort the loaded array in the browser: it only reorders the page in hand, so "Low to High" on page 1 showed the cheapest of 24, not of the catalogue. Changing the order resets `page`, and filters and paging keep `ordering` because they copy the existing query.
- `ProductSortSelect` is the one dropdown for both the listing and the category page. It navigates with `router.replace` inside a transition and drives the global loader while it is pending, since a query-only navigation fires no `loading.tsx`.
- Its styles are `.sort-select` in `globals.css`, because two pages render it. The select has `appearance: none`, so the component draws its own chevron; without it the control does not read as a dropdown. On the listing it sits in a plain toolbar row (no card) beside the exact range shown, "Showing 25–48 products" — not the provider total, which counts variants.
- Header search suggestions use the server-side Hyperinventory `products_search_suggestions` endpoint through `/api/products/search-suggestions`; debounce browser requests, cancel stale requests, and never expose its bearer token to Client Components.
- Product detail pages use `/products/[slug]` and fetch Hyperinventory product detail data from `/consumer/products/{slug}` with `seller` and `time` query parameters.
- The primary product detail gallery uses `featured_images`. The lower Images and Videos section fetches the URL supplied by the product detail `assets` field and renders media from `assets.images` and `assets.videos`.
- Product detail downloadable files must be fetched from the URL supplied by the `downloads` field and grouped using the returned keys such as `catalog`, `howToGuide`, `price_list`, and `user_manuals`.
- Optional product detail sections must be omitted entirely when their mapped data is empty; do not render empty headings, placeholder rows, or fallback section content.
- The product detail Similar Products UI currently uses an explicitly requested, isolated dummy array inside `SimilarProducts.tsx`; replace that array with API data when a similar-products endpoint is supplied.
- The homepage product showcase currently uses an explicitly requested, isolated dummy array inside `HomeProductsSection.tsx`; replace it with API data when homepage product selection rules are supplied.
- Product URL slugs must use Hyperinventory `url_path` as the canonical source.
- Product listing models may expose lightweight variant summaries from the collapsed `variants` array for reusable card previews; each summary uses its own `url_path` and featured image.
- One card component serves both surfaces: `ProductCard` in `src/components/product/ProductCard.tsx`, with its styles in `ProductCardStyles` — a sheet both the listing page and the detail page load. Do not re-implement a product card anywhere else.
- The variant strip and the wishlist button are opt-in props (`showVariants`, `showWishlist`). The listing passes both; the Similar rail passes neither. Neither is part of what makes a card a card.
- Both rails on the detail page — Similar Products and Recently viewed — are the same `ProductCarousel`, rendering the same `ProductCard`. Only the props differ: a title, a product list, and an optional "See all" link. Its classes are `product-rail*`, not `similar-*`, because two sections share them.
- There is no `SimilarProducts` wrapper: the detail page renders `ProductCarousel` directly. A wrapper whose only job is to pick a title and a link is indirection with nothing in it. `RecentlyViewed` stays a component because it owns the storage read and the recording.
- Recently viewed is stored per browser in `localStorage` by `src/utils/recently-viewed.ts`, newest first, capped at 12. Only the fields the card renders are kept — price and stock are re-read from the API when the product is opened again, so a stale entry cannot misprice anything.
- The product being viewed is read out of the list before it is recorded, so it never appears in its own rail while still moving to the front for next time.
- The rail renders nothing on the server: the list only exists client-side, so it appears after mount rather than risking a hydration mismatch.
- The recording effect depends on `current.slug`, not the `current` object. The caller builds a fresh object every render, and depending on it meant the cleanup cancelled the pending write before it ever fired — nothing was recorded at all.
- The Similar rail is a slider: ten products in a horizontal scroll track with prev/next arrows that move one viewport at a time. The arrows measure the track rather than counting cards, because how many fit depends on the viewport, and both disable when everything already fits.
- Do **not** set `scroll-behavior: smooth` on that track in CSS, and keep snapping at `proximity`. With CSS smooth scrolling and `scroll-snap-type: mandatory` together, the browser cancels `scrollBy` outright — direct `scrollLeft` still works, so the arrows silently do nothing.
- Similar Products on the detail page is a real read: `getProducts({ categories: [product.category] })`, the same listing endpoint the catalogue uses. The current product is filtered out of the result, and "See all" links to that same filter on `/products`.
- A product with no category falls back to an unfiltered listing rather than leaving the rail empty. Ten are fetched, one more than shown, so the current product can be filtered out without leaving a gap. The section renders nothing at all when the read fails or comes back empty.
- The catalogue carries **no rating or review data**, so the cards show none. The placeholder stars and review counts that were there came from hardcoded demo data; never reintroduce them.
- Categories arrive as **one flat list**: entries with `parent_category: null` are the top-level ones, the rest are their children. A product can sit in several of either, so `categoryNames` joins each side with ", " rather than taking the first. `display_name` is routinely null, so `name` carries the label.
- Many products have `categories: []` — the field is genuinely empty, not missing. The page hides the Category and Sub-category rows in that case and the Product JSON-LD omits `category`; it does **not** fall back to "Other" / "General", which read as real data.
- The seller's category tree is a separate read: `GET /v1/consumer/sellers/{sellerId}/categories`. The product listing's category filter names come from the `category_filter` aggregation, not from any per-product field.
- Product detail variant swatches must navigate to the selected variant's `/products/{url_path}` route so the page reloads authoritative variant data.
- Product descriptions are authored in a rich-text editor and arrive as HTML (`<p>`, `<strong>`, `<br>` in the current catalogue). Rendering them as text shows the markup; rendering them raw trusts the feed.
- `sanitizeRichText` in `src/utils/rich-text.ts` **rebuilds** the markup rather than filtering it: text is escaped, a fixed set of formatting tags is re-emitted by name, and every attribute is dropped. There is no attribute allowlist to get wrong, so `onerror`, `href="javascript:"` and `style` cannot survive in any shape. Sanitising happens in the mapper, on the server — never in a Client Component.
- The model carries both: `descriptionHtml` (sanitised markup, empty when the source had none) for the page, and `description` (plain text via `toPlainText`) for meta descriptions, the Product JSON-LD and the summary beside the title, none of which may contain tags.
- `dangerouslySetInnerHTML` is only ever used on a value that came through `sanitizeRichText`. Never pass provider copy to it directly.
- Specifications arrive as a bare `{ name, details }` list with **no ordering field**, so the order is whatever the source feed used — one product opens with "Product Dimensions", the next with "Department". `specificationRank` in `src/constants/specificationOrder.ts` gives every product the same shape: what it is, what it is like, what comes with it, what it works with, who it is for, then warranty and legal.
- Names are matched with case, spacing and punctuation stripped, which folds the real variants ("Colour"/"Color", "Country of Origin"/"Country Of Origin") onto one entry. Names not in the list keep the provider's order and follow the known ones, so a new specification appears rather than disappearing.
- If specifications ever carry `position` — the field the provider already uses for images, cart items and payment methods — that order wins and the curated one is skipped entirely.
- `is_allow_back_orders` sits alongside `in_stock` and `can_order` on the product (and is read from the variant first, like they are). When it is true and the product is **out of stock**, it is still orderable but capped at **one unit**, and the page says "Available on back order" rather than "Out of stock".
- The cap lives in the model as `maxQuantity`, not in the page: it is a back order when `allowsBackOrders && !inStock`, otherwise the stock ceiling applies. A product that allows back orders **and** has stock keeps its normal stock-limited quantity.
- Product detail variant selectors must be generated from each variant's `variant_values`, support multiple attribute groups such as Size and Color, and resolve selections to a valid variant `url_path`.
- Keep product detail DTOs, models, mappers and services separate from product listing DTOs unless a small shared provider DTO already matches both responses.
- Do not keep static or dummy product catalogues as runtime fallbacks. Show an explicit unavailable state when a product API is not connected.
- Guest Hyperinventory requests use the configured sales channel, client ID and client secret.
- Authenticated requests use the user's server-side session token.
- Use the global API loader for browser-side API calls. Server-rendered route transitions that fetch data should use an App Router `loading.tsx` boundary with the shared loader UI.
- Browser-side API calls should use `useApiRequest` or `useGlobalApiLoader().withApiLoader(...)` so concurrent requests share the same global loader.
- The global API loader hides as soon as the request settles. Do not add a minimum visible duration; an artificial delay makes fast responses feel slower than they are.
- `/api/products/filter-preview` is a temporary browser-call endpoint for validating filter API interactions and the global loader before full server-side filtering is connected.

## Authentication

- Auth pages live under `/auth`: `/auth/login` and `/auth/register`. There are no `/login` or `/register` routes.
- Sign-up posts to `/api/auth/register`, which calls Hyperinventory `POST /v1/consumer/auth/signup/`. `provider` and `seller_company` are fixed server-side like every other auth call, and `username` repeats the email.
- The reference site also sends `utm_source`, `utm_medium` and `attribution_data`. Those are **omitted**: we have no attribution tracking, and inventing values would write fiction into their analytics. Add them only when there is real data to send.
- Signup returns a **full session**, so the new account is signed straight in and the tokens go to the same httpOnly cookies. The route still handles a tokenless response by sending the visitor to sign in, rather than leaving them on a dead end.
- Unlike login, sign-up keeps the provider's rejection message: "A user with given email already exists" is something the person has to be told, and it reveals nothing they did not just type.
- Sign-up rules live in `src/utils/signup-validation.ts` and run on both sides, the route handler being the authority. Password rules are reported one at a time — length before composition, so a long passphrase is not failed on "needs a symbol" — and a password containing the email local part is refused.
- Login supports two methods, selected with the `mode` URL query parameter: `otp` (the default, on the bare `/auth/login` route) and `password`. OTP login has a second step selected with `step=verify`.
- Parse and narrow those parameters with `resolveLoginMode`, `resolveLoginStep`, `resolveLoginEmail` and `resolveLoginNext`, and build links with `buildLoginHref`, all in `src/utils/auth-mode.ts`. Unknown values fall back to the OTP request step.
- A page that needs a session sends the visitor to `/auth/login?next=<path>` and they are returned there once signed in. Always pass the value through `resolveInternalPath` in `src/utils/return-path.ts` (`resolveLoginNext` is the login flow's alias for it), never straight to `redirect` or `router.replace`: it accepts a same-origin path only, rejecting absolute URLs, a leading `//` or `/\`, and control characters, so the parameter cannot become an open redirect. Anything rejected falls back to the caller's default.
- Any other `?next=` parameter uses the same guard. `/account/addresses/new?next=<path>` is the one in use: Save and Cancel return there instead of to the account section, so adding an address mid-checkout comes back to checkout.
- The OTP request form is a plain `method="get"` form that navigates to the verify step and carries the email in the query, so the flow works without JavaScript and without a backend call to fake.
- Auth pages are server-rendered. The only Client Component is `PasswordField`, which exists solely for the show/hide toggle.
- Never echo a submitted password into the URL, into a query parameter, or into any server log. Only the email is carried between login steps.
- Password login posts to the same-origin route handler `POST /api/auth/login`, which calls Hyperinventory `POST /v1/admin/auth/login/` through `src/services/hyperinventory/auth.service.ts`. The browser never calls the provider directly.
- OTP login is two calls, and they live on **different path prefixes**: `POST /v1/admin/auth/request_login_otp/` sends the code, but `POST /v1/auth/validate_login_otp/` (no `admin`) exchanges it for a session. They are wrapped by `/api/auth/otp/request` and `/api/auth/otp/verify`.
- The validate call takes **no username** — `verification_token` alone identifies the pending login, so the code is the entire credential. It never goes in a URL, and the field is cleared before navigating away.
- Its response is the same shape as password login, so it reuses `mapLoginResponseToSession` and `writeAuthSession`; the tokens land in the same httpOnly cookies.
- Requesting a code answers `{ sent: true }` whatever the provider says about a 4xx, so the response cannot be used to discover which addresses have accounts. Only infrastructure failures surface as an error. Verification failures are one message for wrong, expired and already-used codes.
- The one exception is the resend throttle, provider code **1028**. That is about timing rather than whether an account exists, so it passes through as 429 with the provider's message — answering "sent" there would leave the visitor waiting for an email that never arrives.
- The verify step counts down before Resend works, from `OTP_RESEND_SECONDS` (default 60, read server-side and passed as a prop — not a `NEXT_PUBLIC_*` var, so it changes without a rebuild). Keep it at or above the provider's own minute; a shorter value just surfaces 1028 instead of preventing it.
- That countdown runs off a deadline, not a per-tick decrement: a backgrounded tab throttles timers, and counting ticks there would leave the button locked long after the wait had really passed.
- The deadline is written to `localStorage` by `src/utils/otp-resend.ts` **at the moment a code is sent** — by the request form as well as by Resend — and read back on mount, so a refresh resumes the wait instead of granting a fresh minute the provider would then refuse. It is keyed to the address the code went to, so changing email starts its own wait.
- The verify step renders locked and unlocks after reading storage, which keeps the server and first client render in agreement. Landing on `?step=verify` with nothing stored leaves Resend enabled: no code has been sent, so there is nothing to wait for.
- The login request body is built server-side: `provider` is the fixed string `"consumer"` and `seller_company` comes from `HYPERINVENTORY_SELLER_ID`. Neither is ever accepted from the browser.
- `access_token` and `refresh_token` are stored only in httpOnly, SameSite=Lax cookies (`secure` in production) written by `writeAuthSession`. They must never be returned in a response body, written to local storage, or exposed to a Client Component.
- The login response to the browser carries display fields only (name, email, role, company). `getAuthProfile` reads those back for server-rendered signed-in pages.
- Authentication failures return one generic message for both a wrong password and an unknown account, so the response cannot be used to enumerate accounts. No cookies are set on a failed login.
- `POST /api/auth/logout` clears every auth cookie. There is no auth data in local storage to clear: tokens live only in httpOnly cookies, so logout is a server-side operation.
- The logout button also calls `clearTemporaryCart()`, because the guest cart id is per browser rather than per account and would otherwise be inherited by the next person on a shared machine. It runs in a `finally` so it still happens if the request fails, then returns the visitor to the home page.
- Never use `localStorage.clear()` on logout. Remove only this app's own keys; the store can hold entries this app does not own.
- The header account icon always links to `/account`. `/account` itself is the auth gate: signed-out visitors are redirected to `/auth/login`, and signing in returns them to `/account`. Do not read the session inside `SiteHeader` — it renders on every page and would turn all statically prerendered routes dynamic.
- `/auth/login` redirects an already-signed-in visitor to `/account`, or to `next` when one was passed.
- Gate protected pages inside the page itself rather than in shared layout or header components, so static generation is preserved everywhere it still applies.
- Never log request headers, request bodies or tokens from the Hyperinventory client: the headers carry `clientsecret` and the login body carries a plaintext password.
- Submit buttons that need an API that is not connected yet render disabled with a visible note.

## Account

- The signed-in account dashboard lives at `/account` and is fully server-rendered; no part of it is a Client Component.
- Each account section is its own route: `/account`, `/account/edit-account`, `/account/addresses` (with `/account/addresses/new`), `/account/orders`, `/account/refer-and-earn`, `/account/rewards`, `/account/wishlist`. There is no `?section=` query routing; that was removed.
- **Refer and Earn is commented out**, not deleted: its `accountSections` entry and the body of `/account/refer-and-earn` are commented, and the route calls `notFound()`. Both must come back together — `AccountSectionShell` looks the section up in that list and throws when the entry is missing. The Rewards page's static "Referral bonus waiting" card still mentions referrals.
- `accountSections` in `src/constants/account.ts` is the single source for a section's sidebar label, page title and href. Link to a section with `accountSectionHref(id)`; never hard-code an account path.
- `src/app/account/layout.tsx` owns the auth gate, header, sidebar and footer. Section pages render only their panel, wrapped in `AccountSectionShell`, which supplies the breadcrumb and heading so every section matches.
- Load the signed-in profile with `requireAccountProfile()` from `src/utils/account-data.ts`. It is wrapped in React `cache`, so the layout gate and the page body share one request; calling the service directly would refetch.
- Account static demo data lives in `src/constants/account.ts` and its shapes in `src/types/models/account.model.ts`. This is placeholder data for the dashboard shell only, not a product catalogue fallback; replace each export with an authenticated API read as the endpoints land.
- Account actions that need a backend (saving the profile, tracking or reordering an order) render as disabled controls with a visible note rather than as buttons that silently do nothing.
- Format rupee amounts with `formatInr` from `src/utils/currency.ts`.

## Account Profile

- The signed-in name is updated through the same-origin route handler `PATCH /api/account/profile`, which calls Hyperinventory `PATCH /v1/consumer/me` via `src/services/hyperinventory/profile.service.ts` using the session access token read from the httpOnly cookie. The access token is never accepted from the request body.
- Only `first_name` and `last_name` are editable. Email identifies the account and is rendered read-only.
- `POST /v1/admin/auth/login/` returns the **company contact** name, which can differ from the consumer record. Display the profile from `GET /v1/consumer/me` rather than from the login response, or a saved name will appear to revert after signing in again.
- Name validation lives in `src/utils/profile-validation.ts` and is applied on both sides: the form for immediate feedback, the route handler as the authority. Never rely on the client copy alone.
- Validation failures return `{ message, errors }` where `errors` is keyed by field, so the form can mark individual inputs.
- The Add Address form lives at `/account?section=addresses&form=add` and reuses `AccountAddressFields` for both the billing and shipping blocks. Address rules are in `src/utils/address-validation.ts` and must be reapplied server-side when the address endpoint lands.
- States come from Hyperinventory `GET /v1/states?limit=50` via `src/services/hyperinventory/state.service.ts`, fetched server-side and passed to the form as props. There is no static state list: the provider returns numeric ids, and address payloads reference the id rather than the name, so a hard-coded list would submit the wrong value.
- When the state list cannot be loaded the form renders an explicit unavailable state and disables the select. It must never fall back to hard-coded names.
- An image inside a fixed-ratio media box needs `height:100%`, `object-fit:contain` **and `min-height:0`**. Grid and flex items default to `min-height:auto`, which refuses to shrink below the image's intrinsic size, so a tall catalogue image otherwise renders past the box and over the card text.
- Any `<select>` built from provider data needs `width:100%` and `min-width:0`, or the longest option name widens the element and overflows the page on a phone.
- Entering a complete pin code fills city and state automatically, through `GET /api/account/pincode` backed by Hyperinventory `GET /v1/pincodes?pincode=`. The provider returns `state_id`, which matches the state list id, so the dropdown is selected by id rather than by name.
- Every user-initiated browser API call shows the global loader, via `useApiRequest` or `useGlobalApiLoader().withApiLoader(...)`. Use `withApiLoader` when the response body is needed for per-field errors, since `useApiRequest` keeps only `message`.
- Every route segment that fetches on the server needs a `loading.tsx` rendering the shared `GlobalLoader`.
- `loading.tsx` only fires when the **route segment** changes. Navigation that only changes a query parameter — such as the account `?section=` links — refetches on the server with no loading boundary, so those links must also render `<LinkLoadingIndicator />` (`src/components/common/LinkLoadingIndicator.tsx`), which drives the shared loader from `useLinkStatus` while the navigation is pending.
- Typeahead-style lookups are the one exception: they use a plain debounced `fetch` with an inline status. The global loader is a full-screen blocking overlay and would blank the page on each keystroke.
- Debounced lookups must guard against out-of-order responses (a request counter or AbortController) so a slower earlier request cannot overwrite a newer one, and must leave existing field values alone when a lookup fails.
- "Fetch Details from GSTIN" posts to `POST /api/account/gst-verify`, backed by Hyperinventory `POST /v1/gst-verify/`. It fills the building, street, pin code and GSTIN fields from the registered principal place of business, then runs the pin code lookup so city and state id come from one source rather than from the GST record's state name.
- The provider answers an unknown GSTIN with HTTP 404, not `success: false`; handle both.
- Surface `gstnStatus` when it is not "Active" — an address from a cancelled registration should not be reused silently.
- Company addresses live at Hyperinventory `/v1/consumer/companies/{companyId}/addresses?seller={sellerId}`, wrapped by `src/services/hyperinventory/address.service.ts`. The company id comes from the session profile and the seller id from `HYPERINVENTORY_SELLER_ID`; neither is accepted from the browser.
- The provider stores one address per `address_type`, so saving the form is **two** POSTs: `billing_address` then `shipping_address`. When "Use same address for Shipping" is ticked the billing values are sent for both.
- `gst_number` is only ever sent on the billing address; shipping always sends an empty string.
- `address_line_1` carries the "Company, Building No., Apartment" field and `address_line_2` carries "Area, Street". `state` is the numeric state id and `country` is `defaultCountryId` (1, India).
- The Manage Addresses list reads the same endpoint; there is no static address list any more, and it is grouped into Billing and Shipping sections.
- Removing an address goes through `DELETE /api/account/addresses/{addressId}`, which calls Hyperinventory `POST /v1/consumer/addresses/{addressId}/archive`. That provider endpoint is **not company-scoped**, so the route handler must first confirm the id appears in the signed-in company's address list; otherwise any session could archive another company's address.
- Destructive actions must confirm first. Address removal opens a `<dialog>` showing the address being removed, with Cancel and a `btn-danger` confirm.
- Colour tokens must exist in `globals.css` before use. `var(--x)` on an undefined token fails silently — the declaration is dropped with no error, so a rule can look correct in source and do nothing.

## Cart

- Product add-to-cart requests must go through same-origin Next.js route handlers so Hyperinventory credentials remain server-only.
- Guest add-to-cart uses Hyperinventory `POST /v1/consumer/temporary-carts` through `src/services/hyperinventory/cart.service.ts`.
- After a guest cart is created, store only its ID as `temporary_cart_id_{sales_channel_id}` in browser local storage; never store cart items, prices, credentials or an API response mirror there.
- Adding an item to an existing guest cart must pass its ID to Hyperinventory as the `X-TEMP-CART-ID` request header.
- The cart page loads through `GET /api/cart`, which serves both modes: the signed-in buyer's cart from Hyperinventory `GET /v1/consumer/companies/{companyId}/carts?seller=`, or the guest cart from `GET /v1/consumer/temporary-carts/{temporary_cart_id}` when a `temporaryCartId` query is supplied. It replies with a `mode` of `"user"` or `"guest"`.
- That authenticated cart GET returns **409 without a `seller` query parameter**, and comes back as a paged list whose single result is the cart.
- Both modes map onto the same `CartModel`, so the cart page renders one shape.
- Quantity changes go through `PATCH /api/cart`, which branches like the GET. Guests use Hyperinventory `PATCH /v1/consumer/temporary-carts/{temporary_cart_id}` keyed on `product_id`; signed-in buyers use `PATCH /v1/consumer/carts/{cartId}` keyed on the **cart line id**, which is why `CartItemModel` carries `itemId`.
- Both endpoints set an **absolute** quantity rather than adding to it. Note the contrast with `POST /consumer/companies/{id}/carts`, which accumulates.
- Removal goes through `DELETE /api/cart` and does **not** reuse the quantity update. Guests set the line's quantity to `0`; signed-in buyers call Hyperinventory `POST /v1/consumer/cart_items/{cartItemId}/remove/`, which returns the updated cart.
- Never try to remove a signed-in line by sending quantity `0` to the update endpoint: it is ignored when other lines are positive, and returns 409 when it is the only line, so the item would appear to vanish and then come back on refresh.
- Clearing a signed-in cart removes each line in turn so every response reflects real state; an emptied cart is returned as `cart: null`.
- All Hyperinventory `Origin` and `Referer` headers must come from the server-only `HYPERINVENTORY_ORIGIN` and `HYPERINVENTORY_REFERER` variables.
- Product detail add-to-cart must respect Hyperinventory `in_stock`, `can_order`, and `total_available_stock`; unavailable products must not submit a cart request.
- The shared site header displays a cart icon and product-line count loaded from `GET /api/cart`, so it reflects the signed-in buyer's cart as well as a guest cart. It must not short-circuit when there is no `temporary_cart_id_*` key: a signed-in buyer never has one.
- That badge refresh uses a plain `fetch`, not `useApiRequest`, because it runs on every page load and the global loader is a full-screen blocking overlay.
- The shared primary header navigation is limited to Home, Gift Stores, Direct gifting, Catalogue, and Browse gifts, with search, account, and cart actions on the right.
- The shared header search action opens an accessible page overlay, focuses the search field immediately, closes on backdrop click or Escape, and submits the keyword through the products URL.
- Search autocomplete uses its own compact inline loading state so typing does not trigger the full-page global API loader.
- `POST /api/cart/items` branches on the session. A signed-in buyer goes to Hyperinventory `POST /v1/consumer/companies/{companyId}/carts` via `addToUserCart`, using the server-side session token; a guest keeps the temporary-cart flow.
- The authenticated cart has no client-side id: the provider keys it to the buyer company and **accumulates** quantity across calls, so repeated posts add up rather than replacing. Never write a `temporary_cart_id_*` key for a signed-in buyer.
- **The cart no longer offers "Request a quote."** The button and its bulk-pricing note are gone from the summary panel, and with them the `isQuoteOpen` flag, the `CartQuoteDialog` mount and the `.cart-quote-hint` / `.cart-summary .btn-soft` rules, none of which had anything left to do. The cart's intro copy went too — it told the reader to "send the list across", which the page can no longer do.
- `CartQuoteDialog`, `/api/quote-requests`, `validateQuoteRequest` and `QUOTE_REQUEST_ENDPOINT` are **deleted**, not shelved. This store sells from a fixed catalogue inside a fixed budget; a bulk-quote flow belongs to GiftVerse, which runs the programmes. Someone wanting a quote is sent to `/contact-us`.
- A guest cart exists only through the `temporary_cart_id_*` key in that browser, so when a removal empties it the key is cleared (`clearTemporaryCart`) and the next add starts a fresh cart. This covers both Clear cart and removing the last line — leaving the key behind would point the next visit at a spent cart. `clearTemporaryCart` notifies the header itself, so it replaces `notifyCartUpdated` rather than running alongside it.
- That cart list can hold **more than one cart** for a company. `is_current` marks the live one, and `getUserCart` selects on it — list order is not a reliable stand-in.
- Checkout needs a session, so "Proceed To Buy" links to `/checkout` only when the cart loaded in `user` mode; a guest goes to `buildLoginHref({ next: "/cart" })` and lands back on the cart after signing in.
- The route replies with a `mode` of `"user"` or `"guest"` so the caller knows whether there is a cart id worth persisting.
- `seller_company` in the payload comes from `HYPERINVENTORY_SELLER_ID` and the company id from the session; neither is accepted from the browser.

## Orders

- Order history comes from Hyperinventory `GET /v2/consumer/companies/{companyId}/orders?ordering=-created_at&seller={sellerId}`, wrapped by `src/services/hyperinventory/order.service.ts`. Note this endpoint is **v2**, which is the configured `HYPERINVENTORY_API_URL` default, so no `apiVersion` override is needed.
- `order_total` is authoritative and can differ from the sum of the line items (shipping, tax, adjustments). Never recompute the order total from `order_items`.
- Order and payment statuses are free-form provider strings. Humanise them for display and map them to a pill tone through the sets in `order.mapper.ts`; unknown statuses fall back to a neutral tone rather than breaking.
- `product.featured_images[].tags` is sometimes a string and sometimes an array. Only `url` is relied on.
- There is no static order data; the orders section shows an empty state when the account has none.

## Wishlist

- The wishlist comes from Hyperinventory `GET /v1/consumer/wishlist`, which returns **only `url_paths`** — no product data. Expand each slug through the product detail endpoint via `getWishlistProducts` in `src/services/hyperinventory/wishlist.service.ts`.
- Those detail calls run in parallel with `Promise.allSettled`. A delisted slug drops out of the grid instead of failing the page, and the count of dropped products is surfaced under the list.
- The sidebar count is the number of **saved slugs**, which can exceed the number of cards shown when a product has been delisted. That gap is explained by the note under the grid.
- `requireWishlistSlugs` in `src/utils/account-data.ts` is `cache`-wrapped so the layout count and the wishlist page share one request.

## Checkout

- `/checkout` is its own chrome: `CheckoutBar` (Back, logo, Secure Checkout) instead of `SiteHeader`/`SiteFooter`, so nothing competes with the buying flow.
- It is server-rendered and gated: no session redirects to `/auth/login?next=/checkout`, and an empty cart renders the empty state rather than a broken flow. The cart and addresses are read in one `Promise.all`, each with its own `catch`.
- Steps live in client state, not the URL. Query-param routing would re-run the server page for what is a pure UI step, and the selected addresses would be lost on each hop.
- Steps 1 to 4 are billing address, delivery address, review, then payment mode. Review restates both chosen addresses with a Change link back to the owning step; payment repeats them beside the mode list, as the reference design does.
- Entering checkout turns the cart into a quotation: `POST /v1/consumer/carts/{cartId}/initiate_quotation/` with an empty body, wrapped by `src/services/hyperinventory/quotation.service.ts`. Everything after that hangs off the quotation, not the cart.
- That call is a **write**, so it never runs from a server render — a `router.refresh()` (removing an address does one) would mint a fresh quotation each time. It runs once per visit from the client, guarded by a ref, through `POST /api/checkout/quotation`.
- The cart id for it is resolved from the session inside the route, never accepted from the browser: it decides which cart gets quoted and billed.
- Each address step commits its choice with `PATCH /v1/consumer/quotations/{id}/assign_billing_address/` or `.../assign_shipping_address/`, bodies `{"billing_address": id}` / `{"shipping_address": id}`. Both answer with the **whole updated quotation** and leave the other address untouched, so the steps are independent.
- Assignment happens on Continue, not on selection: one call per committed choice, and a failure keeps the buyer on the step instead of advancing on stale figures.
- The address id comes from the browser, so `/api/checkout/quotation/address` checks it against the session's own address book **and** against the type being assigned — a billing address cannot be attached as the delivery address.
- Quotation totals are authoritative. `effective_total` is what the buyer pays (offers and cash points applied); `quotation_total` is the pre-adjustment figure and is only the fallback.
- Payment modes come from `GET /v1/consumer/quotations/{quotationId}/payment_methods/`. They are quoted per quotation, so the amounts and per-method charges belong to that one order. Passing a cart id there is rejected with 403.
- Cash points come from `GET /v1/consumer/sellers/{sellerId}/cash_point`, read on the server alongside the cart and addresses. It returns a **bare object, not a paged list**, and `cash_points_data: false` means the seller runs no programme for this buyer — that is not an error, so the block is hidden rather than shown as zero.
- Redeeming points needs the endpoint that applies them to a quotation (`cash_points_used` on the quotation is where they would land). Until then the balance is shown as information only.
- The modes offered vary per quotation — the same account returned only Cash on Delivery for one and both Cash on Delivery and Razorpay for another. Never hardcode the list or assume a single mode; a single mode is preselected, two or more force a choice.
- The list is fetched when the payment step opens, so it re-quotes after an address change. A mode selected earlier is kept only if the new list still offers it — otherwise the buyer would pay with a method this order no longer has.
- `position` orders the modes (the provider pins a preferred one with a negative value) and inactive modes are dropped. `credit_balance` is a free-form display string like "50,000/1,00,000" — never parse it as a number.
- "Pay Securely" runs two calls in order: `PATCH .../assign_billing_address/` carrying the **full set** (`billing_address`, `shipping_address`, `payment_method`, `opted_shipping_charges`) to lock the quotation down, then `POST .../generate_order/` with `{"accept_partial_amount": true}`. Both go through `POST /api/checkout/order`.
- That route is the only irreversible action in the app. It re-checks every id from the browser against the session — both addresses by id **and** type, and the payment method against the modes this quotation actually offers — before anything is committed, and the button is guarded against a double submit.
- **Cash on Delivery is the only gateway that can complete an order.** Others are listed but not selectable, and `/api/checkout/order` refuses them with 409: placing an order against a gateway with no payment handshake would leave it unpaid. Lift this in both places at once when a gateway is integrated.
- A placed order leaves checkout for `/checkout/order-success?orderNumber=…&amountPaid=…`, via `router.replace` so Back cannot return to a checkout whose cart and quotation are already spent. Build the link with `buildOrderSuccessHref`: order references carry slashes ("SA/SO/24000060") and must be encoded.
- Never call `router.refresh()` after a successful order. It re-renders checkout from the server and destroys the confirmation, taking the order number with it; `notifyCartUpdated()` alone refreshes the header badge.
- The success page renders only from its URL — no API call — so anyone can type it. Both parameters are narrowed by `resolveOrderNumber` and `resolveAmountPaid`: a reference that is not reference-shaped, or an amount that is not a sane positive number, is dropped rather than printed on a page that tells the reader their order succeeded.
- `generate_order` has been seen returning the order at the top level and nested under `order`; `mapOrderConfirmation` reads whichever carries an id, and the confirmation falls back to the quotation total when the response omits one.
- Billing and delivery come from one call. `GET /v1/consumer/companies/{companyId}/addresses` returns **both types in a single list**, and `address_type` is accepted as a query parameter but **ignored**, so the split is done in the page by `addressType` — never by asking the provider for one type.
- That list **pages**, and `limit` is honoured, so `getCompanyAddresses` sends an explicit one. On the provider's default page size a company with a long address book would silently lose whatever fell past the first page.
- `CheckoutAddressPicker` shows two addresses collapsed, and always keeps the selected one on screen — otherwise picking a third address and collapsing leaves the panel looking unanswered.
- There is no coupon endpoint. Apply reports that plainly instead of faking a discount.
- The order summary shows only what is charged. An MRP-versus-price saving is not deducted from the order total, so it is not shown as an applied discount here; that comparison belongs on the cart and the product page.

## Payments

Reserved for future rules.

## Layout

- **One container for the whole site:** `.wrap` in `globals.css`, `min(1180px, 100% - 40px)`, narrowing to `min(100% - 28px, 1180px)` at 640px. The header, breadcrumb, every page's content and the footer all sit on it, so their edges line up at every width.
- **Page stylesheets must not size `.wrap`, or bring their own container.** The product page (1280px), the cart's `.cart-wrap` (1280px) and the AI gift finder (1120px) each did, which put their content 50px or 30px off the header and footer. The finder's rule was unscoped, so it narrowed the header and footer on that page too.
- **A scoped copy is wrong even when its desktop value matches.** `.products-page .wrap` repeated the global 1180px, but being more specific than the global phone rule it held a 20px gutter on phones while everything else went to 14. Delete the copy; do not try to keep it in step.
- `HowItWorksStyles` and `DiwaliGiftingStyles` still declare an unscoped `.wrap` with the same values and the same 640px breakpoint, as part of their migrated base CSS. They are harmless only while identical.
- **The header and footer use `wingback-logo-trimmed.png`** (and `wingback-logo-mark-trimmed.png` for the phone mark), not the supplied files. The supplied PNGs carry 7-9% transparent margin on each side, which set the visible mark about 14px inside the content edge. The trimmed copies keep the full height, so the logo paints at exactly the same size; only the empty side margins are gone.
- `.logo` is 181px wide: the 167px mark plus the 14px the transparent margin used to leave before the menu, so the gap between the logo and "Home" is unchanged. The phone mark is `width: auto` at 44px tall, because the trimmed mark is no longer square.
- Auth and checkout still use the supplied logo. They have no site header or footer, and center the logo on its own rather than aligning it to a content column.
- **Check alignment by measurement, not by eye.** Compare the left edge of the header logo, the breadcrumb, the first content block and the footer logo, and the right edge of the header icons and the content, at desktop, tablet and phone widths.

## Navigation feedback

- `RouteProgressBar` lives in the **root layout**, not in `SiteHeader`. A header is rendered per page, so React tears it down and rebuilds it during the very navigation the bar is showing — mounted there it reset to hidden halfway through and never appeared on faster pages.
- Because it cannot nest inside the header, it is `position: fixed` and measures its offset from the page's sticky header (`.nav, .co-bar`) when a navigation starts. Pages with no header get the top of the viewport.
- The App Router has no navigation events, so the two ends are detected separately: a capture-phase click on a same-origin link (or a `popstate`) starts it, and `usePathname` changing finishes it. Only `usePathname` is read — `useSearchParams` would force a Suspense boundary on every page that renders the header.
- It appears immediately and is held for a minimum of 650ms. Delaying the appearance instead was what made it skip fast pages entirely; holding the hide gives every navigation a visible sweep without flickering.
- It creeps toward 90% and only fills on arrival, with a 10s failsafe so a navigation that never resolves cannot leave the bar up.
- Being in the root layout it covers every route, including the auth and checkout pages, which have no `SiteHeader`.

## Policy pages

- **This site has no policy pages of its own.** The policies are GiftVerse's — written once and shared across every store the platform runs — and two versions of a legal document is one too many. `PolicyPage`, `PolicyStyles`, `src/content/policies.ts` and the five routes are deleted.
- The old URLs — `/privacy-policy`, `/privacy-policy/terms-and-conditions`, `/privacy-policy/return-exchange`, `/shipping-policy`, `/payment-policy` — answer **308** to the same path on GiftVerse, from `policyPaths` in `next.config.ts`. A saved link still reaches the current wording. The paths are identical on both hosts and were checked to answer 200 there; if GiftVerse moves one, its entry here has to change with it.
- `next.config.ts` imports `giftverseUrl` from `src/lib/giftverse.ts` rather than writing the origin out again, so the host still moves in one edit.
- **Every link to a policy goes to GiftVerse, in a new tab.** The footer, the cookie notice and the registration terms all point at `giftverseUrl(...)` and spread `giftverseLinkProps` (`target="_blank" rel="noopener"`). A reader checking the returns policy before buying should not lose their cart to find out.
- `rel` is `noopener`, not `noreferrer`. `noopener` keeps the new tab out of `window.opener`; the site's `strict-origin-when-cross-origin` policy already trims the Referer to the bare origin, which is what GiftVerse needs to see this store sent the visit. Spread `giftverseLinkProps` rather than writing the two attributes out, so the rule cannot drift between call sites.
- **Contact is the opposite: it is this site's own page.** The footer's "Contact us" and the login form's "Forgot Password?" are `next/link`s to `/contact-us` in the same tab.
- The redirects are server-side, so they do **not** open a new tab: someone typing an old policy URL is taken to GiftVerse in place. That is the right behaviour for a URL somebody chose to visit, as opposed to a link they clicked mid-purchase.

## Enquiry modal

- **There is no enquiry modal.** `LeadModal`, `/api/demo-request`, `form.service.ts`, `DEMO_FORM_ID` and the reCAPTCHA pair are deleted, and with them every `data-open-form` trigger and the `#start` hash that auto-opened it. The modal's CSS was duplicated in three places — `globals.css`, `HowItWorksStyles` and `DiwaliGiftingStyles` — and is gone from all three.
- Every button that opened it now links to `/contact-us`: the about-us and how-it-works CTAs ("Talk to us"), the Diwali CTAs (label kept), and the product page's "Get a price" for a product the catalogue cannot price. The product one loses its `data-enquiry-note`, so the enquiry no longer arrives naming the product — the contact page is one email address, and that is the trade.
- `HomeInteractions` was renamed `MobileNavToggle` and now does only what is left: binding a click handler to the header's menu button, which `SiteHeader` cannot do itself because it is a Server Component. The old name was already wrong — it ran on every route, not the home page.
- Do not reintroduce a lead form here. This host is a storefront, not GiftVerse's sales site; it takes orders, and anything else goes to `/contact-us`.

## Contact page

- **`/contact-us` carries no form.** The message form it had only assembled a `mailto:` link and handed it to the browser, so it asked for six fields to reach the same email client the address beside it opens in one tap. `ContactForm.tsx` is deleted, not unmounted.
- The "Start a program / Book a demo" tile went with it: its whole job was to open the site-wide enquiry modal, which is a form. No `data-open-form` trigger is left on the page.
- What is left is the two reach tiles (email, phone) and three boxes across the page — what to expect, who handles what, business details — plus the FAQ. The old two-column `.split` and the whole `.form-*` / `.field*` block are gone from `ContactUsStyles`; the boxes now sit in `.contact-detail`.

## Category pages

- `/category/[slug]` is server-rendered per category; the old `?c=` query template is gone. `/category` still redirects to `/products`.
- A category is fetched by slug from `GET /v1/consumer/categories/{slug}?seller=`, which is also the only source of the provider's `meta_title` and `meta_description`. A slug it does not know answers 404, which `getCategoryBySlug` turns into `null`, and the page into a `notFound()`.
- The seller tree (`GET /v1/consumer/sellers/{sellerId}/categories`) is still read, but only for the siblings strip. The two calls are independent and run together.
- The category page queries products with `category_url_paths=<slug>`, not `categories=<name>`: the slug is what the URL already carries, and it survives a category being renamed. `categories` stays for the listing's own filters, which only ever have names to work with.
- Sub-category slugs work in `category_url_paths` as `<parent-slug>-<sub-slug>`, but they **cannot be derived from the name** — "Home & Kitchen & Festive" has the slug `home-kitchen--festive`, not `home--kitchen--festive`, because it was generated from an earlier name. Nothing exposes a list of sub-category slugs, so `?sub=` filters by name instead.
- `category_images` and `category_banners` are arrays of **plain URL strings**, not objects with a `url` — unlike `featured_images` on a product — and are routinely `null`.
- Sub-categories are pages of their own, on the same `/category/[slug]` route: `/category/tech-electronics-bluetooth-speakers--audio`. The chips are links to them, not client-side filters — the listing mapper hardcodes `subCategory: "General"` because the listing API returns no per-product categories.
- `GET /v1/consumer/categories/{slug}` needs `?seller=` (409 without it) and what it resolves depends on the **credentials**, not on parent versus sub. With a user bearer token it resolves some sub-categories; with the `clientid`/`clientsecret` pair these public pages use, every sub-slug answers 404 — including ones whose products the catalogue happily returns. Category pages are unauthenticated, so the endpoint cannot be used for sub-categories here.
- A sub-category slug is therefore **not resolvable through the category endpoint** for this app, and nothing lists sub-categories. So `resolveCategory` falls back to matching the slug against the parent's own aggregation, rebuilding each sub-category's slug with `subCategorySlug`.
- That rebuild is a reconstruction of the provider's slugifier: lower-case, **drop** `&` and `,`, every other non-alphanumeric character becomes a dash. Dropping rather than replacing is what produces `...speakers--audio` and `...decor-plants--festive-essentials`. It matches all ten sub-categories in the catalogue, but it is still a guess — which is why a sub-category page falls back to filtering by **name** when the rebuilt slug returns nothing.
- A slug that matches neither a category nor one of its sub-categories is a `notFound()`, so nothing arbitrary from the URL reaches the upstream query.
- On a sub-category page the breadcrumb gains a fourth step and the category becomes a link back to the whole of it, and the chips still list the whole category so every sibling stays reachable.
- Sorting is shared with the catalogue listing through `src/utils/product-sort.ts`; the cards are the same `ProductCard`. Only the view switcher and "show more" are client state; the sort is a URL parameter applied by the provider.
- Four of the six categories currently hold no products, so the empty state distinguishes an empty sub-category from an empty category.
- **A failed read is not an empty category, and not a missing one.** Every read on this page used to swallow its error and carry on as if it had come back with nothing, so a provider hiccup showed "Nothing in this category yet" on a stocked category, and an outage fell through to `notFound()` and answered 404.
- `resolveCategory` returns `failed: true` when any lookup throws. `getCategoryBySlug` already turns the provider's 404 into `null`, so only a real "no such slug" reaches `notFound()`. A failed lookup renders the page's own error variant — header, a "Products / Category" breadcrumb, `CategoryUnavailable` and footer — because without the category there is no name to show.
- When the category resolves but every read that fills the grid fails (`catalogue === null`), `CategoryPageContent` gets `failed` and shows `CategoryUnavailable` in place of the grid. The toolbar and the header's product count are hidden with it: "0 products" is the same false claim the empty state made. A read that **succeeded** with no products still gets the empty state.
- "Try again" is a plain `<a>` to the category's own URL, not `router.refresh()`: a full load re-runs the server read, works without JavaScript and visibly starts over. Failures are logged server-side with `console.error`; in development that also surfaces in the Next overlay.
- The page renders server-side in both cases rather than through an `error.tsx`. An error boundary must be a Client Component, and `SiteFooter` reads server environment through `getCompany`, so the boundary could not render the real footer.
- During a full outage an invented slug also gets the error rather than a 404. That is correct: with the catalogue unreachable there is no way to tell it does not exist.

## Product filters

- The provider's aggregations describe **the current result set**, not the catalogue. Filtering by one category collapses them — 21 categories and 19 brands become 5 and 5 — so a sidebar rendered straight from the response strands the visitor on the filter they picked.
- `src/utils/filter-cache.ts` caches the **unfiltered** options in `sessionStorage` on the first listing view, and every narrowed view renders from that cache instead. Only an unfiltered response is ever written; a filtered one would poison the cache with a partial list.
- `sessionStorage`, not `localStorage`: the catalogue changes, and a stale sidebar must not outlive the tab. Closing the tab throws it away and the next visit starts from a fresh unfiltered read.
- Landing straight on a filtered URL with nothing cached falls back to the server's own aggregations, so the sidebar is narrow but never empty.
- The cache is read after mount, never during render, because `sessionStorage` does not exist on the server.
- A price band must carry **both** bounds. `selling_price=[{"gte":1}]` -- a lower bound on its own, which `serializePriceRanges` will happily build from `?prices=1-` -- is answered with **409**, so the read fails and the page renders its empty state. Send a ceiling as well.
- **The budget band is currently commented out.** `budgetPriceRanges` is an empty list, so no read sends `selling_price` and the listing, category pages and home shelf show the whole collection, including products with no price. Restore the one commented line in `src/constants/budget.ts` to bring the band back everywhere at once; the bullets below describe it as it works when on.
- The budget band lives in **one place**, `budgetPriceRanges` in `src/constants/budget.ts` (Rs. 1,000 to Rs. 3,000). The home page shelf and the product listing both read it, so nothing on either is outside what a recipient can claim; a band written into one of them and not the other would put gifts on the listing the store cannot deliver.
- It doubles as the "has a price" filter: a priced band excludes products with no selling price, whose card falls back to "Price on request". The band applies to the **selling price**, so a struck-through MRP above Rs. 3,000 is expected. Let the provider apply it -- filtering the fetched array instead leaves a short row.
- **The listing has no Price filter.** Wingback sets the budget, so it is not the visitor's to change: the group is gone from `ProductFilters`, and `priceFilters` is gone with it from the panel's props, the listing's state and the `sessionStorage` cache. The `price_filter` aggregation is still parsed into the model -- it is provider data and the group would read it again if the band ever becomes a choice.
- `/products` still **honours** a `?prices=` it is given, and falls back to `budgetPriceRanges` when the parameter is absent or unparseable. Nothing in the UI writes it any more, so in practice the band is fixed; a hand-typed one overrides it. Note what the fallback prevents: `?prices=garbage` parses to nothing, and an empty `priceRanges` is an unfiltered read, which would put the whole catalogue on the page.
- Category pages apply it too: `/category/[slug]` is another door into the same catalogue, and a gift that cannot be claimed should not be reachable through one and not the other.
- Only the reads that **fill the grid** carry the band. The two that want the `categories` aggregation — the one `resolveCategory` matches a sub-category slug against, and the one behind the sibling chips — deliberately do not. Narrowing those would drop a sub-category out of the list a slug is matched against, turning a real URL into a 404.

## Breadcrumbs

- Every page below the home page uses `Breadcrumbs` in `src/components/common/Breadcrumbs.tsx`. Home is added automatically; the trail passed in is everything after it, with the current page last and no `href`.
- It renders an **ordered list**, not a row of links and slashes: the order is the meaning, and a screen reader should announce position rather than read punctuation. Separators are CSS `::before` content so they are never spoken.
- The same component emits the `BreadcrumbList` structured data, so the markup and the JSON-LD cannot drift apart. The current page carries no `item` — it is where the reader already is.
- Empty labels are dropped. A product with no category used to render a separator with nothing before it.
- Styles live in `globals.css` under `.breadcrumbs`, not in a per-page sheet, because every page shows them.

## SEO

- The site's own origin comes from `NEXT_PUBLIC_SITE_URL` through `getSiteUrl` / `absoluteUrl` in `src/lib/site.ts`. Never hardcode a domain in metadata, JSON-LD, the sitemap or robots: the same build runs on localhost, staging and production, and a canonical pointing at the wrong host tells search engines the real pages live elsewhere.
- **Product pages are the one deliberate exception.** `/products/[slug]` canonicalises to `giftverse.sampley.in/products/<slug>` through `canonicalProductUrl`, because the same catalogue is published on both hosts under the same `url_path` and the pair would otherwise compete as duplicates. The hreflang entries point at the same URL — an hreflang back at this host beside a canonical pointing away is two answers to one question. `og:url` deliberately stays local: somebody sharing a gift from this store means this store.
- That canonical is only as good as GiftVerse's path shape. `/products/<url_path>` is what it serves today (verified 200, self-canonical, and carrying its own `Product` node). If GiftVerse ever moves or renames that route, every product canonical on this site points at a 404 at once, which is worse than having none.
- `metadataBase` is set once in the root layout, so canonicals and Open Graph URLs can be written as relative paths and still resolve.
- The root layout does **not** set `title.template`: all 34 page titles already end in "| Wingback", so a template would render it twice.
- **This host is not for search.** The root layout sets `robots: { index: false, follow: false }` for every route and `robots.ts` answers `Disallow: /` to `*` and to each named crawler. The store is served to people who were sent to it; the catalogue's public copy is GiftVerse's, which is where every product page canonicalises.
- The noindex is set in the root layout and **nowhere else**. Six pages used to re-declare `index: true` and quietly override it, which is how the site came to advertise itself; a page that needs different robots rules should be the rare exception, not the pattern.
- The two halves work in a specific order: `Disallow: /` is read before a crawler fetches anything, so it never sees the meta tag. Blocking therefore cannot remove a URL that is **already** indexed. Nothing here is — the host has never served this site publicly — but if that changes, allow crawling so the noindex can be read, rather than blocking and wondering why a URL lingers.
- Structured data is built as objects and serialised with `serializeJsonLd`, never as a hand-written template string.
- FAQ structured data must match what the page renders. `HomeJsonLd` and `FaqSection` carry the same five answers; changing one without the other is a guidelines violation.
- `NEXT_PUBLIC_*` is inlined at build time, so the Docker image needs `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GA_MEASUREMENT_ID` as **build arguments**, not just container environment. `.dockerignore` excludes `.env`, so without them the build silently baked `http://localhost:3000` into robots.txt and every prerendered canonical.
- The store **is** the home page. Both URLs it used to live at — `/gift-store` and `/employee-gift-store` — are permanent redirects to `/` in `next.config.ts` (`permanent: true` emits a **308**, not a 301). Both were indexed, and `/employee-gift-store` was left redirecting to a page that had already been deleted, so it redirected straight into a 404.
- The store has **one** name, "Wingback Gift Store", and it reads the same everywhere: the page titles, every page's Open Graph `siteName`, the web manifest `name`, the footer line and the words on the home page's Open Graph card. Changing it means changing the card artwork too — the name is drawn into the image, where no string replacement reaches it.
- Every page carries its own Open Graph card at `public/assets/wingback-<page>-og.jpg`, 1200x630, with `width`, `height` and `alt` declared. Do not fall back to `wingback-logo-full@2x.png`: its wordmark overlaps a second rainbow "sampley" and it renders as a mangled logo. The current logo is `wingback-logo-supplied.png`.
- Analytics loads through `GoogleAnalytics` in the root layout and is omitted entirely when no measurement ID is set, which keeps local development out of the property. Adding it required widening three CSP directives in `next.config.ts`; the tag is blocked outright without all three.

## Generative engine optimization

- Answer-engine crawlers are still listed by name in `robots.ts` (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended and others), but now to **refuse** them: `*` already covers every one, and the named blocks exist for crawlers that read only their own. This site is not trying to be cited; GiftVerse is the public copy.
- This store publishes **no `/llms.txt`**. The brief that was there described a full gifting platform, which is GiftVerse's to describe, not this storefront's. Answer engines read the pages and the JSON-LD instead.
- The home graph resolves as one entity: `Organization` carries `contactPoint` and `knowsAbout`, the two `Service` nodes link back through `@id`, and `WebPage` ties the page to both. Loose, unlinked nodes are what stop an engine attributing an answer to the brand.
- `sameAs` is still missing from the `Organization` node because the site links to no social or directory profiles. Add the real URLs when they exist — never invent them.
- The cookie notice states what is stored. `cookieNoticeVersion` in `src/utils/cookie-notice.ts` is bumped whenever that changes, so an acknowledgement of a narrower notice stops counting. Google Analytics took it to 2.

## JSON-LD
- Build the graph as an object and serialise it with `serializeJsonLd`. `HomeJsonLd` and `AboutUsJsonLd` do; `CatalogueJsonLd`, `ContactUsJsonLd`, `DirectGiftingJsonLd`, `DiwaliGiftingJsonLd` and `HowItWorksJsonLd` are still escaped strings and should be converted when next touched. Those strings use a `{{site_url}}` token, filled by `fillCompanyTokens`, so no origin is written into the source.
- **No page emits its own `BreadcrumbList`.** `Breadcrumbs` emits one from the trail it renders; every page graph that also carried one was publishing two, and one of them had an empty name and a `/category/` URL with no slug.
- A `HowTo` or `FAQPage` node must mirror what the page actually shows, stage for stage and question for question. `HowItWorksJsonLd`'s `HowTo` is that page's visible steps; `AboutUsJsonLd`'s `FAQPage` is the FAQ `AboutUsFaqSection` renders.
- **This site publishes no `Product` node.** `/products/[slug]` canonicalises to GiftVerse, which emits its own, and two `Product` nodes for one product across two hosts is the duplication the canonical exists to resolve. `createProductJsonLd`, `createOfferJsonLd` and `getAvailability` were deleted with it; the Open Graph product tags stay, since they feed link previews rather than the search index. Restore the node only if the canonical comes back to this host, and then restore both together.
- The only structured data left on a product page is the `BreadcrumbList` that `Breadcrumbs` emits from the trail it renders.

## Sitemap

- **There is none, and there should not be.** No `sitemap.ts`, no `/sitemaps/*`, and no `sitemap` line in `robots.txt`. A sitemap is an invitation to crawl, and this host answers `Disallow: /`.
- The section that used to be here described a sitemap index over `pages.xml`, `categories.xml` and `products.xml`. Those files were removed with the pages they listed; the description outlived them by several commits, which is its own lesson about this file.

## robots.txt

Reserved for future rules.

## Performance

Reserved for future rules.

## Testing

Reserved for future rules.
