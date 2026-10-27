import Link from "next/link";

type CategoryUnavailableProps = {
    /** What could not be loaded, as it reads after "We couldn't load". */
    subject: string;
    /** The page to retry: the category's own URL. */
    retryHref: string;
};

/**
 * The catalogue did not answer.
 *
 * Kept apart from the empty state on purpose. "Nothing in this category yet"
 * is a statement about the catalogue; showing it when the read failed told the
 * visitor a stocked category was empty, and there was nothing to suggest that
 * trying again would help.
 *
 * "Try again" is a plain `<a>` to the same URL, not a client-side refresh: a
 * full load re-runs the server read, works without JavaScript, and shows the
 * browser's own loading state, so a second failure is visibly a new attempt.
 */
export function CategoryUnavailable({ subject, retryHref }: CategoryUnavailableProps) {
    return (
        <section className="cat-empty cat-unavailable" role="alert">
            <b>We couldn&apos;t load {subject} right now.</b>
            <p>
                The catalogue didn&apos;t respond. This is on our side, not yours &mdash; try again in a
                moment, or browse the rest of the store.
            </p>
            <div className="cat-empty-actions">
                <a className="btn btn-primary" href={retryHref}>
                    Try again
                </a>
                <Link className="btn btn-soft" href="/products">
                    Browse all products
                </Link>
            </div>
        </section>
    );
}
