import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { serializeJsonLd } from "@/utils/json-ld";

export type BreadcrumbTrail = Array<{
    label: string;
    /** Omitted on the current page, which is never a link. */
    href?: string;
}>;

type BreadcrumbsProps = {
    /** The trail after Home, which is added automatically. */
    trail: BreadcrumbTrail;
};

/**
 * The site's breadcrumbs, in one place.
 *
 * Marked up as an ordered list rather than a row of links and slashes: the
 * order is the meaning here, and a screen reader should announce "3 of 4"
 * rather than reading punctuation. The separators are drawn in CSS so they are
 * never read aloud.
 *
 * It also emits the `BreadcrumbList` structured data, which is what search and
 * answer engines use to show the trail instead of a bare URL. Keeping both in
 * one component is what stops them drifting apart.
 */
export function Breadcrumbs({ trail }: BreadcrumbsProps) {
    // Empty labels would render a separator with nothing before it — a product
    // with no category used to do exactly that.
    const items = [{ label: "Home", href: "/" }, ...trail].filter((item) => item.label.trim());

    if (items.length < 2) return null;

    const graph = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            // The current page carries no `item`: it is where the reader already is.
            ...(item.href ? { item: absoluteUrl(item.href) } : {}),
        })),
    };

    return (
        <>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
                <ol>
                    {items.map((item, index) => {
                        const isCurrent = index === items.length - 1;

                        return (
                            <li key={`${item.label}-${index}`}>
                                {item.href && !isCurrent ? (
                                    <Link href={item.href}>{item.label}</Link>
                                ) : (
                                    <span aria-current="page">{item.label}</span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }} />
        </>
    );
}
