"use client";

import { useEffect } from "react";

/**
 * The header's mobile menu button.
 *
 * `SiteHeader` is a Server Component, so the markup it renders carries no
 * handler of its own; this binds one to whichever header is on the page. It
 * renders nothing and is mounted once in the root layout, because the header
 * is on almost every route.
 *
 * It used to drive the enquiry modal as well, which is why it was called
 * `HomeInteractions` — a name that was already wrong, since it ran everywhere.
 * The modal is gone and so is that half of the file.
 */
export function MobileNavToggle() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".nav");
    const navToggle = document.querySelector<HTMLButtonElement>(".nav-toggle");

    const closeMenu = () => {
      nav?.classList.remove("menu-open");
      navToggle?.setAttribute("aria-expanded", "false");
      navToggle?.setAttribute("aria-label", "Open navigation");
    };

    const handleMenuToggle = () => {
      if (!nav || !navToggle) return;
      const isOpen = nav.classList.toggle("menu-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    };

    navToggle?.addEventListener("click", handleMenuToggle);
    nav?.querySelectorAll(".links a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    return () => {
      navToggle?.removeEventListener("click", handleMenuToggle);
      nav?.querySelectorAll(".links a").forEach((link) => {
        link.removeEventListener("click", closeMenu);
      });
    };
  }, []);

  return null;
}
