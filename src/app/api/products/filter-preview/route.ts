import { NextResponse } from "next/server";

type ProductFilterPreviewRequest = {
    categories?: string[];
    brands?: string[];
    tags?: string[];
    priceFilters?: string[];
};

function wait(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export async function POST(request: Request) {
    const filters = (await request.json()) as ProductFilterPreviewRequest;

    await wait(1000);

    return NextResponse.json({
        ok: true,
        filters,
    });
}
