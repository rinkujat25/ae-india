import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthStyles } from "@/components/auth/AuthStyles";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { getAuthProfile } from "@/utils/auth-profile";

export const metadata: Metadata = {
    title: "Create your account | AE India",
    description: "Create an AE India account to order supplies, save your billing details and track every order.",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function RegisterPage() {
    // Someone already signed in has no account to create.
    if (await getAuthProfile()) {
        redirect("/account");
    }

    return (
        <>
            <AuthShell
                title="Create your account"
                description="A few details and you are set up to order, track and reorder corporate gifts."
                backHref="/auth/login"
                backLabel="Back to Login"
            >
                <RegisterForm />
            </AuthShell>
            <AuthStyles />
        </>
    );
}
