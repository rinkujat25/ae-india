import { NextResponse } from "next/server";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { getProductSearchSuggestions } from "@/services/hyperinventory/product.service";

export async function GET(request: Request) {
    const search = new URL(request.url).searchParams.get("search")?.trim() ?? "";

    if (search.length < 2 || search.length > 100) {
        return NextResponse.json({ message: "Search must contain between 2 and 100 characters." }, { status: 400 });
    }

    try {
        return NextResponse.json(await getProductSearchSuggestions(search));
    } catch (error) {
        const status = error instanceof HyperinventoryApiError ? error.status : 500;
        return NextResponse.json(
            { message: "Unable to load search suggestions right now." },
            { status },
        );
    }
}
