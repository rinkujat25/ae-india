const storageKey = "aeindia_cookie_notice";

/**
 * Bumped when what the site stores on a visitor's device materially changes —
 * a new category of cookie, or a third party that sets its own. An old
 * acknowledgement then stops counting and the notice comes back, rather than
 * one click in the past standing in for something the visitor never saw.
 *
 * 2: Google Analytics added. Version 1 told visitors the site set no tracking
 * cookies, which stopped being true, so those acknowledgements no longer count.
 */
export const cookieNoticeVersion = 2;

type StoredAcknowledgement = {
    v: number;
    /** Epoch milliseconds: how old the acknowledgement is, if we ever need it. */
    at: number;
};

const listeners = new Set<() => void>();

/**
 * The last value read from storage.
 *
 * `useSyncExternalStore` calls the snapshot on every render and compares with
 * `Object.is`, so this avoids a `JSON.parse` in a try/catch each time. It is
 * cleared whenever the underlying value can have moved.
 */
let cached: boolean | null = null;

function readAcknowledgement(): boolean {
    if (typeof window === "undefined") return false;

    try {
        const raw = window.localStorage.getItem(storageKey);

        if (!raw) return false;

        const stored = JSON.parse(raw) as StoredAcknowledgement;

        return Number(stored?.v) === cookieNoticeVersion;
    } catch {
        return false;
    }
}

/**
 * Whether this browser has already seen the current notice.
 *
 * Every access is guarded — storage throws in a private window and can come
 * back empty — and a miss deliberately means "not yet seen". If we cannot read
 * the acknowledgement we cannot claim it exists, so the notice shows again;
 * that costs a repeat visitor one dismissal, which is the harmless direction to
 * fail in.
 */
export function hasAcknowledgedCookies(): boolean {
    if (cached === null) cached = readAcknowledgement();

    return cached;
}

/**
 * The server has no access to `localStorage`, so it has to assume something.
 * It assumes the notice was already seen: markup that renders nothing is the
 * safe half of the guess, because the client corrects it to visible right
 * after hydration, whereas the reverse would flash the notice at every visitor
 * who dismissed it months ago.
 */
export function getAcknowledgedServerSnapshot(): boolean {
    return true;
}

export function subscribeToCookieNotice(listener: () => void): () => void {
    listeners.add(listener);

    // Another tab acknowledging the notice should take it down here too, rather
    // than leaving a second window asking about something already answered.
    const onStorage = (event: StorageEvent) => {
        if (event.key !== null && event.key !== storageKey) return;

        cached = null;
        listener();
    };

    window.addEventListener("storage", onStorage);

    return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
    };
}

export function acknowledgeCookies(): void {
    if (typeof window === "undefined") return;

    try {
        window.localStorage.setItem(
            storageKey,
            JSON.stringify({ v: cookieNoticeVersion, at: Date.now() } satisfies StoredAcknowledgement),
        );
    } catch {
        // A blocked store only costs the visitor a repeat of the notice on the
        // next visit. The notice still closes now, because the acknowledgement
        // below is held in memory for this page either way.
    }

    cached = true;

    for (const listener of listeners) listener();
}
