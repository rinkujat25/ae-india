const styles = `
.account-page{background:var(--paper);min-height:65vh;padding-bottom:56px}.account-layout{display:grid;grid-template-columns:290px minmax(0,1fr);gap:28px;align-items:start;padding:24px 0 20px}
.account-side{background:#fff;border:1px solid var(--line);border-radius:var(--r-md);box-shadow:var(--shadow-sm);overflow:hidden;position:sticky;top:96px}.account-side-item{display:flex;align-items:center;gap:13px;width:100%;padding:17px 20px;border-bottom:1px solid var(--line-2);font-size:var(--t-md);font-weight:600;color:var(--ink-2);transition:background .15s ease,color .15s ease}.account-side-item:last-child{border-bottom:0}.account-side-item svg{width:21px;height:21px;flex:0 0 auto;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;color:var(--muted-2);transition:color .15s ease}.account-side-item:hover{background:#faf8ff;color:var(--violet)}.account-side-item:hover svg{color:var(--violet)}.account-side-item[aria-current]{background:var(--violet-tint);color:var(--violet-ink);font-weight:800;box-shadow:inset 3px 0 0 var(--violet)}.account-side-item[aria-current] svg{color:var(--violet)}.account-side-count{margin-left:auto;font-size:var(--t-xs);font-weight:800;color:var(--muted-2)}.account-side-logout{border-bottom:0;cursor:pointer;font:inherit;font-weight:700;color:var(--muted);border-top:1px solid var(--line);text-align:left}.account-side-logout:hover{background:#fff5f3;color:var(--rose)}.account-side-logout:hover svg{color:var(--rose)}.account-side-logout:disabled{opacity:.6;cursor:default}.account-side-item[aria-current] .account-side-count{color:var(--violet)}
.account-panel-head{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:22px}.account-panel-head h1{font-size:clamp(21px,2.6vw,27px);line-height:1.25;max-width:none}.account-panel-head h1 span{color:var(--muted-2);font-weight:600;white-space:nowrap}.account-btn-sm{padding:9px 16px;min-height:38px;font-size:var(--t-sm)}.account-gap{margin-top:22px}.account-note{font-size:var(--t-xs);color:var(--muted-2);line-height:1.7}.account-foot{margin-top:26px;max-width:92ch}
.account-points{position:relative;overflow:hidden;background:linear-gradient(120deg,#f7f4ff 0%,#f4f6f8 58%);border:1px solid var(--line);border-radius:var(--r-md);padding:30px 32px;display:flex;align-items:center;gap:30px;flex-wrap:wrap}.account-points:before,.account-points:after{content:"";position:absolute;border-radius:50%;background:rgba(20, 48, 90, .07)}.account-points:before{width:190px;height:190px;right:-40px;top:-70px}.account-points:after{width:120px;height:120px;right:96px;bottom:-62px}.account-points-icon{width:132px;height:132px;flex:0 0 auto;border-radius:50%;display:grid;place-items:center;background:#fff;border:2px dashed #c6b8ff;position:relative;z-index:1}.account-points-icon svg{width:56px;height:56px;fill:none;stroke:var(--violet);stroke-width:1.5;stroke-linejoin:round}.account-points-earned .account-points-icon{border-style:solid;border-color:var(--violet);background:var(--violet-tint)}.account-points-body{flex:1 1 320px;position:relative;z-index:1}.account-points-body h2{font-size:clamp(19px,2.3vw,26px);line-height:1.25;max-width:22ch}.account-points-body h2 b{color:var(--violet)}.account-points-body p{color:var(--muted);font-size:var(--t-sm);margin-top:10px}.account-points-balance{font-size:34px;font-weight:900;letter-spacing:-.02em;line-height:1;color:var(--ink)}.account-points-balance small{display:block;font-size:var(--t-sm);font-weight:700;color:var(--muted);margin-top:6px;letter-spacing:0}.account-points-rate{margin-top:16px;font-size:var(--t-lg);font-weight:800;color:var(--ink)}.account-points-cta{position:relative;z-index:1;margin-left:auto;align-self:flex-end}
.account-card{background:#fff;border:1px solid var(--line);border-radius:var(--r-md);box-shadow:var(--shadow-sm)}.account-card-top{display:flex;align-items:center;gap:14px;padding:16px 22px;border-bottom:1px solid var(--line-2)}.account-card-top h2{font-size:var(--t-lg)}.account-card-edit{margin-left:auto;display:inline-flex;align-items:center;gap:7px;font-size:var(--t-xs);font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:var(--violet)}.account-card-edit svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.account-card-edit:hover{color:var(--violet-ink)}.account-card-edit{padding:8px 10px;margin:-8px -10px;border-radius:var(--r-sm);min-height:40px}.account-card-body{padding:24px 22px}
.account-kv{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 32px;margin:0}.account-kv dt{font-size:var(--t-xs);font-weight:800;color:var(--muted-2);text-transform:uppercase;letter-spacing:.6px}.account-kv dd{margin:7px 0 0;font-size:var(--t-md);font-weight:600;word-break:break-word}
.account-tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.account-tile{background:#fff;border:1px solid var(--line);border-radius:var(--r-md);padding:18px;transition:border-color .15s ease,transform .15s ease,box-shadow .15s ease}.account-tile:hover{border-color:#ded5ff;transform:translateY(-2px);box-shadow:0 14px 32px rgba(15, 27, 45, .08)}.account-tile svg{width:22px;height:22px;fill:none;stroke:var(--violet);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.account-tile b{display:block;margin-top:12px;font-size:var(--t-md);font-weight:800}.account-tile small{display:block;margin-top:5px;color:var(--muted);font-size:var(--t-xs);line-height:1.5}
.account-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.account-field{display:flex;flex-direction:column;gap:7px}.account-field span,.account-field label{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.7px;color:var(--muted-2)}.account-field input,.account-field select{width:100%;min-width:0;max-width:100%;font-family:inherit;font-size:var(--t-md);color:var(--ink);background:#fff;border:1.5px solid var(--line);border-radius:var(--r-sm);padding:13px 14px;min-height:48px;transition:border-color .15s ease,box-shadow .15s ease}.account-field input:focus,.account-field select:focus{outline:0;border-color:var(--violet);box-shadow:0 0 0 3px var(--violet-tint)}.account-req{color:var(--rose);font-style:normal}.account-readonly{margin-top:20px}.account-readonly span{display:block;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.7px;color:var(--muted-2)}.account-readonly p{margin-top:8px;font-size:var(--t-md);font-weight:600;color:var(--ink);word-break:break-word}.account-field-block{margin-top:16px}.account-field-hint{color:var(--muted-2);font-size:var(--t-xs);line-height:1.5}.account-field-hint-live{color:var(--mint-ink);font-weight:700}.account-gstin-row{display:flex;gap:10px;align-items:stretch}.account-gstin-row input{flex:1;min-width:0}.account-gstin-row .btn{flex:0 0 auto;align-self:stretch}.account-check span{font-size:var(--t-md);font-weight:600;text-transform:none;letter-spacing:0;color:var(--ink)}.account-check{display:flex;align-items:center;gap:10px;margin-top:22px;min-height:44px;font-size:var(--t-md);font-weight:600;cursor:pointer}.account-check input{width:18px;height:18px;flex:0 0 auto;accent-color:var(--violet);cursor:pointer}.account-shipping{margin-top:22px;padding-top:22px;border-top:1px solid var(--line-2)}.account-shipping h3{font-size:var(--t-lg);margin-bottom:16px}.account-form-actions-split{display:flex;gap:12px}.account-form-actions-split .btn{flex:1}.account-field-error{color:var(--rose);font-size:var(--t-xs);font-weight:700;line-height:1.5}.account-field input[aria-invalid],.account-field select[aria-invalid]{border-color:var(--rose)}.account-field input[aria-invalid]:focus,.account-field select[aria-invalid]:focus{box-shadow:0 0 0 3px #ffe9e4}.account-status{margin-top:18px;border-radius:12px;padding:12px 14px;font-size:var(--t-sm);font-weight:700;line-height:1.5;background:var(--mint);color:var(--mint-ink);border:1px solid #b8e8d0}.account-status-error{background:#ffe9e4;color:#a8482a;border-color:#f7c9bb}.account-form-actions{margin-top:20px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}.account-form-actions .btn:disabled{opacity:.5;cursor:not-allowed}.account-form .account-note{margin-top:14px}
.addr-section+.addr-section{margin-top:34px}
.addr-section-head{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:16px}
.addr-section-head h2{font-size:clamp(18px,2.1vw,22px)}.addr-section-head h2 span{color:var(--muted-2);font-weight:700}
.addr-add-btn{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:8px 16px;border:1.5px solid var(--violet);border-radius:var(--r-pill);color:var(--violet);font-size:var(--t-sm);font-weight:800;transition:background .15s ease,color .15s ease}
.addr-add-btn:hover{background:var(--violet);color:#fff}
.addr-add-btn svg{width:18px;height:18px;flex:0 0 auto;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round}
.addr-empty{color:var(--muted);font-size:var(--t-sm);padding:18px 0}
.addr-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
.addr-card{display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden;transition:border-color .15s ease,box-shadow .15s ease}
.addr-card:hover{border-color:#ded5ff;box-shadow:var(--shadow-sm)}
.addr-card-body{flex:1;padding:22px 22px 18px}
.addr-card-body h3{font-size:var(--t-lg);margin-bottom:12px}
.addr-card-lines{font-size:var(--t-md);color:var(--ink-2);line-height:1.65}
.addr-card-gstin{margin-top:14px;font-size:var(--t-sm);color:var(--muted);letter-spacing:.2px}
.addr-card-actions{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line-2);background:#fcfbf9}
.addr-card-actions button{display:flex;align-items:center;justify-content:center;gap:9px;min-height:50px;padding:12px;border:0;background:none;font:inherit;font-size:var(--t-sm);font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--ink-2);cursor:pointer;transition:background .15s ease,color .15s ease}
.addr-card-actions button+button{border-left:1px solid var(--line-2)}
.addr-card-actions button:hover:not(:disabled){background:var(--cream)}
.addr-card-actions button:last-child:hover:not(:disabled){color:var(--rose)}
.addr-card-actions button:disabled{opacity:.45;cursor:not-allowed}
.addr-card-actions svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.addr-card-error{margin-top:12px;background:#ffe9e4;border:1px solid #f7c9bb;border-radius:10px;color:#a8482a;font-size:var(--t-xs);font-weight:700;line-height:1.5;padding:9px 11px}
.addr-confirm{border:0;padding:0;background:transparent;width:min(440px,calc(100% - 32px));color:var(--ink)}
.addr-confirm::backdrop{background:rgba(25,22,34,.55);backdrop-filter:blur(3px)}
.addr-confirm-card{background:var(--paper);border-radius:var(--r-lg);box-shadow:0 30px 70px rgba(25,22,34,.3);padding:26px}
.addr-confirm-card h2{font-size:20px;margin-bottom:12px}
.addr-confirm-card p{font-size:var(--t-sm);color:var(--ink-2);line-height:1.6}
.addr-confirm-card p b{color:var(--ink)}
.addr-confirm-note{margin-top:12px;color:var(--muted)}
.addr-confirm-actions{display:flex;gap:10px;margin-top:22px}
.addr-confirm-actions .btn{flex:1}
.btn-danger{background:var(--rose);color:#fff;border:0}
.btn-danger:hover:not(:disabled){transform:translateY(-1px)}
.btn-danger:disabled,.addr-confirm-actions .btn:disabled{opacity:.6;cursor:not-allowed}

/* ---------------- order detail ---------------- */
.order-detail-head{align-items:baseline;display:flex;gap:16px;justify-content:space-between;flex-wrap:wrap}
.order-detail-head h1{font-size:var(--t-2xl);margin:0}
.order-back{color:var(--violet-ink);font-size:var(--t-sm);font-weight:800;text-decoration:none;white-space:nowrap}
.order-back:hover{text-decoration:underline}

.order-detail .order-meta{color:var(--muted);font-size:var(--t-sm);line-height:1.6;margin:4px 0 0}
.order-detail .order-meta strong{color:var(--ink)}

.order-status{align-self:start;border-radius:var(--r-pill);display:inline-block;font-size:11px;font-weight:800;margin:10px 0 0;padding:5px 12px;text-transform:uppercase;letter-spacing:.4px}
.order-status.tone-success{background:var(--mint);color:var(--mint-ink)}
.order-status.tone-pending{background:var(--amber);color:var(--amber-ink)}
.order-status.tone-cancelled{background:#f7e4e4;color:#8d2828}
.order-status.tone-neutral{background:var(--violet-tint);color:var(--violet-ink)}

.order-columns{display:grid;gap:var(--gap);grid-template-columns:repeat(2,minmax(0,1fr));margin-top:20px}

.order-panel{background:#fff;border:1px solid var(--line);border-radius:var(--r-md);padding:20px 22px}
.order-panel h2{font-size:var(--t-lg);margin:0 0 12px}
.order-address{color:var(--muted);font-size:var(--t-sm);line-height:1.6;margin:0}
.order-address strong{color:var(--ink);display:block;margin-bottom:2px}

.order-total-panel{margin-top:var(--gap)}
.order-items{display:grid;gap:2px;list-style:none;margin:0;padding:0}
.order-item{align-items:center;border-bottom:1px solid var(--line-2);display:flex;gap:16px;padding:14px 0}
.order-item:last-child{border-bottom:0}
.order-item-media{align-items:center;background:#fff;border:1px solid var(--line-2);border-radius:var(--r-sm);display:grid;flex:0 0 auto;height:74px;overflow:hidden;padding:6px;place-items:center;width:74px}
.order-item-media img{height:100%;max-height:100%;max-width:100%;min-height:0;min-width:0;object-fit:contain;width:100%}
.order-item-body{display:grid;gap:4px;min-width:0}
.order-item-body a,.order-item-body b{color:var(--ink);font-size:var(--t-sm);font-weight:800;line-height:1.4;text-decoration:none}
.order-item-body a:hover{color:var(--violet-ink)}
.order-item-body small{color:var(--muted);font-size:var(--t-xs)}
.order-item-price{color:var(--ink);font-size:var(--t-md);font-weight:900;margin-left:auto;white-space:nowrap}

.order-sums{border-top:1px solid var(--line);display:grid;gap:10px;margin:16px 0 0;padding-top:16px}
.order-sums>div{display:flex;gap:16px;justify-content:space-between}
.order-sums dt{color:var(--muted);font-size:var(--t-sm)}
.order-sums dt small{display:block;font-size:var(--t-xs)}
.order-sums dd{color:var(--ink);font-size:var(--t-sm);font-weight:800;margin:0;white-space:nowrap}
.order-sum-total{border-top:1px solid var(--line);padding-top:12px}
.order-sum-total dt,.order-sum-total dd{color:var(--ink);font-size:var(--t-lg);font-weight:900}

.order-note{color:var(--muted);font-size:var(--t-sm);margin:16px 0 0}

@media (max-width:820px){
  .order-columns{grid-template-columns:1fr}
  .order-item{align-items:flex-start;flex-wrap:wrap}
  .order-item-price{margin-left:0;width:100%}
}

.account-order{border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden;background:#fff}
.account-order+.account-order{margin-top:16px}
.account-order-top{display:flex;align-items:center;gap:18px;flex-wrap:wrap;padding:14px 18px;background:#fffdfa;border-bottom:1px solid var(--line-2);font-size:var(--t-xs)}
.account-order-top span{color:var(--muted)}
.account-order-top b{display:block;margin-top:3px;color:var(--ink);font-size:var(--t-sm)}
.account-pill{margin-left:auto;border-radius:var(--r-pill);padding:6px 12px;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.4px;white-space:nowrap}
.account-pill-success{background:var(--mint);color:var(--mint-ink)}
.account-pill-pending{background:var(--amber);color:var(--amber-ink)}
.account-pill-cancelled{background:#ffe9e4;color:#a8482a}
.account-pill-neutral{background:var(--cream);color:var(--ink-2)}
.account-order-body{display:flex;align-items:center;gap:16px;padding:16px 18px;flex-wrap:wrap}
.account-order-thumbs{display:flex;gap:8px;flex:0 0 auto}
.account-order-thumbs span{width:56px;height:56px;border-radius:10px;border:1px solid var(--line-2);background:var(--cream);overflow:hidden;display:grid;place-items:center;font-size:var(--t-xs);color:var(--muted);font-weight:800}
.account-order-thumbs img{width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply}
.account-order-summary{flex:1;min-width:180px;font-size:var(--t-sm);color:var(--muted);line-height:1.6}
.account-order-summary b{color:var(--ink)}
.account-order-body .btn{margin-left:auto;flex:0 0 auto}
.account-order-body .btn:disabled{opacity:.5;cursor:not-allowed}
.account-referral{display:grid;grid-template-columns:1fr 1fr;gap:22px;align-items:start}.account-code{border:1.5px dashed var(--violet);background:var(--violet-tint);border-radius:var(--r-md);padding:20px;text-align:center}.account-code small{font-size:var(--t-xs);font-weight:800;text-transform:uppercase;letter-spacing:.7px;color:var(--violet-ink)}.account-code b{display:block;margin-top:10px;font-size:26px;font-weight:900;letter-spacing:3px}.account-steps{list-style:none;margin:0;padding:0;display:grid;gap:14px}.account-steps li{display:flex;gap:12px;font-size:var(--t-sm);color:var(--muted);line-height:1.6}.account-steps i{flex:0 0 auto;width:26px;height:26px;border-radius:50%;background:var(--violet-tint);color:var(--violet-ink);display:grid;place-items:center;font-size:11px;font-weight:900;font-style:normal}
.account-rewards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.account-reward{display:flex;gap:16px;border:1px solid var(--line);border-radius:var(--r-md);padding:18px;background:#fff;align-items:center}.account-reward-amount{flex:0 0 auto;width:78px;height:78px;border-radius:var(--r-sm);background:var(--violet-tint);color:var(--violet-ink);display:grid;place-items:center;text-align:center;font-weight:900;line-height:1.15;font-size:var(--t-lg)}.account-reward-amount small{display:block;font-size:9px;letter-spacing:.5px;text-transform:uppercase;margin-top:3px}.account-reward b{font-size:var(--t-md)}.account-reward p{margin-top:5px;color:var(--muted);font-size:var(--t-xs);line-height:1.55}.account-reward code{display:inline-block;margin-top:9px;background:var(--cream);border-radius:6px;padding:3px 8px;font-size:11px;font-weight:800;letter-spacing:1px}
.account-wish-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.account-wish{border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden;background:#fff;display:flex;flex-direction:column}.account-wish-media{aspect-ratio:1;background:var(--cream);display:grid;place-items:center;overflow:hidden;border-bottom:1px solid var(--line-2)}.account-wish-media img{width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply}.account-wish-body{padding:14px;display:flex;flex-direction:column;flex:1}.account-wish-brand{font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.7px;color:var(--violet)}.account-wish-body h2{font-size:var(--t-sm);font-weight:700;line-height:1.4;margin:6px 0 8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.account-wish-body h2 a:hover{color:var(--violet)}.account-wish-price{margin-top:auto;font-size:var(--t-md);font-weight:800}.account-wish-price s{color:var(--muted-2);font-size:var(--t-xs);font-weight:600;margin-left:6px}.account-wish-body .btn{margin-top:12px;width:100%}
.account-blank{text-align:center;padding:52px 22px}.account-blank-icon{width:58px;height:58px;border-radius:50%;background:var(--violet-tint);display:grid;place-items:center;margin:0 auto 16px}.account-blank-icon svg{width:24px;height:24px;fill:none;stroke:var(--violet);stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.account-blank h2{font-size:19px}.account-blank p{color:var(--muted);font-size:var(--t-sm);margin:9px auto 18px;line-height:1.6;max-width:42ch}
@media(max-width:1000px){.account-layout{grid-template-columns:1fr;gap:18px}.account-side{position:static;display:flex;flex-wrap:wrap;gap:8px;background:none;border:0;border-radius:0;box-shadow:none;overflow:visible}.account-side-item{width:auto;flex:0 0 auto;gap:8px;padding:10px 14px;border:1px solid var(--line);border-radius:var(--r-pill);background:#fff;font-size:var(--t-sm);white-space:nowrap}.account-side-item svg{width:17px;height:17px}.account-side-item[aria-current]{box-shadow:none;border-color:var(--violet);background:var(--violet-tint)}.account-side-count{margin-left:0}.account-side-logout{border-top:0;border:1px solid var(--line)}.account-tiles,.account-referral,.addr-grid{grid-template-columns:1fr}.account-wish-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:760px){.account-gstin-row{flex-wrap:wrap}.account-gstin-row .btn{width:100%}.account-form-actions-split{flex-direction:column-reverse}.account-order-top{gap:12px 18px}.account-pill{order:-1;flex:0 0 auto;margin-left:0}.account-wish-brand{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.account-panel-head{gap:12px}.account-points{padding:22px}.account-points-icon{width:96px;height:96px}.account-points-icon svg{width:42px;height:42px}.account-points-cta{margin-left:0;width:100%}.account-points-cta .btn{width:100%}.account-kv,.account-form-grid,.account-rewards{grid-template-columns:1fr}.addr-add-btn{width:100%;justify-content:center}.addr-confirm-card{padding:22px}.addr-confirm-actions{flex-direction:column-reverse}.account-order-body{gap:12px}.account-order-thumbs span{width:48px;height:48px}.account-order-body .btn{margin-left:0;width:100%}}
`;

export function AccountStyles() {
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
