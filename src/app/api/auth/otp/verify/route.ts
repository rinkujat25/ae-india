import { NextResponse } from "next/server";
import { loginWithOtp } from "@/services/hyperinventory/auth.service";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { writeAuthSession } from "@/utils/auth-session";

type VerifyOtpBody = {
    code?: string;
};

/** The provider issues six digits. */
const codePattern = /^\d{6}$/;

export async function POST(request: Request) {
    let input: VerifyOtpBody;

    try {
        input = (await request.json()) as VerifyOtpBody;
    } catch {
        return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const code = input.code?.trim() ?? "";

    if (!codePattern.test(code)) {
        return NextResponse.json({ message: "Enter the 6-digit code from your email." }, { status: 400 });
    }

    try {
        const session = await loginWithOtp(code);

        // Only display fields go back to the browser; the tokens stay in
        // httpOnly cookies, exactly as with password login.
        const response = NextResponse.json({
            profile: { user: session.user, company: session.company },
        });

        writeAuthSession(response, session);

        return response;
    } catch (error) {
        if (error instanceof HyperinventoryApiError) {
            const isRejected = error.status >= 400 && error.status < 500;

            // One message for wrong, expired and already-used codes: the
            // difference between them is worth knowing to someone guessing.
            return NextResponse.json(
                {
                    message: isRejected
                        ? "That code did not work. Request a new one and try again."
                        : "Login is unavailable right now. Please try again.",
                },
                { status: isRejected ? 401 : error.status },
            );
        }

        return NextResponse.json({ message: "Login is unavailable right now. Please try again." }, { status: 502 });
    }
}
