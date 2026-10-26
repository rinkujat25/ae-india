const markup = "<div class=\"deadline\">\n  <div class=\"wrap deadline-inner\">\n    <span class=\"deadline-tag\">Diwali 2026</span>\n    <p><b>Diwali is on 8 Nov 2026.</b> The store opens in five working days — the deadline is dispatch, not setup.</p>\n    <a href=\"#runway\">See the runway →</a>\n  </div>\n</div>";

export function DiwaliDeadlineStrip() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
