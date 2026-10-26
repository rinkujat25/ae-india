/** How the visitor wants to prove who they are. */
export type AuthLoginMode = "otp" | "password";

/** OTP login is two steps: ask for the code, then enter it. */
export type AuthLoginStep = "request" | "verify";

export type AuthUserModel = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    roleName: string;
    dataScope: string;
};

export type AuthCompanyModel = {
    id: string;
    name: string;
    email: string;
    mobileNumber: string;
    accountId: string;
    isVerified: boolean;
    isActive: boolean;
};

/** Server-side only: the tokens never leave the route handler. */
export type AuthSessionModel = {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: AuthUserModel;
    company: AuthCompanyModel;
};

/** The safe subset a browser is allowed to see. */
export type AuthProfileModel = {
    user: AuthUserModel;
    company: AuthCompanyModel;
};
