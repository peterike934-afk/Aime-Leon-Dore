import { useState } from "react";
import "./header.css";

const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <line x1="15.5" y1="15.5" x2="22" y2="22" />
    </svg>
);

const AccountIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
);

const CartIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
    </svg>
);

const MenuIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// ── Café wavy border SVG ─────────────────────────────────────────
const CafeWaveBorder = () => (
    <div style={{
        position: "absolute",
        bottom: "-18px",
        left: 0,
        right: 0,
        height: "20px",
        zIndex: 10,
        pointerEvents: "none",
        overflow: "hidden",
    }}>
        <svg
            viewBox="0 0 1440 20"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%", display: "block" }}
        >
            <path
                d="M0,10 C30,20 60,0 90,10 C120,20 150,0 180,10 C210,20 240,0 270,10 C300,20 330,0 360,10 C390,20 420,0 450,10 C480,20 510,0 540,10 C570,20 600,0 630,10 C660,20 690,0 720,10 C750,20 780,0 810,10 C840,20 870,0 900,10 C930,20 960,0 990,10 C1020,20 1050,0 1080,10 C1110,20 1140,0 1170,10 C1200,20 1230,0 1260,10 C1290,20 1320,0 1350,10 C1380,20 1410,0 1440,10 L1440,20 L0,20 Z"
                fill="#1a3a2a"
            />
        </svg>
    </div>
)

const SHOP_LINKS = [
    { label: "ALL PRODUCTS",         page: "shop" },
    { label: "NEW ARRIVALS",         page: "new-arrivals" },
    { label: "TEES & POLOS",         page: "tees-polos" },
    { label: "SWEATSHIRTS",          page: "sweatshirts" },
    { label: "SHIRTING",             page: "shirting" },
    { label: "SWEATERS",             page: "sweaters" },
    { label: "PANTS",                page: "pants" },
    { label: "SWEATPANTS",           page: "sweatpants" },
    { label: "SHORTS",               page: "shorts" },
    { label: "OUTERWEAR",            page: "outerwear" },
    { label: "SUITING",              page: "suiting" },
    { label: "FOOTWEAR",             page: "footwear" },
    { label: "HEADWEAR",             page: "headwear" },
    { label: "JEWELRY",              page: "jewelry" },
    { label: "BAGS & LEATHER GOODS", page: "bags" },
    { label: "ACCESSORIES",          page: "accessories" },
];

const EXPLORE_LINKS = [
    { label: "SS26 LOOKBOOK", page: "lookbook" },
    { label: "COLLECTIONS",  page: "collections" },
    { label: "NEWS",         page: "news" },
    { label: "ABOUT US",     page: "about" },
    { label: "STORES",       page: "stores" },
    { label: "CAFÉ",         page: "cafe" },
    { label: "SONNY",        page: "sonny" },
    { label: "SOUND",        page: "sound" },
];

