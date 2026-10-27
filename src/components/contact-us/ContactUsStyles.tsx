const styles = `
  .contact-html-hero{
    padding:64px 0 40px;
  }

  .contact-html-hero h1{
    font-size:var(--t-3xl);
    line-height:1.08;
    margin:12px 0 16px;
    max-width:17ch;
  }

  .contact-html-hero p{
    color:var(--muted);
    font-size:16px;
    line-height:1.7;
    max-width:56ch;
  }

  .reach{
    display:grid;
    gap:var(--gap);
    grid-template-columns:repeat(2, 1fr);
    margin-top:34px;
  }

  .tile{
    background:var(--card);
    border:1px solid var(--line);
    border-radius:var(--r-md);
    box-shadow:var(--shadow-sm);
    display:flex;
    flex-direction:column;
    padding:24px;
    transition:border-color .18s ease, box-shadow .18s ease, transform .18s ease;
  }

  a.tile:hover{
    border-color:#ded5ff;
    box-shadow:0 16px 38px rgba(31, 29, 28, .10);
    transform:translateY(-2px);
  }

  .tile-ico{
    background:var(--violet-tint);
    border-radius:12px;
    color:var(--violet-ink);
    display:grid;
    height:40px;
    margin-bottom:16px;
    place-items:center;
    width:40px;
  }

  .tile-ico svg{
    height:20px;
    width:20px;
  }

  .tile h2{
    color:var(--muted-2);
    font-size:11px;
    letter-spacing:.7px;
    text-transform:uppercase;
  }

  .tile b{
    display:block;
    font-size:var(--t-lg);
    margin:8px 0 6px;
    word-break:break-word;
  }

  .tile span:not(.tile-ico){
    color:var(--muted);
    font-size:var(--t-sm);
    line-height:1.6;
  }

  .contact-detail{
    align-items:start;
    display:grid;
    gap:var(--gap);
    grid-template-columns:repeat(3, 1fr);
    padding:20px 0 76px;
  }

  .box{
    background:var(--card);
    border:1px solid var(--line);
    border-radius:var(--r-md);
    padding:24px;
  }

  .box h2{
    font-size:var(--t-lg);
    margin-bottom:12px;
  }

  .box p{
    color:var(--muted);
    font-size:var(--t-sm);
    line-height:1.7;
  }

  .routes li{
    align-items:flex-start;
    border-bottom:1px solid var(--line-2);
    color:var(--ink-2);
    display:flex;
    font-size:var(--t-sm);
    gap:11px;
    line-height:1.6;
    padding:11px 0;
  }

  .routes li:last-child{
    border-bottom:0;
    padding-bottom:0;
  }

  .routes li:first-child{
    padding-top:0;
  }

  .routes svg{
    color:var(--mint-ink);
    flex:0 0 auto;
    height:17px;
    margin-top:2px;
    width:17px;
  }

  .routes b{
    display:block;
    font-weight:800;
  }

  .routes small{
    color:var(--muted);
    display:block;
    font-size:var(--t-xs);
    font-weight:500;
  }

  .legal{
    background:var(--cream);
    border-color:#e4dccd;
  }

  .legal dl{
    display:grid;
    gap:10px;
    margin:0;
  }

  .legal .row{
    border-bottom:1px solid rgba(0, 0, 0, .06);
    display:flex;
    font-size:var(--t-sm);
    gap:14px;
    justify-content:space-between;
    padding-bottom:10px;
  }

  .legal .row:last-child{
    border-bottom:0;
    padding-bottom:0;
  }

  .legal dt{
    color:var(--muted);
    font-weight:600;
  }

  .legal dd{
    font-weight:800;
    margin:0;
    text-align:right;
  }

  .sla{
    background:var(--ink);
    border-color:var(--ink);
    color:#fff;
  }

  .sla h2{
    color:#fff;
  }

  .sla p{
    color:#c9c3d4;
  }

  .sla b{
    color:var(--violet-2);
  }

  @media (max-width:980px){
    .contact-html-hero{
      padding:44px 0 28px;
    }

    .reach,
    .contact-detail{
      grid-template-columns:1fr;
    }

    .contact-detail{
      gap:26px;
      padding-bottom:56px;
    }
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

export function ContactUsStyles() {
  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
