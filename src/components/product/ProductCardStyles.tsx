/**
 * The product card, shared by the catalogue listing and the Similar Products
 * rail on the detail page.
 *
 * These rules used to live in `ProductsPageStyles`, which only the listing
 * page loads. They are their own sheet so both pages can render the same card
 * without pulling in the rest of the catalogue layout.
 */
const styles = `

  .p-card{
    background:#fff;
    border:1px solid #e6e0d8;
    border-radius:18px;
    box-shadow:0 18px 50px rgba(28, 35, 31, .06);
    display:flex;
    flex-direction:column;
    min-height:0;
    overflow:hidden;
    padding:18px;
    position:relative;
    text-align:center;
  }

  .p-link{
    color:inherit;
    display:flex;
    flex:1;
    flex-direction:column;
    text-decoration:none;
  }

  .variant-preview{
    align-items:center;
    display:flex;
    left:14px;
    position:absolute;
    top:14px;
    z-index:4;
  }

  .variant-thumbnails{
    display:flex;
  }

  .variant-thumbnail{
    align-items:center;
    background:#fff;
    border:2px solid #c41445;
    border-radius:50%;
    display:flex;
    height:38px;
    justify-content:center;
    overflow:hidden;
    position:relative;
    width:38px;
  }

  .variant-thumbnail + .variant-thumbnail{
    margin-left:-12px;
  }

  .variant-thumbnail img{
    height:100%;
    object-fit:contain;
    width:100%;
  }

  .variant-thumbnail:focus-visible{
    outline:3px solid #17362d;
    outline-offset:2px;
  }

  .variant-more{
    color:#1f2a24;
    font-size:16px;
    font-weight:850;
    margin-left:6px;
  }

  .off{
    /* Was #37a64b at 3.13:1 on white, below the 4.5:1 minimum for 14px text. */
    color:#1c7a4f;
    font-size:14px;
    font-weight:900;
    position:absolute;
    right:18px;
    top:14px;
    z-index:2;
  }

  .wish{
    align-items:center;
    background:#fff;
    border:0;
    border-radius:50%;
    box-shadow:0 8px 24px rgba(27, 31, 29, .14);
    color:#c41445;
    cursor:pointer;
    display:grid;
    height:44px;
    justify-content:center;
    position:absolute;
    right:16px;
    top:38px;
    width:44px;
    z-index:3;
  }

  .p-card:not(:has(.off)) .wish{
    top:16px;
  }

  .wish svg{
    fill:none;
    height:24px;
    stroke:currentColor;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-width:2.2;
    width:24px;
  }

  .wish svg.filled{
    fill:currentColor;
  }

  .p-media{
    align-items:center;
    aspect-ratio:1 / .86;
    display:grid;
    justify-content:center;
    margin:8px 0 16px;
    min-height:190px;
    overflow:hidden;
  }

  .p-media img{
    height:100%;
    max-height:100%;
    max-width:100%;
    /* Grid items default to min-height:auto and refuse to shrink below the
       image's intrinsic size, which pushed tall images over the card text. */
    min-height:0;
    min-width:0;
    object-fit:contain;
    width:100%;
  }

  .no-img{
    color:#9a948d;
    font-size:13px;
    font-weight:800;
  }

  .p-body{
    display:grid;
    gap:10px;
    margin-top:auto;
  }

  /* The brand used to be larger than the product name, which put the maker
     above the thing being sold. It now reads as a label above the title. */
  .brand{
    color:#5b6a62;
    font-size:12px;
    font-weight:700;
    letter-spacing:.3px;
    margin:0;
    text-transform:uppercase;
  }

  .p-body h2{
    color:#1f2a24;
    display:-webkit-box;
    font-size:15px;
    font-weight:800;
    letter-spacing:0;
    line-height:1.28;
    margin:0;
    min-height:36px;
    overflow:hidden;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }

  .p-price{
    align-items:baseline;
    /* The most important number on the card was also the least legible:
       #bf6537 measured 4.09:1 on white, just under the 4.5:1 minimum. */
    color:#a4501f;
    display:inline-flex;
    font-size:18px;
    font-weight:950;
    gap:12px;
    justify-content:center;
    margin:0;
  }

  .p-price span{
    /* Was #8f908f at 3.20:1. */
    color:#6f706f;
    font-size:15px;
    font-weight:750;
    text-decoration:line-through;
  }

  /* ---------------- hover motion ----------------

     The card lifts, its shadow deepens and the photograph eases in behind the
     card's own clipping, which reads as depth rather than as the image moving.

     Two guards matter here. 'hover:hover' keeps the whole block away from touch
     screens, where a tap counts as a hover and leaves a card stuck in the
     raised state until the next tap lands elsewhere. 'prefers-reduced-motion'
     drops the movement for anyone who has asked their OS for less of it, while
     keeping the colour and shadow changes, so the card still answers the
     pointer. */
  .p-card{
    transition:transform .22s cubic-bezier(.22,.61,.36,1),
               box-shadow .22s ease,
               border-color .22s ease;
  }

  .p-media img{
    transition:transform .38s cubic-bezier(.22,.61,.36,1);
  }

  .p-body h2{
    transition:color .22s ease;
  }

  .wish,
  .variant-thumbnail{
    transition:transform .22s ease, box-shadow .22s ease;
  }

  @media (hover:hover){
    .p-card:hover{
      border-color:#d8cfc2;
      box-shadow:0 26px 60px rgba(28, 35, 31, .13);
      transform:translateY(-4px);
    }

    .p-card:hover .p-media img{
      transform:scale(1.06);
    }

    .p-card:hover .p-body h2{
      color:#bf6537;
    }

    .wish:hover{
      box-shadow:0 10px 28px rgba(196, 20, 69, .24);
      transform:scale(1.09);
    }

    .variant-thumbnail:hover{
      transform:translateY(-2px);
    }
  }

  /* Keyboard users reach the card through the link inside it, so the lift has
     to hang off the container rather than off :hover. */
  .p-card:focus-within{
    border-color:#d8cfc2;
    box-shadow:0 26px 60px rgba(28, 35, 31, .13);
    transform:translateY(-4px);
  }

  @media (prefers-reduced-motion:reduce){
    .p-card,
    .p-media img,
    .p-body h2,
    .wish,
    .variant-thumbnail{
      transition-duration:.01ms;
    }

    .p-card:hover,
    .p-card:focus-within,
    .p-card:hover .p-media img,
    .wish:hover,
    .variant-thumbnail:hover{
      transform:none;
    }
  }
@media (max-width:820px){


    .p-card{
      min-height:0;
      padding:14px;
    }

    .p-media{
      min-height:170px;
    }

    .p-media img{
      height:100%;
      max-height:100%;
      min-height:0;
    }

    .p-body h2{
      font-size:14px;
      min-height:36px;
    }
}@media (max-width:560px){


    .p-card{
      border-radius:12px;
      min-height:0;
      padding:12px 10px 14px;
    }

    .off{
      font-size:12px;
      right:12px;
      top:10px;
    }

    .variant-preview{
      left:9px;
      top:9px;
    }

    .variant-thumbnail{
      height:32px;
      width:32px;
    }

    .variant-thumbnail + .variant-thumbnail{
      margin-left:-10px;
    }

    .variant-more{
      font-size:13px;
      margin-left:4px;
    }

    .wish{
      height:38px;
      right:10px;
      top:31px;
      width:38px;
    }

    .p-card:not(:has(.off)) .wish{
      top:10px;
    }

    .wish svg{
      height:20px;
      width:20px;
    }

    .p-media{
      margin:10px 0 12px;
      min-height:128px;
    }

    .p-media img{
      height:100%;
      max-height:100%;
      min-height:0;
    }

    .brand{
      font-size:13px;
    }

    .p-body{
      gap:7px;
    }

    .p-body h2{
      font-size:14px;
      min-height:36px;
    }

    .p-price{
      font-size:15px;
    }
}`;

export function ProductCardStyles() {
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
