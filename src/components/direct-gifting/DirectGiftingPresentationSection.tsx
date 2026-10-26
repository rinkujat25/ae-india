const markup = `<section class="section" id="presentation">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="kicker">Presentation</span>
        <h2>For client gifting, the box is half the gift.</h2>
      </div>
          </div>

    <div class="pres-grid">
      <article class="pres">
        <div class="pres-ico"><svg class="icon"><use href="#i-box"/></svg></div>
        <h3>Packaging</h3>
        <p>Boxes and finish matched to the tier, so a ₹7,500 gift doesn&rsquo;t arrive in a ₹500 carton.</p>
      </article>
      <article class="pres">
        <div class="pres-ico"><svg class="icon"><use href="#i-note"/></svg></div>
        <h3>Personal notes</h3>
        <p>A different message per recipient, printed on card &mdash; not an invoice slip.</p>
      </article>
      <article class="pres">
        <div class="pres-ico"><svg class="icon"><use href="#i-eye"/></svg></div>
        <h3>Discreet branding</h3>
        <p>Some gifts should carry your logo; some should barely whisper it. Set per campaign.</p>
      </article>
      <article class="pres">
        <div class="pres-ico"><svg class="icon"><use href="#i-shield"/></svg></div>
        <h3>Quality checks</h3>
        <p>Checked before dispatch. A damaged client gift costs more than the gift.</p>
      </article>
    </div>
  </div>
</section>

<!-- ============ TIERS ============ -->`;

export function DirectGiftingPresentationSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
