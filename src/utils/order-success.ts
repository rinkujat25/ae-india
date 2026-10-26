const orderSuccessPath = "/checkout/order-success";

/**
 * Order references carry slashes ("SA/SO/24000060"), so they must be encoded.
 * `URLSearchParams` does that.
 */
export function buildOrderSuccessHref(input: { orderNumber: string; amountPaid: number }) {
    const params = new URLSearchParams();

    if (input.orderNumber) params.set("orderNumber", input.orderNumber);
    if (input.amountPaid > 0) params.set("amountPaid", String(Math.round(input.amountPaid)));

    const query = params.toString();

    return query ? `${orderSuccessPath}?${query}` : orderSuccessPath;
}

function firstValue(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value;
}

/**
 * Narrows the order reference from the URL.
 *
 * Anyone can type this page's address, so the value is treated as untrusted:
 * only the shape a reference actually takes survives, which keeps arbitrary
 * text off a page that tells the reader their order succeeded.
 */
export function resolveOrderNumber(value: string | string[] | undefined) {
    const orderNumber = (firstValue(value) ?? "").trim();

    return /^[A-Za-z0-9/-]{1,40}$/.test(orderNumber) ? orderNumber : "";
}

/** Narrows the amount from the URL; anything not a sane positive number is dropped. */
export function resolveAmountPaid(value: string | string[] | undefined) {
    const amount = Number((firstValue(value) ?? "").trim());

    return Number.isFinite(amount) && amount > 0 && amount < 1e12 ? amount : 0;
}
