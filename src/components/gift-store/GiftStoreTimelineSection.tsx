const markup = `<section class="section timeline" id="timeline">
        <div class="wrap">
            <div class="section-head">
                <div>
                    <span class="kicker">Launch timeline</span>
                    <h2>From kickoff to go-live in five working days.</h2>
                </div>
            </div>

            <div class="timeline-grid">
                <article class="tl"><span>Day 1</span>
                    <h3>Kickoff</h3>
                    <p>Confirm audience, occasion, budget tiers, eligibility, branding and delivery scope.</p>
                </article>
                <article class="tl"><span>Day 2&ndash;3</span>
                    <h3>Curate</h3>
                    <p>Shortlist vendors and products, check quality and pricing, and shape the approved catalogue.</p>
                </article>
                <article class="tl"><span>Day 4</span>
                    <h3>Preview</h3>
                    <p>Review the branded store, packaging and personalization, then sign off the final selection.</p>
                </article>
                <article class="tl"><span>Day 5</span>
                    <h3>Go live</h3>
                    <p>Share the gift link, watch selections come in, and hand fulfillment and tracking to Wingback.
                    </p>
                </article>
            </div>

            <div class="timeline-foot">
                <svg class="icon" style="width:20px;height:20px;color:var(--violet)">
                    <use href="#i-calendar"></use>
                </svg>
                <span>Planning a Diwali program?</span>
                <em>The store opens in five working days, but custom branding and doorstep delivery need their own runway &mdash;
                    count back from the festival week, not from go-live.</em>
            </div>
        </div>
    </section>

    <!-- ================= CTA ================= -->`;

export function GiftStoreTimelineSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
