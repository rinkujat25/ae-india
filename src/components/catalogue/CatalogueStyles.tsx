const styles = `:root{
    /* ---- color tokens ---- */
    --ink:#191622;
    --ink-2:#39323f;
    --muted:#635d6e;
    --muted-2:#7a7385;
    --paper:#fffdf8;
    --cream:#f6f0e7;
    --card:#ffffff;
    --line:#e9e3da;
    --line-2:#f0ebe3;
    --violet:#5b3df5;
    --violet-2:#8a73ff;
    --violet-tint:#efeaff;
    --violet-ink:#4b2ee8;
    --mint:#dff7ec;
    --mint-ink:#1c7a4f;
    --amber:#fff0d0;
    --amber-ink:#8a6100;
    --peach:#ffe5da;
    --peach-ink:#a8482a;
    --sky:#eaf2ff;
    --sky-ink:#2563eb;
    --lilac:#f5eafd;
    --yellow:#ffe7a8;
    --yellow-ink:#5c3b00;

    /* ---- type scale (8 steps) ---- */
    --t-xs:12px;
    --t-sm:13px;
    --t-md:15px;
    --t-lg:17px;
    --t-xl:21px;
    --t-2xl:26px;
    --t-3xl:clamp(30px,3.4vw,40px);
    --t-4xl:clamp(38px,5vw,62px);

    /* ---- radii (4 steps) ---- */
    --r-pill:999px;
    --r-sm:14px;
    --r-md:20px;
    --r-lg:28px;

    /* ---- space ---- */
    --gap:16px;
    --pad-card:26px;
    --shadow:0 20px 54px rgba(47,34,70,.10);
    --shadow-sm:0 10px 30px rgba(38,28,17,.06);
  }
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0;background:var(--paper);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Arial,sans-serif;font-size:var(--t-md);-webkit-font-smoothing:antialiased}
  a{color:inherit;text-decoration:none}
  img{display:block;max-width:100%}
  h1,h2,h3,h4{letter-spacing:-.015em;font-weight:800;margin:0}
  p{margin:0}
  ul{margin:0;padding:0;list-style:none}
  .wrap{width:min(1180px,calc(100% - 40px));margin:auto}
  :focus-visible{outline:3px solid var(--violet);outline-offset:3px;border-radius:6px}
  .icon{width:100%;height:100%;stroke:currentColor;stroke-width:1.7;fill:none;stroke-linecap:round;stroke-linejoin:round}

  /* ---------------- nav ---------------- */
  .nav{position:sticky;top:0;z-index:50;background:rgba(255,253,248,.88);backdrop-filter:blur(18px);border-bottom:1px solid rgba(233,227,218,.8)}
  .nav-inner{height:72px;display:flex;align-items:center;gap:26px}
  .logo{display:flex;align-items:center;width:196px;min-width:196px}
  .links{display:flex;gap:22px;font-size:var(--t-sm);color:#4f4958;margin-left:10px;white-space:nowrap}
  .links a{font-weight:700;padding:7px 0;border-bottom:2px solid transparent;transition:color .15s ease,border-color .15s ease}
  .links a:hover{color:var(--violet);border-bottom-color:var(--violet)}
  .links a[aria-current]{color:var(--ink);border-bottom-color:var(--ink)}
  .nav-ai{display:inline-flex;align-items:center;gap:7px}
  .soon-dot{font-size:9px;background:var(--yellow);color:var(--yellow-ink);border:1px solid #f2ce6d;border-radius:var(--r-pill);padding:3px 6px;font-weight:800;text-transform:uppercase;letter-spacing:.4px}
  .nav-actions{margin-left:auto;display:flex;gap:10px}
  .btn{border:0;border-radius:var(--r-pill);padding:13px 20px;font-weight:700;font-size:14px;font-family:inherit;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}
  .btn-primary{background:var(--ink);color:#fff}
  .btn-primary:hover{transform:translateY(-1px);box-shadow:0 12px 26px rgba(25,22,34,.22)}
  .btn-soft{background:#fff;border:1px solid var(--line);color:var(--ink-2)}
  .btn-soft:hover{transform:translateY(-1px);border-color:#d5ccbe}

  /* ---------------- section rhythm ---------------- */
  .section{padding:92px 0}
  .section-head{display:grid;grid-template-columns:1fr .66fr;gap:36px;align-items:end;margin-bottom:42px}
  .kicker{font-size:var(--t-xs);text-transform:uppercase;letter-spacing:1.5px;color:var(--violet);font-weight:800}
  .section-head h2{font-size:var(--t-3xl);line-height:1.08;margin-top:12px;max-width:20ch;text-wrap:balance}
  .section-head p{color:var(--muted);line-height:1.7;font-size:16px}
  .accent{font-family:Georgia,"Times New Roman",serif;font-style:italic;font-weight:500;color:var(--violet);letter-spacing:0}

  /* ---------------- hero ---------------- */
  .hero{padding:60px 0 20px}
  .hero-grid{display:grid;grid-template-columns:1fr .92fr;gap:48px;align-items:center}
  .eyebrow{display:inline-flex;align-items:center;gap:8px;background:var(--violet-tint);color:var(--violet-ink);border:1px solid #ded5ff;border-radius:var(--r-pill);padding:9px 14px;font-size:var(--t-xs);font-weight:800}
  .eyebrow svg{width:14px;height:14px}
  h1{font-size:var(--t-4xl);line-height:1.04;margin:20px 0;max-width:19ch;text-wrap:balance}
  .hero-copy{font-size:var(--t-lg);line-height:1.7;color:var(--muted);max-width:54ch}
  .hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
  .hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:32px;max-width:620px}
  .stat{background:var(--card);border:1px solid var(--line);border-radius:var(--r-sm);padding:16px;box-shadow:var(--shadow-sm)}
  .stat b{display:block;font-size:var(--t-2xl);line-height:1}
  .stat span{display:block;color:var(--muted);font-size:var(--t-xs);line-height:1.45;margin-top:8px}

  /* browser mock */
  .browser{background:linear-gradient(150deg,#f0e8ff,#ffe6d7 62%,#fff2bd);border-radius:var(--r-lg);padding:18px;box-shadow:var(--shadow)}
  .browser-card{background:rgba(255,255,255,.94);border:1px solid rgba(255,255,255,.9);border-radius:var(--r-md);padding:18px}
  .browser-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-bottom:14px;margin-bottom:14px;border-bottom:1px solid var(--line-2)}
  .browser-bar b{font-size:var(--t-sm)}
  .browser-bar small{display:block;color:var(--muted-2);font-size:11px;font-weight:600;margin-top:2px}
  .chip-budget{background:var(--ink);color:#fff;border-radius:var(--r-pill);padding:8px 12px;font-size:11px;font-weight:800;white-space:nowrap}
  .facets{display:grid;gap:10px;margin-bottom:14px}
  .facet{display:flex;gap:7px;flex-wrap:wrap;align-items:center}
  .facet > span:first-child{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.9px;color:var(--muted-2);width:100%}
  .facet i{font-style:normal;background:#f7f4ef;border:1px solid #ece5db;border-radius:var(--r-pill);padding:6px 10px;font-size:11px;font-weight:700;color:#5f5869}
  .facet i.on{background:var(--ink);border-color:var(--ink);color:#fff}
  .mock-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
  .mock-item{border:1px solid var(--line-2);border-radius:var(--r-sm);padding:8px;min-width:0}
  .mock-item picture{display:block;aspect-ratio:1/1;border-radius:10px;overflow:hidden;background:#f5f0ff}
  .mock-item img{width:100%;height:100%;object-fit:cover}
  .mock-item b{display:block;font-size:11px;line-height:1.3;margin:8px 1px 2px}
  .mock-item small{color:var(--violet);font-size:11px;font-weight:800;padding-left:1px}
  .mock-more{border:1px dashed #d9d0c2;border-radius:var(--r-sm);display:grid;place-content:center;text-align:center;gap:4px;color:var(--muted);padding:8px}
  .mock-more b{font-size:var(--t-lg);color:var(--ink);display:block}
  .mock-more span{font-size:10px;line-height:1.35;display:block}

  /* ---------------- budget tiers ---------------- */
  .tiers{background:var(--cream)}
  .tier-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap)}
  .tier{background:var(--card);border:1px solid var(--line);border-radius:var(--r-md);padding:var(--pad-card);display:flex;flex-direction:column;transition:transform .18s ease,box-shadow .18s ease}
  .tier:hover{transform:translateY(-2px);box-shadow:var(--shadow-sm)}
  .tier-top{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:14px}
  .tier-top b{font-size:var(--t-2xl);line-height:1}
  .tier-top span{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.7px;color:var(--violet);background:var(--violet-tint);border-radius:var(--r-pill);padding:6px 10px;white-space:nowrap}
  .tier > p{color:var(--muted);font-size:var(--t-sm);line-height:1.6;margin-bottom:auto}
  .tier ul{margin-top:18px;display:grid;gap:9px}
  .tier li{display:grid;grid-template-columns:16px 1fr;gap:10px;font-size:var(--t-sm);color:var(--ink-2);line-height:1.5;align-items:start}
  .tier li svg{width:16px;height:16px;color:var(--mint-ink);margin-top:3px}

  /* ---------------- categories ---------------- */
  .cat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--gap)}
  .cat{border:1px solid var(--line);border-radius:var(--r-md);padding:var(--pad-card);background:var(--card);display:grid;grid-template-columns:54px 1fr;gap:20px;transition:transform .18s ease,box-shadow .18s ease}
  .cat:hover{transform:translateY(-2px);box-shadow:var(--shadow-sm)}
  .cat-ico{width:54px;height:54px;border-radius:var(--r-sm);display:grid;place-items:center;background:var(--violet-tint);color:var(--violet)}
  .cat-ico svg{width:26px;height:26px}
  .cat:nth-child(2) .cat-ico{background:var(--lilac);color:#7b3fb8}
  .cat:nth-child(3) .cat-ico{background:var(--mint);color:var(--mint-ink)}
  .cat:nth-child(4) .cat-ico{background:var(--amber);color:var(--amber-ink)}
  .cat:nth-child(5) .cat-ico{background:var(--peach);color:var(--peach-ink)}
  .cat:nth-child(6) .cat-ico{background:var(--sky);color:var(--sky-ink)}
  .cat:nth-child(7) .cat-ico{background:var(--violet-tint);color:var(--violet)}
  .cat:nth-child(8) .cat-ico{background:#f3f0e8;color:#7a6a3f}
  .cat h3{font-size:var(--t-xl);line-height:1.2;margin-bottom:8px}
  /* The heading is the link to the category page. It inherits the heading's own
     colour so the card still reads as a card, and only underlines on hover --
     eight underlined headings in a grid is a wall of blue. */
  .cat h3 a{color:inherit;text-decoration:none}
  .cat h3 a:hover{color:var(--violet);text-decoration:underline;text-underline-offset:3px}
  .cat h3 a:focus-visible{outline:3px solid var(--violet);outline-offset:3px;border-radius:4px}
  .cat > div > p{color:var(--muted);font-size:var(--t-sm);line-height:1.6}
  .cat-items{margin-top:14px;color:var(--ink-2);font-size:var(--t-sm);line-height:1.6}
  .cat-meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;padding-top:16px;border-top:1px solid var(--line-2)}
  .cat-meta span{background:#f7f4ef;border:1px solid #ece5db;border-radius:var(--r-pill);padding:7px 11px;font-size:11px;font-weight:700;color:#5f5869}
  .cat-meta span.range{background:var(--ink);border-color:var(--ink);color:#fff}

  /* ---------------- featured ---------------- */
  .featured{background:var(--cream)}
  .feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap)}
  .feat{background:var(--card);border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden;display:flex;flex-direction:column;transition:transform .18s ease,box-shadow .18s ease}
  .feat:hover{transform:translateY(-3px);box-shadow:var(--shadow)}
  .feat picture{display:block;aspect-ratio:4/3;background:#f2edff}
  .feat img{width:100%;height:100%;object-fit:cover}
  .feat-body{padding:22px;display:flex;flex-direction:column;flex:1}
  .feat-body > span{display:inline-flex;align-self:flex-start;background:var(--violet-tint);color:var(--violet-ink);border-radius:var(--r-pill);padding:6px 11px;font-size:11px;font-weight:800;margin-bottom:13px}
  .feat h3{font-size:var(--t-xl);line-height:1.2;margin-bottom:8px}
  .feat p{color:var(--muted);font-size:var(--t-sm);line-height:1.6;margin-bottom:auto}
  .feat-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:20px;padding-top:16px;border-top:1px solid var(--line-2);font-size:var(--t-xs);font-weight:700;color:var(--muted)}
  .feat-foot b{color:var(--violet);font-size:var(--t-lg)}
  .note{margin-top:26px;color:var(--muted);font-size:var(--t-sm);line-height:1.65;text-align:center}

  /* ---------------- festival edit ---------------- */
  .edit-panel{background:var(--ink);color:#fff;border-radius:var(--r-lg);padding:44px;position:relative;overflow:hidden}
  .edit-panel:before{content:"";position:absolute;width:480px;height:480px;border-radius:50%;filter:blur(90px);background:rgba(91,61,245,.32);right:-150px;top:-200px}
  .edit-head{position:relative;z-index:1;display:grid;grid-template-columns:1fr .6fr;gap:32px;align-items:end;margin-bottom:32px}
  .edit-head span{color:#b7a8ff;font-size:var(--t-xs);text-transform:uppercase;letter-spacing:1.5px;font-weight:800}
  .edit-head h2{font-size:var(--t-3xl);line-height:1.1;margin-top:12px;max-width:20ch;text-wrap:balance}
  .edit-head p{color:#cfc7d8;line-height:1.7;font-size:var(--t-md)}
  .edit-grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(4,1fr);gap:var(--gap)}
  .edit-item{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:var(--r-md);padding:22px;display:flex;flex-direction:column}
  .edit-ico{width:44px;height:44px;border-radius:var(--r-sm);background:rgba(255,255,255,.1);display:grid;place-items:center;color:#c9bcff;margin-bottom:18px}
  .edit-ico svg{width:22px;height:22px}
  .edit-item h3{font-size:var(--t-lg);line-height:1.25;margin-bottom:8px}
  .edit-item p{color:#bfb7c7;font-size:var(--t-sm);line-height:1.55;margin-bottom:auto}
  .edit-item b{display:block;margin-top:18px;font-size:var(--t-xl);color:#fff}
  .edit-foot{position:relative;z-index:1;margin-top:var(--gap);background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:var(--r-md);padding:18px 22px;color:#d6cedf;font-size:var(--t-sm);line-height:1.6;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
  .edit-foot svg{width:20px;height:20px;color:#b7a8ff;flex:0 0 auto}

  /* ---------------- how built ---------------- */
  .build-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--gap)}
  .build{background:var(--card);border:1px solid var(--line);border-radius:var(--r-md);padding:var(--pad-card);position:relative;overflow:hidden;display:flex;flex-direction:column;min-height:236px}
  .build:after{content:"";position:absolute;width:112px;height:112px;border-radius:50%;right:-36px;bottom:-44px;background:var(--violet-tint)}
  .build:nth-child(2):after{background:var(--peach)}
  .build:nth-child(3):after{background:var(--mint)}
  .build:nth-child(4):after{background:var(--amber)}
  .build-num{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:var(--ink);color:#fff;font-size:11px;font-weight:800;margin-bottom:24px;position:relative;z-index:1}
  .build h3{font-size:var(--t-xl);line-height:1.2;margin-bottom:9px;position:relative;z-index:1}
  .build p{color:var(--muted);font-size:var(--t-sm);line-height:1.6;position:relative;z-index:1}

  /* ---------------- rules split ---------------- */
  .split{background:var(--cream)}
  .split-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap)}
  .split-card{background:var(--card);border:1px solid var(--line);border-radius:var(--r-lg);padding:34px}
  .split-card.dark{background:var(--ink);border-color:var(--ink);color:#fff}
  .split-card > span{font-size:var(--t-xs);text-transform:uppercase;letter-spacing:1.4px;font-weight:800;color:var(--violet)}
  .split-card.dark > span{color:#b7a8ff}
  .split-card h3{font-size:var(--t-2xl);line-height:1.15;margin:14px 0 20px}
  .split-card ul{display:grid;gap:14px}
  .split-card li{display:grid;grid-template-columns:22px 1fr;gap:12px;font-size:var(--t-md);line-height:1.6;color:var(--muted);align-items:start}
  .split-card.dark li{color:#cfc7d8}
  .split-card li svg{width:22px;height:22px;color:var(--violet);margin-top:1px}
  .split-card.dark li svg{color:#b7a8ff}
  .split-card li b{color:var(--ink);font-weight:700}
  .split-card.dark li b{color:#fff}

  /* ---------------- cta ---------------- */
  .cta{padding:0 0 92px}
  .cta-panel{background:linear-gradient(130deg,#5b3df5,#2d1a9d);border-radius:var(--r-lg);color:#fff;padding:48px;display:grid;grid-template-columns:1fr auto;gap:34px;align-items:center}
  .cta-panel h2{font-size:var(--t-3xl);line-height:1.1;margin-bottom:14px;max-width:20ch;text-wrap:balance}
  .cta-panel p{color:#dcd4ff;line-height:1.7;max-width:58ch}
  .cta-actions{display:flex;flex-direction:column;gap:12px}
  .cta-actions .btn-primary{background:#fff;color:#2d1a9d}
  .cta-actions .btn-primary:hover{box-shadow:0 12px 26px rgba(0,0,0,.2)}
  .cta-actions .btn-soft{background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.22)}
  .cta-actions .btn-soft:hover{border-color:rgba(255,255,255,.5)}
  .cta-note{font-size:var(--t-xs);color:#cfc4ff;text-align:center}

  /* ---------------- enquiry modal ---------------- */
  dialog#lead-modal{border:0;padding:0;background:transparent;max-width:min(680px,calc(100% - 32px));width:100%;max-height:calc(100dvh - 48px);overflow:visible;color:var(--ink)}
  dialog#lead-modal::backdrop{background:rgba(25,22,34,.55);backdrop-filter:blur(4px)}
  dialog#lead-modal[open]{animation:modal-in .22s ease}
  @keyframes modal-in{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}
  .modal-card{background:var(--paper);border-radius:var(--r-lg);box-shadow:0 40px 90px rgba(25,22,34,.35);position:relative;max-height:calc(100dvh - 48px);display:flex;flex-direction:column;overflow:hidden}
  .modal-close{position:absolute;top:14px;right:14px;z-index:2;width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:#fff;color:var(--ink-2);display:grid;place-items:center;cursor:pointer;padding:0;transition:background .15s ease,border-color .15s ease}
  .modal-close:hover{background:var(--cream);border-color:#d5ccbe}
  .modal-close svg{width:18px;height:18px}
  .modal-head{padding:32px 32px 20px;border-bottom:1px solid var(--line);flex:0 0 auto}
  .modal-head h2{font-size:var(--t-2xl);line-height:1.15;margin:10px 0 8px;padding-right:44px}
  .modal-head p{color:var(--muted);font-size:var(--t-sm);line-height:1.65;max-width:52ch}
  .modal-body{padding:26px 32px 32px;overflow-y:auto;flex:1 1 auto;-webkit-overflow-scrolling:touch}
  body.modal-open{overflow:hidden}

  /* ---------------- form fields ---------------- */
  .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap)}
  .field{display:flex;flex-direction:column;gap:7px}
  .field.wide{grid-column:1 / -1}
  .field label{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.7px;color:var(--muted-2)}
  .field label .req{color:var(--violet)}
  .field input,.field select,.field textarea{font-family:inherit;font-size:var(--t-md);color:var(--ink);background:#fff;border:1.5px solid var(--line);border-radius:var(--r-sm);padding:13px 14px;min-height:48px;transition:border-color .15s ease,box-shadow .15s ease}
  .field textarea{min-height:86px;resize:vertical;line-height:1.6}
  .field input:focus,.field select:focus,.field textarea:focus{outline:0;border-color:var(--violet);box-shadow:0 0 0 3px var(--violet-tint)}
  .field input::placeholder,.field textarea::placeholder{color:#b0a89e}
  .radio-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .radio-card{border:1.5px solid var(--line);border-radius:var(--r-sm);padding:13px;cursor:pointer;background:#fff;display:flex;gap:10px;align-items:flex-start;transition:border-color .15s ease,background .15s ease}
  .radio-card:hover{border-color:#d5ccbe}
  .radio-card input{appearance:none;-webkit-appearance:none;width:16px;height:16px;min-height:0;padding:0;border-radius:50%;border:1.5px solid #d6cfc4;flex:0 0 auto;margin-top:2px;background:#fff}
  .radio-card input:checked{border-color:var(--violet);border-width:5px}
  .radio-card:has(input:checked){border-color:var(--violet);background:#faf8ff}
  .radio-card span{font-size:var(--t-sm);font-weight:700;line-height:1.35}
  .radio-card small{display:block;font-weight:500;color:var(--muted-2);font-size:11px;margin-top:3px;line-height:1.4}
  .form-submit{margin-top:22px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
  .form-submit .btn{padding:15px 26px}
  .form-note{font-size:11px;color:var(--muted-2);line-height:1.5;flex:1;min-width:180px}
  .form-status{margin-top:16px;border-radius:var(--r-sm);padding:14px 16px;font-size:var(--t-sm);line-height:1.6;background:var(--mint);color:var(--mint-ink);border:1px solid #b8e8d0}
  .form-status.error{background:#ffe9e4;color:#a8482a;border-color:#f7c9bb}
  /* ---------------- footer ---------------- */
  .footer{padding:52px 0 30px;border-top:1px solid var(--line)}
  .footer-grid{display:grid;grid-template-columns:1.3fr repeat(3,.7fr);gap:40px}
  .footer h2{font-size:var(--t-xs);text-transform:uppercase;letter-spacing:.9px;margin-bottom:16px}
  .footer a{display:block;color:var(--muted);font-size:var(--t-sm);margin:10px 0;transition:color .15s ease}
  .footer a:hover{color:var(--violet)}
  .footer .logo{margin-bottom:18px}
  .foot-copy{max-width:38ch;color:var(--muted);line-height:1.65;font-size:var(--t-sm)}
  .copyright{margin-top:44px;padding-top:22px;border-top:1px solid var(--line);font-size:var(--t-xs);color:#736c7d;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}

  /* ---------------- responsive ---------------- */
  @media (max-width:1120px){.links{display:none}}
  @media (max-width:1080px){
    .tier-grid,.build-grid,.edit-grid,.feat-grid{grid-template-columns:repeat(2,1fr)}
    .cat-grid{grid-template-columns:1fr}
  }
  @media (max-width:980px){
    .section{padding:70px 0}
    .section-head{grid-template-columns:1fr;gap:18px;margin-bottom:32px}
    .section-head h2{max-width:22ch}
    .hero{padding:44px 0 10px}
    .hero-grid{grid-template-columns:1fr;gap:34px}
    h1{max-width:18ch}
    .edit-head,.split-grid,.cta-panel{grid-template-columns:1fr}
    .edit-panel{padding:32px}
    .cta-panel{padding:36px}
    .cta-actions{flex-direction:row;flex-wrap:wrap}
    .footer-grid{grid-template-columns:1fr 1fr;gap:32px}
  }
  @media (max-width:640px){
    dialog#lead-modal{width:100%;max-width:100%;max-height:92dvh;margin:0;inset:auto 0 0 0}
    .modal-card{border-radius:var(--r-lg) var(--r-lg) 0 0;max-height:92dvh}
    .modal-head h2{padding-right:48px}
    .modal-head{padding:26px 22px 18px}
    .modal-body{padding:22px}
    .wrap{width:min(100% - 28px,1180px)}
    .nav-inner{height:64px;gap:12px}
    .logo{width:150px;min-width:150px}
    .nav-actions .btn-soft{display:none}
    .section{padding:56px 0}
    .cta{padding-bottom:56px}
    h1{font-size:36px;max-width:none}
    .hero-copy{font-size:16px}
    .hero-actions .btn{width:100%}
    .hero-stats{grid-template-columns:1fr;gap:10px;margin-top:26px}
    .stat{display:flex;align-items:baseline;gap:12px}
    .stat b{font-size:var(--t-xl)}
    .stat span{margin-top:0}
    .browser{padding:12px;border-radius:var(--r-md)}
    .browser-card{padding:14px}
    .mock-grid{grid-template-columns:1fr 1fr}
    .tier-grid,.build-grid,.edit-grid,.feat-grid,.split-grid{grid-template-columns:1fr}
    .cat{grid-template-columns:1fr;gap:16px;padding:22px}
    .cat-ico{width:46px;height:46px}
    .edit-panel{padding:24px;border-radius:var(--r-md)}
    .split-card{padding:26px;border-radius:var(--r-md)}
    .cta-panel{padding:28px;border-radius:var(--r-md)}
    .cta-actions{flex-direction:column}
    .cta-actions .btn{width:100%}
    .footer-grid{grid-template-columns:1fr;gap:26px}
    .copyright{flex-direction:column;gap:8px}
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

export function CatalogueStyles() {
  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
