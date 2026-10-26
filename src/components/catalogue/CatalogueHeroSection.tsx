const markup = `<header class="hero">
  <div class="wrap hero-grid">
    <div>
      <span class="eyebrow"><svg class="icon"><use href="#i-sparkle"></use></svg> Eight categories, every budget</span>
      <h1>The catalogue your people <span class="accent">get to choose from.</span></h1>
      <p class="hero-copy">You approve the categories, brands and budget. Recipients browse only what fits their program.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#start" data-open-form>Book a demo</a>
        <a class="btn btn-soft" href="#categories">Browse categories</a>
      </div>
      <div class="hero-stats">
        <div class="stat"><b>8</b><span>categories spanning products and experiences</span></div>
        <div class="stat"><b>₹1k–₹10k</b><span>typical per-recipient budget tiers</span></div>
        <div class="stat"><b>Pan-India</b><span>sourcing, branding and doorstep delivery</span></div>
      </div>
    </div>

    <div class="browser">
      <div class="browser-card">
        <div class="browser-bar">
          <div><b>Diwali Choice Program</b><small>Approved catalogue · 1,248 recipients</small></div>
          <span class="chip-budget">Budget ₹2,500</span>
        </div>
        <div class="facets">
          <div class="facet"><span>Budget</span><i>Under ₹1,000</i><i class="on">₹1,000–₹2,500</i><i>₹2,500+</i></div>
          <div class="facet"><span>Category</span><i class="on">All</i><i>Tech</i><i>Home</i><i>Wellness</i><i>Travel</i><i>Gourmet</i></div>
        </div>
        <div class="mock-grid">
          <div class="mock-item"><picture><img src="/assets/product-headphones.png" alt="Wireless headphones" width="512" height="512" loading="lazy" decoding="async"></picture><b>Wireless headphones</b><small>₹2,450</small></div>
          <div class="mock-item"><picture><img src="/assets/product-pour-over.png" alt="Ceramic pour-over set" width="512" height="512" loading="lazy" decoding="async"></picture><b>Pour-over set</b><small>₹2,200</small></div>
          <div class="mock-item mock-more"><b>+240</b><span>more in budget</span></div>
        </div>
      </div>
    </div>
  </div>
</header>

<!-- ============ BUDGET TIERS ============ -->`;

export function CatalogueHeroSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
