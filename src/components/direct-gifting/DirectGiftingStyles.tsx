const styles = `:root{
    --ink:#191622; --ink-2:#39323f; --muted:#635d6e; --muted-2:#7a7385;
    --paper:#fffdf8; --cream:#f6f0e7; --card:#ffffff; --line:#e9e3da; --line-2:#f0ebe3;
    --violet:#5b3df5; --violet-2:#8a73ff; --violet-tint:#efeaff; --violet-ink:#4b2ee8;
    --mint:#dff7ec; --mint-ink:#1c7a4f; --amber:#fff0d0; --amber-ink:#8a6100;
    --peach:#ffe5da; --peach-ink:#a8482a; --sky:#eaf2ff; --sky-ink:#2563eb;
    --lilac:#f5eafd; --yellow:#ffe7a8; --yellow-ink:#5c3b00;

    --t-xs:12px; --t-sm:13px; --t-md:15px; --t-lg:17px; --t-xl:21px; --t-2xl:26px;
    --t-3xl:clamp(30px,3.4vw,40px); --t-4xl:clamp(38px,5vw,62px);
    --r-pill:999px; --r-sm:14px; --r-md:20px; --r-lg:28px;
    --gap:16px; --pad-card:26px;
    --shadow:0 20px 54px rgba(47,34,70,.10); --shadow-sm:0 10px 30px rgba(38,28,17,.06);
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
  section[id],header[id]{scroll-margin-top:88px}

  /* nav */
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

  /* section rhythm */
  .section{padding:92px 0}
  .section-head{display:grid;grid-template-columns:1fr .66fr;gap:36px;align-items:end;margin-bottom:42px}
  .kicker{font-size:var(--t-xs);text-transform:uppercase;letter-spacing:1.5px;color:var(--violet);font-weight:800}
  .section-head h2{font-size:var(--t-3xl);line-height:1.08;margin-top:12px;max-width:20ch;text-wrap:balance}
  .section-head p{color:var(--muted);line-height:1.7;font-size:16px}
  .accent{font-family:Georgia,"Times New Roman",serif;font-style:italic;font-weight:500;color:var(--violet);letter-spacing:0}
  .note{margin-top:26px;color:var(--muted);font-size:var(--t-sm);line-height:1.65;text-align:center}

  /* hero */
  .hero{padding:60px 0 20px}
  .hero-grid{display:grid;grid-template-columns:1fr .94fr;gap:48px;align-items:center}
  .eyebrow{display:inline-flex;align-items:center;gap:8px;background:var(--peach);color:var(--peach-ink);border:1px solid #ffcbb1;border-radius:var(--r-pill);padding:9px 14px;font-size:var(--t-xs);font-weight:800}
  .eyebrow svg{width:14px;height:14px}
  h1{font-size:var(--t-4xl);line-height:1.04;margin:20px 0;max-width:16ch;text-wrap:balance}
  .hero-copy{font-size:var(--t-lg);line-height:1.7;color:var(--muted);max-width:55ch}
  .hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
  .hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:32px;max-width:620px}
  .stat{background:var(--card);border:1px solid var(--line);border-radius:var(--r-sm);padding:16px;box-shadow:var(--shadow-sm)}
  .stat b{display:block;font-size:var(--t-2xl);line-height:1}
  .stat span{display:block;color:var(--muted);font-size:var(--t-xs);line-height:1.45;margin-top:8px}

  /* campaign tracker mock */
  .camp{background:linear-gradient(150deg,#ffe6d7,#f0e8ff 58%,#fff2bd);border-radius:var(--r-lg);padding:18px;box-shadow:var(--shadow)}
  .camp-card{background:rgba(255,255,255,.94);border:1px solid rgba(255,255,255,.9);border-radius:var(--r-md);padding:20px}
  .camp-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-bottom:15px;margin-bottom:16px;border-bottom:1px solid var(--line-2)}
  .camp-bar b{font-size:var(--t-sm)}
  .camp-bar small{display:block;color:var(--muted-2);font-size:11px;font-weight:600;margin-top:2px}
  .live-pill{background:var(--mint);color:var(--mint-ink);border-radius:var(--r-pill);padding:7px 12px;font-size:11px;font-weight:800;white-space:nowrap;display:inline-flex;align-items:center;gap:6px}
  .live-pill i{width:6px;height:6px;border-radius:50%;background:var(--mint-ink);display:block}
  .funnel{display:grid;gap:10px}
  .fun-row{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center;background:#faf8f4;border:1px solid var(--line-2);border-radius:12px;padding:12px 14px}
  .fun-row > div:first-child{min-width:0}
  .fun-row b{display:block;font-size:12px;line-height:1.3}
  .fun-row small{display:block;font-size:10px;color:var(--muted-2);margin-top:3px;line-height:1.4}
  .fun-n{font-size:var(--t-lg);font-weight:800;white-space:nowrap}
  .fun-row.done .fun-n{color:var(--mint-ink)}
  .fun-row.now{background:#faf8ff;border-color:#ded5ff}
  .fun-row.now .fun-n{color:var(--violet)}
  .bar{grid-column:1 / -1;height:5px;border-radius:99px;background:#ece6dd;overflow:hidden}
  .bar i{display:block;height:100%;border-radius:99px;background:var(--violet)}
  .fun-row.done .bar i{background:var(--mint-ink)}
  .camp-foot{margin-top:16px;padding-top:15px;border-top:1px solid var(--line-2);display:flex;align-items:center;gap:9px;font-size:11px;font-weight:700;color:var(--muted)}
  .camp-foot svg{width:16px;height:16px;color:var(--violet);flex:0 0 auto}

  /* strip */
  .strip{padding:10px 0 0}
  .strip-panel{border:1px solid var(--line);background:var(--card);border-radius:var(--r-md);padding:18px 26px;display:flex;align-items:center;justify-content:space-between;gap:22px;flex-wrap:wrap;box-shadow:var(--shadow-sm)}
  .strip-panel > span:first-child{color:var(--muted);font-size:var(--t-sm)}
  .cap{font-weight:800;color:var(--ink-2);font-size:var(--t-sm);display:inline-flex;align-items:center;gap:8px}
  .cap svg{width:17px;height:17px;color:var(--peach-ink)}

  /* audiences */
  .aud-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap)}
  .aud{background:var(--card);border:1px solid var(--line);border-radius:var(--r-md);padding:var(--pad-card);display:flex;flex-direction:column;position:relative;overflow:hidden;transition:transform .18s ease,box-shadow .18s ease}
  .aud:hover{transform:translateY(-2px);box-shadow:var(--shadow-sm)}
  .aud:after{content:"";position:absolute;width:110px;height:110px;border-radius:50%;right:-36px;top:-42px;background:var(--peach)}
  .aud:nth-child(2):after{background:var(--violet-tint)}
  .aud:nth-child(3):after{background:var(--mint)}
  .aud:nth-child(4):after{background:var(--amber)}
  .aud:nth-child(5):after{background:var(--sky)}
  .aud-ico{position:relative;z-index:1;width:46px;height:46px;border-radius:var(--r-sm);background:#f7f4ef;display:grid;place-items:center;color:var(--ink-2);margin-bottom:20px}
  .aud-ico svg{width:23px;height:23px}
  .aud h3{font-size:var(--t-lg);line-height:1.25;margin-bottom:9px;position:relative;z-index:1}
  .aud p{color:var(--muted);font-size:var(--t-sm);line-height:1.6;position:relative;z-index:1;margin-bottom:auto}
  .aud-meta{display:flex;gap:7px;flex-wrap:wrap;margin-top:18px;padding-top:15px;border-top:1px solid var(--line-2);position:relative;z-index:1}
  .aud-meta span{background:#f7f4ef;border:1px solid #ece5db;border-radius:var(--r-pill);padding:6px 10px;font-size:10px;font-weight:800;color:#5f5869}

  /* address problem */
  .addr{background:var(--ink);color:#fff;position:relative;overflow:hidden}
  .addr:before{content:"";position:absolute;width:560px;height:560px;border-radius:50%;filter:blur(90px);background:rgba(255,155,116,.22);left:-190px;bottom:-260px}
  .addr .wrap{position:relative;z-index:1}
  .addr .kicker{color:#ffb99b}
  .addr .section-head p{color:#cfc7d8}
  .path-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap)}
  .path{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:var(--r-lg);padding:32px;display:flex;flex-direction:column}
  .path.reco{background:#fff;color:var(--ink);border-color:#fff}
  .path-tag{align-self:flex-start;background:rgba(255,255,255,.12);color:#e4dfea;border-radius:var(--r-pill);padding:6px 12px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.7px;margin-bottom:18px}
  .path.reco .path-tag{background:var(--mint);color:var(--mint-ink)}
  .path h3{font-size:var(--t-2xl);line-height:1.15;margin-bottom:11px}
  .path > p{color:#bfb7c7;line-height:1.7;font-size:var(--t-sm);margin-bottom:22px}
  .path.reco > p{color:var(--muted)}
  .path ul{display:grid;gap:11px;margin-bottom:auto}
  .path li{display:grid;grid-template-columns:19px 1fr;gap:11px;font-size:var(--t-sm);line-height:1.55;color:#e4dfea;align-items:start}
  .path.reco li{color:var(--ink-2)}
  .path li svg{width:19px;height:19px;color:#ffb99b;margin-top:1px}
  .path.reco li svg{color:var(--mint-ink)}
  .path-foot{margin-top:24px;padding-top:16px;border-top:1px solid rgba(255,255,255,.14);font-size:var(--t-sm);line-height:1.6;color:#bfb7c7}
  .path.reco .path-foot{border-top-color:var(--line-2);color:var(--muted)}
  .path-foot b{color:#fff}
  .path.reco .path-foot b{color:var(--ink)}

  /* presentation */
  .pres-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--gap)}
  .pres{background:var(--card);border:1px solid var(--line);border-radius:var(--r-md);padding:var(--pad-card);min-height:225px;display:flex;flex-direction:column}
  .pres-ico{width:44px;height:44px;border-radius:var(--r-sm);background:var(--peach);display:grid;place-items:center;color:var(--peach-ink);margin-bottom:20px}
  .pres:nth-child(2) .pres-ico{background:var(--violet-tint);color:var(--violet)}
  .pres:nth-child(3) .pres-ico{background:var(--mint);color:var(--mint-ink)}
  .pres:nth-child(4) .pres-ico{background:var(--amber);color:var(--amber-ink)}
  .pres-ico svg{width:22px;height:22px}
  .pres h3{font-size:var(--t-lg);line-height:1.25;margin-bottom:9px}
  .pres p{color:var(--muted);font-size:var(--t-sm);line-height:1.6}

  /* tiers */
  .tiers{background:var(--cream)}
  .tier-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--gap)}
  .tier{background:var(--card);border:1px solid var(--line);border-radius:var(--r-md);padding:var(--pad-card);display:flex;flex-direction:column}
  .tier-top{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:14px}
  .tier-top b{font-size:var(--t-2xl);line-height:1}
  .tier-top span{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:var(--peach-ink);background:var(--peach);border-radius:var(--r-pill);padding:6px 9px;white-space:nowrap}
  .tier > p{color:var(--muted);font-size:var(--t-sm);line-height:1.6;margin-bottom:auto}
  .tier ul{margin-top:18px;display:grid;gap:9px}
  .tier li{display:grid;grid-template-columns:16px 1fr;gap:10px;font-size:var(--t-sm);color:var(--ink-2);line-height:1.5;align-items:start}
  .tier li svg{width:16px;height:16px;color:var(--mint-ink);margin-top:3px}

  /* timeline */
  .tl{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--gap)}
  .tl-step{border-top:2px solid var(--line);padding:22px 2px 0}
  .tl-num{width:34px;height:34px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;font-weight:800;font-size:11px}
  .tl-step h3{margin:18px 0 8px;font-size:var(--t-lg);line-height:1.25}
  .tl-step p{color:var(--muted);font-size:var(--t-sm);line-height:1.6}
  .tl-when{display:inline-block;margin-top:14px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.7px;color:var(--violet);background:var(--violet-tint);border-radius:var(--r-pill);padding:6px 10px}
  .tl-note{margin-top:var(--gap);background:var(--card);border:1px solid var(--line);border-radius:var(--r-md);padding:20px 24px;display:flex;gap:14px;align-items:flex-start;color:var(--muted);font-size:var(--t-sm);line-height:1.65}
  .tl-note svg{width:22px;height:22px;color:var(--violet);flex:0 0 auto;margin-top:1px}
  .tl-note b{color:var(--ink)}

  /* compare back to model 1 */
  .versus{background:var(--cream)}
  .vs-panel{background:var(--card);border:1px solid var(--line);border-radius:var(--r-lg);overflow:hidden}
  .vs-panel table{width:100%;border-collapse:collapse}
  .vs-panel th,.vs-panel td{text-align:left;padding:16px 22px;font-size:var(--t-sm);line-height:1.55;border-bottom:1px solid var(--line-2);vertical-align:top}
  .vs-panel tr:last-child th,.vs-panel tr:last-child td{border-bottom:0}
  .vs-panel thead th{background:#faf8f4;font-size:10px;text-transform:uppercase;letter-spacing:.9px;color:var(--muted-2);font-weight:800}
  .vs-panel tbody th{font-weight:700;color:var(--muted);width:26%}
  .vs-panel td{color:var(--ink-2);font-weight:600;width:37%}
  .vs-panel td.hi{background:#fffaf7}
  .vs-cta{margin-top:var(--gap);text-align:center}

  /* faq */
  .faq-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px 24px;align-items:start}
  .faq{border:1px solid var(--line);border-radius:var(--r-md);background:var(--card);overflow:hidden}
  .faq summary{list-style:none;cursor:pointer;padding:20px 22px;font-weight:700;font-size:var(--t-md);line-height:1.5;display:grid;grid-template-columns:1fr 20px;gap:14px;align-items:start}
  .faq summary::-webkit-details-marker{display:none}
  .faq summary:hover{color:var(--violet)}
  .faq-plus{width:20px;height:20px;color:var(--violet);margin-top:2px;transition:transform .2s ease}
  .faq[open] .faq-plus{transform:rotate(45deg)}
  .faq p{padding:0 22px 22px;color:var(--muted);font-size:var(--t-sm);line-height:1.7}

  /* cta */
  .cta{padding:0 0 92px}
  .cta-panel{background:linear-gradient(130deg,#5b3df5,#2d1a9d);border-radius:var(--r-lg);color:#fff;padding:48px;display:grid;grid-template-columns:1fr .78fr;gap:34px;align-items:center;position:relative;overflow:hidden}
  .cta-panel:after{content:"✦";position:absolute;font-size:260px;color:rgba(255,255,255,.08);right:34px;top:-96px;line-height:1}
  .cta-panel h2{font-size:var(--t-3xl);line-height:1.1;margin-bottom:14px;max-width:20ch;text-wrap:balance;position:relative;z-index:1}
  .cta-panel > div:first-child > p{color:#dcd4ff;line-height:1.7;max-width:56ch;position:relative;z-index:1}
  .cta-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px;position:relative;z-index:1}
  .cta-actions .btn-primary{background:#fff;color:#2d1a9d}
  .cta-actions .btn-soft{background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.24)}
  .cta-actions .btn-soft:hover{border-color:rgba(255,255,255,.55)}
  .cta-alt{position:relative;z-index:1;margin-top:20px;font-size:var(--t-sm);color:#cfc4ff;line-height:1.6}
  .cta-alt a{font-weight:800;color:#fff;border-bottom:1px solid rgba(255,255,255,.4)}
  .cta-points{display:grid;gap:10px;position:relative;z-index:1}
  .point{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);border-radius:var(--r-sm);padding:13px;font-size:var(--t-sm);font-weight:700;display:grid;grid-template-columns:17px 1fr;gap:10px;align-items:start;line-height:1.45}
  .point svg{width:17px;height:17px;color:#c9bcff;margin-top:1px}

  /* modal + form */
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

  /* footer */
  .footer{padding:52px 0 30px;border-top:1px solid var(--line)}
  .footer-grid{display:grid;grid-template-columns:1.3fr repeat(3,.7fr);gap:40px}
  .footer h2{font-size:var(--t-xs);text-transform:uppercase;letter-spacing:.9px;margin-bottom:16px}
  .footer a{display:block;color:var(--muted);font-size:var(--t-sm);margin:10px 0;transition:color .15s ease}
  .footer a:hover{color:var(--violet)}
  .footer .logo{margin-bottom:18px}
  .foot-copy{max-width:38ch;color:var(--muted);line-height:1.65;font-size:var(--t-sm)}
  .copyright{margin-top:44px;padding-top:22px;border-top:1px solid var(--line);font-size:var(--t-xs);color:#736c7d;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}

  /* responsive */
  @media (max-width:1120px){.links{display:none}}
  @media (max-width:1080px){
    .aud-grid,.pres-grid,.tier-grid,.tl{grid-template-columns:repeat(2,1fr)}
  }
  @media (max-width:980px){
    .section{padding:70px 0}
    .section-head{grid-template-columns:1fr;gap:18px;margin-bottom:32px}
    .section-head h2{max-width:22ch}
    .hero{padding:44px 0 10px}
    .hero-grid{grid-template-columns:1fr;gap:34px}
    h1{max-width:18ch}
    .path-grid,.cta-panel,.faq-grid{grid-template-columns:1fr}
    .cta-panel{padding:36px}
    .footer-grid{grid-template-columns:1fr 1fr;gap:32px}
  }
  @media (max-width:640px){
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
    .stat b{font-size:var(--t-xl);white-space:nowrap}
    .stat span{margin-top:0}
    .camp{padding:12px;border-radius:var(--r-md)}
    .camp-card{padding:16px}
    .strip-panel{padding:16px 18px;gap:14px}
    .aud-grid,.pres-grid,.tier-grid,.tl{grid-template-columns:1fr}
    .path{padding:26px;border-radius:var(--r-md)}
    .vs-panel{overflow-x:auto}
    .vs-panel table{min-width:540px}
    .cta-panel{padding:28px;border-radius:var(--r-md)}
    .cta-panel:after{display:none}
    .cta-actions .btn{width:100%}
    .cta-alt{margin-top:16px}
    .form-grid,.radio-row{grid-template-columns:1fr}
    .form-submit .btn{width:100%}
    dialog#lead-modal{width:100%;max-width:100%;max-height:92dvh;margin:0;inset:auto 0 0 0}
    .modal-card{border-radius:var(--r-lg) var(--r-lg) 0 0;max-height:92dvh}
    .modal-head{padding:26px 22px 18px}
    .modal-head h2{padding-right:48px}
    .modal-body{padding:22px}
    .footer-grid{grid-template-columns:1fr;gap:26px}
    .copyright{flex-direction:column;gap:8px}
  }
  @media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important;scroll-behavior:auto}}`;

export function DirectGiftingStyles() {
  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
