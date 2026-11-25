const temporaryCartKeyPrefix = "temporary_cart_id_";
const temporaryCartSalesChannelKey = "aeindia_temporary_cart_sales_channel";
export const cartUpdatedEvent = "aeindia:cart-updated";

export function notifyCartUpdated() {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(cartUpdatedEvent));
    }
}

export function saveTemporaryCartId(salesChannelId: string, temporaryCartId: string) {
    if (typeof window === "undefined" || !salesChannelId || !temporaryCartId) {
        return;
    }

    window.localStorage.setItem(`${temporaryCartKeyPrefix}${salesChannelId}`, temporaryCartId);
    window.localStorage.setItem(temporaryCartSalesChannelKey, salesChannelId);
    notifyCartUpdated();
}

export function getTemporaryCartId(salesChannelId: string) {
    if (typeof window === "undefined" || !salesChannelId) {
        return null;
    }

    return window.localStorage.getItem(`${temporaryCartKeyPrefix}${salesChannelId}`);
}

export function getTemporaryCartReference() {
    if (typeof window === "undefined") {
        return null;
    }

    let salesChannelId = window.localStorage.getItem(temporaryCartSalesChannelKey);

    if (!salesChannelId) {
        for (let index = 0; index < window.localStorage.length; index += 1) {
            const key = window.localStorage.key(index);
            if (key?.startsWith(temporaryCartKeyPrefix)) {
                salesChannelId = key.slice(temporaryCartKeyPrefix.length);
                break;
            }
        }
    }

    if (!salesChannelId) return null;

    const temporaryCartId = getTemporaryCartId(salesChannelId);
    return temporaryCartId ? { salesChannelId, temporaryCartId } : null;
}

/**
 * Clears the guest cart reference from this browser.
 *
 * Called on logout: the cart id is per browser, not per account, so leaving it
 * behind would hand the next person on a shared machine the previous session's
 * cart. Only this app's own keys are removed — never the whole store.
 */
export function clearTemporaryCart() {
    if (typeof window === "undefined") {
        return;
    }

    const staleKeys: string[] = [];

    for (let index = 0; index < window.localStorage.length; index += 1) {
        const key = window.localStorage.key(index);

        if (key?.startsWith(temporaryCartKeyPrefix)) {
            staleKeys.push(key);
        }
    }

    // Collected first: removing while iterating would shift the indexes.
    staleKeys.forEach((key) => window.localStorage.removeItem(key));
    window.localStorage.removeItem(temporaryCartSalesChannelKey);

    notifyCartUpdated();
}
