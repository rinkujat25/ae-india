import "server-only";

import { hyperinventoryRequest } from "@/services/hyperinventory/client";
import type { HyperinventoryStateListDto } from "@/types/dto/hyperinventory/state.dto";
import type { StateModel } from "@/types/models/state.model";
import { mapStateListToModels } from "@/utils/mappers/state.mapper";

/** Covers the full list in one call; the provider returns 37. */
const stateListLimit = 50;

export async function getStates(accessToken: string): Promise<StateModel[]> {
    const response = await hyperinventoryRequest<HyperinventoryStateListDto>("states", {
        apiVersion: "v1",
        accessToken,
        query: { limit: stateListLimit },
    });

    return mapStateListToModels(response?.results ?? []);
}
