"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import type { AccountProfileModel } from "@/types/models/account.model";
import type { AuthProfileModel } from "@/types/models/auth.model";
import { LinkLoadingIndicator } from "@/components/common/LinkLoadingIndicator";
import { accountSectionHref } from "@/utils/account-section";
import { nameMaxLength, type NameFieldErrors, validateProfileNames } from "@/utils/profile-validation";

type AccountEditPanelProps = {
    profile: AccountProfileModel;
};

type UpdateProfileResponse = { profile: AuthProfileModel };

/**
 * Only the name is editable. Email identifies the account with the provider,
 * and the rest of the profile is owned by the company record.
 */
export function AccountEditPanel({ profile }: AccountEditPanelProps) {
    const router = useRouter();
    const apiRequest = useApiRequest();
    const [status, setStatus] = useState<{ tone: "ok" | "error"; message: string } | null>(null);
    const [errors, setErrors] = useState<NameFieldErrors>({});
    const [isSaving, setIsSaving] = useState(false);

    /** Clears a field's error as soon as the visitor starts correcting it. */
    function clearFieldError(field: keyof NameFieldErrors) {
        setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isSaving) return;

        const data = new FormData(event.currentTarget);
        const firstName = String(data.get("firstName") ?? "").trim();
        const lastName = String(data.get("lastName") ?? "").trim();

        const fieldErrors = validateProfileNames(firstName, lastName);

        if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
            setStatus(null);
            return;
        }

        setErrors({});
        setStatus(null);
        setIsSaving(true);

        try {
            await apiRequest<UpdateProfileResponse>("/api/account/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName }),
            });

            setStatus({ tone: "ok", message: "Saved. Your name has been updated." });
            router.refresh();
        } catch (error) {
            setStatus({
                tone: "error",
                message: error instanceof Error ? error.message : "That change could not be saved.",
            });
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <section className="account-card">
            <div className="account-card-body">
                <form className="account-form" onSubmit={handleSubmit} noValidate>
                    <div className="account-form-grid">
                        <label className="account-field">
                            <span>
                                First Name <i className="account-req">*</i>
                            </span>
                            <input
                                name="firstName"
                                type="text"
                                defaultValue={profile.firstName}
                                autoComplete="given-name"
                                maxLength={nameMaxLength}
                                aria-invalid={errors.firstName ? true : undefined}
                                aria-describedby={errors.firstName ? "first-name-error" : undefined}
                                onInput={() => clearFieldError("firstName")}
                                required
                            />
                            {errors.firstName ? (
                                <small className="account-field-error" id="first-name-error">
                                    {errors.firstName}
                                </small>
                            ) : null}
                        </label>
                        <label className="account-field">
                            <span>
                                Last Name <i className="account-req">*</i>
                            </span>
                            <input
                                name="lastName"
                                type="text"
                                defaultValue={profile.lastName}
                                autoComplete="family-name"
                                maxLength={nameMaxLength}
                                aria-invalid={errors.lastName ? true : undefined}
                                aria-describedby={errors.lastName ? "last-name-error" : undefined}
                                onInput={() => clearFieldError("lastName")}
                                required
                            />
                            {errors.lastName ? (
                                <small className="account-field-error" id="last-name-error">
                                    {errors.lastName}
                                </small>
                            ) : null}
                        </label>
                    </div>

                    <div className="account-readonly">
                        <span>Current Email</span>
                        <p>{profile.email}</p>
                    </div>

                    {status ? (
                        <p
                            className={status.tone === "ok" ? "account-status" : "account-status account-status-error"}
                            role="status"
                        >
                            {status.message}
                        </p>
                    ) : null}

                    <div className="account-form-actions">
                        <button className="btn btn-primary" type="submit" disabled={isSaving}>
                            {isSaving ? "Saving…" : "Save changes"}
                        </button>
                        <Link className="btn btn-soft" href={accountSectionHref("overview")}>
                            Cancel
                            <LinkLoadingIndicator />
                        </Link>
                    </div>

                    <p className="account-note">
                        Your email cannot be changed here — it identifies the account.
                    </p>
                </form>
            </div>
        </section>
    );
}
