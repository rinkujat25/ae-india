const markup = `<section class="section featured" id="featured">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="kicker">Sample picks</span>
        <h2>What a curated shortlist looks like.</h2>
      </div>
          </div>

    <div class="feat-grid">
      <article class="feat">
        <picture><img src="/assets/product-headphones.png" alt="Studio wireless headphones on a lilac background" width="512" height="512" loading="lazy" decoding="async"></picture>
        <div class="feat-body">
          <span>Tech &amp; audio</span>
          <h3>Studio wireless headphones</h3>
          <p>The reliable milestone pick &mdash; anniversaries, top-performer rewards, premium client gifting.</p>
          <div class="feat-foot"><span>Milestone tier</span><b>₹10,000</b></div>
        </div>
      </article>

      <article class="feat">
        <picture><img src="/assets/product-pour-over.png" alt="Ceramic pour-over coffee set" width="512" height="512" loading="lazy" decoding="async"></picture>
        <div class="feat-body">
          <span>Home &amp; gourmet</span>
          <h3>Ceramic pour-over set</h3>
          <p>Design-led, and easy to pair with branded packaging and a note.</p>
          <div class="feat-foot"><span>Everyday tier</span><b>₹2,500</b></div>
        </div>
      </article>

      <article class="feat">
        <picture><img src="/assets/product-backpack.png" alt="Grey commuter backpack" width="512" height="512" loading="lazy" decoding="async"></picture>
        <div class="feat-body">
          <span>Travel</span>
          <h3>Commuter backpack</h3>
          <p>Practical, brandable and size-free &mdash; a safe pick for distributed teams at volume.</p>
          <div class="feat-foot"><span>Client tier</span><b>₹7,500</b></div>
        </div>
      </article>
    </div>

    <p class="note">Product names, prices and tiers on this page are representative examples. Your live catalogue is curated against your budget, brand rules and program dates.</p>
  </div>
</section>

<!-- ============ HOW IT'S BUILT ============ -->`;

export function CatalogueFeaturedSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
