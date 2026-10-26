/** httpOnly cookie names. Tokens are never readable from JavaScript. */
export const authAccessTokenCookie = "gv_access_token";
export const authRefreshTokenCookie = "gv_refresh_token";

/** Display-only profile, readable by the server to render signed-in pages. */
export const authProfileCookie = "gv_profile";

/** Fallback lifetime when the provider omits expires_in. */
export const authSessionFallbackSeconds = 60 * 60 * 24;
