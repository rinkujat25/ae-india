/**
 * The home page's own sheet, following the AE India "Home" design: a dark
 * hero, a client strip, the two divisions, categories, products, industries,
 * the reasons grid and two closing bands.
 *
 * Colours are the tokens from `globals.css`; the handful of literal values are
 * the design's own tints for the two divisions and the dark-band lines.
 */
const styles = `
  .home-eyebrow{margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:var(--violet)}
  .home-eyebrow--dark{color:#9dc1f0}
  .home-eyebrow--teal{color:#bfeae3}

  .home-head{max-width:640px;margin-bottom:40px}
  .home-head--split{max-width:none;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:16px;margin-bottom:36px}
  .home-head h2,.home-reasons-intro h2{font-size:var(--t-3xl);line-height:1.12;letter-spacing:-.5px;color:var(--ink)}
  .home-link{font-weight:600;font-size:var(--t-md);color:var(--violet)}
  .home-link:hover{color:var(--ink);text-decoration:underline}

  .home-btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 26px;border-radius:var(--r-sm);font-weight:600;font-size:var(--t-md);transition:background-color .15s ease,border-color .15s ease}
  .home-btn--white{background:#fff;color:var(--ink)}
  .home-btn--white:hover{background:var(--cream)}
  .home-btn--outline{border:1px solid #3a4c66;color:#fff}
  .home-btn--outline:hover{border-color:#fff}

  /* Striped placeholders, as the design draws them, where no photo exists yet. */
  .home-placeholder{display:block;background:repeating-linear-gradient(135deg,#e9edf1 0 12px,#f1f4f7 12px 24px)}
  .home-placeholder--dark{background:repeating-linear-gradient(135deg,#1b2b44 0 12px,#21334f 12px 24px)}

  .home-section{padding:88px 0}
  .home-section--grey{background:var(--cream)}
  .home-section--dark{background:var(--ink);color:#c5cfdb}
  .home-section--dark .home-head h2{color:#fff}

  /* ---- hero ---- */
  .home-hero{background:var(--ink);color:#c5cfdb}
  .home-hero-inner{display:flex;flex-wrap:wrap;align-items:center;gap:48px;padding:72px 0 80px}
  .home-hero-copy,.home-hero-art{flex:1 1 480px;min-width:0}
  .home-hero h1{margin:0 0 20px;font-size:clamp(38px,5vw,64px);line-height:1.04;letter-spacing:-1px;color:#fff}
  .home-hero-lede{margin:0 0 32px;font-size:18px;max-width:520px}
  .home-hero-actions{display:flex;flex-wrap:wrap;gap:12px}
  .home-stats{display:flex;flex-wrap:wrap;gap:12px 36px;margin:44px 0 0;padding-top:28px;border-top:1px solid #263852}
  .home-stats div{display:flex;flex-direction:column-reverse}
  .home-stats dd{margin:0;font-family:var(--font-display);font-size:30px;font-weight:700;color:#fff;line-height:1.2}
  .home-stats dt{font-size:14px}
  .home-hero-art{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
  .home-scene{position:relative;margin:0;height:200px;border-radius:var(--r-md);overflow:hidden}
  .home-scene--wide{grid-column:1/-1;height:250px}
  .home-scene img{width:100%;height:100%;min-height:0;object-fit:cover}
  .home-scene figcaption{position:absolute;left:16px;bottom:16px;padding:6px 11px;border-radius:6px;background:rgba(15,27,45,.78);color:#fff;font-size:12px;font-weight:600}
  .home-scene--wide figcaption{font-size:13px}

  /* ---- clients ---- */
  .home-clients{border-bottom:1px solid var(--line)}
  .home-clients-inner{display:flex;flex-wrap:wrap;align-items:center;gap:14px 34px;padding:26px 0}
  .home-clients-title{font-size:14px;font-weight:600;color:var(--ink)}
  .home-clients ul{display:flex;flex-wrap:wrap;align-items:center;gap:14px 34px}
  .home-clients li{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-display);font-weight:600;font-size:16px;color:var(--muted)}
  .home-clients img{width:22px;height:22px;object-fit:contain}

  /* ---- solutions ---- */
  .home-solutions{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr));gap:20px}
  .home-solution{border-radius:var(--r-lg);overflow:hidden;border:1px solid}
  .home-solution--facility{background:#f2f7f6;border-color:#dde9e7}
  .home-solution--architectural{background:#f7f3ef;border-color:#eadfd5}
  .home-solution-media{width:100%;height:auto;aspect-ratio:1200/520;object-fit:cover}
  .home-solution-body{padding:32px}
  .home-solution-eyebrow{margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase}
  .home-solution--facility .home-solution-eyebrow{color:var(--teal)}
  .home-solution--architectural .home-solution-eyebrow{color:var(--rust)}
  .home-solution h3{margin:0 0 10px;font-size:28px;color:var(--ink)}
  .home-solution-body > p:last-child{font-size:16px;color:var(--ink-2)}

  /* ---- categories ---- */
  .home-categories{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px}
  .home-category{display:block;height:100%;padding:14px;background:#fff;border:1px solid var(--line);border-radius:var(--r-md);transition:border-color .15s ease}
  .home-category:hover{border-color:var(--violet)}
  .home-category-media{display:block;width:100%;height:auto;aspect-ratio:6/5;border-radius:10px;margin-bottom:12px;object-fit:cover}
  .home-category-name{display:block;font-family:var(--font-display);font-weight:600;font-size:16px;line-height:1.3;color:var(--ink)}

  /* ---- products ---- */
  .home-products{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}

  /* ---- industries ---- */
  .home-industries{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px}
  .home-industries li{border:1px solid #263852;border-radius:var(--r-md);overflow:hidden}
  .home-industry-media{height:130px}
  .home-industry-name{display:block;padding:16px;font-family:var(--font-display);font-weight:600;font-size:17px;color:#fff}

  /* ---- reasons ---- */
  .home-reasons{display:flex;flex-wrap:wrap;gap:56px}
  .home-reasons-intro{flex:1 1 360px;min-width:0}
  .home-reasons-intro h2{margin-bottom:16px}
  .home-reasons-intro p:not(.home-eyebrow){margin-bottom:24px;font-size:17px}
  .home-reasons-grid{flex:1 1 560px;min-width:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:28px 32px}
  .home-reason{border-top:2px solid var(--violet);padding-top:16px}
  .home-reason h3{margin:0 0 6px;font-size:19px;color:var(--ink)}
  .home-reason p{font-size:var(--t-md)}

  /* ---- callouts ---- */
  .home-callouts-section{padding:0 0 88px}
  .home-callouts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr));gap:20px}
  .home-callout{border-radius:var(--r-lg);padding:44px}
  .home-callout--navy{background:var(--violet);color:#c9d4e3}
  .home-callout--teal{background:var(--teal);color:#d5ece8}
  .home-callout h2{margin:0 0 12px;font-size:30px;line-height:1.15;color:#fff}
  .home-callout > p:not(.home-eyebrow){margin-bottom:24px;font-size:16px}
  .home-callout a:not(.home-btn){color:#fff;font-weight:600;text-decoration:underline}
  .home-callout :focus-visible{outline-color:#fff}
  .home-hero :focus-visible{outline-color:#fff}

  @media (max-width:1080px){
    .home-products{grid-template-columns:repeat(2,minmax(0,1fr))}
  }

  @media (max-width:640px){
    .home-section{padding:56px 0}
    .home-hero-inner{padding:48px 0 56px;gap:36px}
    .home-hero-lede{font-size:16px}
    .home-hero-actions .home-btn{flex:1 1 auto}
    .home-scene{height:150px}
    .home-scene--wide{height:190px}
    .home-head,.home-head--split{margin-bottom:28px}
    .home-solution-media{aspect-ratio:3/2}
    .home-solution-body{padding:24px}
    .home-solution h3{font-size:24px}
    .home-categories{grid-template-columns:repeat(2,minmax(0,1fr))}
    .home-products{gap:12px}
    .home-reasons{gap:36px}
    .home-callouts-section{padding-bottom:56px}
    .home-callout{padding:28px}
    .home-callout h2{font-size:24px}
  }
`;

export function HomeStyles() {
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
