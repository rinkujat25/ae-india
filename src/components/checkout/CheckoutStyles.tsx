const styles = `
.co-page{background:var(--paper);min-height:100vh;display:flex;flex-direction:column}
.co-bar{background:#fff;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20}
.co-bar-inner{width:min(1440px,calc(100% - 44px));margin:auto;height:74px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:16px}
.co-back{display:inline-flex;align-items:center;gap:12px;border:0;background:none;font:inherit;font-size:var(--t-sm);font-weight:800;letter-spacing:.6px;text-transform:uppercase;color:var(--ink);cursor:pointer;padding:6px 0}
.co-back:hover{color:var(--violet)}
.co-back svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.co-brand{justify-self:center}
.co-brand img{height:44px}
.co-secure{justify-self:end;display:inline-flex;align-items:center;gap:11px;color:var(--muted-2);font-size:var(--t-sm)}
.co-secure svg{width:34px;height:34px;fill:none;stroke:var(--mint-ink);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}

.co-shell{width:min(1440px,calc(100% - 44px));margin:26px auto 48px;border:1px solid var(--line);border-radius:var(--r-md);background:#fff;box-shadow:var(--shadow-sm);display:grid;grid-template-columns:minmax(0,1fr) 420px;align-items:start}
.co-main{padding:26px;display:grid;gap:22px;min-width:0}
.co-aside{padding:26px;border-left:1px solid var(--line);position:sticky;top:100px;min-width:0}

.co-panel{border:1px solid var(--line);border-radius:var(--r-sm);background:#fff}
.cart-load-error{background:#f7e4e4;border:1px solid #e8bcbc;border-radius:var(--r-sm);color:#8d2828;font-size:var(--t-sm);font-weight:700;padding:12px 14px;margin:0}
.co-coupon{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;background:var(--cream);padding:18px 20px}
.co-coupon-label{display:flex;align-items:center;gap:13px;min-width:0}
.co-coupon-label svg{width:26px;height:26px;flex:none;fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.co-coupon-label b{display:block;font-size:var(--t-lg)}
.co-coupon-label small{display:block;color:var(--muted);font-size:var(--t-xs);margin-top:3px}
.co-coupon-form{display:flex;min-width:min(100%,380px);flex:1 1 300px;max-width:490px}
.co-coupon-form input{flex:1;min-width:0;height:48px;border:1px solid var(--line);border-right:0;border-radius:var(--r-sm) 0 0 var(--r-sm);padding:0 15px;font:inherit;font-size:var(--t-sm);background:#fff;text-transform:uppercase}
.co-coupon-form input::placeholder{letter-spacing:.4px;color:var(--muted-2)}
.co-coupon-form button{height:48px;padding:0 30px;border:0;border-radius:0 var(--r-sm) var(--r-sm) 0;background:var(--violet);color:#fff;font:inherit;font-weight:800;cursor:pointer}
.co-coupon-form button:hover{background:var(--violet-ink)}
.co-coupon-form button:disabled{opacity:.55;cursor:not-allowed}
.co-coupon-note{flex-basis:100%;margin:0;font-size:var(--t-xs);color:var(--muted)}
.co-coupon-note[data-tone="error"]{color:var(--rose);font-weight:700}

.co-section-head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 22px;flex-wrap:wrap}
.co-section-head h2{font-size:22px}
.co-add{display:inline-flex;align-items:center;gap:5px;color:var(--violet);font-size:var(--t-md);font-weight:800}
.co-add:hover{color:var(--violet-ink)}

.co-addr-list{display:grid;gap:0;border-top:1px solid var(--line-2)}
.co-addr{border:2px solid transparent;border-top:1px solid var(--line-2);position:relative}
.co-addr:first-child{border-top-color:transparent}
.co-addr[data-selected="true"]{border-color:var(--violet);border-radius:var(--r-sm);margin:-1px 14px 14px;box-shadow:0 0 0 4px var(--violet-tint)}
.co-addr-pick{display:grid;grid-template-columns:26px minmax(0,1fr);gap:14px;width:100%;text-align:left;border:0;background:none;font:inherit;color:inherit;padding:18px 20px;cursor:pointer}
.co-addr-pick:hover{background:#fffdfa}
.co-addr[data-selected="true"] .co-addr-pick:hover{background:none}
.co-addr-tick{width:26px;height:26px;border-radius:50%;border:2px solid var(--line);display:grid;place-items:center;margin-top:2px}
.co-addr-tick svg{width:15px;height:15px;fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;opacity:0}
.co-addr[data-selected="true"] .co-addr-tick{background:var(--mint-ink);border-color:var(--mint-ink)}
.co-addr[data-selected="true"] .co-addr-tick svg{opacity:1}
.co-addr-name{display:block;font-size:var(--t-lg);font-weight:800;margin-bottom:9px}
.co-addr-lines{display:block;color:var(--ink-2);font-size:var(--t-sm);line-height:1.75}
.co-addr-gstin{display:block;color:var(--muted);font-size:var(--t-sm);margin-top:12px}
.co-addr-actions{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line-2);background:#fbf9f5}
.co-addr-actions button{display:flex;align-items:center;justify-content:center;gap:9px;height:52px;border:0;background:none;font:inherit;font-size:var(--t-sm);font-weight:800;letter-spacing:.5px;text-transform:uppercase;color:var(--ink-2);cursor:pointer}
.co-addr-actions button+button{border-left:1px solid var(--line-2)}
.co-addr-actions button:hover:not(:disabled){background:var(--cream)}
.co-addr-actions button:disabled{color:var(--muted-2);cursor:not-allowed}
.co-addr-actions button:last-child:hover:not(:disabled){color:var(--rose)}
.co-addr-actions svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.co-addr-error{color:var(--rose);font-size:var(--t-xs);font-weight:700;padding:0 20px 14px}
.co-addr-more{display:block;margin-left:auto;border:0;background:none;font:inherit;font-size:var(--t-sm);font-weight:700;color:var(--ink-2);padding:16px 22px;cursor:pointer}
.co-addr-more:hover{color:var(--violet)}
.co-addr-empty{padding:30px 22px 34px;border-top:1px solid var(--line-2);color:var(--muted);font-size:var(--t-sm);line-height:1.7}
.co-addr-empty a{color:var(--violet);font-weight:800}

.co-next{display:flex;align-items:center;justify-content:space-between;gap:22px;flex-wrap:wrap;background:var(--cream);padding:20px 22px}
.co-next b{display:block;font-size:var(--t-lg)}
.co-next small{display:block;color:var(--muted);font-size:var(--t-sm);margin-top:5px}
.co-next>div{flex:1 1 240px;min-width:0}
.co-next .btn{flex:0 1 340px;min-width:190px}
.co-next .btn:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}
.co-next .btn-primary{background:var(--violet);height:56px;font-size:var(--t-lg)}
.co-next .btn-primary:hover:not(:disabled){box-shadow:0 12px 26px rgba(20, 48, 90, .28)}
.btn-danger{background:var(--rose);color:#fff;border:0}
.btn-danger:hover:not(:disabled){transform:translateY(-1px)}
.co-confirm-actions .btn:disabled{opacity:.6;cursor:not-allowed}

.co-steps{display:flex;gap:7px;flex-wrap:wrap;list-style:none;margin:0 0 10px;padding:0}
.co-steps li{display:flex;align-items:center;gap:7px;font-size:11px;font-weight:800;letter-spacing:.2px;color:var(--muted-2)}
.co-steps li::before{content:attr(data-index);width:20px;height:20px;flex:none;border-radius:50%;border:1.5px solid var(--line);display:grid;place-items:center;font-size:11px}
.co-steps li+li::after{content:"";order:-1;width:14px;height:1.5px;background:var(--line)}
.co-steps li[data-state="current"]{color:var(--ink)}
.co-steps li[data-state="current"]::before{border-color:var(--violet);background:var(--violet);color:#fff}
.co-steps li[data-state="done"]{color:var(--mint-ink)}
.co-steps li[data-state="done"]::before{border-color:var(--mint-ink);background:var(--mint-ink);color:#fff;content:"✓"}

.co-summary h2{font-size:22px;padding-bottom:18px;border-bottom:1px solid var(--line)}
.co-line{display:grid;grid-template-columns:72px minmax(0,1fr) auto;gap:16px;padding:18px 0;border-bottom:1px solid var(--line-2);align-items:start}
.co-line-media{width:72px;height:72px;border:1px solid var(--line-2);border-radius:var(--r-sm);background:var(--cream);display:grid;place-items:center;overflow:hidden}
.co-line-media img{width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply}
.co-line-media span{font-size:9px;color:var(--muted-2);text-align:center;padding:4px}
.co-line-name{font-size:var(--t-sm);font-weight:700;line-height:1.5}
.co-line-name a:hover{color:var(--violet)}
.co-line-qty{color:var(--muted);font-size:var(--t-sm);margin-top:9px}
.co-line-unit{font-size:var(--t-sm);margin-top:5px;color:var(--muted)}
.co-line-unit b{color:var(--rose);font-weight:700}
.co-line-amount{font-size:var(--t-lg);font-weight:700;white-space:nowrap}
.co-total{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;padding:18px 0;border-bottom:1px solid var(--line-2)}
.co-total small{display:block;color:var(--muted-2);font-size:var(--t-xs);margin-top:4px}
.co-total b{font-size:var(--t-lg);white-space:nowrap}
.co-total-grand{border-bottom:0}
.co-points{background:var(--amber);border-radius:var(--r-sm);padding:14px 16px;margin-top:16px}
.co-points b{display:block;font-size:var(--t-md);color:var(--amber-ink)}
.co-points span{display:block;color:var(--ink-2);font-size:var(--t-xs);line-height:1.55;margin-top:4px}
.co-points small{display:block;color:var(--muted);font-size:11px;line-height:1.5;margin-top:7px}
.co-total-grand>div>span{font-size:20px;font-weight:800}
.co-total-grand b{font-size:24px}

.co-pay-head h2{display:flex;align-items:center;gap:12px}
.co-pay-head svg{width:27px;height:27px;flex:none;fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.co-pay{padding:20px 22px 22px;border-top:1px solid var(--line-2);display:grid;gap:18px}
.co-pay-modes{display:grid;gap:10px}
.co-pay-mode{display:grid;grid-template-columns:22px minmax(0,1fr);gap:14px;align-items:start;width:100%;text-align:left;font:inherit;color:inherit;cursor:pointer;padding:16px 18px;border:1.5px dashed var(--line);border-radius:var(--r-sm);background:#fbf9f5}
.co-pay-mode:hover:not(:disabled){border-color:var(--violet-2)}
.co-pay-mode:disabled{cursor:not-allowed;opacity:.55}
.co-pay-mode[data-selected="true"]{border-style:dashed;border-color:var(--violet);background:var(--violet-tint)}
.co-pay-dot{width:22px;height:22px;border-radius:50%;border:2px solid var(--muted-2);display:block;margin-top:1px;position:relative}
.co-pay-mode[data-selected="true"] .co-pay-dot{border-color:var(--ink)}
.co-pay-mode[data-selected="true"] .co-pay-dot::after{content:"";position:absolute;inset:3px;border-radius:50%;background:var(--ink)}
.co-pay-mode b{display:block;font-size:var(--t-lg)}
.co-pay-mode small{display:block;color:var(--muted);font-size:var(--t-xs);margin-top:5px}
.co-pay-note{display:flex;align-items:center;gap:14px;border:1px solid var(--line);border-radius:var(--r-sm);padding:15px 18px;font-size:var(--t-sm);font-weight:700;color:var(--ink-2);line-height:1.55}
.co-pay-note svg{width:22px;height:22px;flex:none;fill:none;stroke:var(--ink);stroke-width:1.7;stroke-linecap:round}
.co-pay-addresses{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px}
.co-pay-addresses h3{font-size:var(--t-lg);margin-bottom:10px}
.co-pay-addresses p{color:var(--ink-2);font-size:var(--t-sm);line-height:1.7}
.co-pay-blocked{color:var(--muted);font-size:var(--t-sm);line-height:1.7;background:var(--cream);border-radius:var(--r-sm);padding:16px 18px}

.co-review{padding:0 22px 22px;display:grid;gap:18px;border-top:1px solid var(--line-2);padding-top:20px}
.co-review-addresses{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.co-review-block{border:1px solid var(--line);border-radius:var(--r-sm);padding:16px}
.co-review-block-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:11px}
.co-review-block-head h3{font-size:var(--t-xs);font-weight:900;letter-spacing:.7px;text-transform:uppercase;color:var(--muted)}
.co-review-block-head button{border:0;background:none;font:inherit;font-size:var(--t-xs);font-weight:800;color:var(--violet);cursor:pointer}
.co-review-block-head button:hover{color:var(--violet-ink)}
.co-review-block-head b{font-size:var(--t-md)}
.co-review-block>b{display:block;font-size:var(--t-md);margin-bottom:6px}
.co-review-block p{color:var(--ink-2);font-size:var(--t-sm);line-height:1.65}
.co-review-gstin,.co-review-missing{color:var(--muted)!important;margin-top:8px}
.co-review-items{border:1px solid var(--line);border-radius:var(--r-sm);padding:16px}
.co-review-items ul{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.co-review-items li{display:flex;align-items:baseline;justify-content:space-between;gap:16px;font-size:var(--t-sm);color:var(--ink-2)}
.co-review-items li small{color:var(--muted)}
.co-review-items li b{white-space:nowrap}

.co-confirm{border:0;padding:0;background:none;max-width:min(430px,calc(100% - 28px))}
.co-confirm::backdrop{background:rgba(25,22,34,.55)}
.co-confirm-card{background:#fff;border-radius:var(--r-md);padding:24px;text-align:left}
.co-confirm-card h2{font-size:var(--t-lg)}
.co-confirm-card p{color:var(--ink-2);font-size:var(--t-sm);line-height:1.65;margin-top:12px}
.co-confirm-note{color:var(--muted)!important;font-size:var(--t-xs)!important}
.co-confirm-actions{display:flex;gap:10px;margin-top:20px}
.co-confirm-actions .btn{flex:1}

.co-success-page{display:grid;place-items:center;padding:24px 0}
.co-success{background:#fff;border:1px solid var(--line);border-radius:var(--r-md);box-shadow:var(--shadow-sm);text-align:center;padding:56px 40px;width:min(660px,calc(100% - 32px))}
.co-success-tick{width:88px;height:88px;border-radius:50%;background:var(--mint-ink);display:grid;place-items:center;margin:0 auto 30px;outline:2px dashed #b9e7d0;outline-offset:5px}
.co-success-tick svg{width:38px;height:38px;fill:none;stroke:#fff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.co-success h1{font-size:26px;line-height:1.45;max-width:none}
.co-success h1 span{display:block;font-weight:700}
.co-success-facts{display:flex;justify-content:center;gap:34px;flex-wrap:wrap;margin-top:26px}
.co-success-facts dt{font-size:var(--t-xs);font-weight:900;letter-spacing:.6px;text-transform:uppercase;color:var(--muted)}
.co-success-facts dd{font-size:var(--t-lg);font-weight:800;margin-top:5px}
.co-success-cta{margin-top:32px;min-width:min(340px,100%)}

.co-empty{text-align:center;padding:80px 26px;width:min(620px,calc(100% - 40px));margin:26px auto}
.co-empty h1{font-size:26px;max-width:none}
.co-empty p{color:var(--muted);font-size:var(--t-sm);line-height:1.7;max-width:46ch;margin:12px auto 24px}

@media(max-width:1180px){
.co-shell{grid-template-columns:1fr}
.co-aside{position:static;border-left:0;border-top:1px solid var(--line)}
.co-next .btn{min-width:0}
}
@media(max-width:760px){
.co-bar-inner,.co-shell{width:min(100% - 24px,1440px)}
.co-bar-inner{height:64px;gap:10px}
.co-secure span{display:none}
.co-back span{display:none}
.co-main,.co-aside{padding:18px}
.co-coupon,.co-next{padding:16px}
.co-coupon-form{min-width:100%}
.co-section-head{padding:16px}
.co-section-head h2{font-size:19px}
.co-addr-pick{padding:16px;grid-template-columns:24px minmax(0,1fr);gap:11px}
.co-addr[data-selected="true"]{margin:-1px 8px 10px}
.co-line{grid-template-columns:60px minmax(0,1fr) auto;gap:12px}
.co-success{padding:40px 20px}
.co-success-facts{gap:20px}
.co-review{padding:0 16px 16px;padding-top:16px}
.co-pay{padding:16px}
.co-line-media{width:60px;height:60px}
}
`;

export function CheckoutStyles() {
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
