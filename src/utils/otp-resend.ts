const storageKey = "aeindia_otp_resend";

type StoredWait = {
    email: string;
    /** Epoch milliseconds after which Resend is allowed again. */
    until: number;
};

/**
 * When the resend wait ends, kept in this browser so a refresh does not hand
 * the visitor a fresh minute.
 *
 * It is stored against the address the code was sent to: changing email starts
 * a different wait rather than inheriting the last one. Every access is guarded
 * — storage throws in a private window and can come back empty — and the form
 * must render correctly when it does, which is why a miss simply means "no wait
 * in progress".
 */
export function readResendDeadline(email: string): number {
    if (typeof window === "undefined" || !email) return 0;

    try {
        const raw = window.localStorage.getItem(storageKey);

        if (!raw) return 0;

        const stored = JSON.parse(raw) as StoredWait;

        if (stored?.email !== email) return 0;

        const until = Number(stored.until);

        return Number.isFinite(until) && until > Date.now() ? until : 0;
    } catch {
        return 0;
    }
}

export function writeResendDeadline(email: string, until: number): void {
    if (typeof window === "undefined" || !email) return;

    try {
        window.localStorage.setItem(storageKey, JSON.stringify({ email, until } satisfies StoredWait));
    } catch {
        // A blocked store only costs the countdown across a refresh, so there is
        // nothing worth reporting to the visitor here.
    }
}

/** Called once the code has been accepted: the wait no longer means anything. */
export function clearResendDeadline(): void {
    if (typeof window === "undefined") return;

    try {
        window.localStorage.removeItem(storageKey);
    } catch {
        // Ignored for the same reason as a failed write.
    }
}
