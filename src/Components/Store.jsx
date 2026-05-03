import { useState, useEffect } from "react"

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const stores = [
  {
    id: 1,
    city: "New York Flagship",
    address: "224 Mulberry St.",
    address2: "New York, NY 10012",
    hours: [
      { days: "Monday - Saturday", time: "11:00am - 7:00pm" },
      { days: "Sunday", time: "12:00pm - 7:00pm" },
    ],
    cover: "/store-ny-cover.jpg",
    video: "/store-ny-1.mp4",
    layout: "ny",
    description:
      "The Aimé Leon Dore New York Flagship, located at 224 Mulberry Street, blends mid-century modern and nostalgic aesthetics. The space features a thoughtfully curated shop floor, an intimate sound room, and a Greek-inspired café reflecting the brand's heritage.",
    directionsUrl: "https://www.google.com/maps?q=224+Mulberry+St,+New+York,+NY+10012",
    photoGroups: [
      {
        label: "Store Facade",
        wide1: "/store1.png",
        portrait1: "/store2.png",
        portrait2: "/store3.png",
        wide2: "/store4.png",
      },
      {
        wide1: "/flagship1.png",
        portrait1: "/flagship2.png",
        portrait2: "/flagship3.png",
        wide2: "/flagship4.png",
      },
      {
        wide1: "/flagship5.png",
        portrait1: "/flagship6.png",
        portrait2: "/flagship7.png",
        wide2: "/flagship8.png",
      },
    ],
    soundRoom: ["/flagship10.png", "/flagship11.png", "/flagship12.png"],
  },
  {
    id: 2,
    city: "London Flagship",
    address: "32 Broadwick St.",
    address2: "London, UK W1F 8JB",
    hours: [
      { days: "Monday - Saturday", time: "11:00am - 7:00pm" },
      { days: "Sunday", time: "12:00pm - 6:00pm" },
    ],
    cover: "/store-london-cover.jpg",
    video: "/store-london-1.mp4",
    layout: "london",
    description:
      "The Aimé Leon Dore London Flagship is located at 32 Broadwick Street in the heart of Soho. The space carries the brand's signature aesthetic — a warm, considered environment that blends European sensibility with New York roots.",
    directionsUrl: "https://www.google.com/maps?q=32+Broadwick+St,+London,+W1F+8JB",
    photoGroups: [
      {
        label: "Store Facade",
        wide1: "/uk1.png",
        portrait1: "/uk2.png",
        portrait2: "/uk3.png",
      },
      {
        wide1: "/uk4.png",
        portrait1: "/uk5.png",
        portrait2: "/uk6.png",
        wide2: "/uk7.png",
      },
      {
        wide1: "/uk8.png",
        portrait1: "/uk9.png",
        portrait2: "/uk10.png",
        wide2: "/uk11.png",
      },
    ],
    soundRoom: ["/uk12.png", "/uk13.png", "/flagship11.png"],
  },
  {
    id: 3,
    city: "Los Angeles Flagship",
    address: "8746 Melrose Ave",
    address2: "West Hollywood, CA 90069",
    hours: [
      { days: "Monday - Saturday", time: "11:00am - 7:00pm" },
      { days: "Sunday", time: "12:00pm - 6:00pm" },
    ],
    cover: "/store-la-cover.jpg",
    video: "/store-la-1.mp4",
    layout: "la",
    description:
      "The Aimé Leon Dore Los Angeles Flagship, located at 8746 Melrose Ave, is the newest extension of the brand. The Mediterranean-inspired space features a thoughtfully curated shop floor, outdoor courtyard, and a Greek-inspired Café Leon Dore reflecting the brand's heritage.",
    directionsUrl: "https://www.google.com/maps?q=8746+Melrose+Ave,+West+Hollywood,+CA+90069",
    la: {
      desktop: {
        section1: {
          label: "Store Interior",
          images: [
            { type: "wide", src: "/ls1.png" },
            { type: "wide", src: "/ls2.png" },
            { type: "pair", src1: "/ls3.png", src2: "/ls4.png" },
            { type: "wide", src: "/ls5.png" },
          ],
        },
        section2: {
          label: "Courtyard",
          images: [
            { type: "pair", src1: "/ls6.png",  src2: "/ls7.png" },
            { type: "wide", src: "/ls8.png" },
            { type: "pair", src1: "/ls9.png",  src2: "/ls10.png" },
          ],
        },
        section3: {
          images: [
            { type: "wide", src: "/ls11.png" },
            { type: "pair", src1: "/ls12.png", src2: "/ls13.png" },
            { type: "wide", src: "/ls14.png" },
            { type: "pair", src1: "/ls15.png", src2: "/ls16.png" },
          ],
        },
      },
      mobile: {
        section1: {
          label: "Store Interior",
          images: [
            { type: "wide",  src: "/ls1.png" },
            { type: "wide",  src: "/ls2.png" },
            { type: "pair",  src1: "/ls3.png", src2: "/ls4.png" },
            { type: "wide",  src: "/ls5.png" },
          ],
        },
        section2: {
          label: "Courtyard",
          images: [
            { type: "trio", src1: "/ls6.png", src2: "/ls7.png", src3: "/ls8.png" },
          ],
        },
        section3: {
          images: [
            { type: "pair", src1: "/ls9.png",  src2: "/ls10.png" },
            { type: "wide", src: "/ls11.png" },
            { type: "pair", src1: "/ls12.png", src2: "/ls13.png" },
          ],
        },
      },
    },
  },
]

