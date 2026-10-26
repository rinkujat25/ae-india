/**
 * Provider copy written in a rich-text editor.
 *
 * Product descriptions come back as editor HTML — `<p>`, `<strong>` and `<br>`
 * in the current catalogue — so they cannot be printed as text without showing
 * the markup, and cannot be injected as-is without trusting the feed.
 *
 * `sanitizeRichText` rebuilds the markup instead of filtering it: text is
 * escaped, a fixed set of tags is re-emitted by name, and **every attribute is
 * dropped**. There is no allowlist of attributes to get wrong, so `onerror`,
 * `href="javascript:"`, `style` and friends cannot survive whatever shape they
 * arrive in.
 */

/** Formatting only. Nothing here can carry a URL, a script or a style. */
const allowedTags = new Set(["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "h3", "h4", "h5"]);

/** Tags that never take a closing partner. */
const voidTags = new Set(["br"]);

const namedEntities: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
};

/**
 * Escapes text for HTML.
 *
 * `&` is only escaped when it is not already opening an entity, so copy that
 * arrives containing `&amp;` is not turned into a visible `&amp;`.
 */
function escapeText(value: string) {
    return value
        .replace(/&(?!#?\w+;)/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

const tagPattern = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;

/** Script and style carry executable payloads in their *content*, not their tags. */
const executableBlocks = /<(script|style)\b[^>]*>[\s\S]*?(?:<\/\1\s*>|$)/gi;

export function sanitizeRichText(input: string | null | undefined): string {
    const source = (input ?? "").replace(executableBlocks, "");

    if (!source.trim()) return "";

    let result = "";
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    tagPattern.lastIndex = 0;

    while ((match = tagPattern.exec(source)) !== null) {
        result += escapeText(source.slice(lastIndex, match.index));

        const name = match[1].toLowerCase();

        // Unknown tags are dropped, but whatever they wrapped is kept.
        if (allowedTags.has(name)) {
            const isClosing = match[0].startsWith("</");

            if (!isClosing) {
                result += `<${name}>`;
            } else if (!voidTags.has(name)) {
                result += `</${name}>`;
            }
        }

        lastIndex = tagPattern.lastIndex;
    }

    result += escapeText(source.slice(lastIndex));

    return result.trim();
}

/** True when the value carries markup worth rendering as HTML rather than text. */
export function hasMarkup(value: string | null | undefined): boolean {
    return /<\/?[a-zA-Z][a-zA-Z0-9]*\b[^>]*>/.test(value ?? "");
}

/**
 * The same copy as plain text, for meta descriptions, structured data and the
 * short summary beside the title — none of which may contain markup.
 */
export function toPlainText(input: string | null | undefined): string {
    const withoutBlocks = (input ?? "").replace(executableBlocks, "");

    return withoutBlocks
        // Block-level ends become spaces so words do not run together.
        .replace(/<\/(p|div|li|h[1-6])\s*>/gi, " ")
        .replace(/<br\b[^>]*>/gi, " ")
        .replace(/<[^>]*>/g, "")
        .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
        .replace(/&([a-zA-Z]+);/g, (whole, name: string) => namedEntities[name.toLowerCase()] ?? whole)
        .replace(/\s+/g, " ")
        .trim();
}
