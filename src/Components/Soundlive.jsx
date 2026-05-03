import { useState, useRef, useEffect } from "react";

const liveEpisodes = [
  {
    id: 1,
    number: "03",
    date: "FEBRUARY 17, 2026",
    title: "ROC MARCIANO",
    location: "NEW YORK, NY",
    description: "Roc Marciano performs tracks from his latest album as well as classics from throughout his career.",
    videoUrl: "https://player.vimeo.com/progressive_redirect/playback/1080561083/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=a9bf6272a4b64ec11de0b781fdd8a74b285a406123bdb9513f7857ed54a2902c",
    poster: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    tracklist: [],
  },
  {
    id: 2,
    number: "02",
    date: "NOVEMBER 30, 2025",
    title: "GRIGORI SAMOLIS & CO.",
    location: "NEW YORK, NY",
    description: "Grigori Samolis & Co. play a mix of classical and contemporary Cretan songs live at 214 Mulberry St.",
    videoUrl: "https://player.vimeo.com/progressive_redirect/playback/1158554683/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=bf67b627631dc49e4e8fddd44cbf796f0f80663476ce32115ed35d3b7b61a928",
    poster: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80",
    tracklist: [],
  },
  {
    id: 3,
    number: "01",
    date: "AUGUST 19, 2025",
    title: "RAEKWON",
    location: "NEW YORK, NY",
    description: "Raekwon, an inspirational and referential artist to the brand's DNA, is joined by DJ Statik Selektah, drummer Cinque Kemp, and bassist Joshua Crumbly, for an energetic 20-minute set.",
    videoUrl: "https://player.vimeo.com/progressive_redirect/playback/1165523634/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=949878421ab684d15d3c134111933cdba213b75333de64b249e1a01c53d4892e",
    poster: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    tracklist: [],
  },
];

