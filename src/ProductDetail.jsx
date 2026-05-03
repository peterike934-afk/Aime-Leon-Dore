import React from "react";
import { useCart } from "./Components/CartContext";
import "./ProductDetail.css";
import Product from "./product";
import { useCurrency } from "./useCurrency";
import RecentlyViewedPanel from "./Components/Recentlyview.jsx";

// ─── Constants ───────────────────────────────────────────────────────────────

const SIZING_DATA = {
    CM: {
        headers: ["US MEN", "US WOMEN", "LENGTH (CM)"],
        rows: [
            ["7",    "8.5",  "24.99"],
            ["7.5",  "9",    "25.40"],
            ["8",    "9.5",  "25.91"],
            ["8.5",  "10",   "26.42"],
            ["9",    "10.5", "26.92"],
            ["9.5",  "11",   "27.43"],
            ["10",   "11.5", "27.94"],
            ["10.5", "12",   "28.45"],
            ["11",   "12.5", "28.96"],
            ["11.5", "13",   "29.46"],
            ["12",   "13.5", "29.97"],
            ["13",   "14.5", "30.99"],
        ],
    },
    IN: {
        headers: ["US MEN", "US WOMEN", "LENGTH (IN)"],
        rows: [
            ["7",    "8.5",  "9.84"],
            ["7.5",  "9",    "10"],
            ["8",    "9.5",  "10.2"],
            ["8.5",  "10",   "10.4"],
            ["9",    "10.5", "10.6"],
            ["9.5",  "11",   "10.8"],
            ["10",   "11.5", "11"],
            ["10.5", "12",   "11.2"],
            ["11",   "12.5", "11.4"],
            ["11.5", "13",   "11.6"],
            ["12",   "13.5", "11.8"],
            ["13",   "14.5", "12.2"],
        ],
    },
    INTL: {
        headers: ["ALD (US)", "US WOMEN'S", "UK", "EU"],
        rows: [
            ["4",    "5.5",  "3",    "36.5"],
            ["5",    "6.5",  "4",    "37.5"],
            ["6",    "7.5",  "5",    "38.5"],
            ["7",    "8.5",  "6",    "39.5"],
            ["7.5",  "9",    "6.5",  "40"],
            ["8",    "9.5",  "7",    "40.5"],
            ["8.5",  "10",   "7.5",  "41"],
            ["9",    "10.5", "8",    "41.5"],
            ["9.5",  "11",   "8.5",  "42"],
            ["10",   "11.5", "9",    "42.5"],
            ["10.5", "12",   "9.5",  "43"],
            ["11",   "12.5", "10",   "43.5"],
            ["11.5", "13",   "10.5", "44"],
        ],
    },
};

// ─── Sizing Table ─────────────────────────────────────────────────────────────

