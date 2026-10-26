(function () {
  'use strict';
  const GV = window.GV = window.GV || {};
  const viewState = {
    historyTab: 'received',
    filters: { points: { from: '', to: '' }, orders: { from: '', to: '' }, history: { from: '', to: '' } },
    profile: { name: 'Aarav Mehta', role: 'Product Designer', department: 'Design', location: 'Bengaluru, India', bio: 'Turning thoughtful ideas into experiences people love.', interests: 'Design, photography, coffee' },
    notifications: { appreciation: true, milestones: true, digest: false }
  };
  let controller;
  const escape = value => GV.escape ? GV.escape(String(value ?? '')) : String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const icon = name => GV.icon ? GV.icon(name) : `<i class="bi bi-${escape(name)}" aria-hidden="true"></i>`;
  const avatar = (name, extra = '') => GV.avatar ? GV.avatar(name, extra) : `<span class="avatar ${escape(extra)}">${escape(name.split(' ').map(part => part[0]).slice(0, 2).join(''))}</span>`;
  const fmt = value => Number(value || 0).toLocaleString('en-IN');
  const state = () => GV.state || {};
  const data = () => GV.data || {};
  const getProfile = () => {
    if (GV.state) {
      GV.state.profile = GV.state.profile || { ...viewState.profile };
      return GV.state.profile;
    }
    return viewState.profile;
  };
  GV.getProfile = getProfile;
  const orders = () => state().orders || data().orders || [];
  const history = () => state().history || data().history || [];
  const transactions = () => state().transactions || data().transactions || [];
  const balance = () => state().balance ?? 2450;
  const dateObject = date => date ? new Date(/^\d{4}-\d{2}-\d{2}$/.test(String(date)) ? `${date}T12:00:00` : date) : null;
  const dateKey = date => {
    const parsed = dateObject(date);
    if (!parsed || Number.isNaN(parsed.getTime())) return '';
    return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
  };
  const displayDate = date => {
    const parsed = dateObject(date);
    return parsed && !Number.isNaN(parsed.getTime()) ? parsed.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '25 Sep 2026';
  };
  const direction = item => String(item.direction || 'received').toLowerCase();
  const recipientNames = item => (item.recipients || []).map(person => typeof person === 'object' ? person.name : person).filter(Boolean);
  const personName = item => {
    if (direction(item) !== 'received' && recipientNames(item).length) return recipientNames(item).join(', ');
    return typeof item.person === 'object' ? item.person.name : item.person || item.sender || item.recipient || 'Your teammate';
  };
  const totalPoints = item => Number(item.totalPoints ?? (Number(item.points || 0) * Math.max(1, recipientNames(item).length)));
  const pointSummary = item => `${fmt(totalPoints(item))} pts${recipientNames(item).length > 1 ? ' total' : ''}`;
  const historyStatus = item => item.status === 'scheduled' ? 'Scheduled appreciation' : direction(item) === 'pending' ? 'Awaiting approval' : '';

  const tabs = current => `<nav class="acc-tabs" aria-label="My account sections">${[['account', 'Overview', 'grid'], ['points', 'Points bank', 'coin'], ['orders', 'My orders', 'bag'], ['history', 'Recognition history', 'clock-history'], ['profile', 'My profile', 'person']].map(([route, title, glyph]) => `<a href="#${route}" class="${current === route ? 'active' : ''}" ${current === route ? 'aria-current="page"' : ''}>${icon(glyph)}${title}</a>`).join('')}</nav>`;
  const heading = (title, description, action = '') => `<div class="page-heading acc-page-heading"><div><p class="acc-eyebrow">YOUR WINGBACK</p><h1>${title}</h1><p class="muted">${description}</p></div>${action}</div>`;
  const empty = (title, description, glyph = 'inbox') => `<div class="acc-empty">${icon(glyph)}<h3>${title}</h3><p>${description}</p></div>`;
  const statusBadge = status => {
    const text = status || 'Processing';
    const type = /deliver|complete/i.test(text) ? 'green' : /cancel/i.test(text) ? 'gray' : /transit|ship/i.test(text) ? 'blue' : 'amber';
    return `<span class="acc-status acc-status-${type}"><span></span>${escape(text)}</span>`;
  };
  function filtered(route, items) {
    const filter = viewState.filters[route];
    return items.filter(item => (!filter.from || dateKey(item.date) >= filter.from) && (!filter.to || dateKey(item.date) <= filter.to));
  }
  function dateFilters(route, downloadLabel) {
    const filter = viewState.filters[route];
    return `<form class="acc-filters" data-account-filter="${route}"><div class="acc-date-fields"><label>From<input class="field" type="date" name="from" value="${filter.from}" aria-label="From date"></label><span class="acc-date-dash">–</span><label>To<input class="field" type="date" name="to" value="${filter.to}" aria-label="To date"></label><button class="btn btn-secondary" type="submit">Apply</button><button class="btn btn-text" type="button" data-account-action="clear-filter" data-route="${route}">Clear</button></div><button class="btn btn-secondary acc-export" type="button" data-account-action="export" data-route="${route}">${icon('download')}${downloadLabel || 'Export CSV'}</button><p class="acc-filter-error" aria-live="polite"></p></form>`;
  }
  function summaryCards() {
    return `<div class="acc-summary-grid"><article class="card acc-stat"><span class="acc-stat-icon purple">${icon('coin')}</span><div><p>Available points</p><strong>${fmt(balance())}<span> pts</span></strong></div><a href="#points" aria-label="View points bank">${icon('arrow-up-right')}</a></article><article class="card acc-stat"><span class="acc-stat-icon orange">${icon('award')}</span><div><p>Appreciations received</p><strong>${history().filter(item => direction(item) === 'received').length}<span> moments</span></strong></div><a href="#history" aria-label="View recognition history">${icon('arrow-up-right')}</a></article><article class="card acc-stat"><span class="acc-stat-icon green">${icon('bag-heart')}</span><div><p>Rewards redeemed</p><strong>${orders().length}<span> rewards</span></strong></div><a href="#orders" aria-label="View reward orders">${icon('arrow-up-right')}</a></article></div>`;
  }
  function orderTable(items, compact = false) {
    if (!items.length) return empty('No orders to show', 'Your redeemed rewards will appear here. Try another date range or explore rewards.', 'bag-heart');
    return `<div class="acc-table-wrap"><table class="acc-table"><thead><tr><th>Reward / order</th><th>Ordered on</th><th>Points used</th><th>Status</th><th><span class="acc-sr-only">Details</span></th></tr></thead><tbody>${items.map(item => `<tr><td><div class="acc-order-name"><span class="acc-order-art">${item.image ? `<img src="${escape(item.image)}" alt="" loading="lazy">` : icon('gift')}</span><span><strong>${escape(item.name || 'Wingback reward')}</strong><small>#${escape(item.id)}</small></span></div></td><td>${displayDate(item.date)}</td><td class="acc-number">${fmt(item.points)} pts</td><td>${statusBadge(item.status)}</td><td><button class="${compact ? 'icon-btn' : 'btn btn-text'}" data-account-action="order-detail" data-id="${escape(item.id)}" aria-label="View order ${escape(item.id)}">${compact ? icon('arrow-right') : 'View details ' + icon('arrow-right')}</button></td></tr>`).join('')}</tbody></table></div>`;
  }
  function historyTable(items, compact = false) {
    if (!items.length) return empty('A little appreciation goes a long way', `No ${viewState.historyTab} recognitions match this view. Your next great moment could be just around the corner.`, 'stars');
    return `<div class="acc-table-wrap"><table class="acc-table"><thead><tr><th>Recognition</th><th>${!compact && viewState.historyTab !== 'received' ? 'To teammates' : 'From teammate'}</th><th>Date</th><th>Points</th><th><span class="acc-sr-only">Details</span></th></tr></thead><tbody>${items.map(item => `<tr><td><div class="acc-recognition-name"><span class="acc-mini-award">${icon('stars')}</span><span><strong>${escape(item.title || 'A little appreciation')}</strong><small>${escape(item.value || 'Everyday wins')}${historyStatus(item) ? ' · ' + escape(historyStatus(item)) : ''}</small></span></div></td><td><span class="acc-person-cell">${avatar(personName(item))}<span>${escape(personName(item))}</span></span></td><td>${displayDate(item.date)}</td><td><span class="acc-points-pill">${direction(item) === 'received' ? '+' : ''}${pointSummary(item)}</span></td><td><button class="icon-btn" data-account-action="history-detail" data-id="${escape(item.id)}" aria-label="Read ${escape(item.title || 'recognition')}">${icon('arrow-up-right')}</button></td></tr>`).join('')}</tbody></table></div>`;
  }
  function overview() {
    const profile = getProfile();
    return `${heading('My account', 'A little space for your big moments.')} ${tabs('account')}<section class="card acc-profile-banner"><div class="acc-profile-identity">${avatar(profile.name, 'acc-avatar-large')}<div><h2>${escape(profile.name)} <span class="acc-member-badge">${icon('patch-check-fill')} Team member</span></h2><p>${escape(profile.role)} · ${escape(profile.department)}</p><small>${icon('geo-alt')}${escape(profile.location)}</small></div></div><a class="btn btn-secondary" href="#profile">${icon('pencil')}Edit profile</a></section>${summaryCards()}<div class="acc-overview-columns"><section class="card acc-wallet-card"><div class="acc-wallet-top"><span>${icon('wallet2')} YOUR POINTS BANK</span><span class="acc-wallet-mark">${icon('stars')}</span></div><p>Good work. Great possibilities.</p><div class="acc-wallet-amount">${fmt(balance())}<span>points to enjoy</span></div><div class="acc-wallet-bottom"><span>Find a reward that feels like you.</span><a class="btn" href="#rewards">Explore rewards ${icon('arrow-right')}</a></div></section><section class="card acc-recognition-highlight"><div class="section-heading"><h2>Your recognition story</h2>${icon('stars')}</div><p>Every thank-you makes a difference.</p><div class="acc-story-values"><div><strong>${history().filter(item => direction(item) === 'received').length}</strong><span>Received</span></div><div><strong>${history().filter(item => ['sent', 'group'].includes(direction(item))).length}</strong><span>Sent</span></div><div><strong>${fmt(state().budget ?? 600)}</strong><span>Points to give</span></div></div><a class="btn btn-text" href="#history">See your moments ${icon('arrow-right')}</a></section></div><section class="card acc-section"><div class="section-heading"><div><h2>Recent orders</h2><p class="muted">Good things, on their way to you.</p></div><a class="btn btn-text" href="#orders">View all ${icon('arrow-right')}</a></div>${orderTable(orders().slice(0, 3), true)}</section><section class="card acc-section"><div class="section-heading"><div><h2>Recent recognition</h2><p class="muted">Little reminders that your work matters.</p></div><a class="btn btn-text" href="#history">View history ${icon('arrow-right')}</a></div>${historyTable(history().filter(item => direction(item) === 'received').slice(0, 3), true)}</section>`;
  }
  function pointsPage() {
    const list = filtered('points', transactions());
    const earned = transactions().reduce((sum, item) => sum + Math.max(0, Number(item.amount) || 0), 0);
    const redeemed = orders().reduce((sum, item) => sum + Number(item.points || 0), 0);
    return `${heading('Points bank', 'Every point is a thank-you. Make yours count.', '<a class="btn btn-primary" href="#rewards">' + icon('gift') + 'Explore rewards</a>')}${tabs('points')}<div class="acc-summary-grid"><article class="card acc-stat"><span class="acc-stat-icon purple">${icon('wallet2')}</span><div><p>Available to redeem</p><strong>${fmt(balance())}<span> pts</span></strong></div></article><article class="card acc-stat"><span class="acc-stat-icon green">${icon('arrow-down-left')}</span><div><p>Points earned in this history</p><strong>${fmt(earned)}<span> pts</span></strong></div></article><article class="card acc-stat"><span class="acc-stat-icon orange">${icon('gift')}</span><div><p>Points redeemed in orders</p><strong>${fmt(redeemed)}<span> pts</span></strong></div></article></div><section class="card acc-section"><div class="section-heading"><div><h2>Your points activity</h2><p class="muted">Recognition received and rewards redeemed, all in one place.</p></div><span class="badge">Points bank</span></div>${dateFilters('points')}${list.length ? `<div class="acc-table-wrap"><table class="acc-table"><thead><tr><th>Activity</th><th>Date</th><th>Program</th><th>Points</th><th>Balance</th></tr></thead><tbody>${list.map(item => `<tr><td><div class="acc-recognition-name"><span class="acc-transaction-icon ${Number(item.amount) < 0 ? 'outgoing' : ''}">${icon(Number(item.amount) < 0 ? 'arrow-up-right' : 'arrow-down-left')}</span><span><strong>${escape(item.title || item.type)}</strong><small>${Number(item.amount) < 0 ? 'Reward redemption' : 'Recognition received'}</small></span></div></td><td>${displayDate(item.date)}</td><td>${escape(item.program || 'Everyday wins')}</td><td class="acc-number ${Number(item.amount) < 0 ? 'acc-minus' : 'acc-plus'}">${Number(item.amount) > 0 ? '+' : ''}${fmt(item.amount)}</td><td class="acc-number">${fmt(item.balance)} pts</td></tr>`).join('')}</tbody></table></div>` : empty('No activity in this date range', 'Clear your filters to see all points activity.', 'coin')}<div class="acc-table-footer"><span>${list.length} ${list.length === 1 ? 'transaction' : 'transactions'}</span><span>${icon('info-circle')}Points are for rewards within your organization.</span></div></section>`;
  }
  function ordersPage() {
    const list = filtered('orders', orders());
    return `${heading('My orders', 'The rewards you picked. The moments you earned.')} ${tabs('orders')}<section class="card acc-section"><div class="section-heading"><div><h2>Reward orders <span class="acc-count">${orders().length}</span></h2><p class="muted">Follow your rewards from checkout to your doorstep.</p></div><a class="btn btn-text" href="#rewards">Browse rewards ${icon('arrow-right')}</a></div>${dateFilters('orders')}${orderTable(list)}<div class="acc-table-footer"><span>Showing ${list.length} ${list.length === 1 ? 'order' : 'orders'}</span><span>${icon('truck')}Tracking updates appear in order details.</span></div></section><div class="acc-help-note">${icon('chat-square-heart')}<div><strong>A little help with your reward?</strong><p>Your people team can help with delivery or redemption queries.</p></div><button class="btn btn-secondary" data-account-action="order-help">Get help ${icon('arrow-right')}</button></div>`;
  }
  function historyPage() {
    const list = filtered('history', history().filter(item => direction(item) === viewState.historyTab));
    return `${heading('Recognition history', 'Good work deserves to be remembered.')} ${tabs('history')}<section class="card acc-section"><div class="acc-history-tabs" role="tablist" aria-label="Recognition direction">${['received', 'sent', 'pending', 'group'].map(tab => `<button type="button" role="tab" aria-selected="${viewState.historyTab === tab}" class="${viewState.historyTab === tab ? 'active' : ''}" data-account-action="history-tab" data-tab="${tab}">${tab[0].toUpperCase() + tab.slice(1)}<span>${history().filter(item => direction(item) === tab).length}</span></button>`).join('')}</div>${dateFilters('history')}${historyTable(list)}<div class="acc-table-footer"><span>${list.length} ${list.length === 1 ? 'recognition' : 'recognitions'}</span><span>Everyday wins, lasting impact.</span></div></section>`;
  }
  function profilePage() {
    const profile = getProfile();
    return `${heading('My profile', 'Let your team get to know the person behind the great work.')} ${tabs('profile')}<div class="acc-profile-layout"><section class="card acc-profile-aside">${avatar(profile.name, 'acc-avatar-xl')}<h2>${escape(profile.name)}</h2><p>${escape(profile.role)}</p><span class="acc-member-badge">${icon('patch-check-fill')} Acme team member</span><div class="acc-profile-meta"><span>${icon('building')}${escape(profile.department)}</span><span>${icon('geo-alt')}${escape(profile.location)}</span><span>${icon('calendar-heart')}Joined March 2023</span></div><p class="acc-profile-quote">“${escape(profile.bio)}”</p></section><div><section class="card acc-section"><div class="section-heading"><div><h2>Personal details</h2><p class="muted">Make this space your own.</p></div></div><form id="acc-profile-form"><div class="acc-form-grid"><label>Full name<input class="field" name="name" value="${escape(profile.name)}" maxlength="80" required></label><label>Job title<input class="field" name="role" value="${escape(profile.role)}" maxlength="80" required></label><label>Department<select class="field" name="department">${['Design', 'Engineering', 'Marketing', 'People & Culture', 'Sales', 'Operations'].map(item => `<option ${item === profile.department ? 'selected' : ''}>${item}</option>`).join('')}</select></label><label>Location<input class="field" name="location" value="${escape(profile.location)}" maxlength="100" required></label><label class="acc-full-width">A little about you<textarea class="field" name="bio" rows="3" maxlength="250">${escape(profile.bio)}</textarea></label><label class="acc-full-width">Outside of work, I enjoy<input class="field" name="interests" value="${escape(profile.interests)}" maxlength="150"></label></div><div class="acc-form-footer"><p class="muted">Changes are saved for this preview session.</p><button class="btn btn-primary" type="submit">Save changes ${icon('check2')}</button></div></form></section><section class="card acc-section"><div class="section-heading"><div><h2>Stay in the loop</h2><p class="muted">Choose the moments you want to hear about.</p></div></div>${[['appreciation', 'Appreciation updates', 'When a teammate sends you a little recognition.'], ['milestones', 'Team celebrations', 'Birthdays, work anniversaries and team milestones.'], ['digest', 'Weekly roundup', 'A thoughtful recap of your team’s week.']].map(([key, title, description]) => `<label class="acc-preference"><span><strong>${title}</strong><small>${description}</small></span><input type="checkbox" class="acc-switch" data-account-preference="${key}" ${viewState.notifications[key] ? 'checked' : ''} role="switch" aria-label="${title}"></label>`).join('')}</section></div></div>`;
  }
  GV.renderAccount = function (route) {
    const pages = { account: overview, points: pointsPage, orders: ordersPage, history: historyPage, profile: profilePage };
    return `<div class="acc-root">${(pages[route] || overview)()}</div>`;
  };
  function refresh(route, focusSelector) {
    const root = document.getElementById('page-content');
    root.innerHTML = GV.renderAccount(route);
    GV.bindAccount(route);
    if (focusSelector) root.querySelector(focusSelector)?.focus();
  }
  function showOrder(id) {
    const order = orders().find(item => String(item.id) === String(id));
    if (!order) return;
    const delivered = /deliver|complete/i.test(order.status);
    const shipped = /transit|ship/i.test(order.status) || delivered;
    GV.openModal('Your reward, on its journey', `<div class="acc-order-modal"><div class="acc-modal-order-top"><span class="acc-order-art large">${order.image ? `<img src="${escape(order.image)}" alt="${escape(order.name)}">` : icon('gift')}</span><div><span class="acc-eyebrow">ORDER #${escape(order.id)}</span><h3>${escape(order.name || 'Wingback reward')}</h3><p>${fmt(order.points)} points · ${displayDate(order.date)}</p>${statusBadge(order.status)}</div></div><div class="acc-tracking">${[['bag-check', 'Order confirmed', true], ['box-seam', 'Packed with care', shipped], ['truck', 'On the way', shipped], ['house-heart', 'Delivered', delivered]].map(([glyph, title, done]) => `<div class="acc-tracking-step ${done ? 'done' : ''}"><span>${icon(done ? 'check2' : glyph)}</span><strong>${title}</strong></div>`).join('')}</div><div class="acc-modal-note">${icon('info-circle')}<p>This is a sample order journey for the design preview. Live fulfillment and tracking will be connected later.</p></div><div class="acc-modal-facts"><div><span>Delivery to</span><strong>${escape(order.delivery?.name || getProfile().name)}</strong><p>${escape(order.delivery?.city || getProfile().location)}</p></div><div><span>Payment</span><strong>${fmt(order.points)} reward points</strong><p>Redeemed from your points bank</p></div></div></div>`);
  }
  function showHistory(id) {
    const item = history().find(entry => String(entry.id) === String(id));
    if (!item) return;
    GV.openModal('A moment worth keeping', `<div class="acc-recognition-modal"><div class="acc-ecard"><span class="acc-ecard-decoration left" aria-hidden="true">${icon('stars')}</span><span class="acc-ecard-decoration right" aria-hidden="true">${icon('stars')}</span>${icon('stars')}<span>WINGBACK RECOGNITION</span><h3>${escape(item.title || 'You make a difference.')}</h3><p>${escape(item.value || 'Everyday wins')}</p></div><div class="acc-modal-person">${avatar(personName(item))}<div><strong>${direction(item) === 'received' ? 'From' : 'To'} ${escape(personName(item))}</strong><p>${displayDate(item.date)} · ${pointSummary(item)}${recipientNames(item).length > 1 ? ` (${fmt(item.points)} each)` : ''}</p></div></div>${direction(item) === 'pending' ? `<div class="acc-modal-note">${icon(item.status === 'scheduled' ? 'calendar-event' : 'hourglass-split')}<p>${item.status === 'scheduled' ? `Scheduled for ${escape(item.scheduledFor ? new Date(item.scheduledFor).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'a future date')}. Saved in this preview only; no message will be sent later.` : 'This nomination is awaiting approval. Award points have not been given.'}</p></div>` : ''}<blockquote>${escape(item.message || 'Thank you for bringing your ideas, care and energy to the team. Your contribution makes a difference every day.')}</blockquote><p class="acc-modal-note">${icon('heart')}A little appreciation. A lasting feeling.</p></div>`);
  }
  function exportRows(route) {
    let rows;
    if (route === 'points') rows = [['Date', 'Activity', 'Program', 'Points', 'Balance'], ...filtered(route, transactions()).map(item => [dateKey(item.date), item.title || item.type, item.program || 'Everyday wins', item.amount, item.balance])];
    else if (route === 'orders') rows = [['Order ID', 'Date', 'Reward', 'Points', 'Status'], ...filtered(route, orders()).map(item => [item.id, dateKey(item.date), item.name, item.points, item.status])];
    else rows = [['Date', 'Recognition', viewState.historyTab === 'received' ? 'From teammate' : 'To teammates', 'Direction', 'Points per recipient', 'Total points', 'Status', 'Scheduled for'], ...filtered('history', history().filter(item => direction(item) === viewState.historyTab)).map(item => [dateKey(item.date), item.title, personName(item), direction(item), item.points, totalPoints(item), item.status || (direction(item) === 'pending' ? 'pending' : direction(item) === 'received' ? 'received' : 'sent'), item.scheduledFor || ''])];
    const csv = rows.map(row => row.map(value => {
      const text = String(value ?? '');
      const safe = /^[=+@\-]/.test(text) && !/^-?\d+(\.\d+)?$/.test(text) ? `'${text}` : text;
      return `"${safe.replace(/"/g, '""')}"`;
    }).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `wingback-${route}-preview.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    GV.toast('Your activity export is ready.');
  }
  GV.bindAccount = function (route) {
    controller?.abort();
    controller = new AbortController();
    const options = { signal: controller.signal };
    const root = document.getElementById('page-content');
    root.addEventListener('click', event => {
      const button = event.target.closest('[data-account-action]');
      if (!button) return;
      const action = button.dataset.accountAction;
      if (action === 'history-tab') {
        viewState.historyTab = button.dataset.tab;
        refresh(route, `[data-tab="${viewState.historyTab}"]`);
      } else if (action === 'clear-filter') {
        viewState.filters[button.dataset.route] = { from: '', to: '' };
        refresh(route, '[name="from"]');
      } else if (action === 'order-detail') showOrder(button.dataset.id);
      else if (action === 'history-detail') showHistory(button.dataset.id);
      else if (action === 'export') exportRows(button.dataset.route);
      else if (action === 'order-help') GV.openModal('Help with your reward', `<div class="acc-support-content"><span class="acc-stat-icon purple">${icon('chat-square-heart')}</span><h3>We’re here for the little things.</h3><p>For delivery updates, damaged items or redemption questions, share your order number with your organization’s people team.</p><div class="acc-modal-note">${icon('info-circle')}This preview uses sample orders. Support requests are not sent.</div><a class="btn btn-primary" href="#orders" onclick="GV.closeModal()">View my orders ${icon('arrow-right')}</a></div>`);
    }, options);
    root.addEventListener('submit', event => {
      const form = event.target;
      if (form.matches('[data-account-filter]')) {
        event.preventDefault();
        const values = new FormData(form);
        const filter = { from: values.get('from'), to: values.get('to') };
        if (filter.from && filter.to && filter.from > filter.to) {
          form.querySelector('.acc-filter-error').textContent = 'The end date should be on or after the start date.';
          form.querySelector('[name="to"]').focus();
          return;
        }
        viewState.filters[form.dataset.accountFilter] = filter;
        refresh(route, '[data-account-filter] button[type="submit"]');
      } else if (form.id === 'acc-profile-form') {
        event.preventDefault();
        const values = new FormData(form);
        const profile = getProfile();
        for (const key of ['name', 'role', 'location']) {
          const control = form.elements.namedItem(key);
          if (!String(values.get(key) || '').trim()) {
            control.setCustomValidity('Please enter a value.');
            control.reportValidity();
            return;
          }
        }
        for (const key of Object.keys(viewState.profile)) profile[key] = String(values.get(key) || '').trim();
        GV.updateShell?.();
        refresh(route, '[name="name"]');
        GV.toast('Profile updated for this preview session.');
      }
    }, options);
    root.addEventListener('input', event => {
      if (event.target.closest('#acc-profile-form')) event.target.setCustomValidity?.('');
    }, options);
    root.addEventListener('change', event => {
      const control = event.target.closest('[data-account-preference]');
      if (control) {
        viewState.notifications[control.dataset.accountPreference] = control.checked;
        GV.toast('Preference saved for this preview session.');
      }
    }, options);
  };
})();
