import "server-only";

import { hyperinventoryRequest } from "@/services/hyperinventory/client";
import type {
    HyperinventoryFinaliseQuotationRequestDto,
    HyperinventoryGenerateOrderResponseDto,
    HyperinventoryInitiateQuotationResponseDto,
    HyperinventoryQuotationDto,
} from "@/types/dto/hyperinventory/quotation.dto";
import type { OrderConfirmationModel } from "@/types/models/order-confirmation.model";
import type { QuotationModel } from "@/types/models/quotation.model";
import { mapOrderConfirmation, mapQuotation } from "@/utils/mappers/quotation.mapper";

/**
 * Turns the buyer's cart into a quotation, which is what the rest of checkout
 * hangs off: payment modes, charges and the final amount are all quoted per
 * quotation rather than per cart.
 *
 * This is a write, so it runs once when the buyer enters checkout — never from
 * a server render, which would mint a fresh quotation on every refresh.
 */
export async function initiateQuotation(accessToken: string, cartId: string): Promise<QuotationModel> {
    const response = await hyperinventoryRequest<HyperinventoryInitiateQuotationResponseDto>(
        `consumer/carts/${encodeURIComponent(cartId)}/initiate_quotation/`,
        {
            apiVersion: "v1",
            method: "POST",
            accessToken,
            body: JSON.stringify({}),
        },
    );

    return mapQuotation(response.quotation);
}

/**
 * Attaches a chosen address to the quotation.
 *
 * Both endpoints answer with the whole updated quotation and leave the other
 * address alone, so each step can commit its own choice independently. Shipping
 * charges are quoted against the destination, which is why the returned
 * quotation — not the one from `initiateQuotation` — is what prices the order.
 */
export async function assignQuotationAddress(
    accessToken: string,
    quotationId: string,
    addressType: "billing" | "shipping",
    addressId: string,
): Promise<QuotationModel> {
    const field = addressType === "billing" ? "billing_address" : "shipping_address";

    const response = await hyperinventoryRequest<HyperinventoryQuotationDto>(
        `consumer/quotations/${encodeURIComponent(quotationId)}/assign_${field}/`,
        {
            apiVersion: "v1",
            method: "PATCH",
            accessToken,
            body: JSON.stringify({ [field]: addressId }),
        },
    );

    return mapQuotation(response);
}

/**
 * Locks the quotation down before it becomes an order.
 *
 * This reuses the `assign_billing_address` endpoint, but with the full set:
 * both addresses, the payment method and the shipping-charge option. Sending
 * them together is what the provider expects immediately before
 * `generateOrder`, even though the addresses were already assigned per step.
 */
export async function finaliseQuotation(
    accessToken: string,
    quotationId: string,
    input: {
        billingAddressId: string;
        shippingAddressId: string;
        paymentMethodId: string;
    },
): Promise<QuotationModel> {
    const payload: HyperinventoryFinaliseQuotationRequestDto = {
        billing_address: input.billingAddressId,
        shipping_address: input.shippingAddressId,
        payment_method: input.paymentMethodId,
        opted_shipping_charges: "",
    };

    const response = await hyperinventoryRequest<HyperinventoryQuotationDto>(
        `consumer/quotations/${encodeURIComponent(quotationId)}/assign_billing_address/`,
        {
            apiVersion: "v1",
            method: "PATCH",
            accessToken,
            body: JSON.stringify(payload),
        },
    );

    return mapQuotation(response);
}

/**
 * Turns the finalised quotation into a real order.
 *
 * This is the point of no return: it is the only call in checkout that commits
 * the buyer, so it runs exactly once per click and never on a render.
 */
export async function generateOrder(
    accessToken: string,
    quotationId: string,
): Promise<OrderConfirmationModel> {
    const response = await hyperinventoryRequest<HyperinventoryGenerateOrderResponseDto>(
        `consumer/quotations/${encodeURIComponent(quotationId)}/generate_order/`,
        {
            apiVersion: "v1",
            method: "POST",
            accessToken,
            body: JSON.stringify({ accept_partial_amount: true }),
        },
    );

    return mapOrderConfirmation(response ?? {});
}
