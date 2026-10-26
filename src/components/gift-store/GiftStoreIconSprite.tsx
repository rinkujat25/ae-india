const markup = `<svg width="0" height="0" style="position:absolute;overflow:hidden" aria-hidden="true" focusable="false">
        <symbol id="i-close" viewBox="0 0 24 24">
            <path d="M18 6 6 18M6 6l12 12" />
        </symbol>
        <symbol id="i-plus" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
        </symbol>
        <symbol id="i-sparkle" viewBox="0 0 24 24">
            <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z" />
            <path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8Z" />
        </symbol>
        <symbol id="i-gift" viewBox="0 0 24 24">
            <rect x="3" y="8" width="18" height="12" rx="2" />
            <path d="M3 12h18M12 8v12" />
            <path d="M12 8S10.5 4 8.5 4a2 2 0 0 0 0 4Z" />
            <path d="M12 8s1.5-4 3.5-4a2 2 0 0 1 0 4Z" />
        </symbol>
        <symbol id="i-users" viewBox="0 0 24 24">
            <path d="M16 19v-1a4 4 0 0 0-8 0v1" />
            <circle cx="12" cy="9" r="3" />
            <path d="M20 19v-1.2a3 3 0 0 0-2-2.8" />
            <path d="M4 19v-1.2A3 3 0 0 1 6 15" />
        </symbol>
        <symbol id="i-wallet" viewBox="0 0 24 24">
            <path d="M4 7h15a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a3 3 0 0 1 3-3h12" />
            <path d="M16 13h5" />
            <path d="M7 11h4" />
        </symbol>
        <symbol id="i-store" viewBox="0 0 24 24">
            <path d="M4 10h16l-1-5H5Z" />
            <path d="M6 10v10h12V10" />
            <path d="M9 20v-5h6v5" />
            <path d="M4 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
        </symbol>
        <symbol id="i-truck" viewBox="0 0 24 24">
            <path d="M3 7h11v10H3Z" />
            <path d="M14 11h4l3 3v3h-7Z" />
            <circle cx="7" cy="18" r="2" />
            <circle cx="18" cy="18" r="2" />
        </symbol>
        <symbol id="i-badge" viewBox="0 0 24 24">
            <circle cx="12" cy="9" r="5" />
            <path d="M9 13.5 8 21l4-2 4 2-1-7.5" />
        </symbol>
        <symbol id="i-heart" viewBox="0 0 24 24">
            <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
        </symbol>
        <symbol id="i-briefcase" viewBox="0 0 24 24">
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
            <path d="M3 12h18" />
        </symbol>
        <symbol id="i-calendar" viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18M8 3v4M16 3v4" />
            <path d="M8 14h3v3H8Z" />
        </symbol>
        <symbol id="i-list" viewBox="0 0 24 24">
            <path d="M8 6h13M8 12h13M8 18h13" />
            <path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24">
            <path d="M20 6 9 17l-5-5" />
        </symbol>
        <symbol id="i-shield" viewBox="0 0 24 24">
            <path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6Z" />
            <path d="M9 12l2 2 4-4" />
        </symbol>
        <symbol id="i-chart" viewBox="0 0 24 24">
            <path d="M4 20V4" />
            <path d="M4 20h16" />
            <path d="M8 20v-6M13 20V8M18 20v-9" />
        </symbol>
        <symbol id="i-link" viewBox="0 0 24 24">
            <path d="M10 13a4 4 0 0 0 5.7.3l3-3a4 4 0 0 0-5.7-5.7L11.5 6" />
            <path d="M14 11a4 4 0 0 0-5.7-.3l-3 3a4 4 0 0 0 5.7 5.7L12.5 18" />
        </symbol>
        <symbol id="i-audio" viewBox="0 0 24 24">
            <path d="M3 14v-3a7 7 0 0 1 14 0v3" />
            <path d="M5 14h2a2 2 0 0 1 2 2v3H7a4 4 0 0 1-4-4v-1a2 2 0 0 1 2-2Z" />
            <path d="M19 14h-2a2 2 0 0 0-2 2v3h2a4 4 0 0 0 4-4v-1a2 2 0 0 0-2-2Z" />
        </symbol>
        <symbol id="i-home" viewBox="0 0 24 24">
            <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1Z" />
            <path d="M9 21v-6h6v6" />
        </symbol>
        <symbol id="i-wellness" viewBox="0 0 24 24">
            <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" />
            <path d="M8 12h2l1-2 2 5 1-3h2" />
        </symbol>
        <symbol id="i-travel" viewBox="0 0 24 24">
            <rect x="5" y="7" width="14" height="13" rx="2" />
            <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
            <path d="M9 20v2M15 20v2" />
        </symbol>
        <symbol id="i-gourmet" viewBox="0 0 24 24">
            <path d="M7 10h10v8a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4Z" />
            <path d="M9 10V7a3 3 0 0 1 6 0v3" />
            <path d="M5 10h14" />
            <path d="M10 15h4" />
        </symbol>
        <symbol id="i-fashion" viewBox="0 0 24 24">
            <path d="M6 9h12l1 11H5Z" />
            <path d="M9 9a3 3 0 0 1 6 0" />
            <path d="M9 13h6" />
        </symbol>
        <symbol id="i-experience" viewBox="0 0 24 24">
            <path
                d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4Z" />
            <path d="M9 9h.01M9 15h.01M13 12h3" />
        </symbol>
        <symbol id="i-card" viewBox="0 0 24 24">
            <rect x="4" y="6" width="16" height="12" rx="2" />
            <path d="M4 10h16" />
            <path d="M8 15h3" />
        </symbol>
    </svg>`;

export function GiftStoreIconSprite() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
