/* Wingback employee homepage · static preview, no authentication or requests. */
(() => {
  'use strict';

  function initialiseHomepage() {
    const menuToggle = document.getElementById('public-menu-toggle');
    const navigation = document.getElementById('public-navigation');
    const loginDialog = document.getElementById('employee-login-dialog');
    const helpDialog = document.getElementById('public-help-dialog');
    const loginForm = document.getElementById('employee-login-form');
    const emailInput = document.getElementById('employee-email');
    const helpNote = document.getElementById('login-help-note');
    const allowedDestinations = new Set(['home', 'rewards']);
    const dialogTriggers = new WeakMap();
    let destination = 'home';
    let activeDialog = null;
    let bodyOverflow = '';

    function setMenuOpen(open, restoreFocus = false) {
      if (!menuToggle || !navigation) return;
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      navigation.classList.toggle('is-open', open);
      menuToggle.classList.toggle('is-open', open);
      if (restoreFocus) menuToggle.focus();
    }

    if (menuToggle && navigation) {
      menuToggle.setAttribute('aria-controls', navigation.id);
      setMenuOpen(false);
      menuToggle.addEventListener('click', () => {
        setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
      });
      navigation.addEventListener('click', event => {
        if (event.target.closest('a, button')) setMenuOpen(false);
      });
    }

    function resetLoginForm() {
      loginForm?.reset();
      // Clear explicitly, including any initial or browser-restored input value.
      if (emailInput) emailInput.value = '';
      if (helpNote) helpNote.hidden = true;
      loginDialog?.querySelectorAll('[data-login-help]').forEach(button => {
        button.setAttribute('aria-expanded', 'false');
      });
      destination = 'home';
    }

    function openDialog(dialog, triggerElement) {
      if (!dialog) return;
      if (dialog.open) return;
      if (activeDialog?.open) activeDialog.close();
      else bodyOverflow = document.body.style.overflow;
      activeDialog = dialog;
      dialogTriggers.set(dialog, triggerElement || document.activeElement);
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      if (dialog === loginDialog) emailInput?.focus({ preventScroll: true });
    }

    function prepareDialog(dialog) {
      if (!dialog) return;
      dialog.addEventListener('close', () => {
        if (dialog === loginDialog) resetLoginForm();
        // A second dialog may have opened before this queued close event fires.
        if (activeDialog !== dialog) return;
        activeDialog = null;
        document.body.style.overflow = bodyOverflow;
        const previousFocus = dialogTriggers.get(dialog);
        if (previousFocus?.isConnected && previousFocus.getClientRects().length) {
          previousFocus.focus({ preventScroll: true });
        } else if (menuToggle?.getClientRects().length) {
          // A mobile navigation trigger may now sit inside the closed menu.
          menuToggle.focus({ preventScroll: true });
        }
      });
      dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) {
          dialog.close();
        }
      });
    }

    prepareDialog(loginDialog);
    prepareDialog(helpDialog);

    // Lets the gift store open the login preview after closing its own dialogs.
    window.GVPublic = {
      openLogin(requestedDestination, triggerElement) {
        if (!loginDialog) return;
        setMenuOpen(false);
        destination = allowedDestinations.has(requestedDestination) ? requestedDestination : 'home';
        openDialog(loginDialog, triggerElement);
      }
    };

    loginDialog?.querySelectorAll('[data-login-help]').forEach(button => {
      if (helpNote) button.setAttribute('aria-controls', helpNote.id);
      button.setAttribute('aria-expanded', String(helpNote ? !helpNote.hidden : false));
    });

    document.addEventListener('click', event => {
      const loginTrigger = event.target.closest('[data-employee-login]');
      if (loginTrigger) {
        event.preventDefault();
        if (!loginDialog) return;
        setMenuOpen(false);
        const requestedDestination = loginTrigger.dataset.destination;
        destination = allowedDestinations.has(requestedDestination) ? requestedDestination : 'home';
        openDialog(loginDialog, loginTrigger);
        return;
      }

      if (event.target.closest('#employee-login-close')) {
        event.preventDefault();
        loginDialog?.close();
        return;
      }

      const loginHelp = event.target.closest('[data-login-help]');
      if (loginHelp && loginDialog?.contains(loginHelp)) {
        event.preventDefault();
        if (!helpNote) return;
        helpNote.hidden = !helpNote.hidden;
        loginHelp.setAttribute('aria-expanded', String(!helpNote.hidden));
        return;
      }

      const helpTrigger = event.target.closest('[data-help-open]');
      if (helpTrigger) {
        event.preventDefault();
        setMenuOpen(false);
        openDialog(helpDialog, helpTrigger);
        return;
      }

      if (event.target.closest('[data-help-close]')) {
        event.preventDefault();
        helpDialog?.close();
      }
    });

    document.addEventListener('keydown', event => {
      // Native dialogs handle Escape themselves, including the close event.
      if (event.key === 'Escape' && !activeDialog?.open &&
        menuToggle?.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false, true);
      }
    });

    loginForm?.addEventListener('submit', event => {
      event.preventDefault();
      if (!emailInput || !loginForm.reportValidity()) return;
      const safeDestination = allowedDestinations.has(destination) ? destination : 'home';
      // Only the fixed route is used. The entered email is never read, stored,
      // sent to a service, or included in the destination URL.
      resetLoginForm();
      window.location.href = `dashboard.html#${safeDestination}`;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseHomepage, { once: true });
  } else {
    initialiseHomepage();
  }
})();
