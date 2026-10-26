import "server-only";

import { hyperinventoryRequest } from "@/services/hyperinventory/client";
import type { HyperinventoryPaymentMethodListDto } from "@/types/dto/hyperinventory/payment.dto";
import type { PaymentMethodModel } from "@/types/models/payment.model";
import { mapPaymentMethodList } from "@/utils/mappers/payment.mapper";

/**
 * The payment modes offered for one quotation.
 *
 * These hang off a quotation, not the cart: the amounts and any per-method
 * charge are quoted for that specific order.
 */
export async function getQuotationPaymentMethods(
    accessToken: string,
    quotationId: string,
): Promise<PaymentMethodModel[]> {
    const response = await hyperinventoryRequest<HyperinventoryPaymentMethodListDto>(
        `consumer/quotations/${encodeURIComponent(quotationId)}/payment_methods/`,
        { apiVersion: "v1", accessToken },
    );

    return mapPaymentMethodList(response?.results ?? []);
}
