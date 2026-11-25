/** The About page's own sheet, following the AE India "About Us" design. */
const styles = `
  .ab{color:var(--ink-2)}
  .ab-eyebrow{margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:var(--violet)}
  .ab-eyebrow--light{color:#9dc1f0}
  .ab h2{font-size:var(--t-3xl);line-height:1.12;letter-spacing:-.5px;color:var(--ink)}
  .ab-section{padding:88px 0;scroll-margin-top:136px}
  .ab-section--grey{background:var(--cream)}
  .ab-head{max-width:640px;margin-bottom:40px}
  .ab-head p:last-child:not(.ab-eyebrow){margin-top:12px;font-size:17px}

  .ab-hero{background:var(--violet);color:#c9d4e3;padding-top:88px}
  .ab-hero h1{max-width:900px;margin:0 0 22px;font-size:clamp(36px,5vw,64px);line-height:1.05;letter-spacing:-1px;color:#fff}
  .ab-lede{max-width:680px;margin:0 0 40px;font-size:19px}
  .ab-skyline{width:100%;height:260px;min-height:0;object-fit:cover;object-position:center bottom;border-radius:16px 16px 0 0}
  .ab-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));margin:0;background:#fff;border-bottom:1px solid var(--line)}
  .ab-stats div{display:flex;flex-direction:column-reverse;justify-content:flex-end;padding:32px 32px 28px;border-right:1px solid var(--line)}
  .ab-stats div:last-child{border-right:0}
  .ab-stats dd{margin:0;font-family:var(--font-display);font-size:clamp(30px,3.6vw,48px);font-weight:700;line-height:1;color:var(--ink)}
  .ab-stats dt{margin-top:8px;font-size:15px;color:var(--muted)}

  .ab-who{display:flex;flex-wrap:wrap;align-items:center;gap:56px}
  .ab-who-copy{flex:1 1 480px;min-width:0}
  .ab-who-copy > p:not(.ab-eyebrow){margin-top:16px;font-size:17px}
  .ab-who-copy b{color:var(--ink)}
  .ab-who-art{flex:1 1 440px;min-width:0;width:100%;height:auto;border:1px solid #d4dde8;border-radius:16px}

  .ab-divisions{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr));gap:20px}
  .ab-division{--tone:var(--teal);display:block;padding:36px;background:#fff;border:1px solid var(--line);border-top:4px solid var(--tone);border-radius:var(--r-md);transition:border-color .15s ease}
  .ab-division--architectural{--tone:var(--rust)}
  .ab-division:hover{border-color:var(--tone)}
  .ab-division-eyebrow{margin:0 0 10px;font-size:13px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--tone)}
  .ab-division h3{margin:0 0 12px;font-size:28px;line-height:1.2;color:var(--ink)}
  .ab-division > p:not(.ab-division-eyebrow){margin-bottom:20px;font-size:16px}
  .ab-division span{font-weight:600;color:var(--tone)}

  .ab-sectors{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px}
  .ab-sectors li{padding:22px;border:1px solid var(--line);border-radius:12px;font-family:var(--font-display);font-weight:600;font-size:17px;line-height:1.35;color:var(--ink)}

  .ab-client-groups{display:grid;gap:36px}
  .ab-client-groups h3{margin:0 0 14px;font-family:var(--font-body);font-size:13px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--muted)}
  .ab-client-groups ul{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}
  .ab-client-groups li{display:flex;align-items:center;justify-content:center;gap:12px;min-height:92px;padding:10px 16px;background:#fff;border:1px solid var(--line);border-radius:12px;text-align:center;font-family:var(--font-display);font-weight:600;font-size:18px;line-height:1.2;letter-spacing:-.2px;color:var(--ink-2)}
  .ab-client-groups img{flex:none;width:34px;height:34px;object-fit:contain}
  .ab-note{margin-top:24px;font-size:13px;color:var(--muted)}

  .ab-reasons{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:32px}
  .ab-reasons > div{padding-top:20px;border-top:2px solid var(--violet)}
  .ab-reasons h3{margin:0 0 8px;font-size:20px;line-height:1.3;color:var(--ink)}
  .ab-reasons p{font-size:15px}

  .ab-dealers-section{padding-bottom:88px}
  .ab-dealers{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:32px;padding:56px;border-radius:20px;background:var(--ink);color:#c5cfdb}
  .ab-dealers > div{flex:1 1 520px;min-width:0}
  .ab-dealers h2{margin:0 0 12px;font-size:clamp(26px,3vw,36px);color:#fff}
  .ab-dealers p:last-child{font-size:17px}
  .ab-dealers a{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 28px;border-radius:var(--r-sm);background:#fff;color:var(--ink);font-weight:600}
  .ab-dealers a:hover{background:var(--cream)}
  .ab-dealers a:focus-visible{outline-color:#fff}

  .ab-contact{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));gap:32px;padding:72px 0}
  .ab-contact h2{margin:0 0 8px;font-size:32px}
  .ab-contact small{display:block;margin-bottom:6px;font-size:14px;color:var(--muted)}
  .ab-contact a{font-family:var(--font-display);font-size:24px;font-weight:700;color:var(--ink)}
  .ab-contact a:hover{color:var(--violet)}
  .ab-address{color:var(--ink)}

  @media (max-width:900px){
    .ab-stats{grid-template-columns:repeat(2,minmax(0,1fr))}
    .ab-stats div:nth-child(2n){border-right:0}
    .ab-stats div:nth-child(-n+2){border-bottom:1px solid var(--line)}
  }
  @media (max-width:640px){
    .ab-section{padding:56px 0}
    .ab-hero{padding-top:48px}
    .ab-lede{font-size:17px}
    .ab-skyline{height:160px}
    .ab-stats div{padding:20px 16px}
    .ab-stats dt{font-size:14px}
    .ab-who{gap:32px}
    .ab-who-copy,.ab-who-art{flex-basis:100%}
    .ab-division{padding:24px}
    .ab-division h3{font-size:24px}
    .ab-sectors,.ab-client-groups ul{grid-template-columns:repeat(2,minmax(0,1fr))}
    .ab-sectors li{padding:16px;font-size:15px}
    .ab-client-groups li{min-height:76px;font-size:16px;padding:10px}
    .ab-client-groups img{width:26px;height:26px}
    .ab-dealers-section{padding-bottom:56px}
    .ab-dealers{padding:32px 24px}
    .ab-dealers a{flex:1 1 auto}
    .ab-contact{padding:48px 0}
  }
`;

export function AboutStyles() {
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
