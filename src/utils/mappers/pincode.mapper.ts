import type { HyperinventoryPincodeDto } from "@/types/dto/hyperinventory/pincode.dto";
import type { PincodeModel } from "@/types/models/pincode.model";

export function mapPincodeDtoToModel(dto: HyperinventoryPincodeDto): PincodeModel {
    return {
        code: dto.code ?? "",
        city: dto.city ?? "",
        state: dto.state ?? "",
        stateId: Number(dto.state_id) || 0,
    };
}
