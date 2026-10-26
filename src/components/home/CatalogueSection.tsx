/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HyperinventoryApiError } from "@/services/hyperinventory/client";
import { getCategories } from "@/services/hyperinventory/category.service";
import type { CategoryModel } from "@/types/models/category.model";

/**
 * The seller's own categories, with the name, description and artwork the
 * provider holds for each one.
 *
 * These were hard-coded until the seller uploaded category images; the eight
 * cards and their copy now come straight from the category tree, so adding or
 * renaming one in Hyperinventory changes the home page without a deploy.
 *
 * The cards keep their `.cat` / `.cat-grid` classes: the tinted backgrounds are
 * painted by `nth-child` in globals.css, so the colour a card gets follows its
 * position rather than its name.
 */
async function loadCategories(): Promise<CategoryModel[]> {
    try {
        return await getCategories();
    } catch (error) {
        // The home page is the main entry point, so a provider outage drops
        // this one section rather than taking the whole page down with it.
        //
        // Only the provider's own failures are swallowed. Next signals things
        // like dynamic-usage through thrown errors too, and catching those
        // turned a build-time misconfiguration into a section that silently
        // vanished from the prerendered page.
        if (!(error instanceof HyperinventoryApiError)) throw error;

        console.error("home categories failed to load", error);

        return [];
    }
}

export async function CatalogueSection() {
    const categories = await loadCategories();

    if (!categories.length) return null;

    return (
        <section className="section" id="catalog">
            <div className="wrap">
                <div className="section-head">
                    <div>
                        <span className="kicker">Endless catalogue</span>
                        <h2>Every category. Every budget. One gifting layer.</h2>
                    </div>
                    <p>Recipients browse the categories you switch on. You decide which.</p>
                </div>

                <div className="cat-grid">
                    {categories.map((category) => (
                        <Link
                            className="cat"
                            href={`/category/${category.slug}`}
                            key={category.id}
                            aria-label={`Explore ${category.label}`}
                        >
                            <h3>{category.label}</h3>
                            {category.description ? <small>{category.description}</small> : null}
                            {category.imageUrl ? (
                                // Decorative: the heading above already names the
                                // category, so alt text would only repeat it.
                                <img
                                    className="cat-img"
                                    src={category.imageUrl}
                                    alt=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                            ) : null}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
