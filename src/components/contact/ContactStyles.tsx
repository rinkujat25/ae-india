/** The contact page's own sheet. There is no contact design; it follows the About page's. */
const styles = `
  .ct{color:var(--ink-2)}
  .ct-eyebrow{margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:var(--violet)}
  .ct-eyebrow--light{color:#9dc1f0}
  .ct h2{font-size:var(--t-3xl);line-height:1.12;letter-spacing:-.5px;color:var(--ink)}
  .ct-section{padding:88px 0}
  .ct-section--grey{background:var(--cream)}
  .ct-head{max-width:640px;margin-bottom:40px}

  .ct-hero{background:var(--violet);color:#c9d4e3}
  .ct-hero-inner{display:flex;flex-wrap:wrap;align-items:center;gap:56px;padding:80px 0}
  .ct-hero-copy{flex:1 1 460px;min-width:0}
  .ct-hero h1{margin:0 0 20px;font-size:clamp(36px,4.8vw,60px);line-height:1.05;letter-spacing:-1px;color:#fff;max-width:none}
  .ct-hero-copy > p:last-child{max-width:520px;font-size:18px}
  .ct-reach{flex:1 1 400px;min-width:0;display:grid;gap:20px;padding:36px;border-radius:var(--r-lg);background:#fff;color:var(--ink-2)}
  .ct-reach > div + div{padding-top:20px;border-top:1px solid var(--line)}
  .ct-reach small{display:block;font-size:14px;color:var(--muted)}
  .ct-reach p{margin:4px 0 8px;font-size:16px;color:var(--ink)}
  .ct-reach a{font-weight:600;color:var(--violet);overflow-wrap:anywhere}
  .ct-reach a:hover{text-decoration:underline}
  .ct-reach .ct-phone{display:inline-block;margin:2px 0;font-family:var(--font-display);font-size:30px;font-weight:700;color:var(--ink)}

  .ct-topics{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr));gap:20px}
  .ct-topics > li{display:flex;flex-direction:column;padding:28px;border:1px solid var(--line);border-radius:var(--r-md);background:#fff;scroll-margin-top:160px}
  .ct-topics h3{margin:0 0 8px;font-size:21px;line-height:1.25;color:var(--ink)}
  .ct-topics p{margin-bottom:18px;font-size:15px}
  .ct-topics ul{display:grid;gap:10px;margin-bottom:20px}
  .ct-topics ul li{display:flex;gap:10px;align-items:flex-start;font-size:15px}
  .ct-topics svg{flex:0 0 auto;width:20px;height:20px;margin-top:1px;fill:none;stroke:var(--teal);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  .ct-link{margin-top:auto;font-weight:600;color:var(--violet)}
  .ct-link:hover{text-decoration:underline}

  .ct-details{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr));gap:40px;align-items:start}
  .ct-details dl{margin:0;border:1px solid var(--line);border-radius:var(--r-md);background:#fff;overflow:hidden}
  .ct-details dl div{display:flex;gap:16px;padding:16px 22px;border-bottom:1px solid var(--line-soft)}
  .ct-details dl div:last-child{border-bottom:0}
  .ct-details dt{flex:0 0 140px;color:var(--muted)}
  .ct-details dd{margin:0;font-weight:500;color:var(--ink)}

  @media (max-width:640px){
    .ct-section{padding:56px 0}
    .ct-hero-inner{padding:44px 0 52px;gap:32px}
    .ct-hero-copy,.ct-reach{flex-basis:100%}
    .ct-reach{padding:24px}
    .ct-reach .ct-phone{font-size:26px}
    .ct-topics > li{padding:24px}
    .ct-details{gap:24px}
    .ct-details dl div{padding:14px 18px}
    .ct-details dt{flex-basis:110px}
  }
`;

export function ContactStyles() {
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
