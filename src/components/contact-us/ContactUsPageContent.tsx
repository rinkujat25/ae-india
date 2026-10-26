import Link from "next/link";
import { ContactForm } from "@/components/contact-us/ContactForm";
import { getCompany } from "@/lib/company";

function MailIcon() {
  return (
    <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
      <path d="m6.3 6.3 3 3M14.7 14.7l3 3M17.7 6.3l-3 3M9.3 14.7l-3 3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

const routes = [
  {
    title: "Received a gift and something's wrong?",
    text: "Damaged, missing or wrong item - write to us directly. Your company's HR team doesn't need to be in the loop.",
  },
  {
    title: "Running a program with us?",
    text: "Reply on your existing thread and it reaches the same people - no ticket number needed.",
  },
  {
    title: "Want to supply to the catalogue?",
    text: "Send a catalogue, price list and lead times. We quality-check samples before anything is listed.",
  },
];

export function ContactUsPageContent() {
    const company = getCompany();

  return (
    <main>
      <header className="contact-html-hero">
        <div className="wrap">
          <span className="kicker">Contact</span>
          <h1>
            Talk to a person. <span className="accent">Usually the same day.</span>
          </h1>
          <p>
            Whether you&apos;re planning a program, chasing a gift that&apos;s already out for delivery, or want your products in
            the catalogue - here&apos;s the fastest route to the right person.
          </p>

          <div className="reach">
            <a className="tile" href={`mailto:${company.supportEmail}`}>
              <span className="tile-ico">
                <MailIcon />
              </span>
              <h2>Email</h2>
              <b>{company.supportEmail}</b>
              <span>Best for briefs, quotes and anything with a list attached.</span>
            </a>

            <a className="tile" href={`tel:${company.telHref}`}>
              <span className="tile-ico">
                <PhoneIcon />
              </span>
              <h2>Phone &amp; WhatsApp</h2>
              <b>{company.phoneDisplay}</b>
              <span>Best when a date is tight and you need a straight answer.</span>
            </a>

            {/* Opens the enquiry modal in place. It used to navigate to the
                home page's #start anchor, which took the reader off the contact
                page to reach a form that is now available on every page. The
                href stays so it still works without JavaScript. */}
            <Link className="tile" href="/#start" data-open-form>
              <span className="tile-ico">
                <SparkIcon />
              </span>
              <h2>Start a program</h2>
              <b>Book a demo</b>
              <span>Occasion, headcount and budget - you get a curated shortlist back.</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="split wrap" id="form">
        <div className="form-card">
          <h2>Send us a message.</h2>
          <p>
            For a full gifting brief, the{" "}
            <a href="#start" data-open-form>
              demo form
            </a>{" "}
            asks the right questions. This one is for everything else.
          </p>

          <ContactForm />
        </div>

        <aside className="aside">
          <div className="box sla">
            <h2>What to expect</h2>
            <p>
              Weekday enquiries get a reply the <b>same working day</b>, and everything else within <b>one working day</b>.
              A gifting brief comes back with a shortlist and a delivery date, not a brochure.
            </p>
          </div>

          <div className="box">
            <h2>Who handles what</h2>
            <ul className="routes">
              {routes.map((route) => (
                <li key={route.title}>
                  <CheckIcon />
                  <span>
                    <b>{route.title}</b>
                    <small>{route.text}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="box legal">
            <h2>Business details</h2>
            <dl>
              <div className="row">
                <dt>Registered entity</dt>
                <dd>{company.legalName}</dd>
              </div>
              <div className="row">
                <dt>GST</dt>
                <dd>21AEKFS3300K1ZA</dd>
              </div>
              <div className="row">
                <dt>Based in</dt>
                <dd>{company.postalAddress.addressLocality}, {company.postalAddress.addressRegion}</dd>
              </div>
              <div className="row">
                <dt>Delivers to</dt>
                <dd>Pan-India</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>
    </main>
  );
}
