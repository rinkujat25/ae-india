import "server-only";

import { getHyperinventoryEnvironment } from "@/lib/env";
import { hyperinventoryRequest } from "@/services/hyperinventory/client";
import type { HyperinventoryCashPointDto } from "@/types/dto/hyperinventory/cash-point.dto";
import type { CashPointsModel } from "@/types/models/cash-point.model";
import { mapCashPoints } from "@/utils/mappers/cash-point.mapper";

/**
 * The signed-in buyer's cash points with this seller.
 *
 * The response is a bare object, not a paged list, and `cash_points_data` is
 * false when the seller runs no programme — which is not an error, just nothing
 * to show.
 */
export async function getSellerCashPoints(accessToken: string): Promise<CashPointsModel> {
    const { sellerId } = getHyperinventoryEnvironment();

    const response = await hyperinventoryRequest<HyperinventoryCashPointDto>(
        `consumer/sellers/${encodeURIComponent(sellerId)}/cash_point`,
        { apiVersion: "v1", accessToken },
    );

    return mapCashPoints(response ?? {});
}
