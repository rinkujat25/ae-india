const markup = `<header class="hero">
        <div class="wrap hero-grid">
            <div>
                <span class="eyebrow">✦ Branded employee gift stores for every gifting program</span>
                <h1>One employee gift store. Recipients choose within <span class="accent">your rules.</span></h1>
                <p class="hero-copy">You define the budget, audience and catalogue. Recipients choose from approved gifts. We handle everything from sourcing to the doorstep.</p>
                <div class="hero-actions">
                    <a class="btn btn-primary" href="#start" data-open-form>Launch an employee gift store →</a>
                    <a class="btn btn-soft" href="#experience">Preview the experience</a>
                </div>
                <div class="hero-trust">
                    <div class="avatars"><span class="avatar"></span><span class="avatar"></span><span
                            class="avatar"></span></div>
                    <span>Built for HR &amp; Admin teams running gifting for 50 to 50,000+ people.</span>
                </div>
                <div class="hero-points">
                    <div class="hero-point"><b>One</b><span>branded store, reused across every occasion</span></div>
                    <div class="hero-point"><b>Your</b><span>budget, eligibility and catalogue rules</span></div>
                    <div class="hero-point"><b>Pan-India</b><span>sourcing, branding and doorstep delivery</span></div>
                </div>
            </div>

            <div class="store-preview">
                <div class="preview-card">
                    <div class="preview-head">
                        <div class="store-logo">
                            <span class="store-mark"></span>
                            <span>Acme Festival Store<small>Powered by Wingback</small></span>
                        </div>
                        <span class="budget-pill">Budget Rs. 2,500</span>
                    </div>
                    <div class="store-banner">
                        <span>Diwali gifting program</span>
                        <h2>Choose a gift from your approved catalogue.</h2>
                    </div>
                    <div class="preview-chips">
                        <span class="on">All
                            gifts</span><span>Tech</span><span>Home</span><span>Wellness</span><span>Travel</span><span>Gourmet</span>
                    </div>
                    <div class="product-row">
                        <div class="mini-product">
                            <picture><img src="/assets/product-headphones.png" alt="Wireless headphones" width="512"
                                    height="512" loading="lazy" decoding="async"></picture><b>Wireless
                                headphones</b><small>Tech and audio</small>
                        </div>
                        <div class="mini-product">
                            <picture><img src="/assets/product-pour-over.png" alt="Coffee ritual kit" width="512"
                                    height="512" loading="lazy" decoding="async"></picture><b>Coffee ritual
                                kit</b><small>Home and gourmet</small>
                        </div>
                        <div class="mini-product">
                            <picture><img src="/assets/product-backpack.png" alt="Travel backpack" width="512"
                                    height="512" loading="lazy" decoding="async"></picture><b>Travel
                                backpack</b><small>Travel ready</small>
                        </div>
                    </div>
                    <div class="preview-foot">
                        <span>Choices made</span>
                        <span class="bar"><i></i></span>
                        <span>812 of 1,000</span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- ================= CAPABILITY STRIP ================= -->`;

export function GiftStoreHeroSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
