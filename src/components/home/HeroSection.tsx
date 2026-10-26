const markup = `<header class="hero">
        <div class="wrap hero-grid">
            <div>
                <span class="eyebrow"><svg class="icon">
                        <use href="#i-sparkle" />
                    </svg> Two gifting models. One managed platform.</span>
                <h1>Corporate gifting, without the <span class="accent">chasing.</span></h1>
                <p class="hero-copy">The hard part was never choosing the gift — it's the chasing. Addresses, sizes,
                    vendors, invoices. We take all of it.</p>
                <div class="hero-actions">
                    <a class="btn btn-primary" href="#start" data-open-form>Get a curated shortlist →</a>
                    <a class="btn btn-soft" href="#models">Compare both models</a>
                </div>
                <div class="hero-stats">
                    <div class="stat"><b>2</b><span>gifting models on one platform</span></div>
                    <div class="stat"><b>50–50,000+</b><span>recipients per program</span></div>
                    <div class="stat"><b>Pan-India</b><span>sourcing, branding, delivery</span></div>
                </div>
            </div>

            <div class="builder" aria-label="Illustrative program setup">
                <div class="builder-card">
                    <div class="builder-bar">
                        <div><b>New gifting program</b><small>Diwali 2026 · 1,248 recipients</small></div>
                        <span class="step-pill">Step 1 of 4</span>
                    </div>

                    <p class="mode-label">Choose a gifting model</p>
                    <div class="mode-pick">
                        <div class="mode-opt on">
                            <div class="mode-opt-top"><svg class="icon">
                                    <use href="#i-store" />
                                </svg><span class="radio"></span></div>
                            <b>Employee store</b><span>Recipients choose within your rules</span>
                        </div>
                        <div class="mode-opt">
                            <div class="mode-opt-top"><svg class="icon">
                                    <use href="#i-send" />
                                </svg><span class="radio"></span></div>
                            <b>Direct send</b><span>You pick the gift, we deliver it</span>
                        </div>
                    </div>

                    <div class="cfg">
                        <div class="cfg-row"><span>Per-person budget</span><b>₹2,500</b></div>
                        <div class="cfg-row"><span>Categories switched on</span><b>6 of 8</b></div>
                        <div class="cfg-row"><span>Delivery</span><b>Pan-India, doorstep</b></div>
                        <div class="cfg-row"><span>Off-budget selections possible</span><b class="ok">None</b></div>
                    </div>

                    <div class="builder-foot">
                        <svg class="icon">
                            <use href="#i-check" />
                        </svg>
                        <span>Sourcing, branding, fulfilment and reporting included in both models</span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div class="strip">
        <div class="wrap">
            <div class="strip-panel">
                <span>Built for HR, Admin, Sales and Marketing teams</span>
                <span class="cap"><svg class="icon">
                        <use href="#i-heart" />
                    </svg> Recipient choice</span>
                <span class="cap"><svg class="icon">
                        <use href="#i-wallet" />
                    </svg> Budget controls</span>
                <span class="cap"><svg class="icon">
                        <use href="#i-brush" />
                    </svg> Branding &amp; personalisation</span>
                <span class="cap"><svg class="icon">
                        <use href="#i-truck" />
                    </svg> Managed fulfilment</span>
            </div>
        </div>
    </div>

    <!-- ============ TWO MODELS ============ -->`;

export function HeroSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
