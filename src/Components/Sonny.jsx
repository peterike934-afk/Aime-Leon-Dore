import { useState, useEffect } from "react"
import ProductDetail from "../ProductDetail.jsx"
import { useCart } from "./CartContext.jsx"
import RecentlyViewedPanel from "./Recentlyview.jsx"
import { SliderImage } from "../Imageslider"  

const sonnyProducts = [
    { name: "ALD / New Balance SONNY NY IFTB Jersey",               price: "$145", imgs: [{ src: "/sn1.png",  alt: "IFTB Jersey" }] },
    { name: "ALD / New Balance SONNY NY League Hat",                 price: "$65",  imgs: [{ src: "/sn2.png",  alt: "League Hat" }] },
    { name: "ALD / New Balance SONNY NY League Hat",                 price: "$65",  imgs: [{ src: "/sn3.png",  alt: "League Hat" }] },
    { name: "ALD / New Balance SONNY NY Reversible Jersey",          price: "$95",  imgs: [{ src: "/sn4.png",  alt: "Reversible Jersey" }] },
    { name: "ALD / New Balance SONNY NY Gym Short",                  price: "$95",  imgs: [{ src: "/sn5.png",  alt: "Gym Short" }] },
    { name: "ALD / New Balance SONNY NY Gym Short",                  price: "$95",  imgs: [{ src: "/sn6.png",  alt: "Gym Short" }] },
    { name: "ALD / New Balance SONNY NY Compression Sleeves",        price: "$30",  imgs: [{ src: "/sn7.png",  alt: "Compression Sleeves" }, { src: "/sn9.png", alt: "Compression Sleeves - Alternative View" }] },
    { name: "ALD / New Balance SONNY NY IFTB Crewneck Sweatshirt",   price: "$140", imgs: [{ src: "/sn8.png",  alt: "IFTB Crewneck" }] },
    { name: "ALD / New Balance SONNY NY IFTB Crewneck Sweatshirt",   price: "$140", imgs: [{ src: "/sn9.png",  alt: "IFTB Crewneck" }] },
    { name: "ALD / New Balance SONNY NY Calf Sleeves",               price: "$30",  imgs: [{ src: "/sn10.png", alt: "Calf Sleeves" }] },
    { name: "ALD / New Balance SONNY NY Long-Sleeve Tee",            price: "$85",  imgs: [{ src: "/sn11.png", alt: "Long-Sleeve Tee" }] },
    { name: "ALD / New Balance SONNY NY Long-Sleeve Tee",            price: "$85",  imgs: [{ src: "/sn12.png", alt: "Long-Sleeve Tee" }] },
    { name: "ALD / New Balance SONNY NY Game Towel",                 price: "$40",  imgs: [{ src: "/sn13.png", alt: "Game Towel" }] },
    { name: "ALD / New Balance SONNY NY Finger Sleeve",              price: "$20",  imgs: [{ src: "/sn14.png", alt: "Finger Sleeve" }] },
    { name: "ALD / New Balance SONNY NY IFTB Hat",                   price: "Sold Out", soldOut: true, imgs: [{ src: "/sn15.png", alt: "IFTB Hat" }] },
]

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
const TIME_SLOTS = [
    "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM",
    "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM",
]

function getWeekDates(startDate) {
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startDate)
        d.setDate(d.getDate() + i)
        return d.getDate()
    })
}

function getWeekLabel(startDate) {
    return `WEEK OF ${startDate.toLocaleString("en-US", { month: "long" }).toUpperCase()} ${startDate.getDate()}, ${startDate.getFullYear()}`
}

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= breakpoint)
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth <= breakpoint)
        window.addEventListener("resize", handler)
        return () => window.removeEventListener("resize", handler)
    }, [breakpoint])
    return isMobile
}

function RatioBox({ ratio, bg = "#e8e8e8", children, style = {} }) {
    return (
        <div style={{
            position: "relative", width: "100%",
            paddingTop: `${ratio}%`, background: bg, overflow: "hidden", ...style,
        }}>
            <div style={{ position: "absolute", inset: 0 }}>{children}</div>
        </div>
    )
}

function FillImg({ src, alt = "", position = "center center" }) {
    return (
        <img src={src} alt={alt} style={{
            width: "100%", height: "100%", objectFit: "cover",
            objectPosition: position, display: "block",
        }} />
    )
}

const openRvFullDetails = (item) => {
    setTimeout(() => {
        window.dispatchEvent(new CustomEvent("rv-full-details", { detail: item }))
    }, 50)
}

