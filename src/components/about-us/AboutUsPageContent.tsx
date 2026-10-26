import Link from "next/link";

export function AboutUsPageContent() {
  return (
    <main>
      <section className="about-hero">
        <div className="wrap about-hero-grid">
          <div>
            <span className="about-eyebrow">About the Wingback gift store</span>
            <h1>Corporate gifting built around choice.</h1>
            <p>
              Sampley helps companies run gifting programs where recipients
              choose from approved gifts within business-defined rules, while
              the operational work sits with us: catalogue curation, sourcing,
              branding, fulfilment, delivery, support and reporting.
            </p>
            <div className="about-actions">
              <Link className="btn btn-primary" href="/how-it-works">
                See how it works
              </Link>
              <a className="btn btn-soft" href="#start" data-open-form>
                Book a demo →
              </a>
            </div>
          </div>

          <aside className="about-panel" aria-label="Sampley focus">
            <div className="about-card">
              <h2>What we are building</h2>
              <div className="about-stat-grid">
                <div className="about-stat">
                  <b>Recipient choice</b>
                  <span>People pick what they actually want.</span>
                </div>
                <div className="about-stat">
                  <b>Business control</b>
                  <span>Companies control budget, audience and catalogue.</span>
                </div>
                <div className="about-stat">
                  <b>Managed fulfilment</b>
                  <span>Sampley handles sourcing through delivery.</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="about-section alt">
        <div className="wrap">
          <div className="about-head">
            <div>
              <span className="about-kicker">Why Wingback</span>
              <h2>Gifting should feel personal without becoming chaotic.</h2>
            </div>
            <p>
              Traditional corporate gifting often means one generic hamper,
              weeks of address chasing and a spreadsheet full of exceptions.
              Sampley keeps the personal part for recipients and the control
              part for the company.
            </p>
          </div>

          <div className="about-grid">
            <article className="about-tile">
              <h3>Choice inside rules</h3>
              <p>
                Recipients choose from a curated catalogue, but only within the
                company-approved budget, categories, eligibility and timelines.
              </p>
            </article>
            <article className="about-tile">
              <h3>One operating layer</h3>
              <p>
                Sourcing, vendor allocation, branding, packing, dispatch,
                tracking and replacements are handled as one program.
              </p>
            </article>
            <article className="about-tile">
              <h3>Designed for scale</h3>
              <p>
                The same flow can support employee festivals, onboarding,
                milestones, client gifting, partner campaigns and events.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="wrap">
          <div className="about-head">
            <div>
              <span className="about-kicker">What we run</span>
              <h2>Two gifting models, one managed platform.</h2>
            </div>
            <p>
              Sampley supports recipient-choice stores and direct gifting.
              Both use the same backbone: curation, controls, fulfilment,
              tracking, support and reporting.
            </p>
          </div>

          <div className="about-split">
            <article className="about-split-card">
              <h3>Branded gift stores</h3>
              <p>
                A company-approved store where employees or recipients choose
                gifts within budget and rules.
              </p>
              <ul>
                <li>Best for employee gifting, festivals and milestones</li>
                <li>Recipients enter addresses, sizes and preferences</li>
                <li>The company sees one program, one report and one invoice</li>
              </ul>
            </article>

            <article className="about-split-card dark">
              <h3>Direct gifting campaigns</h3>
              <p>
                A company-approved gift sent to a selected list, with Sampley
                managing address collection, branding and delivery.
              </p>
              <ul>
                <li>Best for clients, partners, CXOs and event guests</li>
                <li>Works when presentation matters more than choice</li>
                <li>Supports tiers, notes, packaging and pan-India dispatch</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="about-section alt">
        <div className="wrap">
          <div className="about-head">
            <div>
              <span className="about-kicker">What Sampley handles</span>
              <h2>The work behind the gift.</h2>
            </div>
            <p>
              A good gifting experience depends on dozens of quiet operational
              details. Sampley is built to own those details so HR, admin,
              sales and marketing teams do not have to chase them.
            </p>
          </div>

          <div className="about-proof">
            <article className="about-proof-card">
              <b>Catalogue curation</b>
              <span>Shortlists shaped by budget, audience, occasion and demand.</span>
            </article>
            <article className="about-proof-card">
              <b>Vendor sourcing</b>
              <span>Consolidated volume, sample checks and gift readiness.</span>
            </article>
            <article className="about-proof-card">
              <b>Branding</b>
              <span>Packaging, personal notes and logo application where suitable.</span>
            </article>
            <article className="about-proof-card">
              <b>Delivery support</b>
              <span>Tracking, exceptions, replacements and final reporting.</span>
            </article>
          </div>
        </div>
      </section>

      <section className="about-cta" id="start">
        <div className="wrap">
          <div className="about-cta-panel">
            <div>
              <h2>Want to see it for your company?</h2>
              <p>
                Share the occasion, recipient count and budget. We will show
                which gifting model fits and what your recipients would see.
              </p>
            </div>
            <div className="about-cta-actions">
              <a className="btn btn-primary" href="#start" data-open-form>
                Book a demo →
              </a>
              <Link className="btn btn-soft" href="/contact-us">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