export default function Soundlive({ nightMode = false, onBack, onNightModeToggle }) {
  const [active, setActive] = useState(liveEpisodes[0]);
  const [showTracklist, setShowTracklist] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.load();
    vid.play().catch(() => {});
  }, [active]);

  const handleSelect = (ep) => {
    setActive(ep);
    setShowTracklist(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bg = nightMode ? "#0a0a0a" : "#ffffff";
  const fg = nightMode ? "#ffffff" : "#000000";
  const muted = nightMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  const border = nightMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .slive { min-height: 100vh; background: ${bg}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }

        /* ── NAV ── */
        .slive-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 32px; border-bottom: 1px solid ${border};
        }
        .slive-back {
          background: none; border: none; cursor: pointer;
          font-size: 9px; letter-spacing: 0.13em; text-transform: uppercase;
          color: ${muted}; display: flex; align-items: center; gap: 7px; transition: color 0.2s;
        }
        .slive-back:hover { color: ${fg}; }
        .slive-nav-label { font-size: 9px; letter-spacing: 0.13em; text-transform: uppercase; color: ${fg}; }
        .slive-night-btn {
          background: none; border: none; cursor: pointer;
          font-size: 9px; letter-spacing: 0.13em; text-transform: uppercase;
          color: ${muted}; display: flex; align-items: center; gap: 8px; padding: 0;
          transition: color 0.2s;
        }
        .slive-night-btn:hover { color: ${fg}; }

        /* ── HERO VIDEO ── */
        .slive-hero { width: 100%; background: #000; }
        .slive-hero video {
          width: 100%; aspect-ratio: 16/9; display: block; object-fit: cover; max-height: 70vh;
        }

        /* ── FEATURED INFO ── */
        .slive-featured {
          padding: 28px 32px 24px; border-bottom: 1px solid ${border};
          text-align: center;
          display: flex; flex-direction: column; align-items: center;
        }
        .slive-featured-date {
          font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase;
          color: ${muted}; margin-bottom: 10px;
        }
        .slive-featured-heading {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 22px; font-weight: 400; color: ${fg};
          text-transform: uppercase; letter-spacing: 0.04em;
          margin-bottom: 10px; line-height: 1.2;
        }
        .slive-featured-desc {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 14px; line-height: 1.75; color: ${muted};
          max-width: 480px;
        }

        /* ── GRID ── */
        .slive-grid-wrap { padding: 40px 24px 80px; }
        .slive-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: ${border};
          border: 1px solid ${border};
        }

        /* ── CARD ── */
        .slive-card {
          cursor: pointer; background: ${bg}; overflow: hidden; transition: background 0.2s;
        }
        .slive-card:hover { background: ${nightMode ? "#111" : "#f9f9f9"}; }

        .slive-card-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 12px; border-bottom: 1px solid ${border};
        }
        .slive-card-date { font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: ${muted}; }
        .slive-card-right { display: flex; align-items: center; gap: 10px; }
        .slive-card-num { font-size: 18px; font-weight: 300; color: ${fg}; line-height: 1; }
        .slive-card-play {
          width: 24px; height: 24px; border: 1px solid ${border};
          display: flex; align-items: center; justify-content: center;
          background: ${bg}; transition: background 0.2s, border-color 0.2s; flex-shrink: 0;
        }
        .slive-card:hover .slive-card-play { background: ${fg}; border-color: ${fg}; }
        .slive-play-icon { fill: ${fg}; transition: fill 0.2s; }
        .slive-card:hover .slive-play-icon { fill: ${bg}; }

        /* 16:9 image — matches ALD */
        .slive-card-img-wrap {
          width: 100%; aspect-ratio: 16/9; overflow: hidden; background: #111; position: relative;
        }
        .slive-card-img {
          width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease;
        }
        .slive-card:hover .slive-card-img { transform: scale(1.04); }
        .slive-card-active-bar {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: ${fg};
        }

        .slive-card-body { padding: 12px 12px 16px; }
        .slive-card-title {
          font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          font-weight: 500; color: ${fg}; margin-bottom: 3px;
        }
        .slive-card-loc {
          font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase;
          color: ${muted}; margin-bottom: 8px;
        }
        .slive-card-desc {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 12px; line-height: 1.6; color: ${muted};
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .slive-grid { grid-template-columns: repeat(2, 1fr); }
          .slive-nav { padding: 14px 20px; }
          .slive-featured { padding: 24px 20px; }
          .slive-grid-wrap { padding: 32px 0 60px; }
        }
        @media (max-width: 560px) {
          .slive-grid { grid-template-columns: 1fr; }
          .slive-nav { padding: 12px 16px; }
          .slive-featured { padding: 20px 16px; }
          .slive-featured-heading { font-size: 18px; }
          .slive-grid-wrap { padding: 24px 0 48px; }
        }
      `}</style>

      <div className="slive">

        {/* Nav */}
        <div className="slive-nav">
          <button className="slive-back" onClick={onBack}>← Sound</button>
          <span className="slive-nav-label">Live at 214</span>
          <button className="slive-night-btn" onClick={onNightModeToggle}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke={fg} strokeWidth="1" fill="none" />
              <path d="M7 1 A6 6 0 0 1 7 13 Z" fill={fg} />
            </svg>
            Night Mode
          </button>
        </div>

        {/* Featured video */}
        <div className="slive-hero">
          <video
            ref={videoRef}
            key={active.id}
            src={active.videoUrl}
            poster={active.poster}
            controls
            playsInline
          />
        </div>

        {/* Featured info */}
        <div className="slive-featured">
          <div className="slive-featured-date">{active.date}</div>
          <div className="slive-featured-heading">{active.title}, {active.location}</div>
          <div className="slive-featured-desc">{active.description}</div>
        </div>

        {/* Episode grid */}
        <div className="slive-grid-wrap">
          <div className="slive-grid">
            {liveEpisodes.map(ep => (
              <div className="slive-card" key={ep.id} onClick={() => handleSelect(ep)}>
                <div className="slive-card-header">
                  <span className="slive-card-date">{ep.date}</span>
                  <div className="slive-card-right">
                    <span className="slive-card-num">{ep.number}</span>
                    <div className="slive-card-play">
                      <svg width="6" height="8" viewBox="0 0 7 8" style={{ marginLeft: 1 }}>
                        <polygon points="0,0 7,4 0,8" className="slive-play-icon" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="slive-card-img-wrap">
                  <img src={ep.poster} alt={ep.title} className="slive-card-img" loading="lazy" />
                  {active.id === ep.id && <div className="slive-card-active-bar" />}
                </div>
                <div className="slive-card-body">
                  <div className="slive-card-title">{ep.title}</div>
                  <div className="slive-card-loc">{ep.location}</div>
                  <div className="slive-card-desc">{ep.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
