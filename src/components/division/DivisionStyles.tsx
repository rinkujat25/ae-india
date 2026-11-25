/**
 * The sheet for a division page, following the AE India division designs.
 *
 * `--accent` and its companions are set per tone on `.dv`, so the two
 * divisions share every rule and differ only in their tone.
 */
const styles = `
  .dv--facility{--accent:var(--teal);--accent-hover:#0b5c55;--accent-light:#7fd4c9;--tint:#f2f7f6;--tint-line:#dde9e7;--chip:var(--teal-tint)}
  .dv--architectural{--accent:var(--rust);--accent-hover:#83401b;--accent-light:#e8b48f;--tint:#f7f3ef;--tint-line:#eadfd5;--chip:var(--sand)}
  .dv--architectural .dv-section--dark{background:#1a1714;color:#d9d1c9}

  .dv{color:var(--ink-2)}
  .dv-eyebrow{margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:var(--accent)}
  .dv h2{font-size:var(--t-3xl);line-height:1.12;letter-spacing:-.5px;color:var(--ink)}
  .dv-link{font-weight:600;color:var(--accent)}
  .dv-link:hover{text-decoration:underline}
  .dv-btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 26px;border-radius:var(--r-sm);font-weight:600;font-size:var(--t-md)}
  .dv-btn--solid{background:var(--accent);color:#fff}
  .dv-btn--solid:hover{background:var(--accent-hover)}
  .dv-btn--line{background:#fff;border:1px solid #c9d3dc;color:var(--ink)}
  .dv-btn--line:hover{border-color:var(--ink)}

  .dv-section{padding:88px 0;scroll-margin-top:136px}
  .dv-section--grey{background:var(--cream)}
  .dv-section--tint{background:var(--tint)}
  .dv-section--dark{background:var(--ink);color:#c5cfdb}
  .dv-section--dark h2,.dv-section--dark .dv-steps h3{color:#fff}
  .dv-section--dark .dv-eyebrow{color:var(--accent-light)}
  .dv-head{max-width:680px;margin-bottom:44px}
  .dv-head p:last-child:not(.dv-eyebrow){margin-top:14px;font-size:17px}
  .dv-head--split{max-width:none;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:16px;margin-bottom:40px}

  .dv-hero{background:var(--tint);border-block:1px solid var(--tint-line)}
  .dv-hero-inner{display:flex;flex-wrap:wrap;align-items:center;gap:48px;padding:72px 0 80px}
  .dv-hero-copy{flex:1 1 480px;min-width:0}
  .dv-hero h1{margin:0 0 20px;font-size:clamp(36px,4.6vw,58px);line-height:1.06;letter-spacing:-1px;color:var(--ink);max-width:none}
  .dv-hero-lede{margin:0 0 32px;max-width:540px;font-size:18px}
  .dv-hero-actions{display:flex;flex-wrap:wrap;gap:12px}
  .dv-stats{display:flex;flex-wrap:wrap;gap:12px 32px;margin:40px 0 0;padding-top:28px;border-top:1px solid #d3e3e0}
  .dv-stats div{display:flex;flex-direction:column-reverse}
  .dv-stats dd{margin:0;font-family:var(--font-display);font-size:28px;font-weight:700;line-height:1.2;color:var(--ink)}
  .dv-stats dt{font-size:14px;color:var(--muted)}
  .dv-hero-art{position:relative;flex:1 1 440px;min-width:0;height:460px;margin:0;border:1px solid #c8ddd9;border-radius:var(--r-md);overflow:hidden}
  .dv-hero-art img{width:100%;height:100%;min-height:0;object-fit:cover}
  .dv-hero-art figcaption{position:absolute;left:16px;bottom:16px;padding:6px 11px;border-radius:6px;background:rgba(15,27,45,.78);color:#fff;font-size:13px;font-weight:600}

  .dv-hero--dark{background:#1a1714;border-color:#1a1714;color:#d9d1c9}
  .dv-hero--dark h1{color:#fff}
  .dv-hero--dark .dv-eyebrow{color:var(--accent-light)}
  .dv-hero--dark :focus-visible{outline-color:#fff}
  .dv-btn--light{background:var(--accent-light);color:#1a1714}
  .dv-btn--light:hover{background:#f0c7a9}
  .dv-btn--ghost{border:1px solid #5a514a;color:#fff}
  .dv-btn--ghost:hover{border-color:#fff}
  .dv-hero-mosaic{flex:1 1 440px;min-width:0;display:grid;grid-template:repeat(2,220px)/repeat(2,minmax(0,1fr));gap:12px}
  .dv-hero-mosaic figure{position:relative;margin:0;border-radius:var(--r-md);overflow:hidden}
  .dv-hero-mosaic figure:first-child{grid-row:span 2}
  .dv-hero-mosaic img{width:100%;height:100%;min-height:0;object-fit:cover}
  .dv-hero-mosaic figcaption{position:absolute;left:16px;bottom:16px;padding:6px 11px;border-radius:6px;background:rgba(15,27,45,.78);color:#fff;font-size:12px;font-weight:600}

  .dv-sectors{border-bottom:1px solid var(--line)}
  .dv-sectors ul,.dv-sectors .wrap{display:flex;flex-wrap:wrap;align-items:center;gap:10px 36px}
  .dv-sectors .wrap{padding:22px 0;font-size:14px;color:var(--muted)}
  .dv-sectors b{font-weight:600;color:var(--ink)}

  .dv-services{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:20px}
  .dv-service{padding:28px;background:#fff;border:1px solid var(--line);border-radius:var(--r-md)}
  .dv-service--key{background:var(--tint);border-color:var(--accent)}
  .dv-service-icon{display:grid;place-items:center;width:44px;height:44px;margin-bottom:20px;border-radius:10px;background:var(--chip);color:var(--accent)}
  .dv-service--key .dv-service-icon{background:var(--accent);color:#fff}
  .dv-service-icon svg,.dv-points svg,.dv-checklist svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
  .dv-service h3{margin:0 0 10px;font-size:21px;line-height:1.25;color:var(--ink)}
  .dv-service p{margin:0 0 16px;font-size:15px}
  .dv-service p:last-child,.dv-service .dv-link{margin:0;font-size:14px}
  .dv-service-note{color:var(--muted)}

  .dv-range{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(250px,100%),1fr));gap:16px}
  .dv-range-card{display:block;height:100%;background:#fff;border:1px solid var(--line);border-radius:12px;overflow:hidden;transition:border-color .15s ease}
  .dv-range-card:hover{border-color:var(--accent)}
  .dv-range-card img{width:100%;height:auto;aspect-ratio:3/2;object-fit:cover}
  .dv-range-body{display:block;padding:18px 20px}
  .dv-range-name{display:block;margin-bottom:4px;font-family:var(--font-display);font-weight:600;font-size:18px;color:var(--ink)}
  .dv-range-note{display:block;font-size:14px;color:var(--muted)}
  .dv-range-help{display:flex;flex-direction:column;justify-content:center;height:100%;padding:28px;border-radius:12px;background:var(--ink);color:#d7dee8;font-size:15px}
  .dv-range-help b{margin-bottom:8px;font-family:var(--font-display);font-weight:600;font-size:20px;color:#fff}
  .dv-range-help span{margin-top:16px;font-weight:600;color:var(--accent-light)}
  .dv-range-help:hover span{text-decoration:underline}

  .dv-refurb{display:flex;flex-wrap:wrap;align-items:center;gap:56px}
  .dv-refurb-art{flex:1 1 480px;min-width:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
  .dv-refurb-art figure{position:relative;margin:0;border-radius:var(--r-md);overflow:hidden}
  .dv-refurb-art img{width:100%;height:auto;aspect-ratio:19/25;object-fit:cover}
  .dv-refurb-art figcaption{position:absolute;left:16px;top:16px;padding:6px 10px;border-radius:5px;background:var(--ink);color:#fff;font-size:12px;font-weight:600;letter-spacing:1px}
  .dv-refurb-art figure:last-child figcaption{background:var(--accent)}
  .dv-refurb-copy{flex:1 1 420px;min-width:0}
  .dv-refurb-copy > p:not(.dv-eyebrow){margin:16px 0 24px;font-size:17px}
  .dv-points,.dv-checklist{display:grid;gap:14px}
  .dv-points li,.dv-checklist li{display:flex;gap:12px;align-items:flex-start;font-size:16px}
  .dv-points svg,.dv-checklist svg{flex:0 0 auto;margin-top:1px;color:var(--accent)}
  .dv-points b{color:var(--ink)}

  .dv-refurb-link{display:inline-block;margin-top:28px}

  .dv-lines{display:grid;gap:24px;margin:0;padding:0;list-style:none;counter-reset:line}
  .dv-lines > li{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border:1px solid var(--line);border-radius:var(--r-lg);overflow:hidden;counter-increment:line}
  .dv-lines > li:nth-child(even) > img{order:2}
  .dv-lines > li > img{width:100%;height:100%;min-height:340px;object-fit:cover}
  .dv-line-body{align-self:center;padding:40px}
  .dv-line-eyebrow{margin:0 0 10px;font-size:13px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--accent)}
  .dv-line-eyebrow::before{content:counter(line,decimal-leading-zero) " · "}
  .dv-line-body h3{margin:0 0 12px;font-size:30px;line-height:1.15;color:var(--ink)}
  .dv-line-body > p:not(.dv-line-eyebrow){margin-bottom:22px;font-size:16px}
  .dv-tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px}
  .dv-tags li{padding:6px 12px;border-radius:var(--r-pill);background:var(--chip);color:var(--rust-ink);font-size:13px}

  .dv-finish-lede{margin-top:12px;font-size:16px}
  .dv-finishes{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:16px}
  .dv-finishes img{width:100%;height:auto;aspect-ratio:1;border-radius:12px;margin-bottom:12px;object-fit:cover}
  .dv-finishes b{display:block;font-weight:600;color:var(--ink)}
  .dv-finishes span,.dv-finish-note{font-size:14px;color:var(--muted)}
  .dv-finish-note{margin-top:20px;font-size:13px}

  .dv-process{display:flex;flex-wrap:wrap;gap:56px}
  .dv-process-copy{flex:1 1 360px;min-width:0}
  .dv-process-copy > p:not(.dv-eyebrow){margin-top:16px;font-size:17px}
  .dv-stages{flex:1 1 560px;min-width:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:16px;margin:0;padding:0;list-style:none;counter-reset:stage}
  .dv-stages li{padding:26px;border-radius:var(--r-md);background:var(--tint);counter-increment:stage}
  .dv-stage{margin-bottom:8px;font-family:var(--font-display);font-size:15px;font-weight:600;color:var(--accent)}
  .dv-stage::before{content:counter(stage,decimal-leading-zero) " · "}
  .dv-stages h3{margin:0 0 6px;font-size:19px;color:var(--ink)}
  .dv-stages p:last-child{font-size:15px}

  .dv-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(230px,100%),1fr));gap:32px;margin:0;padding:0;list-style:none;counter-reset:step}
  .dv-steps li{padding-top:20px;border-top:2px solid #33475f;counter-increment:step}
  .dv-steps li:first-child{border-top-color:var(--accent-light)}
  .dv-steps li::before{content:counter(step,decimal-leading-zero);display:block;margin-bottom:10px;font-family:var(--font-display);font-size:15px;font-weight:600;color:var(--accent-light)}
  .dv-steps h3{margin:0 0 8px;font-size:20px}
  .dv-steps p{font-size:15px}

  .dv-quote{display:flex;flex-wrap:wrap;gap:56px;align-items:center}
  .dv-quote-copy{flex:1 1 380px;min-width:0}
  .dv-quote-copy > p:not(.dv-eyebrow){margin:16px 0 0;font-size:17px}
  .dv-quote-card{flex:1 1 440px;min-width:0;padding:32px;background:#fff;color:var(--ink-2);border:1px solid var(--tint-line);border-radius:16px}
  .dv-quote-card h3{margin:0 0 16px;font-size:19px;color:var(--ink)}
  .dv-quote-call{display:block;margin-top:24px;padding-top:24px;border-top:1px solid var(--line)}
  .dv-quote-call small{display:block;font-size:14px;color:var(--muted)}
  .dv-quote-phone{display:inline-block;margin:2px 0;font-family:var(--font-display);font-size:26px;font-weight:700;color:var(--ink)}
  .dv-quote-phone:hover{color:var(--accent)}
  .dv-quote-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:20px}
  .dv-section--dark :focus-visible,.dv-range-help:focus-visible{outline-color:#fff}
  .dv-quote-card :focus-visible{outline-color:var(--violet)}

  @media (max-width:900px){
    .dv-lines > li{grid-template-columns:1fr}
    .dv-lines > li:nth-child(even) > img{order:0}
    .dv-lines > li > img{height:auto;min-height:0;aspect-ratio:640/440}
    .dv-finishes{grid-template-columns:repeat(3,minmax(0,1fr))}
  }

  @media (max-width:640px){
    .dv-section{padding:56px 0}
    .dv-hero-inner{padding:44px 0 52px;gap:32px}
    .dv-hero-lede{font-size:16px}
    .dv-hero-actions .dv-btn,.dv-quote-actions .dv-btn{flex:1 1 auto}
    .dv-hero-art{flex-basis:100%;height:280px}
    .dv-hero-mosaic{flex-basis:100%;grid-template-rows:repeat(2,150px)}
    .dv-hero-mosaic figcaption{left:10px;bottom:10px}
    .dv-line-body{padding:24px}
    .dv-line-body h3{font-size:24px}
    .dv-finishes{gap:12px}
    .dv-finishes b{font-size:15px;line-height:1.25}
    .dv-finishes span{font-size:13px}
    .dv-process{gap:32px}
    .dv-process-copy,.dv-stages{flex-basis:100%}
    .dv-head,.dv-head--split{margin-bottom:28px}
    .dv-range{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
    .dv-range-body{padding:12px}
    .dv-range-name{font-size:16px;line-height:1.25}
    .dv-range-help{padding:16px}
    .dv-range-help b{font-size:17px;line-height:1.25}
    .dv-refurb,.dv-quote{gap:32px}
    .dv-refurb-art{flex-basis:100%;gap:10px}
    .dv-refurb-art figcaption{left:10px;top:10px}
    .dv-refurb-copy,.dv-quote-copy,.dv-quote-card{flex-basis:100%}
    .dv-quote-card{padding:24px}
  }
`;

export function DivisionStyles() {
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
