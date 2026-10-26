import type { Metadata } from "next";
import { SiteFooter } from "@/components/common/SiteFooter";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SiteHeader } from "@/components/common/SiteHeader";
import { ProductsPageContent } from "@/components/product/ProductsPageContent";
import { ProductCardStyles } from "@/components/product/ProductCardStyles";
import { ProductsPageStyles } from "@/components/product/ProductsPageStyles";
import { getProducts } from "@/services/hyperinventory/product.service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Products | Wingback Corporate Gift Catalogue",
    description:
        "Browse the Wingback corporate gifting product catalogue and product listing cards.",
    // The listing takes filters and paging through the query string, so every
    // combination is a separate URL serving a subset of the same catalogue. A
    // self-referencing canonical points all of them back at the clean listing
    // rather than letting them compete with it.
    alternates: { canonical: "/products" },
};

type ProductsPageProps = {
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function parseCommaSeparatedParam(value: string | string[] | undefined) {
    const rawValue = Array.isArray(value) ? value.join(",") : value;

    return rawValue
        ? rawValue
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
        : [];
}

/**
 * Price bands travel in the URL exactly as the `price_filter` aggregation keys
 * them -- `0.0-1000.0` -- so a link round-trips to the same checkbox. Only the
 * two bounds are read back; anything unparseable is dropped rather than sent
 * upstream as NaN.
 */
function parsePriceRanges(value: string | string[] | undefined) {
    return parseCommaSeparatedParam(value)
        .map((band) => {
            const [from, to] = band.split("-").map((bound) => Number.parseFloat(bound));

            return {
                ...(Number.isFinite(from) ? { from } : {}),
                ...(Number.isFinite(to) ? { to } : {}),
            };
        })
        .filter((range) => "from" in range || "to" in range);
}

/** One page of the catalogue. */
const productsPerPage = 24;

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const params = await searchParams;
    const categories = parseCommaSeparatedParam(params?.categories);
    const brands = parseCommaSeparatedParam(params?.brands);
    const tags = parseCommaSeparatedParam(params?.tags);
    const priceRanges = parsePriceRanges(params?.prices);
    const search = Array.isArray(params?.search) ? params.search[0] : params?.search;
    // The page number comes from the URL, so a page is linkable, survives a
    // reload and works with the back button.
    const requestedPage = Number.parseInt(
        Array.isArray(params?.page) ? params.page[0] : params?.page ?? "",
        10,
    );
    const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
    const catalogue = await getProducts({
        size: productsPerPage,
        offset: (page - 1) * productsPerPage,
        categories,
        brands,
        tags,
        priceRanges,
        search,
    }).catch((error: unknown) => {
        console.error(
            "Unable to load the Hyperinventory product catalogue:",
            error instanceof Error ? error.message : "Unknown error",
        );
        return null;
    });

    return (
        <>
            <ProductsPageStyles />
            <ProductCardStyles />
            <SiteHeader active="products" />
            <div className="wrap">
                <Breadcrumbs trail={[{ label: "Products" }]} />
            </div>
            <ProductsPageContent
                catalogue={catalogue}
                page={page}
                pageSize={productsPerPage}
                filterKey={JSON.stringify([categories, brands, tags, priceRanges, search ?? ""])}
            />
            <SiteFooter />
        </>
    );
}
