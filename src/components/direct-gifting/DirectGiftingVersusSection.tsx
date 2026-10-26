const markup = `<section class="section versus" id="versus">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="kicker">Not sure which model</span>
        <h2>Direct gifting or an employee store?</h2>
      </div>
      <p>Most companies run both — a store for employees, direct campaigns for everyone outside the business. Start with either.</p>
    </div>

    <div class="vs-cta"><a class="btn btn-soft" href="/employee-gift-store">See how employee gift stores work →</a></div>
  </div>
</section>

<!-- ============ FAQ ============ -->`;

export function DirectGiftingVersusSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
