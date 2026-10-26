const styles = `
  .product-detail-page{background:var(--paper);color:var(--ink)}
  .product-detail-page .wrap{width:min(1280px,calc(100% - 40px));margin:auto}
  .pdp-title-block{border-bottom:1px solid var(--line-2);padding:24px 0 20px;margin-bottom:24px}
  .pdp-title-block h1{font-size:25px;line-height:1.22;margin:10px 0 16px;max-width:100%;overflow-wrap:break-word;text-wrap:balance}
  .pdp{display:grid;grid-template-columns:minmax(460px,.95fr) minmax(0,1.05fr);gap:42px;padding:0 0 60px;align-items:start}
  .pdp-gallery{display:grid;grid-template-columns:78px minmax(0,1fr);gap:18px;position:sticky;top:96px;z-index:5}
  .pdp-rail{display:flex;flex-direction:column;gap:12px;max-height:580px;overflow-y:auto;scrollbar-width:thin;padding:2px}
  .pdp-thumb{border:1px solid #dedede;border-radius:7px;background:#fff;padding:7px;cursor:pointer;aspect-ratio:1/1;display:grid;place-items:center;flex:0 0 auto;transition:border-color .15s ease,box-shadow .15s ease}
  .pdp-thumb img{width:100%;height:100%;object-fit:contain}
  .pdp-thumb:hover{border-color:#bbb}
  .pdp-thumb[aria-current="true"]{border-color:var(--rose);box-shadow:0 0 0 1px var(--rose)}
  .pdp-stage{position:relative;background:#fff;border:1px solid #dedede;border-radius:8px;aspect-ratio:1/1;display:grid;place-items:center;padding:38px;overflow:visible;cursor:crosshair;box-shadow:0 1px 0 rgba(28,25,35,.03)}
  .pdp-stage > img{width:100%;height:100%;object-fit:contain}
  .pdp-wish{position:absolute;top:18px;right:18px;width:44px;height:44px;border-radius:50%;border:1px solid #ededed;background:#fff;cursor:pointer;display:grid;place-items:center;padding:0;box-shadow:0 8px 22px rgba(28,25,35,.10);z-index:10}
  .pdp-wish svg{width:19px;height:19px;stroke:var(--rose);stroke-width:1.9;fill:none}
  .pdp-wish[aria-pressed="true"] svg{fill:var(--rose)}
  .zoom-lens{position:absolute;width:42%;height:42%;transform:translate(-50%,-50%);border:1px solid rgba(77,121,255,.42);background:rgba(232,242,255,.50);box-shadow:0 0 0 1px rgba(255,255,255,.70) inset;pointer-events:none;z-index:8}
  .zoom-panel{position:absolute;left:calc(100% + 18px);top:0;width:clamp(420px,44vw,680px);height:100%;background-color:#fff;background-repeat:no-repeat;background-size:230% 230%;border:1.5px solid rgba(77,121,255,.75);box-shadow:0 18px 44px rgba(28,25,35,.16);pointer-events:none;z-index:20}
  .zoom-note{position:absolute;left:18px;bottom:16px;font-size:10px;color:var(--muted-2);font-weight:700;background:rgba(255,255,255,.84);border:1px solid #ececec;border-radius:var(--r-pill);padding:4px 8px}
  .brandline{font-size:var(--t-xs);font-weight:800;text-transform:uppercase;letter-spacing:.9px;color:var(--muted-2)}
  .brandline a{color:var(--violet-ink)}
  .detail{min-width:0}
  .title-summary{margin:0;padding:0}
  .title-summary p{color:var(--muted);font-size:var(--t-sm);font-weight:500;line-height:1.7;margin:0;overflow-wrap:break-word}
  .title-summary-toggle{background:transparent;border:0;color:var(--ink-2);cursor:pointer;font:inherit;font-size:var(--t-md);font-weight:800;margin-top:18px;padding:0;text-align:left}
  .title-summary-toggle:hover{color:var(--violet-ink)}
  .meta-row{display:flex;gap:18px;flex-wrap:wrap;font-size:var(--t-xs);color:var(--muted);font-weight:600;padding-bottom:18px;border-bottom:1px solid var(--line-2)}
  .meta-row b{color:var(--ink-2);font-weight:800}
  .price-block{padding:18px 0;border-bottom:1px solid var(--line-2)}
  .price-label{font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.8px;color:var(--muted-2)}
  .price{display:flex;align-items:baseline;gap:12px;margin-top:8px;flex-wrap:wrap}
  .price b{font-size:32px;font-weight:900;color:var(--peach-ink);line-height:1}
  .price s{color:var(--muted-2);font-size:var(--t-md);font-weight:600}
  .price .off{background:var(--mint);color:var(--mint-ink);border-radius:var(--r-pill);padding:4px 10px;font-size:11px;font-weight:900}
  .price-note{margin-top:8px;font-size:var(--t-xs);color:var(--muted)}
  .opt{padding:18px 0;border-bottom:1px solid var(--line-2)}
  .opt-label{font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.8px;color:var(--muted-2);margin-bottom:11px}
  .opt-label span{color:var(--ink);margin-left:6px;text-transform:none;letter-spacing:0;font-size:var(--t-sm)}
  .variant-options{display:flex;flex-wrap:wrap;gap:22px 34px;padding:18px 0;border-bottom:1px solid var(--line-2)}
  .variant-group{border:0;margin:0;min-width:0;padding:0}
  .variant-group legend{color:var(--ink);font-size:var(--t-md);font-weight:900;margin:0 0 11px;padding:0}
  .variant-values{display:flex;flex-wrap:wrap;gap:10px}
  .variant-value{background:#fff;border:1.5px solid var(--ink-2);border-radius:6px;color:var(--muted);cursor:pointer;font:inherit;font-size:var(--t-sm);font-weight:700;min-height:46px;padding:0 16px}
  .variant-value:hover{border-color:var(--rose);color:var(--ink)}
  .variant-value[aria-pressed="true"]{border-color:var(--rose);box-shadow:0 0 0 1px var(--rose);color:var(--ink)}
  .variant-value:focus-visible{outline:3px solid var(--violet-tint);outline-offset:2px}
  .qty-wrap{display:flex;align-items:center;flex-wrap:wrap}
  .qty{display:inline-flex;align-items:center;border:1.5px solid var(--line);border-radius:var(--r-pill);overflow:hidden;background:#fff}
  .qty button{width:44px;height:46px;border:0;background:none;cursor:pointer;font-size:19px;color:var(--ink-2);line-height:1}
  .qty button:hover{background:var(--cream)}
  .qty button:disabled{cursor:not-allowed;opacity:.35}
  .qty input{width:64px;height:46px;border:0;text-align:center;font-family:inherit;font-size:var(--t-md);font-weight:800;color:var(--ink);background:none;-moz-appearance:textfield}
  .qty input::-webkit-outer-spin-button,.qty input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
  .qty input:focus{outline:0}
  .moq{margin-left:14px;font-size:var(--t-xs);color:var(--muted)}
  .cta-row{display:flex;gap:10px;flex-wrap:wrap;padding:20px 0 6px}
  .cta-row .btn{flex:1;min-width:190px;padding:15px 22px}
  .cta-row .btn:disabled{cursor:not-allowed;opacity:.65}
  .cart-error{color:#a32626;font-size:var(--t-xs);font-weight:700;line-height:1.5;margin:8px 0 0}
  .avail{display:inline-flex;align-items:center;gap:8px;background:var(--amber);color:var(--amber-ink);border:1px solid #f0d89a;border-radius:var(--r-pill);padding:7px 13px;font-size:11px;font-weight:800;margin-bottom:4px}
  .avail i{width:7px;height:7px;border-radius:50%;background:var(--amber-ink);display:block}
  .avail.unavailable{background:#f7e4e4;border-color:#e8bcbc;color:#8d2828}
  .avail.unavailable i{background:#8d2828}
  .gifting{margin-top:20px;background:var(--cream);border:1px solid #e4dccd;border-radius:var(--r-md);padding:20px 22px}
  .gifting h2{font-size:11px;text-transform:uppercase;letter-spacing:.8px;color:var(--muted-2);margin-bottom:14px}
  .gifting dl{margin:0;display:grid;gap:11px}
  .gifting .row{display:flex;justify-content:space-between;gap:16px;font-size:var(--t-sm);padding-bottom:11px;border-bottom:1px solid rgba(0,0,0,.06)}
  .gifting .row:last-child{border-bottom:0;padding-bottom:0}
  .gifting dt{color:var(--muted);font-weight:600}
  .gifting dd{margin:0;font-weight:800;text-align:right}
  .gifting dd.yes{color:var(--mint-ink)}
  .product-info-sections{padding:36px 0 48px;border-top:1px solid var(--line)}
  .info-section{border-bottom:1px solid var(--line);padding:0 0 34px;margin-bottom:34px}
  .info-section:last-child{margin-bottom:0}
  .info-section h2{font-size:var(--t-xl);margin:0 0 18px}
  .spec-section h2{font-size:var(--t-2xl);margin:0 0 6px}
  .spec-sub{color:var(--muted);font-size:var(--t-sm);font-weight:500;margin:0 0 34px;line-height:1.6}
  .spec-info-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 56px}
  .spec-info-row{display:grid;grid-template-columns:minmax(170px,240px) minmax(0,1fr);gap:24px;align-items:center;border-bottom:1px solid var(--line-2);padding:20px 0;color:var(--ink-2);font-size:var(--t-sm);line-height:1.5;min-height:76px}
  .spec-info-row strong{color:var(--muted);font-weight:900}
  .spec-info-row span{font-weight:800;overflow-wrap:break-word}
  .info-description{max-width:920px;color:var(--ink-2);font-size:var(--t-md);font-weight:500;line-height:1.8}.info-description-rich p{margin:0 0 12px}.info-description-rich p:last-child{margin-bottom:0}.info-description-rich strong,.info-description-rich b{font-weight:800;color:var(--ink)}.info-description-rich ul,.info-description-rich ol{margin:0 0 12px;padding-left:20px;display:grid;gap:6px}.info-description-rich li{line-height:1.7}.info-description-rich h3,.info-description-rich h4,.info-description-rich h5{font-size:var(--t-md);margin:16px 0 8px}.info-description-rich br{line-height:1.7}
  .info-description p{margin:0}
  .info-table{display:grid;gap:0;max-width:980px}
  .info-row{display:grid;grid-template-columns:minmax(220px,340px) minmax(0,1fr);gap:42px;padding:11px 0;color:var(--ink-2);font-size:var(--t-md);line-height:1.55}
  .info-row strong{font-weight:900}
  .info-row span{font-weight:600;overflow-wrap:break-word}
  .media{padding:56px 0;border-top:1px solid var(--line)}
  .specs h2,.media h2,.download-assets h2,.product-rail h2,.related h2{font-size:var(--t-2xl);margin-bottom:6px}
  .specs .sub,.media .sub{color:var(--muted);font-size:var(--t-sm);margin-bottom:26px}
  .spec-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:0 56px}
  .spec{display:grid;grid-template-columns:200px 1fr;gap:18px;padding:14px 0;border-bottom:1px solid var(--line-2);font-size:var(--t-sm)}
  .spec dt{color:var(--muted);font-weight:700}
  .spec dd{margin:0;font-weight:600;color:var(--ink-2)}
  .aplus{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;align-items:start}
  .aplus figure{margin:0;background:#fff;border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden;cursor:zoom-in;transition:border-color .16s ease,box-shadow .16s ease}
  .aplus figure:hover{border-color:var(--violet);box-shadow:0 14px 34px rgba(31, 29, 28,.10)}
  .aplus img{width:100%;height:auto;display:block}
  .aplus video{width:100%;height:auto;display:block;background:#111}
  /* A YouTube embed has no intrinsic size, so unlike <video> it needs a
     ratio given to it or the iframe collapses to its default 150px. */
  .aplus iframe{width:100%;aspect-ratio:16/9;display:block;border:0;background:#111}
  .media-note{margin-top:18px;background:var(--cream);border:1px dashed #ddd4c6;border-radius:var(--r-md);padding:14px 18px;font-size:var(--t-sm);color:var(--muted);line-height:1.6}
  .media-note b{color:var(--ink-2)}
  .download-assets{padding:56px 0;border-top:1px solid var(--line)}
  .download-assets-list{display:grid;gap:14px;margin-top:26px}
  .download-asset{min-height:76px;border:1.5px solid var(--ink-2);border-radius:4px;background:#fff;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:16px 24px;color:var(--ink-2);transition:border-color .16s ease,box-shadow .16s ease,color .16s ease}
  .download-asset:hover{border-color:var(--violet);color:var(--violet-ink);box-shadow:0 10px 28px rgba(31, 29, 28,.08)}
  .download-asset>span{display:grid;gap:3px;min-width:0}
  .download-asset strong{font-size:var(--t-md)}
  .download-asset small{color:var(--muted);font-size:var(--t-xs);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .download-asset svg{width:28px;height:28px;flex:0 0 auto;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  .product-rail{padding:56px 0;border-top:1px solid var(--line)}.product-rail+.product-rail{padding-top:44px}
  .product-rail-heading{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:24px}
  .product-rail-heading a{color:var(--violet-ink);font-size:var(--t-sm);font-weight:800}
  .product-rail-controls{display:flex;align-items:center;gap:10px}.product-rail-controls a{margin-left:6px}.product-rail-arrow{width:38px;height:38px;border-radius:50%;border:1px solid var(--line);background:#fff;display:grid;place-items:center;cursor:pointer;color:var(--ink-2);flex:none}.product-rail-arrow:hover:not(:disabled){border-color:var(--violet);color:var(--violet)}.product-rail-arrow:disabled{opacity:.35;cursor:not-allowed}.product-rail-arrow svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.product-rail-track{display:flex;gap:18px;overflow-x:auto;scroll-snap-type:x proximity;scrollbar-width:none;-ms-overflow-style:none;padding-bottom:4px}.product-rail-track::-webkit-scrollbar{display:none}.product-rail-track>*{flex:0 0 calc((100% - 54px)/4);scroll-snap-align:start;min-width:0}
  .similar-product{min-width:0;background:#fff;border:1px solid var(--line);border-radius:var(--r-sm);overflow:hidden;transition:border-color .16s ease,box-shadow .16s ease}
  .similar-product:hover{border-color:#d7cafa;box-shadow:0 12px 30px rgba(31, 29, 28,.09)}
  .similar-product-image{aspect-ratio:1/1;background:#fff;display:grid;place-items:center;padding:18px;border-bottom:1px solid var(--line-2)}.similar-product-noimage{font-size:10px;font-weight:700;color:var(--muted-2)}
  .similar-product-image img{width:100%;height:100%;object-fit:contain}
  .similar-product-body{padding:16px 16px 18px}
  .similar-product-brand{display:block;color:var(--muted-2);font-size:10px;font-weight:900;text-transform:uppercase}
  .similar-product h3{font-size:14px;line-height:1.45;margin:7px 0 9px;min-height:2.9em;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  .similar-product h3 a:hover{color:var(--violet-ink)}
  .similar-product-rating{display:flex;align-items:center;gap:5px;color:#b35a24;font-size:var(--t-xs);margin-bottom:10px}
  .similar-product-rating svg{width:16px;height:16px;fill:#f0a31a;stroke:#d78600;stroke-width:.7}
  .similar-product-rating span{color:var(--muted)}
  .similar-product-price{display:flex;align-items:baseline;gap:9px;flex-wrap:wrap}
  .similar-product-price strong{font-size:20px;color:var(--ink)}
  .similar-product-price s{font-size:var(--t-xs);color:var(--muted-2)}
  .similar-product-discount{display:block;color:var(--mint-ink);font-size:var(--t-xs);font-weight:800;margin-top:5px}
  .related{padding:0 0 70px}
  .related h2{margin-bottom:20px}
  .rel-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  .rel{background:var(--card);border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden;transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease}
  .rel:hover{transform:translateY(-2px);border-color:#ded5ff;box-shadow:0 16px 38px rgba(31, 29, 28,.10)}
  .rel-media{aspect-ratio:1/1;background:#fff;display:grid;place-items:center;padding:14px}
  .rel-media img{width:100%;height:100%;object-fit:contain}
  .rel-body{padding:14px 16px 18px;border-top:1px solid var(--line-2);text-align:center}
  .rel-brand{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:var(--muted-2)}
  .rel h3{font-size:var(--t-sm);line-height:1.45;margin:8px 0;font-weight:700;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.9em}
  .rel b{font-size:var(--t-md);font-weight:900;color:var(--peach-ink)}
  .foot-note{margin:0 0 46px;color:var(--muted-2);font-size:11px;line-height:1.75}
  .foot-note code{background:var(--cream);border:1px solid var(--line);border-radius:5px;padding:1px 5px;font-size:10px}
  dialog.lightbox{border:0;padding:0;background:transparent;max-width:min(1000px,calc(100% - 40px));width:100%}
  dialog.lightbox::backdrop{background:rgba(25,22,34,.72);backdrop-filter:blur(3px)}
  .lb-card{background:#fff;border-radius:var(--r-lg);overflow:hidden;position:relative}
  .lb-stage{max-height:78vh;overflow:auto;display:grid;place-items:center;padding:24px;background:#fff}
  .lb-stage img{width:100%;height:auto;object-fit:contain}
  .lb-stage video{width:100%;max-height:72vh;object-fit:contain;background:#111}
  .lb-stage iframe{width:100%;aspect-ratio:16/9;max-height:72vh;border:0;background:#111}
  .lb-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;border-top:1px solid var(--line-2);font-size:var(--t-sm);font-weight:700;color:var(--ink-2)}
  .lb-nav{display:flex;gap:8px}
  .lb-nav button,.lb-close{border:1px solid var(--line);background:#fff;border-radius:var(--r-pill);min-height:38px;padding:0 15px;font-weight:800;font-size:var(--t-sm);cursor:pointer;color:var(--ink-2)}
  .lb-nav button:hover,.lb-close:hover{border-color:var(--violet);color:var(--violet-ink)}
  .lb-close{position:absolute;top:12px;right:12px;width:40px;padding:0;border-radius:50%;font-size:17px;background:#fff;z-index:2}
  @media (max-width:1120px){.rel-grid,.product-rail-track>*{flex-basis:calc((100% - 36px)/3)}}
  @media (max-width:980px){.pdp{grid-template-columns:1fr;gap:34px}.pdp-gallery{position:static}.zoom-lens,.zoom-panel{display:none}.spec-grid,.spec-info-grid{grid-template-columns:1fr;gap:0}.pdp-title-block h1{text-wrap:auto}.aplus{grid-template-columns:repeat(2,minmax(0,1fr))}.product-rail-track>*{flex-basis:calc((100% - 18px)/2)}}
  @media (max-width:720px){.product-detail-page .wrap{width:min(100% - 28px,1280px)}.pdp-gallery{grid-template-columns:1fr}.pdp-rail{flex-direction:row;max-height:none;overflow-x:auto;order:2}.pdp-thumb{width:74px}.rel-grid{grid-template-columns:repeat(2,1fr)}.info-row,.spec-info-row{grid-template-columns:1fr;gap:3px;padding:12px 0;border-bottom:1px solid var(--line-2);min-height:auto}.spec{grid-template-columns:1fr;gap:4px}.cta-row .btn{flex:1 1 100%}.moq{margin:10px 0 0;width:100%}.aplus{grid-template-columns:1fr}}
  @media (max-width:520px){.product-rail-track{gap:12px}.product-rail-track>*{flex-basis:78%}.similar-product{flex:0 0 min(76vw,280px);scroll-snap-align:start}.similar-product-image{padding:12px}.similar-product-body{padding:12px}.similar-product-price strong{font-size:17px}}
  @media (max-width:680px){.aplus{columns:1}}
`;

export function ProductDetailStyles() {
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