function SizingTable() {
    const [activeTab, setActiveTab] = React.useState("CM");
    const data = SIZING_DATA[activeTab];

    return (
        <div>
            <p style={{ fontSize: "11px", color: "#444", lineHeight: 1.7, marginBottom: "10px" }}>
                Fits true to size. Order your normal size. Follows standard US mens sizing.
            </p>
            <p style={{ fontSize: "11px", color: "#444", lineHeight: 1.7, marginBottom: "14px" }}>
                Item-specific measurements are listed in inches and centimeters.
            </p>
            <div style={{ display: "flex", marginBottom: "16px" }}>
                {["CM", "IN", "INTL"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            flex: 1,
                            padding: "8px 0",
                            fontSize: "10px",
                            letterSpacing: "0.08em",
                            fontFamily: "inherit",
                            cursor: "pointer",
                            background: "#fff",
                            color: "#1a1a1a",
                            border: activeTab === tab ? "1px solid #1a1a1a" : "1px solid #d0d0d0",
                            fontWeight: activeTab === tab ? 500 : 400,
                            transition: "border-color 0.15s",
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div style={{ maxHeight: "220px", overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
                    <thead>
                        <tr>
                            {data.headers.map((h) => (
                                <th
                                    key={h}
                                    style={{
                                        textAlign: "left",
                                        padding: "8px 6px",
                                        fontWeight: 400,
                                        letterSpacing: "0.04em",
                                        color: "#1a1a1a",
                                        borderBottom: "1px solid #e0e0e0",
                                        fontSize: "10px",
                                    }}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.rows.map((row, i) => (
                            <tr
                                key={i}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                                {row.map((cell, j) => (
                                    <td
                                        key={j}
                                        style={{
                                            padding: "9px 6px",
                                            borderBottom: "1px solid #eeeeee",
                                            color: "#1a1a1a",
                                            fontSize: "11px",
                                        }}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── Accordions (defined outside ProductDetail so state is never reset on re-render) ───

function Accordions({ isLearnMore, activeDetails, product, selectedPendant, handleShopTheLookClick }) {
    const [detailsOpen, setDetailsOpen]   = React.useState(false);
    const [sizingOpen, setSizingOpen]     = React.useState(false);
    const [shopLookOpen, setShopLookOpen] = React.useState(false);
    const [deliveryOpen, setDeliveryOpen] = React.useState(false);

    return (
        <>
            <div className="pd-accordion">
                <button className="pd-accordion__btn" onClick={() => setDetailsOpen(!detailsOpen)}>
                    <span>Product Details</span>
                    <span className="pd-accordion__chevron">{detailsOpen ? "∧" : "∨"}</span>
                </button>
                {detailsOpen && (
                    <div className="pd-accordion__body">
                        <ul>
                            {activeDetails?.length > 0
                                ? activeDetails.map((d, i) => <li key={i}>{d}</li>)
                                : <li>No details available.</li>}
                        </ul>
                    </div>
                )}
            </div>

            {!isLearnMore && (
                <div className="pd-accordion">
                    <button className="pd-accordion__btn" onClick={() => setSizingOpen(!sizingOpen)}>
                        <span>Sizing</span>
                        <span className="pd-accordion__chevron">{sizingOpen ? "∧" : "∨"}</span>
                    </button>
                    {sizingOpen && (
                        <div className="pd-accordion__body">
                            {product.chainSelector && selectedPendant?.sizing?.length ? (
                                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    {selectedPendant.sizing.map((s, i) => (
                                        <li key={i} style={{ fontSize: "11px", color: "#444", lineHeight: 1.8 }}>{s}</li>
                                    ))}
                                </ul>
                            ) : (
                                <SizingTable />
                            )}
                        </div>
                    )}
                </div>
            )}

            {product.shopTheLook?.length > 0 && (
                <div className="pd-accordion">
                    <button className="pd-accordion__btn" onClick={() => setShopLookOpen(!shopLookOpen)}>
                        <span>Shop the Look</span>
                        <span className="pd-accordion__chevron">{shopLookOpen ? "∧" : "∨"}</span>
                    </button>
                    {shopLookOpen && (
                        <div className="pd-accordion__body">
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                {product.shopTheLook.map((item) => (
                                    <div key={item.id} style={{ width: "120px", cursor: "pointer" }} onClick={() => handleShopTheLookClick(item)}>
                                        <div style={{ width: "120px", aspectRatio: "3/4", background: "#f2f2f2", overflow: "hidden", marginBottom: "8px" }}>
                                            {item.src && <img src={item.src} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                                        </div>
                                        <p style={{ fontSize: "10px", color: "#1a1a1a", margin: "0 0 2px" }}>{item.name}</p>
                                        <p style={{ fontSize: "10px", color: "#888", margin: 0 }}>{item.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="pd-accordion">
                <button className="pd-accordion__btn" onClick={() => setDeliveryOpen(!deliveryOpen)}>
                    <span>Delivery and Returns</span>
                    <span className="pd-accordion__chevron">{deliveryOpen ? "∧" : "∨"}</span>
                </button>
                {deliveryOpen && (
                    <div className="pd-accordion__body">
                        <p>Orders are processed within five business days. For full details, please refer to our <a href="#" className="pd-link">Shipping Policy</a>.</p>
                        <p style={{ marginTop: 10 }}>Standard delivery and return policies do not apply to made-to-order products or items marked as final sale.</p>
                    </div>
                )}
            </div>
        </>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductDetail({ isOpen, product, onClose, onCheckout, onViewCart, onNavigate }) {
    const {
        addToCart,
        recentlyViewed,
        cartItems,
        removeFromCart,
        updateQuantity,
        subtotal,
        addToRecentlyViewed,
    } = useCart();
    const { convert } = useCurrency();

    // Derived product colors — empty array if product has none
    const productColors = product?.colors?.length ? product.colors : [];

    // ─── State ──────────────────────────────────────────────────────────────
    const [added, setAdded]                     = React.useState(false);
    const [selectedColor, setSelectedColor]     = React.useState(productColors[0] ?? null);
    const [selectedSize, setSelectedSize]       = React.useState("");
    const [selectedChain, setSelectedChain]     = React.useState(null);
    const [selectedPendant, setSelectedPendant] = React.useState(null);
    const [cartOpen, setCartOpen]               = React.useState(false);
    const [notifyEmail, setNotifyEmail]         = React.useState("");
    const [notifySize, setNotifySize]           = React.useState("One Size");
    const [notifyChecked, setNotifyChecked]     = React.useState(false);
    const [notifySubmitted, setNotifySubmitted] = React.useState(false);
    const [lastAdded, setLastAdded]             = React.useState(null);
    const [rvPanelItem, setRvPanelItem]         = React.useState(null);
    const [rvPanelOpen, setRvPanelOpen]         = React.useState(false);

    // ─── Refs ────────────────────────────────────────────────────────────────
    const scrollRef  = React.useRef(null);
    const overlayRef = React.useRef(null);
    const imageRefs  = React.useRef([]);

    // ─── Helpers ─────────────────────────────────────────────────────────────
    const resetScroll = React.useCallback(() => {
        if (overlayRef.current) overlayRef.current.scrollTop = 0;
        if (scrollRef.current)  scrollRef.current.scrollTop  = 0;
    }, []);

    // ─── Effects ─────────────────────────────────────────────────────────────

    // Reset scroll when product/panel opens
    React.useEffect(() => { resetScroll(); }, [product?.id, isOpen]);

    // Track recently viewed — updates when product, pendant, or color changes
    React.useEffect(() => {
        if (!isOpen || !product) return;

        let viewed;

        if (product.chainSelector && selectedPendant) {
            viewed = {
                ...product,
                id: `${product.id}-pendant-${selectedPendant.id}`,
                name: selectedPendant.name || selectedPendant.alt || product.name,
                price: selectedPendant.price != null ? selectedPendant.price : product.price,
                imgs: selectedPendant.views?.length
                    ? selectedPendant.views
                    : [{ src: selectedPendant.src, alt: selectedPendant.alt }],
            };
        } else if (selectedColor?.imgs?.length) {
            // Use the selected color's images and tag the id so each color is tracked separately
            viewed = {
                ...product,
                id: `${product.id}-${selectedColor.name.toLowerCase().replace(/\s+/g, "-")}`,
                imgs: selectedColor.imgs,
                selectedColor: selectedColor.name,
            };
        } else {
            viewed = product;
        }

        addToRecentlyViewed(viewed);
    }, [isOpen, product?.id, selectedPendant?.id, selectedColor?.name]);

    // Reset selections when product changes
    React.useEffect(() => {
        setSelectedChain(product?.chains?.[0] ?? null);
        setSelectedPendant(null);
        setSelectedColor(product?.colors?.[0] ?? null);
    }, [product?.id]);

    // Lock overlay scroll when cart drawer is open
    React.useEffect(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;
        overlay.style.overflow = cartOpen ? "hidden" : "";
        return () => { overlay.style.overflow = ""; };
    }, [cartOpen]);

    // Listen for rv-full-details events
    React.useEffect(() => {
        const handler = () => {
            setRvPanelOpen(false);
            setRvPanelItem(null);
        };
        window.addEventListener("rv-full-details", handler);
        return () => window.removeEventListener("rv-full-details", handler);
    }, []);

    // ─── Early return ────────────────────────────────────────────────────────
    if (!isOpen || !product) return null;

    // ─── Derived values ──────────────────────────────────────────────────────
    const isLearnMore = product.learnMore === true;

    const isSoldOut =
        product.isSoldOut ||
        product.price === "$0" ||
        String(product.price).toLowerCase() === "sold out";

    const centerImages =
        product.chainSelector && selectedPendant?.views?.length
            ? selectedPendant.views
            : selectedColor?.imgs?.length
            ? selectedColor.imgs
            : product.imgs;

    const activeDetails =
        product.chainSelector && selectedPendant?.details?.length
            ? selectedPendant.details
            : product.details;

    const activeChains =
        product.chainSelector && selectedPendant?.chains?.length
            ? selectedPendant.chains
            : product.chains;

    const activeName =
        product.chainSelector && selectedPendant?.name
            ? selectedPendant.name
            : product.name;

    const activePrice =
        product.chainSelector && selectedPendant?.price != null
            ? selectedPendant.price
            : product.price;

    const youMayAlsoLike = Product.filter((p) => p.id !== product.id).slice(0, 8);

    // ─── Handlers ────────────────────────────────────────────────────────────

    const handleAddToBag = () => {
        let cartItem;

        if (product.chainSelector && selectedPendant) {
            // Pendant/chain product
            cartItem = {
                ...product,
                id: `${product.id}-pendant-${selectedPendant.id}`,
                name: selectedPendant.name || selectedPendant.alt || product.name,
                price: selectedPendant.price != null ? selectedPendant.price : product.price,
                imgs: selectedPendant.views?.length
                    ? selectedPendant.views
                    : [{ src: selectedPendant.src, alt: selectedPendant.alt }],
                selectedChain: selectedChain?.label ?? null,
            };
        } else if (selectedColor) {
            // Color variant — use the selected color's images and name if available
            cartItem = {
                ...product,
                id: `${product.id}-${selectedColor.name.toLowerCase().replace(/\s+/g, "-")}`,
                imgs: selectedColor.imgs?.length ? selectedColor.imgs : product.imgs,
                selectedColor: selectedColor.name,
                selectedSize: selectedSize || null,
            };
        } else {
            // No color — plain product
            cartItem = {
                ...product,
                selectedSize: selectedSize || null,
            };
        }

        addToCart(cartItem);
        setLastAdded(cartItem);
        setCartOpen(true);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleLearnMore = () => {
        onClose();
        onNavigate("news", 2);
    };

    const handleNotifySubmit = () => {
        if (notifyEmail) setNotifySubmitted(true);
    };

    const handleRvClick = (item) => {
        setRvPanelItem(item);
        setRvPanelOpen(true);
    };

    const handleShopTheLookClick = (item) => {
        const fullProduct = Product.find((p) => p.id === item.id);
        setRvPanelItem(
            fullProduct || {
                id: item.id,
                name: item.name,
                price: item.price,
                imgs: [{ src: item.src, alt: item.name }],
            }
        );
        setRvPanelOpen(true);
    };

    const handleRvFullDetails = (item) => {
        setRvPanelOpen(false);
        setRvPanelItem(null);
        resetScroll();
        setTimeout(() => {
            resetScroll();
            window.dispatchEvent(new CustomEvent("rv-full-details", { detail: item }));
        }, 50);
    };

    const handlePendantClick = (p) => {
        setSelectedPendant(p);
        setSelectedChain(p.chains?.[0] ?? product.chains?.[0] ?? null);
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
    };

    // ─── Sub-components ──────────────────────────────────────────────────────


    // ─── Desktop Right Panel ─────────────────────────────────────────────────

    const DesktopRight = () => {
        if (isLearnMore) {
            return (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <p style={{ fontSize: "11px", color: "#1a1a1a", lineHeight: 1.7, margin: 0 }}>
                        Aimé Leon Dore × Technics
                    </p>
                    <button
                        onClick={handleLearnMore}
                        style={{
                            width: "100%", padding: "16px", background: "#1a1a1a",
                            color: "#fff", border: "none", cursor: "pointer",
                            fontSize: "10px", letterSpacing: "0.12em",
                            textTransform: "uppercase", fontFamily: "inherit",
                        }}
                    >
                        Learn More
                    </button>
                </div>
            );
        }

        if (isSoldOut) {
            return (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ position: "relative" }}>
                        <select
                            value={notifySize}
                            onChange={(e) => setNotifySize(e.target.value)}
                            style={{
                                width: "100%", padding: "12px 36px 12px 14px", fontSize: "11px",
                                fontFamily: "inherit", border: "1px solid #d0d0d0", borderRadius: 0,
                                background: "#fff", color: "#1a1a1a", appearance: "none", cursor: "pointer",
                            }}
                        >
                            {["One Size", "XS", "S", "M", "L", "XL"].map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", fontSize: "12px" }}>∨</span>
                    </div>
                    <p style={{ fontSize: "11px", color: "#1a1a1a", margin: 0 }}>
                        Notify me when this product is in stock
                    </p>
                    {!notifySubmitted ? (
                        <>
                            <input
                                type="email"
                                placeholder="ENTER YOUR EMAIL"
                                value={notifyEmail}
                                onChange={(e) => setNotifyEmail(e.target.value)}
                                style={{
                                    width: "100%", padding: "14px", fontSize: "10px",
                                    fontFamily: "inherit", letterSpacing: "0.1em",
                                    border: "1px solid #d0d0d0", borderRadius: 0,
                                    background: "#fff", color: "#1a1a1a",
                                    textAlign: "center", boxSizing: "border-box", outline: "none",
                                }}
                            />
                            <button
                                onClick={handleNotifySubmit}
                                style={{
                                    width: "100%", padding: "16px", background: "#1a1a1a",
                                    color: "#fff", border: "none", cursor: "pointer",
                                    fontSize: "10px", letterSpacing: "0.12em",
                                    textTransform: "uppercase", fontFamily: "inherit",
                                }}
                            >
                                Submit
                            </button>
                            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "11px", color: "#1a1a1a" }}>
                                <input
                                    type="checkbox"
                                    checked={notifyChecked}
                                    onChange={(e) => setNotifyChecked(e.target.checked)}
                                    style={{ width: "14px", height: "14px", accentColor: "#1a1a1a", cursor: "pointer" }}
                                />
                                Sign me up for the mailing list
                            </label>
                            <p style={{ fontSize: "9px", color: "#aaa", margin: 0, lineHeight: 1.7 }}>
                                By providing your email address, you agree to our{" "}
                                <a href="#" style={{ color: "#1a1a1a", textDecoration: "underline" }}>Privacy Policy</a>.
                            </p>
                        </>
                    ) : (
                        <p style={{ fontSize: "11px", color: "#555", lineHeight: 1.7 }}>
                            Thank you! We'll notify you when this product is back in stock.
                        </p>
                    )}
                </div>
            );
        }

        if (product.chainSelector) {
            return (
                <>
                    <p style={{ fontSize: "11px", letterSpacing: "0.06em", marginBottom: "10px", color: "#1a1a1a" }}>
                        Select Pendant
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "6px", marginBottom: "16px" }}>
                        {product.pendants.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => handlePendantClick(p)}
                                title={p.alt}
                                style={{
                                    padding: "4px",
                                    border: selectedPendant?.id === p.id ? "1px solid #1a1a1a" : "1px solid #e0e0e0",
                                    background: "#fff",
                                    cursor: "pointer",
                                    aspectRatio: "1",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "border-color 0.15s",
                                }}
                            >
                                <img src={p.src} alt={p.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </button>
                        ))}
                    </div>
                    <div style={{ position: "relative", marginBottom: "16px" }}>
                        <select
                            value={selectedChain?.label ?? ""}
                            onChange={(e) => {
                                const found = activeChains.find((c) => c.label === e.target.value);
                                if (found) setSelectedChain(found);
                            }}
                            style={{
                                width: "100%", padding: "12px 36px 12px 14px", fontSize: "11px",
                                fontFamily: "inherit", border: "1px solid #d0d0d0", borderRadius: 0,
                                background: "#fff", color: "#1a1a1a", appearance: "none", cursor: "pointer",
                            }}
                        >
                            {activeChains.map((c) => (
                                <option key={c.label} value={c.label}>{c.label}</option>
                            ))}
                        </select>
                        <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", fontSize: "12px" }}>∨</span>
                    </div>
                    <button className={`pd-atb${added ? " pd-atb--added" : ""}`} onClick={handleAddToBag}>
                        {added ? "Added ✓" : "ADD TO BAG"}
                    </button>
                </>
            );
        }

        // Default: color + size selector
        return (
            <>
                {/* Only render color section if product has colors */}
                {productColors.length > 0 && (
                    <div className="pd-color">
                        <p className="pd-option-label">Color: {selectedColor?.name}</p>
                        <div className="pd-swatches">
                            {productColors.map((c) => (
                                <button
                                    key={c.name}
                                    className={`pd-swatch${selectedColor?.name === c.name ? " pd-swatch--active" : ""}`}
                                    style={{ background: c.hex }}
                                    onClick={() => setSelectedColor(c)}
                                    title={c.name}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div className="pd-size">
                    <p className="pd-option-label">Select Size</p>
                    <div className="pd-sizes">
                        {["XS", "S", "M", "L", "XL"].map((s) => (
                            <button
                                key={s}
                                className={`pd-size-btn${selectedSize === s ? " pd-size-btn--active" : ""}`}
                                onClick={() => setSelectedSize(s)}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
                <button className={`pd-atb${added ? " pd-atb--added" : ""}`} onClick={handleAddToBag}>
                    {added ? "Added ✓" : "ADD TO BAG"}
                </button>
            </>
        );
    };

    // ─── Render ──────────────────────────────────────────────────────────────

    return (
        <div className="pd-overlay" ref={overlayRef}>
            <button className="pd-close" onClick={onClose}>✕</button>

            {/* ── DESKTOP 3-COL LAYOUT ── */}
            <div className="pd-layout">

                {/* LEFT */}
                <aside className="pd-left">
                    <p className="pd-name">{activeName}</p>
                    <p className="pd-price">
                        {isSoldOut ? "Sold Out" : isLearnMore ? "" : convert(activePrice)}
                    </p>

                    {product.finalSale && (
                        <span style={{
                            display: "inline-block", fontSize: "9px", letterSpacing: "0.1em",
                            border: "1px solid #111", padding: "3px 8px", marginBottom: "20px", color: "#111",
                        }}>
                            Final Sale
                        </span>
                    )}

                    {product.chainSelector && (
                        <div style={{ marginBottom: "20px" }}>
                            {product.madeToOrder && (
                                <p style={{ fontSize: "11px", color: "#444", lineHeight: 1.8, marginBottom: "10px" }}>
                                    {product.madeToOrder}
                                </p>
                            )}
                            {product.chainNote && (
                                <p style={{ fontSize: "11px", color: "#444", lineHeight: 1.8 }}>
                                    {product.chainNote}
                                </p>
                            )}
                        </div>
                    )}

                    <Accordions
                        isLearnMore={isLearnMore}
                        activeDetails={activeDetails}
                        product={product}
                        selectedPendant={selectedPendant}
                        handleShopTheLookClick={handleShopTheLookClick}
                    />
                </aside>

                {/* CENTER */}
                <div className="pd-center">
                    <div className="pd-images" ref={scrollRef}>
                        {centerImages.map((img, i) => (
                            <div key={i} className="pd-image-slide" ref={(el) => (imageRefs.current[i] = el)}>
                                <img src={img.src} alt={img.alt} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <aside className="pd-right">
                    <DesktopRight />
                </aside>
            </div>

            {/* ── MOBILE-ONLY CONTENT ── */}
            <div className="pd-mobile-body">
                <div className="pd-mobile-image">
                    {centerImages.map((img, i) => (
                        <div key={i} className="pd-mobile-image-slide">
                            <img src={img.src} alt={img.alt} />
                        </div>
                    ))}
                </div>

                <p className="pd-mobile-sizing-note">
                    {product.chainSelector && selectedPendant?.sizing?.length
                        ? selectedPendant.sizing.join(" · ")
                        : "Fits true to size. Order your normal size. Follows standard US mens sizing. Size chart can be found in sizing drawer below."}
                </p>

                <div className="pd-mobile-accordions">
                    <Accordions
                        isLearnMore={isLearnMore}
                        activeDetails={activeDetails}
                        product={product}
                        selectedPendant={selectedPendant}
                        handleShopTheLookClick={handleShopTheLookClick}
                    />
                </div>

                {recentlyViewed?.length > 0 && (
                    <section className="pd-mobile-rv">
                        <h2 className="pd-mobile-rv__title">RECENTLY VIEWED</h2>
                        <div className="pd-mobile-rv__row">
                            {recentlyViewed.map((item) => (
                                <div key={item.id} className="pd-mobile-rv__card" onClick={() => handleRvClick(item)}>
                                    <div className="pd-mobile-rv__img">
                                        <img src={item.imgs[0].src} alt={item.imgs[0].alt || item.name} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div style={{ height: "140px" }} />
            </div>

            {/* ── MOBILE STICKY BOTTOM BAR ── */}
            <div className="pd-mobile-bar">
                <div className="pd-mobile-bar__top">
                    <span className="pd-mobile-bar__price">
                        {isSoldOut ? "Sold Out" : isLearnMore ? "" : convert(activePrice)}
                    </span>
                </div>

                {!isLearnMore && (
                    <>
                        {/* Only show color swatches if product has colors */}
                        {productColors.length > 0 && (
                            <div style={{ display: "flex", gap: "6px", paddingBottom: "4px" }}>
                                {productColors.map((c) => (
                                    <button
                                        key={c.name}
                                        onClick={() => setSelectedColor(c)}
                                        title={c.name}
                                        style={{
                                            width: "28px",
                                            height: "28px",
                                            background: c.hex,
                                            border: selectedColor?.name === c.name ? "2px solid #111" : "1.5px solid transparent",
                                            cursor: "pointer",
                                            flexShrink: 0,
                                            outline: "none",
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        <div className="pd-mobile-bar__selects">
                            {product.chainSelector ? (
                                <div className="pd-mobile-bar__select-wrap" style={{ gridColumn: "1 / -1" }}>
                                    <select
                                        className="pd-mobile-bar__select"
                                        value={selectedChain?.label ?? ""}
                                        onChange={(e) => {
                                            const found = activeChains.find((c) => c.label === e.target.value);
                                            if (found) setSelectedChain(found);
                                        }}
                                    >
                                        {activeChains.map((c) => (
                                            <option key={c.label} value={c.label}>{c.label}</option>
                                        ))}
                                    </select>
                                    <span className="pd-mobile-bar__chevron">∨</span>
                                </div>
                            ) : (
                                <>
                                    {/* Only show color select if product has colors */}
                                    {productColors.length > 0 && (
                                        <div className="pd-mobile-bar__select-wrap">
                                            <select
                                                className="pd-mobile-bar__select"
                                                value={selectedColor?.name ?? ""}
                                                onChange={(e) => {
                                                    const found = productColors.find((c) => c.name === e.target.value);
                                                    if (found) setSelectedColor(found);
                                                }}
                                            >
                                                {productColors.map((c) => (
                                                    <option key={c.name} value={c.name}>{c.name}</option>
                                                ))}
                                            </select>
                                            <span className="pd-mobile-bar__chevron">∨</span>
                                        </div>
                                    )}
                                    <div className="pd-mobile-bar__select-wrap">
                                        <select
                                            className="pd-mobile-bar__select"
                                            value={selectedSize}
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                        >
                                            <option value="">Select Size</option>
                                            {["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"].map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                        <span className="pd-mobile-bar__chevron">∨</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}

                {isLearnMore ? (
                    <button className="pd-mobile-bar__atb" onClick={handleLearnMore}>
                        LEARN MORE
                    </button>
                ) : (
                    <button
                        className={`pd-mobile-bar__atb${added ? " pd-mobile-bar__atb--added" : ""}`}
                        onClick={handleAddToBag}
                        disabled={isSoldOut}
                    >
                        {isSoldOut ? "SOLD OUT" : added ? "ADDED ✓" : "ADD TO BAG"}
                    </button>
                )}
            </div>

            {/* ── DESKTOP SECTIONS ── */}
            <section className="pd-section pd-desktop-only">
                <h2 className="pd-section__title">YOU MAY ALSO LIKE</h2>
                <div className="pd-rec-grid">
                    {youMayAlsoLike.map((item) => (
                        <div key={item.id} className="pd-rec-card">
                            <div className="pd-rec-card__img">
                                <img src={item.imgs[0].src} alt={item.imgs[0].alt} />
                            </div>
                            <p className="pd-rec-card__name">{item.name}</p>
                            <p className="pd-rec-card__price">{convert(item.price)}</p>
                        </div>
                    ))}
                </div>
            </section>

            {recentlyViewed?.length > 0 && (
                <section className="pd-section pd-desktop-only">
                    <h2 className="pd-section__title">RECENTLY VIEWED</h2>
                    <div className="pd-rec-grid pd-rec-grid--4">
                        {recentlyViewed.map((item) => (
                            <div
                                key={item.id}
                                className="pd-rec-card"
                                onClick={() => handleRvClick(item)}
                                style={{ cursor: "pointer" }}
                            >
                                <div className="pd-rec-card__img">
                                    <img src={item.imgs[0].src} alt={item.imgs[0].alt} />
                                </div>
                                <p className="pd-rec-card__name">{item.name}</p>
                                <p className="pd-rec-card__price">{convert(item.price)}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Recently Viewed Panel (also used for Shop the Look) */}
            {rvPanelOpen && rvPanelItem && (
                <RecentlyViewedPanel
                    item={rvPanelItem}
                    onClose={() => { setRvPanelOpen(false); setRvPanelItem(null); }}
                    onFullDetails={handleRvFullDetails}
                />
            )}

            {/* ── DESKTOP CART DRAWER ── */}
            <div
                className={`pd-cart-overlay pd-cart-overlay--desktop${cartOpen ? " pd-cart-overlay--open" : ""}`}
                onClick={() => setCartOpen(false)}
            />
            <aside className={`pd-cart pd-cart--desktop${cartOpen ? " pd-cart--open" : ""}`}>
                <div className="pd-cart__header">
                    <span className="pd-cart__title">Cart</span>
                    <button className="pd-cart__close" onClick={() => setCartOpen(false)}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.2" />
                            <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                    </button>
                </div>
                <div className="pd-cart__body">
                    {cartItems.length === 0 ? (
                        <p className="pd-cart__empty">Your bag is empty.</p>
                    ) : (
                        <>
                            {cartItems.map((item) => (
                                <div key={item.id} className="pd-cart__item">
                                    <div className="pd-cart__thumb">
                                        {item.imgs?.[0]?.src
                                            ? <img src={item.imgs[0].src} alt={item.imgs[0].alt || item.name} />
                                            : <div className="pd-cart__thumb-placeholder" />}
                                    </div>
                                    <div className="pd-cart__info">
                                        <span className="pd-cart__name">{item.name}</span>
                                        <span className="pd-cart__price">{convert(item.price)}</span>
                                        <div className="pd-cart__qty">
                                            <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        </div>
                                    </div>
                                    <button className="pd-cart__remove" onClick={() => removeFromCart(item.id)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                            {recentlyViewed?.length > 0 && (
                                <div className="pd-cart__rv">
                                    <p className="pd-cart__rv-title">RECENTLY VIEWED</p>
                                    <div className="pd-cart__rv-row">
                                        {recentlyViewed.slice(0, 4).map((item) => (
                                            <div
                                                key={item.id}
                                                className="pd-cart__rv-card"
                                                onClick={() => { setCartOpen(false); handleRvClick(item); }}
                                            >
                                                <div className="pd-cart__rv-img">
                                                    <img src={item.imgs[0].src} alt={item.imgs[0].alt || item.name} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="pd-cart__footer">
                        <p className="pd-cart__taxes">Taxes calculated at checkout</p>
                        <div className="pd-cart__subtotal">
                            <span>Subtotal</span>
                            <span>{convert(`$${subtotal}`)}</span>
                        </div>
                        <p className="pd-cart__ship">Your order is eligible for free shipping</p>
                        <div className="pd-cart__footer-btns">
                            <button className="pd-cart__update" onClick={() => setCartOpen(false)}>Update</button>
                            <button className="pd-cart__checkout" onClick={() => { setCartOpen(false); onCheckout(); }}>
                                Checkout
                            </button>
                        </div>
                        <button
                            className="pd-cart__view"
                            onClick={() => { setCartOpen(false); if (onViewCart) onViewCart(); }}
                        >
                            View Cart
                        </button>
                    </div>
                )}
            </aside>

            {/* ── MOBILE BOTTOM SHEET (post add-to-bag) ── */}
            <div
                className={`mob-atc-overlay${cartOpen ? " mob-atc-overlay--open" : ""}`}
                onClick={() => setCartOpen(false)}
            />
            <div className={`mob-atc-sheet${cartOpen ? " mob-atc-sheet--open" : ""}`}>
                <div className="mob-atc-header">
                    <span className="mob-atc-title">ITEM ADDED TO CART</span>
                    <button className="mob-atc-close" onClick={() => setCartOpen(false)}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.2" />
                            <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                    </button>
                </div>
                {lastAdded && (
                    <div className="mob-atc-item">
                        <div className="mob-atc-thumb">
                            {lastAdded.imgs?.[0]?.src && (
                                <img src={lastAdded.imgs[0].src} alt={lastAdded.imgs[0].alt || lastAdded.name} />
                            )}
                        </div>
                        <div className="mob-atc-info">
                            <p className="mob-atc-name">{lastAdded.name}</p>
                            <p className="mob-atc-variant">
                                {lastAdded.selectedColor
                                    ? lastAdded.selectedColor.toUpperCase()
                                    : selectedColor?.name?.toUpperCase()}
                                {selectedSize ? ` / ${selectedSize}` : ""}
                            </p>
                            <p className="mob-atc-price">{convert(lastAdded.price)}</p>
                        </div>
                    </div>
                )}
                <div className="mob-atc-btns">
                    <button
                        className="mob-atc-btn mob-atc-btn--outline"
                        onClick={() => { setCartOpen(false); if (onViewCart) onViewCart(); }}
                    >
                        VIEW CART ({cartItems.length})
                    </button>
                    <button
                        className="mob-atc-btn mob-atc-btn--fill"
                        onClick={() => { setCartOpen(false); onCheckout(); }}
                    >
                        CHECKOUT
                    </button>
                </div>
                {recentlyViewed?.length > 0 && (
                    <div className="mob-atc-recent">
                        <p className="mob-atc-recent-title">RECENTLY VIEWED</p>
                        <div className="mob-atc-recent-row">
                            {recentlyViewed.slice(0, 4).map((item) => (
                                <div
                                    key={item.id}
                                    className="mob-atc-recent-card"
                                    onClick={() => { setCartOpen(false); handleRvClick(item); }}
                                >
                                    <div className="mob-atc-recent-img">
                                        <img src={item.imgs[0].src} alt={item.imgs[0].alt || item.name} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
