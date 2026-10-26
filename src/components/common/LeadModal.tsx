const markup = `<dialog id="lead-modal" aria-labelledby="lead-modal-title">
        <div class="modal-card">
            <button class="modal-close" type="button" data-close-form aria-label="Close enquiry form">
                <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                </svg>
            </button>
            <div class="modal-head">
                <span class="kicker">Start a program</span>
                <h2 id="lead-modal-title">Tell us the occasion.</h2>
                <p>Headcount, budget and date is all we need to come back with a curated shortlist.</p>
            </div>
            <div class="modal-body">
                <form id="lead-form" novalidate>
                    <div class="form-grid">
                        <div class="field">
                            <label for="lf-name">Your name <span class="req">*</span></label>
                            <input id="lf-name" name="name" type="text" required autocomplete="name"
                                placeholder="Full name">
                        </div>
                        <div class="field">
                            <label for="lf-email">Work email <span class="req">*</span></label>
                            <input id="lf-email" name="email" type="email" required autocomplete="email"
                                placeholder="you@company.com">
                        </div>
                        <div class="field">
                            <label for="lf-company">Company <span class="req">*</span></label>
                            <input id="lf-company" name="company" type="text" required autocomplete="organization"
                                placeholder="Company name">
                        </div>
                        <div class="field">
                            <label for="lf-phone">Phone</label>
                            <input id="lf-phone" name="phone" type="tel" autocomplete="tel" placeholder="Optional">
                        </div>

                        <div class="field wide">
                            <label>Which model are you after?</label>
                            <div class="radio-row">
                                <label class="radio-card"><input type="radio" name="model" value="Employee store"
                                        checked><span>Employee store<small>Recipients choose</small></span></label>
                                <label class="radio-card"><input type="radio" name="model"
                                        value="Direct gifting"><span>Direct gifting<small>You
                                            choose</small></span></label>
                            </div>
                        </div>

                        <div class="field">
                            <label for="lf-occasion">Occasion <span class="req">*</span></label>
                            <select id="lf-occasion" name="occasion" required>
                                <option value="">Select an occasion</option>
                                <option>Diwali / festival gifting</option>
                                <option>Onboarding &amp; welcome kits</option>
                                <option>Birthdays &amp; work anniversaries</option>
                                <option>Rewards &amp; recognition</option>
                                <option>Client or CXO gifting</option>
                                <option>Partner or channel gifting</option>
                                <option>Event or conference gifting</option>
                                <option>Customer campaign</option>
                                <option>Something else</option>
                            </select>
                        </div>
                        <div class="field">
                            <label for="lf-count">Number of recipients <span class="req">*</span></label>
                            <select id="lf-count" name="headcount" required>
                                <option value="">Select a range</option>
                                <option>Under 50</option>
                                <option>50 – 250</option>
                                <option>250 – 1,000</option>
                                <option>1,000 – 5,000</option>
                                <option>5,000 – 20,000</option>
                                <option>20,000+</option>
                            </select>
                        </div>
                        <div class="field">
                            <label for="lf-budget">Per-person budget <span class="req">*</span></label>
                            <select id="lf-budget" name="budget" required>
                                <option value="">Select a tier</option>
                                <option>Under ₹1,000</option>
                                <option>₹1,000 – ₹2,500</option>
                                <option>₹2,500 – ₹5,000</option>
                                <option>₹5,000 – ₹7,500</option>
                                <option>₹7,500 – ₹10,000</option>
                                <option>₹10,000+</option>
                                <option>Not decided yet</option>
                            </select>
                        </div>
                        <div class="field">
                            <label for="lf-date">Needs to land by</label>
                            <input id="lf-date" name="deliver_by" type="date">
                        </div>

                        <div class="field wide">
                            <label for="lf-notes">Anything else?</label>
                            <textarea id="lf-notes" name="notes"
                                placeholder="Cities, branding needs, last year's problems, anything that shapes the shortlist."></textarea>
                        </div>
                    </div>

                    <div class="form-submit">
                        <button class="btn btn-primary" type="submit">Get my shortlist →</button>
                        <span class="form-note">We reply within one working day. No spam, and your list is never
                            shared.</span>
                    </div>
                    <div class="form-status" id="lf-status" hidden></div>
                </form>
            </div>
        </div>
    </dialog>`;

export function LeadModal() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
