const markup = `<section class="section" id="experience">
        <div class="wrap">
            <div class="section-head">
                <div>
                    <span class="kicker">Recipient experience</span>
                    <h2>A gifting page people actually want to open.</h2>
                </div>
                <p>A clean branded page, not a form. They browse, pick, confirm their own size and address &mdash; and never see the machinery behind it.</p>
            </div>

            <div class="experience-grid">
                <div class="phone-panel">
                    <div class="phone-top">
                        <span>Employee view</span>
                        <h2>Riya's approved employee gift store</h2>
                        <p>Everything she can see already fits the rules, so any pick is a valid pick.</p>
                    </div>
                    <div class="phone-products">
                        <div class="phone-product">
                            <picture><img src="/assets/product-headphones.png" alt="Headphones gift" width="512"
                                    height="512" loading="lazy" decoding="async"></picture><b>Studio
                                headphones</b><small>Top wish</small>
                        </div>
                        <div class="phone-product">
                            <picture><img src="/assets/product-backpack.png" alt="Backpack gift" width="512"
                                    height="512" loading="lazy" decoding="async"></picture><b>Commuter
                                backpack</b><small>Travel profile</small>
                        </div>
                    </div>
                    <div class="phone-bottom">
                        <span><svg class="icon">
                                <use href="#i-truck"></use>
                            </svg></span>
                        <p>She chooses once. We do the rest.</p>
                    </div>
                </div>

                <div class="flow-list">
                    <div class="flow-item">
                        <div class="flow-ico"><svg class="icon">
                                <use href="#i-link"></use>
                            </svg></div>
                        <div>
                            <h3>Open the branded link</h3>
                            <p>One link on email, WhatsApp or the intranet &mdash; opening your store, in your branding.</p>
                        </div>
                    </div>
                    <div class="flow-item">
                        <div class="flow-ico"><svg class="icon">
                                <use href="#i-store"></use>
                            </svg></div>
                        <div>
                            <h3>Browse approved gifts</h3>
                            <p>Categories, filters and real product detail &mdash; nothing outside the budget.</p>
                        </div>
                    </div>
                    <div class="flow-item">
                        <div class="flow-ico"><svg class="icon">
                                <use href="#i-heart"></use>
                            </svg></div>
                        <div>
                            <h3>Save a private wishlist</h3>
                            <p>Sizes, interests and ideas stay saved, so nobody asks again next year.</p>
                        </div>
                    </div>
                    <div class="flow-item">
                        <div class="flow-ico"><svg class="icon">
                                <use href="#i-check"></use>
                            </svg></div>
                        <div>
                            <h3>Confirm variant and address</h3>
                            <p>Colour, size and address captured up front. No chasing.</p>
                        </div>
                    </div>
                    <div class="flow-item">
                        <div class="flow-ico"><svg class="icon">
                                <use href="#i-truck"></use>
                            </svg></div>
                        <div>
                            <h3>Track it to the doorstep</h3>
                            <p>Status updates and support come from us, keeping the HR inbox out of it.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ================= CONTROLS ================= -->`;

export function GiftStoreRecipientExperienceSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
