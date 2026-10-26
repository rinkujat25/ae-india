import type { HyperinventoryStateDto } from "@/types/dto/hyperinventory/state.dto";
import type { StateModel } from "@/types/models/state.model";

export function mapStateDtoToModel(dto: HyperinventoryStateDto): StateModel {
    return {
        id: dto.id,
        name: dto.name ?? "",
        code: dto.code ?? "",
    };
}

export function mapStateListToModels(results: HyperinventoryStateDto[]): StateModel[] {
    return results
        .filter((dto) => typeof dto?.id === "number" && Boolean(dto?.name))
        .map(mapStateDtoToModel)
        .sort((a, b) => a.name.localeCompare(b.name));
}
