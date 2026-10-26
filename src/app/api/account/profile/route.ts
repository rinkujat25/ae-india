import { NextResponse } from "next/server";
import { authSessionFallbackSeconds } from "@/constants/auth";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { updateConsumerProfile } from "@/services/hyperinventory/profile.service";
import type { AuthProfileModel } from "@/types/models/auth.model";
import { getAuthAccessToken, getAuthProfile } from "@/utils/auth-profile";
import { writeAuthProfile } from "@/utils/auth-session";
import { validateProfileNames } from "@/utils/profile-validation";

type UpdateProfileRequestBody = {
    firstName?: string;
    lastName?: string;
};

function getProviderErrorMessage(details: unknown) {
    if (!details || typeof details !== "object" || Array.isArray(details)) {
        return "";
    }

    const error = details as Record<string, unknown>;
    const message = error.message ?? error.detail ?? error.error;

    return typeof message === "string" ? message : "";
}

export async function PATCH(request: Request) {
    const accessToken = await getAuthAccessToken();
    const currentProfile = await getAuthProfile();

    if (!accessToken || !currentProfile) {
        return NextResponse.json({ message: "Please sign in again." }, { status: 401 });
    }

    let input: UpdateProfileRequestBody;

    try {
        input = (await request.json()) as UpdateProfileRequestBody;
    } catch {
        return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const firstName = input.firstName?.trim() ?? "";
    const lastName = input.lastName?.trim() ?? "";
    const errors = validateProfileNames(firstName, lastName);

    if (Object.keys(errors).length > 0) {
        return NextResponse.json(
            { message: errors.firstName ?? errors.lastName ?? "Check the name fields.", errors },
            { status: 400 },
        );
    }

    try {
        const updated = await updateConsumerProfile({ accessToken, firstName, lastName });

        // Trust the provider's echo when it sends one, otherwise what we submitted.
        const nextFirstName = updated?.first_name?.trim() || firstName;
        const nextLastName = updated?.last_name?.trim() || lastName;

        const profile: AuthProfileModel = {
            ...currentProfile,
            user: {
                ...currentProfile.user,
                firstName: nextFirstName,
                lastName: nextLastName,
                fullName: `${nextFirstName} ${nextLastName}`.trim(),
            },
        };

        const response = NextResponse.json({ profile });

        writeAuthProfile(response, profile, authSessionFallbackSeconds);

        return response;
    } catch (error) {
        if (error instanceof HyperinventoryApiError) {
            if (error.status === 401 || error.status === 403) {
                return NextResponse.json({ message: "Your session expired. Please sign in again." }, { status: 401 });
            }

            return NextResponse.json(
                { message: getProviderErrorMessage(error.details) || "That change could not be saved." },
                { status: error.status },
            );
        }

        console.error("Profile update failed before reaching the provider.");

        return NextResponse.json({ message: "Profile updates are unavailable right now." }, { status: 500 });
    }
}
