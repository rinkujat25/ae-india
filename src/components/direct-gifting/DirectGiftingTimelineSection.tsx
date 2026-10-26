const markup = `<section class="section" id="timeline">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="kicker">Timing</span>
        <h2>A direct campaign runs faster than a store.</h2>
      </div>
      <p>No store to build, no catalogue to approve. You sign off one gift; the clock is addresses and dispatch.</p>
    </div>

    <div class="tl">
      <div class="tl-step">
        <div class="tl-num">01</div>
        <h3>Brief &amp; shortlist</h3>
        <p>Audience, headcount, budget and tone. We come back with a shortlist.</p>
        <span class="tl-when">Days 1–3</span>
      </div>
      <div class="tl-step">
        <div class="tl-num">02</div>
        <h3>Approve &amp; brand</h3>
        <p>You pick the gift and sign off packaging, branding and the note.</p>
        <span class="tl-when">Days 4–6</span>
      </div>
      <div class="tl-step">
        <div class="tl-num">03</div>
        <h3>Links go out</h3>
        <p>Each recipient confirms their address. Reminders chase whoever hasn&rsquo;t.</p>
        <span class="tl-when">Days 7–12</span>
      </div>
      <div class="tl-step">
        <div class="tl-num">04</div>
        <h3>Dispatch &amp; report</h3>
        <p>Packed, checked and shipped individually, then one campaign report.</p>
        <span class="tl-when">Days 10–16</span>
      </div>
    </div>

    <div class="tl-note">
      <svg class="icon"><use href="#i-clock"/></svg>
      <p><b>Roughly two weeks end to end</b> for a standard campaign. Custom packaging or logo application adds about a week.</p>
    </div>
  </div>
</section>

<!-- ============ VERSUS ============ -->`;

export function DirectGiftingTimelineSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