// ─────────────────────────────────────────────
// GLOBAL CSS
// ─────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Inter:wght@300;400&display=swap');

  * { box-sizing: border-box; }

  /* Portrait pair — 2 cols on desktop, 1 col on mobile */
  .s-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }
  @media (max-width: 767px) {
    .s-pair { grid-template-columns: 1fr; }
  }

  /* Trio — 3 cols on desktop, 1 col on mobile */
  .s-trio {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 6px;
  }
  @media (max-width: 767px) {
    .s-trio { grid-template-columns: 1fr; }
  }

  /* Sound room — 1 col mobile → 3 col desktop */
  .s-sound-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 6px;
  }
  @media (min-width: 768px) {
    .s-sound-grid { grid-template-columns: 1fr 1fr 1fr; }
  }

  /* Address + Hours */
  .s-info-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 28px 24px;
    gap: 24px;
    border-bottom: 1px solid rgba(0,0,0,0.08);
  }
  @media (max-width: 400px) {
    .s-info-row { grid-template-columns: 1fr; }
  }

  /* ── STORE LISTING ──────────────────────────
     Centered cards stacked vertically
     image on top, details below
  ─────────────────────────────────────────────*/
  .s-listing {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 40px 100px;
    gap: 72px;
    max-width: 860px;
    margin: 0 auto;
    width: 100%;
  }

  .s-listing-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    cursor: pointer;
  }

  .s-listing-img {
    width: 100%;
    aspect-ratio: 3/2;
    overflow: hidden;
    background: #e8e8e8;
  }
  .s-listing-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.7s ease;
  }
  .s-listing-item:hover .s-listing-img img {
    transform: scale(1.03);
  }

  .s-listing-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 18px 0 0;
  }

  .s-listing-meta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 14px;
    padding-top: 14px;
    width: 100%;
  }

  @media (max-width: 640px) {
    .s-listing { padding: 40px 20px 72px; gap: 52px; }
  }
