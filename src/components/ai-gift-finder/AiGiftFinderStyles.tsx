const styles = `
  :root{
    --ink:#191622; --ink-2:#39323f; --muted:#635d6e; --muted-2:#7a7385;
    --paper:#fffdf8; --cream:#f6f0e7; --card:#fff; --line:#e9e3da; --line-2:#f0ebe3;
    --violet:#5b3df5; --violet-2:#8a73ff; --violet-tint:#efeaff; --violet-ink:#4b2ee8;
    --mint:#dff7ec; --mint-ink:#1c7a4f; --amber:#fff0d0; --amber-ink:#8a6100;
    --peach:#ffe5da; --peach-ink:#a8482a; --yellow:#ffe7a8; --yellow-ink:#5c3b00;
    --violet-2:#8a73ff;
    --t-xs:12px; --t-sm:13px; --t-md:15px; --t-lg:17px;
    --r-pill:999px; --r-sm:14px; --r-md:20px; --r-lg:28px;
    --shadow:0 20px 54px rgba(47,34,70,.10); --shadow-sm:0 10px 30px rgba(38,28,17,.06);
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--paper);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Arial,sans-serif;font-size:var(--t-md);-webkit-font-smoothing:antialiased}
  a{color:inherit}
  img{display:block;max-width:100%}
  h1,h2,h3{letter-spacing:-.015em;font-weight:800;margin:0}
  p{margin:0}
  ul{margin:0;padding:0;list-style:none}
  .wrap{width:min(1120px,calc(100% - 40px));margin:auto}
  :focus-visible{outline:3px solid var(--violet);outline-offset:2px;border-radius:6px}
  .icon{width:100%;height:100%;stroke:currentColor;stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}

  /* nav */
  .nav{position:sticky;top:0;z-index:50;background:rgba(255,253,248,.92);backdrop-filter:blur(18px);border-bottom:1px solid rgba(233,227,218,.8)}
  .nav-inner{height:72px;display:flex;align-items:center;gap:26px}
  .logo{display:flex;align-items:center;width:196px;min-width:196px}
  .links{display:flex;gap:22px;font-size:var(--t-sm);color:#4f4958;margin-left:10px;white-space:nowrap}
  .links a{font-weight:700;padding:7px 0;border-bottom:2px solid transparent;transition:color .15s ease,border-color .15s ease}
  .links a:hover{color:var(--violet);border-bottom-color:var(--violet)}
  .links a[aria-current]{color:var(--ink);border-bottom-color:var(--ink)}
  .nav-ai{display:inline-flex;align-items:center;gap:7px}
  .soon-dot{font-size:9px;background:var(--yellow);color:var(--yellow-ink);border:1px solid #f2ce6d;border-radius:var(--r-pill);padding:3px 6px;font-weight:800;text-transform:uppercase;letter-spacing:.4px}
  .nav-actions{margin-left:auto;display:flex;gap:10px;align-items:center}

  /* footer */
  .footer{padding:52px 0 30px;border-top:1px solid var(--line)}
  .footer-grid{display:grid;grid-template-columns:1.3fr repeat(3,.7fr);gap:40px}
  .footer h2{font-size:var(--t-xs);text-transform:uppercase;letter-spacing:.9px;margin-bottom:16px}
  .footer a{display:block;color:var(--muted);font-size:var(--t-sm);margin:10px 0;transition:color .15s ease}
  .footer a:hover{color:var(--violet)}
  .footer .logo{margin-bottom:18px}
  .foot-copy{max-width:38ch;color:var(--muted);line-height:1.65;font-size:var(--t-sm)}
  .copyright{margin-top:44px;padding-top:22px;border-top:1px solid var(--line);font-size:var(--t-xs);color:#736c7d;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}

  .protobar{background:#241f33;color:#fff;font-size:var(--t-xs);padding:9px 0;font-weight:600}
  .protobar .wrap{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
  .protobar b{background:var(--yellow);color:var(--yellow-ink);border-radius:var(--r-pill);padding:3px 9px;font-size:10px;text-transform:uppercase;letter-spacing:.5px;font-weight:900}
  .protobar span{color:#b9b2c9}

  header.top{padding:34px 0 22px}
  header.top h1{font-size:clamp(26px,3.2vw,34px);line-height:1.1}
  header.top p{color:var(--muted);margin-top:10px;font-size:var(--t-md);line-height:1.65;max-width:62ch}

  /* ---------- ASK ---------- */
  .ask{background:var(--card);border:1px solid var(--line);border-radius:var(--r-lg);padding:24px;box-shadow:var(--shadow)}
  .lbl{font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.8px;color:var(--muted-2);margin-bottom:9px}
  textarea#q{width:100%;font-family:inherit;font-size:var(--t-lg);line-height:1.6;color:var(--ink);background:#fff;border:1.5px solid var(--line);border-radius:var(--r-sm);padding:16px;min-height:92px;resize:vertical}
  textarea#q:focus{outline:0;border-color:var(--violet);box-shadow:0 0 0 3px var(--violet-tint)}
  textarea#q::placeholder{color:#b0a89e}
  .assist{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px}
  .assist label{display:block}
  .assist select{width:100%;font-family:inherit;font-size:var(--t-sm);color:var(--ink);background:#fff;border:1.5px solid var(--line);border-radius:var(--r-sm);padding:11px 12px;min-height:44px}
  .assist select:focus{outline:0;border-color:var(--violet);box-shadow:0 0 0 3px var(--violet-tint)}
  .askfoot{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-top:18px}
  .btn{border:0;border-radius:var(--r-pill);padding:13px 22px;font-weight:800;font-size:14px;font-family:inherit;cursor:pointer;display:inline-flex;align-items:center;gap:8px;min-height:46px;transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease}
  .btn-primary{background:var(--ink);color:#fff}
  .btn-primary:hover{transform:translateY(-1px);box-shadow:0 12px 26px rgba(25,22,34,.22)}
  .btn-soft{background:#fff;border:1px solid var(--line);color:var(--ink-2)}
  .btn-soft:hover{border-color:#d5ccbe}
  .btn-mini{border:1px solid var(--line);background:#fff;color:var(--ink-2);border-radius:var(--r-pill);padding:7px 13px;font-size:11px;font-weight:800;font-family:inherit;cursor:pointer;min-height:34px}
  .btn-mini:hover{border-color:var(--violet);color:var(--violet-ink)}
  .askfoot small{color:var(--muted-2);font-size:11px;line-height:1.5}
  .seeds{display:flex;gap:8px;flex-wrap:wrap;margin-top:18px}
  .seed{text-align:left;font-family:inherit;cursor:pointer;background:var(--cream);border:1px solid var(--line);border-radius:var(--r-pill);padding:8px 13px;font-size:11px;font-weight:700;color:var(--ink-2)}
  .seed:hover{border-color:var(--violet);color:var(--violet-ink);background:#fff}

  /* ---------- PIPELINE ---------- */
  .pipe{margin-top:22px;background:var(--ink);color:#fff;border-radius:var(--r-md);padding:18px 22px;display:none}
  .pipe.on{display:block}
  .pipe-row{display:flex;gap:12px;align-items:center;font-size:var(--t-sm);font-weight:700;padding:5px 0;color:#6f6880}
  .pipe-row.done{color:#fff}
  .pipe-row.active{color:var(--violet-2)}
  .dot{width:18px;height:18px;border-radius:50%;border:2px solid currentColor;display:grid;place-items:center;flex:0 0 auto;font-size:9px}
  .pipe-row.done .dot{background:var(--mint);border-color:var(--mint);color:var(--mint-ink)}
  .pipe-row.done .dot::after{content:"✓";font-weight:900}

  /* ---------- INTENT ---------- */
  .panel{margin-top:22px;background:var(--card);border:1px solid var(--line);border-radius:var(--r-lg);padding:22px 24px;display:none}
  .panel.on{display:block}
  .panel-head{display:flex;justify-content:space-between;gap:14px;align-items:baseline;flex-wrap:wrap;margin-bottom:14px}
  .panel-head h2{font-size:var(--t-lg)}
  .panel-head em{font-style:normal;color:var(--muted-2);font-size:11px;font-weight:700}
  .chips{display:flex;flex-wrap:wrap;gap:8px}
  .chip{display:inline-flex;align-items:center;gap:8px;background:var(--violet-tint);border:1px solid #ded5ff;color:var(--violet-ink);border-radius:var(--r-pill);padding:7px 8px 7px 13px;font-size:11px;font-weight:800}
  .chip small{color:#6b5fb0;font-weight:700}
  .chip button{border:0;background:rgba(91,61,245,.14);color:var(--violet-ink);width:19px;height:19px;border-radius:50%;cursor:pointer;font-size:13px;line-height:1;font-family:inherit;display:grid;place-items:center;padding:0}
  .chip button:hover{background:var(--violet);color:#fff}
  .chip.guess{background:var(--amber);border-color:#f0d89a;color:var(--amber-ink)}
  .chip.guess button{background:rgba(138,97,0,.14);color:var(--amber-ink)}
  .counts{margin-top:16px;padding-top:14px;border-top:1px solid var(--line-2);display:flex;gap:18px;flex-wrap:wrap;font-size:var(--t-sm);color:var(--muted)}
  .counts b{color:var(--ink)}

  /* ---------- RESULTS ---------- */
  .results{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:22px}
  .card{background:var(--card);border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden;display:flex;flex-direction:column;box-shadow:var(--shadow-sm)}
  .card-img{aspect-ratio:1/1;background:var(--cream);position:relative}
  .card-img img{width:100%;height:100%;object-fit:cover}
  .rank{position:absolute;top:10px;left:10px;background:var(--ink);color:#fff;border-radius:var(--r-pill);padding:4px 10px;font-size:10px;font-weight:900}
  .card-body{padding:16px;display:flex;flex-direction:column;flex:1}
  .card-cat{font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.6px;color:var(--muted-2)}
  .card h3{font-size:var(--t-sm);line-height:1.4;margin:8px 0}
  .price{font-size:var(--t-lg);font-weight:900}
  .why{margin-top:10px;background:var(--mint);color:var(--mint-ink);border-radius:10px;padding:9px 11px;font-size:11px;line-height:1.5;font-weight:600}
  .deliv{margin-top:8px;font-size:10px;color:var(--muted-2);font-weight:700}
  .card-acts{margin-top:auto;padding-top:14px;display:flex;gap:7px;flex-wrap:wrap}

  /* ---------- EXCLUSIONS / EMPTY ---------- */
  .excl{margin-top:18px;background:var(--card);border:1px dashed #ddd4c6;border-radius:var(--r-md);padding:16px 20px;display:none}
  .excl.on{display:block}
  .excl summary{cursor:pointer;font-size:var(--t-sm);font-weight:800;color:var(--ink-2)}
  .excl ul{margin-top:12px;display:grid;gap:7px}
  .excl li{font-size:var(--t-sm);color:var(--muted);display:flex;gap:9px;align-items:baseline}
  .excl li b{color:var(--peach-ink);min-width:34px}
  .empty{margin-top:22px;background:var(--peach);border:1px solid #f7c9bb;color:var(--peach-ink);border-radius:var(--r-md);padding:26px;display:none}
  .empty.on{display:block}
  .empty h2{font-size:var(--t-lg);margin-bottom:8px}
  .empty p{font-size:var(--t-sm);line-height:1.65;max-width:60ch}
  .empty .btn{margin-top:16px;background:var(--peach-ink);color:#fff}

  .foot{margin:46px 0 60px;color:var(--muted-2);font-size:11px;line-height:1.7}
  .foot code{background:var(--cream);border:1px solid var(--line);border-radius:5px;padding:1px 5px;font-size:10px}

  @media (max-width:1120px){ .links{display:none} }
  @media (max-width:980px){ .footer-grid{grid-template-columns:1fr 1fr;gap:32px} }
  @media (max-width:900px){ .results{grid-template-columns:repeat(2,1fr)} .assist{grid-template-columns:1fr} }
  @media (max-width:620px){ .results{grid-template-columns:1fr} .wrap{width:min(100% - 28px,1120px)} }
  @media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
`;

export function AiGiftFinderStyles() {
  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
