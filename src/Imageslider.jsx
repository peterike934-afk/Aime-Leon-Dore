import { useState, useRef } from "react"

/**
 * useImageSlider — portable slider logic extracted from ProductCard.
 * Works for any array of images (or a single image).
 *
 * Returns { current, handlers, SliderDots }
 *   - current      : active index
 *   - handlers     : spread onto the image-wrapper div
 *   - SliderDots   : tiny dot indicator component (renders null if total < 2)
 */
export function useImageSlider(images = []) {
    const total = images.length
    const [current, setCurrent] = useState(0)
    const containerRef  = useRef(null)
    const touchStartX   = useRef(null)
    const touchStartY   = useRef(null)
    const isSwiping     = useRef(false)

    /* ── Desktop: hover to slide ── */
    const handleMouseMove = (e) => {
        if (total < 2) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const newIndex = Math.min(Math.floor(x / (rect.width / total)), total - 1)
        setCurrent(newIndex)
    }
    const handleMouseLeave = () => setCurrent(0)

    /* ── Mobile: swipe to slide ── */
    const handleTouchStart = (e) => {
        if (total < 2) return
        touchStartX.current = e.touches[0].clientX
        touchStartY.current = e.touches[0].clientY
        isSwiping.current   = false
    }

    const handleTouchMove = (e) => {
        if (total < 2 || touchStartX.current === null) return
        const dx = e.touches[0].clientX - touchStartX.current
        const dy = e.touches[0].clientY - touchStartY.current
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
            isSwiping.current = true
            e.stopPropagation()
        }
    }

    const handleTouchEnd = (e) => {
        if (total < 2 || touchStartX.current === null) return
        const dx = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(dx) > 30) {
            isSwiping.current = true
            setCurrent(prev =>
                dx < 0 ? Math.min(prev + 1, total - 1) : Math.max(prev - 1, 0)
            )
        }
        touchStartX.current = null
        touchStartY.current = null
        setTimeout(() => { isSwiping.current = false }, 10)
    }

    const handlers = {
        ref: containerRef,
        onMouseMove:  handleMouseMove,
        onMouseLeave: handleMouseLeave,
        onTouchStart: handleTouchStart,
        onTouchMove:  handleTouchMove,
        onTouchEnd:   handleTouchEnd,
    }

    return { current, isSwiping, handlers }
}

/**
 * SliderImage — drop-in replacement for a plain <img> inside a product card.
 *
 * Props:
 *   images   : array of { src, alt } objects  (required)
 *   style    : extra styles for the outer wrapper div
 *   imgStyle : extra styles for every <img>
 *   className: applied to the outer wrapper div
 */
export function SliderImage({ images = [], style = {}, imgStyle = {}, className = "" }) {
    const { current, handlers } = useImageSlider(images)
    const total = images.length

    return (
        <div
            {...handlers}
            className={className}
            style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%", ...style }}
        >
            {/* sliding track */}
            <div style={{
                display: "flex",
                width: `${total * 100}%`,
                height: "100%",
                transform: `translateX(-${(current / total) * 100}%)`,
                transition: "transform 0.25s ease",
            }}>
              {images.map((img, i) => (
    img.src ? (
        <img
            key={i}
            src={img.src ?? img}
            alt={img.alt ?? ""}
            draggable={false}
            style={{
                width: `${100 / total}%`,
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
                flexShrink: 0,
                ...imgStyle,
            }}
        />
    ) : (
        <div
            key={i}
            style={{
                width: `${100 / total}%`,
                height: "100%",
                flexShrink: 0,
                background: "#f2f2f2",
            }}
        />
    )
))}
            </div>

            {/* dots */}
            {total > 1 && (
                <div style={{
                    position: "absolute",
                    bottom: "8px",
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    gap: "4px",
                    pointerEvents: "none",
                }}>
                    {images.map((_, i) => (
                        <span key={i} style={{
                            width:  "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: i === current ? "#1a1a1a" : "rgba(0,0,0,0.25)",
                            display: "block",
                            transition: "background 0.2s",
                        }} />
                    ))}
                </div>
            )}
        </div>
    )
}
