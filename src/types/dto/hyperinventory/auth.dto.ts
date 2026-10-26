export type HyperinventoryLoginRequestDto = {
    username: string;
    password: string;
    /** Fixed for the storefront; admin/staff logins use a different provider. */
    provider: "consumer";
    seller_company: string;
};

export type HyperinventoryRequestLoginOtpRequestDto = {
    username: string;
    /** Fixed for the storefront; admin/staff logins use a different provider. */
    provider: "consumer";
};

/** `POST /v1/admin/auth/request_login_otp/` answers with nothing but a flag. */
export type HyperinventoryRequestLoginOtpResponseDto = {
    success?: boolean;
};

/**
 * `POST /v1/auth/validate_login_otp/`.
 *
 * Note the path: this one is **not** under `/admin/`, unlike the request step.
 * It carries no username — the code alone identifies the pending login — so the
 * code is the whole credential and is treated as one.
 */
export type HyperinventoryValidateLoginOtpRequestDto = {
    verification_token: string;
    provider: "consumer";
    seller_company: string;
};

/**
 * `POST /v1/consumer/auth/signup/`.
 *
 * `username` repeats the email — the provider keys the account on it. The utm
 * and attribution fields the reference site sends are omitted: we have no
 * attribution tracking, and inventing values would write fiction into their
 * analytics.
 */
export type HyperinventorySignupRequestDto = {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    mobile_number: string;
    password: string;
    provider: "consumer";
    seller_company: string;
};

export type HyperinventoryLoginRoleDto = {
    id: number;
    name: string;
    display_name: string;
    description: string | null;
    data_scope: string;
};

export type HyperinventoryLoginUserDto = {
    id: string;
    username: string;
    role: HyperinventoryLoginRoleDto;
    first_name: string;
    last_name: string;
    email: string;
    access_permissions?: {
        navigation?: string;
        actions?: string;
    };
};

export type HyperinventoryLoginCompanyDto = {
    id: string;
    name: string;
    contact_first_name: string;
    contact_last_name: string;
    contact_email: string;
    contact_mobile_number: string;
    is_verified: boolean;
    verified_at: string | null;
    is_active: boolean;
    account_id: string;
};

export type HyperinventoryLoginResponseDto = {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    company: HyperinventoryLoginCompanyDto;
    user: HyperinventoryLoginUserDto;
    branches?: unknown[];
};

export type HyperinventoryUpdateProfileRequestDto = {
    first_name: string;
    last_name: string;
};

/** `PATCH /consumer/me` echoes the updated user; fields are treated as optional. */
export type HyperinventoryConsumerMeDto = {
    id?: string;
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
};
