const markup = `<section class="section controls" id="controls">
        <div class="wrap">
            <div class="section-head">
                <div>
                    <span class="kicker">Business controls</span>
                    <h2>Choice for them. Control for you.</h2>
                </div>
                <p>Every gift a recipient can see has already passed your rules &mdash; set before the store goes live.</p>
            </div>

            <div class="rules-grid">
                <article class="rule-card">
                    <div class="rule-ico"><svg class="icon">
                            <use href="#i-wallet"></use>
                        </svg></div>
                    <h3>Budget control</h3>
                    <p>A per-recipient cap for any tier.</p>
                    <div class="tags"><span>Per-person cap</span><span>Multi-tier</span><span>Expiry dates</span></div>
                </article>
                <article class="rule-card">
                    <div class="rule-ico"><svg class="icon">
                            <use href="#i-shield"></use>
                        </svg></div>
                    <h3>Approved catalogue only</h3>
                    <p>They choose freely, but only from what you approved.</p>
                    <div class="tags"><span>Category limits</span><span>Brand control</span><span>Quantity rules</span>
                    </div>
                </article>
                <article class="rule-card">
                    <div class="rule-ico"><svg class="icon">
                            <use href="#i-list"></use>
                        </svg></div>
                    <h3>Wishlist intelligence</h3>
                    <p>Saved sizes, interests and ideas.</p>
                    <div class="tags"><span>Preferences</span><span>Saved ideas</span><span>Reusable inputs</span></div>
                </article>
                <article class="rule-card">
                    <div class="rule-ico"><svg class="icon">
                            <use href="#i-chart"></use>
                        </svg></div>
                    <h3>Managed operations</h3>
                    <p>Sourcing, QC, branded packing, delivery and reporting stay with us.</p>
                    <div class="tags"><span>QC</span><span>Tracking</span><span>Support</span></div>
                </article>
            </div>

            <div class="tier-band">
                <div>
                    <h3>Budget tiers you can run</h3>
                    <p>Common per-person tiers. Set as many as the program needs.</p>
                </div>
                <div class="tiers">
                    <div class="tier"><b>Rs. 1,000</b><span>Festival tier for large employee groups</span></div>
                    <div class="tier"><b>Rs. 2,500</b><span>Birthday and everyday employee gifting</span></div>
                    <div class="tier"><b>Rs. 7,500</b><span>Client and CXO gifting campaigns</span></div>
                    <div class="tier"><b>Rs. 10,000</b><span>Milestones and long-service awards</span></div>
                </div>
            </div>
        </div>
    </section>

    <!-- ================= COMPARISON ================= -->`;

export function GiftStoreControlsSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
