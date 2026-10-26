"use client";

import { useEffect } from "react";

const contactEmail = "go@sampley.in";

export function HomeInteractions() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".nav");
    const navToggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
    const modal = document.getElementById("lead-modal") as HTMLDialogElement | null;
    const form = document.getElementById("lead-form") as HTMLFormElement | null;
    const status = document.getElementById("lf-status") as HTMLElement | null;

    let lastFocus: Element | null = null;

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

    const showStatus = (message: string, isError = false) => {
      if (!status) return;
      status.textContent = message;
      status.className = `form-status${isError ? " error" : ""}`;
      status.hidden = false;
    };

    const openModal = (trigger: Element | null) => {
      if (!modal || !form) return;
      lastFocus = trigger ?? document.activeElement;
      if (status) status.hidden = true;

      if (typeof modal.showModal === "function") {
        modal.showModal();
      } else {
        modal.setAttribute("open", "");
      }

      document.body.classList.add("modal-open");

      // A trigger may say what the enquiry is about — a product page asking for
      // a price is the one that does. Without it the team receives "someone
      // wants a quote" with no way to tell for what. Only ever filled into an
      // empty field, so reopening the modal cannot overwrite what the visitor
      // has already typed.
      const note = trigger?.getAttribute("data-enquiry-note");
      const notes = form.querySelector<HTMLTextAreaElement>("textarea[name='notes']");

      if (note && notes && !notes.value.trim()) notes.value = note;

      const firstField = form.querySelector<HTMLElement>("input, select, textarea");
      window.setTimeout(() => firstField?.focus(), 60);
    };

    const closeModal = () => {
      if (!modal) return;
      if (typeof modal.close === "function" && modal.open) {
        modal.close();
      } else {
        modal.removeAttribute("open");
      }
      document.body.classList.remove("modal-open");
      if (lastFocus instanceof HTMLElement) lastFocus.focus();
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const opener = target.closest("[data-open-form]");
      if (opener) {
        event.preventDefault();
        openModal(opener);
        return;
      }

      if (target.closest("[data-close-form]")) {
        event.preventDefault();
        closeModal();
      }
    };

    const handleDialogClick = (event: MouseEvent) => {
      if (event.target === modal) closeModal();
    };

    const handleDialogClose = () => {
      document.body.classList.remove("modal-open");
    };

    /**
     * Opens the visitor's email client with the enquiry filled in.
     *
     * Still the path today: the provider rejects a form submission without a
     * valid Google reCAPTCHA token, so until a site key is configured this is
     * how an enquiry actually reaches the team. It also stays as the fallback
     * for anyone whose captcha fails to load.
     */
    const sendByEmail = (data: Record<string, FormDataEntryValue>) => {
      const lines = [
        `Name: ${data.name || ""}`,
        `Work email: ${data.email || ""}`,
        `Company: ${data.company || ""}`,
        `Phone: ${data.phone || "-"}`,
        `Model: ${data.model || ""}`,
        `Occasion: ${data.occasion || ""}`,
        `Recipients: ${data.headcount || ""}`,
        `Per-person budget: ${data.budget || ""}`,
        `Needs to land by: ${data.deliver_by || "-"}`,
        "",
        "Notes:",
        `${data.notes || "-"}`,
      ].join("\n");

      const subject = `Gifting enquiry - ${data.company || ""} - ${data.occasion || ""}`;

      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(lines)}`;
      showStatus(
        `Opening your email app with the details filled in. If nothing opens, email ${contactEmail} directly.`,
      );
    };

    /**
     * The reCAPTCHA token, when the page has one.
     *
     * Reads whatever the widget left on the page rather than owning the
     * integration: when a site key is wired up this starts returning a token
     * and the submission goes to the API instead of the mail client, with no
     * further change here.
     */
    const getCaptchaToken = (): string => {
      const field = form?.querySelector<HTMLInputElement>('[name="g-recaptcha-response"]');

      return field?.value?.trim() ?? "";
    };

    const handleSubmit = async (event: SubmitEvent) => {
      event.preventDefault();
      if (!form || !form.reportValidity()) return;

      const data = Object.fromEntries(new FormData(form).entries());
      const captchaToken = getCaptchaToken();

      // No token means the provider would reject it anyway, so do not spend a
      // round trip on a submission that cannot succeed.
      if (!captchaToken) {
        sendByEmail(data);
        return;
      }

      showStatus("Sending your enquiry...");

      try {
        const response = await fetch("/api/demo-request", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ...data, captchaToken }),
        });

        if (!response.ok) throw new Error("Request failed");

        showStatus("Thanks - we have your enquiry and will reply within one working day.");
        form.reset();
      } catch {
        // Anything the API could not take still reaches the team by email.
        sendByEmail(data);
      }
    };

    navToggle?.addEventListener("click", handleMenuToggle);
    nav?.querySelectorAll(".links a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
    // Capture phase: a Next `Link` handles its own click during bubbling and
    // navigates before a document-level listener ever runs, so a `data-open-form`
    // trigger written as a Link would leave the page instead of opening the
    // modal. Capturing gets there first, and preventDefault then stops the
    // navigation.
    document.addEventListener("click", handleDocumentClick, { capture: true });
    modal?.addEventListener("click", handleDialogClick);
    modal?.addEventListener("close", handleDialogClose);
    form?.addEventListener("submit", handleSubmit);

    if (window.location.hash === "#start") {
      window.setTimeout(() => openModal(null), 180);
    }

    return () => {
      navToggle?.removeEventListener("click", handleMenuToggle);
      nav?.querySelectorAll(".links a").forEach((link) => {
        link.removeEventListener("click", closeMenu);
      });
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      modal?.removeEventListener("click", handleDialogClick);
      modal?.removeEventListener("close", handleDialogClose);
      form?.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return null;
}
