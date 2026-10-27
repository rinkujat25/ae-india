const styles = `
.cat-page{background:var(--paper);padding-bottom:64px;min-height:70vh}
.cat-head{display:flex;align-items:flex-start;justify-content:space-between;gap:28px;flex-wrap:wrap;padding:22px 0 24px;border-bottom:1px solid var(--line)}
.cat-head h1{font-size:clamp(28px,3.4vw,38px);max-width:none}
.cat-lede{color:var(--muted);font-size:var(--t-md);line-height:1.7;max-width:60ch;margin-top:10px}
.cat-stats{display:flex;gap:14px;flex-wrap:wrap}
.cat-stats div{border:1px solid var(--line);border-radius:var(--r-sm);background:#fff;padding:12px 18px;min-width:106px}
.cat-stats b{display:block;font-size:22px;line-height:1.2}
.cat-stats span{color:var(--muted);font-size:var(--t-xs)}

.cat-toolbar{display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding:20px 0}
.cat-tlabel{color:var(--muted);font-size:var(--t-xs);font-weight:800;text-transform:uppercase;letter-spacing:.6px}
.cat-views{display:inline-flex;border:1px solid var(--line);border-radius:var(--r-sm);overflow:hidden;background:#fff}
.cat-vbtn{width:40px;height:38px;border:0;background:none;display:grid;place-items:center;cursor:pointer;color:var(--muted)}
.cat-vbtn+.cat-vbtn{border-left:1px solid var(--line)}
.cat-vbtn:hover{color:var(--ink)}
.cat-vbtn[aria-pressed="true"]{background:var(--violet-tint);color:var(--violet)}
.cat-vbtn svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round}
.cat-count{color:var(--muted);font-size:var(--t-sm)}
.cat-sortwrap{display:flex;align-items:center;gap:10px;margin-left:auto}
.cat-sortwrap select{font:inherit;font-size:var(--t-sm);border:1px solid var(--line);border-radius:var(--r-sm);background:#fff;padding:9px 12px;min-height:38px;min-width:0;max-width:210px}

.cat-subs{display:flex;gap:9px;flex-wrap:wrap;padding-bottom:22px}
.cat-sub{border:1px solid var(--line);border-radius:var(--r-pill,999px);background:#fff;padding:8px 14px;font:inherit;font-size:var(--t-sm);font-weight:700;color:var(--ink-2);cursor:pointer}
.cat-sub span{color:var(--muted-2);font-weight:700;margin-left:4px}
.cat-sub:hover{border-color:var(--violet-2)}
.cat-sub[aria-current="page"]{background:var(--ink);border-color:var(--ink);color:#fff}
.cat-sub[aria-current="page"] span{color:rgba(255,255,255,.7)}

.cat-grid{display:grid;gap:18px}
.cat-grid.cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}
.cat-grid.cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
.cat-grid.list{grid-template-columns:1fr}
.cat-grid.list .p-card{display:grid;grid-template-columns:180px minmax(0,1fr)}
.cat-grid.list .p-link{display:grid;grid-template-columns:180px minmax(0,1fr);align-items:center}
.cat-grid.list .p-media{aspect-ratio:auto;height:100%;min-height:150px;border-bottom:0;border-right:1px solid var(--line-2)}
.cat-grid.list .p-body{padding-left:22px}

.cat-more{display:flex;justify-content:center;padding:30px 0 0}
.cat-empty{text-align:center;padding:54px 24px;border:1px solid var(--line);border-radius:var(--r-md);background:#fff}
.cat-empty b{font-size:var(--t-lg)}
.cat-empty p{color:var(--muted);font-size:var(--t-sm);line-height:1.65;margin:10px 0 20px}
.cat-empty-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.cat-unavailable{margin-top:22px}

.cat-siblings{padding-top:54px;margin-top:44px;border-top:1px solid var(--line)}
.cat-siblings h2{font-size:var(--t-xl);margin-bottom:18px}
.cat-sib-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}
.cat-sib{border:1px solid var(--line);border-radius:var(--r-md);background:#fff;padding:18px}
.cat-sib:hover{border-color:var(--violet);transform:translateY(-1px)}
.cat-sib b{display:block;font-size:var(--t-md)}
.cat-sib span{display:block;color:var(--muted);font-size:var(--t-xs);line-height:1.55;margin-top:6px}

@media(max-width:1120px){.cat-grid.cols-4{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:860px){
.cat-grid.cols-4,.cat-grid.cols-3{grid-template-columns:repeat(2,minmax(0,1fr))}
.cat-sortwrap{margin-left:0;width:100%}
.cat-grid.list .p-card,.cat-grid.list .p-link{grid-template-columns:120px minmax(0,1fr)}
.cat-grid.list .p-media{min-height:120px}
}
@media(max-width:520px){
.cat-grid.cols-4,.cat-grid.cols-3{grid-template-columns:1fr}
.cat-head{gap:18px}
}
`;

export function CategoryStyles() {
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