`

// ─────────────────────────────────────────────
// HOOK — detect mobile (< 768px)
// ─────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  )
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])
  return isMobile
}

// ─────────────────────────────────────────────
// IMAGE BOX
// ─────────────────────────────────────────────
function ImgBox({ src, ratio = "16/9", position = "center" }) {
  return (
    <div style={{ aspectRatio: ratio, background: "#d4d4d4", overflow: "hidden", width: "100%" }}>
      <img
        src={src}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: position, display: "block" }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────
// NY / LONDON PHOTO GROUP
// ─────────────────────────────────────────────
function PhotoGroupStandard({ group }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <ImgBox src={group.wide1} ratio="21/9" />
      <div className="s-pair">
        <ImgBox src={group.portrait1} ratio="3/4" position="center top" />
        <ImgBox src={group.portrait2} ratio="3/4" position="center top" />
      </div>
      {group.wide2 && <ImgBox src={group.wide2} ratio="21/9" />}
    </div>
  )
}

// ─────────────────────────────────────────────
// LA ROW
// ─────────────────────────────────────────────
function LaRow({ item }) {
  if (item.type === "wide") return <ImgBox src={item.src} ratio="21/9" />
  if (item.type === "pair") {
    return (
      <div className="s-pair">
        <ImgBox src={item.src1} ratio="3/4" position="center top" />
        <ImgBox src={item.src2} ratio="3/4" position="center top" />
      </div>
    )
  }
  if (item.type === "trio") {
    return (
      <div className="s-trio">
        <ImgBox src={item.src1} ratio="3/4" position="center top" />
        <ImgBox src={item.src2} ratio="3/4" position="center top" />
        <ImgBox src={item.src3} ratio="3/4" position="center top" />
      </div>
    )
  }
  return null
}

// ─────────────────────────────────────────────
// LA SECTION
// ─────────────────────────────────────────────
function LaSection({ section, style }) {
  const muted = "rgba(0,0,0,0.35)"
  return (
    <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: "6px", ...style }}>
      {section.images.map((item, i) => (
        <LaRow key={i} item={item} />
      ))}
      {section.label && (
        <p style={{
          fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase",
          color: muted, margin: "8px 0 0", fontFamily: "'Inter', sans-serif",
        }}>
          {section.label}
        </p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// STORE DETAIL PAGE
// ─────────────────────────────────────────────
function StoreDetail({ store, onBack }) {
  const font   = "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif"
  const serif  = "'Playfair Display', Georgia, serif"
  const border = "1px solid rgba(0,0,0,0.08)"
  const muted  = "rgba(0,0,0,0.35)"
  const isLA   = store.layout === "la"
  const isMobile = useIsMobile()
  const laLayout = isLA ? (isMobile ? store.la.mobile : store.la.desktop) : null

  return (
    <div style={{ fontFamily: font, color: "#1a1a1a", minHeight: "100vh", background: "#fff" }}>
      <style>{CSS}</style>

      {/* Nav */}
      <div style={{
        padding: "16px 24px", borderBottom: border,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: "9px", letterSpacing: "0.13em", textTransform: "uppercase",
          color: muted, fontFamily: font, padding: 0,
        }}>
          ← Stores
        </button>
        <span style={{ fontSize: "9px", letterSpacing: "0.13em", textTransform: "uppercase" }}>
          {store.city}
        </span>
        <div style={{ width: 60 }} />
      </div>

      {/* Video */}
      <div style={{ width: "100%", background: "#111" }}>
        <video
          src={store.video}
          autoPlay muted loop playsInline
          style={{ width: "100%", maxHeight: "56vw", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Address / Hours */}
      <div className="s-info-row">
        <div>
          <p style={{ fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: muted, margin: "0 0 8px" }}>
            Address
          </p>
          <p style={{ fontSize: "11px", color: "#555", margin: 0, lineHeight: 1.8, fontWeight: 300 }}>
            {store.address}<br />{store.address2}
          </p>
        </div>
        <div>
          <p style={{ fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: muted, margin: "0 0 8px" }}>
            Hours
          </p>
          {store.hours.map((h, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", gap: "12px",
              fontSize: "11px", color: "#555", lineHeight: 1.8, fontWeight: 300,
            }}>
              <span>{h.days}</span>
              <span>{h.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* First photo group */}
      {isLA ? (
        <LaSection section={laLayout.section1} style={{ paddingTop: "24px" }} />
      ) : (
        <div style={{ padding: "24px 24px 0", display: "flex", flexDirection: "column", gap: "6px" }}>
          <PhotoGroupStandard group={store.photoGroups[0]} />
          {store.photoGroups[0].label && (
            <p style={{ fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: muted, margin: "8px 0 0" }}>
              {store.photoGroups[0].label}
            </p>
          )}
        </div>
      )}

      {/* Centered info block */}
      <div style={{ textAlign: "center", padding: "56px 24px 48px", maxWidth: "520px", margin: "0 auto" }}>
        <h2 style={{
          fontFamily: serif, fontSize: "clamp(20px, 4vw, 28px)",
          fontWeight: 300, letterSpacing: "0.02em", margin: "0 0 16px",
        }}>
          Aimé Leon Dore {store.city}
        </h2>
        <p style={{
          fontFamily: font, fontSize: "clamp(11px, 2vw, 12px)",
          lineHeight: 1.9, color: "rgba(0,0,0,0.45)", margin: "0 0 20px",
          fontWeight: 300, letterSpacing: "0.02em",
        }}>
          {store.description}
        </p>
        <div style={{ margin: "0 0 24px" }}>
          {store.hours.map((h, i) => (
            <p key={i} style={{
              fontSize: "10px", letterSpacing: "0.08em",
              textTransform: "uppercase", color: muted, margin: "0 0 4px",
            }}>
              {h.days} {h.time}
            </p>
          ))}
        </div>
        <a
          href={store.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "9px", letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#1a1a1a", textDecoration: "underline",
          }}
        >
          Directions
        </a>
      </div>

      {/* Sections after info block */}
      {isLA ? (
        <>
          <LaSection section={laLayout.section2} style={{ marginBottom: "24px" }} />
          <LaSection section={laLayout.section3} style={{ marginBottom: "60px" }} />
        </>
      ) : (
        <>
          {store.photoGroups.slice(1).map((group, i) => (
            <div key={i} style={{ padding: "0 24px", marginBottom: "24px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <PhotoGroupStandard group={group} />
              {group.label && (
                <p style={{ fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: muted, margin: "8px 0 0" }}>
                  {group.label}
                </p>
              )}
            </div>
          ))}
          {store.soundRoom && (
            <div style={{ padding: "0 24px 60px" }}>
              <div className="s-sound-grid">
                {store.soundRoom.map((src, i) => (
                  <ImgBox key={i} src={src} ratio="6/7" />
                ))}
              </div>
              <p style={{
                fontSize: "9px", letterSpacing: "0.12em",
                textTransform: "uppercase", color: muted, margin: "10px 0 0",
              }}>
                Sound Room
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// STORES LISTING PAGE
// ─────────────────────────────────────────────
export default function Stores() {
  const [activeStore, setActiveStore] = useState(null)
  const font  = "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif"
  const serif = "'Playfair Display', Georgia, serif"
  const muted = "rgba(0,0,0,0.35)"

  if (activeStore) {
    return <StoreDetail store={activeStore} onBack={() => setActiveStore(null)} />
  }

  return (
    <div style={{ fontFamily: font, color: "#1a1a1a", minHeight: "100vh", background: "#fff" }}>
      <style>{CSS}</style>

      {/* Page header */}
      <div style={{ padding: "40px 40px 0", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <p style={{
          fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase",
          color: muted, margin: "0 0 40px",
        }}>
          Stores
        </p>
      </div>

      {/* Centered card list */}
      <div className="s-listing">
        {stores.map((store) => (
          <div
            key={store.id}
            className="s-listing-item"
            onClick={() => setActiveStore(store)}
          >
            {/* Video */}
            <div className="s-listing-img">
              <video
                src={store.video}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Text below image */}
            <div className="s-listing-text">
              {/* City name */}
              <h2 style={{
                fontFamily: serif,
                fontSize: "clamp(13px, 1.8vw, 17px)",
                fontWeight: 400,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                margin: 0,
                lineHeight: 1.2,
              }}>
                {store.city}
              </h2>

              {/* Address */}
              <p style={{
                fontSize: "10px", letterSpacing: "0.12em",
                textTransform: "uppercase", color: "#1a1a1a",
                margin: "10px 0 0", fontWeight: 300, lineHeight: 1.9,
              }}>
                {store.address}<br />{store.address2}
              </p>


            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
