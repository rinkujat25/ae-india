import "server-only";

import { hyperinventoryRequest } from "@/services/hyperinventory/client";
import type {
    HyperinventoryConsumerMeDto,
    HyperinventoryUpdateProfileRequestDto,
} from "@/types/dto/hyperinventory/auth.dto";

type UpdateProfileInput = {
    accessToken: string;
    firstName: string;
    lastName: string;
};

/**
 * Updates the signed-in consumer's name.
 *
 * Authenticated call: the access token comes from the server-side session
 * cookie, never from the request body.
 */
export async function updateConsumerProfile({
    accessToken,
    firstName,
    lastName,
}: UpdateProfileInput): Promise<HyperinventoryConsumerMeDto> {
    const payload: HyperinventoryUpdateProfileRequestDto = {
        first_name: firstName,
        last_name: lastName,
    };

    return hyperinventoryRequest<HyperinventoryConsumerMeDto>("consumer/me", {
        apiVersion: "v1",
        method: "PATCH",
        accessToken,
        body: JSON.stringify(payload),
    });
}

/** The authoritative consumer profile. Login returns the company contact, which can differ. */
export async function getConsumerProfile(accessToken: string): Promise<HyperinventoryConsumerMeDto> {
    return hyperinventoryRequest<HyperinventoryConsumerMeDto>("consumer/me", {
        apiVersion: "v1",
        accessToken,
    });
}
