import { useNavigate } from "react-router-dom";

const highlights = [
  {
    value: "01",
    title: "Browse",
    text: "See what is available across every sport.",
  },
  {
    value: "02",
    title: "Reserve",
    text: "Request the gear you need in a few clicks.",
  },
  {
    value: "03",
    title: "Play",
    text: "Pick it up, show up, and get in the game.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="landing-page">
      <nav className="landing-nav" aria-label="Main navigation">
        <button
          className="landing-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="display">CourtSide</span>
          <span className="landing-brand-tag">Campus equipment booking</span>
        </button>
        <div className="landing-nav-links">
          <a href="#how-it-works">How it works</a>
          <button className="landing-login" onClick={() => navigate("/login")}>
            Log in
          </button>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" /> Your campus. Your court.
          </p>
          <h1>
            Make room
            <br />
            <em>for the game.</em>
          </h1>
          <p className="hero-intro">
            The easiest way to find, reserve, and return the sports equipment
            that keeps your campus moving.
          </p>
          <div className="hero-actions">
            <button className="landing-cta" onClick={() => navigate("/login")}>
              Book equipment <span aria-hidden="true">↗</span>
            </button>
            <a className="hero-text-link" href="#how-it-works">
              See how it works <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-note">
            <span>●</span> Built for students, teams &amp; campus staff
          </div>
        </div>

        <div
          className="hero-visual"
          aria-label="Illustration of a sports court"
        >
          <div className="court court-backdrop" />
          <div className="court court-lines" />
          <div className="hero-sticker sticker-top">
            READY
            <br />
            <strong>TO PLAY</strong>
          </div>
          <div className="hero-sticker sticker-bottom">
            EQUIPMENT
            <br />
            <strong>ON DECK</strong>
          </div>
          <div className="hero-ball" aria-hidden="true">
            🏀
          </div>
          <div className="hero-visual-label">
            <span className="mono">FIELD NOTE / 001</span>
            <strong>
              Everything
              <br />
              in one place.
            </strong>
          </div>
        </div>
      </section>

      <section className="landing-proof" id="how-it-works">
        <div className="proof-heading">
          <span className="mono">THE PLAYBOOK</span>
          <h2>
            From locker
            <br />
            to lineup.
          </h2>
        </div>
        <div className="highlight-list">
          {highlights.map((highlight) => (
            <article className="highlight" key={highlight.value}>
              <span className="highlight-number">{highlight.value}</span>
              <div>
                <h3>{highlight.title}</h3>
                <p>{highlight.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="proof-stat">
          <strong>24/7</strong>
          <span>
            access to your
            <br />
            next session
          </span>
        </div>
      </section>
    </main>
  );
}
