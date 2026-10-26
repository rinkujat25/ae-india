import type {
    HyperinventoryGenerateOrderResponseDto,
    HyperinventoryQuotationDto,
} from "@/types/dto/hyperinventory/quotation.dto";
import type { OrderConfirmationModel } from "@/types/models/order-confirmation.model";
import type { QuotationModel } from "@/types/models/quotation.model";

function toNumber(value: number | undefined) {
    const parsed = Number(value ?? 0);
    return Number.isFinite(parsed) ? parsed : 0;
}

export function mapQuotation(dto: HyperinventoryQuotationDto): QuotationModel {
    return {
        id: dto.id,
        number: dto.quotation_number ?? "",
        status: dto.status ?? "",
        subtotal: toNumber(dto.subtotal),
        gstAmount: toNumber(dto.gst_amount),
        discount: toNumber(dto.total_discount),
        shippingCharges: toNumber(dto.shipping_charges),
        // `effective_total` accounts for offers and cash points; `quotation_total`
        // is the pre-adjustment figure, so it is only the fallback.
        total: toNumber(dto.effective_total ?? dto.quotation_total),
        isExpired: dto.is_expired === true,
        billingAddressId: dto.billing_address?.id ?? "",
        shippingAddressId: dto.shipping_address?.id ?? "",
    };
}

/** Tolerant of the order arriving at the top level or nested under `order`. */
export function mapOrderConfirmation(dto: HyperinventoryGenerateOrderResponseDto): OrderConfirmationModel {
    const order = dto.order?.id ? dto.order : dto;

    return {
        id: order.id ?? "",
        number: order.order_number ?? "",
        total: toNumber(order.order_total),
        status: order.status ?? "",
    };
}
