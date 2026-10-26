import { NextResponse } from "next/server";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { removeFromWishlist } from "@/services/hyperinventory/wishlist.service";
import { getAuthAccessToken } from "@/utils/auth-profile";

/** Product slugs are lower-case words and digits joined by hyphens. */
const slugPattern = /^[a-z0-9][a-z0-9-]{0,199}$/i;

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> },
) {
    const accessToken = await getAuthAccessToken();

    if (!accessToken) {
        return NextResponse.json({ message: "Sign in to change your wishlist." }, { status: 401 });
    }

    const { slug } = await params;

    // Narrowed before it reaches the provider, where it becomes part of the URL.
    if (!slugPattern.test(slug ?? "")) {
        return NextResponse.json({ message: "A valid product is required." }, { status: 400 });
    }

    try {
        return NextResponse.json({ slugs: await removeFromWishlist(accessToken, slug) });
    } catch (error) {
        const status = error instanceof HyperinventoryApiError ? error.status : 502;

        console.error("Unable to remove from the wishlist:", error instanceof Error ? error.message : error);

        return NextResponse.json({ message: "Unable to remove this product." }, { status });
    }
}
