import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { CategoryPageContent } from "@/components/category/CategoryPageContent";
import { CategoryStyles } from "@/components/category/CategoryStyles";
import { ProductCardStyles } from "@/components/product/ProductCardStyles";
import { getCategories, getCategoryBySlug } from "@/services/hyperinventory/category.service";
import { getProducts } from "@/services/hyperinventory/product.service";
import { subCategorySlug } from "@/utils/mappers/category.mapper";

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
 */
async function resolveCategory(slug: string) {
    const category = await getCategoryBySlug(slug).catch(() => null);

    if (category) return { category, sub: null };

    const categories = await getCategories().catch(() => []);
    const parent = categories.find((item) => slug.startsWith(`${item.slug}-`));

    if (!parent) return { category: null, sub: null };

    const parentCatalogue = await getProducts({
        categoryUrlPaths: [parent.slug],
        size: 1,
    }).catch(() => null);

    const sub = (parentCatalogue?.categories ?? [])
        .filter((item) => item.value !== parent.name)
        .find((item) => subCategorySlug(parent.slug, item.value) === slug);

    return sub ? { category: parent, sub } : { category: null, sub: null };
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
            description: `Browse ${sub.label} within ${category.label} corporate gifts from Wingback, with bulk pricing, branding and pan-India delivery.`,
            alternates: { canonical: `/category/${slug}` },
            openGraph: {
                type: "website",
                siteName: "Wingback by Sampley",
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
        || `Browse ${category.label} corporate gifts from Wingback, with bulk pricing, branding and pan-India delivery.`;

    return {
        title,
        description,
        alternates: { canonical: `/category/${category.slug}` },
        openGraph: {
            type: "website",
            siteName: "Wingback by Sampley",
            url: `/category/${category.slug}`,
            title,
            description,
            ...(category.imageUrl ? { images: [{ url: category.imageUrl, alt: category.label }] } : {}),
        },
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;

    const [{ category, sub }, categories] = await Promise.all([
        resolveCategory(slug),
        getCategories().catch(() => []),
    ]);

    // An unknown slug is a 404, not an empty category page pretending to exist.
    if (!category) notFound();

    // Products come back by slug. A sub-category slug is a reconstruction, so a
    // result of nothing falls back to its name, which the aggregation gave us.
    const requested = sub
        ? await getProducts({ categoryUrlPaths: [slug], size: categoryPageSize }).catch(() => null)
        : await getProducts({ categoryUrlPaths: [category.slug], size: categoryPageSize }).catch(() => null);

    const catalogue = sub && !requested?.products.length
        ? await getProducts({ categories: [sub.value], size: categoryPageSize }).catch(() => requested)
        : requested;

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
                            <div>
                                <b>{catalogue?.total ?? products.length}</b>
                                <span>products</span>
                            </div>
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
