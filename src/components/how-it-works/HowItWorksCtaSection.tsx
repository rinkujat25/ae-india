import { fillCompanyTokens } from "@/lib/company";
const markup = "<section class=\"cta\">\n  <div class=\"wrap\">\n    <div class=\"cta-panel\">\n      <div>\n        <h2>Walk through it with your own numbers.</h2>\n        <p>Tell us the occasion, headcount and per-person budget. We will map it to the six stages, give you a realistic go-live date, and show you exactly what your recipients would see.</p>\n      </div>\n      <div class=\"cta-actions\">\n        <a class=\"btn btn-primary\" href=\"/contact-us\">Talk to us →</a>\n        <span class=\"cta-note\">{{support_email_id}}</span>\n      </div>\n    </div>\n  </div>\n</section>";

export function HowItWorksCtaSection() {
  return <div dangerouslySetInnerHTML={{ __html: fillCompanyTokens(markup) }} />;
}
