import "server-only";

import { getHyperinventoryEnvironment } from "@/lib/env";
import { hyperinventoryRequest } from "@/services/hyperinventory/client";
import type {
    HyperinventoryLoginRequestDto,
    HyperinventoryLoginResponseDto,
    HyperinventoryRequestLoginOtpRequestDto,
    HyperinventorySignupRequestDto,
    HyperinventoryRequestLoginOtpResponseDto,
    HyperinventoryValidateLoginOtpRequestDto,
} from "@/types/dto/hyperinventory/auth.dto";
import type { AuthSessionModel } from "@/types/models/auth.model";
import { mapLoginResponseToSession } from "@/utils/mappers/auth.mapper";

type LoginWithPasswordInput = {
    username: string;
    password: string;
};

/**
 * Password login. `provider` is fixed to "consumer" for the storefront and
 * `seller_company` comes from HYPERINVENTORY_SELLER_ID, so neither is ever
 * accepted from the browser.
 */
export async function loginWithPassword({ username, password }: LoginWithPasswordInput): Promise<AuthSessionModel> {
    const environment = getHyperinventoryEnvironment();

    console.log("environment", { ...environment, clientSecret: "<redacted>" });
    

    const payload: HyperinventoryLoginRequestDto = {
        username,
        password,
        provider: "consumer",
        seller_company: environment.sellerId,
    };


    console.log("payload", { ...payload, password: "<redacted>" });
    

    const response = await hyperinventoryRequest<HyperinventoryLoginResponseDto>("admin/auth/login/", {
        apiVersion: "v1",
        method: "POST",
        body: JSON.stringify(payload),
    });

    console.log("response", { ...response, access_token: "<redacted>", refresh_token: "<redacted>" });
    

    return mapLoginResponseToSession(response);
}

/**
 * Asks the provider to email a one-time code.
 *
 * Only the address is sent; `provider` is fixed server-side. The response is a
 * bare `{ success: true }` and says nothing about whether the account exists,
 * which is exactly what we want to pass on.
 */
export async function requestLoginOtp(username: string): Promise<boolean> {
    const payload: HyperinventoryRequestLoginOtpRequestDto = {
        username,
        provider: "consumer",
    };

    const response = await hyperinventoryRequest<HyperinventoryRequestLoginOtpResponseDto>(
        "admin/auth/request_login_otp/",
        {
            apiVersion: "v1",
            method: "POST",
            body: JSON.stringify(payload),
        },
    );

    return response?.success === true;
}

/**
 * Exchanges the emailed code for a session.
 *
 * This endpoint lives at `/v1/auth/`, not `/v1/admin/auth/` like the request
 * step, and takes no username: the code identifies the pending login on its own.
 * It answers with the same shape as password login, so the session maps the same
 * way.
 */
export async function loginWithOtp(verificationToken: string): Promise<AuthSessionModel> {
    const { sellerId } = getHyperinventoryEnvironment();

    const payload: HyperinventoryValidateLoginOtpRequestDto = {
        verification_token: verificationToken,
        provider: "consumer",
        seller_company: sellerId,
    };

    const response = await hyperinventoryRequest<HyperinventoryLoginResponseDto>("auth/validate_login_otp/", {
        apiVersion: "v1",
        method: "POST",
        body: JSON.stringify(payload),
    });

    return mapLoginResponseToSession(response);
}

type SignupInput = {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
};

/**
 * Creates a consumer account.
 *
 * `provider` and `seller_company` are fixed server-side like every other auth
 * call. The response has been seen carrying a full session, so it is typed as
 * the login shape and read defensively by the caller: a signup that does not
 * return tokens simply sends the visitor to sign in.
 */
export async function signupConsumer(input: SignupInput): Promise<Partial<HyperinventoryLoginResponseDto>> {
    const { sellerId } = getHyperinventoryEnvironment();

    const payload: HyperinventorySignupRequestDto = {
        first_name: input.firstName,
        last_name: input.lastName,
        email: input.email,
        username: input.email,
        mobile_number: input.mobile,
        password: input.password,
        provider: "consumer",
        seller_company: sellerId,
    };

    return hyperinventoryRequest<Partial<HyperinventoryLoginResponseDto>>("consumer/auth/signup/", {
        apiVersion: "v1",
        method: "POST",
        body: JSON.stringify(payload),
    });
}
