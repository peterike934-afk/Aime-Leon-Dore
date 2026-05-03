import { useState, useEffect, useRef } from "react";
import { useCart } from "./CartContext";
import "./Checkout.css";
import { useCurrency } from "../useCurrency";

export default function CheckoutPage({ isOpen, onClose, userEmail, onBackToCart }) {
    const { cartItems, subtotal } = useCart();
    const [paymentMethod, setPaymentMethod] = useState("credit");
    const [subPayment, setSubPayment] = useState("paypal");
    const [discountCode, setDiscountCode] = useState("");
    const [topSummaryOpen, setTopSummaryOpen] = useState(false);
    const [bottomSummaryOpen, setBottomSummaryOpen] = useState(false);
    const [billingOption, setBillingOption] = useState("same");
    const [saveInfo, setSaveInfo] = useState(false);
    const [emailOffers, setEmailOffers] = useState(true);
    const [showDiscount, setShowDiscount] = useState(false);
    const [useSameAddress, setUseSameAddress] = useState(true);
    const [showScrollPill, setShowScrollPill] = useState(false);
    const { convert, currency } = useCurrency();
    const rightItemsRef = useRef(null);

    useEffect(() => {
        const siteHeader = document.querySelector(
            "header, .site-header, .nav-header, .navbar, [class*='header']"
        );
        if (!siteHeader) return;
        if (isOpen) {
            siteHeader.style.display = "none";
        } else {
            siteHeader.style.display = "";
        }
        return () => { siteHeader.style.display = ""; };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        if (cartItems.length < 5) { setShowScrollPill(false); return; }
        const timer = setTimeout(() => {
            const el = rightItemsRef.current;
            if (!el) return;
            const checkScroll = () => {
                if (el.scrollHeight <= el.clientHeight) { setShowScrollPill(false); return; }
                const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
                setShowScrollPill(!atBottom);
            };
            checkScroll();
            el.addEventListener("scroll", checkScroll);
            return () => el.removeEventListener("scroll", checkScroll);
        }, 50);
        return () => clearTimeout(timer);
    }, [cartItems, isOpen]);

    if (!isOpen) return null;

    const avatarLetter = userEmail ? userEmail[0].toUpperCase() : "?";

    const handleBagClick = () => {
        if (onBackToCart) onBackToCart();
        else if (onClose) onClose();
    };

    const handleScrollPill = () => {
        if (rightItemsRef.current) rightItemsRef.current.scrollBy({ top: 200, behavior: "smooth" });
    };

    return (
        <div className="checkout-page">

            {/* ══ MOBILE ONLY: fixed top bar with bag icon ══ */}
            <div className="mob-topbar">
                <button className="mob-topbar-bag" onClick={handleBagClick} aria-label="Back to cart">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    {cartItems.length > 0 && (
                        <span className="mob-topbar-badge">{cartItems.length}</span>
                    )}
                </button>
            </div>

            {/* ══ MAIN LAYOUT ══ */}
            <div className="checkout-layout">

                {/* ── LEFT: Form ── */}
                <div className="checkout-left">

                    {/* ── MOBILE SUMMARY ACCORDION (top) ── */}
                    <div className="mob-summary-accordion">
                        <button
                            className={`mob-summary-toggle${topSummaryOpen ? " open" : ""}`}
                            onClick={() => setTopSummaryOpen(v => !v)}
                            aria-expanded={topSummaryOpen}
                        >
                            <div className="mob-toggle-left">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 01-8 0" />
                                </svg>
                                <span className="mob-toggle-label">
                                    {topSummaryOpen ? "Hide order summary" : "Show order summary"}
                                </span>
                                <svg className={`mob-toggle-chevron${topSummaryOpen ? " rotated" : ""}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="mob-toggle-price">{currency} {convert(`$${subtotal}`)}</span>
                        </button>

                        <div className={`mob-summary-panel${topSummaryOpen ? " open" : ""}`}>
                            <div className="mob-summary-items">
                                {cartItems.map((item) => (
                                    <div className="mob-summary-item" key={item.id}>
                                        <div className="mob-summary-img-wrap">
                                            <img src={item.imgs?.[0]?.src} alt={item.imgs?.[0]?.alt || item.name} />
                                            <span className="mob-summary-qty">{item.quantity}</span>
                                        </div>
                                        <div className="mob-summary-item-info">
                                            <p className="mob-summary-item-name">{item.name}</p>
                                            <p className="mob-summary-item-variant">{item.color} / {item.size}</p>
                                        </div>
                                        <p className="mob-summary-item-price">{convert(item.price)}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mob-summary-discount">
                                <input className="mob-discount-input" type="text" placeholder="Discount code or gift card" value={discountCode} onChange={e => setDiscountCode(e.target.value)} />
                                <button className="mob-discount-btn">Apply</button>
                            </div>
                            <div className="mob-summary-totals">
                                <div className="mob-totals-row">
                                    <span>Subtotal · {cartItems.length} items</span>
                                    <span>{convert(`$${subtotal}`)}</span>
                                </div>
                                <div className="mob-totals-row">
                                    <span>Shipping</span>
                                    <span className="mob-free-label">FREE</span>
                                </div>
                                <div className="mob-totals-row mob-totals-row--total">
                                    <span>Total</span>
                                    <span><small>{currency}</small> {convert(`$${subtotal}`)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── MOBILE EXPRESS CHECKOUT ── */}
                    <div className="mob-express-checkout">
                        <div className="mob-express-btns">
                            <button type="button" className="mob-express-btn mob-express-btn--apple">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                </svg>
                                Pay
                            </button>
                            <button type="button" className="mob-express-btn mob-express-btn--google">
                                <svg width="16" height="16" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Pay
                            </button>
                        </div>
                        <div className="mob-express-or">
                            <span>OR</span>
                        </div>
                    </div>

                    {/* ── FORM BODY ── */}
                    <div className="form-body">

                        {/* Contact */}
                        <div className="form-section">
                            <div className="section-title-row">
                                <h3 className="section-title">Contact</h3>
                                {!userEmail && <a href="#" className="section-link">Sign in</a>}
                            </div>
                            {userEmail ? (
                                <div className="contact-row">
                                    <div className="contact-avatar">{avatarLetter}</div>
                                    <span className="contact-email">{userEmail}</span>
                                    <button className="contact-menu-btn" aria-label="Account options">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <circle cx="8" cy="3" r="1.3" />
                                            <circle cx="8" cy="8" r="1.3" />
                                            <circle cx="8" cy="13" r="1.3" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <div className="field-wrap">
                                    <input className="field-input" type="email" placeholder=" " id="email" />
                                    <label className="field-label" htmlFor="email">Email</label>
                                </div>
                            )}
                            <label className="checkbox-row">
                                <input type="checkbox" className="ald-checkbox" checked={emailOffers} onChange={e => setEmailOffers(e.target.checked)} />
                                <span>Email me with news and offers</span>
                            </label>
                            {!userEmail && (
                                <p className="privacy-note">By providing your email address, you agree to our <a href="#">Privacy Policy</a>.</p>
                            )}
                        </div>

                        {/* Delivery */}
                        <div className="form-section">
                            <h3 className="section-title">Delivery</h3>
                            <div className="field-wrap">
                                <select className="field-input field-select" id="country" defaultValue="US">
                                    <option value="US">United States</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="NG">Nigeria</option>
                                    <option value="CA">Canada</option>
                                    <option value="FR">France</option>
                                    <option value="DE">Germany</option>
                                    <option value="JP">Japan</option>
                                    <option value="DZ">Algeria</option>
                                </select>
                                <label className="field-label field-label--raised" htmlFor="country">Country/Region</label>
                                <svg className="select-chevron" width="11" height="7" viewBox="0 0 11 7" fill="none">
                                    <path d="M1 1l4.5 4.5L10 1" stroke="#555" strokeWidth="1.4" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="field-row">
                                <div className="field-wrap">
                                    <input className="field-input" type="text" placeholder=" " id="fname" />
                                    <label className="field-label" htmlFor="fname">First name</label>
                                </div>
                                <div className="field-wrap">
                                    <input className="field-input" type="text" placeholder=" " id="lname" />
                                    <label className="field-label" htmlFor="lname">Last name</label>
                                </div>
                            </div>
                            <div className="field-wrap">
                                <input className="field-input" type="text" placeholder=" " id="company" />
                                <label className="field-label" htmlFor="company">Company (optional)</label>
                            </div>
                            <div className="field-wrap field-wrap--icon">
                                <input className="field-input" type="text" placeholder=" " id="address" />
                                <label className="field-label" htmlFor="address">Address</label>
                                <svg className="field-icon-right" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
                                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                                </svg>
                            </div>
                            <div className="field-wrap">
                                <input className="field-input" type="text" placeholder=" " id="apt" />
                                <label className="field-label" htmlFor="apt">Apartment, suite, etc. (optional)</label>
                            </div>
                            <div className="field-wrap">
                                <input className="field-input" type="text" placeholder=" " id="city" />
                                <label className="field-label" htmlFor="city">City</label>
                            </div>
                            <div className="field-row">
                                <div className="field-wrap">
                                    <select className="field-input field-select" id="state" defaultValue="">
                                        <option value="" disabled>State</option>
                                        <option value="CA">California</option>
                                        <option value="NY">New York</option>
                                        <option value="TX">Texas</option>
                                        <option value="FL">Florida</option>
                                    </select>
                                    <label className="field-label field-label--raised" htmlFor="state">State</label>
                                    <svg className="select-chevron" width="11" height="7" viewBox="0 0 11 7" fill="none">
                                        <path d="M1 1l4.5 4.5L10 1" stroke="#555" strokeWidth="1.4" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <div className="field-wrap">
                                    <input className="field-input" type="text" placeholder=" " id="zip" />
                                    <label className="field-label" htmlFor="zip">ZIP code</label>
                                </div>
                            </div>
                            <div className="field-wrap field-wrap--icon">
                                <input className="field-input" type="tel" placeholder=" " id="phone" />
                                <label className="field-label" htmlFor="phone">Phone (optional)</label>
                                <button className="field-icon-btn" type="button" aria-label="Why we need your phone">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#aaa" strokeWidth="1.3">
                                        <circle cx="8" cy="8" r="6.5" />
                                        <path d="M7 7h1v4h1M8 5.5v.5" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                            <label className="checkbox-row">
                                <input type="checkbox" className="ald-checkbox" checked={saveInfo} onChange={e => setSaveInfo(e.target.checked)} />
                                <span>Save this information for next time</span>
                            </label>
                        </div>

                        {/* Shipping method */}
                        <div className="form-section">
                            <h3 className="section-title">Shipping method</h3>
                            <div className="shipping-placeholder">
                                Enter your shipping address to view available shipping methods.
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="form-section">
                            <h3 className="section-title">Payment</h3>
                            <p className="security-note">All transactions are secure and encrypted.</p>

                            <div className="payment-options-wrap">

                                {/* Credit card option */}
                                <label className={`payment-option${paymentMethod === "credit" ? " active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="credit"
                                        checked={paymentMethod === "credit"}
                                        onChange={() => { setPaymentMethod("credit"); setSubPayment(null); }}
                                    />
                                    <span className="payment-option-label">Credit or Debit Card</span>
                                    <div className="card-logos">
                                        <svg className="card-logo" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="38" height="24" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="0.5" />
                                            <text x="19" y="16" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="10" fill="#1a1f71">VISA</text>
                                        </svg>
                                        <svg className="card-logo" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="38" height="24" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="0.5" />
                                            <circle cx="15" cy="12" r="7" fill="#eb001b" />
                                            <circle cx="23" cy="12" r="7" fill="#f79e1b" />
                                            <path d="M19 6.8a7 7 0 010 10.4A7 7 0 0119 6.8z" fill="#ff5f00" />
                                        </svg>
                                        <svg className="card-logo" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="38" height="24" rx="4" fill="#2557d6" />
                                            <text x="19" y="16" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="8" fill="#fff">AMEX</text>
                                        </svg>
                                        <div className="card-more-wrap">
                                            <span className="card-more">+3</span>
                                            <div className="card-more-tooltip">
                                                <p className="card-more-tooltip-title">Also accepted</p>
                                                <div className="card-more-tooltip-row">
                                                    <svg className="card-logo" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="38" height="24" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="0.5" />
                                                        <text x="19" y="16" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="7" fill="#f60">DISCOVER</text>
                                                    </svg>
                                                    <span>Discover</span>
                                                </div>
                                                <div className="card-more-tooltip-row">
                                                    <svg className="card-logo" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="38" height="24" rx="4" fill="#003473" />
                                                        <text x="19" y="16" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="9" fill="#fff">JCB</text>
                                                    </svg>
                                                    <span>JCB</span>
                                                </div>
                                                <div className="card-more-tooltip-row">
                                                    <svg className="card-logo" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="38" height="24" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="0.5" />
                                                        <text x="19" y="16" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="6.5" fill="#004A97">DINERS</text>
                                                    </svg>
                                                    <span>Diners Club</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </label>

                                {/* Card fields */}
                                {paymentMethod === "credit" && (
                                    <div className="card-fields">
                                        <div className="field-wrap field-wrap--icon">
                                            <input className="field-input" type="text" placeholder=" " maxLength={19} id="cardnum" />
                                            <label className="field-label" htmlFor="cardnum">Card number</label>
                                            <svg className="field-icon-right" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.4">
                                                <rect x="2" y="5" width="20" height="14" rx="2" />
                                                <line x1="2" y1="10" x2="22" y2="10" />
                                            </svg>
                                        </div>
                                        <div className="field-row">
                                            <div className="field-wrap">
                                                <input className="field-input" type="text" placeholder=" " id="expiry" />
                                                <label className="field-label" htmlFor="expiry">Expiration date (MM / YY)</label>
                                            </div>
                                            <div className="field-wrap field-wrap--icon">
                                                <input className="field-input" type="text" placeholder=" " maxLength={4} id="cvv" />
                                                <label className="field-label" htmlFor="cvv">Security code</label>
                                                <button className="field-icon-btn" type="button" aria-label="What is the security code?">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#aaa" strokeWidth="1.3">
                                                        <circle cx="8" cy="8" r="6.5" />
                                                        <path d="M7 7h1v4h1M8 5.5v.5" strokeLinecap="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="field-wrap">
                                            <input className="field-input" type="text" placeholder=" " id="nameoncard" />
                                            <label className="field-label" htmlFor="nameoncard">Name on card</label>
                                        </div>

                                        {/* Use same address checkbox */}
                                        <label className="checkbox-row checkbox-row--sm">
                                            <input
                                                type="checkbox"
                                                className="ald-checkbox"
                                                checked={useSameAddress}
                                                onChange={e => setUseSameAddress(e.target.checked)}
                                            />
                                            <span>Use shipping address as billing address</span>
                                        </label>
                                    </div>
                                )}

                                {/* Billing address — drops down when checkbox is unchecked */}
                                {paymentMethod === "credit" && !useSameAddress && (
                                    <div className="billing-fields" style={{ padding: "16px", borderBottom: "1px solid #e8e5e0" }}>
                                        <h3 className="section-title" style={{ fontSize: 16, marginBottom: 12 }}>Billing address</h3>
                                        <div className="field-wrap">
                                            <select className="field-input field-select" defaultValue="US">
                                                <option value="US">United States</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="NG">Nigeria</option>
                                                <option value="CA">Canada</option>
                                                <option value="FR">France</option>
                                                <option value="DE">Germany</option>
                                                <option value="JP">Japan</option>
                                                <option value="DZ">Algeria</option>
                                            </select>
                                            <label className="field-label field-label--raised">Country/Region</label>
                                            <svg className="select-chevron" width="11" height="7" viewBox="0 0 11 7" fill="none">
                                                <path d="M1 1l4.5 4.5L10 1" stroke="#555" strokeWidth="1.4" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <div className="field-row">
                                            <div className="field-wrap">
                                                <input className="field-input" type="text" placeholder=" " id="billing-fname" />
                                                <label className="field-label" htmlFor="billing-fname">First name</label>
                                            </div>
                                            <div className="field-wrap">
                                                <input className="field-input" type="text" placeholder=" " id="billing-lname" />
                                                <label className="field-label" htmlFor="billing-lname">Last name</label>
                                            </div>
                                        </div>
                                        <div className="field-wrap">
                                            <input className="field-input" type="text" placeholder=" " id="billing-company" />
                                            <label className="field-label" htmlFor="billing-company">Company (optional)</label>
                                        </div>
                                        <div className="field-wrap">
                                            <input className="field-input" type="text" placeholder=" " id="billing-address" />
                                            <label className="field-label" htmlFor="billing-address">Address</label>
                                        </div>
                                        <div className="field-wrap">
                                            <input className="field-input" type="text" placeholder=" " id="billing-apt" />
                                            <label className="field-label" htmlFor="billing-apt">Apartment, suite, etc. (optional)</label>
                                        </div>
                                        <div className="field-row">
                                            <div className="field-wrap">
                                                <input className="field-input" type="text" placeholder=" " id="billing-zip" />
                                                <label className="field-label" htmlFor="billing-zip">Postal code (optional)</label>
                                            </div>
                                            <div className="field-wrap">
                                                <input className="field-input" type="text" placeholder=" " id="billing-city" />
                                                <label className="field-label" htmlFor="billing-city">City</label>
                                            </div>
                                        </div>
                                        <div className="field-wrap field-wrap--icon">
                                            <input className="field-input" type="tel" placeholder=" " id="billing-phone" />
                                            <label className="field-label" htmlFor="billing-phone">Phone (optional)</label>
                                            <button className="field-icon-btn" type="button">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#aaa" strokeWidth="1.3">
                                                    <circle cx="8" cy="8" r="6.5" />
                                                    <path d="M7 7h1v4h1M8 5.5v.5" strokeLinecap="round" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* More Payment Options */}
                                <label className={`payment-option${paymentMethod === "more" ? " active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="more"
                                        checked={paymentMethod === "more"}
                                        onChange={() => { setPaymentMethod("more"); setSubPayment("paypal"); }}
                                    />
                                    <span className="payment-option-label">More Payment Options</span>
                                    <span className="payment-option-dots">···</span>
                                </label>

                            </div>

                            {/* Outside the box: Payment Options label + PayPal logo */}
                            <div className="payment-options-footer">
                                <span className="payment-options-footer-label">Payment Options</span>
                                <span className="paypal-logo" aria-label="PayPal">
                                    <svg height="20" viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg">
                                        <text y="15" fontFamily="Arial" fontWeight="800" fontStyle="italic" fontSize="14" fill="#003087">Pay</text>
                                        <text x="26" y="15" fontFamily="Arial" fontWeight="800" fontStyle="italic" fontSize="14" fill="#009cde">Pal</text>
                                    </svg>
                                </span>
                            </div>

                            {/* PayPal expanded */}
                            {paymentMethod === "more" && (
                                <div className="paypal-sub-card">
                                    <label className="paypal-sub-option">
                                        <input type="radio" name="payment-sub" value="paypal" checked={subPayment === "paypal"} onChange={() => setSubPayment("paypal")} />
                                        <span className="payment-option-label">PayPal</span>
                                        <span className="paypal-logo" aria-label="PayPal">
                                            <svg height="20" viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg">
                                                <text y="15" fontFamily="Arial" fontWeight="800" fontStyle="italic" fontSize="14" fill="#003087">Pay</text>
                                                <text x="26" y="15" fontFamily="Arial" fontWeight="800" fontStyle="italic" fontSize="14" fill="#009cde">Pal</text>
                                            </svg>
                                        </span>
                                    </label>
                                    <div className="paypal-note">
                                        After clicking "Pay now", you will be redirected to PayPal to complete your purchase securely.
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Billing address (PayPal only) */}
                        {paymentMethod === "more" && subPayment === "paypal" && (
                            <div className="form-section">
                                <h3 className="section-title">Billing address</h3>
                                <div className="payment-options-wrap">
                                    <label className={`payment-option${billingOption === "same" ? " active" : ""}`}>
                                        <input type="radio" name="billing" value="same" checked={billingOption === "same"} onChange={() => setBillingOption("same")} />
                                        <span className="payment-option-label">Same as shipping address</span>
                                    </label>
                                    <label className={`payment-option${billingOption === "different" ? " active" : ""}`}>
                                        <input type="radio" name="billing" value="different" checked={billingOption === "different"} onChange={() => setBillingOption("different")} />
                                        <span className="payment-option-label">Use a different billing address</span>
                                    </label>
                                </div>
                                {billingOption === "different" && (
                                    <div className="billing-fields" style={{ marginTop: 12 }}>
                                        <div className="field-wrap">
                                            <select className="field-input field-select" defaultValue="US">
                                                <option value="US">United States</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="NG">Nigeria</option>
                                                <option value="CA">Canada</option>
                                                <option value="FR">France</option>
                                                <option value="DE">Germany</option>
                                                <option value="JP">Japan</option>
                                                <option value="DZ">Algeria</option>
                                            </select>
                                            <label className="field-label field-label--raised">Country/Region</label>
                                            <svg className="select-chevron" width="11" height="7" viewBox="0 0 11 7" fill="none">
                                                <path d="M1 1l4.5 4.5L10 1" stroke="#555" strokeWidth="1.4" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <div className="field-row">
                                            <div className="field-wrap">
                                                <input className="field-input" type="text" placeholder=" " id="p-billing-fname" />
                                                <label className="field-label" htmlFor="p-billing-fname">First name</label>
                                            </div>
                                            <div className="field-wrap">
                                                <input className="field-input" type="text" placeholder=" " id="p-billing-lname" />
                                                <label className="field-label" htmlFor="p-billing-lname">Last name</label>
                                            </div>
                                        </div>
                                        <div className="field-wrap">
                                            <input className="field-input" type="text" placeholder=" " id="p-billing-company" />
                                            <label className="field-label" htmlFor="p-billing-company">Company (optional)</label>
                                        </div>
                                        <div className="field-wrap">
                                            <input className="field-input" type="text" placeholder=" " id="p-billing-address" />
                                            <label className="field-label" htmlFor="p-billing-address">Address</label>
                                        </div>
                                        <div className="field-wrap">
                                            <input className="field-input" type="text" placeholder=" " id="p-billing-apt" />
                                            <label className="field-label" htmlFor="p-billing-apt">Apartment, suite, etc. (optional)</label>
                                        </div>
                                        <div className="field-row">
                                            <div className="field-wrap">
                                                <input className="field-input" type="text" placeholder=" " id="p-billing-zip" />
                                                <label className="field-label" htmlFor="p-billing-zip">Postal code (optional)</label>
                                            </div>
                                            <div className="field-wrap">
                                                <input className="field-input" type="text" placeholder=" " id="p-billing-city" />
                                                <label className="field-label" htmlFor="p-billing-city">City</label>
                                            </div>
                                        </div>
                                        <div className="field-wrap field-wrap--icon">
                                            <input className="field-input" type="tel" placeholder=" " id="p-billing-phone" />
                                            <label className="field-label" htmlFor="p-billing-phone">Phone (optional)</label>
                                            <button className="field-icon-btn" type="button">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#aaa" strokeWidth="1.3">
                                                    <circle cx="8" cy="8" r="6.5" />
                                                    <path d="M7 7h1v4h1M8 5.5v.5" strokeLinecap="round" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Legal */}
                        <p className="legal-copy">
                            By clicking below and placing your order, you agree (i) to make your purchase from Global-e as merchant of record, subject to Global-e&apos;s{" "}
                            <a href="#">Terms &amp; Conditions</a>; (ii) that your information will be handled by Global-e in accordance with the Global-e{" "}
                            <a href="#">Privacy Policy</a>; and (iii) that your information will be shared between Global-e and Aimé Leon Dore.
                        </p>

                        {/* Add discount */}
                        <div className="add-discount-wrap">
                            <button type="button" className="add-discount-btn" onClick={() => setShowDiscount(v => !v)}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                                    <line x1="7" y1="7" x2="7.01" y2="7" />
                                </svg>
                                Add discount
                            </button>
                            {showDiscount && (
                                <div className="inline-discount-panel">
                                    <input className="inline-discount-input" type="text" placeholder="Discount code or gift card" value={discountCode} onChange={e => setDiscountCode(e.target.value)} />
                                    <button type="button" className="inline-discount-apply">Apply</button>
                                </div>
                            )}
                        </div>

                        {/* Desktop Pay Now */}
                        <button type="button" className="pay-now-btn pay-now-btn--desktop">Pay now</button>

                    </div>{/* end form-body */}

                    {/* ── Mobile bottom: total row + Pay Now ── */}
                    <div className="mob-bottom-section">
                        {bottomSummaryOpen && (
                            <div className="mob-bottom-summary">
                                <div className="mob-bottom-summary-header">
                                    <span className="mob-bottom-summary-title">Order summary</span>
                                    <button type="button" className="mob-bottom-summary-close" onClick={() => setBottomSummaryOpen(false)} aria-label="Close summary">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mob-bottom-items">
                                    {cartItems.map((item) => (
                                        <div className="mob-bottom-item" key={item.id}>
                                            <div className="mob-bottom-img-wrap">
                                                <img src={item.imgs?.[0]?.src} alt={item.imgs?.[0]?.alt || item.name} />
                                                <span className="mob-bottom-qty">{item.quantity}</span>
                                            </div>
                                            <div className="mob-bottom-item-info">
                                                <p className="mob-bottom-item-name">{item.name}</p>
                                                <p className="mob-bottom-item-variant">{item.color} / {item.size}</p>
                                            </div>
                                            <p className="mob-bottom-item-price">{convert(item.price)}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mob-bottom-discount">
                                    <input className="mob-bottom-discount-input" type="text" placeholder="Discount code or gift card" value={discountCode} onChange={e => setDiscountCode(e.target.value)} />
                                    <button type="button" className="mob-bottom-discount-btn">Apply</button>
                                </div>
                                <div className="mob-bottom-subtotals">
                                    <div className="mob-bottom-row">
                                        <span>Subtotal · {cartItems.length} items</span>
                                        <span>{convert(`$${subtotal}`)}</span>
                                    </div>
                                    <div className="mob-bottom-row">
                                        <span>Shipping</span>
                                        <span>FREE</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button type="button" className="mob-total-row-btn" onClick={() => setBottomSummaryOpen(v => !v)} aria-expanded={bottomSummaryOpen}>
                            <div className="mob-total-left">
                                {cartItems[0]?.imgs?.[0]?.src && (
                                    <img className="mob-total-img" src={cartItems[0].imgs[0].src} alt={cartItems[0].imgs[0].alt || cartItems[0].name} />
                                )}
                                <div className="mob-total-label-wrap">
                                    <span className="mob-total-label">Total</span>
                                    <span className="mob-total-item-count">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</span>
                                </div>
                            </div>
                            <div className="mob-total-right">
                                <span className="mob-total-amount"><small>{currency} </small>{convert(`$${subtotal}`)}</span>
                                <svg className={`mob-total-chevron${bottomSummaryOpen ? " rotated" : ""}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                        </button>

                        <button type="button" className="pay-now-btn pay-now-btn--mobile">Pay now</button>
                    </div>

                </div>{/* end checkout-left */}

                {/* ── RIGHT: Desktop order summary ── */}
                <div className="checkout-right">
                    <div className="right-sticky-header">
                        <span className="right-brand-name">AIMÉ LEON DORE</span>
                        <button type="button" className="right-bag-btn" onClick={handleBagClick} aria-label="Back to cart">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 01-8 0" />
                            </svg>
                            {cartItems.length > 0 && (
                                <span className="right-bag-badge">{cartItems.length}</span>
                            )}
                        </button>
                    </div>
                    <div className="right-scroll-area">
                        <div className={`right-items${cartItems.length >= 5 ? " right-items--scrollable" : ""}`} ref={rightItemsRef}>
                            {cartItems.map((item) => (
                                <div className="summary-item" key={item.id}>
                                    <div className="summary-img-wrap">
                                        <img src={item.imgs?.[0]?.src} alt={item.imgs?.[0]?.alt || item.name} />
                                        <span className="summary-qty">{item.quantity}</span>
                                    </div>
                                    <div className="summary-item-info">
                                        <p className="summary-item-name">{item.name}</p>
                                        <p className="summary-item-variant">{item.color} / {item.size}</p>
                                    </div>
                                    <p className="summary-item-price">{convert(item.price)}</p>
                                </div>
                            ))}
                        </div>
                        {showScrollPill && (
                            <button type="button" className="scroll-more-pill" onClick={handleScrollPill}>
                                Scroll for more items
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        )}
                        <div className="right-discount">
                            <input className="right-discount-input" type="text" placeholder="Discount code or gift card" value={discountCode} onChange={e => setDiscountCode(e.target.value)} />
                            <button type="button" className="right-discount-btn">Apply</button>
                        </div>
                        <div className="right-totals">
                            <div className="right-total-row">
                                <span>Subtotal · {cartItems.length} items</span>
                                <span>{convert(`$${subtotal}`)}</span>
                            </div>
                            <div className="right-total-row">
                                <span>Shipping</span>
                                <span className="free-label">FREE</span>
                            </div>
                            <div className="right-total-row right-total-row--total">
                                <span>Total</span>
                                <span><small>{currency}</small> {convert(`$${subtotal}`)}</span>
                            </div>
                        </div>
                        <div className="tax-box">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.3">
                                <circle cx="8" cy="8" r="6.5" />
                                <line x1="8" y1="7" x2="8" y2="11" />
                                <circle cx="8" cy="5.2" r="0.6" fill="rgba(255,255,255,0.55)" />
                            </svg>
                            <span>Local taxes, duties or customs clearance fees may apply</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
