import { NextResponse } from "next/server";
import { signupConsumer } from "@/services/hyperinventory/auth.service";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { mapLoginResponseToSession } from "@/utils/mappers/auth.mapper";
import { writeAuthSession } from "@/utils/auth-session";
import { normaliseMobile, type SignupValues, validateSignup } from "@/utils/signup-validation";

function getProviderErrorMessage(details: unknown) {
    if (!details || typeof details !== "object" || Array.isArray(details)) return "";

    const error = details as Record<string, unknown>;
    const message = error.message ?? error.detail ?? error.error;

    if (typeof message === "string") return message;

    // DRF-style field errors: { email: ["..."] }
    const firstField = Object.values(error)[0];

    if (Array.isArray(firstField) && typeof firstField[0] === "string") return firstField[0];

    return "";
}

export async function POST(request: Request) {
    let input: Partial<SignupValues>;

    try {
        input = (await request.json()) as Partial<SignupValues>;
    } catch {
        return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const values: SignupValues = {
        firstName: (input.firstName ?? "").trim(),
        lastName: (input.lastName ?? "").trim(),
        email: (input.email ?? "").trim(),
        mobile: (input.mobile ?? "").trim(),
        password: input.password ?? "",
    };

    // Re-validated here because anything in the browser can be bypassed.
    const errors = validateSignup(values);

    if (Object.keys(errors).length > 0) {
        return NextResponse.json({ message: "Check the highlighted fields.", errors }, { status: 400 });
    }

    try {
        const created = await signupConsumer({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            mobile: normaliseMobile(values.mobile),
            password: values.password,
        });

        // Some providers sign the new account straight in. If tokens came back,
        // the session is established here; if not, the browser is told to go and
        // sign in rather than being left on a dead end.
        if (created?.access_token && created.user && created.company) {
            const session = mapLoginResponseToSession(created as Required<typeof created>);
            const response = NextResponse.json(
                { profile: { user: session.user, company: session.company }, signedIn: true },
                { status: 201 },
            );

            writeAuthSession(response, session);

            return response;
        }

        return NextResponse.json({ signedIn: false }, { status: 201 });
    } catch (error) {
        if (error instanceof HyperinventoryApiError) {
            const isRejected = error.status >= 400 && error.status < 500;

            // The provider's own message is kept here: unlike login, "this email
            // is already registered" is something the person needs to be told.
            return NextResponse.json(
                {
                    message: isRejected
                        ? getProviderErrorMessage(error.details) || "That account could not be created."
                        : "Registration is unavailable right now. Please try again.",
                },
                { status: isRejected ? error.status : 502 },
            );
        }

        return NextResponse.json(
            { message: "Registration is unavailable right now. Please try again." },
            { status: 502 },
        );
    }
}
