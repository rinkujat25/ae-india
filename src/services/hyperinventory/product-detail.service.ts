import "server-only";
import { cache } from "react";

import { getHyperinventoryEnvironment } from "@/lib/env";
import { hyperinventoryRequest } from "@/services/hyperinventory/client";
import type {
    HyperinventoryProductAssetsResponseDto,
    HyperinventoryProductDetailResponseDto,
    HyperinventoryProductDownloadsResponseDto,
} from "@/types/dto/hyperinventory/product-detail.dto";
import type { ProductDetailModel } from "@/types/models/product-detail.model";
import { mapBoughtTogether } from "@/utils/mappers/bought-together.mapper";
import { mapHyperinventoryProductDetail, unwrapProductDetail } from "@/utils/mappers/product-detail.mapper";

/**
 * Wrapped in React's `cache` so one render pass fetches a product once.
 * `generateMetadata` and the page body both need it, and the request carries
 * `time: Date.now()` to defeat provider caching — which also defeats Next's, so
 * without this each product page would call the provider twice.
 */
export const getProductDetail = cache(async function getProductDetail(
    slug: string,
): Promise<ProductDetailModel> {
    const environment = getHyperinventoryEnvironment();
    const response = await hyperinventoryRequest<HyperinventoryProductDetailResponseDto>(
        `/consumer/products/${encodeURIComponent(slug)}`,
        {
            query: {
                seller: environment.sellerId,
                time: Date.now(),
            },
        },
    );

    const product = unwrapProductDetail(response);

    const apiOrigin = new URL(environment.apiUrl).origin;

    function getProviderUrl(value: string | null | undefined) {
        if (!value?.trim()) return null;
        const url = new URL(value, environment.apiUrl);
        return url.origin === apiOrigin ? url.toString() : null;
    }

    const assetsUrl = getProviderUrl(product.assets);
    const downloadsUrl = getProviderUrl(product.downloads);

    // The bundle arrives as a pointer with its own count. A zero count means
    // there is nothing to fetch, so the request is skipped rather than spent on
    // an answer already known to be empty.
    const bundle = product.frequently_bought_together_products;
    const bundleUrl = (bundle?.count ?? 0) > 0 ? getProviderUrl(bundle?.url) : null;

    const [assetsResponse, downloadsResponse, bundleResponse] = await Promise.all([
        assetsUrl
            ? hyperinventoryRequest<HyperinventoryProductAssetsResponseDto>(assetsUrl).catch(() => undefined)
            : undefined,
        downloadsUrl
            ? hyperinventoryRequest<HyperinventoryProductDownloadsResponseDto>(downloadsUrl).catch(() => undefined)
            : undefined,
        bundleUrl ? hyperinventoryRequest<unknown>(bundleUrl).catch(() => undefined) : undefined,
    ]);

    return {
        ...mapHyperinventoryProductDetail(response, slug, assetsResponse, downloadsResponse),
        boughtTogether: mapBoughtTogether(bundleResponse),
    };
});
