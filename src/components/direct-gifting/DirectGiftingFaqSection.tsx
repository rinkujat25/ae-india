const markup = `<section class="section" id="faq">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="kicker">Questions</span>
        <h2>What comes up on client campaigns.</h2>
      </div>
          </div>

    <div class="faq-grid">
      <details class="faq">
        <summary>We don't have our clients' addresses. Is that a problem?<svg class="icon faq-plus"><use href="#i-plus"/></svg></summary>
        <p>No — that is the normal starting point, and it is what gift links are for. A name and a work email is enough. Each recipient gets a private link on your branding and enters their own address, so nobody on your team has to ask a client where they live.</p>
      </details>
      <details class="faq">
        <summary>Why do you recommend non-food gifts for clients?<svg class="icon faq-plus"><use href="#i-plus"/></svg></summary>
        <p>You rarely know a client's dietary rules or allergies, and a food gift that lands wrong is worse than no gift. Non-food also travels better and has no shelf life. We run gourmet campaigns happily — we just flag the risk on senior or unfamiliar lists.</p>
      </details>
      <details class="faq">
        <summary>Can different recipients get different gifts in one campaign?<svg class="icon faq-plus"><use href="#i-plus"/></svg></summary>
        <p>Yes. Tiered values are common on partner campaigns — top dealers at one value, the rest at another — running as one campaign with one report. A named list can also be given a choice of two or three gifts.</p>
      </details>
      <details class="faq">
        <summary>Can you deliver to an event venue instead?<svg class="icon faq-plus"><use href="#i-plus"/></svg></summary>
        <p>Yes. Bulk delivery to a venue for on-site handout is supported, as is shipping to each attendee afterwards from a registration list. Post-event shipping usually gets a warmer reception, since nobody wants to carry a box home from a conference.</p>
      </details>
      <details class="faq">
        <summary>How much branding should a client gift carry?<svg class="icon faq-plus"><use href="#i-plus"/></svg></summary>
        <p>That is set per campaign. Partner and event gifting usually carries clear branding; CXO gifting usually does not, beyond the packaging and the note. We will advise, but it is your call and it is decided before production.</p>
      </details>
    </div>
  </div>
</section>

<!-- ============ CTA ============ -->`;
export function DirectGiftingFaqSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
