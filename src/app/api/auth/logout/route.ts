import { NextResponse } from "next/server";
import { clearAuthSession } from "@/utils/auth-session";

export async function POST() {
    const response = NextResponse.json({ signedOut: true });

    clearAuthSession(response);

    return response;
}
