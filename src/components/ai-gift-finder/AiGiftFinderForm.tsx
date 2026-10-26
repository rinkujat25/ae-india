"use client";

import { useState } from "react";

const seeds = [
  "Diwali gift for 800 employees under Rs. 1,500, sustainable, pan-India delivery",
  "Elegant non-food gifts for 30 CXO clients around Rs. 7,500 each",
  "Welcome kits for 40 new joiners, Rs. 3,000 each, logo branded",
];

export function AiGiftFinderForm() {
  const [query, setQuery] = useState("");
  const [budget, setBudget] = useState("");
  const [occasion, setOccasion] = useState("");
  const [recipient, setRecipient] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function clear() {
    setQuery("");
    setBudget("");
    setOccasion("");
    setRecipient("");
    setSubmitted(false);
  }

  return (
    <main className="ai-prototype">
      <div className="protobar">
        <div className="wrap">
          <b>Preview</b>
          <span>RankNova AI product search will be connected in a later integration.</span>
        </div>
      </div>

      <div className="wrap">
        <header className="top">
          <h1>AI Gift Finder</h1>
          <p>Describe the occasion, recipients and budget. Wingback will use this brief to find suitable products.</p>
        </header>

        <section className="ask">
          <p className="lbl">Describe the gifting need</p>
          <textarea
            id="q"
            rows={3}
            placeholder="e.g. Diwali gift for 800 employees under Rs. 1,500"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSubmitted(false);
            }}
          />

          <div className="assist">
            <label>
              <span className="lbl">Budget per person</span>
              <select value={budget} onChange={(event) => setBudget(event.target.value)}>
                <option value="">Choose budget</option>
                <option value="1000">Up to Rs. 1,000</option>
                <option value="2500">Up to Rs. 2,500</option>
                <option value="5000">Up to Rs. 5,000</option>
                <option value="10000">Up to Rs. 10,000</option>
              </select>
            </label>
            <label>
              <span className="lbl">Occasion</span>
              <select value={occasion} onChange={(event) => setOccasion(event.target.value)}>
                <option value="">Choose occasion</option>
                <option value="festival">Diwali / festival</option>
                <option value="onboarding">Onboarding</option>
                <option value="milestone">Milestone / anniversary</option>
                <option value="recognition">Rewards and recognition</option>
                <option value="client">Client / CXO</option>
              </select>
            </label>
            <label>
              <span className="lbl">Recipients</span>
              <select value={recipient} onChange={(event) => setRecipient(event.target.value)}>
                <option value="">Choose recipients</option>
                <option value="employees">Employees</option>
                <option value="joiners">New joiners</option>
                <option value="clients">Clients</option>
                <option value="partners">Partners</option>
                <option value="guests">Event guests</option>
              </select>
            </label>
          </div>

          <div className="askfoot">
            <button
              className="btn btn-primary"
              type="button"
              disabled={!query.trim()}
              onClick={() => setSubmitted(true)}
            >
              Find gifts
            </button>
            <button className="btn btn-soft" type="button" onClick={clear}>
              Clear
            </button>
          </div>

          <div className="seeds">
            {seeds.map((seed) => (
              <button
                className="seed"
                type="button"
                onClick={() => {
                  setQuery(seed);
                  setSubmitted(false);
                }}
                key={seed}
              >
                {seed}
              </button>
            ))}
          </div>
        </section>

        {submitted ? (
          <section className="empty on" role="status">
            <h2>Your brief is ready.</h2>
            <p>
              Product recommendations are unavailable until the RankNova API is connected. No placeholder or dummy
              products will be shown.
            </p>
          </section>
        ) : null}

        <p className="foot">
          Live AI recommendations, catalogue rules and ranking will be added through the server-side RankNova service.
        </p>
      </div>
    </main>
  );
}

