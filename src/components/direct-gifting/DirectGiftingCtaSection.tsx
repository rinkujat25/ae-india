import { fillCompanyTokens } from "@/lib/company";
const markup = `<section class="cta" id="start">
  <div class="wrap">
    <div class="cta-panel">
      <div>
        <h2>Send us the list. We'll handle the rest.</h2>
        <p>Tell us the audience, headcount and per-gift budget. You'll get a curated shortlist built for that relationship, plus a realistic dispatch date — usually inside two weeks.</p>
        <div class="cta-actions">
          <a class="btn btn-primary" href="#start" data-open-form>Plan a campaign →</a>
          <a class="btn btn-soft" href="/how-it-works">See how it works</a>
        </div>
        <p class="cta-alt">Prefer email? Write to <a href="mailto:{{support_email_id}}">{{support_email_id}}</a> with your audience, headcount and per-gift budget.</p>
      </div>
      <div class="cta-points">
        <div class="point"><svg class="icon"><use href="#i-check"/></svg><span>Gift links — no address collection for your team</span></div>
        <div class="point"><svg class="icon"><use href="#i-check"/></svg><span>Branded packaging and per-recipient notes</span></div>
        <div class="point"><svg class="icon"><use href="#i-check"/></svg><span>Individual pan-India doorstep delivery</span></div>
        <div class="point"><svg class="icon"><use href="#i-check"/></svg><span>One campaign report, one invoice</span></div>
      </div>
    </div>
  </div>
</section>`;

export function DirectGiftingCtaSection() {
  return <div dangerouslySetInnerHTML={{ __html: fillCompanyTokens(markup) }} />;
}
