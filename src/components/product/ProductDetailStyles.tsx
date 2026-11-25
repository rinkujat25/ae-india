/**
 * The product detail page, following the AE India "Product" design: a large
 * image on a grey well with thumbnails beneath, the buying column beside it,
 * a grey band of tabs, then media, downloads and the product rails.
 */
const styles = `
  .product-detail-page{background:#fff;color:var(--ink)}

  .pdp{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:48px;padding:16px 0 72px;align-items:start}

  /* ---- gallery ---- */
  .pdp-gallery{display:flex;flex-direction:column;gap:14px;position:sticky;top:160px;z-index:5;min-width:0}
  .pdp-stage{position:relative;background:var(--cream);border-radius:var(--r-lg);height:500px;display:grid;place-items:center;padding:40px;cursor:crosshair}
  .pdp-stage > img{width:100%;height:100%;min-height:0;object-fit:contain;mix-blend-mode:multiply}
  .pdp-rail{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
  .pdp-thumb{height:96px;border:2px solid transparent;border-radius:12px;background:var(--cream);padding:8px;cursor:pointer;display:grid;place-items:center;transition:border-color .15s ease}
  .pdp-thumb img{width:100%;height:100%;min-height:0;object-fit:contain;mix-blend-mode:multiply}
  .pdp-thumb:hover{border-color:#c9d3dc}
  .pdp-thumb[aria-selected="true"]{border-color:var(--ink)}
  /* More than four images wrap onto a second row of four. */
  .pdp-wish{position:absolute;top:18px;right:18px;width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:#fff;cursor:pointer;display:grid;place-items:center;padding:0;z-index:3}
  .pdp-wish svg{width:20px;height:20px;stroke:#c41445;stroke-width:1.9;fill:none}
  .pdp-wish[aria-pressed="true"] svg{fill:#c41445}
  .zoom-lens{position:absolute;width:42%;height:42%;transform:translate(-50%,-50%);border:1px solid rgba(20,48,90,.35);background:rgba(227,233,241,.45);pointer-events:none;border-radius:6px}
  .zoom-panel{position:absolute;left:calc(100% + 24px);top:0;width:clamp(420px,44vw,640px);height:100%;background-color:#fff;background-repeat:no-repeat;background-size:230% 230%;border:1px solid var(--line);border-radius:var(--r-lg);box-shadow:0 24px 60px rgba(15,27,45,.18);pointer-events:none;z-index:20}
  .zoom-note{position:absolute;left:18px;bottom:18px;font-size:12px;color:var(--ink-2);background:#fff;border-radius:6px;padding:6px 10px}

  /* ---- buying column ---- */
  .detail{min-width:0}
  .pdp-cat{font-size:14px;font-weight:600;color:var(--teal)}
  .pdp-cat:hover{text-decoration:underline}
  .detail h1{margin:8px 0 10px;font-size:clamp(28px,3.2vw,40px);line-height:1.1;letter-spacing:-.5px;color:var(--ink);overflow-wrap:break-word}
  .pdp-meta{display:flex;flex-wrap:wrap;gap:4px 0;margin:0 0 18px;font-size:14px;color:var(--muted)}
  .pdp-meta span + span::before{content:"·";padding:0 8px}
  .pdp-meta a{color:var(--violet);font-weight:600}
  .title-summary{margin:0 0 24px}
  .title-summary p{margin:0;font-size:16px;line-height:1.65;color:var(--ink-2);overflow-wrap:break-word}
  .title-summary-toggle{background:transparent;border:0;color:var(--violet);cursor:pointer;font:inherit;font-size:14px;font-weight:600;margin-top:8px;padding:0}
  .title-summary-toggle:hover{text-decoration:underline}

  .price-block{margin-bottom:24px}
  .price{display:flex;align-items:baseline;flex-wrap:wrap;gap:6px 12px;margin-bottom:6px}
  .price b{font-family:var(--font-display);font-size:34px;font-weight:700;color:var(--ink);line-height:1.1}
  .price s{color:var(--muted);font-size:16px}
  .price .off{background:var(--teal-tint);color:var(--teal);border-radius:var(--r-pill);padding:3px 10px;font-size:12px;font-weight:700}
  .price-unit{font-size:15px;color:var(--muted)}
  .price-label{font-family:var(--font-display);font-size:26px;font-weight:700;color:var(--ink);margin:0 0 6px}
  .price-note{margin:0;font-size:14px;color:var(--muted)}

  .variant-options{display:grid;gap:18px;margin-bottom:22px}
  .variant-group{border:0;margin:0;min-width:0;padding:0}
  .variant-group legend{color:var(--ink);font-size:15px;font-weight:600;margin:0 0 10px;padding:0}
  .variant-values{display:flex;flex-wrap:wrap;gap:8px}
  .variant-value{min-width:60px;min-height:46px;padding:0 16px;border:1px solid #c9d3dc;border-radius:var(--r-sm);background:#fff;color:var(--ink);font:inherit;font-size:15px;font-weight:600;cursor:pointer}
  .variant-value:hover{border-color:var(--ink)}
  .variant-value[aria-pressed="true"]{background:var(--ink);border-color:var(--ink);color:#fff}

  .avail{display:inline-flex;align-items:center;gap:8px;margin-bottom:14px;font-size:14px;font-weight:600;color:var(--teal)}
  .avail i{width:8px;height:8px;border-radius:50%;background:currentColor;display:block}
  .avail.unavailable{color:#9b2f2f}

  .cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:10px}
  .qty{display:inline-flex;align-items:center;height:52px;border:1px solid #c9d3dc;border-radius:var(--r-sm);background:#fff}
  .qty button{width:48px;height:50px;border:0;background:none;cursor:pointer;font-size:22px;color:var(--ink);line-height:1}
  .qty button:hover:not(:disabled){background:var(--cream)}
  .qty button:disabled{cursor:not-allowed;opacity:.35}
  .qty input{width:48px;height:50px;border:0;text-align:center;font:inherit;font-size:17px;font-weight:700;color:var(--ink);background:none;-moz-appearance:textfield}
  .qty input::-webkit-outer-spin-button,.qty input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
  .qty input:focus{outline:0}
  .qty:focus-within{box-shadow:0 0 0 3px rgba(20,48,90,.16)}
  .pdp-add{flex:1 1 200px;height:52px;border:0;border-radius:var(--r-sm);background:var(--teal);color:#fff;font:inherit;font-size:16px;font-weight:600;cursor:pointer}
  .pdp-add:hover:not(:disabled){background:#0b5c55}
  .pdp-add:disabled{cursor:not-allowed;opacity:.6}
  .moq{margin:0 0 10px;font-size:14px;color:var(--muted)}
  .cart-error{color:#9b2f2f;font-size:14px;font-weight:600;line-height:1.5;margin:0 0 10px}
  .pdp-quote{display:flex;align-items:center;justify-content:center;height:52px;border:1px solid var(--ink);border-radius:var(--r-sm);color:var(--ink);font-size:16px;font-weight:600;margin:4px 0 26px}
  .pdp-quote:hover{background:var(--ink);color:#fff}

  .pdp-assure{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;font-size:14px}
  .pdp-assure li{display:flex;align-items:center;gap:8px;color:var(--ink-2)}
  .pdp-assure svg{width:18px;height:18px;flex:0 0 auto;fill:none;stroke:var(--teal);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}

  .gifting{margin-top:26px;border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden}
  .gifting h2{background:var(--cream);padding:12px 18px;font-family:var(--font-body);font-size:15px;font-weight:600;letter-spacing:0;color:var(--ink);margin:0}
  .gifting dl{margin:0}
  .gifting .row{display:flex;justify-content:space-between;gap:16px;font-size:14px;padding:12px 18px;border-top:1px solid var(--line-soft)}
  .gifting dt{color:var(--muted)}
  .gifting dd{margin:0;font-weight:600;text-align:right}
  .gifting dd.yes{color:var(--teal)}

  /* ---- tabs band ---- */
  .pdp-info-band{background:var(--cream);padding:64px 0}
  .pdp-tabs{display:flex;flex-wrap:wrap;gap:4px;border-bottom:1px solid #d5dce4;margin-bottom:32px}
  .pdp-tabs button{min-height:48px;padding:0 20px;border:0;border-bottom:3px solid transparent;margin-bottom:-1px;background:none;font:inherit;font-size:16px;font-weight:600;color:var(--muted);cursor:pointer}
  .pdp-tabs button:hover{color:var(--ink)}
  .pdp-tabs button[aria-selected="true"]{color:var(--ink);border-bottom-color:var(--ink)}
  .pdp-panel{max-width:920px}
  .info-description{color:var(--ink-2);font-size:16px;line-height:1.75}.info-description p{margin:0}.info-description-rich p{margin:0 0 12px}.info-description-rich p:last-child{margin-bottom:0}.info-description-rich strong,.info-description-rich b{font-weight:600;color:var(--ink)}.info-description-rich ul,.info-description-rich ol{margin:0 0 12px;padding-left:20px;display:grid;gap:6px;list-style:revert}.info-description-rich li{line-height:1.7}.info-description-rich h3,.info-description-rich h4,.info-description-rich h5{font-size:17px;margin:16px 0 8px}
  .spec-table{max-width:720px;margin:0;background:#fff;border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden}
  .spec-table div{display:flex;gap:16px;padding:14px 20px;border-bottom:1px solid var(--line-soft);font-size:15px}
  .spec-table div:last-child{border-bottom:0}
  .spec-table dt{flex:0 0 200px;color:var(--muted)}
  .spec-table dd{margin:0;color:var(--ink);font-weight:500;min-width:0;overflow-wrap:break-word}

  .media{padding:56px 0;border-top:1px solid var(--line)}
  .media h2,.download-assets h2,.product-rail h2,.related h2{font-size:var(--t-2xl);margin-bottom:6px}
  .aplus{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;align-items:start}
  .aplus figure{margin:0;background:#fff;border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden;cursor:zoom-in;transition:border-color .16s ease,box-shadow .16s ease}
  .aplus figure:hover{border-color:var(--violet);box-shadow:0 14px 34px rgba(15, 27, 45, .10)}
  .aplus img{width:100%;height:auto;display:block}
  .aplus video{width:100%;height:auto;display:block;background:#111}
  /* A YouTube embed has no intrinsic size, so unlike <video> it needs a
     ratio given to it or the iframe collapses to its default 150px. */
  .aplus iframe{width:100%;aspect-ratio:16/9;display:block;border:0;background:#111}
  .media-note{margin-top:18px;background:var(--cream);border:1px dashed #c9d3dc;border-radius:var(--r-md);padding:14px 18px;font-size:var(--t-sm);color:var(--muted);line-height:1.6}
  .media-note b{color:var(--ink-2)}
  .download-assets{padding:56px 0;border-top:1px solid var(--line)}
  .download-assets-list{display:grid;gap:14px;margin-top:26px}
  .download-asset{min-height:72px;border:1px solid var(--line);border-radius:var(--r-md);background:#fff;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:16px 24px;color:var(--ink-2);transition:border-color .16s ease,box-shadow .16s ease,color .16s ease}
  .download-asset:hover{border-color:var(--violet);color:var(--violet-ink);box-shadow:0 10px 28px rgba(15, 27, 45, .08)}
  .download-asset>span{display:grid;gap:3px;min-width:0}
  .download-asset strong{font-size:var(--t-md)}
  .download-asset small{color:var(--muted);font-size:var(--t-xs);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .download-asset svg{width:28px;height:28px;flex:0 0 auto;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  .product-rail{padding:56px 0;border-top:1px solid var(--line)}.product-rail+.product-rail{padding-top:44px}
  .product-rail-heading{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:24px}
  .product-rail-heading a{color:var(--violet-ink);font-size:var(--t-sm);font-weight:800}
  .product-rail-controls{display:flex;align-items:center;gap:10px}.product-rail-controls a{margin-left:6px}.product-rail-arrow{width:38px;height:38px;border-radius:50%;border:1px solid var(--line);background:#fff;display:grid;place-items:center;cursor:pointer;color:var(--ink-2);flex:none}.product-rail-arrow:hover:not(:disabled){border-color:var(--violet);color:var(--violet)}.product-rail-arrow:disabled{opacity:.35;cursor:not-allowed}.product-rail-arrow svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.product-rail-track{display:flex;gap:18px;overflow-x:auto;scroll-snap-type:x proximity;scrollbar-width:none;-ms-overflow-style:none;padding-bottom:4px}.product-rail-track::-webkit-scrollbar{display:none}.product-rail-track>*{flex:0 0 calc((100% - 54px)/4);scroll-snap-align:start;min-width:0}
  .related{padding:0 0 70px}
  .related h2{margin-bottom:20px}
  .rel-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  .rel{background:var(--card);border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden;transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease}
  .rel:hover{border-color:#c9d3dc;box-shadow:0 16px 38px rgba(15, 27, 45, .10)}
  .rel-media{height:170px;background:var(--cream);display:grid;place-items:center;padding:14px}
  .rel-media img{width:100%;height:100%;min-height:0;object-fit:contain;mix-blend-mode:multiply}
  .rel-body{padding:16px;text-align:left}
  .rel-brand{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:var(--muted-2)}
  .rel h3{font-size:var(--t-sm);line-height:1.45;margin:8px 0;font-weight:700;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.9em}
  .rel b{font-size:var(--t-md);font-weight:700;color:var(--ink)}
  dialog.lightbox{border:0;padding:0;background:transparent;max-width:min(1000px,calc(100% - 40px));width:100%}
  dialog.lightbox::backdrop{background:rgba(15,27,45,.72);backdrop-filter:blur(3px)}
  .lb-card{background:#fff;border-radius:var(--r-lg);overflow:hidden;position:relative}
  .lb-stage{max-height:78vh;overflow:auto;display:grid;place-items:center;padding:24px;background:#fff}
  .lb-stage img{width:100%;height:auto;object-fit:contain}
  .lb-stage video{width:100%;max-height:72vh;object-fit:contain;background:#111}
  .lb-stage iframe{width:100%;aspect-ratio:16/9;max-height:72vh;border:0;background:#111}
  .lb-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;border-top:1px solid var(--line-2);font-size:var(--t-sm);font-weight:700;color:var(--ink-2)}
  .lb-nav{display:flex;gap:8px}
  .lb-nav button,.lb-close{border:1px solid var(--line);background:#fff;border-radius:var(--r-sm);min-height:40px;padding:0 15px;font-weight:600;font-size:var(--t-sm);cursor:pointer;color:var(--ink-2)}
  .lb-nav button:hover,.lb-close:hover{border-color:var(--violet);color:var(--violet-ink)}
  .lb-close{position:absolute;top:12px;right:12px;width:40px;padding:0;border-radius:50%;font-size:17px;background:#fff;z-index:2}
  @media (max-width:1120px){.rel-grid{grid-template-columns:repeat(3,1fr)}.product-rail-track>*{flex-basis:calc((100% - 36px)/3)}}
  @media (max-width:980px){.pdp{grid-template-columns:1fr;gap:32px}.pdp-gallery{position:static}.zoom-lens,.zoom-panel{display:none}.aplus{grid-template-columns:repeat(2,minmax(0,1fr))}.product-rail-track>*{flex-basis:calc((100% - 18px)/2)}}
  @media (max-width:640px){.pdp-stage{height:340px;padding:24px}.pdp-thumb{height:72px}.pdp-info-band{padding:44px 0}.pdp-tabs button{padding:0 14px;font-size:15px}.spec-table div{flex-direction:column;gap:2px}.spec-table dt{flex:none}.rel-grid{grid-template-columns:repeat(2,1fr)}.aplus{grid-template-columns:1fr}}
  @media (max-width:520px){.product-rail-track{gap:12px}.product-rail-track>*{flex-basis:78%}}
`;

export function ProductDetailStyles() {
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
