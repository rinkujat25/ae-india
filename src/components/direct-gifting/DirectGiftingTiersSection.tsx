const markup = `<section class="section tiers" id="tiers">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="kicker">Budget tiers</span>
        <h2>What a client gift buys at each level.</h2>
      </div>
          </div>

    <div class="tier-grid">
      <div class="tier">
        <div class="tier-top"><b>₹2,500</b><span>Volume</span></div>
        <p>Wide account lists and customer campaigns where reach matters more than weight.</p>
        <ul>
          <li><svg class="icon"><use href="#i-check"/></svg> Gourmet and dry-fruit boxes</li>
          <li><svg class="icon"><use href="#i-check"/></svg> Desk and stationery sets</li>
          <li><svg class="icon"><use href="#i-check"/></svg> Compact home items</li>
        </ul>
      </div>
      <div class="tier">
        <div class="tier-top"><b>₹5,000</b><span>Relationship</span></div>
        <p>The working tier for named accounts and mid-tier channel partners.</p>
        <ul>
          <li><svg class="icon"><use href="#i-check"/></svg> Premium home and décor</li>
          <li><svg class="icon"><use href="#i-check"/></svg> Barware and coffee sets</li>
          <li><svg class="icon"><use href="#i-check"/></svg> Small leather goods</li>
        </ul>
      </div>
      <div class="tier">
        <div class="tier-top"><b>₹7,500</b><span>Client &amp; CXO</span></div>
        <p>Where presentation starts carrying as much weight as the item itself.</p>
        <ul>
          <li><svg class="icon"><use href="#i-check"/></svg> Elegant non-food gifting</li>
          <li><svg class="icon"><use href="#i-check"/></svg> Premium décor and fragrance</li>
          <li><svg class="icon"><use href="#i-check"/></svg> Dining and wellness experiences</li>
        </ul>
      </div>
      <div class="tier">
        <div class="tier-top"><b>₹10,000+</b><span>Executive</span></div>
        <p>Short lists, senior recipients, and gifts that are expected to be remembered.</p>
        <ul>
          <li><svg class="icon"><use href="#i-check"/></svg> Premium audio and tech</li>
          <li><svg class="icon"><use href="#i-check"/></svg> Luggage and travel systems</li>
          <li><svg class="icon"><use href="#i-check"/></svg> Stays and curated experiences</li>
        </ul>
      </div>
    </div>

    <p class="note">Tiers and examples are indicative. Your shortlist is curated against the audience, the occasion and any category rules you set — see the <a class="accent" href="/catalogue" style="font-style:normal;font-weight:800">full catalogue</a>.</p>
  </div>
</section>

<!-- ============ TIMELINE ============ -->`;

export function DirectGiftingTiersSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
