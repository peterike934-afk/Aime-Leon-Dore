import { useState, useRef, useEffect } from "react";

const djEpisodes = [
  {
    id: 1,
    number: "20",
    date: "JANUARY 30, 2026",
    title: "GETLIVE!",
    location: "NEW YORK, NY",
    description: "GETLIVE! plays a selection of Soul and R&B classics on 45s at 214 Mulberry.",
    videoUrl: "https://player.vimeo.com/progressive_redirect/playback/1080561083/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=a9bf6272a4b64ec11de0b781fdd8a74b285a406123bdb9513f7857ed54a2902c",
    poster: "https://www.aimeleondore.com/cdn/shop/files/SS26_GETLIVE__LIVE_600x.jpg?v=1769786284",
    tracklist: [
      { num: 1, title: "No One's Gonna Love You (Mixed)", artist: "The S.O.S. Band" },
      { num: 2, title: "Hangin' On a String (Contemplating) [Mixed]", artist: "Loose Ends" },
      { num: 3, title: "Feels So Real (Won't Let Go) [Mixed]", artist: "Patrice Rushen" },
      { num: 4, title: "ID (from GETLIVE! at 214 Mulberry) [Mixed]", artist: "ID" },
      { num: 5, title: "Who Do You Love (Mixed)", artist: "Bernard Wright" },
      { num: 6, title: "Gotta Get You Home Tonight (Mixed)", artist: "Eugene Wilde" },
    ],
  },
  {
    id: 2,
    number: "19",
    date: "NOVEMBER 9, 2025",
    title: "LAS FLAQUITAS",
    location: "NEW YORK, NY",
    description: "Las Flaquitas play a mix of Afro and Caribbean rhythms, including reggae, dub, Afrobeat, funk, and modern dancehall at 214 Mulberry.",
    videoUrl: "https://player.vimeo.com/progressive_redirect/playback/1158554683/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=bf67b627631dc49e4e8fddd44cbf796f0f80663476ce32115ed35d3b7b61a928",
    poster: "https://www.aimeleondore.com/cdn/shop/files/FW25_SOUND_NO_CREST_16X9_LAS_FLAQUITAS_01_1_600x.jpg?v=1762701370",
    tracklist: [],
  },
  {
    id: 3,
    number: "18",
    date: "OCTOBER 10, 2025",
    title: "LARGE PROFESSOR",
    location: "NEW YORK, NY",
    description: "Large Professor plays a selection of jazz, funk, rock, and soul classics on vinyl at 214 Mulberry.",
    videoUrl: "https://player.vimeo.com/progressive_redirect/playback/1165523634/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=949878421ab684d15d3c134111933cdba213b75333de64b249e1a01c53d4892e",
    poster: "https://www.aimeleondore.com/cdn/shop/files/FW25_SOUND_Large_Professor_Youtube_2_600x.jpg?v=1759764363",
    tracklist: [],
  },
  {
    id: 4,
    number: "17",
    date: "SEPTEMBER 10, 2025",
    title: "ROSS ONE",
    location: "NEW YORK, NY",
    description: "Ross One presents a diverse program of New Wave, 90s rock, and Britpop at 214 Mulberry.",
    videoUrl: "https://player.vimeo.com/progressive_redirect/playback/1080561083/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=a9bf6272a4b64ec11de0b781fdd8a74b285a406123bdb9513f7857ed54a2902c",
    poster: "https://www.aimeleondore.com/cdn/shop/files/FW25_SOUND_PAGE_NO_CREST_ROSS_ONE_600x.jpg?v=1757445783",
    tracklist: [],
  },
  {
    id: 5,
    number: "16",
    date: "JULY 4, 2025",
    title: "KID CAPRI",
    location: "NEW YORK, NY",
    description: "Kid Capri delivers a hard-hitting hip-hop mash-up at 214 Mulberry.",
    videoUrl: "https://player.vimeo.com/progressive_redirect/playback/1158554683/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=bf67b627631dc49e4e8fddd44cbf796f0f80663476ce32115ed35d3b7b61a928",
    poster: "https://www.aimeleondore.com/cdn/shop/files/SOUND_COVER_NO_CREST_031025_KID_CAPRI_600x.jpg?v=1750957834",
    tracklist: [],
  },
  {
    id: 6,
    number: "15",
    date: "JUNE 5, 2025",
    title: "DEDE LOVELACE",
    location: "NEW YORK, NY",
    description: "Dede Lovelace plays an electric yet soulful house mix at 214 Mulberry.",
    videoUrl: "https://player.vimeo.com/progressive_redirect/playback/1165523634/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=949878421ab684d15d3c134111933cdba213b75333de64b249e1a01c53d4892e",
    poster: "https://www.aimeleondore.com/cdn/shop/files/SOUND_COVER_NO_CREST_031025_DEDE_LOVELACE_copy_600x.jpg?v=1748963168",
    tracklist: [],
  },
  {
    id: 7,
    number: "14",
    date: "MAY 2, 2025",
    title: "CUTBIRD",
    location: "NEW YORK, NY",
    description: "Cutbird plays a Hip Hop and Jazz vinyl set at 214 Mulberry.",
    videoUrl: "https://player.vimeo.com/progressive_redirect/playback/1080561083/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=a9bf6272a4b64ec11de0b781fdd8a74b285a406123bdb9513f7857ed54a2902c",
    poster: "https://www.aimeleondore.com/cdn/shop/files/SOUND_COVER_NO_CREST_031025_CUTBIRD_copy_1_600x.jpg?v=1746132014",
    tracklist: [],
  },
  {
    id: 8,
    number: "13",
    date: "APRIL 2, 2025",
    title: "SAMANTHA RONSON",
    location: "NEW YORK, NY",
    description: "Samantha Ronson plays a selection of her favorite Dance and R&B tracks at 214 Mulberry.",
    videoUrl: "https://player.vimeo.com/progressive_redirect/playback/1158554683/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=bf67b627631dc49e4e8fddd44cbf796f0f80663476ce32115ed35d3b7b61a928",
    poster: "https://www.aimeleondore.com/cdn/shop/files/SOUND_COVER_NO_CREST_031025_Samanthan_Ronson_1_600x.jpg?v=1743602843",
    tracklist: [],
  },
  {
    id: 9,
    number: "12",
    date: "MARCH 7, 2025",
    title: "TONY TOUCH",
    location: "NEW YORK, NY",
    description: "Tony Touch delivers an open format mix of hip-hop, funk, soul, Latin, house, and classics at 214 Mulberry.",
    videoUrl: "https://player.vimeo.com/progressive_redirect/playback/1165523634/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=949878421ab684d15d3c134111933cdba213b75333de64b249e1a01c53d4892e",
    poster: "https://www.aimeleondore.com/cdn/shop/files/TONY_TOUCH_SOUND_COVER_ASSET_030525_A_3_600x.jpg?v=1741359607",
    tracklist: [],
  },
  {
    id: 10,
    number: "11",
    date: "JANUARY 17, 2025",
    title: "RAGAZZI",
    location: "NEW YORK, NY",
    description: "Ragazzi plays a selection of East Coast house and European dance deep cuts from their current club rotation at 214 Mulberry.",
    videoUrl: "https://player.vimeo.com/progressive_redirect/playback/1080561083/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=a9bf6272a4b64ec11de0b781fdd8a74b285a406123bdb9513f7857ed54a2902c",
    poster: "https://www.aimeleondore.com/cdn/shop/files/RAGAZZI_SOUNDROOM_1920x1080_COVER_070623_2_1_600x.jpg?v=1736869367",
    tracklist: [],
  },
];

