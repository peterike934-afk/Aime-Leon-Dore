import { useState, useEffect } from "react"
import RefinePanel from "./RefinePanel"
import Sort from "../Sort"
import "./Lookbook.css"
import ProductDetail from "../ProductDetail.jsx"
import { useCart } from "./CartContext.jsx"
import RecentlyViewedPanel from "./Recentlyview.jsx"
import { SliderImage } from "../Imageslider.jsx"

const lookbookImages = [
    { id: 1,  src: "/lookbook1.png",  alt: "SS26 Look 1"  },
    { id: 2,  src: "/lookbook2.png",  alt: "SS26 Look 2"  },
    { id: 3,  src: "/lookbook3.png",  alt: "SS26 Look 3"  },
    { id: 4,  src: "/lookbook4.png",  alt: "SS26 Look 4"  },
    { id: 5,  src: "/lookbook5.png",  alt: "SS26 Look 5"  },
    { id: 6,  src: "/lookbook6.png",  alt: "SS26 Look 6"  },
    { id: 7,  src: "/lookbook7.png",  alt: "SS26 Look 7"  },
    { id: 8,  src: "/lookbook8.png",  alt: "SS26 Look 8"  },
    { id: 11, src: "/lookbook11.png", alt: "SS26 Look 11" },
    { id: 12, src: "/lookbook12.png", alt: "SS26 Look 12" },
    { id: 13, src: "/lookbook13.png", alt: "SS26 Look 13" },
    { id: 14, src: "/lookbook14.png", alt: "SS26 Look 14" },
    { id: 15, src: "/lookbook15.png", alt: "SS26 Look 15" },
    { id: 16, src: "/lookbook16.png", alt: "SS26 Look 16" },
    { id: 17, src: "/lookbook17.png", alt: "SS26 Look 17" },
    { id: 18, src: "/lookbook18.png", alt: "SS26 Look 18" },
]

const allProducts = [
    { id: 2,  src: "/3.png",       imgs: [{ src: "/3.png",       alt: "Crewneck Sweater" }, { src: "/3_alt.png", alt: "Crewneck Sweater - Alternative View" }], name: "Crewneck Sweater", price: 295, color: "Grey"  },
    { id: 7,  src: "/ss267.png",   imgs: [{ src: "/ss267.png",   alt: "Pleated Trouser"  }], name: "Pleated Trouser",  price: 325, color: "Black" },
    { id: 8,  src: "/ss268.png",   imgs: [{ src: "/ss268.png",   alt: "Oxford Shirt"     }], name: "Oxford Shirt",     price: 225, color: "White" },
    { id: 9,  src: "/5.png",       imgs: [{ src: "/5.png",       alt: "Track Jacket"     }], name: "Track Jacket",     price: 350, color: "Navy"  },
    { id: 10, src: "/ss2610.png",  imgs: [{ src: "/ss2610.png",  alt: "Coaches Jacket"   }], name: "Coaches Jacket",   price: 450, color: "Olive" },
    { id: 12, src: "/ss2612.png",  imgs: [{ src: "/ss2612.png",  alt: "Knit Polo"        }], name: "Knit Polo",        price: 195, color: "White" },
    { id: 13, src: "/ss2613.png",  imgs: [{ src: "/ss2613.png",  alt: "Nylon Short"      }], name: "Nylon Short",      price: 175, color: "Black" },
    { id: 14, src: "/ss2614.png",  imgs: [{ src: "/ss2614.png",  alt: "Terry Sweatshirt" }], name: "Terry Sweatshirt", price: 265, color: "Grey"  },
    { id: 15, src: "/ss2615.png",  imgs: [{ src: "/ss2615.png",  alt: "Leather Loafer"   }], name: "Leather Loafer",   price: 595, color: "Brown" },
    { id: 16, src: "/ss2616.png",  imgs: [{ src: "/ss2616.png",  alt: "Canvas Tote"      }], name: "Canvas Tote",      price: 145, color: "Khaki" },
    { id: 17, src: "/ss2617.png",  imgs: [{ src: "/ss2617.png",  alt: "Reversible Vest"  }], name: "Reversible Vest",  price: 385, color: "Navy"  },
]

