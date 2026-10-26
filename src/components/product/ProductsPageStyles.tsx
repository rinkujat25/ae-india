const styles = `
  .protobar{
    background:#12251f;
    color:#f7f3ea;
    font-size:12px;
    font-weight:800;
    letter-spacing:.08em;
    padding:8px 18px;
    text-align:center;
    text-transform:uppercase;
  }

  .products-page{
    background:#fbfaf7;
    color:#1f2a24;
    min-height:100vh;
    padding:34px 0 82px;
  }

  /* The site's wrap is min(1180px, 100% - 40px), and the header, breadcrumb
     and footer all sit on it. This page widened its own to 1280, which pushed
     the listing 50px left of everything above and below it -- most visibly the
     breadcrumb, which sat indented from the filters beneath it. */
  .products-page .wrap{
    margin:0 auto;
    width:min(1180px, calc(100% - 40px));
  }

  .head{
    background:#fff;
    border:1px solid #e6e0d8;
    border-radius:18px;
    box-shadow:0 18px 50px rgba(28, 35, 31, .07);
    margin-bottom:22px;
    padding:28px;
  }

  .head .eyebrow{
    color:#b86b36;
    font-size:12px;
    font-weight:900;
    letter-spacing:.12em;
    margin-bottom:10px;
    text-transform:uppercase;
  }

  .head h1{
    font-size:clamp(34px, 5vw, 58px);
    letter-spacing:0;
    line-height:.98;
    margin:0;
  }

  .head p:not(.eyebrow){
    color:#637068;
    font-size:16px;
    line-height:1.65;
    margin:14px 0 0;
    max-width:760px;
  }

  .product-listing{
    display:grid;
    gap:28px;
    grid-template-columns:300px minmax(0, 1fr);
    align-items:start;
  }

  /* Drawer chrome. Hidden at desktop widths, where the sidebar is a plain
     column and there is nothing to open or close. */
  .filters-trigger,
  .filters-backdrop,
  .filters-drawer-head,
  .filters-drawer-foot{
    display:none;
  }

  .pager{
    align-items:center;
    display:flex;
    flex-wrap:wrap;
    gap:8px;
    justify-content:center;
    padding:34px 0 8px;
  }

  .pager-pages{
    align-items:center;
    display:flex;
    flex-wrap:wrap;
    gap:6px;
    list-style:none;
    margin:0;
    padding:0;
  }

  .pager a{
    align-items:center;
    border:1px solid #e6e0d8;
    border-radius:10px;
    color:#1f2a24;
    display:inline-flex;
    font-size:14px;
    font-weight:800;
    gap:6px;
    justify-content:center;
    min-height:42px;
    min-width:42px;
    padding:0 12px;
    text-decoration:none;
    transition:border-color .18s ease, background .18s ease;
  }

  @media (hover:hover){
    .pager a:hover{background:#fff;border-color:#c9bfae}
  }

  .pager a[aria-current="page"]{
    background:#1f2a24;
    border-color:#1f2a24;
    color:#fff;
  }

  /* The ends stay in the DOM so the control does not reflow at the first and
     last page; they simply stop responding. */
  .pager a[aria-disabled="true"]{
    opacity:.4;
    pointer-events:none;
  }

  .pager-step svg{
    fill:none;
    height:16px;
    stroke:currentColor;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-width:2.2;
    width:16px;
  }

  .pager-gap{
    color:#8a8177;
    font-weight:800;
    padding:0 2px;
  }

  @media (max-width:560px){
    .pager-step span{display:none}
    .pager a{min-height:40px;min-width:40px;padding:0 10px}
  }

  .filters-head h2{align-items:center;display:flex;gap:8px}

  .filters-head h2 span{
    background:#1f2a24;
    border-radius:999px;
    color:#fff;
    font-size:12px;
    font-weight:800;
    min-width:20px;
    padding:2px 7px;
    text-align:center;
  }

  .listing-sidebar{
    min-width:0;
  }

  .listing-results{
    display:grid;
    gap:22px;
    min-width:0;
  }

  .toolbar,
  .filters-panel,
  .foot-note{
    background:#fff;
    border:1px solid #e6e0d8;
    border-radius:18px;
    box-shadow:0 18px 50px rgba(28, 35, 31, .06);
  }

  /* The panel itself does not scroll: it is as tall as its groups and moves
     with the page. It was sticky with its own scrollbar, which capped it at the
     viewport height -- and a sticky column taller than the viewport hides its
     own bottom, so the last filters could not be reached at all. The option
     lists inside it keep their own scrolling. */
  .filters-panel{
    display:grid;
    gap:22px;
    padding:0;
    position:static;
    background:transparent;
    border:0;
    box-shadow:none;
  }

  /* Was a bordered, shadowed 66px card containing the single word "Filters".
     It is a heading, so it looks like one; the card weight belonged to the
     groups below it. */
  .filters-head{
    align-items:center;
    display:flex;
    justify-content:space-between;
    min-height:0;
    padding:0 2px;
  }

  .filters-head h2{
    font-size:17px;
    font-weight:850;
    margin:0;
  }

  .filters-head button{
    background:transparent;
    border:0;
    color:#4d5ff0;
    cursor:pointer;
    font:inherit;
    font-size:15px;
    font-weight:800;
    padding:0;
  }

  .filters-grid{
    display:grid;
    gap:16px;
    grid-template-columns:1fr;
  }

  .filter-dropdown{
    position:relative;
    background:#fff;
    border:1px solid #e6e0d8;
    border-radius:14px;
    box-shadow:0 12px 28px rgba(28, 35, 31, .05);
    overflow:hidden;
  }

  .filter-trigger{
    align-items:center;
    background:transparent;
    border:0;
    border-radius:0;
    color:#1f2a24;
    cursor:pointer;
    display:grid;
    gap:5px 12px;
    grid-template-columns:1fr auto;
    min-height:66px;
    padding:13px 18px;
    text-align:left;
    width:100%;
  }

  .filter-trigger span{
    font-size:15px;
    font-weight:900;
    line-height:1.2;
  }

  .filter-trigger strong{
    color:#7b867e;
    font-size:11px;
    font-weight:850;
    grid-column:1 / -1;
    line-height:1.2;
    min-width:0;
    overflow:hidden;
    text-overflow:ellipsis;
    text-transform:uppercase;
    white-space:nowrap;
  }

  .filter-trigger svg{
    fill:none;
    grid-column:2 / 3;
    grid-row:1 / 3;
    height:22px;
    justify-self:end;
    stroke:#68736c;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-width:2.4;
    transition:transform .16s ease;
    width:22px;
  }

  .filter-dropdown.is-open .filter-trigger{
    box-shadow:none;
  }

  .filter-dropdown.is-open .filter-trigger svg{
    transform:rotate(180deg);
  }

  .filter-menu{
    background:#fff;
    border:0;
    border-radius:0;
    border-top:1px solid #e6e0d8;
    box-shadow:none;
    display:grid;
    gap:2px;
    margin-top:0;
    /* Each option list scrolls on its own -- Categories and Brands are the long
       ones -- while the panel around them does not. A short list never reaches
       this height, so no scrollbar appears where it is not needed. */
    max-height:320px;
    min-width:100%;
    overflow-y:auto;
    overscroll-behavior:contain;
    padding:8px;
    position:static;
    scrollbar-width:thin;
  }

  .filter-option{
    align-items:center;
    border-radius:8px;
    color:#27332c;
    cursor:pointer;
    display:grid;
    gap:10px;
    grid-template-columns:18px 1fr;
    min-height:38px;
    padding:8px;
  }

  .filter-option:hover{
    background:#fbfaf7;
  }

  .filter-option input{
    accent-color:#17362d;
    height:16px;
    margin:0;
    width:16px;
  }

  .filter-option span{
    font-size:13px;
    font-weight:800;
    line-height:1.35;
    min-width:0;
    overflow:hidden;
    text-overflow:ellipsis;
  }

  .filter-empty{
    color:#7b867e;
    font-size:13px;
    font-weight:800;
    margin:0;
    padding:12px;
  }

  .active-filters{
    align-items:center;
    display:flex;
    flex-wrap:wrap;
    gap:9px;
    margin-top:0;
  }

  .filter-chip,
  .filter-clear{
    align-items:center;
    border:1px solid #d8cfc4;
    border-radius:999px;
    cursor:pointer;
    display:inline-flex;
    font:inherit;
    font-size:12px;
    font-weight:850;
    gap:7px;
    min-height:34px;
    padding:0 12px;
  }

  .filter-chip{
    background:#fbfaf7;
    color:#1f2a24;
  }

  .filter-chip span{
    color:#b86b36;
    font-size:14px;
    line-height:1;
  }

  .filter-clear{
    background:#17362d;
    border-color:#17362d;
    color:#fff;
  }

  .filter-status{
    color:#637068;
    font-size:12px;
    font-weight:800;
    line-height:1.5;
    margin:12px 0 0;
  }

  .filter-status.error{
    color:#a8482a;
  }

  .more button{
    align-items:center;
    border:1px solid #d8cfc4;
    border-radius:999px;
    cursor:pointer;
    display:inline-flex;
    font:inherit;
    font-size:13px;
    font-weight:850;
    gap:8px;
    justify-content:center;
    min-height:34px;
    padding:0 13px;
  }

  .more button{
    background:#17362d;
    border-color:#17362d;
    color:#fff;
  }

  .toolbar{
    align-items:center;
    display:flex;
    gap:18px;
    justify-content:space-between;
    min-height:66px;
    padding:20px 22px;
  }

  .sort-control{
    align-items:center;
    display:flex;
    gap:10px;
  }

  .sort-control span{
    color:#637068;
    font-size:12px;
    font-weight:900;
    text-transform:uppercase;
  }

  .sort-control select{
    appearance:none;
    background:#fff;
    border:1px solid #e1dbd3;
    border-radius:10px;
    color:#27332c;
    cursor:pointer;
    font:inherit;
    font-size:13px;
    font-weight:850;
    min-height:42px;
    min-width:180px;
    padding:0 34px 0 13px;
  }

  .result-filter-summary{
    align-items:center;
    display:flex;
    flex-wrap:wrap;
    gap:9px;
  }

  .result-filter-summary span,
  .result-filter-summary a{
    align-items:center;
    border:1px solid #d8cfc4;
    border-radius:999px;
    display:inline-flex;
    font-size:12px;
    font-weight:850;
    min-height:34px;
    padding:0 12px;
  }

  .result-filter-summary span{
    background:#fff;
    color:#1f2a24;
  }

  .result-filter-summary a{
    background:#17362d;
    border-color:#17362d;
    color:#fff;
    text-decoration:none;
  }

  .grid{
    align-items:start;
    display:grid;
    gap:20px;
    grid-template-columns:repeat(3, minmax(0, 1fr));
  }

  .meta{
    color:#7b867e;
    font-size:12px;
    font-weight:750;
    line-height:1.45;
    margin:0;
  }

  .more{
    display:flex;
    justify-content:center;
  }

  .more button{
    min-height:44px;
    padding:0 22px;
  }

  .empty{
    background:#fff;
    border:1px dashed #d8cfc4;
    border-radius:18px;
    color:#637068;
    font-weight:850;
    padding:34px;
    text-align:center;
  }

  .empty p{
    margin:0 0 14px;
  }

  .empty a{
    background:#17362d;
    border-radius:999px;
    color:#fff;
    display:inline-flex;
    font-size:13px;
    font-weight:850;
    min-height:40px;
    padding:0 18px;
    align-items:center;
    text-decoration:none;
  }

  .foot-note{
    color:#637068;
    font-size:13px;
    font-weight:700;
    line-height:1.6;
    padding:18px 22px;
  }@media (max-width:1120px){

    .grid{
      grid-template-columns:repeat(2, minmax(0, 1fr));
    }
}@media (max-width:820px){

    .products-page{
      padding:24px 0 62px;
    }

    .products-page .wrap{
      width:min(100% - 26px, 1180px);
    }

    .head,
    .toolbar,
    .foot-note{
      border-radius:14px;
    }

    .head{
      padding:22px;
    }

    .toolbar{
      align-items:flex-start;
      flex-direction:column;
      gap:10px;
      min-height:0;
    }

    .product-listing{
      grid-template-columns:1fr;
    }

    /* The sidebar used to render above the grid, so a phone scrolled past
       ~1,000px of checkboxes before reaching the first product. It is a drawer
       here, and the grid starts at the top of the page. */
    .filters-trigger{
      align-items:center;
      background:#fff;
      border:1px solid #e6e0d8;
      border-radius:999px;
      color:#1f2a24;
      cursor:pointer;
      display:inline-flex;
      font:inherit;
      font-size:14px;
      font-weight:800;
      gap:8px;
      justify-self:start;
      padding:11px 18px;
    }

    .filters-trigger svg{
      fill:none;
      height:18px;
      stroke:currentColor;
      stroke-linecap:round;
      stroke-width:2;
      width:18px;
    }

    .filters-trigger span{
      background:#1f2a24;
      border-radius:999px;
      color:#fff;
      font-size:12px;
      min-width:20px;
      padding:1px 7px;
      text-align:center;
    }

    .listing-sidebar{
      background:#fbf9f5;
      bottom:0;
      display:flex;
      flex-direction:column;
      left:0;
      max-width:400px;
      overflow:hidden;
      position:fixed;
      top:0;
      transform:translateX(-100%);
      transition:transform .26s cubic-bezier(.22,.61,.36,1);
      visibility:hidden;
      width:88vw;
      z-index:1200;
    }

    .filters-open .listing-sidebar{
      transform:none;
      visibility:visible;
    }

    /* Only the drawer's own body scrolls, so the groups keep their scrolling
       and the page behind stays put. */
    .filters-open .filters-panel{
      flex:1;
      min-height:0;
      overflow-y:auto;
      padding:16px;
    }

    /* The drawer header already says "Filters"; only the clear control is
       still worth showing here. */
    .filters-head h2{display:none}
    .filters-head{justify-content:flex-end}
    .filters-head:not(:has(button)){display:none}

    /* Inside the drawer the groups are rows in a list, not cards on a page.
       The card treatment -- border, radius, shadow, gaps -- reads as boxes
       floating inside a box once it is on a phone. */
    .filters-open .filters-panel{padding:0}

    /* 'align-content:start' matters: the panel is a flex child filling the
       drawer, so without it the grid divides that height between its rows and
       each collapsed group gets ~110px of empty space beneath it. */
    .filters-open .filters-grid{align-content:start;gap:0}

    .filters-open .filter-dropdown{
      background:transparent;
      border:0;
      border-bottom:1px solid #eee7dd;
      border-radius:0;
      box-shadow:none;
    }

    .filters-open .filter-trigger{
      align-items:center;
      display:flex;
      gap:10px;
      justify-content:space-between;
      min-height:60px;
      padding:0 16px;
    }

    .filters-open .filter-trigger > span{
      font-size:16px;
      font-weight:700;
    }

    .filters-open .filter-trigger strong{
      color:#6b7a72;
      font-size:13px;
      font-weight:700;
      margin-left:auto;
    }

    .filters-open .filter-trigger svg{flex:0 0 auto}

    .filters-open .filter-menu{
      background:#fbf9f5;
      border-top:1px solid #eee7dd;
      max-height:none;
      padding:4px 8px 10px;
    }

    .filters-open .filters-head{padding:10px 16px 0}

    .filters-backdrop{
      background:rgba(22, 20, 27, .5);
      display:block;
      inset:0;
      opacity:0;
      pointer-events:none;
      position:fixed;
      transition:opacity .26s ease;
      z-index:1150;
    }

    .filters-open .filters-backdrop{
      opacity:1;
      pointer-events:auto;
    }

    .filters-drawer-head{
      align-items:center;
      background:#fbf9f5;
      border-bottom:1px solid #e6e0d8;
      display:flex;
      flex:0 0 auto;
      justify-content:space-between;
      padding:16px;
    }

    .filters-drawer-head strong{font-size:17px}

    .filters-drawer-head button{
      background:none;
      border:0;
      color:#1f2a24;
      cursor:pointer;
      display:grid;
      height:40px;
      padding:0;
      place-items:center;
      width:40px;
    }

    .filters-drawer-head svg{
      fill:none;
      height:22px;
      stroke:currentColor;
      stroke-linecap:round;
      stroke-width:2;
      width:22px;
    }

    .filters-drawer-foot{
      background:#fbf9f5;
      border-top:1px solid #e6e0d8;
      display:block;
      flex:0 0 auto;
      padding:12px 16px;
    }

    .filters-drawer-foot button{
      background:#1f2a24;
      border:0;
      border-radius:999px;
      color:#fff;
      cursor:pointer;
      font:inherit;
      font-size:15px;
      font-weight:800;
      padding:13px;
      width:100%;
    }

    @media (prefers-reduced-motion:reduce){
      .listing-sidebar,
      .filters-backdrop{transition:none}
    }

    .count{
      text-align:left;
    }

    .grid{
      grid-template-columns:repeat(2, minmax(0, 1fr));
    }
}@media (max-width:560px){

    .protobar{
      font-size:10px;
      line-height:1.4;
      padding:8px 12px;
    }

    .filters-grid{
      gap:12px;
    }

    .sort-control{
      align-items:flex-start;
      flex-direction:column;
      width:100%;
    }

    .sort-control select{
      width:100%;
    }

    .grid{
      gap:12px;
      grid-template-columns:repeat(2, minmax(0, 1fr));
    }

    .meta{
      font-size:11px;
    }
}`;

export function ProductsPageStyles() {
  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
