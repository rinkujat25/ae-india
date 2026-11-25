import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthStyles } from "@/components/auth/AuthStyles";
import { LoginOtpRequestForm } from "@/components/auth/LoginOtpRequestForm";
import { LoginOtpVerifyForm } from "@/components/auth/LoginOtpVerifyForm";
import { LoginPasswordForm } from "@/components/auth/LoginPasswordForm";
import { buildLoginHref, resolveLoginEmail, resolveLoginMode, resolveLoginNext, resolveLoginStep } from "@/utils/auth-mode";
import { getOtpResendSeconds } from "@/lib/env";
import { getAuthProfile } from "@/utils/auth-profile";

export const metadata: Metadata = {
    title: "Login | AE India",
    description: "Sign in to your AE India account with a one-time code or your password.",
    robots: {
        index: false,
        follow: false,
    },
};

type LoginPageProps = {
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const params = await searchParams;
    // Where the visitor was headed before they were asked to sign in, e.g. the
    // cart sending them here from "Proceed To Buy".
    const next = resolveLoginNext(params?.next);

    if (await getAuthProfile()) {
        redirect(next || "/account");
    }

    const mode = resolveLoginMode(params?.mode);
    const step = resolveLoginStep(params?.step);
    const email = resolveLoginEmail(params?.email);
    const isVerifying = mode === "otp" && step === "verify";

    const description = isVerifying
        ? "Enter the one-time code we sent so we can sign you in."
        : mode === "password"
          ? "If you are a registered user, please enter your email and password to log in to your account."
          : "If you are a registered user, please enter your email and we will send the OTP on your email.";

    return (
        <>
            <AuthShell
                title={isVerifying ? "Enter OTP" : "Login"}
                description={description}
                backHref={isVerifying ? buildLoginHref({ mode: "otp", email, next }) : "/"}
                backLabel={isVerifying ? "Back to email entry" : "Back to home"}
            >
                {isVerifying ? (
                    <LoginOtpVerifyForm email={email} next={next} resendSeconds={getOtpResendSeconds()} />
                ) : mode === "password" ? (
                    <LoginPasswordForm email={email} next={next} />
                ) : (
                    <LoginOtpRequestForm email={email} next={next} resendSeconds={getOtpResendSeconds()} />
                )}
            </AuthShell>
            <AuthStyles />
        </>
    );
}
