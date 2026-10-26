const markup = `<section class="section addr" id="paths">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="kicker">The hard part</span>
        <h2>Addresses, not gifts, are what sink client campaigns.</h2>
      </div>
          </div>

    <div class="path-grid">
      <article class="path reco">
        <span class="path-tag">Recommended</span>
        <h3>Gift links</h3>
        <p>A private link on your branding. They confirm the gift, pick a variant and enter their own address. You never handle personal data.</p>
        <ul>
          <li><svg class="icon"><use href="#i-check"/></svg><span>Works from just a name and a work email</span></li>
          <li><svg class="icon"><use href="#i-check"/></svg><span>Recipients enter home or office addresses themselves</span></li>
          <li><svg class="icon"><use href="#i-check"/></svg><span>Automatic reminders chase unopened links</span></li>
          <li><svg class="icon"><use href="#i-check"/></svg><span>Sends on email, WhatsApp or from your own CRM</span></li>
          <li><svg class="icon"><use href="#i-check"/></svg><span>Live view of who has confirmed and who hasn't</span></li>
        </ul>
      </article>

      <article class="path">
        <span class="path-tag">Also supported</span>
        <h3>Address list</h3>
        <p>Already hold verified addresses &mdash; a dealer network, a registration export? Hand them over and we dispatch straight from the sheet.</p>
        <ul>
          <li><svg class="icon"><use href="#i-check"/></svg><span>Straight to dispatch, no recipient step</span></li>
          <li><svg class="icon"><use href="#i-check"/></svg><span>Fastest route when addresses are already clean</span></li>
          <li><svg class="icon"><use href="#i-check"/></svg><span>Good fit for dealer, branch and franchise networks</span></li>
          <li><svg class="icon"><use href="#i-check"/></svg><span>We flag incomplete rows before anything ships</span></li>
          <li><svg class="icon"><use href="#i-check"/></svg><span>Bulk delivery to one venue also supported</span></li>
        </ul>
      </article>
    </div>
  </div>
</section>

<!-- ============ PRESENTATION ============ -->`;

export function DirectGiftingAddressPathsSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
