import { NextResponse } from "next/server";
import { loginWithPassword } from "@/services/hyperinventory/auth.service";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { writeAuthSession } from "@/utils/auth-session";

type LoginRequestBody = {
    email?: string;
    password?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getProviderErrorMessage(details: unknown) {
    if (!details || typeof details !== "object" || Array.isArray(details)) {
        return "";
    }

    const error = details as Record<string, unknown>;
    const message = error.message ?? error.detail ?? error.error ?? error.error_description;

    return typeof message === "string" ? message : "";
}

export async function POST(request: Request) {
    let input: LoginRequestBody;

    try {
        input = (await request.json()) as LoginRequestBody;
    } catch {
        return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const email = input.email?.trim() ?? "";
    const password = input.password ?? "";

    if (!emailPattern.test(email) || password.length === 0) {
        return NextResponse.json({ message: "Enter a valid email and your password." }, { status: 400 });
    }

    try {
        const session = await loginWithPassword({ username: email, password });

        // Only display fields go back to the browser; the tokens stay in httpOnly cookies.
        const response = NextResponse.json({
            profile: { user: session.user, company: session.company },
        });

        writeAuthSession(response, session);

        return response;
    } catch (error) {
        if (error instanceof HyperinventoryApiError) {
            // Never echo the provider's message for auth failures — it can confirm
            // whether an account exists. Everything else keeps its provider message.
            const isAuthFailure = error.status === 400 || error.status === 401 || error.status === 403;
            const message = isAuthFailure
                ? "That email and password combination did not work."
                : getProviderErrorMessage(error.details) || "Login is unavailable right now. Please try again.";

            return NextResponse.json({ message }, { status: isAuthFailure ? 401 : error.status });
        }

        console.error("Login failed before reaching the provider.");

        return NextResponse.json(
            { message: "Login is not configured on this environment." },
            { status: 500 },
        );
    }
}
