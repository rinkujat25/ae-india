import { NextResponse } from "next/server";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { addToWishlist, getWishlistSlugs } from "@/services/hyperinventory/wishlist.service";
import { getAuthAccessToken } from "@/utils/auth-profile";

/**
 * The wishlist lives against the signed-in account, so both calls need a
 * session. A guest gets 401 rather than an empty list, which lets the browser
 * tell "nothing saved" apart from "not signed in" and prompt for login.
 */
export async function GET() {
    const accessToken = await getAuthAccessToken();

    if (!accessToken) {
        return NextResponse.json({ message: "Sign in to see your wishlist." }, { status: 401 });
    }

    try {
        return NextResponse.json({ slugs: await getWishlistSlugs(accessToken) });
    } catch (error) {
        const status = error instanceof HyperinventoryApiError ? error.status : 502;

        console.error("Unable to read the wishlist:", error instanceof Error ? error.message : error);

        return NextResponse.json({ message: "Unable to load your wishlist." }, { status });
    }
}

export async function POST(request: Request) {
    const accessToken = await getAuthAccessToken();

    if (!accessToken) {
        return NextResponse.json({ message: "Sign in to save products." }, { status: 401 });
    }

    let productId = "";

    try {
        const body = (await request.json()) as { productId?: unknown };
        productId = typeof body.productId === "string" ? body.productId.trim() : "";
    } catch {
        productId = "";
    }

    // The provider keys the add on the product id, which is a UUID. Checking the
    // shape here keeps an arbitrary path fragment from being forwarded.
    if (!/^[0-9a-f-]{36}$/i.test(productId)) {
        return NextResponse.json({ message: "A valid product is required." }, { status: 400 });
    }

    try {
        return NextResponse.json({ slugs: await addToWishlist(accessToken, productId) });
    } catch (error) {
        const status = error instanceof HyperinventoryApiError ? error.status : 502;

        console.error("Unable to add to the wishlist:", error instanceof Error ? error.message : error);

        return NextResponse.json({ message: "Unable to save this product." }, { status });
    }
}
