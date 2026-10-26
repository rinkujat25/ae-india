/**
 * Serialise a JSON-LD graph for embedding in a <script> tag.
 *
 * `JSON.stringify` alone is not safe here: a `</script>` sequence inside any
 * string value would close the tag early and turn the rest of the payload into
 * markup. Escaping `<`, `>` and `&` as unicode escapes keeps the JSON valid and
 * the tag intact.
 */
export function serializeJsonLd(graph: unknown): string {
  return JSON.stringify(graph)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
