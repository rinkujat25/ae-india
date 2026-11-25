const styles = `
  .about-hero{padding:72px 0 46px}
  .about-hero-grid{display:grid;grid-template-columns:1fr .86fr;gap:48px;align-items:center}
  .about-eyebrow{display:inline-flex;align-items:center;gap:8px;background:var(--violet-tint);color:var(--violet-ink);border:1px solid #ded5ff;border-radius:var(--r-pill);padding:9px 14px;font-size:var(--t-xs);font-weight:800;text-transform:uppercase;letter-spacing:.7px}
  .about-hero h1{font-size:var(--t-4xl);line-height:1.04;margin:20px 0;max-width:15ch;text-wrap:balance}
  .about-hero p{font-size:var(--t-lg);line-height:1.7;color:var(--muted);max-width:58ch}
  .about-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
  .about-panel{background:linear-gradient(150deg,#f0e8ff,#fff6dc 62%,#ffe8dc);border-radius:var(--r-lg);padding:18px;box-shadow:var(--shadow)}
  .about-card{background:rgba(255,255,255,.94);border:1px solid rgba(255,255,255,.9);border-radius:var(--r-md);padding:24px}
  .about-card h2{font-size:var(--t-2xl);line-height:1.15;margin-bottom:16px}
  .about-stat-grid{display:grid;gap:12px}
  .about-stat{border:1px solid var(--line-2);border-radius:var(--r-sm);padding:16px;background:#fff}
  .about-stat b{display:block;font-size:var(--t-xl);line-height:1.1}
  .about-stat span{display:block;color:var(--muted);font-size:var(--t-sm);line-height:1.5;margin-top:6px}
  .about-section{padding:76px 0}
  .about-section.alt{background:var(--cream)}
  .about-head{display:grid;grid-template-columns:1fr .7fr;gap:36px;align-items:end;margin-bottom:36px}
  .about-kicker{font-size:var(--t-xs);text-transform:uppercase;letter-spacing:1.5px;color:var(--violet);font-weight:800}
  .about-head h2{font-size:var(--t-3xl);line-height:1.08;margin-top:12px;max-width:20ch;text-wrap:balance}
  .about-head p{color:var(--muted);line-height:1.7;font-size:16px}
  .about-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap)}
  .about-tile{background:var(--card);border:1px solid var(--line);border-radius:var(--r-md);padding:var(--pad-card);display:flex;flex-direction:column;min-height:238px}
  .about-tile h3{font-size:var(--t-xl);line-height:1.2;margin-bottom:10px}
  .about-tile p{color:var(--muted);font-size:var(--t-sm);line-height:1.65}
  .about-split{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap)}
  .about-split-card{background:var(--card);border:1px solid var(--line);border-radius:var(--r-lg);padding:34px}
  .about-split-card.dark{background:var(--ink);border-color:var(--ink);color:#fff}
  .about-split-card h3{font-size:var(--t-2xl);line-height:1.15;margin-bottom:14px}
  .about-split-card p{color:var(--muted);line-height:1.7;margin-bottom:22px}
  .about-split-card.dark p{color:#cfc7d8}
  .about-split-card ul{display:grid;gap:12px}
  .about-split-card li{display:grid;grid-template-columns:18px 1fr;gap:10px;color:var(--ink-2);font-size:var(--t-sm);line-height:1.6}
  .about-split-card.dark li{color:#e4dfea}
  .about-split-card li:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--violet);margin-top:8px}
  .about-split-card.dark li:before{background:#b7a8ff}
  .about-proof{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--gap)}
  .about-proof-card{background:var(--card);border:1px solid var(--line);border-radius:var(--r-md);padding:24px;min-height:190px}
  .about-proof-card b{display:block;font-size:var(--t-xl);line-height:1.2;margin-bottom:10px}
  .about-proof-card span{display:block;color:var(--muted);font-size:var(--t-sm);line-height:1.6}
  .about-cta{padding:0 0 84px}
  .about-cta-panel{background:var(--ink);border-radius:var(--r-lg);color:#fff;padding:44px;display:grid;grid-template-columns:1fr auto;gap:28px;align-items:center}
  .about-cta-panel h2{font-size:var(--t-3xl);line-height:1.1;margin-bottom:12px}
  .about-cta-panel p{color:#d7dee8;line-height:1.7;max-width:58ch}
  .about-cta-actions{display:flex;gap:12px;flex-wrap:wrap}
  .about-cta-actions .btn-primary{background:#fff;color:var(--ink)}
  .about-cta-actions .btn-soft{background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.24)}
  @media (max-width:1080px){
    .about-grid{grid-template-columns:repeat(2,1fr)}
    .about-proof{grid-template-columns:repeat(2,1fr)}
  }
  @media (max-width:980px){
    .about-hero{padding:52px 0 32px}
    .about-hero-grid,.about-head,.about-split,.about-cta-panel{grid-template-columns:1fr}
    .about-cta-panel{padding:36px}
  }
  @media (max-width:640px){
    .about-hero h1{font-size:36px;max-width:none}
    .about-hero p{font-size:16px}
    .about-actions .btn,.about-cta-actions .btn{width:100%}
    .about-section{padding:56px 0}
    .about-card,.about-tile,.about-proof-card{padding:22px}
    .about-grid,.about-proof{grid-template-columns:1fr}
    .about-split-card{padding:26px;border-radius:var(--r-md)}
    .about-cta{padding-bottom:56px}
    .about-cta-panel{padding:28px;border-radius:var(--r-md)}
  }

  /* faq */
  .faq-wrap{padding:78px 0;border-top:1px solid var(--line)}
  .faq-head{margin-bottom:34px}
  .faq-head h2{font-size:var(--t-2xl);line-height:1.15;margin-top:10px}
  .faq-head p{color:var(--muted);font-size:var(--t-sm);line-height:1.65;margin-top:8px;max-width:56ch}
  .faq-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px 24px;align-items:start}
  .faq{border:1px solid var(--line);border-radius:var(--r-md);background:var(--card);overflow:hidden}
  .faq summary{list-style:none;cursor:pointer;padding:20px 22px;font-weight:700;font-size:var(--t-md);line-height:1.5;display:grid;grid-template-columns:1fr 20px;gap:14px;align-items:start}
  .faq summary::-webkit-details-marker{display:none}
  .faq summary:hover{color:var(--violet)}
  .faq-plus{width:20px;height:20px;color:var(--violet);margin-top:2px;transition:transform .2s ease;flex:0 0 auto}
  .faq[open] .faq-plus{transform:rotate(45deg)}
  .faq p{padding:0 22px 22px;color:var(--muted);font-size:var(--t-sm);line-height:1.7}
  @media (max-width:860px){ .faq-grid{grid-template-columns:1fr} }
`;

export function AboutUsStyles() {
  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
