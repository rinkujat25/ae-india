const markup = `<section class="section" id="programs">
        <div class="wrap">
            <div class="section-head">
                <div>
                    <span class="kicker">One store, many programs</span>
                    <h2>Every gifting occasion runs from the same store.</h2>
                </div>
                <p>Set it up once, reuse it forever. Each program gets its own audience, budget and approved catalogue.</p>
            </div>

            <div class="program-grid">
                <article class="program">
                    <div class="program-ico"><svg class="icon">
                            <use href="#i-sparkle"></use>
                        </svg></div>
                    <h3>Festivals &amp; celebrations</h3>
                    <p>Diwali, Holi, Eid, Christmas, annual day.</p>
                    <div class="tags"><span>Bulk gifting</span><span>Choice catalogue</span><span>Gift links</span>
                    </div>
                </article>

                <article class="program">
                    <div class="program-ico"><svg class="icon">
                            <use href="#i-gift"></use>
                        </svg></div>
                    <h3>Onboarding kits</h3>
                    <p>Apparel, drinkware, tech essentials and a personal note.</p>
                    <div class="tags"><span>Logo branding</span><span>Size capture</span><span>Doorstep delivery</span>
                    </div>
                </article>

                <article class="program">
                    <div class="program-ico"><svg class="icon">
                            <use href="#i-badge"></use>
                        </svg></div>
                    <h3>Milestones &amp; anniversaries</h3>
                    <p>Anniversaries, long-service awards and birthdays.</p>
                    <div class="tags"><span>Tiered budgets</span><span>Personal notes</span><span>Premium picks</span>
                    </div>
                </article>

                <article class="program">
                    <div class="program-ico"><svg class="icon">
                            <use href="#i-heart"></use>
                        </svg></div>
                    <h3>Rewards &amp; recognition</h3>
                    <p>Spot rewards and recognition, where the moment matters more than the logistics.</p>
                    <div class="tags"><span>Fast dispatch</span><span>Multi-address</span><span>Reporting</span></div>
                </article>

                <article class="program">
                    <div class="program-ico"><svg class="icon">
                            <use href="#i-briefcase"></use>
                        </svg></div>
                    <h3>Client &amp; CXO gifting</h3>
                    <p>Executive gifting and customer hampers, well presented, delivered individually.</p>
                    <div class="tags"><span>Premium curation</span><span>Personal notes</span><span>Multi-address
                            delivery</span></div>
                </article>

                <article class="program">
                    <div class="program-ico"><svg class="icon">
                            <use href="#i-users"></use>
                        </svg></div>
                    <h3>Partners, events &amp; customers</h3>
                    <p>Partner rewards, event guests and customer campaigns &mdash; a gift link, not a shipping sheet.</p>
                    <div class="tags"><span>Gift links</span><span>Event kits</span><span>Campaign tracking</span></div>
                </article>
            </div>
        </div>
    </section>

    <!-- ================= RECIPIENT EXPERIENCE ================= -->`;

export function GiftStoreProgramsSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
