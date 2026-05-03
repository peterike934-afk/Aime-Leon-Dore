import { useState, useRef } from "react";
import Sounddj from "./Sounddj";
import SoundLive from "./Soundlive";

const soundData = [
  {
    id: 1,
    series: "DJ",
    videoUrl:
      "https://player.vimeo.com/progressive_redirect/playback/1080561083/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=a9bf6272a4b64ec11de0b781fdd8a74b285a406123bdb9513f7857ed54a2902c",
    fallbackPoster:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    heading: "DJ",
    body: "A monthly content series featuring hour-long DJ sets recorded in the brand's New York and London sound rooms. SOUND provides a platform for DJs to explore their craft, bridge generations, and drive the culture forward.",
  },
  {
    id: 2,
    series: "LIVE",
    videoUrl:
      "https://player.vimeo.com/progressive_redirect/playback/1158554683/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=bf67b627631dc49e4e8fddd44cbf796f0f80663476ce32115ed35d3b7b61a928",
    fallbackPoster:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    heading: "LIVE at 214",
    body: "Celebrating the musicians who have inspired the brand through intimate live performances filmed inside the brand's NYC flagship. The series features on-site performances that spotlight iconic artists in a raw and unfiltered format.",
  },
];

function VideoBlock({ item, nightMode, onClick }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const fg = nightMode ? "#fff" : "#000";
  const mutedColor = nightMode ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: "1 1 0", minWidth: 0 }}>
      {/* 16:9 video block — clicking navigates */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
          cursor: "pointer",
          background: "#111",
        }}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          src={item.videoUrl}
          poster={item.fallbackPoster}
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.6s ease",
            transform: hovered ? "scale(1.03)" : "scale(1)",
          }}
        />

        {/* Overlay: always visible, fades on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.22)",
            transition: "background 0.35s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Play button circle */}
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.85)",
              background: "rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
              transition: "transform 0.2s ease",
              transform: hovered ? "scale(1.1)" : "scale(1)",
            }}
          >
            <svg width="11" height="13" viewBox="0 0 11 13" fill="white" style={{ marginLeft: "2px" }}>
              <polygon points="0,0 11,6.5 0,13" />
            </svg>
          </div>
        </div>
      </div>

      {/* Text below video */}
      <div style={{ paddingTop: "2px" }}>
        <p style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: "10px",
          fontWeight: "500",
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          color: fg,
          margin: "0 0 10px 0",
          transition: "color 0.4s ease",
        }}>
          {item.heading}
        </p>
        <p style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: "14px",
          lineHeight: "1.75",
          color: mutedColor,
          margin: 0,
          transition: "color 0.4s ease",
        }}>
          {item.body}
        </p>
      </div>
    </div>
  );
}

export default function SoundPage({ onNavigate }) {
  const [nightMode, setNightMode] = useState(false);
  const [view, setView] = useState("main");

  if (view === "dj") {
    return <Sounddj nightMode={nightMode} onBack={() => setView("main")} onNightModeToggle={() => setNightMode(n => !n)} />;
  }
  if (view === "live") {
    return <SoundLive nightMode={nightMode} onBack={() => setView("main")} onNightModeToggle={() => setNightMode(n => !n)} />;
  }

  const bg = nightMode ? "#0a0a0a" : "#fff";
  const fg = nightMode ? "#fff" : "#000";
  const border = nightMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";
  const mutedColor = nightMode ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sound-page {
          min-height: 100vh;
          background: ${bg};
          transition: background 0.4s ease;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        /* ── TOP NAV ── */
        .sound-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid ${border};
          transition: border-color 0.4s ease;
        }
        .sound-nav-title {
          font-size: 10px; letter-spacing: 0.13em; text-transform: uppercase;
          color: ${fg}; transition: color 0.4s ease;
        }
        .sound-night-btn {
          background: none; border: none; cursor: pointer;
          font-size: 9px; letter-spacing: 0.13em; text-transform: uppercase;
          color: ${mutedColor}; display: flex; align-items: center; gap: 8px;
          padding: 0; transition: color 0.3s ease;
        }
        .sound-night-btn:hover { color: ${fg}; }

        /* Night mode icon — half circle (crescent feel) */
        .sound-night-icon {
          width: 14px; height: 14px; position: relative;
        }

        /* ── MAIN BODY ── */
        .sound-body {
          padding: 48px 24px 80px;
        }

        /* Two-column video layout */
        .sound-videos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: flex-start;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 680px) {
          .sound-nav { padding: 14px 16px; }
          .sound-body { padding: 28px 16px 60px; }
          .sound-videos {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }
      `}</style>

      <div className="sound-page">
        {/* Nav */}
        <div className="sound-nav">
          <span className="sound-nav-title">Sound</span>
          <button className="sound-night-btn" onClick={() => setNightMode(n => !n)}>
            {/* SVG half-circle icon matching ALD */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke={fg} strokeWidth="1" fill="none" />
              <path d="M7 1 A6 6 0 0 1 7 13 Z" fill={fg} />
            </svg>
            Night Mode
          </button>
        </div>

        {/* Video blocks */}
        <div className="sound-body">
          <div className="sound-videos">
            {soundData.map(item => (
              <VideoBlock
                key={item.id}
                item={item}
                nightMode={nightMode}
                onClick={() => {
                  if (item.series === "DJ") setView("dj");
                  if (item.series === "LIVE") setView("live");
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
