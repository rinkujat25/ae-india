import { fillCompanyTokens } from "@/lib/company";
const markup = `<section class="cta" id="start">
        <div class="wrap">
            <div class="cta-panel">
                <div>
                    <h2>Tell us the occasion. We'll tell you which model fits.</h2>
                    <p>Audience, headcount, budget. You'll get a curated shortlist and a realistic delivery date.</p>
                    <div class="cta-actions">
                        <a class="btn btn-primary" href="#start" data-open-form>Get my shortlist →</a>
                        <a class="btn btn-soft" href="/how-it-works">See how it works</a>
                    </div>
                    <p class="cta-alt">Prefer email? Write to <a href="mailto:{{support_email_id}}">{{support_email_id}}</a> with your
                        headcount, occasion and per-person budget.</p>
                </div>
                <div class="cta-points">
                    <div class="point"><svg class="icon">
                            <use href="#i-check" />
                        </svg><span>A shortlist built for your budget and occasion</span></div>
                    <div class="point"><svg class="icon">
                            <use href="#i-check" />
                        </svg><span>The right gifting model for your audience</span></div>
                    <div class="point"><svg class="icon">
                            <use href="#i-check" />
                        </svg><span>A realistic go-live and delivery date</span></div>
                    <div class="point"><svg class="icon">
                            <use href="#i-check" />
                        </svg><span>A preview of what recipients would see</span></div>
                </div>
            </div>
        </div>
    </section>`;

export function StartCtaSection() {
  return <div dangerouslySetInnerHTML={{ __html: fillCompanyTokens(markup) }} />;
}
