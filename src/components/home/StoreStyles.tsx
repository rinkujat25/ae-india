/**
 * The home page's own sheet.
 *
 * The home page is a small storefront -- an announcement line, a hero, a short
 * run of gifts, one editorial panel and three notes -- so its rules live here
 * rather than in `globals.css`, which still carries the long marketing-page
 * layout the other routes use.
 */
const styles = `

  .store-announce{
    background:var(--cream);
    border-bottom:1px solid var(--line);
    color:var(--ink-2);
    font-size:var(--t-sm);
  }

  .store-announce .wrap{
    align-items:center;
    display:flex;
    gap:16px;
    justify-content:center;
    padding:10px 0;
    position:relative;
  }

  .store-announce b{font-weight:600}

  .store-announce .announce-tag{
    color:var(--muted);
    font-size:var(--t-xs);
    font-weight:600;
    letter-spacing:.14em;
    position:absolute;
    right:0;
    text-transform:uppercase;
  }

  .store-eyebrow{
    align-items:center;
    color:var(--muted);
    display:flex;
    font-size:var(--t-xs);
    font-weight:700;
    gap:8px;
    letter-spacing:.14em;
    margin:0 0 18px;
    text-transform:uppercase;
  }

  .store-eyebrow .star{color:var(--violet);font-size:14px}

  /* Hero */
  .store-hero{
    align-items:center;
    display:grid;
    gap:56px;
    grid-template-columns:1fr 1.05fr;
    padding:72px 0 64px;
  }

  .store-hero h1{
    font-size:var(--t-4xl);
    font-weight:800;
    letter-spacing:-.03em;
    line-height:1.04;
    margin:0 0 20px;
  }

  .store-hero h1 em{color:var(--violet);font-style:normal}

  .store-hero .hero-copy>p{
    color:var(--muted);
    font-size:var(--t-lg);
    line-height:1.6;
    margin:0 0 28px;
    max-width:44ch;
  }

  .store-cta{
    align-items:center;
    background:var(--ink);
    border-radius:var(--r-pill);
    color:#fff;
    display:inline-flex;
    font-size:var(--t-md);
    font-weight:700;
    gap:10px;
    padding:14px 26px;
    text-decoration:none;
    transition:background .18s ease;
  }

  .store-cta:hover{background:var(--violet)}

  .hero-footnote{
    align-items:center;
    color:var(--muted);
    display:flex;
    font-size:var(--t-sm);
    gap:12px;
    margin-top:26px;
  }

  .hero-footnote .mini-line{background:var(--line);height:1px;width:34px}

  .hero-art{
    background:linear-gradient(150deg, var(--violet-tint), var(--cream));
    border:1px solid var(--line);
    border-radius:var(--r-lg);
    min-height:380px;
    /* Room at the foot for the floating product chip. */
    padding:28px 28px 132px;
    position:relative;
  }

  .hero-art .art-note{
    color:var(--muted);
    font-size:var(--t-xs);
    font-weight:700;
    letter-spacing:.14em;
    line-height:1.5;
    text-transform:uppercase;
  }

  .hero-art>img{
    display:block;
    height:200px;
    margin:14px auto 0;
    mix-blend-mode:multiply;
    object-fit:contain;
    width:auto;
    max-width:70%;
  }

  .hero-product{
    align-items:center;
    background:#fff;
    border:1px solid var(--line);
    border-radius:var(--r-md);
    bottom:22px;
    box-shadow:var(--shadow-sm);
    display:flex;
    gap:16px;
    justify-content:space-between;
    left:28px;
    padding:14px 18px;
    position:absolute;
    right:28px;
    text-decoration:none;
  }

  .hero-product-copy{display:block;min-width:0}

  .hero-product .label{
    color:var(--muted);
    display:block;
    font-size:var(--t-xs);
    font-weight:700;
    letter-spacing:.12em;
    text-transform:uppercase;
  }

  /* Catalogue names run long, so the chip shows two lines and stops. */
  .hero-product strong{
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    font-size:var(--t-md);
    line-height:1.35;
    margin-top:5px;
    overflow:hidden;
  }

  .hero-product .go{color:var(--violet);flex:none;font-size:18px}

  /* Products */
  .store-section{padding:16px 0 64px}

  .store-section-head{
    align-items:end;
    border-top:1px solid var(--line);
    display:flex;
    gap:24px;
    justify-content:space-between;
    padding-top:34px;
  }

  .store-section-head h2{
    font-size:var(--t-3xl);
    font-weight:800;
    letter-spacing:-.02em;
    margin:0;
  }

  .store-section-head>p{color:var(--muted);font-size:var(--t-md);margin:0}

  .store-grid{
    display:grid;
    gap:22px;
    grid-template-columns:repeat(3, 1fr);
    margin-top:30px;
  }

  .store-foot{
    align-items:center;
    display:flex;
    gap:18px;
    justify-content:space-between;
    margin-top:28px;
  }

  .store-foot p{color:var(--muted);font-size:var(--t-sm);margin:0}

  .store-link{
    align-items:center;
    color:var(--violet);
    display:inline-flex;
    font-weight:700;
    gap:8px;
    text-decoration:none;
  }

  .store-link:hover{text-decoration:underline}

  /* Editorial panel */
  .store-edit{
    align-items:center;
    background:var(--cream);
    border:1px solid var(--line);
    border-radius:var(--r-lg);
    display:grid;
    gap:32px;
    grid-template-columns:auto 1fr 1.1fr auto;
    margin-bottom:56px;
    padding:38px 40px;
  }

  .store-edit .edit-symbol{color:var(--violet-2);font-size:40px;line-height:1}
  .store-edit h2{font-size:var(--t-2xl);font-weight:800;letter-spacing:-.02em;margin:0}
  .store-edit p{color:var(--muted);line-height:1.65;margin:0}

  /* Notes */
  .store-notes{
    border-top:1px solid var(--line);
    display:grid;
    gap:28px;
    grid-template-columns:repeat(3, 1fr);
    padding:34px 0 64px;
  }

  .store-notes article{display:flex;gap:14px}
  .store-notes .icon{color:var(--violet);flex:none;height:22px;width:22px}
  .store-notes h3{font-size:var(--t-md);font-weight:700;margin:0 0 4px}
  .store-notes p{color:var(--muted);font-size:var(--t-sm);line-height:1.55;margin:0}

  @media (max-width: 980px){
    .store-hero{gap:36px;grid-template-columns:1fr;padding:48px 0 44px}
    .store-grid{grid-template-columns:repeat(2, 1fr)}
    .store-edit{grid-template-columns:1fr;gap:20px;padding:30px}
    .store-notes{grid-template-columns:1fr;gap:22px}
  }

  @media (max-width: 620px){
    .store-announce .announce-tag{display:none}
    .store-grid{grid-template-columns:1fr}
    .store-section-head{align-items:start;flex-direction:column;gap:12px}
    .store-foot{align-items:start;flex-direction:column;gap:12px}
  }
`;

export function StoreStyles() {
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
