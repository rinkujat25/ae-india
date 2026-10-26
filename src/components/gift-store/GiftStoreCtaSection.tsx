import { fillCompanyTokens } from "@/lib/company";
const markup = `<section class="cta">
        <div class="wrap">
            <div class="cta-panel">
                <div>
                    <h2>Let your people choose this time.</h2>
                    <p>Tell us the occasion, headcount and per-person budget. We will map the store setup, catalogue and
                        delivery plan for your next gifting program, and show you what recipients will see.</p>
                </div>
                <div class="cta-actions">
                    <a class="btn btn-primary" href="#start" data-open-form>Book an employee gift store demo →</a>
                    <a class="btn btn-soft" href="/ai-gift-finder">View AI preview</a>
                    <span class="cta-note">{{support_email_id}}</span>
                </div>
            </div>
        </div>
    </section>

    <!-- ================= FOOTER ================= -->`;

export function GiftStoreCtaSection() {
  return <div dangerouslySetInnerHTML={{ __html: fillCompanyTokens(markup) }} />;
}
