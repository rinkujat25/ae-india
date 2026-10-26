/** Formats a rupee amount the way the storefront shows it: ₹1,24,800. */
export function formatInr(value: number) {
    return `₹${Math.round(value).toLocaleString("en-IN")}`;
}
