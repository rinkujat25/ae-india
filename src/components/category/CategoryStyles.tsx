/**
 * The category page below its banner: toolbar, sub-category chips, grid and
 * the empty and unavailable states. The banner and the category chips above
 * are `.shop-banner` in `globals.css`, shared with `/products`.
 */
const styles = `
.cat-page{background:#fff;padding:12px 0 88px;min-height:50vh}

.cat-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:20px 0}
.cat-count{color:var(--muted);font-size:var(--t-md)}
.cat-count b{color:var(--ink)}
.cat-tlabel{color:var(--muted);font-size:14px}
.cat-sortwrap{display:flex;align-items:center;gap:10px}
.cat-sortwrap .sort-select{min-width:196px}

.cat-subs{display:flex;gap:8px;flex-wrap:wrap;padding-bottom:22px}
.cat-sub{display:inline-flex;align-items:center;min-height:40px;border:1px solid #d5dce4;border-radius:var(--r-pill);background:#fff;padding:0 16px;font-size:14px;font-weight:500;color:var(--ink)}
.cat-sub span{color:var(--muted);margin-left:6px}
.cat-sub:hover{border-color:var(--ink)}
.cat-sub[aria-current="page"]{background:var(--teal);border-color:var(--teal);color:#fff}
.cat-sub[aria-current="page"] span{color:rgba(255,255,255,.8)}

/* Stretch, so the Add to Cart buttons line up along the bottom of a row. */
.cat-grid{display:grid;gap:18px;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));align-items:stretch}

.cat-more{display:flex;justify-content:center;padding:32px 0 0}
.cat-empty{text-align:center;padding:54px 24px;border:1px solid var(--line);border-radius:var(--r-md);background:#fff}
.cat-empty b{font-family:var(--font-display);font-size:var(--t-lg)}
.cat-empty p{color:var(--muted);font-size:var(--t-sm);line-height:1.65;margin:10px 0 20px}
.cat-empty-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.cat-unavailable{margin-top:22px}

@media(max-width:640px){
.cat-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.cat-sortwrap{width:100%}
.cat-sortwrap .sort-select{flex:1;min-width:0}
}
`;

export function CategoryStyles() {
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
