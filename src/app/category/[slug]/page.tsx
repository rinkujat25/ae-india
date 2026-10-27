import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { CategoryPageContent } from "@/components/category/CategoryPageContent";
import { CategoryUnavailable } from "@/components/category/CategoryUnavailable";
import { CategoryStyles } from "@/components/category/CategoryStyles";
import { ProductCardStyles } from "@/components/product/ProductCardStyles";
import { getCategories, getCategoryBySlug } from "@/services/hyperinventory/category.service";
import { budgetPriceRanges } from "@/constants/budget";
import { getProducts } from "@/services/hyperinventory/product.service";
import { subCategorySlug } from "@/utils/mappers/category.mapper";
import { orderingParam, resolveOrdering } from "@/utils/product-sort";

type CategoryPageProps = {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

/** One request's worth; the page filters sub-categories client-side from this. */
const categoryPageSize = 100;

/**
 * Resolves a URL slug to either a category or one of its sub-categories.
 *
 * Sub-categories are not addressable through the category endpoint, so a slug
 * it rejects is matched against the parent's own sub-categories by rebuilding
 * each one's slug.
 *
 * `failed` is kept apart from "no such category". Every read in here used to
 * swallow its error and carry on as if it had come back empty, so an outage
 * fell all the way through to `notFound()` and a real, stocked category
 * answered "Page not found". `getCategoryBySlug` already turns the provider's
 * 404 into `null`; anything else it throws is a failure, and so is any throw
 * from the two fallback reads.
 */
async function resolveCategory(slug: string) {
    try {
        const category = await getCategoryBySlug(slug);

        if (category) return { category, sub: null, failed: false };

        const categories = await getCategories();
        const parent = categories.find((item) => slug.startsWith(`${item.slug}-`));

        if (!parent) return { category: null, sub: null, failed: false };

        const parentCatalogue = await getProducts({
            categoryUrlPaths: [parent.slug],
            size: 1,
        });

        const sub = parentCatalogue.categories
            .filter((item) => item.value !== parent.name)
            .find((item) => subCategorySlug(parent.slug, item.value) === slug);

        return sub
            ? { category: parent, sub, failed: false }
            : { category: null, sub: null, failed: false };
    } catch (error) {
        console.error(
            `Unable to resolve the category "${slug}":`,
            error instanceof Error ? error.message : "Unknown error",
        );

        return { category: null, sub: null, failed: true };
    }
}

/** Logs a failed grid read and lets the page carry on to its error state. */
function failedRead(error: unknown) {
    console.error(
        "Unable to load the category's products:",
        error instanceof Error ? error.message : "Unknown error",
    );

    return null;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const { category, sub } = await resolveCategory(slug);

    if (!category) {
        return { title: "Category | Wingback", robots: { index: false, follow: false } };
    }

    if (sub) {
        const subTitle = `${sub.label} | ${category.label} | Wingback`;

        return {
            title: subTitle,
            description: `Browse ${sub.label} within ${category.label} corporate gifts from the Wingback gift store, with bulk pricing, branding and pan-India delivery.`,
            alternates: { canonical: `/category/${slug}` },
            openGraph: {
                type: "website",
                siteName: "Wingback Gift Store",
                url: `/category/${slug}`,
                title: subTitle,
            },
        };
    }

    // The provider's own SEO copy wins where it has any; both fields are
    // routinely null, so the page writes a sensible line of its own otherwise.
    const title = category.metaTitle || `${category.label} Corporate Gifts | Wingback`;
    const description =
        category.metaDescription
        || category.description
        || `Browse ${category.label} corporate gifts from the Wingback gift store, with bulk pricing, branding and pan-India delivery.`;

    return {
        title,
        description,
        alternates: { canonical: `/category/${category.slug}` },
        openGraph: {
            type: "website",
            siteName: "Wingback Gift Store",
            url: `/category/${category.slug}`,
            title,
            description,
            ...(category.imageUrl ? { images: [{ url: category.imageUrl, alt: category.label }] } : {}),
        },
    };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { slug } = await params;
    // The order is applied by the provider, so it travels with every read that
    // fills the grid. "Show more" only reveals what is already loaded, in that
    // order.
    const ordering = resolveOrdering((await searchParams)?.[orderingParam]);

    const [{ category, sub, failed: lookupFailed }, categories] = await Promise.all([
        resolveCategory(slug),
        getCategories().catch(() => []),
    ]);

    // The catalogue did not answer, so there is no way to tell whether this
    // slug exists. That is an error to show, not a 404 to claim.
    if (lookupFailed) {
        return (
            <>
                <CategoryStyles />
                <SiteHeader active="products" />
                <main className="cat-page">
                    <div className="wrap">
                        <Breadcrumbs trail={[{ label: "Products", href: "/products" }, { label: "Category" }]} />
                        <CategoryUnavailable subject="this category" retryHref={`/category/${slug}`} />
                    </div>
                </main>
                <SiteFooter />
            </>
        );
    }

    // An unknown slug is a 404, not an empty category page pretending to exist.
    if (!category) notFound();

    // Products come back by slug. A sub-category slug is a reconstruction, so a
    // result of nothing falls back to its name, which the aggregation gave us.
    //
    // Every read that fills the grid carries the budget band, the same one the
    // home shelf and `/products` use: a category page is another way into the
    // same catalogue, and a gift that cannot be claimed should not be reachable
    // through one door and not another. The two reads above and below that only
    // want the **aggregation** deliberately do not — they describe the category
    // tree, and narrowing them would drop a sub-category out of the list that
    // `resolveCategory` matches a slug against, turning a real URL into a 404.
    const requested = sub
        ? await getProducts({ categoryUrlPaths: [slug], size: categoryPageSize, priceRanges: budgetPriceRanges, ordering }).catch(failedRead)
        : await getProducts({ categoryUrlPaths: [category.slug], size: categoryPageSize, priceRanges: budgetPriceRanges, ordering }).catch(failedRead);

    const catalogue = sub && !requested?.products.length
        ? await getProducts({ categories: [sub.value], size: categoryPageSize, priceRanges: budgetPriceRanges, ordering }).catch((error: unknown) => failedRead(error) ?? requested)
        : requested;

    // `null` only when every read that could have filled the grid failed. A
    // read that came back with nothing in it is an empty category, which the
    // empty state is for; a failed one is not, and must not borrow its words.
    const productsFailed = catalogue === null;

    // The chips always list the whole category, so they stay reachable from a
    // sub-category page.
    const parentCatalogue = sub
        ? await getProducts({ categoryUrlPaths: [category.slug], size: 1 }).catch(() => null)
        : catalogue;

    const products = catalogue?.products ?? [];
    const subCategories = (parentCatalogue?.categories ?? []).filter((item) => item.value !== category.name);

    return (
        <>
            <ProductCardStyles />
            <CategoryStyles />
            <SiteHeader active="products" />
            <main className="cat-page">
                <div className="wrap">
                    <Breadcrumbs
                        trail={[
                            { label: "Products", href: "/products" },
                            // On a sub-category the visitor is a level deeper, so
                            // the category becomes a link back to the whole of it.
                            { label: category.label, href: sub ? `/category/${category.slug}` : undefined },
                            ...(sub ? [{ label: sub.label }] : []),
                        ]}
                    />

                    <header className="cat-head">
                        <div>
                            <h1>{sub ? sub.label : category.label}</h1>
                            {sub ? (
                                <p className="cat-lede">
                                    In <Link href={`/category/${category.slug}`}>{category.label}</Link>
                                </p>
                            ) : category.description ? (
                                <p className="cat-lede">{category.description}</p>
                            ) : null}
                        </div>
                        <div className="cat-stats">
                            {/* No count when the read failed: "0 products" is
                                the same false claim the empty state made. */}
                            {productsFailed ? null : (
                                <div>
                                    <b>{catalogue.total ?? products.length}</b>
                                    <span>products</span>
                                </div>
                            )}
                            {!sub && subCategories.length ? (
                                <div>
                                    <b>{subCategories.length}</b>
                                    <span>sub-categories</span>
                                </div>
                            ) : null}
                        </div>
                    </header>

                    <CategoryPageContent
                        products={products}
                        failed={productsFailed}
                        retryHref={`/category/${slug}`}
                        subCategories={subCategories.map((item) => ({
                            ...item,
                            slug: subCategorySlug(category.slug, item.value),
                        }))}
                        activeSub={sub?.value ?? ""}
                        categoryHref={`/category/${category.slug}`}
                        totalInCategory={parentCatalogue?.total ?? products.length}
                        siblings={categories.filter((item) => item.slug !== category.slug)}
                    />
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
