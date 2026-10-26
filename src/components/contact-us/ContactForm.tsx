"use client";

import { FormEvent, useState } from "react";

const contactEmail = "go@sampley.in";

type Status = {
  message: string;
  isError: boolean;
} | null;

export function ContactForm() {
  const [status, setStatus] = useState<Status>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.reportValidity()) {
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const company = String(data.get("company") || "");
    const phone = String(data.get("phone") || "");
    const topic = String(data.get("topic") || "");
    const message = String(data.get("message") || "");

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "-"}`,
      `Phone: ${phone || "-"}`,
      `Topic: ${topic}`,
      "",
      "Message:",
      message || "-",
    ].join("\n");

    const subject = `Website enquiry - ${topic}${company ? ` - ${company}` : ""}`;

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
    setStatus({
      message: `Opening your email app with the details filled in. If nothing opens, email ${contactEmail} directly.`,
      isError: false,
    });
  }

  return (
    <form id="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="cf-name">
            Your name <span className="req">*</span>
          </label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" placeholder="Full name" />
        </div>

        <div className="field">
          <label htmlFor="cf-email">
            Email <span className="req">*</span>
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
        </div>

        <div className="field">
          <label htmlFor="cf-company">Company</label>
          <input id="cf-company" name="company" type="text" autoComplete="organization" placeholder="Optional" />
        </div>

        <div className="field">
          <label htmlFor="cf-phone">Phone</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
        </div>

        <div className="field wide">
          <label htmlFor="cf-topic">
            What&apos;s this about? <span className="req">*</span>
          </label>
          <select id="cf-topic" name="topic" required defaultValue="">
            <option value="">Select a topic</option>
            <option>Planning a new gifting program</option>
            <option>A program or order already running</option>
            <option>Delivery problem with a gift I received</option>
            <option>Supplying products to Sampley</option>
            <option>Partnership or reseller enquiry</option>
            <option>Invoicing, GST or documentation</option>
            <option>Something else</option>
          </select>
        </div>

        <div className="field wide">
          <label htmlFor="cf-message">
            Message <span className="req">*</span>
          </label>
          <textarea id="cf-message" name="message" required placeholder="The more specific, the faster we can be useful." />
        </div>
      </div>

      <div className="form-submit">
        <button className="btn btn-primary" type="submit">
          Send message →
        </button>
        <span className="form-note">We reply within one working day. Your details are never shared or sold.</span>
      </div>

      {status ? <div className={`form-status${status.isError ? " error" : ""}`}>{status.message}</div> : null}
    </form>
  );
}