export default function Sounddj({ nightMode = false, onBack, onNightModeToggle }) {
  const [active, setActive] = useState(djEpisodes[0]);
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

        .sdj { min-height: 100vh; background: ${bg}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }

        /* ── NAV ── */
        .sdj-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 32px;
          border-bottom: 1px solid ${border};
        }
        .sdj-back {
          background: none; border: none; cursor: pointer;
          font-size: 9px; letter-spacing: 0.13em; text-transform: uppercase;
          color: ${muted}; display: flex; align-items: center; gap: 7px;
          transition: color 0.2s;
        }
        .sdj-back:hover { color: ${fg}; }
        .sdj-nav-label {
          font-size: 9px; letter-spacing: 0.13em; text-transform: uppercase; color: ${fg};
        }
        .sdj-night-btn {
          background: none; border: none; cursor: pointer;
          font-size: 9px; letter-spacing: 0.13em; text-transform: uppercase;
          color: ${muted}; display: flex; align-items: center; gap: 8px; padding: 0;
          transition: color 0.2s;
        }
        .sdj-night-btn:hover { color: ${fg}; }

        /* ── FEATURED VIDEO (full width, 16:9) ── */
        .sdj-hero { width: 100%; background: #000; }
        .sdj-hero video {
          width: 100%; aspect-ratio: 16/9; display: block; object-fit: cover;
          max-height: 70vh;
        }

        /* ── FEATURED INFO ── */
        .sdj-featured {
          padding: 28px 32px 24px;
          border-bottom: 1px solid ${border};
          text-align: center;
          display: flex; flex-direction: column; align-items: center;
        }
        .sdj-featured-date {
          font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase;
          color: ${muted}; margin-bottom: 10px;
        }
        .sdj-featured-heading {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 22px; font-weight: 400; color: ${fg};
          text-transform: uppercase; letter-spacing: 0.04em;
          margin-bottom: 10px; line-height: 1.2;
        }
        .sdj-featured-desc {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 14px; line-height: 1.75; color: ${muted};
          max-width: 480px; margin-bottom: 16px;
        }
        .sdj-tl-btn {
          background: none; border: none; cursor: pointer;
          font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase;
          color: ${fg}; text-decoration: underline; text-underline-offset: 3px;
          transition: opacity 0.2s;
        }
        .sdj-tl-btn:hover { opacity: 0.45; }

        /* ── TRACKLIST PANEL ── */
        .sdj-tl-panel {
          border-bottom: 1px solid ${border};
          padding: 0 32px 32px;
        }
        .sdj-tl-close {
          background: none; border: none; cursor: pointer;
          font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase;
          color: ${muted}; padding: 18px 0; display: block;
          transition: color 0.2s;
        }
        .sdj-tl-close:hover { color: ${fg}; }
        .sdj-tl-box {
          display: flex; max-width: 600px;
          border: 1px solid ${border}; overflow: hidden;
          background: ${nightMode ? "#111" : "#fff"};
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
          justify-content: center; margin: 0 auto;
        }
        .sdj-apple {
          width: 190px; flex-shrink: 0; padding: 14px;
          border-right: 1px solid ${border};
        }
        .sdj-apple-logo {
          display: flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 500; color: ${fg}; margin-bottom: 12px;
        }
        .sdj-apple-thumb {
          width: 100%; aspect-ratio: 1; object-fit: cover; display: block; margin-bottom: 10px;
        }
        .sdj-apple-album { font-size: 12px; font-weight: 500; color: ${fg}; margin-bottom: 2px; }
        .sdj-apple-artist { font-size: 11px; color: ${muted}; margin-bottom: 14px; }
        .sdj-apple-play {
          width: 100%; background: #fc3c44; color: #fff; border: none;
          border-radius: 6px; padding: 9px; font-size: 13px; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px;
        }
        .sdj-tracks { flex: 1; padding: 0 14px; position: relative; min-width: 0; }
        .sdj-tracks-signin {
          position: absolute; top: 12px; right: 12px;
          background: none; border: 1px solid ${border};
          border-radius: 12px; padding: 4px 12px;
          font-size: 11px; color: ${fg}; cursor: pointer;
        }
        .sdj-tracks-list { padding-top: 42px; }
        .sdj-track {
          display: flex; align-items: center; gap: 14px;
          padding: 10px 0; border-bottom: 1px solid ${border};
        }
        .sdj-track:last-child { border-bottom: none; }
        .sdj-track-num { font-size: 11px; color: ${muted}; min-width: 14px; text-align: center; flex-shrink: 0; }
        .sdj-track-title { font-size: 12px; color: ${fg}; margin-bottom: 2px; }
        .sdj-track-artist { font-size: 11px; color: ${muted}; }
        .sdj-apple-link {
          display: block; font-size: 12px; color: #fc3c44; font-weight: 500;
          text-decoration: none; padding: 12px 0 4px;
        }
        .sdj-apple-note { font-size: 9px; color: ${muted}; padding-bottom: 10px; text-align: right; }

        /* ── EPISODE GRID ── */
        .sdj-grid-wrap { padding: 40px 24px 80px; }
        .sdj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: ${border};
          border: 1px solid ${border};
        }

        /* ── CARD ── */
        .sdj-card {
          cursor: pointer;
          background: ${bg};
          transition: background 0.2s;
          overflow: hidden;
        }
        .sdj-card:hover { background: ${nightMode ? "#111" : "#f9f9f9"}; }

        .sdj-card-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 12px;
          border-bottom: 1px solid ${border};
        }
        .sdj-card-date {
          font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: ${muted};
        }
        .sdj-card-right { display: flex; align-items: center; gap: 10px; }
        .sdj-card-num { font-size: 18px; font-weight: 300; color: ${fg}; line-height: 1; }
        .sdj-card-play {
          width: 24px; height: 24px; border: 1px solid ${border};
          display: flex; align-items: center; justify-content: center;
          background: ${bg}; transition: background 0.2s, border-color 0.2s; flex-shrink: 0;
        }
        .sdj-card:hover .sdj-card-play { background: ${fg}; border-color: ${fg}; }
        .sdj-play-icon { fill: ${fg}; transition: fill 0.2s; }
        .sdj-card:hover .sdj-play-icon { fill: ${bg}; }

        /* 16:9 image — matches ALD exactly */
        .sdj-card-img-wrap {
          width: 100%; aspect-ratio: 16/9; overflow: hidden; background: #111; position: relative;
        }
        .sdj-card-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.5s ease;
        }
        .sdj-card:hover .sdj-card-img { transform: scale(1.04); }
        .sdj-card-active-bar {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: ${fg};
        }

        .sdj-card-body { padding: 12px 12px 16px; }
        .sdj-card-title {
          font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          font-weight: 500; color: ${fg}; margin-bottom: 3px;
        }
        .sdj-card-loc {
          font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase;
          color: ${muted}; margin-bottom: 8px;
        }
        .sdj-card-desc {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 12px; line-height: 1.6; color: ${muted};
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .sdj-grid { grid-template-columns: repeat(2, 1fr); }
          .sdj-nav { padding: 14px 20px; }
          .sdj-featured { padding: 24px 20px; }
          .sdj-tl-panel { padding: 0 20px 28px; }
          .sdj-grid-wrap { padding: 32px 0 60px; }
        }
        @media (max-width: 560px) {
          .sdj-grid { grid-template-columns: 1fr; }
          .sdj-nav { padding: 12px 16px; }
          .sdj-featured { padding: 20px 16px; }
          .sdj-featured-heading { font-size: 18px; }
          .sdj-tl-panel { padding: 0 16px 24px; }
          .sdj-tl-box { flex-direction: column; }
          .sdj-apple { width: 100%; border-right: none; border-bottom: 1px solid ${border}; }
          .sdj-grid-wrap { padding: 24px 0 48px; }
        }
      `}</style>

      <div className="sdj">

        {/* Nav */}
        <div className="sdj-nav">
          <button className="sdj-back" onClick={onBack}>← Sound</button>
          <span className="sdj-nav-label">DJ</span>
          <button className="sdj-night-btn" onClick={onNightModeToggle}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke={fg} strokeWidth="1" fill="none" />
              <path d="M7 1 A6 6 0 0 1 7 13 Z" fill={fg} />
            </svg>
            Night Mode
          </button>
        </div>

        {/* Featured video */}
        <div className="sdj-hero">
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
        <div className="sdj-featured">
          <div className="sdj-featured-date">{active.date}</div>
          <div className="sdj-featured-heading">{active.title}, {active.location}</div>
          <div className="sdj-featured-desc">{active.description}</div>
          {active.tracklist?.length > 0 && (
            <button className="sdj-tl-btn" onClick={() => setShowTracklist(v => !v)}>
              {showTracklist ? "Close Tracklist" : "View Tracklist"}
            </button>
          )}
        </div>

        {/* Tracklist panel */}
        {showTracklist && active.tracklist?.length > 0 && (
          <div className="sdj-tl-panel">
            <button className="sdj-tl-close" onClick={() => setShowTracklist(false)}>
              Close Tracklist
            </button>
            <div className="sdj-tl-box">
              <div className="sdj-apple">
                <div className="sdj-apple-logo">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M11.07 9.36c-.28.62-.42.9-.78 1.44-.51.77-1.22 1.73-2.11 1.74-.79.01-1-.51-2.07-.51-1.07 0-1.31.52-2.1.51-.88-.01-1.56-.88-2.07-1.65C.43 8.86.18 6.5 1.06 5.25c.62-.89 1.6-1.41 2.52-1.41.94 0 1.53.51 2.3.51.75 0 1.21-.52 2.29-.52.82 0 1.69.45 2.31 1.22-2.03 1.11-1.7 4.01.59 4.31zM8.56 2.57C8.97 2.03 9.28 1.27 9.14.5c-.69.05-1.5.49-1.97 1.06-.43.52-.78 1.28-.64 2.02.75.02 1.52-.43 2.03-1.01z" />
                  </svg>
                  Music
                </div>
                <img src={active.poster} alt={active.title} className="sdj-apple-thumb" />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div>
                    <div className="sdj-apple-album">{active.title} at 214…</div>
                    <div className="sdj-apple-artist">{active.title}</div>
                  </div>
                  <span style={{ fontSize: 16, color: "#888", cursor: "pointer" }}>···</span>
                </div>
                <button className="sdj-apple-play">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="white"><polygon points="0,0 10,6 0,12" /></svg>
                  Play
                </button>
              </div>
              <div className="sdj-tracks">
                <button className="sdj-tracks-signin">Sign In</button>
                <div className="sdj-tracks-list">
                  {active.tracklist.map(t => (
                    <div className="sdj-track" key={t.num}>
                      <span className="sdj-track-num">{t.num}</span>
                      <div>
                        <div className="sdj-track-title">{t.title}</div>
                        <div className="sdj-track-artist">{t.artist}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <a href="#" className="sdj-apple-link">View in Apple Music ↗</a>
                <div className="sdj-apple-note">See how your data is managed…</div>
              </div>
            </div>
          </div>
        )}

        {/* Episode grid — no outer padding so border-lines go edge-to-edge */}
        <div className="sdj-grid-wrap">
          <div className="sdj-grid">
            {djEpisodes.map(ep => (
              <div className="sdj-card" key={ep.id} onClick={() => handleSelect(ep)}>
                <div className="sdj-card-header">
                  <span className="sdj-card-date">{ep.date}</span>
                  <div className="sdj-card-right">
                    <span className="sdj-card-num">{ep.number}</span>
                    <div className="sdj-card-play">
                      <svg width="6" height="8" viewBox="0 0 7 8" style={{ marginLeft: 1 }}>
                        <polygon points="0,0 7,4 0,8" className="sdj-play-icon" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="sdj-card-img-wrap">
                  <img src={ep.poster} alt={ep.title} className="sdj-card-img" loading="lazy" />
                  {active.id === ep.id && <div className="sdj-card-active-bar" />}
                </div>
                <div className="sdj-card-body">
                  <div className="sdj-card-title">{ep.title}</div>
                  <div className="sdj-card-loc">{ep.location}</div>
                  <div className="sdj-card-desc">{ep.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
