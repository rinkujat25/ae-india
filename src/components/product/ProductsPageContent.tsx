import { ProductListing } from "@/components/product/ProductListing";
import type { ProductListModel } from "@/types/models/product.model";

type ProductsPageContentProps = {
    catalogue: ProductListModel | null;
    /**
     * The filters this catalogue was fetched for. Used as the listing's `key`,
     * so changing a filter remounts it: the pages loaded by infinite scroll
     * belong to the old filter and must not survive into the new results.
     */
    filterKey: string;
    /** 1-based page number from the URL. */
    page: number;
    pageSize: number;
};

export function ProductsPageContent({ catalogue, filterKey, page, pageSize }: ProductsPageContentProps) {
    return (
        <main className="products-page">
            <div className="wrap">
                {catalogue ? (
                    <ProductListing catalogue={catalogue} page={page} pageSize={pageSize} key={filterKey} />
                ) : (
                    <section className="empty" role="alert">
                        The product catalogue is temporarily unavailable. Please try again shortly.
                    </section>
                )}
            </div>
        </main>
    );
}
