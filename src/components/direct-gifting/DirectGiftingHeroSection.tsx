const markup = `<header class="hero">
  <div class="wrap hero-grid">
    <div>
      <span class="eyebrow"><svg class="icon"><use href="#i-send"/></svg> Model 2 · Direct corporate gifting</span>
      <h1>You have the names. <span class="accent">We'll get the addresses.</span></h1>
      <p class="hero-copy">Client gifting rarely fails on the gift. It fails on the addresses. We send each recipient a private link, collect their address, and deliver.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#start" data-open-form>Plan a campaign →</a>
        <a class="btn btn-soft" href="#paths">See how delivery works</a>
      </div>
      <div class="hero-stats">
        <div class="stat"><b>No store</b><span>to build — you approve one gift</span></div>
        <div class="stat"><b>2 weeks</b><span>typical runway for a campaign</span></div>
        <div class="stat"><b>Pan-India</b><span>individual doorstep delivery</span></div>
      </div>
    </div>

    <div class="camp" aria-label="Illustrative campaign tracker">
      <div class="camp-card">
        <div class="camp-bar">
          <div><b>Client Diwali Campaign</b><small>212 recipients · ₹7,500 per gift</small></div>
          <span class="live-pill"><i></i> Live</span>
        </div>
        <div class="funnel">
          <div class="fun-row done">
            <div><b>Gift links sent</b><small>Private link per recipient, on your branding</small></div>
            <span class="fun-n">212</span>
            <span class="bar"><i style="width:100%"></i></span>
          </div>
          <div class="fun-row done">
            <div><b>Links opened</b><small>Recipient sees the gift and confirms it</small></div>
            <span class="fun-n">198</span>
            <span class="bar"><i style="width:93%"></i></span>
          </div>
          <div class="fun-row now">
            <div><b>Addresses confirmed</b><small>Entered by the recipient, never by your team</small></div>
            <span class="fun-n">186</span>
            <span class="bar"><i style="width:88%"></i></span>
          </div>
          <div class="fun-row">
            <div><b>Branded &amp; dispatched</b><small>Packed, noted, quality-checked, shipped</small></div>
            <span class="fun-n">154</span>
            <span class="bar"><i style="width:73%"></i></span>
          </div>
        </div>
        <div class="camp-foot">
          <svg class="icon"><use href="#i-shield"/></svg>
          <span>Reminders chase the 26 unopened links. Your team is not in that loop.</span>
        </div>
      </div>
    </div>
  </div>
</header>

<div class="strip">
  <div class="wrap">
    <div class="strip-panel">
      <span>For Sales, Marketing, CXO offices and Admin teams</span>
      <span class="cap"><svg class="icon"><use href="#i-link"/></svg> Gift links</span>
      <span class="cap"><svg class="icon"><use href="#i-brush"/></svg> Branded presentation</span>
      <span class="cap"><svg class="icon"><use href="#i-truck"/></svg> Individual delivery</span>
      <span class="cap"><svg class="icon"><use href="#i-chart"/></svg> Campaign reporting</span>
    </div>
  </div>
</div>

<!-- ============ AUDIENCES ============ -->`;

export function DirectGiftingHeroSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
