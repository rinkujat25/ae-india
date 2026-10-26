import type { HyperinventoryCashPointDto } from "@/types/dto/hyperinventory/cash-point.dto";
import type { CashPointsModel } from "@/types/models/cash-point.model";

function toNumber(value: number | undefined) {
    const parsed = Number(value ?? 0);
    return Number.isFinite(parsed) ? parsed : 0;
}

export function mapCashPoints(dto: HyperinventoryCashPointDto): CashPointsModel {
    return {
        balance: toNumber(dto.total_cashpoints),
        expiring: toNumber(dto.expiring_cash_points),
        redeemed: toNumber(dto.redeemed_cashpoints),
        pending: toNumber(dto.coming_cash_points),
        isEnabled: dto.cash_points_data === true,
    };
}
