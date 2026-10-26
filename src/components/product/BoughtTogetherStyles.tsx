/**
 * Styles for the "Frequently bought together" bundle.
 *
 * Its own sheet, like the product card's, so the section can move to another
 * page without dragging the rest of the detail layout along.
 */
const styles = `

  .bt{padding:0 0 46px}
  .bt h2{font-size:var(--t-2xl);margin:0 0 18px}

  .bt-body{
    align-items:center;
    background:#fff;
    border:1px solid var(--line);
    border-radius:var(--r-md);
    display:flex;
    flex-wrap:wrap;
    gap:24px;
    justify-content:space-between;
    padding:22px;
  }

  .bt-row{
    align-items:center;
    display:flex;
    flex-wrap:wrap;
    gap:0;
    min-width:0;
  }

  .bt-thumb-wrap{align-items:center;display:flex;gap:0}

  .bt-plus{
    color:var(--muted-2);
    font-size:22px;
    font-weight:800;
    padding:0 12px;
  }

  .bt-thumb{
    align-items:center;
    background:#fff;
    border:1px solid var(--line-2);
    border-radius:var(--r-sm);
    display:grid;
    height:104px;
    justify-content:center;
    overflow:hidden;
    padding:8px;
    place-items:center;
    width:104px;
  }

  .bt-thumb img{
    height:100%;
    max-height:100%;
    max-width:100%;
    /* Grid items will not shrink below the image's intrinsic size unless the
       minimums are cleared, which otherwise bursts the thumbnail. */
    min-height:0;
    min-width:0;
    object-fit:contain;
    width:100%;
  }

  .bt-noimg{color:var(--muted-2);font-size:11px;font-weight:800;text-align:center}

  .bt-summary{display:grid;gap:12px;justify-items:start;min-width:230px}

  .bt-total{display:grid;gap:2px;margin:0}
  .bt-total span{color:var(--muted);font-size:var(--t-sm);font-weight:700}
  .bt-total strong{color:var(--peach-ink);font-size:26px;font-weight:950;line-height:1.1}
  .bt-total small{color:var(--mint-ink);font-size:var(--t-sm);font-weight:800}

  .bt-add{width:100%}

  .bt-error{color:#a32626;font-size:var(--t-xs);font-weight:700;line-height:1.5;margin:0}

  .bt-list{display:grid;gap:2px;list-style:none;margin:18px 0 0;padding:0}

  .bt-item{
    align-items:center;
    border-radius:var(--r-sm);
    display:flex;
    gap:16px;
    justify-content:space-between;
    padding:9px 10px;
  }

  .bt-item:hover{background:var(--cream)}

  .bt-check{
    align-items:flex-start;
    cursor:pointer;
    display:flex;
    gap:11px;
    min-width:0;
  }

  /* The current product's box is disabled, so it must not look clickable. */
  .bt-check:has(input:disabled){cursor:default}

  .bt-check input{
    accent-color:var(--violet);
    cursor:inherit;
    flex:0 0 auto;
    height:17px;
    margin:2px 0 0;
    width:17px;
  }

  .bt-name{
    color:var(--ink);
    font-size:var(--t-sm);
    font-weight:700;
    line-height:1.45;
    min-width:0;
  }

  .bt-name b{font-weight:900}
  .bt-name a{color:inherit;text-decoration:none}
  .bt-name a:hover{color:var(--violet-ink);text-decoration:underline}

  .bt-price{
    color:var(--ink);
    display:inline-flex;
    flex:0 0 auto;
    font-size:var(--t-sm);
    font-weight:900;
    gap:8px;
    white-space:nowrap;
  }

  .bt-price s{color:var(--muted-2);font-weight:700}

  @media (max-width:820px){
    .bt-body{gap:18px;padding:16px}
    .bt-summary{min-width:0;width:100%}
    .bt-thumb{height:84px;width:84px}
    .bt-plus{font-size:18px;padding:0 8px}
  }

  @media (max-width:560px){
    .bt h2{font-size:var(--t-xl)}
    .bt-thumb{height:68px;width:68px}
    .bt-plus{padding:0 6px}
    .bt-total strong{font-size:22px}
    .bt-item{align-items:flex-start;flex-direction:column;gap:6px}
    .bt-price{padding-left:28px}
  }
`;

export function BoughtTogetherStyles() {
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
