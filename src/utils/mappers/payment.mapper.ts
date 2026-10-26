import type { HyperinventoryPaymentMethodDto } from "@/types/dto/hyperinventory/payment.dto";
import type { PaymentMethodModel } from "@/types/models/payment.model";

function toNumber(value: number | undefined) {
    const parsed = Number(value ?? 0);
    return Number.isFinite(parsed) ? parsed : 0;
}

export function mapPaymentMethod(dto: HyperinventoryPaymentMethodDto): PaymentMethodModel {
    return {
        id: dto.id,
        name: dto.name ?? "",
        description: dto.description ?? "",
        gatewayType: dto.gateway_type ?? "",
        charge: toNumber(dto.payment_method_charges?.applicable_charge),
        payableAmount: toNumber(dto.partial_payment_details?.payable_amount),
        supportsPartialPayment: dto.partial_payment_details?.is_partial_payment_applicable === true,
        creditBalance: dto.credit_balance ?? "",
    };
}

/**
 * Inactive methods are dropped, and `position` decides the order: the provider
 * pins a preferred method with a negative value rather than sorting by name.
 */
export function mapPaymentMethodList(results: HyperinventoryPaymentMethodDto[]): PaymentMethodModel[] {
    return results
        .filter((dto) => Boolean(dto?.id) && dto.is_active !== false)
        .sort((first, second) => (first.position ?? 0) - (second.position ?? 0))
        .map(mapPaymentMethod);
}
