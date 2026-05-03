import React from "react";
import "./Home.css";

// ── Day-based hero config ─────────────────────────────────────
// 0 = Sunday, 1 = Monday, ..., 6 = Saturday
const DAILY_HEROES = [
  {
    // Sunday
    desktop: { type: "video", src: "/aime-1.mp4" },
    mobile:  { type: "image", src: "/glf1.png" },
  },
  {
    // Monday
    desktop: { type: "image", src: "/aimeimg.png" },
    mobile:  { type: "image", src: "/glf1.png" },
  },
  {
    // Tuesday
    desktop: { type: "image", src: "/aimeimg.png" },
    mobile:  { type: "image", src: "/heroes/mobile/tuesday.jpg" },
  },
  {
    // Wednesday
    desktop: { type: "image", src: "/heroes/desktop/wednesday.jpg" },
    mobile:  { type: "image", src: "/heroes/mobile/wednesday.jpg" },
  },
  {
    // Thursday
    desktop: { type: "image", src: "/heroes/desktop/thursday.jpg" },
    mobile:  { type: "image", src: "/heroes/mobile/thursday.jpg" },
  },
  {
    // Friday
    desktop: { type: "video", src: "/heroes/desktop/friday.mp4" },
    mobile:  { type: "image", src: "/heroes/mobile/friday.jpg" },
  },
  {
    // Saturday
    desktop: { type: "image", src: "/heroes/desktop/saturday.jpg" },
    mobile:  { type: "image", src: "/heroes/mobile/saturday.jpg" },
  },
];

function DailyHero() {
  const dayIndex = new Date().getDay(); // live day: 0–6
  const hero = DAILY_HEROES[dayIndex];

  return (
    <section className="home__hero">
      {/* Desktop hero */}
      {hero.desktop.type === "video" ? (
        <video
          key={hero.desktop.src}
          className="home__hero-media home__hero-media--desktop"
          src={hero.desktop.src}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          key={hero.desktop.src}
          className="home__hero-media home__hero-media--desktop"
          src={hero.desktop.src}
          alt="Hero"
        />
      )}

      {/* Mobile hero — always image */}
      <img
        key={hero.mobile.src}
        className="home__hero-media home__hero-media--mobile"
        src={hero.mobile.src}
        alt="Hero"
      />
    </section>
  );
}

export default function Home({ onNavigate }) {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="home">

      {/* ── Daily hero ── */}
      <DailyHero />

      {/* ── Split: portrait left, signup right ── */}
      <section className="home__split">

        <div className="home__split-img">
          <img src="/aimeimg.png" alt="Aimé Leon Dore SS26" />
        </div>

        <div className="home__split-copy">
          <div className="home__split-center">
            <p className="home__season">Spring / Summer '26</p>

            {!submitted ? (
              <form className="home__signup" onSubmit={handleSubmit}>
                <div className="home__signup-row">
                  <input
                    type="email"
                    className="home__signup-input"
                    placeholder="ENTER YOUR EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="home__signup-arrow" aria-label="Subscribe">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      <line x1="4" y1="12" x2="20" y2="12" />
                      <polyline points="14 6 20 12 14 18" />
                    </svg>
                  </button>
                </div>
                <div className="home__signup-line" />
              </form>
            ) : (
              <p className="home__thanks">Thank you for subscribing.</p>
            )}
          </div>

          <p className="home__signup-sub">SUBSCRIBE TO OUR MAILING LIST</p>
        </div>
      </section>

    </div>
  );
}
