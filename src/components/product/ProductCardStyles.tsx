/**
 * The product card, shared by the home page, the catalogue listing, category
 * pages and the detail page's rails.
 *
 * It follows the AE India shop design: a white card with a 14px corner, the
 * image on a grey well, left-aligned text, the price in ink, and -- when
 * `showActions` is passed -- Add to Cart and Quote along the bottom.
 */
const styles = `

  .p-card{
    background:#fff;
    border:1px solid var(--line);
    border-radius:var(--r-md);
    display:flex;
    flex-direction:column;
    min-height:0;
    overflow:hidden;
    position:relative;
    text-align:left;
    transition:border-color .2s ease, box-shadow .2s ease;
  }

  .p-link{
    color:inherit;
    display:flex;
    flex:1;
    flex-direction:column;
    text-decoration:none;
  }

  .p-media{
    align-items:center;
    background:var(--cream);
    display:grid;
    height:210px;
    justify-content:center;
    overflow:hidden;
    padding:16px;
  }

  /* Grid items default to min-height:auto and refuse to shrink below the
     image's intrinsic size, which pushes tall images over the card text. */
  .p-media img{
    height:100%;
    max-height:100%;
    max-width:100%;
    min-height:0;
    min-width:0;
    object-fit:contain;
    width:100%;
    mix-blend-mode:multiply;
    transition:transform .35s cubic-bezier(.22,.61,.36,1);
  }

  .no-img{
    color:var(--muted);
    font-size:13px;
    font-weight:600;
  }

  .p-body{
    display:flex;
    flex:1;
    flex-direction:column;
    gap:6px;
    padding:18px 18px 0;
  }

  .p-card:not(:has(.p-actions)) .p-body{
    padding-bottom:18px;
  }

  .brand{
    color:var(--muted);
    font-size:13px;
    margin:0;
  }

  .p-body h2{
    color:var(--ink);
    display:-webkit-box;
    font-family:var(--font-display);
    font-size:17px;
    font-weight:600;
    letter-spacing:0;
    line-height:1.3;
    margin:0;
    min-height:44px;
    overflow:hidden;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    transition:color .2s ease;
  }

  .p-price{
    align-items:baseline;
    color:var(--ink);
    display:flex;
    flex-wrap:wrap;
    font-size:18px;
    font-weight:700;
    gap:4px 10px;
    margin:4px 0 0;
  }

  .p-price span{
    color:var(--muted);
    font-size:14px;
    font-weight:500;
    text-decoration:line-through;
  }

  .p-actions{
    display:flex;
    gap:8px;
    padding:14px 18px 18px;
  }

  .p-add,
  .p-quote{
    align-items:center;
    border-radius:var(--r-sm);
    display:inline-flex;
    font:inherit;
    font-size:14px;
    font-weight:600;
    height:44px;
    justify-content:center;
    transition:background-color .15s ease, border-color .15s ease;
  }

  .p-add{
    background:var(--teal);
    border:0;
    color:#fff;
    cursor:pointer;
    flex:1 1 auto;
    padding:0 12px;
  }

  .p-add:hover{
    background:#0b5c55;
  }

  .p-add:disabled{
    cursor:progress;
    opacity:.75;
  }

  .p-add--view{
    background:#fff;
    border:1px solid #c9d3dc;
    color:var(--ink);
  }

  .p-add--view:hover{
    background:var(--cream);
  }

  .p-quote{
    border:1px solid #c9d3dc;
    color:var(--ink);
    padding:0 14px;
  }

  .p-quote:hover{
    border-color:var(--ink);
  }

  /* Discount and wishlist sit on the image well. */
  .off{
    background:var(--ink);
    border-radius:5px;
    color:#fff;
    font-size:12px;
    font-weight:600;
    left:12px;
    padding:4px 9px;
    position:absolute;
    top:12px;
    z-index:2;
  }

  .wish{
    align-items:center;
    background:#fff;
    border:1px solid var(--line);
    border-radius:50%;
    color:#c41445;
    cursor:pointer;
    display:grid;
    height:44px;
    justify-content:center;
    position:absolute;
    right:12px;
    top:12px;
    width:44px;
    z-index:3;
    transition:transform .2s ease;
  }

  .wish svg{
    fill:none;
    height:22px;
    stroke:currentColor;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-width:2.2;
    width:22px;
  }

  .wish svg.filled{
    fill:currentColor;
  }

  .variant-preview{
    align-items:center;
    display:flex;
    left:12px;
    position:absolute;
    top:162px;
    z-index:4;
  }

  .variant-thumbnails{
    display:flex;
  }

  .variant-thumbnail{
    align-items:center;
    background:#fff;
    border:2px solid var(--violet);
    border-radius:50%;
    display:flex;
    height:36px;
    justify-content:center;
    overflow:hidden;
    width:36px;
  }

  .variant-thumbnail + .variant-thumbnail{
    margin-left:-12px;
  }

  .variant-thumbnail img{
    height:100%;
    object-fit:contain;
    width:100%;
  }

  .variant-more{
    color:var(--ink);
    font-size:14px;
    font-weight:700;
    margin-left:6px;
  }

  @media (hover:hover){
    .p-card:hover{
      border-color:#c9d3dc;
      box-shadow:0 18px 44px rgba(15, 27, 45, .10);
    }

    .p-card:hover .p-media img{
      transform:scale(1.04);
    }

    .p-card:hover .p-body h2{
      color:var(--violet);
    }

    .wish:hover{
      transform:scale(1.08);
    }
  }

  .p-card:focus-within{
    border-color:#c9d3dc;
  }

  @media (prefers-reduced-motion:reduce){
    .p-media img,
    .wish{
      transition-duration:.01ms;
    }

    .p-card:hover .p-media img,
    .wish:hover{
      transform:none;
    }
  }

  @media (max-width:560px){
    .p-media{
      height:150px;
      padding:12px;
    }

    .variant-preview{
      top:106px;
    }

    .p-body{
      padding:12px 12px 0;
    }

    .p-card:not(:has(.p-actions)) .p-body{
      padding-bottom:12px;
    }

    .p-body h2{
      font-size:15px;
      min-height:40px;
    }

    .p-price{
      font-size:16px;
    }

    .p-actions{
      flex-direction:column;
      gap:6px;
      padding:10px 12px 12px;
    }

    .p-quote{
      padding:0 10px;
    }

    .wish{
      height:40px;
      right:8px;
      top:8px;
      width:40px;
    }
  }
`;

export function ProductCardStyles() {
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
