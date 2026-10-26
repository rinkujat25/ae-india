import "server-only";

import { getHyperinventoryEnvironment } from "@/lib/env";

type QueryValue = boolean | number | string | undefined;

type HyperinventoryRequestOptions = Omit<RequestInit, "credentials" | "headers"> & {
    accessToken?: string;
    apiVersion?: "v1" | "v2";
    headers?: HeadersInit;
    query?: Record<string, QueryValue>;
};

export class HyperinventoryApiError extends Error {
    constructor(
        message: string,
        readonly status: number,
        readonly details?: unknown,
    ) {
        super(message);
        this.name = "HyperinventoryApiError";
    }
}

function createUrl(path: string, query?: Record<string, QueryValue>, apiVersion?: "v1" | "v2") {
    const environment = getHyperinventoryEnvironment();
    const baseUrl = new URL(environment.apiUrl);

    if (apiVersion) {
        baseUrl.pathname = baseUrl.pathname.replace(/\/v\d+\/?$/, `/${apiVersion}/`);
    }

    const url = new URL(path.replace(/^\//, ""), `${baseUrl.toString().replace(/\/?$/, "/")}`);

    Object.entries(query ?? {}).forEach(([key, value]) => {
        if (value !== undefined) {
            url.searchParams.set(key, String(value));
        }
    });

    return url;
}

const secretKeys = new Set(["access_token", "refresh_token", "password", "clientsecret", "client_secret"]);

/** Shallow copy with credential fields masked, for debug logging only. */
function redactSecrets(payload: unknown) {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
        return payload;
    }

    return Object.fromEntries(
        Object.entries(payload as Record<string, unknown>).map(([key, value]) =>
            secretKeys.has(key.toLowerCase()) ? [key, "<redacted>"] : [key, value],
        ),
    );
}

export async function hyperinventoryRequest<Response>(
    path: string,
    options: HyperinventoryRequestOptions = {},
): Promise<Response> {
    const environment = getHyperinventoryEnvironment();
    const { accessToken, apiVersion, headers: customHeaders, query, ...requestInit } = options;
    const headers = new Headers(customHeaders);

    headers.set("accept", "application/json");

    if (requestInit.body) {
        headers.set("content-type", "application/json");
    }

    if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
    } else {
        headers.set("saleschannel", environment.salesChannel);
        headers.set("clientid", environment.clientId);
        headers.set("clientsecret", environment.clientSecret);

        const { origin, referer } = environment;

        if (origin) {
            headers.set("origin", origin);
        }

        if (referer) {
            headers.set("referer", referer);
        }
    }

    console.log("path", path);
    console.log("query", query);
    

    const response = await fetch(createUrl(path, query, apiVersion), {
        ...requestInit,
        headers,
        cache: requestInit.cache ?? "no-store",
        signal: requestInit.signal ?? AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
        const responseText = await response.text();
        let details: unknown = responseText;

        try {
            details = JSON.parse(responseText) as unknown;
        } catch {
            // Keep non-JSON provider errors as plain text for server-side diagnosis.
        }

        throw new HyperinventoryApiError(
            `Hyperinventory request failed with status ${response.status}`,
            response.status,
            details,
        );
    }

    if (response.status === 204) {
        return null as Response;
    }

    // A fetch body is a one-shot stream, so it is read exactly once here.
    const payload = (await response.json()) as Response;

    // Tokens must never reach the server log; everything else is safe to inspect.
    console.log("response.json()", redactSecrets(payload));

    return payload;
}
