const markup = `<section class="section tiers" id="tiers">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="kicker">Browse by budget</span>
        <h2>Start from the number, not the product.</h2>
      </div>
      <p>Most programs begin with a per-person budget.</p>
    </div>

    <div class="tier-grid">
      <article class="tier">
        <div class="tier-top"><b>₹1,000</b><span>Festival scale</span></div>
        <p>The workhorse tier for large employee festival programs where everyone gets a real choice.</p>
        <ul>
          <li><svg class="icon"><use href="#i-check"></use></svg>Gourmet hampers and sweet boxes</li>
          <li><svg class="icon"><use href="#i-check"></use></svg>Desk and stationery accessories</li>
          <li><svg class="icon"><use href="#i-check"></use></svg>Compact home and kitchen items</li>
        </ul>
      </article>

      <article class="tier">
        <div class="tier-top"><b>₹1,500</b><span>Sustainable</span></div>
        <p>Where eco-conscious festival programs land, with branded kits that still feel considered.</p>
        <ul>
          <li><svg class="icon"><use href="#i-check"></use></svg>Sustainable desk and plant kits</li>
          <li><svg class="icon"><use href="#i-check"></use></svg>Premium dry-fruit and truffle boxes</li>
          <li><svg class="icon"><use href="#i-check"></use></svg>Wellness and self-care minis</li>
        </ul>
      </article>

      <article class="tier">
        <div class="tier-top"><b>₹2,500</b><span>Everyday</span></div>
        <p>Birthdays, small wins and everyday employee gifting across the year.</p>
        <ul>
          <li><svg class="icon"><use href="#i-check"></use></svg>Entry audio and phone accessories</li>
          <li><svg class="icon"><use href="#i-check"></use></svg>Coffee, tea and barware sets</li>
          <li><svg class="icon"><use href="#i-check"></use></svg>Everyday bags and organisers</li>
        </ul>
      </article>

      <article class="tier">
        <div class="tier-top"><b>₹5,000</b><span>Personal</span></div>
        <p>Personal occasions and mid-tier recognition, where the gift should feel chosen rather than issued.</p>
        <ul>
          <li><svg class="icon"><use href="#i-check"></use></svg>Wireless audio and smart devices</li>
          <li><svg class="icon"><use href="#i-check"></use></svg>Small kitchen appliances</li>
          <li><svg class="icon"><use href="#i-check"></use></svg>Weekend bags and travel gear</li>
        </ul>
      </article>

      <article class="tier">
        <div class="tier-top"><b>₹7,500</b><span>Client & CXO</span></div>
        <p>Client, partner and executive gifting where presentation matters as much as the item.</p>
        <ul>
          <li><svg class="icon"><use href="#i-check"></use></svg>Elegant non-food gifting</li>
          <li><svg class="icon"><use href="#i-check"></use></svg>Premium home and decor</li>
          <li><svg class="icon"><use href="#i-check"></use></svg>Dining and wellness experiences</li>
        </ul>
      </article>

      <article class="tier">
        <div class="tier-top"><b>₹10,000</b><span>Milestone</span></div>
        <p>Work anniversaries, long-service awards and high-value recognition moments.</p>
        <ul>
          <li><svg class="icon"><use href="#i-check"></use></svg>Premium audio and headphones</li>
          <li><svg class="icon"><use href="#i-check"></use></svg>Luggage and travel systems</li>
          <li><svg class="icon"><use href="#i-check"></use></svg>Stays, learning and experience vouchers</li>
        </ul>
      </article>
    </div>
  </div>
</section>

<!-- ============ CATEGORIES ============ -->`;

export function CatalogueBudgetTiersSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
