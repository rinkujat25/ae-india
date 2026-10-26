const markup = `<section class="section ai-section ai-compact" id="ai">
        <div class="wrap">
            <div class="ai-band">
                <div class="ai-band-copy">
                    <span class="kicker">AI Gift Finder &middot; Coming soon</span>
                    <h2>Describe the occasion. Get the shortlist.</h2>
                    <p>Next up: type the brief in plain English — audience, budget, occasion — and see matches instantly. Today a human does it for you, usually inside a day.</p>
                </div>
                <a class="btn btn-soft ai-band-cta" href="/ai-gift-finder">Preview the AI Gift Finder →</a>
            </div>
        </div>
    </section>

    <!-- ============ FAQ ============ -->`;

export function AiFinderSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
