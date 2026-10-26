/* Public homepage · full-width hero banner slider.
   The first slide is in the HTML; store slides are built from GV.store. */
(() => {
  'use strict';

  const INTERVAL = 6000;
  const SLIDES = [
    {
      tone: 'sand', products: ['g09', 'g16', 'g14'], icon: 'stars', eyebrow: 'THE FESTIVE STORE IS OPEN',
      title: 'Brass, copper and<br>a little <span>sparkle.</span>',
      text: 'Copperware, serveware and pooja essentials for Diwali and every celebration in between.',
      alt: 'Hammered copper tumblers, silver-plated goblets and copper pooja thalis',
      cta: 'Shop festive picks', filter: ['occasion', 'festive']
    },
    {
      tone: 'lilac', products: ['g20', 'g21', 'g17'], icon: 'laptop', eyebrow: 'TECH & DESK',
      title: 'Upgrade the desk<br>you <span>live at.</span>',
      text: 'Keyboards, lamps and speakers you’ll actually use every day. From 699 pts.',
      alt: 'A retro typewriter keyboard, a desk lamp with wireless charger and a mini sound bar',
      cta: 'Shop tech & desk', filter: ['category', 'tech']
    },
    {
      tone: 'mint', products: ['g10', 'g23', 'g22'], icon: 'droplet', eyebrow: 'WELLNESS & SELF-CARE',
      title: 'Rewards that<br><span>feel good.</span>',
      text: 'Smart bottles, fragrances and portable blenders to hydrate, recharge and unwind.',
      alt: 'A smart water bottle, a perfume gift kit and a portable blender',
      cta: 'Shop wellness', filter: ['occasion', 'wellness']
    }
  ];

  function initialiseSlider() {
    const banner = document.getElementById('hero-slider');
    const track = document.getElementById('hero-slides');
    const controls = document.getElementById('slider-controls');
    const dotsEl = document.getElementById('slider-dots');
    const products = new Map((window.GV?.store?.products || []).map(p => [p.id, p]));
    if (!banner || !track || !controls) return;

    const escape = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    SLIDES.forEach(slide => {
      const items = slide.products.map(id => products.get(id)).filter(Boolean);
      if (items.length < 3) return;
      // Titles are fixed strings above, so their <br>/<span> markup is trusted.
      track.insertAdjacentHTML('beforeend', `<div class="hero-slide hero-${slide.tone}" role="group" aria-roledescription="slide">
        <div class="container slide-inner">
          <div class="slide-copy">
            <p class="eyebrow"><i class="bi bi-${slide.icon}" aria-hidden="true"></i> ${escape(slide.eyebrow)}</p>
            <h2>${slide.title}</h2>
            <p class="slide-text">${escape(slide.text)}</p>
            <div class="slide-actions"><button class="button button-primary" data-filter-${slide.filter[0]}="${slide.filter[1]}">${escape(slide.cta)} <i class="bi bi-arrow-right" aria-hidden="true"></i></button></div>
          </div>
          <div class="slide-visual slide-collage" role="img" aria-label="${escape(slide.alt)}">
            ${items.map((p, i) => `<span class="collage-item item-${i + 1}"><img src="${escape(p.image)}" alt="" loading="lazy" referrerpolicy="no-referrer" data-fallback></span>`).join('')}
          </div>
        </div>
      </div>`);
    });

    const slides = [...track.children];
    const count = slides.length;
    if (count < 2) return;

    dotsEl.innerHTML = slides.map((_, i) => `<button class="slider-dot" data-slide-to="${i}" aria-label="Go to slide ${i + 1}"></button>`).join('');
    const dots = [...dotsEl.children];
    const pauseButton = controls.querySelector('[data-slide-pause]');
    controls.hidden = false;
    banner.querySelectorAll('.slider-side').forEach(b => { b.hidden = false; });

    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let index = 0;
    let timer = null;
    let userPaused = reduceMotion;
    let hovering = false;

    function show(next) {
      index = (next + count) % count;
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-label', `${i + 1} of ${count}`);
        slide.setAttribute('aria-hidden', String(!active));
        slide.inert = !active;
        dots[i].setAttribute('aria-current', String(active));
      });
    }

    function stop() { clearInterval(timer); timer = null; }
    function start() {
      stop();
      if (userPaused || hovering || document.hidden) return;
      timer = setInterval(() => show(index + 1), INTERVAL);
    }
    function setPaused(paused) {
      userPaused = paused;
      pauseButton.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
      pauseButton.innerHTML = `<i class="bi bi-${paused ? 'play' : 'pause'}-fill" aria-hidden="true"></i>`;
      track.setAttribute('aria-live', paused ? 'polite' : 'off');
      start();
    }

    banner.addEventListener('click', event => {
      const t = event.target.closest('button');
      if (!t) return;
      if ('slidePrev' in t.dataset) show(index - 1);
      else if ('slideNext' in t.dataset) show(index + 1);
      else if ('slideTo' in t.dataset) show(Number(t.dataset.slideTo));
      else if ('slidePause' in t.dataset) return setPaused(!userPaused);
      else return;
      start();
    });

    // Pause while the visitor is reading or working with the banner.
    banner.addEventListener('mouseenter', () => { hovering = true; stop(); });
    banner.addEventListener('mouseleave', () => { hovering = false; start(); });
    banner.addEventListener('focusin', () => { hovering = true; stop(); });
    banner.addEventListener('focusout', event => {
      if (!banner.contains(event.relatedTarget)) { hovering = false; start(); }
    });
    document.addEventListener('visibilitychange', start);

    let startX = null;
    track.addEventListener('pointerdown', event => { startX = event.clientX; });
    track.addEventListener('pointerup', event => {
      if (startX === null) return;
      const dx = event.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) { show(index + (dx < 0 ? 1 : -1)); start(); }
    });

    show(0);
    setPaused(userPaused);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseSlider, { once: true });
  } else {
    initialiseSlider();
  }
})();