export default function Sonny({ onProfileOpen, isSignedIn }) {
    const { addToRecentlyViewed, recentlyViewed } = useCart()
    const { convert } = (() => {
        try { return require("../useCurrency").useCurrency() } catch { return { convert: (v) => v } }
    })()

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [productDetailOpen, setProductDetailOpen] = useState(false)
    const [rvPanelItem, setRvPanelItem] = useState(null)
    const [rvPanelOpen, setRvPanelOpen] = useState(false)

    const handleRvClick = (product) => {
        setRvPanelItem(product)
        setRvPanelOpen(true)
    }

    const [email, setEmail] = useState("")
    const [subscribed, setSubscribed] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [weekOffset, setWeekOffset] = useState(0)
    const [bookingOpen, setBookingOpen] = useState(false)
    const isMobile = useIsMobile()

    const today = new Date()
    today.setDate(today.getDate() - today.getDay() + 1)
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() + weekOffset * 7)
    const weekDates = getWeekDates(weekStart)
    const weekLabel = getWeekLabel(weekStart)

    const toProduct = (p) => ({
        id: p.name + (p.imgs?.[0]?.src ?? ""),
        name: p.name,
        price: p.soldOut ? "$0" : p.price,
        imgs: p.imgs ?? [{ src: p.src, alt: p.name }],
        isSale: false,
    })

    return (
        <>
        <div style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            color: "#1a1a1a", minHeight: "100vh",
        }}>

            <RatioBox ratio={56.25} bg="#1a1a1a">
                <video
                    src="/bask-1.mp4"
                    autoPlay loop playsInline controls
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
            </RatioBox>

            {/* ── Description ── */}
            <div style={{ padding: "48px 24px", maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
                <p style={{ fontSize: "11px", lineHeight: 1.9, color: "#555", margin: "0 0 16px" }}>
                    In partnership with New Balance, Aimé Leon Dore hosted the second annual SONNY Women's
                    3v3 Invitational at Sara D. Roosevelt Park in New York City's Lower East Side. With a shared
                    brand commitment to bringing community together through the game of basketball, the day featured
                    a youth clinic and 16-team, single elimination tournament featuring the top women's players in
                    New York City.
                </p>
                <p style={{ fontSize: "11px", lineHeight: 1.9, color: "#555", margin: "0 0 16px" }}>
                    Sending love to Paris, all the players, the Gentilly community and the local winning team,
                    for one of our best tournaments yet. Thank you!
                </p>
                <p style={{ fontSize: "11px", lineHeight: 1.9, color: "#555", margin: 0, fontStyle: "italic" }}>
                    International Friendship Through Basketball.
                </p>
            </div>

            {/* ── Photo grid ── */}
            <div style={{ margin: "48px 0" }}>
                {!isMobile ? (
                    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 40px" }}>
                        <RatioBox ratio={52} bg="#e8e8e8">
                            <FillImg src="/snny1.png" />
                        </RatioBox>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "0 16px" }}>
                        {["/bsk1.png", "/bsk2.png", "/bsk3.png"].map((src, i) => (
                            <RatioBox key={i} ratio={66.67} bg="#e8e8e8">
                                <FillImg src={src} />
                            </RatioBox>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Products ── */}
            <div style={{ padding: isMobile ? "0 16px 60px" : "0 24px 80px" }}>
                <p style={{
                    fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#aaa", margin: "0 0 24px",
                    borderBottom: "1px solid #e8e8e8", borderTop: "1px solid #e8e8e8",
                    padding: "12px 0",
                }}>
                    ALD / NB Sonny NY
                </p>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)",
                    gap: isMobile ? "16px" : "12px",
                }}>
                    {sonnyProducts.map((p, i) => (
                        <div
                            key={i}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                const product = toProduct(p)
                                addToRecentlyViewed(product)
                                setSelectedProduct(product)
                                setProductDetailOpen(true)
                            }}
                        >
                            {/* ── Slider image ── */}
                            <RatioBox ratio={133.33} bg="#f2f2f2" style={{ marginBottom: "8px" }}>
                                <SliderImage
                                    images={p.imgs}
                                    style={{ position: "absolute", inset: 0 }}
                                />
                            </RatioBox>

                            <p style={{ fontSize: "10px", margin: "0 0 2px", color: "#1a1a1a", letterSpacing: "0.02em" }}>
                                {p.name}
                            </p>
                            <p style={{ fontSize: "10px", margin: 0, color: "#aaa" }}>
                                {p.soldOut ? "Sold Out" : p.price}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Recently Viewed ── */}
            {recentlyViewed?.length > 0 && (
                <div style={{
                    borderTop: "1px solid #e8e8e8",
                    padding: isMobile ? "24px 16px 40px" : "24px 24px 48px",
                }}>
                    <p style={{
                        fontSize: "9px", letterSpacing: "0.14em",
                        textTransform: "uppercase", color: "#aaa", margin: "0 0 20px",
                    }}>
                        Recently Viewed
                    </p>
                    <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "8px" }}>
                        {recentlyViewed.slice(0, isMobile ? 6 : 8).map((product) => (
                            <div
                                key={product.id}
                                style={{ flexShrink: 0, width: isMobile ? "200px" : "260px", cursor: "pointer" }}
                                onClick={() => handleRvClick(product)}
                            >
                                <div style={{
                                    width: isMobile ? "200px" : "260px",
                                    aspectRatio: "3/4", overflow: "hidden",
                                    marginBottom: "8px", background: "#f2f2f2",
                                }}>
                                    {product.imgs?.[0]?.src && (
                                        <img
                                            src={product.imgs[0].src}
                                            alt={product.imgs[0].alt || product.name}
                                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                        />
                                    )}
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                                    <p style={{ fontSize: "10px", margin: 0, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {product.name}
                                    </p>
                                    <p style={{ fontSize: "10px", color: "#888", margin: 0, flexShrink: 0 }}>
                                        {product.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Masaryk Community Gym ── */}
            <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                minHeight: isMobile ? "auto" : "600px",
            }}>
                <div style={{
                    position: "relative", display: "flex", flexDirection: "column",
                    justifyContent: "center", alignItems: "center", textAlign: "center",
                    borderTop: "1px solid #e8e8e8", borderBottom: "1px solid #e8e8e8",
                    padding: isMobile ? "40px 24px 60px" : "60px 48px 60px",
                    overflow: "hidden", order: isMobile ? 2 : 1,
                    minHeight: isMobile ? "300px" : "600px",
                }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <p style={{ fontSize: "13px", fontWeight: 400, margin: "0 0 32px", letterSpacing: "0.02em" }}>
                            Masaryk Community Gym
                        </p>
                        {!subscribed ? (
                            <div style={{
                                display: "flex", alignItems: "center",
                                borderBottom: "1px solid #1a1a1a", paddingBottom: "6px",
                                width: "100%", maxWidth: "460px",
                            }}>
                                <input
                                    type="email" placeholder="Enter your email"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        flex: 1, border: "none", outline: "none",
                                        fontSize: "11px", fontFamily: "inherit",
                                        background: "none", color: "#1a1a1a", textAlign: "left",
                                    }}
                                />
                                <button onClick={() => setSubscribed(true)} style={{
                                    background: "none", border: "none", cursor: "pointer",
                                    fontSize: "18px", color: "#1a1a1a", padding: "0 0 0 8px",
                                    lineHeight: 1, display: "flex", alignItems: "center",
                                }}>→</button>
                            </div>
                        ) : (
                            <p style={{ fontSize: "11px", color: "#555" }}>Thank you for subscribing!</p>
                        )}
                    </div>
                    {!subscribed && (
                        <p style={{
                            position: "absolute", bottom: "24px", left: 0, right: 0,
                            textAlign: "center", fontSize: "9px", letterSpacing: "0.12em",
                            textTransform: "uppercase", color: "#aaa", margin: 0,
                        }}>
                            Subscribe for updates
                        </p>
                    )}
                </div>
                <div style={{
                    position: "relative", overflow: "hidden", background: "#d8d8d8",
                    minHeight: isMobile ? "420px" : "600px", order: isMobile ? 1 : 2,
                }}>
                    <img src="/snny2.png" alt="Masaryk Community Gym" style={{
                        position: "absolute", top: 0, left: 0,
                        width: "100%", height: "100%", objectFit: "cover",
                        objectPosition: "center top", display: "block",
                    }} />
                </div>
            </div>

            {/* ── Weekly Calendar ── */}
            <div style={{ padding: isMobile ? "40px 12px 60px" : "60px 24px 80px", maxWidth: "760px", margin: "0 auto" }}>
                <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    border: "1px solid #e8e8e8", padding: "12px 16px", marginBottom: "2px",
                }}>
                    <button onClick={() => setWeekOffset(w => w - 1)} style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontSize: "16px", color: "#1a1a1a", padding: 0,
                    }}>‹</button>
                    <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                        {weekLabel}
                    </span>
                    <button onClick={() => setWeekOffset(w => w + 1)} style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontSize: "16px", color: "#1a1a1a", padding: 0,
                    }}>›</button>
                </div>

                <div style={{ overflowX: isMobile ? "auto" : "visible" }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "60px repeat(7, 1fr)",
                        minWidth: isMobile ? "560px" : "auto",
                    }}>
                        <div style={{ borderBottom: "1px solid #e8e8e8" }} />
                        {DAYS.map((day, i) => (
                            <div key={day} style={{
                                padding: "8px 4px", textAlign: "center",
                                borderBottom: "1px solid #e8e8e8", borderLeft: "1px solid #e8e8e8",
                            }}>
                                <p style={{ fontSize: "9px", letterSpacing: "0.08em", color: "#aaa", margin: "0 0 4px" }}>{day}</p>
                                <p style={{ fontSize: "11px", margin: 0 }}>{weekDates[i]}</p>
                            </div>
                        ))}
                        {TIME_SLOTS.map((time) => (
                            <>
                                <div key={`time-${time}`} style={{
                                    padding: "10px 8px 10px 0", fontSize: "9px", color: "#aaa",
                                    borderBottom: "1px solid #f5f5f5", textAlign: "right", letterSpacing: "0.04em",
                                }}>
                                    {time}
                                </div>
                                {DAYS.map((day, di) => {
                                    const slotKey = `${day}-${time}`
                                    const isSelected = selectedSlot === slotKey
                                    const isUnavailable =
                                        (di === 2 || di === 3 || di === 5) &&
                                        (time === "3 PM" || time === "10 AM")
                                    return (
                                        <div key={slotKey} style={{
                                            borderBottom: "1px solid #f5f5f5", borderLeft: "1px solid #f5f5f5",
                                            minHeight: "32px", position: "relative",
                                        }}>
                                            {isUnavailable && (
                                                <div
                                                    onClick={() => setSelectedSlot(isSelected ? null : slotKey)}
                                                    style={{
                                                        position: "absolute", inset: "2px",
                                                        background: isSelected ? "#1a1a1a" : "#f5f5f5",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        fontSize: "8px", letterSpacing: "0.06em",
                                                        textTransform: "uppercase",
                                                        color: isSelected ? "#fff" : "#aaa", cursor: "pointer",
                                                    }}
                                                >
                                                    Unavailable
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </>
                        ))}
                    </div>
                </div>

                <div style={{ textAlign: "center", marginTop: "32px" }}>
                    {!selectedSlot && (
                        <p style={{ fontSize: "9px", color: "#c00", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 12px" }}>
                            Please select an event
                        </p>
                    )}
                    {!isSignedIn ? (
                        <button onClick={onProfileOpen} style={{
                            background: "#1a1a1a", color: "#fff", border: "none", cursor: "pointer",
                            padding: "16px 48px", fontSize: "10px", letterSpacing: "0.12em",
                            textTransform: "uppercase", fontFamily: "inherit",
                        }}>
                            Sign In to Book
                        </button>
                    ) : (
                        <button
                            onClick={() => selectedSlot && setBookingOpen(true)}
                            style={{
                                background: "#1a1a1a", color: "#fff", border: "none", cursor: "pointer",
                                padding: "16px 48px", fontSize: "10px", letterSpacing: "0.12em",
                                textTransform: "uppercase", fontFamily: "inherit",
                            }}
                        >
                            Book For Myself
                        </button>
                    )}
                </div>
            </div>

            {/* ── Booking modal ── */}
            {bookingOpen && (
                <div style={{
                    position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
                    zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <div style={{
                        background: "#fff", padding: "40px",
                        maxWidth: "400px", width: "100%", fontFamily: "inherit",
                    }}>
                        <h2 style={{ fontSize: "13px", fontWeight: 400, margin: "0 0 24px", letterSpacing: "0.02em" }}>
                            Confirm Your Reservation
                        </h2>
                        <p style={{ fontSize: "11px", color: "#555", margin: "0 0 8px", fontWeight: 600 }}>Location</p>
                        <p style={{ fontSize: "11px", color: "#555", margin: "0 0 24px", lineHeight: 1.7 }}>
                            Masaryk Community Gym<br />
                            69 Columbia Street, New York, NY 10002
                        </p>
                        <button onClick={() => setBookingOpen(false)} style={{
                            width: "100%", padding: "14px", background: "#1a1a1a", color: "#fff",
                            border: "none", cursor: "pointer", fontSize: "10px",
                            letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit",
                        }}>
                            Confirm Reservation
                        </button>
                        <button onClick={() => setBookingOpen(false)} style={{
                            width: "100%", padding: "14px", background: "none", color: "#1a1a1a",
                            border: "none", cursor: "pointer", fontSize: "10px",
                            letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "inherit",
                            marginTop: "8px",
                        }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* ── Product Detail ── */}
            <ProductDetail
                isOpen={productDetailOpen}
                product={selectedProduct}
                onClose={() => { setProductDetailOpen(false); setSelectedProduct(null) }}
                onCheckout={() => { setProductDetailOpen(false); setSelectedProduct(null) }}
                onViewCart={() => { setProductDetailOpen(false); setSelectedProduct(null) }}
            />
        </div>

        {rvPanelOpen && rvPanelItem && (
            <RecentlyViewedPanel
                item={rvPanelItem}
                onClose={() => { setRvPanelOpen(false); setRvPanelItem(null) }}
                onFullDetails={(item) => {
                    setRvPanelOpen(false)
                    setRvPanelItem(null)
                    openRvFullDetails(item)
                }}
            />
        )}
        </>
    )
}
