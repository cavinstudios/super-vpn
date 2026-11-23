"use client";

import { useState, type ChangeEvent } from "react";

const servers = [
  { id: "new-york", city: "New York", country: "United States", region: "East Coast", latency: "24" },
  { id: "amsterdam", city: "Amsterdam", country: "Netherlands", region: "Europe", latency: "38" },
  { id: "singapore", city: "Singapore", country: "Singapore", region: "Asia Pacific", latency: "61" },
  { id: "sydney", city: "Sydney", country: "Australia", region: "Oceania", latency: "72" },
];

function SparkIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none">
      <path d="M12 2.8 14.7 9.3 21.2 12l-6.5 2.7L12 21.2l-2.7-6.5L2.8 12l6.5-2.7L12 2.8Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none">
      <path d="M19 10.1c0 5-7 11.1-7 11.1S5 15.1 5 10.1a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none">
      <path d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  );
}

export default function Home() {
  const [serverId, setServerId] = useState(servers[0].id);
  const [connected, setConnected] = useState(false);
  const [announcement, setAnnouncement] = useState(
    "Demo is ready. Choose a location and start a mock session.",
  );
  const selectedServer = servers.find((server) => server.id === serverId) ?? servers[0];

  function handleServerChange(event: ChangeEvent<HTMLSelectElement>) {
    setServerId(event.target.value);
  }

  function handleConnect() {
    setConnected(true);
    setAnnouncement(`Demo session started for ${selectedServer.city}.`);
  }

  function handleDisconnect() {
    setConnected(false);
    setAnnouncement("Demo session ended.");
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <header className="site-header" id="top">
        <div className="header-inner">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true">
              <SparkIcon />
            </span>
            <span>super<span className="brand-light">vpn</span></span>
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <a href="#dashboard">Dashboard</a>
            <a href="#why-supervpn">About this demo</a>
          </nav>

          <span className="preview-chip">
            <span className="preview-dot" aria-hidden="true" />
            Local preview
          </span>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                A VPN-style experience, in preview
              </p>
              <h1 id="hero-title">
                Your online life,
                <br />
                <span>at your pace.</span>
              </h1>
              <p className="hero-description">
                Explore a thoughtfully simple connection dashboard. This demo
                changes only what you see here—it does not create a VPN tunnel,
                encrypt data, or alter your network traffic.
              </p>
              <a className="text-link hero-link" href="#dashboard">
                Explore the dashboard <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="art-ring art-ring-outer" />
              <div className="art-ring art-ring-inner" />
              <div className="art-center">
                <span className="art-glow" />
                <SparkIcon />
              </div>
              <span className="art-star art-star-one">✳</span>
              <span className="art-star art-star-two">✦</span>
              <span className="art-star art-star-three">·</span>
              <span className="art-caption">a little more in control</span>
            </div>
          </div>
          <div className="hero-bottom-line" aria-hidden="true" />
        </section>

        <section className="dashboard-section" id="dashboard" aria-labelledby="dashboard-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Your demo dashboard</p>
              <h2 id="dashboard-title">Connection, made clear.</h2>
            </div>
            <p className="section-intro">
              Pick a mock location and try the controls. Your choices stay in
              this page.
            </p>
          </div>

          <div className="dashboard-grid">
            <article className="connection-card" aria-labelledby="connection-title">
              <div className="card-topline">
                <span className="card-label">Connection status</span>
                <span className={`status-pill${connected ? " is-active" : ""}`}>
                  <span className="status-dot" aria-hidden="true" />
                  {connected ? "Demo connected" : "Not connected"}
                </span>
              </div>

              <div className="connection-main">
                <div className={`connection-icon${connected ? " is-active" : ""}`} aria-hidden="true">
                  <SparkIcon />
                </div>
                <h3 id="connection-title">
                  {connected ? "Looking good." : "Ready when you are."}
                </h3>
                <p>
                  {connected
                    ? "Your local mock session is active."
                    : "Start a local mock session to preview the connected state."}
                </p>
              </div>

              <div className="server-picker">
                <label htmlFor="server-location">Demo server location</label>
                <div className="select-wrap">
                  <span className="select-icon" aria-hidden="true">
                    <PinIcon />
                  </span>
                  <select
                    id="server-location"
                    value={serverId}
                    onChange={handleServerChange}
                    aria-describedby="server-help"
                  >
                    {servers.map((server) => (
                      <option key={server.id} value={server.id}>
                        {server.city}, {server.country}
                      </option>
                    ))}
                  </select>
                  <span className="select-chevron" aria-hidden="true">⌄</span>
                </div>
                <p id="server-help">Locations and latency values are illustrative only.</p>
              </div>

              <button
                className={`connect-button${connected ? " disconnect-button" : ""}`}
                type="button"
                onClick={connected ? handleDisconnect : handleConnect}
              >
                {connected ? "End demo session" : "Start demo session"}
                {!connected && <span aria-hidden="true">→</span>}
              </button>

              <p className="demo-notice">
                <span className="notice-icon" aria-hidden="true">i</span>
                <span>Preview only—no VPN tunnel or traffic changes.</span>
              </p>
              <p className="sr-only" role="status">
                {announcement}
              </p>
            </article>

            <aside className="details-column" aria-label="Selected demo location details">
              <article className="location-card">
                <div className="location-top">
                  <span className="card-label">Selected location</span>
                  <span className="location-flag" aria-hidden="true">
                    <PinIcon />
                  </span>
                </div>
                <p className="location-city">{selectedServer.city}</p>
                <p className="location-country">{selectedServer.country}</p>
                <div className="location-divider" />
                <div className="detail-row">
                  <span>Region</span>
                  <strong>{selectedServer.region}</strong>
                </div>
                <div className="detail-row">
                  <span>Demo latency</span>
                  <strong>{selectedServer.latency} ms</strong>
                </div>
                <p className="location-footnote">Sample values for this preview</p>
              </article>

              <div className="privacy-card">
                <div className="privacy-icon" aria-hidden="true">
                  <CheckIcon />
                </div>
                <div>
                  <h3>Clear by design</h3>
                  <p>This prototype is transparent about what it does—and doesn’t do.</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="features-section" id="why-supervpn" aria-labelledby="features-title">
          <div className="features-heading">
            <p className="eyebrow">The little things</p>
            <h2 id="features-title">A simple place to start.</h2>
            <p>
              A product preview should be easy to understand. Here’s what you
              can explore.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature-card">
              <span className="feature-number">01</span>
              <div className="feature-icon feature-icon-green" aria-hidden="true"><PinIcon /></div>
              <h3>Choose a location</h3>
              <p>Switch between sample server locations and see your selection update.</p>
            </article>
            <article className="feature-card">
              <span className="feature-number">02</span>
              <div className="feature-icon feature-icon-peach" aria-hidden="true"><SparkIcon /></div>
              <h3>Try the controls</h3>
              <p>Start and end a mock session to preview the dashboard’s status states.</p>
            </article>
            <article className="feature-card">
              <span className="feature-number">03</span>
              <div className="feature-icon feature-icon-lavender" aria-hidden="true"><CheckIcon /></div>
              <h3>Know what’s real</h3>
              <p>This page is a visual prototype, not a VPN service or a security tool.</p>
            </article>
          </div>
        </section>

        <section className="closing-banner" aria-labelledby="closing-title">
          <div className="closing-spark" aria-hidden="true"><SparkIcon /></div>
          <div>
            <p className="eyebrow">Just a preview</p>
            <h2 id="closing-title">Your network stays exactly as it is.</h2>
            <p>All connection behavior on this page is local and simulated.</p>
          </div>
          <a className="closing-link" href="#dashboard">
            Back to dashboard <span aria-hidden="true">↑</span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark" aria-hidden="true"><SparkIcon /></span>
            <span>super<span className="brand-light">vpn</span></span>
          </a>
          <p>Local prototype · No VPN connection is created.</p>
          <a className="footer-top-link" href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
