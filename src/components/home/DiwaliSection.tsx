const markup = `<div class="season">
        <div class="wrap season-inner">
            <span class="season-tag">Diwali 2026 · 8 Nov 2026</span>
            <p><b>Diwali is on 8 Nov 2026.</b> The store opens in five working days.</p>
            <a href="/diwali-gifting">Plan your Diwali program →</a>
        </div>
    </div>`;

export function DiwaliSection() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
