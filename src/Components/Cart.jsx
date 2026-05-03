import { useEffect, useState } from "react"
import { useCart } from "./CartContext.jsx"
import { useCurrency } from "../useCurrency"
import RecentlyViewedPanel from "./Recentlyview.jsx"

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= breakpoint)
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth <= breakpoint)
        window.addEventListener("resize", handler)
        return () => window.removeEventListener("resize", handler)
    }, [breakpoint])
    return isMobile
}

const openRvFullDetails = (item) => {
    setTimeout(() => {
        window.dispatchEvent(new CustomEvent("rv-full-details", { detail: item }))
    }, 50)
}

export default function Cart({ isOpen, onClose, onCheckout }) {
    const { cartItems, recentlyViewed, removeFromCart, updateQuantity, subtotal } = useCart()
    const { convert } = useCurrency()
    const isMobile = useIsMobile()
    const [rvPanelItem, setRvPanelItem] = useState(null)
    const [rvPanelOpen, setRvPanelOpen] = useState(false)

    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY
            document.body.style.overflow = "hidden"
            document.body.style.position = "fixed"
            document.body.style.top = `-${scrollY}px`
            document.body.style.width = "100%"
            return () => {
                document.body.style.overflow = ""
                document.body.style.position = ""
                document.body.style.top = ""
                document.body.style.width = ""
                window.scrollTo(0, scrollY)
            }
        }
    }, [isOpen])

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose() }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [onClose])

    if (!isOpen) return null

    const isEmpty = cartItems.length === 0

    const handleRvClick = (product) => {
        setRvPanelItem(product)
        setRvPanelOpen(true)
    }

    const CheckoutPanel = ({ mobile = false }) => (
        <div style={{ padding: mobile ? "16px 24px" : "40px 32px" }}>
            <p style={{ fontSize: "9px", color: "#aaa", letterSpacing: "0.04em", margin: "0 0 10px" }}>
                Taxes calculated at checkout
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
                <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Subtotal</span>
                <span style={{ fontSize: "11px" }}>{convert(`$${subtotal}`)}</span>
            </div>
            <div style={{
                fontSize: "9px", letterSpacing: "0.06em", textTransform: "uppercase",
                color: "#888", textAlign: "center", padding: "12px 0",
                borderBottom: "2px solid #1a1a1a", margin: "0 0 16px",
            }}>
                Your order is eligible for free shipping
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <button onClick={onClose} style={{
                    padding: mobile ? "16px" : "13px 8px",
                    background: "#fff", border: "1px solid #c8c8c8",
                    fontSize: mobile ? "10px" : "9px", letterSpacing: "0.12em", textTransform: "uppercase",
                    cursor: "pointer", fontFamily: "inherit", color: "#1a1a1a",
                }}>Update</button>
                <button onClick={onCheckout} style={{
                    padding: mobile ? "16px" : "13px 8px",
                    background: "#1a1a1a", border: "1px solid #1a1a1a",
                    fontSize: mobile ? "10px" : "9px", letterSpacing: "0.12em", textTransform: "uppercase",
                    cursor: "pointer", fontFamily: "inherit", color: "#fff",
                }}>Checkout</button>
            </div>
        </div>
    )

    return (
        <>
            <div style={{
                position: "fixed", top: "52px", left: 0, right: 0, bottom: 0,
                background: "#fff", zIndex: 1500,
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                color: "#1a1a1a", display: "flex", flexDirection: "column", overflow: "hidden",
            }}>
                {/* Header */}
                <div style={{
                    padding: "16px 24px", fontSize: "10px", letterSpacing: "0.12em",
                    textTransform: "uppercase", display: "flex", justifyContent: "space-between",
                    alignItems: "center", flexShrink: 0,
                }}>
                    <span>Cart</span>
                    <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#1a1a1a", padding: 0, lineHeight: 1 }}>✕</button>
                </div>

                {isEmpty ? (
                    <div style={{ textAlign: "center", paddingTop: "100px" }}>
                        <p style={{ fontSize: "12px", color: "#888", marginBottom: "20px" }}>Your bag is empty.</p>
                        <button onClick={onClose} style={{ background: "#1a1a1a", color: "#fff", border: "none", padding: "14px 32px", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}>Continue Shopping</button>
                    </div>

                ) : isMobile ? (
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                        <div style={{ flex: 1, overflowY: "auto" }}>
                            <div style={{ padding: "6px 24px", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", borderBottom: "1px solid #e8e8e8" }}>
                                Available Now
                            </div>
                            {cartItems.map((item, index) => (
                                <div key={item.id} style={{ borderTop: index === 0 ? "1px solid #e8e8e8" : "none", borderBottom: "1px solid #e8e8e8", marginBottom: index < cartItems.length - 1 ? "24px" : "0" }}>
                                    <MobileCartItem item={item} convert={convert}
                                        onUpdateQty={(delta) => updateQuantity(item.id, delta)}
                                        onRemove={() => removeFromCart(item.id)} />
                                </div>
                            ))}

                            {/* Recently Viewed — mobile */}
                            {recentlyViewed?.length > 0 && (
                                <div style={{ borderTop: "1px solid #e8e8e8", padding: "24px 24px 0" }}>
                                    <p style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#aaa", margin: "0 0 20px" }}>
                                        Recently Viewed
                                    </p>
                                    <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "24px" }}>
                                        {recentlyViewed.slice(0, 6).map((product) => (
                                            <div key={product.id} style={{ flexShrink: 0, width: "200px", cursor: "pointer" }} onClick={() => handleRvClick(product)}>
                                                <div style={{ width: "200px", aspectRatio: "3/4", overflow: "hidden", marginBottom: "8px", background: "#f2f2f2" }}>
                                                    {product.imgs?.[0]?.src && (
                                                        <img src={product.imgs[0].src} alt={product.imgs[0].alt || product.name}
                                                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                                    )}
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                                                    <p style={{ fontSize: "10px", margin: 0, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</p>
                                                    <p style={{ fontSize: "10px", color: "#888", margin: 0, flexShrink: 0 }}>{convert(product.price)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{ flexShrink: 0, borderTop: "1px solid #e8e8e8", background: "#fff" }}>
                            <CheckoutPanel mobile={true} />
                        </div>
                    </div>

                ) : (
                    <div style={{ flex: 1, overflowY: "auto" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", alignItems: "start" }}>
                            <div>
                                <div style={{ padding: "6px 24px", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", borderBottom: "1px solid #e8e8e8" }}>
                                    Available Now
                                </div>
                                {cartItems.map((item, index) => (
                                    <div key={item.id} style={{ borderTop: index === 0 ? "1px solid #e8e8e8" : "none", borderBottom: "1px solid #e8e8e8", marginBottom: index < cartItems.length - 1 ? "24px" : "0" }}>
                                        <DesktopCartItem item={item} convert={convert}
                                            onUpdateQty={(delta) => updateQuantity(item.id, delta)}
                                            onRemove={() => removeFromCart(item.id)} />
                                    </div>
                                ))}
                            </div>
                            <div style={{ position: "sticky", top: 0, alignSelf: "start" }}>
                                <CheckoutPanel mobile={false} />
                            </div>
                        </div>

                        {/* Recently Viewed — desktop */}
                        {recentlyViewed?.length > 0 && (
                            <div style={{ borderTop: "1px solid #e8e8e8", padding: "24px 24px 48px" }}>
                                <p style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#aaa", margin: "0 0 20px" }}>
                                    Recently Viewed
                                </p>
                                <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "8px" }}>
                                    {recentlyViewed.slice(0, 8).map((product) => (
                                        <div key={product.id} style={{ flexShrink: 0, width: "260px", cursor: "pointer" }} onClick={() => handleRvClick(product)}>
                                            <div style={{ width: "260px", aspectRatio: "3/4", overflow: "hidden", marginBottom: "8px", background: "#f2f2f2" }}>
                                                {product.imgs?.[0]?.src && (
                                                    <img src={product.imgs[0].src} alt={product.imgs[0].alt || product.name}
                                                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                                )}
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                                                <p style={{ fontSize: "10px", margin: 0, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</p>
                                                <p style={{ fontSize: "10px", color: "#888", margin: 0, flexShrink: 0 }}>{convert(product.price)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ── Recently Viewed Panel ── */}
            {rvPanelOpen && rvPanelItem && (
                <RecentlyViewedPanel
                    item={rvPanelItem}
                    onClose={() => { setRvPanelOpen(false); setRvPanelItem(null) }}
                    onFullDetails={(item) => {
                        setRvPanelOpen(false)
                        setRvPanelItem(null)
                        onClose()
                        openRvFullDetails(item)
                    }}
                />
            )}
        </>
    )
}

function MobileCartItem({ item, onUpdateQty, onRemove, convert }) {
    const imgSrc = item.imgs?.[0]?.src
    const imgAlt = item.imgs?.[0]?.alt || item.name
    return (
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", background: "#fff" }}>
            <div style={{ width: "200px", height: "240px", background: "#f0efeb", overflow: "hidden" }}>
                {imgSrc && <img src={imgSrc} alt={imgAlt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
            </div>
            <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                    <p style={{ fontSize: "12px", margin: "0 0 4px" }}>{item.name}</p>
                    {item.variant && <p style={{ fontSize: "10px", color: "#888", margin: "0 0 8px", letterSpacing: "0.06em" }}>{item.variant}</p>}
                    <p style={{ fontSize: "12px", margin: "0 0 16px" }}>
                        {item.isSale ? (
                            <><span style={{ textDecoration: "line-through", color: "#aaa", marginRight: "6px", fontSize: "10px" }}>{convert(item.originalPrice)}</span><span style={{ color: "#c00" }}>{convert(item.price)}</span></>
                        ) : convert(item.price)}
                    </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                    <button onClick={() => onUpdateQty(-1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", padding: 0, color: "#1a1a1a", lineHeight: 1 }}>−</button>
                    <span style={{ fontSize: "12px" }}>{item.quantity}</span>
                    <button onClick={() => onUpdateQty(1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", padding: 0, color: "#1a1a1a", lineHeight: 1 }}>+</button>
                </div>
                <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "9px", color: "#888", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "inherit", padding: 0, textAlign: "left" }}>Remove</button>
            </div>
        </div>
    )
}

function DesktopCartItem({ item, onUpdateQty, onRemove, convert }) {
    const imgSrc = item.imgs?.[0]?.src
    const imgAlt = item.imgs?.[0]?.alt || item.name
    return (
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr" }}>
            <div style={{ width: "200px", height: "240px", background: "#f0efeb", overflow: "hidden" }}>
                {imgSrc && <img src={imgSrc} alt={imgAlt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: "24px 24px 24px 20px", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontSize: "11px", letterSpacing: "0.02em" }}>{item.name}</span>
                    {item.variant && <span style={{ fontSize: "10px", color: "#888", letterSpacing: "0.04em" }}>{item.variant}</span>}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "12px" }}>
                        <button onClick={() => onUpdateQty(-1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", padding: 0, color: "#1a1a1a", lineHeight: 1 }}>−</button>
                        <span style={{ fontSize: "11px", minWidth: "12px", textAlign: "center" }}>{item.quantity}</span>
                        <button onClick={() => onUpdateQty(1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", padding: 0, color: "#1a1a1a", lineHeight: 1 }}>+</button>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", paddingBottom: "4px" }}>
                    <span style={{ fontSize: "11px", letterSpacing: "0.02em" }}>
                        {item.isSale ? (
                            <><span style={{ textDecoration: "line-through", color: "#aaa", marginRight: "6px", fontSize: "10px" }}>{convert(item.originalPrice)}</span><span style={{ color: "#c00" }}>{convert(item.price)}</span></>
                        ) : convert(item.price)}
                    </span>
                    <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "9px", color: "#888", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "inherit", padding: 0 }}>Remove</button>
                </div>
            </div>
        </div>
    )
}
