/* Wingback Phase 2 · Local, static appreciation prototype. */
(() => {
  'use strict';

  window.GV = window.GV || {};
  let dialog;
  let draft;
  let previousOverflow = '';
  let trigger;
  const values = [
    { name: 'Better together', detail: 'Great things happen as a team', icon: 'people' },
    { name: 'Make it happen', detail: 'Care that goes above and beyond', icon: 'rocket-takeoff' },
    { name: 'Stay curious', detail: 'A fresh idea that makes a difference', icon: 'lightbulb' },
    { name: 'Own the outcome', detail: 'Follow through with purpose', icon: 'bullseye' },
    { name: 'Customer first', detail: 'Make every experience count', icon: 'heart' },
    { name: 'Lead with care', detail: 'Make room for everyone', icon: 'flower1' }
  ];
  const themes = [
    { id: 'above', title: 'Above &\nbeyond.', subtitle: 'You make the extraordinary happen.', icon: 'stars', color: 'lilac' },
    { id: 'thanks', title: 'A little thanks.\nA big impact.', subtitle: 'So grateful for everything you do.', icon: 'heart', color: 'peach' },
    { id: 'together', title: 'Better,\ntogether.', subtitle: 'The best part of this team is you.', icon: 'people', color: 'mint' },
    { id: 'ideas', title: 'Big ideas.\nBrighter days.', subtitle: 'Keep bringing your brilliant perspective.', icon: 'lightbulb', color: 'yellow' },
    { id: 'win', title: 'Now that’s\na win.', subtitle: 'Here’s to the work that makes a difference.', icon: 'trophy', color: 'pink' },
    { id: 'star', title: 'You’re a\nwhole star.', subtitle: 'A little recognition for a lot of amazing.', icon: 'star', color: 'blue' }
  ];

  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = name => window.GV.icon ? window.GV.icon(name) : `<i class="bi bi-${esc(name)}" aria-hidden="true"></i>`;
  const people = () => window.GV.data?.people || [];
  const personById = id => people().find(person => String(person.id) === String(id));
  const selected = () => draft.recipientIds.map(personById).filter(Boolean);
  const number = value => Number(value).toLocaleString('en-IN');
  const budget = () => Number(window.GV.state?.budget ?? 600);
  const total = () => draft.points * draft.recipientIds.length;
  const selectedTheme = () => themes.find(theme => theme.id === draft.theme) || themes[0];
  const avatar = person => window.GV.avatar ? window.GV.avatar(person.name, 'appreciation-avatar') : `<span class="appreciation-avatar avatar">${esc(person.name.split(' ').map(part => part[0]).slice(0, 2).join(''))}</span>`;

  function newDraft(personId, type = 'ecard') {
    const nomination = type === 'nomination';
    return {
      step: 1, type: nomination ? 'nomination' : 'ecard', group: false, recipientIds: personById(personId) ? [String(personId)] : [],
      search: '', value: '', points: nomination ? 250 : 50, theme: 'above', message: '', public: true,
      notify: false, schedule: false, scheduledFor: '', review: false, success: false, error: ''
    };
  }

  function ensureDialog() {
    if (dialog) return;
    dialog = document.createElement('dialog');
    dialog.id = 'appreciation-dialog';
    dialog.className = 'appreciation-dialog';
    dialog.setAttribute('aria-labelledby', 'appreciation-title');
    document.body.append(dialog);
    dialog.addEventListener('click', onClick);
    dialog.addEventListener('input', onInput);
    dialog.addEventListener('change', onChange);
    dialog.addEventListener('close', () => {
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus();
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  }

  window.GV.openAppreciation = function openAppreciation(personId, type = 'ecard') {
    ensureDialog();
    trigger = document.activeElement;
    draft = newDraft(personId, type);
    render(false);
    if (!dialog.open) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    }
    dialog.querySelector('#appreciation-search')?.focus();
  };

  function render(focus = true) {
    if (draft.success) {
      renderSuccess();
      return;
    }
    const heading = draft.review ? 'A little recognition. A lasting impact.' : ['Who made your day?', 'What made them stand out?', 'Find the right words, visually.', 'Make it personal.'][draft.step - 1];
    const subtitle = draft.review ? 'Take a moment to review your appreciation.' : [
      'Recognize the people who make work a little more wonderful.',
      'Connect their contribution to a value we share.',
      'Pick an eCard that feels just right for the moment.',
      'Tell them how their contribution made a difference.'
    ][draft.step - 1];
    const steps = ['Choose people', 'Recognition', 'Choose eCard', 'Your message'];
    dialog.innerHTML = `
      <div class="appreciation-topline"><span>${icon('stars')} A MOMENT OF APPRECIATION</span><button class="icon-btn appreciation-close" data-app-action="close" aria-label="Close appreciation">${icon('x-lg')}</button></div>
      <header class="appreciation-header"><h2 id="appreciation-title" tabindex="-1">${heading}</h2><p>${subtitle}</p></header>
      <ol class="appreciation-steps" aria-label="Appreciation progress">${steps.map((label, index) => `<li class="${index + 1 === draft.step ? 'is-current' : index + 1 < draft.step ? 'is-complete' : ''}" ${index + 1 === draft.step ? 'aria-current="step"' : ''}><span>${index + 1 < draft.step ? icon('check2') : index + 1}</span><b>${label}</b></li>`).join('')}</ol>
      <div class="appreciation-body">${draft.review ? reviewView() : [recipientView, recognitionView, themeView, messageView][draft.step - 1]()}</div>
      <div class="appreciation-error" id="appreciation-error" role="alert" ${draft.error ? '' : 'hidden'}>${esc(draft.error)}</div>
      <footer class="appreciation-footer"><span class="appreciation-footer-note">${icon('shield-check')} ${draft.type === 'nomination' ? 'A nomination for your team’s review' : 'Small gestures. Stronger connections.'}</span><div><button class="btn btn-secondary" data-app-action="${draft.step === 1 ? 'close' : 'back'}">${draft.step === 1 ? 'Cancel' : `${icon('arrow-left')} Back`}</button><button class="btn btn-primary" data-app-action="${draft.review ? 'send' : 'next'}" ${isStepValid() ? '' : 'disabled'}>${draft.review ? (draft.type === 'nomination' ? 'Submit nomination' : draft.schedule ? 'Schedule appreciation' : 'Send appreciation') : draft.step === 4 ? 'Preview appreciation' : 'Continue'} ${icon(draft.review ? 'send' : 'arrow-right')}</button></div></footer>`;
    if (focus) dialog.querySelector('#appreciation-title')?.focus({ preventScroll: true });
    dialog.scrollTop = 0;
  }

  function recipientView() {
    return `<div class="appreciation-type-picker" aria-label="Recognition type"><button data-app-action="type" data-type="ecard" class="${draft.type === 'ecard' ? 'is-selected' : ''}" aria-pressed="${draft.type === 'ecard'}">${icon('envelope-heart')} Send an eCard</button><button data-app-action="type" data-type="nomination" class="${draft.type === 'nomination' ? 'is-selected' : ''}" aria-pressed="${draft.type === 'nomination'}">${icon('award')} Nominate for an award</button></div>
      <div class="appreciation-field-label"><label for="appreciation-search">Find a teammate</label><label class="appreciation-check"><input type="checkbox" id="appreciation-group" ${draft.group ? 'checked' : ''}> Appreciate a group</label></div>
      <div class="appreciation-search">${icon('search')}<input id="appreciation-search" type="search" value="${esc(draft.search)}" placeholder="Search by name or department" autocomplete="off"></div>
      <div class="appreciation-selected" id="appreciation-selected">${selectedChips()}</div>
      <div class="appreciation-list-label"><span>YOUR TEAMMATES</span><span id="appreciation-selected-count">${selected().length} selected</span></div>
      <div class="appreciation-people" id="appreciation-people">${peopleList()}</div>
      <p class="appreciation-tip">${icon('lightbulb')} A thoughtful thank-you can turn a good day into a great one.</p>`;
  }

  function selectedChips() {
    return selected().map(person => `<span class="appreciation-person-chip">${esc(person.name)}<button data-app-action="remove-person" data-person-id="${esc(person.id)}" aria-label="Remove ${esc(person.name)}">${icon('x')}</button></span>`).join('');
  }

  function peopleList() {
    const query = draft.search.trim().toLowerCase();
    const matches = people().filter(person => `${person.name} ${person.department} ${person.role}`.toLowerCase().includes(query));
    return matches.length ? matches.map(person => {
      const active = draft.recipientIds.includes(String(person.id));
      return `<button class="appreciation-person ${active ? 'is-selected' : ''}" data-app-action="select-person" data-person-id="${esc(person.id)}" aria-pressed="${active}">${avatar(person)}<span class="appreciation-person-info"><strong>${esc(person.name)}</strong><small>${esc(person.role || person.department)}${person.role && person.department ? ` · ${esc(person.department)}` : ''}</small></span><span class="appreciation-person-check">${icon(active ? 'check2' : 'plus')}</span></button>`;
    }).join('') : `<div class="appreciation-empty">${icon('search')}<strong>No teammates found</strong><p>Try another name or department.</p></div>`;
  }

  function recipientSummary() {
    const recipients = selected();
    return `<div class="appreciation-recipient-summary"><span class="appreciation-avatar-stack">${recipients.slice(0, 3).map(avatar).join('')}</span><div><small>APPRECIATING</small><strong>${esc(recipients.length > 2 ? `${recipients[0].name} + ${recipients.length - 1} teammates` : recipients.map(person => person.name).join(' & '))}</strong></div><button class="btn-text" data-app-action="edit-people">Edit</button></div>`;
  }

  function recognitionView() {
    const options = draft.type === 'nomination' ? [100, 250, 500] : [0, 25, 50, 100];
    return `${recipientSummary()}<div class="appreciation-section-label"><h3>Celebrate a shared value</h3><span>Choose one</span></div>
      <div class="appreciation-values">${values.map(value => `<button data-app-action="value" data-value="${esc(value.name)}" class="appreciation-value ${draft.value === value.name ? 'is-selected' : ''}" aria-pressed="${draft.value === value.name}"><span class="appreciation-value-icon">${icon(value.icon)}</span><span><strong>${esc(value.name)}</strong><small>${esc(value.detail)}</small></span>${draft.value === value.name ? `<span class="appreciation-value-selected">${icon('check-circle-fill')}</span>` : ''}</button>`).join('')}</div>
      <div class="appreciation-section-label"><h3>${draft.type === 'nomination' ? 'Choose an award level' : 'Add a little extra'}</h3><span>${draft.type === 'nomination' ? 'Subject to approval' : `${number(budget())} points available to give`}</span></div>
      <div class="appreciation-points">${options.map((point, index) => `<button data-app-action="points" data-points="${point}" class="${draft.points === point ? 'is-selected' : ''}" aria-pressed="${draft.points === point}">${icon(point ? 'coin' : 'heart')}<strong>${point ? number(point) : 'Just thanks'}</strong><small>${draft.type === 'nomination' ? ['Bronze award', 'Silver award', 'Gold award'][index] : point ? 'points / person' : 'No points'}</small></button>`).join('')}</div>
      <div class="appreciation-budget ${draft.type === 'ecard' && total() > budget() ? 'is-over-budget' : ''}">${icon('info-circle')} ${draft.type === 'nomination' ? 'Your nomination will appear as pending in this demo. Award points are given only after approval.' : total() > budget() ? `This needs ${number(total())} points. Choose a lower amount to stay within your ${number(budget())}-point giving budget.` : draft.group && selected().length > 1 ? `${number(draft.points)} points × ${selected().length} teammates = ${number(total())} points from your giving budget.` : 'Appreciation points come from your giving budget, separate from your rewards balance.'}</div>`;
  }

  function ecard(theme, large = false) {
    return `<div class="appreciation-ecard appreciation-ecard-${theme.color} ${large ? 'appreciation-ecard-large' : ''}"><span class="appreciation-ecard-brand">wingback<span>${icon('stars')}</span></span><span class="appreciation-ecard-symbol">${icon(theme.icon)}</span><strong>${esc(theme.title).replace(/\n/g, '<br>')}</strong><span class="appreciation-ecard-caption">${esc(theme.subtitle)}</span></div>`;
  }

  function themeView() {
    return `${recipientSummary()}<div class="appreciation-section-label"><h3>A card for every kind of wonderful</h3><span>6 eCards</span></div><div class="appreciation-themes">${themes.map(theme => `<button class="appreciation-theme ${draft.theme === theme.id ? 'is-selected' : ''}" data-app-action="theme" data-theme="${theme.id}" aria-label="Choose ${esc(theme.title.replace(/\n/g, ' '))} eCard" aria-pressed="${draft.theme === theme.id}">${ecard(theme)}<span class="appreciation-theme-name">${esc(theme.title.replace(/\n/g, ' '))}<span>${icon(draft.theme === theme.id ? 'check-circle-fill' : 'circle')}</span></span></button>`).join('')}</div>`;
  }

  function localMinDate() {
    const now = new Date(Date.now() + 60 * 1000);
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  }

  function messageView() {
    return `<div class="appreciation-message-preview">${ecard(selectedTheme())}<div><span class="appreciation-mini-label">A NOTE FOR</span><strong>${esc(selected().map(person => person.name.split(' ')[0]).join(', '))}</strong><p>${esc(draft.value)}</p><span class="appreciation-mini-badge">${icon('coin')} ${number(draft.points)} points ${selected().length > 1 ? 'each' : ''}</span><button class="btn-text" data-app-action="edit-theme">Change eCard</button></div></div>
      <label class="appreciation-message-label" for="appreciation-message">What made their contribution special? <span>*</span></label>
      <textarea id="appreciation-message" class="field appreciation-message" maxlength="2500" rows="5" placeholder="Thank you for… Share a specific moment and the difference it made." aria-describedby="appreciation-message-help">${esc(draft.message)}</textarea>
      <div class="appreciation-message-help" id="appreciation-message-help"><span>Make it meaningful. Write at least 20 characters.</span><span id="appreciation-character-count">${draft.message.length}/2,500</span></div>
      <div class="appreciation-settings"><label class="appreciation-setting"><span><strong>Share on the celebration feed</strong><small>Let your team celebrate this moment, too.</small></span><input type="checkbox" role="switch" id="appreciation-public" ${draft.public ? 'checked' : ''}><span class="appreciation-switch" aria-hidden="true"></span></label><label class="appreciation-setting"><span><strong>Notify me when it’s opened</strong><small>A little nudge when your appreciation is seen.</small></span><input type="checkbox" role="switch" id="appreciation-notify" ${draft.notify ? 'checked' : ''}><span class="appreciation-switch" aria-hidden="true"></span></label>${draft.type === 'ecard' ? `<label class="appreciation-setting"><span><strong>Save a moment for later</strong><small>Choose a future date and time.</small></span><input type="checkbox" role="switch" id="appreciation-schedule" ${draft.schedule ? 'checked' : ''}><span class="appreciation-switch" aria-hidden="true"></span></label><div class="appreciation-schedule-field" id="appreciation-schedule-field" ${draft.schedule ? '' : 'hidden'}><label for="appreciation-date">Send date & time <span>(your local time)</span></label><input class="field" type="datetime-local" id="appreciation-date" min="${localMinDate()}" value="${esc(draft.scheduledFor)}"></div>` : ''}</div>`;
  }

  function reviewView() {
    return `<div class="appreciation-review-card">${ecard(selectedTheme(), true)}<div class="appreciation-review-message"><span class="appreciation-mini-label">TO ${esc(selected().map(person => person.name).join(', '))}</span><p>${esc(draft.message).replace(/\n/g, '<br>')}</p><span class="appreciation-review-signature">With appreciation,<br><strong>You</strong></span></div></div><div class="appreciation-review-meta"><span>${icon('stars')} ${esc(draft.value)}</span><span>${icon('coin')} ${number(total())} points ${selected().length > 1 ? 'total' : ''}</span><span>${icon(draft.public ? 'globe2' : 'lock')} ${draft.public ? 'Team celebration feed' : 'Private appreciation'}</span>${draft.notify ? `<span>${icon('bell')} Notify when opened</span>` : ''}${draft.schedule ? `<span>${icon('calendar-event')} ${esc(new Date(draft.scheduledFor).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }))}</span>` : ''}</div><div class="appreciation-demo-note">${icon('info-circle')} This is a design preview. ${draft.type === 'nomination' ? 'Your nomination is saved only in this demo.' : draft.schedule ? 'Scheduled appreciation is saved only in this demo; no message will be sent later.' : 'Your appreciation will appear in this demo only. No real messages are sent.'}</div>`;
  }

  function isStepValid() {
    if (!draft.recipientIds.length) return false;
    if (draft.step >= 2 && (!draft.value || (draft.type === 'ecard' && total() > budget()))) return false;
    if (draft.step >= 3 && !draft.theme) return false;
    if (draft.step >= 4 && (draft.message.trim().length < 20 || draft.message.length > 2500)) return false;
    if (draft.step >= 4 && draft.schedule && (!draft.scheduledFor || new Date(draft.scheduledFor).getTime() <= Date.now())) return false;
    return true;
  }

  function refreshButton() {
    const button = dialog.querySelector('[data-app-action="next"], [data-app-action="send"]');
    if (button) button.disabled = !isStepValid();
  }

  function onClick(event) {
    const button = event.target.closest('[data-app-action]');
    if (!button || button.disabled) return;
    const action = button.dataset.appAction;
    if (action === 'close') return dialog.close();
    if (action === 'restart') { draft = newDraft(); render(); return; }
    if (action === 'select-person' || action === 'remove-person') {
      const id = button.dataset.personId;
      if (!personById(id)) return;
      if (draft.recipientIds.includes(id)) draft.recipientIds = draft.recipientIds.filter(value => value !== id);
      else if (draft.group) draft.recipientIds.push(id);
      else draft.recipientIds = [id];
      dialog.querySelector('#appreciation-selected').innerHTML = selectedChips();
      dialog.querySelector('#appreciation-selected-count').textContent = `${selected().length} selected`;
      dialog.querySelector('#appreciation-people').innerHTML = peopleList();
      refreshButton();
      return;
    }
    if (action === 'type') { draft.type = button.dataset.type; draft.points = draft.type === 'nomination' ? 250 : 50; draft.schedule = false; }
    if (action === 'value') draft.value = button.dataset.value;
    if (action === 'points') draft.points = Number(button.dataset.points);
    if (action === 'theme') draft.theme = button.dataset.theme;
    if (action === 'edit-people') { draft.step = 1; draft.review = false; }
    if (action === 'edit-theme') { draft.step = 3; draft.review = false; }
    if (action === 'next') {
      if (!isStepValid()) return;
      if (draft.step < 4) draft.step++;
      else draft.review = true;
    }
    if (action === 'back') {
      if (draft.review) draft.review = false;
      else draft.step = Math.max(1, draft.step - 1);
    }
    if (action === 'send') { send(); return; }
    draft.error = '';
    render(!['type', 'value', 'points', 'theme'].includes(action));
    if (['type', 'value', 'points', 'theme'].includes(action)) {
      const selector = action === 'type' ? `[data-type="${draft.type}"]` : action === 'points' ? `[data-points="${draft.points}"]` : action === 'theme' ? `[data-theme="${draft.theme}"]` : `[data-value="${draft.value}"]`;
      dialog.querySelector(selector)?.focus({ preventScroll: true });
    }
  }

  function onInput(event) {
    const target = event.target;
    if (target.id === 'appreciation-search') {
      draft.search = target.value;
      dialog.querySelector('#appreciation-people').innerHTML = peopleList();
    }
    if (target.id === 'appreciation-message') {
      draft.message = target.value;
      dialog.querySelector('#appreciation-character-count').textContent = `${draft.message.length}/2,500`;
      refreshButton();
    }
    if (target.id === 'appreciation-date') { draft.scheduledFor = target.value; refreshButton(); }
  }

  function onChange(event) {
    const target = event.target;
    if (target.id === 'appreciation-group') {
      draft.group = target.checked;
      if (!draft.group) draft.recipientIds = draft.recipientIds.slice(0, 1);
      render(false);
      dialog.querySelector('#appreciation-group')?.focus();
    }
    if (target.id === 'appreciation-public') draft.public = target.checked;
    if (target.id === 'appreciation-notify') draft.notify = target.checked;
    if (target.id === 'appreciation-schedule') {
      draft.schedule = target.checked;
      dialog.querySelector('#appreciation-schedule-field').hidden = !target.checked;
      if (target.checked) dialog.querySelector('#appreciation-date').focus();
      refreshButton();
    }
    if (target.id === 'appreciation-date') { draft.scheduledFor = target.value; refreshButton(); }
  }

  function send() {
    if (!isStepValid()) {
      draft.error = draft.schedule ? 'Please choose a future date and time before scheduling.' : 'Please review your details and available giving points.';
      render();
      return;
    }
    const recognition = {
      id: `recognition-${Date.now()}`, recipients: selected(), person: selected()[0], sender: 'You',
      value: draft.value, points: draft.points, totalPoints: total(), theme: draft.theme,
      title: selectedTheme().title.replace(/\n/g, ' '), message: draft.message.trim(),
      visibility: draft.public ? 'public' : 'private', notify: draft.notify, type: draft.type,
      status: draft.type === 'nomination' ? 'pending' : draft.schedule ? 'scheduled' : 'sent',
      scheduledFor: draft.schedule ? new Date(draft.scheduledFor).toISOString() : null,
      date: new Date().toISOString()
    };
    if (recognition.status === 'sent' && window.GV.state) window.GV.state.budget = Math.max(0, budget() - total());
    window.GV.onRecognition?.(recognition);
    draft.success = true;
    draft.result = recognition;
    renderSuccess();
  }

  function renderSuccess() {
    const scheduled = draft.result.status === 'scheduled';
    const nominated = draft.result.status === 'pending';
    dialog.innerHTML = `<div class="appreciation-success"><button class="icon-btn appreciation-close" data-app-action="close" aria-label="Close appreciation">${icon('x-lg')}</button><div class="appreciation-success-symbol">${icon(nominated ? 'award' : scheduled ? 'calendar-heart' : 'envelope-heart')}</div><span class="appreciation-mini-label">${nominated ? 'NOMINATION SAVED' : scheduled ? 'A MOMENT TO LOOK FORWARD TO' : 'YOU JUST MADE SOMEONE’S DAY'}</span><h2 id="appreciation-title" tabindex="-1">${nominated ? 'Great work deserves the spotlight.' : scheduled ? 'Your appreciation is scheduled.' : 'A little thanks goes a long way.'}</h2><p>${nominated ? `Your nomination for ${esc(selected().map(person => person.name).join(', '))} is marked as pending.` : scheduled ? `Saved for ${esc(new Date(draft.scheduledFor).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }))}.` : `Your appreciation for ${esc(selected().map(person => person.name.split(' ')[0]).join(', '))} has been added to your demo activity.`}</p><div class="appreciation-success-card">${ecard(selectedTheme())}<span>${icon('stars')} ${esc(draft.value)}${draft.points ? ` <b>+${number(draft.points)} pts${selected().length > 1 ? ' each' : ''}</b>` : ''}</span></div><div class="appreciation-demo-note">${icon('info-circle')} Demo only. ${scheduled ? 'No message is scheduled for real delivery.' : nominated ? 'No approval request has been sent.' : 'No real messages or points have been sent.'}</div><div class="appreciation-success-actions"><button class="btn btn-secondary" data-app-action="restart">Appreciate someone else</button><button class="btn btn-primary" data-app-action="close">Done ${icon('check2')}</button></div></div>`;
    dialog.querySelector('#appreciation-title')?.focus({ preventScroll: true });
    dialog.scrollTop = 0;
  }
})();
