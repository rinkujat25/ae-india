import { fillCompanyTokens } from "@/lib/company";
const markup = `<section class="cta">
  <div class="wrap">
    <div class="cta-panel">
      <div>
        <h2>Want this catalogue shaped around your program?</h2>
        <p>Tell us the occasion, headcount and per-person budget. We'll come back with a curated shortlist across the categories that suit your audience.</p>
      </div>
      <div class="cta-actions">
        <a class="btn btn-primary" href="#start" data-open-form>Book a demo</a>
        <a class="btn btn-soft" href="/employee-gift-store">See how gift stores work</a>
        <span class="cta-note">{{support_email_id}}</span>
      </div>
    </div>
  </div>
</section>

<!-- ============ FOOTER ============ -->`;

export function CatalogueCtaSection() {
  return <div dangerouslySetInnerHTML={{ __html: fillCompanyTokens(markup) }} />;
}
