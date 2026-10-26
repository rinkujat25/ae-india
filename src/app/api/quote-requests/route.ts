import { NextResponse } from "next/server";
import { normaliseMobile, type QuoteContactValues, validateQuoteRequest } from "@/utils/quote-validation";

/**
 * Where quote requests go.
 *
 * Kept server-side so the destination — and any key it needs — never reaches the
 * browser. Until it is set the route reports `delivered: false`, and the form
 * falls back to a prefilled email, which is how the static prototype behaved.
 */
function getQuoteEndpoint() {
    return process.env.QUOTE_REQUEST_ENDPOINT?.trim() ?? "";
}

type QuoteRequestBody = {
    contact?: Partial<QuoteContactValues>;
    cart?: {
        items?: Array<{
            productId?: string;
            name?: string;
            brand?: string;
            sku?: string;
            slug?: string;
            quantity?: number;
            price?: number;
            mrp?: number;
        }>;
    };
};

export async function POST(request: Request) {
    let input: QuoteRequestBody;

    try {
        input = (await request.json()) as QuoteRequestBody;
    } catch {
        return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const values: QuoteContactValues = {
        name: (input.contact?.name ?? "").trim(),
        email: (input.contact?.email ?? "").trim(),
        company: (input.contact?.company ?? "").trim(),
        phone: (input.contact?.phone ?? "").trim(),
        occasion: (input.contact?.occasion ?? "").trim(),
        deliverBy: (input.contact?.deliverBy ?? "").trim(),
        cities: (input.contact?.cities ?? "").trim(),
        branding: (input.contact?.branding ?? "").trim(),
        notes: (input.contact?.notes ?? "").trim(),
    };

    // Re-validated here because anything in the browser can be bypassed.
    const errors = validateQuoteRequest(values);

    if (Object.keys(errors).length > 0) {
        return NextResponse.json({ message: "Check the highlighted fields.", errors }, { status: 400 });
    }

    const items = (input.cart?.items ?? [])
        .map((item) => ({
            productId: (item.productId ?? "").trim(),
            name: (item.name ?? "").trim(),
            brand: (item.brand ?? "").trim(),
            sku: (item.sku ?? "").trim(),
            slug: (item.slug ?? "").trim(),
            quantity: Math.max(0, Math.floor(Number(item.quantity) || 0)),
            price: Number(item.price) || 0,
            mrp: Number(item.mrp) || 0,
        }))
        .filter((item) => item.name && item.quantity > 0);

    if (items.length === 0) {
        return NextResponse.json({ message: "Your cart is empty - add a product first." }, { status: 400 });
    }

    const payload = {
        type: "quote_request",
        submittedAt: new Date().toISOString(),
        contact: { ...values, phone: normaliseMobile(values.phone) },
        cart: {
            currency: "INR",
            itemsCount: items.length,
            units: items.reduce((total, item) => total + item.quantity, 0),
            total: items.reduce((total, item) => total + item.price * item.quantity, 0),
            items,
        },
    };

    const endpoint = getQuoteEndpoint();

    if (!endpoint) {
        // Not an error: the caller is told plainly so it can fall back to email.
        return NextResponse.json({ delivered: false });
    }

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(15_000),
        });

        if (!response.ok) {
            return NextResponse.json(
                { message: "That did not send. Please email us and we will pick it up from there." },
                { status: 502 },
            );
        }

        return NextResponse.json({ delivered: true });
    } catch {
        return NextResponse.json(
            { message: "That did not send. Please email us and we will pick it up from there." },
            { status: 502 },
        );
    }
}