const NAV_HEIGHT = 52

function toProduct(p) {
    return {
        id: String(p.id),
        name: p.name,
        price: p.soldOut ? "$0" : `$${p.price}`,
        imgs: p.imgs ?? [{ src: p.src || "", alt: p.name }],
        isSale: false,
        soldOut: p.soldOut || false,
    }
}

export default function Lookbook({ openDrawer }) {
    const { addToRecentlyViewed, recentlyViewed } = useCart()

    const [refineOpen,    setRefineOpen]    = useState(false)
    const [sortOpen,      setSortOpen]      = useState(false)
    const [sortLabel,     setSortLabel]     = useState("Recommended")
    const [isMobile,      setIsMobile]      = useState(window.innerWidth <= 768)
    const [localFilters,  setLocalFilters]  = useState({
        selectedColors: null,
        selectedSizes: [],
        selectedView: 4,
        hideSoldOut: false,
        showSaleOnly: false,
    })

    const [selectedProduct,   setSelectedProduct]   = useState(null)
    const [productDetailOpen, setProductDetailOpen] = useState(false)
    const [rvPanelItem,       setRvPanelItem]       = useState(null)
    const [rvPanelOpen,       setRvPanelOpen]       = useState(false)

    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth <= 768)
        window.addEventListener("resize", handler)
        return () => window.removeEventListener("resize", handler)
    }, [])

    useEffect(() => {
        const anyOpen = refineOpen || sortOpen
        if (anyOpen) {
            const scrollY = window.scrollY
            document.body.style.position = "fixed"
            document.body.style.top = `-${scrollY}px`
            document.body.style.width = "100%"
        } else {
            const scrollY = document.body.style.top
            document.body.style.position = ""
            document.body.style.top = ""
            document.body.style.width = ""
            if (scrollY) window.scrollTo(0, parseInt(scrollY || "0") * -1)
        }
        return () => {
            document.body.style.position = ""
            document.body.style.top = ""
            document.body.style.width = ""
        }
    }, [refineOpen, sortOpen])

    useEffect(() => {
        const handler = (e) => {
            setSelectedProduct(e.detail)
            setProductDetailOpen(true)
        }
        window.addEventListener("rv-full-details", handler)
        return () => window.removeEventListener("rv-full-details", handler)
    }, [])

    const handleSortOpen = () => {
        setRefineOpen(false)
        openDrawer("sort", () => setSortOpen(true))
    }

    const handleRefineOpen = () => {
        setSortOpen(false)
        openDrawer("refine", () => setRefineOpen(true))
    }

    const handleProductClick = (p) => {
        const product = toProduct(p)
        addToRecentlyViewed(product)
        setSelectedProduct(product)
        setProductDetailOpen(true)
    }

    const handleRvClick = (product) => {
        setRvPanelItem(product)
        setRvPanelOpen(true)
    }

    const openRvFullDetails = (item) => {
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent("rv-full-details", { detail: item }))
        }, 50)
    }

    const filteredProducts = allProducts.filter((p) => {
        if (localFilters.selectedColors && !p.color?.toLowerCase().includes(localFilters.selectedColors.toLowerCase())) return false
        if (localFilters.hideSoldOut && p.soldOut) return false
        if (localFilters.showSaleOnly && !p.onSale) return false
        return true
    })

    const sortedProducts = (() => {
        const arr = [...filteredProducts]
        if (sortLabel === "New arrivals")       return arr.filter(p => p.newArrival)
        if (sortLabel === "Price: Low to high") return arr.sort((a, b) => a.price - b.price)
        if (sortLabel === "Price: High to low") return arr.sort((a, b) => b.price - a.price)
        return arr
    })()

    const gridCols  = isMobile && localFilters.selectedView === 8 ? 4 : (localFilters.selectedView || 4)
    const isCompact = localFilters.selectedView === 8 || (isMobile && localFilters.selectedView === 4)

    return (
        <div className="lookbook">

            {/* Hero */}
            <div className="lookbook-hero">
                <p className="lookbook-date">February 18, 2026</p>
                <h1 className="lookbook-title">Spring / Summer 2026 Lookbook</h1>
                <a
                    href="#lb-collection"
                    className="lookbook-collection-link"
                    onClick={(e) => {
                        e.preventDefault()
                        document.getElementById("lb-collection")?.scrollIntoView({ behavior: "smooth" })
                    }}
                >
                    View the Collection
                </a>
            </div>

            {/* Lookbook image grid */}
            <div className="lookbook-grid">
                {lookbookImages.map((img) => (
                    <div key={img.id} className="lookbook-cell">
                        <img src={img.src} alt={img.alt} />
                    </div>
                ))}
            </div>

            {/* Collection bar */}
            <div className="lookbook-bar" id="lb-collection">
                <span className="lookbook-bar-label">Spring / Summer 2026</span>
                <div className="lookbook-bar-actions">
                    <button className="lookbook-bar-btn" onClick={handleSortOpen}>
                        Sort: {sortLabel}
                    </button>
                    <button className="lookbook-bar-btn" onClick={handleRefineOpen}>
                        Refine
                    </button>
                </div>
            </div>

            {/* Products grid */}
            <div
                className={`lookbook-products${isCompact ? " lookbook-products--compact" : ""}`}
                style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
            >
                {sortedProducts.map((p) => (
                    <div key={p.id} className="lookbook-product" onClick={() => handleProductClick(p)}>
                        <div className="lookbook-product-image">
                            <SliderImage
                                images={p.imgs ?? [{ src: p.src, alt: p.name }]}
                                style={{ position: "absolute", inset: 0 }}
                            />
                        </div>
                        {!isCompact && (
                            <div className="lookbook-product-info">
                                <p className="lookbook-product-name">{p.name}</p>
                                <p className="lookbook-product-price">${p.price}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Recently Viewed */}
            {recentlyViewed?.length > 0 && (
                <div style={{ borderTop: "1px solid #e8e8e8", padding: isMobile ? "24px 16px 40px" : "24px 24px 48px" }}>
                    <p style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#aaa", margin: "0 0 20px", fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                        Recently Viewed
                    </p>
                    <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "8px", scrollbarWidth: "none" }}>
                        {recentlyViewed.slice(0, isMobile ? 6 : 8).map((product) => (
                            <div key={product.id} style={{ flexShrink: 0, width: isMobile ? "200px" : "260px", cursor: "pointer" }} onClick={() => handleRvClick(product)}>
                                <div style={{ width: isMobile ? "200px" : "260px", aspectRatio: "3/4", overflow: "hidden", marginBottom: "8px", background: "#f2f2f2" }}>
                                    {product.imgs?.[0]?.src && (
                                        <img src={product.imgs[0].src} alt={product.imgs[0].alt || product.name}
                                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                    )}
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px", fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                                    <p style={{ fontSize: "10px", margin: 0, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "#1a1a1a" }}>{product.name}</p>
                                    <p style={{ fontSize: "10px", color: "#888", margin: 0, flexShrink: 0 }}>{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Sort
                isOpen={sortOpen}
                onClose={() => setSortOpen(false)}
                sortLabel={sortLabel}
                onSelect={(label) => { setSortLabel(label); setSortOpen(false) }}
                topOffset={NAV_HEIGHT}
            />

            <RefinePanel
                isOpen={refineOpen}
                onClose={() => setRefineOpen(false)}
                topOffset={NAV_HEIGHT}
                onFilterChange={(filters) => setLocalFilters(prev => ({ ...prev, ...filters }))}
            />

            <ProductDetail
                isOpen={productDetailOpen}
                product={selectedProduct}
                onClose={() => { setProductDetailOpen(false); setSelectedProduct(null) }}
                onCheckout={() => { setProductDetailOpen(false); setSelectedProduct(null) }}
                onViewCart={() => { setProductDetailOpen(false); setSelectedProduct(null) }}
            />

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
        </div>
    )
}
