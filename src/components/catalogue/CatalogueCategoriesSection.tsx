const markup = `<section class="section" id="categories">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="kicker">Catalogue categories</span>
        <h2>Every category. Every budget. One approved list.</h2>
      </div>
          </div>

    <div class="cat-grid">
      <article class="cat" id="tech-electronics">
        <span class="cat-ico"><svg class="icon"><use href="#i-audio"></use></svg></span>
        <div>
          <h3><a href="/category/tech-electronics">Tech &amp; Electronics</a></h3>
          <p>Audio, smart devices and accessories &mdash; the most-picked category in milestone programs.</p>
          <div class="cat-items">Earbuds · Headphones · Speakers · Smart trackers · Chargers and hubs</div>
          <div class="cat-meta"><span class="range">₹2,500 – ₹15,000</span><span>Milestones</span><span>Rewards</span></div>
        </div>
      </article>

      <article class="cat" id="home-kitchen-festive">
        <span class="cat-ico"><svg class="icon"><use href="#i-home"></use></svg></span>
        <div>
          <h3><a href="/category/home-kitchen--festive">Home, Kitchen &amp; Festive</a></h3>
          <p>Appliances, cookware, decor and festive essentials. Lands well across every age group.</p>
          <div class="cat-items">Coffee makers · Cookware · Lighting · Diyas · Planters · Serveware</div>
          <div class="cat-meta"><span class="range">₹1,500 – ₹12,000</span><span>Festivals</span><span>Anniversaries</span></div>
        </div>
      </article>

      <article class="cat" id="wellness-fitness">
        <span class="cat-ico"><svg class="icon"><use href="#i-wellness"></use></svg></span>
        <div>
          <h3><a href="/category/wellness--fitness">Wellness &amp; Fitness</a></h3>
          <p>Fitness, recovery and self-care for wellness weeks and health-led campaigns.</p>
          <div class="cat-items">Yoga and fitness gear · Recovery tools · Sleep kits · Skincare · Aromatherapy</div>
          <div class="cat-meta"><span class="range">₹1,000 – ₹8,000</span><span>Wellness weeks</span><span>Team campaigns</span></div>
        </div>
      </article>

      <article class="cat" id="travel">
        <span class="cat-ico"><svg class="icon"><use href="#i-travel"></use></svg></span>
        <div>
          <h3><a href="/category/travel">Travel</a></h3>
          <p>Bags, luggage and travel gear. Strong for onboarding kits and offsites.</p>
          <div class="cat-items">Cabin luggage · Backpacks · Totes · Travel organisers · Accessories</div>
          <div class="cat-meta"><span class="range">₹2,000 – ₹10,000</span><span>Onboarding</span><span>Offsites</span></div>
        </div>
      </article>

      <article class="cat" id="food-gourmet">
        <span class="cat-ico"><svg class="icon"><use href="#i-gourmet"></use></svg></span>
        <div>
          <h3><a href="/category/food--gourmet">Food &amp; Gourmet</a></h3>
          <p>Hampers, coffee and artisanal food &mdash; the most scalable option at festival volume.</p>
          <div class="cat-items">Dry-fruit hampers · Chocolate and truffles · Coffee and tea · Snack boxes</div>
          <div class="cat-meta"><span class="range">₹800 – ₹5,000</span><span>Festivals</span><span>Bulk gifting</span></div>
        </div>
      </article>

      <article class="cat" id="fashion-lifestyle">
        <span class="cat-ico"><svg class="icon"><use href="#i-fashion"></use></svg></span>
        <div>
          <h3><a href="/category/fashion--lifestyle">Fashion &amp; Lifestyle</a></h3>
          <p>Apparel, accessories and personal care. Sizes captured from the recipient before dispatch.</p>
          <div class="cat-items">Branded apparel · Jackets · Wallets · Watches · Grooming sets</div>
          <div class="cat-meta"><span class="range">₹1,000 – ₹9,000</span><span>Onboarding</span><span>Size capture</span></div>
        </div>
      </article>

      <article class="cat" id="experiences">
        <span class="cat-ico"><svg class="icon"><use href="#i-experience"></use></svg></span>
        <div>
          <h3><a href="/category/experiences">Experiences</a></h3>
          <p>Dining, travel, wellness and learning — for recipients who already have enough things.</p>
          <div class="cat-items">Restaurant vouchers · Spa and wellness · Staycations · Workshops · Courses</div>
          <div class="cat-meta"><span class="range">₹2,000 – ₹15,000</span><span>Recognition</span><span>CXO gifting</span></div>
        </div>
      </article>

      <article class="cat" id="gift-cards">
        <span class="cat-ico"><svg class="icon"><use href="#i-card"></use></svg></span>
        <div>
          <h3><a href="/category/gift-cards">Gift Cards</a></h3>
          <p>Open choice for when flexibility matters more than a curated pick, or delivery windows are tight.</p>
          <div class="cat-items">Multi-brand cards · Single-brand cards · Custom denominations · Instant delivery</div>
          <div class="cat-meta"><span class="range">₹500 – ₹25,000</span><span>Distributed teams</span><span>Short notice</span></div>
        </div>
      </article>
    </div>
  </div>
</section>

<!-- ============ FEATURED ============ -->`;

export function CatalogueCategoriesSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
