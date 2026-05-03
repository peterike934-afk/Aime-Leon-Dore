import { useState, useEffect } from "react"
import { useCart } from "./CartContext.jsx"
import { useCurrency } from "../useCurrency.jsx"

// ─────────────────────────────────────────────
// MOBILE HOOK
// ─────────────────────────────────────────────
function useIsMobile(breakpoint = 900) {
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
    )
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth <= breakpoint)
        window.addEventListener("resize", handler)
        return () => window.removeEventListener("resize", handler)
    }, [breakpoint])
    return isMobile
}

// ─────────────────────────────────────────────
// SINGLE PRODUCT IMAGE
// ─────────────────────────────────────────────
function ProductImage({ imgs, aspectRatio = "3/4" }) {
    const img = imgs?.[0]
    if (!img) return null

    return (
        <div style={{
            background: "#f2f2f2",
            aspectRatio,
            overflow: "hidden",
            flexShrink: 0,
        }}>
            <img
                src={img.src}
                alt={img.alt || ""}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                }}
            />
        </div>
    )
}

// ─────────────────────────────────────────────
// PRODUCT ACTIONS
// ─────────────────────────────────────────────
function ProductActions({ item, onFullDetails, onClose, selectedColor, setSelectedColor, productColors }) {
    const { addToCart } = useCart()
    const { convert } = useCurrency()
    const [selectedSize, setSelectedSize] = useState("")
    const [added, setAdded] = useState(false)
    const [sizeOpen, setSizeOpen] = useState(false)
    const isMobile = useIsMobile()

    const isSoldOut = item.price === "$0" || String(item.price).toLowerCase() === "sold out"

    const handleAdd = () => {
        addToCart({
            ...item,
            selectedColor: selectedColor?.name ?? null,
            selectedSize: selectedSize || null,
        })
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    const handleFullDetails = () => {
        onClose()
        onFullDetails(item)
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            padding: "20px 16px 32px",
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        }}>

            {/* Name */}
            <p style={{ fontSize: "13px", fontWeight: 400, margin: 0, lineHeight: 1.4, color: "#1a1a1a" }}>
                {item.name}
            </p>

            {/* Price */}
            <p style={{ fontSize: "13px", margin: 0, color: "#1a1a1a" }}>
                {isSoldOut ? "Sold Out" : convert(item.price)}
            </p>

            {/* ── DESKTOP ── */}
            {!isMobile && (
                <>
                    {/* Color swatches — only if product has colors */}
                    {productColors.length > 0 && (
                        <div>
                            <p style={{
                                fontSize: "11px",
                                letterSpacing: "0.06em",
                                color: "#1a1a1a",
                                marginBottom: "8px",
                                margin: "0 0 8px 0",
                            }}>
                                Color: {selectedColor?.name}
                            </p>
                            <div style={{ display: "flex", gap: "6px" }}>
                                {productColors.map(c => (
                                    <div
                                        key={c.name}
                                        onClick={() => setSelectedColor(c)}
                                        title={c.name}
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                            background: c.hex,
                                            border: selectedColor?.name === c.name
                                                ? "2px solid #1a1a1a"
                                                : "1px solid rgba(0,0,0,0.15)",
                                            cursor: "pointer",
                                            outline: selectedColor?.name === c.name
                                                ? "1px solid #fff"
                                                : "none",
                                            outlineOffset: "-3px",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Size dropdown */}
                    <div style={{ position: "relative" }}>
                        <button
                            onClick={() => setSizeOpen(o => !o)}
                            style={{
                                width: "100%",
                                padding: "14px 16px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                border: "1px solid #d0d0d0",
                                background: "#fff",
                                fontSize: "11px",
                                letterSpacing: "0.06em",
                                color: "#1a1a1a",
                                fontFamily: "inherit",
                                cursor: "pointer",
                            }}
                        >
                            <span>{selectedSize || "Select Size"}</span>
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                <path d="M1 1l5 5 5-5" stroke="#1a1a1a" strokeWidth="1.2"/>
                            </svg>
                        </button>

                        {sizeOpen && (
                            <div style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                background: "#fff",
                                border: "1px solid #d0d0d0",
                                borderTop: "none",
                                zIndex: 10,
                            }}>
                                {["XS", "S", "M", "L", "XL"].map(s => (
                                    <div
                                        key={s}
                                        onClick={() => { setSelectedSize(s); setSizeOpen(false) }}
                                        style={{
                                            padding: "12px 16px",
                                            fontSize: "11px",
                                            letterSpacing: "0.06em",
                                            cursor: "pointer",
                                            color: "#1a1a1a",
                                            background: selectedSize === s ? "#f2f2f2" : "#fff",
                                            borderBottom: "1px solid #f0f0f0",
                                        }}
                                    >
                                        {s}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* ── MOBILE: side-by-side selects ── */}
            {isMobile && (
                <div style={{ display: "flex", gap: "8px" }}>

                    {/* Color select — only if product has colors */}
                    {productColors.length > 0 && (
                        <div style={{ flex: 1, position: "relative" }}>
                            <select
                                value={selectedColor?.name ?? ""}
                                onChange={e =>
                                    setSelectedColor(productColors.find(c => c.name === e.target.value))
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px 32px 12px 12px",
                                    border: "1px solid #d0d0d0",
                                    background: "#fff",
                                    fontSize: "11px",
                                    letterSpacing: "0.05em",
                                    color: "#1a1a1a",
                                    fontFamily: "inherit",
                                    cursor: "pointer",
                                    appearance: "none",
                                    WebkitAppearance: "none",
                                }}
                            >
                                {productColors.map(c => (
                                    <option key={c.name} value={c.name}>
                                        {c.name.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                            <svg style={{
                                position: "absolute", right: "10px", top: "50%",
                                transform: "translateY(-50%)", pointerEvents: "none",
                            }} width="10" height="7" viewBox="0 0 12 8" fill="none">
                                <path d="M1 1l5 5 5-5" stroke="#1a1a1a" strokeWidth="1.2"/>
                            </svg>
                        </div>
                    )}

                    {/* Size select */}
                    <div style={{ flex: 1, position: "relative" }}>
                        <select
                            value={selectedSize}
                            onChange={e => setSelectedSize(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px 32px 12px 12px",
                                border: "1px solid #d0d0d0",
                                background: "#fff",
                                fontSize: "11px",
                                letterSpacing: "0.05em",
                                color: "#1a1a1a",
                                fontFamily: "inherit",
                                cursor: "pointer",
                                appearance: "none",
                                WebkitAppearance: "none",
                            }}
                        >
                            <option value="">Select Size</option>
                            {["XS", "S", "M", "L", "XL"].map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <svg style={{
                            position: "absolute", right: "10px", top: "50%",
                            transform: "translateY(-50%)", pointerEvents: "none",
                        }} width="10" height="7" viewBox="0 0 12 8" fill="none">
                            <path d="M1 1l5 5 5-5" stroke="#1a1a1a" strokeWidth="1.2"/>
                        </svg>
                    </div>
                </div>
            )}

            {/* CTA */}
            {isSoldOut ? (
                <button style={{
                    width: "100%",
                    padding: "16px",
                    background: "#1a1a1a",
                    color: "#fff",
                    border: "none",
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: "inherit",
                    cursor: "pointer",
                }}>
                    Notify Me
                </button>
            ) : (
                <button
                    onClick={handleAdd}
                    style={{
                        width: "100%",
                        padding: "16px",
                        background: added ? "#3a7a3a" : "#1a1a1a",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "11px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        fontFamily: "inherit",
                        transition: "background 0.2s",
                    }}
                >
                    {added ? "Added ✓" : "Add to Bag"}
                </button>
            )}

            {/* Full Details */}
            <button
                onClick={handleFullDetails}
                style={{
                    width: "100%",
                    padding: "14px",
                    background: "none",
                    color: "#1a1a1a",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: "inherit",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                }}
            >
                Full Details
            </button>
        </div>
    )
}

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────
export default function RecentlyViewedPanel({ item, onClose, onFullDetails }) {
    const isMobile = useIsMobile()

    const productColors = item?.colors?.length ? item.colors : []

    const [selectedColor, setSelectedColor] = useState(() => {
        if (!productColors.length) return null
        // match the color that was active when this item was viewed
        const match = productColors.find(c => c.name === item.selectedColor)
        return match ?? productColors[0]
    })

    // Reset to the correct color whenever the item changes
    useEffect(() => {
        const colors = item?.colors?.length ? item.colors : []
        if (!colors.length) {
            setSelectedColor(null)
            return
        }
        const match = colors.find(c => c.name === item.selectedColor)
        setSelectedColor(match ?? colors[0])
    }, [item?.id])

    if (!item) return null

    // Use the selected color's imgs if available, else fall back to item.imgs
    const activeImgs = selectedColor?.imgs?.length ? selectedColor.imgs : item.imgs

    // ── DESKTOP ──────────────────────────────────────────────────
    if (!isMobile) {
        return (
            <>
                <style>{`
                    @keyframes rv-slide-in {
                        from { transform: translateX(100%); opacity: 0; }
                        to   { transform: translateX(0);    opacity: 1; }
                    }
                `}</style>

                {/* Backdrop */}
                <div
                    onClick={onClose}
                    style={{
                        position: "fixed", top: "52px", left: 0, right: 0, bottom: 0,
                        background: "rgba(0,0,0,0.25)", zIndex: 7600,
                    }}
                />

                {/* Panel */}
                <div style={{
                    position: "fixed", top: "52px", right: 0, bottom: 0,
                    width: "420px", background: "#fff", zIndex: 7700,
                    display: "flex", flexDirection: "column",
                    boxShadow: "-4px 0 32px rgba(0,0,0,0.1)",
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    animation: "rv-slide-in 0.38s cubic-bezier(0.16,1,0.3,1) both",
                    willChange: "transform", overflow: "hidden",
                }}>
                    {/* Close */}
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "flex-end",
                        height: "52px", padding: "0 20px", flexShrink: 0, background: "#fff",
                    }}>
                        <button
                            onClick={onClose}
                            style={{
                                background: "none", border: "none", cursor: "pointer",
                                color: "#1a1a1a", padding: "4px",
                                display: "flex", alignItems: "center",
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.2"/>
                                <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.2"/>
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
                        <ProductImage imgs={activeImgs} aspectRatio="3/4" />
                        <ProductActions
                            item={item}
                            onClose={onClose}
                            onFullDetails={onFullDetails}
                            selectedColor={selectedColor}
                            setSelectedColor={setSelectedColor}
                            productColors={productColors}
                        />
                    </div>
                </div>
            </>
        )
    }

    // ── MOBILE ───────────────────────────────────────────────────
    return (
        <>
            <style>{`
                @keyframes rv-slide-up {
                    from { transform: translateY(100%); }
                    to   { transform: translateY(0); }
                }
            `}</style>

            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed", top: "52px", left: 0, right: 0, bottom: 0,
                    background: "rgba(0,0,0,0.4)", zIndex: 7600,
                }}
            />

            {/* Bottom sheet */}
            <div style={{
                position: "fixed", top: "52px", left: 0, right: 0, bottom: 0,
                background: "#fff", zIndex: 7700,
                display: "flex", flexDirection: "column",
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                animation: "rv-slide-up 0.38s cubic-bezier(0.16,1,0.3,1) both",
                willChange: "transform",
                paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}>
                {/* Close */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "flex-end",
                    height: "44px", padding: "0 16px",
                    borderBottom: "1px solid #e8e8e8",
                    flexShrink: 0, background: "#fff",
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: "none", border: "none", cursor: "pointer",
                            color: "#1a1a1a", padding: "4px",
                            display: "flex", alignItems: "center",
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.2"/>
                            <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.2"/>
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div style={{
                    flex: 1, overflowY: "auto", overflowX: "hidden",
                    WebkitOverflowScrolling: "touch",
                }}>
                    <ProductImage imgs={activeImgs} aspectRatio="1/1" />
                    <ProductActions
                        item={item}
                        onClose={onClose}
                        onFullDetails={onFullDetails}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                        productColors={productColors}
                    />
                </div>
            </div>
        </>
    )
}