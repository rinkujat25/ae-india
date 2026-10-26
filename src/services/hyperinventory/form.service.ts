import "server-only";

import { getHyperinventoryEnvironment } from "@/lib/env";
import { hyperinventoryRequest } from "@/services/hyperinventory/client";

/**
 * Submits an entry to one of the provider's forms.
 *
 * `captcha_event.token` is **required**: the provider answers a missing token
 * with "This field is required", and an empty or made-up one with "Captcha
 * validation failed". There is no way to post without a real Google reCAPTCHA
 * token, so the caller has to have one before this is worth calling.
 *
 * The field keys inside `form_data` are defined by the form in the provider's
 * admin, not by this app. They are passed through exactly as given.
 */
export type FormItemPayload = {
    formId: string;
    formData: Record<string, string>;
    captchaToken: string;
};

export async function submitFormItem({
    formId,
    formData,
    captchaToken,
}: FormItemPayload): Promise<unknown> {
    return hyperinventoryRequest<unknown>("consumer/form-items/", {
        apiVersion: "v1",
        method: "POST",
        body: JSON.stringify({
            form_id: formId,
            form_data: formData,
            captcha_event: { token: captchaToken },
        }),
    });
}

/** The configured enquiry form, or empty when the deployment has not set one. */
export function getDemoFormId(): string {
    return getHyperinventoryEnvironment().demoFormId ?? "";
}
