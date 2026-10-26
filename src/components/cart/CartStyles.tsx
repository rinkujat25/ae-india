const styles = `
.cart-page{background:var(--paper);min-height:65vh;padding-bottom:56px}.cart-wrap{width:min(1280px,calc(100% - 40px));margin:auto}.cart-head{padding:22px 0 20px}.cart-head h1{font-size:clamp(26px,3.2vw,34px)}.cart-head p{color:var(--muted);margin-top:10px;font-size:var(--t-sm);max-width:62ch;line-height:1.6}.cart-back{display:inline-block;margin-top:8px;color:var(--muted);font-size:var(--t-sm);font-weight:700}.cart-load-error{background:#f7e4e4;border:1px solid #e8bcbc;border-radius:var(--r-sm);color:#8d2828;font-size:var(--t-sm);font-weight:700;margin:0 0 18px;padding:12px 14px}.cart-grid{display:grid;grid-template-columns:minmax(0,1fr) 372px;gap:26px;align-items:start}.cart-lines,.cart-summary,.cart-empty{background:#fff;border:1px solid var(--line);border-radius:var(--r-md);box-shadow:var(--shadow-sm)}.cart-lines{overflow:hidden}.cart-lines-top{display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid var(--line-2);background:#fffdfa;font-size:var(--t-sm)}.cart-lines-top span{color:var(--muted)}.cart-lines-top button{margin-left:auto;border:0;background:none;color:var(--muted);font:inherit;font-weight:700;cursor:pointer}.cart-lines-top button:hover,.cart-remove:hover{color:var(--rose)}
.cart-line{display:grid;grid-template-columns:132px minmax(0,1fr);gap:22px;padding:22px;border-bottom:1px solid var(--line-2)}.cart-line-media{width:132px;height:132px;border:1px solid var(--line-2);border-radius:var(--r-sm);background:var(--cream);display:grid;place-items:center;overflow:hidden}.cart-line-media img{width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply}.cart-line-media span{font-size:10px;color:var(--muted-2)}.cart-line-brand{font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.8px;color:var(--violet)}.cart-line-body h2{font-size:var(--t-lg);line-height:1.35;margin:6px 0 8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.cart-line-body h2 a:hover{color:var(--violet)}.cart-variant{font-size:var(--t-xs);color:var(--muted);margin-bottom:10px}.cart-line-price{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}.cart-line-price>b{font-size:20px}.cart-line-price span{font-size:var(--t-sm);color:var(--muted)}.cart-subtotal{margin-top:6px;font-size:var(--t-sm);color:var(--muted)}.cart-subtotal b{color:var(--ink)}.cart-line-actions{display:flex;align-items:center;gap:18px;margin-top:16px;flex-wrap:wrap}.cart-qty{display:inline-flex;border:1.5px solid var(--line);border-radius:var(--r-sm);overflow:hidden}.cart-qty button{width:40px;height:44px;border:0;background:#fff;cursor:pointer;font-size:18px}.cart-qty button:hover{background:var(--cream)}.cart-qty button:disabled{opacity:.3}.cart-qty input{width:54px;height:44px;border:0;text-align:center;font:inherit;font-weight:800;-moz-appearance:textfield}.cart-qty input::-webkit-inner-spin-button{display:none}.cart-remove{margin-left:auto;border:0;background:none;color:var(--muted);font:inherit;font-size:var(--t-sm);font-weight:800;text-transform:uppercase;display:flex;align-items:center;gap:7px;cursor:pointer}.cart-remove svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.cart-saved{margin-top:14px;color:var(--ink-2);font-size:var(--t-sm)}.cart-saved b{color:var(--violet);margin-left:6px}.cart-lines-foot{padding:16px 20px;background:#fffdfa}.cart-lines-foot a{color:var(--violet);font-size:var(--t-sm);font-weight:700}
.cart-summary{position:sticky;top:96px;padding:22px}.cart-summary h2{font-size:var(--t-lg)}.cart-summary-row{display:flex;justify-content:space-between;gap:14px;padding:11px 0;border-bottom:1px dashed var(--line-2);font-size:var(--t-sm)}.cart-summary-row:first-of-type{margin-top:14px}.cart-summary-row span{color:var(--muted)}.cart-summary-row small{display:block;font-size:11px;color:var(--muted-2);margin-top:2px}.cart-summary-saved b{color:var(--mint-ink)}.cart-summary-total{display:flex;justify-content:space-between;align-items:baseline;padding-top:16px;margin-top:16px;border-top:1.5px solid var(--line)}.cart-summary-total b{font-size:24px}.cart-summary-note,.cart-quote-hint{color:var(--muted-2);font-size:11px;line-height:1.55;margin-top:8px}.cart-summary .btn{width:100%;margin-top:16px}.cart-summary .btn-soft{margin-top:9px}.cart-summary ul{border-top:1px solid var(--line-2);display:grid;gap:10px;margin-top:18px;padding-top:16px}.cart-summary li{color:var(--muted);font-size:var(--t-xs);line-height:1.5}.cart-empty{text-align:center;padding:64px 26px}.cart-empty-icon{width:62px;height:62px;border-radius:50%;background:var(--violet-tint);display:grid;place-items:center;margin:0 auto 20px}.cart-empty-icon svg{width:26px;height:26px;fill:none;stroke:var(--violet);stroke-width:1.7}.cart-empty h2{font-size:22px}.cart-empty p{color:var(--muted);font-size:var(--t-sm);line-height:1.65;max-width:46ch;margin:10px auto 22px}
@media(max-width:1180px){.cart-grid{grid-template-columns:1fr}.cart-summary{position:static}}@media(max-width:760px){.cart-wrap{width:min(100% - 28px,1280px)}.cart-line{grid-template-columns:92px minmax(0,1fr);gap:14px;padding:16px}.cart-line-media{width:92px;height:92px}.cart-line-body h2{font-size:var(--t-md)}.cart-remove{margin-left:0}.cart-summary{padding:20px}}

.q-modal{border:0;padding:0;background:transparent;width:min(720px,calc(100% - 32px));max-height:calc(100dvh - 48px);color:var(--ink)}
.q-modal::backdrop{background:rgba(25,22,34,.55)}
.q-card{background:var(--paper);border-radius:var(--r-md);box-shadow:0 40px 90px rgba(25,22,34,.35);position:relative;max-height:calc(100dvh - 48px);display:flex;flex-direction:column;overflow:hidden}
.q-close{position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:50%;border:1px solid var(--line);background:#fff;display:grid;place-items:center;cursor:pointer;z-index:2}
.q-close svg{width:16px;height:16px;fill:none;stroke:var(--ink-2);stroke-width:2;stroke-linecap:round}
.q-close:hover{border-color:#d5ccbe}
.q-head{padding:28px 30px 18px;border-bottom:1px solid var(--line);flex:0 0 auto}
.q-kicker{font-size:var(--t-xs);text-transform:uppercase;letter-spacing:1.4px;color:var(--violet);font-weight:800}
.q-head h2{font-size:clamp(21px,2.6vw,27px);line-height:1.15;margin:10px 0 8px;padding-right:44px;max-width:none}
.q-head p{color:var(--muted);font-size:var(--t-sm);line-height:1.65;max-width:54ch}
.q-body{padding:24px 30px 30px;overflow:auto}
.q-cart{background:var(--card);border:1px solid var(--line);border-radius:var(--r-sm);padding:6px 16px;margin-bottom:22px}
.q-cart-line{display:flex;justify-content:space-between;gap:13px;align-items:center;padding:11px 0;border-bottom:1px dashed var(--line-2);font-size:var(--t-sm)}
.q-cart-line:last-of-type{border-bottom:0}
.q-cart-text{flex:1;min-width:0}
.q-cart-line small{display:block;color:var(--muted);font-size:var(--t-xs);margin-top:3px}
.q-thumb{width:44px;height:44px;flex:0 0 auto;border-radius:9px;border:1px solid var(--line-2);background:var(--cream);overflow:hidden;display:grid;place-items:center}
.q-thumb img{width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply}
.q-thumb span{font-size:8px;color:var(--muted-2);font-weight:700;text-align:center;line-height:1.2}
.q-cart-line b{white-space:nowrap}
.q-cart-total{display:flex;justify-content:space-between;gap:16px;align-items:baseline;padding:13px 0;font-size:var(--t-sm)}
.q-cart-total span{color:var(--muted)}
.q-cart-total b{font-size:var(--t-lg)}
.q-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.q-field{display:flex;flex-direction:column;gap:7px;min-width:0}
.q-wide{grid-column:1/-1}
.q-field label,.q-group-label{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.7px;color:var(--muted-2)}
.q-req{color:var(--violet)}
.q-field input,.q-field select,.q-field textarea{font-family:inherit;font-size:var(--t-md);color:var(--ink);background:#fff;border:1.5px solid var(--line);border-radius:var(--r-sm);padding:13px 14px;min-height:48px;width:100%;min-width:0}
.q-field textarea{min-height:82px;resize:vertical;line-height:1.6}
.q-field input:focus,.q-field select:focus,.q-field textarea:focus{outline:0;border-color:var(--violet);box-shadow:0 0 0 3px var(--violet-tint)}
.q-field input[aria-invalid="true"],.q-field textarea[aria-invalid="true"]{border-color:var(--rose)}
.q-field-error{color:var(--rose);font-size:12px;font-weight:700}
.q-radio-row{display:flex;gap:10px;flex-wrap:wrap}
.q-radio{border:1.5px solid var(--line);border-radius:var(--r-sm);padding:12px;cursor:pointer;background:#fff;display:flex;gap:9px;align-items:center;font-size:var(--t-sm);font-weight:600;color:var(--ink-2);text-transform:none;letter-spacing:0}
.q-radio input{appearance:none;width:16px;height:16px;min-height:0;padding:0;border-radius:50%;border:1.5px solid #d6cfc4;flex:0 0 auto;background:#fff}
.q-radio input:checked{border-color:var(--violet);border-width:5px}
.q-radio:has(input:checked){border-color:var(--violet);background:#faf8ff}
.q-form-error{background:#f7e4e4;border:1px solid #e8bcbc;border-radius:var(--r-sm);color:#8d2828;font-size:var(--t-sm);font-weight:700;padding:12px 14px;margin-top:18px}
.q-submit{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:22px}
.q-submit .btn{min-width:220px}
.q-note{color:var(--muted-2);font-size:11px;line-height:1.55;flex:1 1 200px}
.q-done{text-align:center;padding:26px 0 10px}
.q-done-ico{width:62px;height:62px;border-radius:50%;background:var(--mint);display:grid;place-items:center;margin:0 auto 18px}
.q-done-ico svg{width:26px;height:26px;fill:none;stroke:var(--mint-ink);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.q-done h3{font-size:21px}
.q-done p{color:var(--muted);font-size:var(--t-sm);line-height:1.65;max-width:46ch;margin:10px auto 20px}
@media(max-width:760px){
.q-modal{width:100%;max-width:100%;max-height:92dvh;margin:auto 0 0}
.q-head{padding:22px 18px 16px}
.q-body{padding:18px}
.q-grid{grid-template-columns:1fr}
.q-submit .btn{min-width:100%}
}
`;
export function CartStyles(){return <style dangerouslySetInnerHTML={{__html:styles}}/>}
