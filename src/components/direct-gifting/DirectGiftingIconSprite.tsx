const markup = `<svg width="0" height="0" style="position:absolute;overflow:hidden" aria-hidden="true" focusable="false">
  <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>
  <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
  <symbol id="i-send" viewBox="0 0 24 24"><path d="M21 3 10.5 13.5"/><path d="M21 3l-6.8 18-3.7-7.5L3 9.8Z"/></symbol>
  <symbol id="i-link" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/></symbol>
  <symbol id="i-briefcase" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/></symbol>
  <symbol id="i-crown" viewBox="0 0 24 24"><path d="M4 18h16"/><path d="m4 15 1-9 5 5 2-6 2 6 5-5 1 9Z"/></symbol>
  <symbol id="i-handshake" viewBox="0 0 24 24"><path d="m11 7 3-2 6 5v5l-4 3-4-4"/><path d="M13 5 9 4 3 9v5l4 3 3-3"/><path d="m10 14 2 2"/></symbol>
  <symbol id="i-ticket" viewBox="0 0 24 24"><path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4Z"/><path d="M13 6v12"/></symbol>
  <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></symbol>
  <symbol id="i-box" viewBox="0 0 24 24"><path d="M3 8l9-4 9 4v8l-9 4-9-4Z"/><path d="M3 8l9 4 9-4M12 12v8"/></symbol>
  <symbol id="i-note" viewBox="0 0 24 24"><path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"/><path d="M8 9h8M8 13h8M8 17h5"/></symbol>
  <symbol id="i-brush" viewBox="0 0 24 24"><path d="M4 20c3 0 4-2 4-4a2 2 0 0 0-4 0c0 2-1 3-1 3Z"/><path d="M8.5 15.5 19 5a2 2 0 0 0-3-3L5.5 12.5"/></symbol>
  <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="3"/></symbol>
  <symbol id="i-truck" viewBox="0 0 24 24"><path d="M3 7h11v10H3Z"/><path d="M14 11h4l3 3v3h-7Z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></symbol>
  <symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
  <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6Z"/><path d="M9 12l2 2 4-4"/></symbol>
</svg>`;

export function DirectGiftingIconSprite() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
