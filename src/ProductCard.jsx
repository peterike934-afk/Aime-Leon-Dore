import { useState, useRef } from "react";
import "./ProductCard.css";
import { useCart } from "./Components/CartContext";
import { useCurrency } from "./useCurrency";

export default function ProductCard(props) {
    const { addToCart, addToRecentlyViewed } = useCart();
    const { convert } = useCurrency();
    const [current, setCurrent] = useState(0);
    const imageRef = useRef(null);
    const touchStartX = useRef(null);
    const touchStartY = useRef(null);
    const isSwiping = useRef(false);

    const images = props.imgs ?? [props.img];
    const total = images.length;

    const handleCardClick = () => {
        if (isSwiping.current) return; // don't open detail if user was swiping
        addToRecentlyViewed(props);
        props.onClick(props);
    };

    const handleAddToBag = (e) => {
        e.stopPropagation();
        addToCart(props);
        props.onAddToBag?.();
    };

    /* ── Desktop: mouse hover to slide ── */
    const handleMouseMove = (e) => {
        if (total < 2) return;
        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const segmentWidth = rect.width / total;
        const newIndex = Math.min(Math.floor(x / segmentWidth), total - 1);
        setCurrent(newIndex);
    };

    const handleMouseLeave = () => setCurrent(0);

    /* ── Mobile: touch swipe to slide ── */
    const handleTouchStart = (e) => {
        if (total < 2) return;
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        isSwiping.current = false;
    };

    const handleTouchMove = (e) => {
        if (total < 2 || touchStartX.current === null) return;
        const dx = e.touches[0].clientX - touchStartX.current;
        const dy = e.touches[0].clientY - touchStartY.current;

        // Only treat as horizontal swipe if mostly horizontal
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
            isSwiping.current = true;
            e.stopPropagation(); // prevent card click
        }
    };

    const handleTouchEnd = (e) => {
        if (total < 2 || touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;

        if (Math.abs(dx) > 30) {
            isSwiping.current = true;
            if (dx < 0) {
                // swipe left → next
                setCurrent(prev => Math.min(prev + 1, total - 1));
            } else {
                // swipe right → prev
                setCurrent(prev => Math.max(prev - 1, 0));
            }
        }

        touchStartX.current = null;
        touchStartY.current = null;

        // Reset flag after a tick so the click handler can check it
        setTimeout(() => { isSwiping.current = false; }, 10);
    };

   

    return (
    
    <div className={`product-card${props.compact ? " product-card--compact" : ""}`} onClick={handleCardClick}>

            {/* ── Image ── */}
            <div
                className="product-image"
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="slider-track"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img.src ?? img}
                            alt={img.alt ?? props.name}
                            className="slide-img"
                            draggable={false}
                        />
                    ))}
                </div>

                {total > 1 && (
                    <div className="slider-dots">
                        {images.map((_, i) => (
                            <span
                                key={i}
                                className={`dot${i === current ? " active" : ""}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* ── Info ── */}
            <div className="product-info">
                <div className="product-info-left">
                    <p className="product-name">{props.name}</p>
                </div>
                <p className={`product-price${props.soldOut ? " sold-out" : ""}`}>
                    {props.soldOut ? "Sold Out" : convert(props.price)}
                </p>
            </div>

        </div>
    );
}
