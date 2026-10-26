import { NextResponse } from "next/server";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { getDemoFormId, submitFormItem } from "@/services/hyperinventory/form.service";

/**
 * The enquiry modal's submit target.
 *
 * It exists so the provider credentials stay on the server: the modal is a
 * browser form, and posting to the provider directly would put `clientsecret`
 * in the page.
 *
 * The provider's own field keys are mapped here rather than in the markup, so
 * renaming an input does not silently drop a value from the submission.
 */
type DemoRequestBody = {
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
    model?: string;
    occasion?: string;
    headcount?: string;
    budget?: string;
    deliver_by?: string;
    notes?: string;
    captchaToken?: string;
};

const asText = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export async function POST(request: Request) {
    const formId = getDemoFormId();

    if (!formId) {
        return NextResponse.json({ message: "The enquiry form is not configured." }, { status: 503 });
    }

    let body: DemoRequestBody;

    try {
        body = (await request.json()) as DemoRequestBody;
    } catch {
        return NextResponse.json({ message: "Invalid request." }, { status: 400 });
    }

    const name = asText(body.name);
    const email = asText(body.email);
    const company = asText(body.company);

    if (!name || !email || !company) {
        return NextResponse.json({ message: "Name, work email and company are required." }, { status: 400 });
    }

    const captchaToken = asText(body.captchaToken);

    // Checked here so the browser gets a clear reason rather than the
    // provider's generic "Invalid data".
    if (!captchaToken) {
        return NextResponse.json({ message: "Captcha verification is required.", code: "captcha_required" }, { status: 428 });
    }

    // The provider's form has no field for which model the enquiry is about,
    // so it rides along in the free-text note rather than being dropped.
    const model = asText(body.model);
    const notes = asText(body.notes);
    const anythingElse = [model ? `Interested in: ${model}` : "", notes].filter(Boolean).join("\n\n");

    try {
        await submitFormItem({
            formId,
            captchaToken,
            formData: {
                your_name: name,
                work_email: email,
                phone: asText(body.phone),
                company_name: company,
                occasion_: asText(body.occasion),
                number_of_recipients: asText(body.headcount),
                perperson_budget: asText(body.budget),
                needs_to_land_by: asText(body.deliver_by),
                anything_else: anythingElse,
            },
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        const status = error instanceof HyperinventoryApiError ? error.status : 502;

        console.error("Demo request failed:", error instanceof Error ? error.message : error);

        return NextResponse.json({ message: "We could not send your enquiry." }, { status });
    }
}
