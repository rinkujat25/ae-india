/**
 * A plain-language definition of what Wingback is, high on the page.
 *
 * Answer engines quote the first unambiguous statement of what a product is and
 * who it is for. The marketing hero above deliberately leads with the problem
 * ("without the chasing"), which reads well to a person and tells a model
 * nothing. This says the plain thing in one paragraph, in normal body text —
 * not an image, not a canvas, not something a client-side script has to build.
 */
const markup = `<section class="section definition" id="what-is-wingback" aria-labelledby="definition-title">
        <div class="wrap">
            <p class="kicker">In one paragraph</p>
            <h2 id="definition-title">Wingback is a corporate gifting platform for Indian companies.</h2>
            <p class="definition-copy">Wingback by Sampley is a corporate gifting platform for Indian HR, Admin,
                Sales and Marketing teams. Companies can launch a branded employee gift store where recipients choose
                approved gifts within a company-set budget, or run direct gifting campaigns for clients, partners and
                events. Wingback manages curation, sourcing, branding, delivery and reporting.</p>
        </div>
    </section>`;

export function HomeDefinitionSection() {
    return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
