import "server-only";

import { getHyperinventoryEnvironment } from "@/lib/env";
import { HyperinventoryApiError, hyperinventoryRequest } from "@/services/hyperinventory/client";
import type {
    HyperinventoryOrderDetailDto,
    HyperinventoryOrderListDto,
} from "@/types/dto/hyperinventory/order.dto";
import type { OrderDetailModel, OrderModel } from "@/types/models/order.model";
import { mapOrderDetailToModel, mapOrderListToModels } from "@/utils/mappers/order.mapper";

const defaultLimit = 20;

export async function getCompanyOrders(
    accessToken: string,
    companyId: string,
    limit = defaultLimit,
): Promise<OrderModel[]> {
    const { sellerId } = getHyperinventoryEnvironment();

    const response = await hyperinventoryRequest<HyperinventoryOrderListDto>(
        `consumer/companies/${encodeURIComponent(companyId)}/orders`,
        {
            accessToken,
            query: { ordering: "-created_at", seller: sellerId, limit, offset: 0 },
        },
    );

    return mapOrderListToModels(response?.results ?? []);
}

/**
 * One order in full.
 *
 * v2, not v1: the detail endpoint only exists there, and `expand` is what makes
 * it return the payment method as an object rather than an id.
 *
 * A 404 means the order is not this buyer's, so it comes back as null and the
 * page renders "not found" rather than an error.
 */
export async function getOrderDetail(
    accessToken: string,
    orderId: string,
): Promise<OrderDetailModel | null> {
    const { sellerId } = getHyperinventoryEnvironment();

    try {
        const response = await hyperinventoryRequest<HyperinventoryOrderDetailDto>(
            `consumer/orders/${encodeURIComponent(orderId)}/`,
            {
                apiVersion: "v2",
                accessToken,
                query: { seller: sellerId, expand: "shipping_method,payment_method" },
            },
        );

        return response?.id ? mapOrderDetailToModel(response) : null;
    } catch (error) {
        if (error instanceof HyperinventoryApiError && (error.status === 404 || error.status === 403)) {
            return null;
        }

        throw error;
    }
}
