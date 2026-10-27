"use client";

import { useSyncExternalStore } from "react";
import { giftverseLinkProps, giftverseUrl } from "@/lib/giftverse";
import {
    acknowledgeCookies,
    getAcknowledgedServerSnapshot,
    hasAcknowledgedCookies,
    subscribeToCookieNotice,
} from "@/utils/cookie-notice";

/**
 * The cookie notice, shown once on a visitor's first arrival.
 *
 * It informs rather than asks, which was uncontroversial while the only cookies
 * were the signed-in session: an "accept / reject" pair would have implied a
 * choice that changed nothing, since the session cookie cannot be declined and
 * still leave a working login.
 *
 * Google Analytics changes that. Its cookies are measurement, not function, and
 * a visitor could reasonably decline them and lose nothing they came for — so
 * this notice now understates what it should offer. Making the choice real means
 * Consent Mode: defaulting `analytics_storage` to denied and raising it only on
 * an explicit accept. Until then the wording at least stops claiming the site
 * does not measure anything, and `cookieNoticeVersion` has been bumped so
 * everyone who dismissed the earlier, narrower notice is told again.
 *
 * Nothing renders until the store has been read on the client. The
 * acknowledgement lives in `localStorage`, which the server cannot see, so
 * rendering the notice during SSR would flash it at visitors who dismissed it
 * long ago and would not match what React hydrates.
 */
const styles = `
  .cookie-notice{
    background:var(--card);
    border:1px solid var(--line);
    border-radius:var(--r-md);
    bottom:24px;
    box-shadow:var(--shadow);
    color:var(--ink);
    left:24px;
    max-width:420px;
    padding:18px 20px;
    position:fixed;
    /* Above the WhatsApp float at 900, below the header's search overlay at
       1000 and the toasts at 1100. The enquiry modal is a native <dialog>, so
       it sits in the top layer regardless. */
    z-index:950;
    animation:cookie-notice-in .26s cubic-bezier(.22,.61,.36,1);
  }

  .cookie-notice p{
    color:var(--muted);
    font-size:var(--t-sm);
    line-height:1.55;
    margin:0 0 14px;
  }

  .cookie-notice a{
    color:var(--violet);
    text-decoration:underline;
    text-underline-offset:2px;
  }

  .cookie-notice-accept{
    background:var(--violet);
    border:0;
    border-radius:var(--r-pill);
    color:#fff;
    cursor:pointer;
    font:inherit;
    font-size:14px;
    font-weight:600;
    padding:9px 20px;
    transition:background .18s ease;
  }

  @media (hover:hover){
    .cookie-notice-accept:hover{background:var(--violet-ink)}
  }

  .cookie-notice-accept:focus-visible,
  .cookie-notice a:focus-visible{outline:3px solid var(--violet);outline-offset:3px}

  @media (max-width:560px){
    /* Full width on a phone, which puts it under the WhatsApp float, so it
       sits above it instead: the float's own 16px margin, its 52px at this
       width (both from WhatsAppButton), and 12px of air. Moving the notice is
       what keeps this a pure CSS arrangement — lifting the float instead means
       measuring this card at runtime, and its height changes with how the text
       wraps. */
    .cookie-notice{bottom:80px;left:16px;max-width:none;padding:16px;right:16px}
  }

  @keyframes cookie-notice-in{
    from{opacity:0;transform:translateY(12px)}
    to{opacity:1;transform:none}
  }

  @media (prefers-reduced-motion:reduce){
    .cookie-notice{animation-duration:.01ms}
  }
`;

export function CookieNotice() {
    // The acknowledgement lives in localStorage, which is an external store in
    // React's sense: read it through useSyncExternalStore rather than copying it
    // into state from an effect, so hydration sees a consistent value and a
    // second tab's dismissal propagates here.
    const acknowledged = useSyncExternalStore(
        subscribeToCookieNotice,
        hasAcknowledgedCookies,
        getAcknowledgedServerSnapshot,
    );

    if (acknowledged) return null;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: styles }} />
            {/* A region, not a dialog: it is not modal, it traps nothing, and
                announcing it as a dialog would tell a screen reader the rest of
                the page is unavailable when it is not. */}
            <section className="cookie-notice" role="region" aria-label="Cookie notice">
                <p>
                    We use cookies to keep you signed in, to remember your cart, and to measure how the
                    site is used. No advertising cookies — read more in our{" "}
                    <a href={giftverseUrl("/privacy-policy")} {...giftverseLinkProps}>privacy policy</a>.
                </p>
                <button type="button" className="cookie-notice-accept" onClick={acknowledgeCookies}>
                    Got it
                </button>
            </section>
        </>
    );
}
