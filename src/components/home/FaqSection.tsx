const markup = `<section class="section" id="faq">
        <div class="wrap">
            <div class="section-head">
                <div>
                    <span class="kicker">Questions</span>
                    <h2>Corporate gifting questions teams ask first.</h2>
                </div>
                <p>The ones that come up in every first call. The full list lives on the How it works page.</p>
            </div>

            <div class="faq-grid">
                <details class="faq">
                    <summary>Which model should we use?<svg class="icon faq-plus">
                            <use href="#i-plus" />
                        </svg></summary>
                    <p>Employees pick better than you can pick for them, so employee gifting runs as a store. Clients, partners and CXO offices usually want one well-presented gift, so those run direct. Most companies end up running both.</p>
                </details>
                <details class="faq">
                    <summary>What is the minimum number of recipients?<svg class="icon faq-plus">
                            <use href="#i-plus" />
                        </svg></summary>
                    <p>Around 50 upward for a store, scaling to 50,000+. Below that, a curated one-off usually makes more sense — and we will tell you so.</p>
                </details>
                <details class="faq">
                    <summary>Can we cap the budget so nobody overspends?<svg class="icon faq-plus">
                            <use href="#i-plus" />
                        </svg></summary>
                    <p>The cap is enforced before anything is visible. Recipients only see items inside their budget, so going over is impossible rather than discouraged.</p>
                </details>
                <details class="faq">
                    <summary>Can we run both models at the same time?<svg class="icon faq-plus">
                            <use href="#i-plus" />
                        </svg></summary>
                    <p>Yes, and most companies do. Employees run as a choice store and clients as a direct campaign, on separate budgets and often separate cost centres, with separate reports so finance can split them cleanly. One point of contact covers both.</p>
                </details>
                <details class="faq">
                    <summary>What does Wingback actually handle?<svg class="icon faq-plus">
                            <use href="#i-plus" />
                        </svg></summary>
                    <p>Everything with a vendor, a courier or a deadline in it: catalogue curation, sourcing and negotiation, quality checks, branding and personalisation, address and size collection, kitting, dispatch, pan-India delivery, recipient support, replacements, and one report and one invoice at the end.</p>
                </details>
            </div>

            <div class="faq-more"><a class="btn btn-soft" href="/how-it-works#faq">Read all questions →</a>
            </div>
        </div>
    </section>

    <!-- ============ CLOSING CTA ============
     The enquiry form now opens as a modal. Every trigger on the page carries
     data-open-form; without JavaScript the links still land on this section,
     which keeps the email fallback visible. -->`;

export function FaqSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
