import { NextResponse } from "next/server";
import { requestLoginOtp } from "@/services/hyperinventory/auth.service";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";

type RequestOtpBody = {
    email?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The provider's resend throttle. Its own code, so it survives copy changes. */
const throttleCode = "1028";

function getProviderError(details: unknown) {
    if (!details || typeof details !== "object" || Array.isArray(details)) return { code: "", message: "" };

    const error = details as Record<string, unknown>;

    return {
        code: typeof error.code === "string" ? error.code : "",
        message: typeof error.message === "string" ? error.message : "",
    };
}

export async function POST(request: Request) {
    let input: RequestOtpBody;

    try {
        input = (await request.json()) as RequestOtpBody;
    } catch {
        return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const email = input.email?.trim() ?? "";

    if (!emailPattern.test(email)) {
        return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
    }

    try {
        await requestLoginOtp(email);
    } catch (error) {
        const isProviderRejection = error instanceof HyperinventoryApiError
            && error.status >= 400
            && error.status < 500;

        if (!isProviderRejection) {
            return NextResponse.json(
                { message: "We could not send a code right now. Please try again." },
                { status: 502 },
            );
        }

        const { code, message } = getProviderError(
            error instanceof HyperinventoryApiError ? error.details : null,
        );

        // The resend throttle is about timing, not about whether an account
        // exists, so it is passed through — answering "sent" here would be a
        // lie the visitor acts on by waiting for an email that never arrives.
        if (code === throttleCode) {
            return NextResponse.json(
                { message: message || "Please wait a minute before asking for another code." },
                { status: 429 },
            );
        }

        // Every other rejection would say whether the address has an account,
        // so it is answered as if a code was sent.
    }

    // Deliberately the same answer either way: see above.
    return NextResponse.json({ sent: true });
}