export default function Header({
    onSearchOpen,
    onProfileOpen,
    onCartOpen,
    onNavigate,
    onA11yOpen,
    onShippingOpen,
    selectedCountry = { label: "US", currency: "USD" },
    isSignedIn = false,
    transparent = false,
    logoScrolled = false,
    isCafe = false,
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("shop");

    const openMenu = () => {
        setMenuOpen(true);
        setActiveTab("shop");
        document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
        setMenuOpen(false);
        document.body.classList.remove("menu-open");
    };

    const handleNavigate = (page) => {
        closeMenu();
        if (onNavigate) onNavigate(page);
    };

    // On cafe page: never show flower, always show text
    // On other pages: show flower when logoScrolled
    const showFlower = isCafe ? false : logoScrolled;

    // Cafe header styles
  const cafeHeaderStyle = isCafe ? {
    backgroundColor: "#1a3a2a",
    color: "#c9a84c",
    position: "relative",
    border: "none",
    borderBottom: "none",
    boxShadow: "none",
} : {};

    const cafeLogoStyle = isCafe ? {
        color: "#c9a84c",
    } : {};

    const cafeIconStyle = isCafe ? {
        color: "#c9a84c",
    } : {};

    return (
        <>
           <header
             className={`${transparent ? "header--transparent" : "header--solid"}${isCafe ? " cafe-header" : ""}`}
             style={cafeHeaderStyle}
>
                <div className="header-left" style={cafeIconStyle}>
                    <button onClick={openMenu} aria-label="Open menu" aria-expanded={menuOpen}>
                        <MenuIcon />
                    </button>
                </div>

                <button
                    className="logo"
                    onClick={() => handleNavigate("home")}
                    aria-label="Aimé Leon Dore — home"
                    style={cafeLogoStyle}
                >
                    {showFlower ? (
                        <img
                            src="/aimelogo.png"
                            alt="Aimé Leon Dore"
                            style={{ width: "25px", height: "auto", display: "block" }}
                        />
                    ) : isCafe ? (
                        "CAFÉ LEON DORE"
                    ) : (
                        "AIMÉ LEON DORE"
                    )}
                </button>

                <div className="header-right" style={cafeIconStyle}>
                    <button onClick={() => onSearchOpen && onSearchOpen()} aria-label="Search">
                        <SearchIcon />
                    </button>
                    <button
                        onClick={() => onProfileOpen && onProfileOpen()}
                        aria-label="Account"
                        className={isSignedIn ? "hide-on-mobile" : ""}
                        style={{ position: "relative" }}
                    >
                        <AccountIcon />
                        {isSignedIn && (
                            <span style={{
                                position: "absolute", top: "0px", right: "0px",
                                width: "7px", height: "7px", borderRadius: "50%",
                                backgroundColor: "#22c55e", display: "block",
                            }} />
                        )}
                    </button>
                    <button onClick={() => onCartOpen && onCartOpen()} aria-label="Cart">
                        <CartIcon />
                    </button>
                </div>

             </header>

            {/* Wave border — fixed below header, only on cafe page */}
  {/* Wave border — fixed below header, only on cafe page */}
{isCafe && (
    <div style={{
        position: "fixed",
        top: "50px",
        left: 0,
        right: 0,
        height: "22px",
        zIndex: 200,
        pointerEvents: "none",
        willChange: "transform",             /* prevents paint jitter */
        transform: "translateZ(0)",
    }}>
        <svg
            viewBox="0 0 1440 22"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "22px", display: "block" }}
        >
            {/* Gold scallops — shifted down by 2px to peek below green */}
            <path
                d="M0,0 L1440,0 L1440,10
                C1431,10 1428,18 1422,18 C1416,18 1413,10 1404,10
                C1395,10 1392,18 1386,18 C1380,18 1377,10 1368,10
                C1359,10 1356,18 1350,18 C1344,18 1341,10 1332,10
                C1323,10 1320,18 1314,18 C1308,18 1305,10 1296,10
                C1287,10 1284,18 1278,18 C1272,18 1269,10 1260,10
                C1251,10 1248,18 1242,18 C1236,18 1233,10 1224,10
                C1215,10 1212,18 1206,18 C1200,18 1197,10 1188,10
                C1179,10 1176,18 1170,18 C1164,18 1161,10 1152,10
                C1143,10 1140,18 1134,18 C1128,18 1125,10 1116,10
                C1107,10 1104,18 1098,18 C1092,18 1089,10 1080,10
                C1071,10 1068,18 1062,18 C1056,18 1053,10 1044,10
                C1035,10 1032,18 1026,18 C1020,18 1017,10 1008,10
                C999,10 996,18 990,18 C984,18 981,10 972,10
                C963,10 960,18 954,18 C948,18 945,10 936,10
                C927,10 924,18 918,18 C912,18 909,10 900,10
                C891,10 888,18 882,18 C876,18 873,10 864,10
                C855,10 852,18 846,18 C840,18 837,10 828,10
                C819,10 816,18 810,18 C804,18 801,10 792,10
                C783,10 780,18 774,18 C768,18 765,10 756,10
                C747,10 744,18 738,18 C732,18 729,10 720,10
                C711,10 708,18 702,18 C696,18 693,10 684,10
                C675,10 672,18 666,18 C660,18 657,10 648,10
                C639,10 636,18 630,18 C624,18 621,10 612,10
                C603,10 600,18 594,18 C588,18 585,10 576,10
                C567,10 564,18 558,18 C552,18 549,10 540,10
                C531,10 528,18 522,18 C516,18 513,10 504,10
                C495,10 492,18 486,18 C480,18 477,10 468,10
                C459,10 456,18 450,18 C444,18 441,10 432,10
                C423,10 420,18 414,18 C408,18 405,10 396,10
                C387,10 384,18 378,18 C372,18 369,10 360,10
                C351,10 348,18 342,18 C336,18 333,10 324,10
                C315,10 312,18 306,18 C300,18 297,10 288,10
                C279,10 276,18 270,18 C264,18 261,10 252,10
                C243,10 240,18 234,18 C228,18 225,10 216,10
                C207,10 204,18 198,18 C192,18 189,10 180,10
                C171,10 168,18 162,18 C156,18 153,10 144,10
                C135,10 132,18 126,18 C120,18 117,10 108,10
                C99,10 96,18 90,18 C84,18 81,10 72,10
                C63,10 60,18 54,18 C48,18 45,10 36,10
                C27,10 24,18 18,18 C12,18 9,10 0,10
                L0,0 Z"
                fill="#c9a84c"
            />

            {/* Green scallops on top — same original path */}
            <path
                d="M0,0 L1440,0 L1440,8
                C1431,8 1428,16 1422,16 C1416,16 1413,8 1404,8
                C1395,8 1392,16 1386,16 C1380,16 1377,8 1368,8
                C1359,8 1356,16 1350,16 C1344,16 1341,8 1332,8
                C1323,8 1320,16 1314,16 C1308,16 1305,8 1296,8
                C1287,8 1284,16 1278,16 C1272,16 1269,8 1260,8
                C1251,8 1248,16 1242,16 C1236,16 1233,8 1224,8
                C1215,8 1212,16 1206,16 C1200,16 1197,8 1188,8
                C1179,8 1176,16 1170,16 C1164,16 1161,8 1152,8
                C1143,8 1140,16 1134,16 C1128,16 1125,8 1116,8
                C1107,8 1104,16 1098,16 C1092,16 1089,8 1080,8
                C1071,8 1068,16 1062,16 C1056,16 1053,8 1044,8
                C1035,8 1032,16 1026,16 C1020,16 1017,8 1008,8
                C999,8 996,16 990,16 C984,16 981,8 972,8
                C963,8 960,16 954,16 C948,16 945,8 936,8
                C927,8 924,16 918,16 C912,16 909,8 900,8
                C891,8 888,16 882,16 C876,16 873,8 864,8
                C855,8 852,16 846,16 C840,16 837,8 828,8
                C819,8 816,16 810,16 C804,16 801,8 792,8
                C783,8 780,16 774,16 C768,16 765,8 756,8
                C747,8 744,16 738,16 C732,16 729,8 720,8
                C711,8 708,16 702,16 C696,16 693,8 684,8
                C675,8 672,16 666,16 C660,16 657,8 648,8
                C639,8 636,16 630,16 C624,16 621,8 612,8
                C603,8 600,16 594,16 C588,16 585,8 576,8
                C567,8 564,16 558,16 C552,16 549,8 540,8
                C531,8 528,16 522,16 C516,16 513,8 504,8
                C495,8 492,16 486,16 C480,16 477,8 468,8
                C459,8 456,16 450,16 C444,16 441,8 432,8
                C423,8 420,16 414,16 C408,16 405,8 396,8
                C387,8 384,16 378,16 C372,16 369,8 360,8
                C351,8 348,16 342,16 C336,16 333,8 324,8
                C315,8 312,16 306,16 C300,16 297,8 288,8
                C279,8 276,16 270,16 C264,16 261,8 252,8
                C243,8 240,16 234,16 C228,16 225,8 216,8
                C207,8 204,16 198,16 C192,16 189,8 180,8
                C171,8 168,16 162,16 C156,16 153,8 144,8
                C135,8 132,16 126,16 C120,16 117,8 108,8
                C99,8 96,16 90,16 C84,16 81,8 72,8
                C63,8 60,16 54,16 C48,16 45,8 36,8
                C27,8 24,16 18,16 C12,16 9,8 0,8
                L0,0 Z"
                fill="#1a3a2a"
            />
        </svg>
    </div>
)}
            <div
                className={`menu-overlay${menuOpen ? " active" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
            >
                <div className="menu-drawer">

                    <div className="drawer-watermark" aria-hidden="true">
                        <img src="/aimelogo.png" alt="" />
                    </div>

                    <div className="drawer-mobile-header">
                        <button className="drawer-mobile-close" onClick={closeMenu} aria-label="Close menu">
                            <CloseIcon />
                        </button>
                        <button className="drawer-mobile-logo" onClick={() => handleNavigate("home")}>
                            <img src="/aimelogo.png" alt="Aimé Leon Dore" style={{ width: "25px", height: "auto", display: "block" }} />
                        </button>
                        <div className="drawer-mobile-icons">
                            <button onClick={() => { closeMenu(); onSearchOpen && onSearchOpen(); }} aria-label="Search">
                                <SearchIcon />
                            </button>
                            {!isSignedIn && (
                                <button onClick={() => { closeMenu(); onProfileOpen && onProfileOpen(); }} aria-label="Account">
                                    <AccountIcon />
                                </button>
                            )}
                            <button onClick={() => { closeMenu(); onCartOpen && onCartOpen(); }} aria-label="Cart">
                                <CartIcon />
                            </button>
                        </div>
                    </div>

                    <div className="drawer-desktop-header">
                        <button className="drawer-close" onClick={closeMenu} aria-label="Close menu">
                            <CloseIcon />
                        </button>
                    </div>

                    <div className="drawer-split">

                        <div className="drawer-col drawer-col--shop">
                            <button
                                className={`drawer-col-tab${activeTab === "shop" ? " drawer-col-tab--active" : ""}`}
                                onClick={() => setActiveTab("shop")}
                            >
                                SHOP
                            </button>
                            {activeTab === "shop" && (
                                <nav className="menu-nav menu-nav--shop" aria-label="Shop navigation">
                                    {SHOP_LINKS.map((link) => (
                                        <a key={link.page} href="#"
                                            onClick={(e) => { e.preventDefault(); handleNavigate(link.page); }}
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                    {isSignedIn && (
                                        <a href="#"
                                            className="account-menu-link"
                                            onClick={(e) => { e.preventDefault(); closeMenu(); onProfileOpen && onProfileOpen(); }}
                                        >
                                            ACCOUNT <span className="account-green-dot" />
                                        </a>
                                    )}
                                </nav>
                            )}
                        </div>

                        <div className="drawer-col drawer-col--explore">
                            <button
                                className={`drawer-col-tab${activeTab === "explore" ? " drawer-col-tab--active" : ""}`}
                                onClick={() => setActiveTab("explore")}
                            >
                                EXPLORE
                            </button>
                            {activeTab === "explore" && (
                                <nav className="menu-nav" aria-label="Explore navigation">
                                    {EXPLORE_LINKS.map((link) => (
                                        <a key={link.page} href="#"
                                            onClick={(e) => { e.preventDefault(); handleNavigate(link.page); }}
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </nav>
                            )}
                        </div>

                    </div>

                    <div className="menu-footer">
                        <div className="newsletter">
                            <div className="newsletter__row">
                                <input type="email" placeholder="Enter your email" aria-label="Email for newsletter" />
                                <button type="button">Subscribe</button>
                            </div>
                            <div className="newsletter__disclaimer">
                                <p>By providing your email address, you agree to our <a href="#">Privacy Policy.</a></p>
                            </div>
                        </div>

                        <div className="footer-links">
                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate("client-services"); }}>Client Services</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate("legal-privacy"); }}>Legal &amp; Privacy</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavigate("careers"); }}>Careers</a>
                            <a href="https://www.instagram.com/aimeleon" target="_blank" rel="noreferrer">Instagram</a>
                            <a  href="#" onClick={(e) => { e.preventDefault(); closeMenu(); onA11yOpen && onA11yOpen(); }}>Accessibility</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); closeMenu(); onShippingOpen && onShippingOpen(); }}
                                className="shipping-row">
                                <span>Shipping To: {selectedCountry.label} / {selectedCountry.currency}</span>
                                <span className="shipping-arrow">›</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="menu-backdrop" onClick={closeMenu} aria-hidden="true" />
            </div>
        </>
    );
}