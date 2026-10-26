const markup = `<section class="section" id="how">
        <div class="wrap">
            <div class="section-head">
                <div>
                    <span class="kicker">How it works</span>
                    <h2>How corporate gifting works, from brief to doorstep.</h2>
                </div>
                <p>You keep control. Recipients get a good gift. Vendors stay behind the scenes.</p>
            </div>

            <div class="steps">
                <div class="step">
                    <div class="step-num">01</div>
                    <h3>Create a program</h3>
                    <p>Pick the model, then set audience, budget, eligibility and delivery rules.</p>
                </div>
                <div class="step">
                    <div class="step-num">02</div>
                    <h3>Curate the catalogue</h3>
                    <p>Build the approved list — or approve one gift for everyone.</p>
                </div>
                <div class="step">
                    <div class="step-num">03</div>
                    <h3>Recipients receive</h3>
                    <p>They open a branded page and choose, or the gift lands at their door.</p>
                </div>
                <div class="step">
                    <div class="step-num">04</div>
                    <h3>We source &amp; fulfil</h3>
                    <p>Sourcing, branding, quality checks, shipping, tracking and reporting — all ours.</p>
                </div>
            </div>

            <div class="how-cta"><a class="btn btn-soft" href="/how-it-works">See the full six-stage process
                    →</a></div>
        </div>
    </section>

    <!-- ============ AI ============ -->`;

export function HowItWorksSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
