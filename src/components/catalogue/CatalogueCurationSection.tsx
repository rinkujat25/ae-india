const markup = `<section class="section" id="curation">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="kicker">How the catalogue is built</span>
        <h2>Curated against demand, not a vendor list.</h2>
      </div>
          </div>

    <div class="build-grid">
      <article class="build">
        <div class="build-num">01</div>
        <h3>Aggregate demand</h3>
        <p>Saved wishlists, sizes and past selections tell us what this audience wants.</p>
      </article>
      <article class="build">
        <div class="build-num">02</div>
        <h3>Source &amp; negotiate</h3>
        <p>Approved vendors are approached with consolidated volume, and negotiated where quantity allows.</p>
      </article>
      <article class="build">
        <div class="build-num">03</div>
        <h3>Quality-check</h3>
        <p>Samples checked for build, finish and packaging before anything reaches the list.</p>
      </article>
      <article class="build">
        <div class="build-num">04</div>
        <h3>Publish &amp; adjust</h3>
        <p>It goes live in your store, with items swapped in or out as stock moves.</p>
      </article>
    </div>
  </div>
</section>

<!-- ============ CTA ============ -->`;

export function CatalogueCurationSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
