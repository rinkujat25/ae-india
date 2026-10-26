/* Wingback public gift store · browse, filter and a demo gift bag.
   Nothing is stored or sent; redeeming goes through the login preview. */
(() => {
  'use strict';

  const PAGE_SIZE = 12;
  const RANGES = {
    u1000: { label: 'Under 1,000 pts', test: p => p < 1000 },
    '1-2.5': { label: '1,000 – 2,499 pts', test: p => p >= 1000 && p < 2500 },
    '2.5-5': { label: '2,500 – 4,999 pts', test: p => p >= 2500 && p < 5000 },
    '5k': { label: '5,000 pts & above', test: p => p >= 5000 }
  };

  function initialiseStore() {
    const store = window.GV?.store;
    if (!store) return;
    const { products, categories, occasions } = store;
    const $ = id => document.getElementById(id);
    const grid = $('product-grid');
    const searchInput = $('store-search-input');
    const rangeSelect = $('store-range');
    const sortSelect = $('store-sort');
    const productDialog = $('product-dialog');
    const bagDialog = $('bag-dialog');
    const bagButton = $('bag-open');
    if (!grid) return;

    const state = { q: '', category: '', occasion: '', range: '', sort: 'featured', shown: PAGE_SIZE };
    const bag = new Map();
    const wishlist = new Set();
    const byId = new Map(products.map(p => [p.id, p]));
    const categoryName = id => categories.find(c => c.id === id)?.name || '';
    const occasionName = id => occasions.find(o => o.id === id)?.name || '';
    const pts = n => `${n.toLocaleString('en-IN')} pts`;
    const escape = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const image = (p, cls = '') => `<img class="${cls}" src="${escape(p.image)}" alt="" loading="lazy" referrerpolicy="no-referrer" data-fallback>`;

    // Broken remote images fall back to a gift icon instead of an empty box.
    document.addEventListener('error', event => {
      const img = event.target;
      if (!(img instanceof HTMLImageElement) || !img.hasAttribute('data-fallback')) return;
      img.replaceWith(Object.assign(document.createElement('i'), { className: 'bi bi-gift image-fallback' }));
    }, true);

    /* ---- static sections ---- */
    $('category-grid').innerHTML = categories.map(c => {
      const items = products.filter(p => p.category === c.id);
      const from = Math.min(...items.map(p => p.points));
      return `<button class="category-tile" data-filter-category="${c.id}">
        <span class="category-media">${image(items[0])}</span>
        <span class="category-text"><strong>${escape(c.name)}</strong><small>${items.length} gifts · from ${pts(from)}</small></span>
        <i class="bi bi-arrow-right" aria-hidden="true"></i></button>`;
    }).join('');

    $('occasion-grid').innerHTML = occasions.map(o => {
      const items = products.filter(p => p.occasions.includes(o.id));
      return `<button class="occasion-card tone-${o.tone}" data-filter-occasion="${o.id}">
        <span class="occasion-icon"><i class="bi bi-${o.icon}" aria-hidden="true"></i></span>
        <strong>${escape(o.name)}</strong><span>${escape(o.line)}</span>
        <span class="occasion-foot"><span class="occasion-thumbs">${items.slice(0, 3).map(p => `<span>${image(p)}</span>`).join('')}</span><em>${items.length} gifts <i class="bi bi-arrow-right" aria-hidden="true"></i></em></span>
      </button>`;
    }).join('');

    const brands = [...new Set(products.map(p => p.brand))];
    $('brand-list').innerHTML = brands.map(b => `<li><button data-filter-brand="${escape(b)}">${escape(b)}</button></li>`).join('');
    $('footer-categories').innerHTML = categories.map(c => `<li><button data-filter-category="${c.id}">${escape(c.name)}</button></li>`).join('');

    /* ---- filtering ---- */
    function matches(p, ignoreCategory = false) {
      if (!ignoreCategory && state.category && p.category !== state.category) return false;
      if (state.occasion && !p.occasions.includes(state.occasion)) return false;
      if (state.range && !RANGES[state.range].test(p.points)) return false;
      if (state.q) {
        const hay = `${p.name} ${p.brand} ${p.detail} ${categoryName(p.category)}`.toLowerCase();
        if (!state.q.toLowerCase().split(/\s+/).every(word => hay.includes(word))) return false;
      }
      return true;
    }

    function sorted(list) {
      const l = list.slice();
      if (state.sort === 'points-asc') l.sort((a, b) => a.points - b.points);
      if (state.sort === 'points-desc') l.sort((a, b) => b.points - a.points);
      if (state.sort === 'name') l.sort((a, b) => a.name.localeCompare(b.name));
      return l;
    }

    function card(p) {
      const inBag = bag.has(p.id);
      const saved = wishlist.has(p.id);
      return `<article class="product-card">
        ${p.tag ? `<span class="product-tag">${escape(p.tag)}</span>` : ''}
        <button class="wish-button" data-wish="${p.id}" aria-pressed="${saved}" aria-label="${saved ? 'Remove from' : 'Save to'} wishlist: ${escape(p.name)}"><i class="bi bi-heart${saved ? '-fill' : ''}" aria-hidden="true"></i></button>
        <button class="product-media" data-product="${p.id}" aria-label="View details: ${escape(p.name)}">${image(p)}</button>
        <div class="product-body">
          <span class="product-brand">${escape(p.brand)}</span>
          <h3><button data-product="${p.id}">${escape(p.name)}</button></h3>
          <div class="product-foot"><strong>${pts(p.points)}</strong>
            <button class="bag-add${inBag ? ' is-added' : ''}" data-bag-add="${p.id}" aria-label="${inBag ? 'In your bag' : 'Add to gift bag'}: ${escape(p.name)}"><i class="bi bi-${inBag ? 'check2' : 'plus-lg'}" aria-hidden="true"></i><span>${inBag ? 'In bag' : 'Add'}</span></button>
          </div>
        </div>
      </article>`;
    }

    function render() {
      const list = sorted(products.filter(p => matches(p)));
      grid.innerHTML = list.slice(0, state.shown).map(card).join('');
      $('store-empty').hidden = list.length > 0;
      $('store-count').innerHTML = `<strong>${list.length}</strong> gift${list.length === 1 ? '' : 's'}`;
      const remaining = list.length - state.shown;
      $('store-more').innerHTML = remaining > 0
        ? `<button class="button button-outline" data-store-more>Show more gifts (${remaining})</button>` : '';

      const inScope = products.filter(p => matches(p, true));
      $('store-chips').innerHTML = [{ id: '', name: 'All gifts' }, ...categories].map(c => {
        const count = c.id ? inScope.filter(p => p.category === c.id).length : inScope.length;
        return `<button class="store-chip" data-chip="${c.id}" aria-pressed="${state.category === c.id}">${escape(c.name)}<small>${count}</small></button>`;
      }).join('');

      const active = [];
      if (state.occasion) active.push(['occasion', occasionName(state.occasion)]);
      if (state.q) active.push(['q', `“${state.q}”`]);
      if (state.range) active.push(['range', RANGES[state.range].label]);
      $('store-active').innerHTML = active.map(([key, label]) =>
        `<button class="active-filter" data-clear="${key}" aria-label="Remove filter ${escape(label)}">${escape(label)} <i class="bi bi-x" aria-hidden="true"></i></button>`
      ).join('') + (active.length ? '<button class="text-link" data-store-reset>Clear all</button>' : '');
    }

    function update(changes, scroll = false) {
      Object.assign(state, changes, { shown: PAGE_SIZE });
      searchInput.value = state.q;
      rangeSelect.value = state.range;
      sortSelect.value = state.sort;
      render();
      if (scroll) $('store').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }

    /* ---- gift bag ---- */
    function renderBag() {
      const count = [...bag.values()].reduce((a, b) => a + b, 0);
      const countEl = $('bag-count');
      countEl.textContent = count;
      countEl.hidden = count === 0;
      bagButton.setAttribute('aria-label', `Open gift bag, ${count} item${count === 1 ? '' : 's'}`);

      const items = [...bag].map(([id, qty]) => ({ p: byId.get(id), qty }));
      const total = items.reduce((sum, { p, qty }) => sum + p.points * qty, 0);
      $('bag-body').innerHTML = items.length ? `
        <ul class="bag-list">${items.map(({ p, qty }) => `<li>
          <span class="bag-thumb">${image(p)}</span>
          <div><span class="product-brand">${escape(p.brand)}</span><strong>${escape(p.name)}</strong><span class="bag-points">${pts(p.points * qty)}</span></div>
          <div class="qty" role="group" aria-label="Quantity for ${escape(p.name)}">
            <button data-qty="${p.id}" data-step="-1" aria-label="${qty === 1 ? 'Remove' : 'Decrease'}"><i class="bi bi-${qty === 1 ? 'trash3' : 'dash-lg'}" aria-hidden="true"></i></button>
            <span aria-live="polite">${qty}</span>
            <button data-qty="${p.id}" data-step="1" aria-label="Increase"${qty >= 5 ? ' disabled' : ''}><i class="bi bi-plus-lg" aria-hidden="true"></i></button>
          </div></li>`).join('')}</ul>
        <div class="bag-total"><span>Total</span><strong>${pts(total)}</strong></div>
        <button class="button button-primary bag-redeem" data-store-login>Log in to redeem <i class="bi bi-arrow-right" aria-hidden="true"></i></button>
        <p class="bag-note"><i class="bi bi-info-circle" aria-hidden="true"></i> Your points balance and delivery details appear after login. This preview doesn’t place orders.</p>`
        : `<div class="bag-empty"><i class="bi bi-bag-heart" aria-hidden="true"></i><p>Your bag is empty. Add a few gifts you love and redeem them after logging in.</p><button class="button button-outline" data-store-close data-goto-store>Browse the gift store</button></div>`;
    }

    function addToBag(id) {
      if (!bag.has(id)) bag.set(id, 1);
      renderBag();
      render();
    }

    /* ---- dialogs ---- */
    const triggers = new WeakMap();
    function openStoreDialog(dialog, trigger) {
      if (dialog.open) return;
      triggers.set(dialog, trigger);
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    }
    [productDialog, bagDialog].forEach(dialog => {
      dialog.addEventListener('close', () => {
        document.body.style.overflow = '';
        const t = triggers.get(dialog);
        if (t?.isConnected && t.getClientRects().length) t.focus({ preventScroll: true });
      });
      dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const r = dialog.getBoundingClientRect();
        if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
      });
    });

    function showProduct(id, trigger) {
      const p = byId.get(id);
      if (!p) return;
      const inBag = bag.has(p.id);
      $('product-dialog-body').innerHTML = `
        <div class="pd-media">${image(p)}</div>
        <div class="pd-info">
          <span class="product-brand">${escape(p.brand)}</span>
          <h2 id="product-dialog-title">${escape(p.name)}</h2>
          <p class="pd-points">${pts(p.points)}</p>
          <p class="pd-detail">${escape(p.detail)}</p>
          <div class="pd-tags"><span>${escape(categoryName(p.category))}</span>${p.occasions.map(o => `<span>${escape(occasionName(o))}</span>`).join('')}</div>
          <ul class="pd-perks"><li><i class="bi bi-truck" aria-hidden="true"></i> Delivered to your door</li><li><i class="bi bi-patch-check" aria-hidden="true"></i> Genuine brand product</li></ul>
          <div class="pd-actions">
            <button class="button ${inBag ? 'button-outline' : 'button-primary'}" data-bag-add="${p.id}" data-pd-add${inBag ? ' disabled' : ''}><i class="bi bi-${inBag ? 'check2' : 'bag-plus'}" aria-hidden="true"></i> ${inBag ? 'In your bag' : 'Add to gift bag'}</button>
            <button class="button button-outline" data-store-login>Log in to redeem</button>
          </div>
        </div>`;
      openStoreDialog(productDialog, trigger);
    }

    /* ---- events ---- */
    document.addEventListener('click', event => {
      const t = event.target.closest('button, a');
      if (!t) return;
      const d = t.dataset;

      if ('filterCategory' in d || 'filterOccasion' in d || 'filterRange' in d || 'filterBrand' in d) {
        event.preventDefault();
        update({
          category: d.filterCategory || '',
          occasion: d.filterOccasion || '',
          range: d.filterRange || '',
          q: d.filterBrand || ''
        }, true);
        return;
      }
      if ('chip' in d) return update({ category: d.chip });
      if ('clear' in d) return update({ [d.clear]: '' });
      if ('storeReset' in d) return update({ q: '', category: '', occasion: '', range: '' });
      if ('storeMore' in d) {
        state.shown += PAGE_SIZE;
        render();
        grid.children[state.shown - PAGE_SIZE]?.querySelector('[data-product]')?.focus({ preventScroll: true });
        return;
      }
      if ('product' in d) return showProduct(d.product, t);
      if ('wish' in d) {
        wishlist.has(d.wish) ? wishlist.delete(d.wish) : wishlist.add(d.wish);
        render();
        grid.querySelector(`[data-wish="${d.wish}"]`)?.focus({ preventScroll: true });
        return;
      }
      if ('bagAdd' in d) {
        addToBag(d.bagAdd);
        if ('pdAdd' in d) {
          t.outerHTML = '<button class="button button-outline" disabled><i class="bi bi-check2" aria-hidden="true"></i> In your bag</button>';
        } else {
          grid.querySelector(`[data-bag-add="${d.bagAdd}"]`)?.focus({ preventScroll: true });
        }
        return;
      }
      if ('qty' in d) {
        const next = (bag.get(d.qty) || 0) + Number(d.step);
        next > 0 ? bag.set(d.qty, Math.min(next, 5)) : bag.delete(d.qty);
        renderBag();
        render();
        return;
      }
      if (t === bagButton) {
        renderBag();
        return openStoreDialog(bagDialog, bagButton);
      }
      if ('storeLogin' in d) {
        productDialog.close();
        bagDialog.close();
        window.GVPublic?.openLogin('rewards', bagButton);
        return;
      }
      if ('storeClose' in d) {
        t.closest('dialog')?.close();
        if ('gotoStore' in d) $('store').scrollIntoView({ behavior: 'smooth' });
      }
    });

    let searchTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => { state.q = searchInput.value.trim(); state.shown = PAGE_SIZE; render(); }, 150);
    });
    rangeSelect.addEventListener('change', () => update({ range: rangeSelect.value }));
    sortSelect.addEventListener('change', () => update({ sort: sortSelect.value }));

    render();
    renderBag();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseStore, { once: true });
  } else {
    initialiseStore();
  }
})();
