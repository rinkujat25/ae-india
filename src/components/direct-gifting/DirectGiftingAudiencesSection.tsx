const markup = `<section class="section" id="audiences">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="kicker">Who it's for</span>
        <h2>When the gift is your decision, not theirs.</h2>
      </div>
      <p>Clients, partners and guests do better with one well-presented gift.</p>
    </div>

    <div class="aud-grid">
      <article class="aud">
        <div class="aud-ico"><svg class="icon"><use href="#i-briefcase"/></svg></div>
        <h3>Client gifting</h3>
        <p>Sent to each person on the account list, not dropped at a reception desk in one carton.</p>
        <div class="aud-meta"><span>₹2,500 – ₹10,000</span><span>Individual dispatch</span></div>
      </article>
      <article class="aud">
        <div class="aud-ico"><svg class="icon"><use href="#i-crown"/></svg></div>
        <h3>CXO &amp; executive</h3>
        <p>Short, high-value lists where presentation carries the message. Discreet branding, a note that reads as written.</p>
        <div class="aud-meta"><span>₹7,500+</span><span>Presentation-led</span></div>
      </article>
      <article class="aud">
        <div class="aud-ico"><svg class="icon"><use href="#i-handshake"/></svg></div>
        <h3>Partners &amp; channel</h3>
        <p>Dealer and channel rewards across cities, with different values per tier in one campaign.</p>
        <div class="aud-meta"><span>Tiered values</span><span>Multi-city</span></div>
      </article>
      <article class="aud">
        <div class="aud-ico"><svg class="icon"><use href="#i-ticket"/></svg></div>
        <h3>Events &amp; conferences</h3>
        <p>Delegate and speaker gifting &mdash; to the venue for handout, or to each attendee afterwards.</p>
        <div class="aud-meta"><span>Venue or doorstep</span><span>Speaker gifts</span></div>
      </article>
      <article class="aud">
        <div class="aud-ico"><svg class="icon"><use href="#i-heart"/></svg></div>
        <h3>Customer campaigns</h3>
        <p>Loyalty, win-back and milestone gifting, run as a tracked campaign not a courier job.</p>
        <div class="aud-meta"><span>Campaign tracked</span><span>Any volume</span></div>
      </article>
    </div>
  </div>
</section>

<!-- ============ THE ADDRESS PROBLEM ============ -->`;

export function DirectGiftingAudiencesSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
