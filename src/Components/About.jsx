import { useState, useEffect } from "react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

/* ── Icons ── */
const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" />
  </svg>
);
const IconAccount = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
const IconCart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const NAV_LINKS = [
  "Shop", "SS26 Lookbook", "News", "About", "Stores", "Café", "Sonny", "Sound",
];

export default function About() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div style={{
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      background: "#fff",
      color: "#1a1a1a",
      minHeight: "100vh",
    }}>

      {/* ══════════════════════════════
          NAV  — hamburger | logo | icons
          ══════════════════════════════ */}
      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 200,
        background: "#fff",
        borderBottom: "1px solid #e5e5e5",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}>

        {/* Left — hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "6px", display: "flex", flexDirection: "column",
            gap: "5px", width: "32px",
          }}
        >
          <span style={{
            display: "block", width: "22px", height: "1px", background: "#1a1a1a",
            transformOrigin: "center", transition: "transform 0.22s ease",
            transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
          }} />
          <span style={{
            display: "block", width: "22px", height: "1px", background: "#1a1a1a",
            transition: "opacity 0.22s ease", opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: "block", width: "22px", height: "1px", background: "#1a1a1a",
            transformOrigin: "center", transition: "transform 0.22s ease",
            transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
          }} />
        </button>

        {/* Center — logo */}
        <a href="#" style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: isMobile ? "12px" : "13px",
          fontWeight: 400,
          letterSpacing: "0.04em",
          textDecoration: "none",
          color: "#1a1a1a",
          whiteSpace: "nowrap",
        }}>
          Aimé Leon Dore
        </a>

        {/* Right — icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "#1a1a1a" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#1a1a1a", display: "flex" }}>
            <IconSearch />
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#1a1a1a", display: "flex" }}>
            <IconAccount />
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#1a1a1a", display: "flex" }}>
            <IconCart />
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════
          MOBILE / SLIDE-IN DRAWER
          ══════════════════════════════ */}
      <div style={{
        position: "fixed",
        top: "56px", left: 0, right: 0, bottom: 0,
        background: "#fff",
        zIndex: 199,
        transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease",
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}>
        {NAV_LINKS.map((label) => (
          <a
            key={label}
            href="#"
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: "13px",
              fontWeight: label === "About" ? 500 : 400,
              color: label === "About" ? "#888" : "#1a1a1a",
              textDecoration: "none",
              padding: "15px 0",
              borderBottom: "1px solid #f0f0f0",
              letterSpacing: "0.01em",
            }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* ══════════════════════════════
          ABOUT CONTENT
          Layout: tall image LEFT (~30–33% width)
                  text RIGHT, vertically centered
          Matches ALD screenshot exactly.
          ══════════════════════════════ */}
      <main style={{
        paddingTop: "56px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 2fr) minmax(0, 3fr)",
        minHeight: "calc(100vh - 56px)",
      }}>

        {/* Left — image, fills full column height */}
        <div style={{
          overflow: "hidden",
          ...(isMobile
            ? { width: "100%", aspectRatio: "4/5" }
            : { minHeight: "calc(100vh - 56px)" }
          ),
        }}>
          <img
            src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1200&q=80"
            alt="Two friends on a New York rooftop"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              e.target.parentElement.style.background = "#e8e8e8";
              e.target.style.opacity = 0;
            }}
          />
        </div>

        {/* Right — text, vertically centered */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: isMobile ? "40px 24px 60px" : "60px 60px 60px 56px",
        }}>
          {/* "About" — serif, ~20px, matching ALD screenshot */}
          <h2 style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: isMobile ? "18px" : "22px",
            fontWeight: 400,
            margin: "0 0 20px 0",
            color: "#1a1a1a",
          }}>
            About
          </h2>

          <p style={{
            fontSize: isMobile ? "13px" : "13.5px",
            lineHeight: 1.8,
            color: "#1a1a1a",
            fontWeight: 400,
            margin: "0 0 16px 0",
            maxWidth: "420px",
          }}>
            Aimé Leon Dore is from Queens, NY. With a strong focus on simple yet
            powerful design, we are driven to create timeless work by portraying an
            aesthetic that is uniquely our own.
          </p>

          <p style={{
            fontSize: isMobile ? "13px" : "13.5px",
            lineHeight: 1.8,
            color: "#1a1a1a",
            fontWeight: 400,
            margin: 0,
          }}>
            Click{" "}
            <a
              href="https://music.apple.com/us/album/illmatic/662324135"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#999", textDecoration: "none", borderBottom: "1px solid #ccc" }}
            >
              here
            </a>
            {" "}for more info
          </p>
        </div>

      </main>
    </div>
  );
}
