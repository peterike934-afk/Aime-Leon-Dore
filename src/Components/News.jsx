import { useState, useEffect } from "react"
import "./News.css"
import ProductDetail from "../ProductDetail.jsx"
import { useCart } from "./CartContext.jsx"
import RecentlyViewedPanel from "./Recentlyview.jsx"
import { SliderImage } from "../imageslider.jsx"
import RefinePanel from "./RefinePanel"
import Sort from "../Sort"

function useIsMobile(breakpoint = 640) {
    const [isMobile, setIsMobile] = useState(
        () => typeof window !== "undefined" ? window.innerWidth < breakpoint : false
    )
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < breakpoint)
        window.addEventListener("resize", handler)
        return () => window.removeEventListener("resize", handler)
    }, [breakpoint])
    return isMobile
}

const NAV_HEIGHT = 52

const newsItems = [
    {
        id: 1,
        layout: "grid",
        title: "Spring / Summer '26 Delivery 3",
        date: "March 25, 2026",
        description: "Travis Bennett for Spring / Summer '26\nphotographed by Liam MacRae.",
        cover: "/lk1.png",
        images: ["/deli3.png", "/deli7.png", "/deli4.png", "/deli5.png", "/deli6.png", "/deli8.png"],
        products: [
            {
                name: "Delivery 3 Jacket",
                price: "$348",
                imgs: [
                    { src: "/deli3.png", alt: "Jacket front" },
                    { src: "/deli4.png", alt: "Jacket back" },
                    { src: "/deli5.png", alt: "Jacket detail" },
                ]
            }
        ]
    },
    {
        id: 2,
        layout: "video-portrait",
        title: "Aimé Leon Dore / Technics",
        date: "March 18, 2026",
        description: "Aimé Leon Dore x Technics.",
        cover: "/lk2.png",
        video: "/ald-technics.mp4",
        images: ["/nic1.png", "/nic2.png", "/nic3.png", "/nic4.png"],
        products: [],
    },
    {
        id: 3,
        layout: "video-portrait",
        title: "Spring / Summer '26 Delivery 2",
        date: "March 11, 2026",
        description: "Spring / Summer '26 Delivery 2.",
        cover: "/lk3.png",
        video: "/news3-video.mp4",
        images: ["/nic.png", "/nic.png", "/nic.png", "/nic.png", "/nic.png", "/nic.png"],
        products: [],
    },
    {
        id: 4,
        layout: "grid",
        title: "Spring / Summer '26 Uniform",
        date: "February 25, 2026",
        description: "Spring / Summer '26 Uniform.",
        cover: "/47.png",
        images: ["/news4-1.jpg", "/news4-2.jpg", "/news4-3.jpg", "/news4-4.jpg"],
        products: [],
    },
    {
        id: 5,
        layout: "spotify",
        title: "Spring / Summer 2026 Lookbook",
        date: "February 18, 2026",
        description: "Spring / Summer 2026 Lookbook.",
        cover: "/lk5.png",
        appleMusicEmbed: "https://embed.music.apple.com/us/playlist/YOUR_PLAYLIST/pl.YOUR_ID",
        spotifyEmbed: "https://open.spotify.com/embed/playlist/YOUR_PLAYLIST_ID?utm_source=generator",
        images: [],
        products: [],
    },
    {
        id: 6,
        layout: "video-portrait",
        title: "ALD / New Balance",
        date: "February 10, 2026",
        description: "ALD / New Balance.",
        cover: "/lk6.png",
        video: "/news6-video.mp4",
        images: ["/news6-1.jpg", "/news6-2.jpg"],
        products: [],
    },
    {
        id: 7,
        layout: "video-only",
        title: "Winter '25 Delivery 3",
        date: "January 28, 2026",
        description: "Winter '25 Delivery 3.",
        cover: "/lk7.png",
        video: "/news7-video.mp4",
        images: [],
        products: [],
    },
    {
        id: 8,
        layout: "three-portrait",
        title: "ALD / Porsche",
        date: "January 15, 2026",
        description: "ALD / Porsche.",
        cover: "/lk8.png",
        images: ["/news8-1.jpg", "/news8-2.jpg", "/news8-3.jpg", "/news8-4.jpg"],
        products: [],
    },
    {
        id: 9,
        layout: "three-portrait",
        title: "Winter '25 Delivery 2",
        date: "January 5, 2026",
        description: "Winter '25 Delivery 2.",
        cover: "/lk9.png",
        images: ["/news9-1.jpg", "/news9-2.jpg", "/news9-3.jpg", "/news9-4.jpg"],
        products: [],
    },
    {
        id: 10,
        layout: "video-only",
        title: "Holiday 2025",
        date: "December 10, 2025",
        description: "Holiday 2025.",
        cover: "/lk10.png",
        video: "/news10-video.mp4",
        images: [],
        products: [],
    },
]

function toProduct(p) {
    return {
        id: p.name,
        name: p.name,
        price: p.soldOut ? "$0" : p.price,
        imgs: p.imgs?.length ? p.imgs : p.src ? [{ src: p.src, alt: p.name }] : [],
        isSale: false,
        soldOut: p.soldOut || false,
    }
}

function ShopTheLookPanel({ isOpen, onClose }) {
    const lookProducts = [
        { id: 1, name: "Nylon Logo Hat",                 price: "$68"  },
        { id: 2, name: "Sun Faded Crewneck Quarter Zip", price: "$248" },
        { id: 3, name: "Crewneck Quarter Zip",           price: "$248" },
        { id: 4, name: "Credi Casual Short",             price: "$128", soldOut: true },
    ]
    return (
        <>
            <div className={`stl-backdrop${isOpen ? " active" : ""}`} onClick={onClose} />
            <div className={`stl-panel${isOpen ? " active" : ""}`}>
                <div className="stl-header">
                    <span className="stl-title">Shop The Look</span>
                    <button className="stl-close" onClick={onClose}>✕</button>
                </div>
                <div className="stl-grid">
                    {lookProducts.map((p) => (
                        <div key={p.id} className="stl-product">
                            <div className="stl-product-image" />
                            <div className="stl-product-info">
                                <p className="stl-product-name">{p.name}</p>
                                <p className={`stl-product-price${p.soldOut ? " sold-out" : ""}`}>
                                    {p.soldOut ? "Sold Out" : p.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

function PhotoView({ photo, photos, currentIndex, onClose, onNavigate }) {
    const [shopOpen, setShopOpen] = useState(false)
    return (
        <div className="photo-view">
            <button className="photo-view-close" onClick={onClose}>✕</button>
            {currentIndex > 0 && (
                <button className="photo-view-arrow photo-view-arrow--prev" onClick={() => onNavigate(currentIndex - 1)}>&#8249;</button>
            )}
            {currentIndex < photos.length - 1 && (
                <button className="photo-view-arrow photo-view-arrow--next" onClick={() => onNavigate(currentIndex + 1)}>&#8250;</button>
            )}
            <div className="photo-view-inner">
                <div className="photo-view-image">
                    {photo && <img src={photo} alt="" />}
                </div>
                <button className="photo-view-shop-btn" onClick={() => setShopOpen(true)}>
                    Shop The Look
                </button>
            </div>
            <ShopTheLookPanel isOpen={shopOpen} onClose={() => setShopOpen(false)} />
        </div>
    )
}

function ArticleMedia({ article, onPhotoClick }) {
    const { layout, images = [], video, spotifyEmbed } = article

    switch (layout) {
        case "grid":
            return (
                <div className="article-photo-grid">
                    {images.map((src, i) => (
                        <div key={i} className="article-photo-cell" onClick={() => onPhotoClick(i)}>
                            <img src={src} alt="" />
                        </div>
                    ))}
                </div>
            )

        case "video-portrait":
            return (
                <>
                    {video && (
                        <div className="article-hero-video">
                            <video src={video} autoPlay muted loop playsInline />
                        </div>
                    )}
                    <div className="article-two-portrait">
                        {images.map((src, i) => (
                            <div key={i} className="article-portrait-cell" onClick={() => onPhotoClick(i)}>
                                <img src={src} alt="" />
                            </div>
                        ))}
                    </div>
                </>
            )

        case "video-only":
            return (
                <div className="article-hero-video article-hero-video--full">
                    {video && <video src={video} autoPlay muted loop playsInline />}
                </div>
            )

        case "three-portrait":
            return (
                <div className="article-three-portrait">
                    {images.map((src, i) => (
                        <div key={i} className="article-portrait-cell" onClick={() => onPhotoClick(i)}>
                            <img src={src} alt="" />
                        </div>
                    ))}
                </div>
            )

        case "spotify":
            return (
                <div className="article-spotify-layout">
                    {article.appleMusicEmbed && (
                        <div className="article-apple-embed">
                            <iframe
                                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                                frameBorder="0"
                                height="450"
                                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                                src={article.appleMusicEmbed}
                                title="Apple Music Playlist"
                            />
                        </div>
                    )}
                    {spotifyEmbed && (
                        <div className="article-spotify-embed article-spotify-embed--full">
                            <iframe
                                src={spotifyEmbed}
                                width="100%"
                                height="352"
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                title="Spotify Playlist"
                            />
                        </div>
                    )}
                </div>
            )

        default:
            return null
    }
}

function ArticlePage({ article, onBack, openDrawer }) {
    const { addToRecentlyViewed, recentlyViewed } = useCart()
    const isMobile = useIsMobile()

    const [activeIndex,       setActiveIndex]       = useState(null)
    const [selectedProduct,   setSelectedProduct]   = useState(null)
    const [productDetailOpen, setProductDetailOpen] = useState(false)
    const [rvPanelItem,       setRvPanelItem]       = useState(null)
    const [rvPanelOpen,       setRvPanelOpen]       = useState(false)
    const [refineOpen,        setRefineOpen]        = useState(false)
    const [sortOpen,          setSortOpen]          = useState(false)
    const [sortLabel,         setSortLabel]         = useState("Recommended")
    const [localFilters,      setLocalFilters]      = useState({
        selectedColors: null,
        selectedSizes: [],
        selectedView: 4,
        hideSoldOut: false,
        showSaleOnly: false,
    })

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

    const handleProductClick = (raw) => {
        const product = toProduct(raw)
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

    const showShopSection = article.layout !== "video-only" && article.layout !== "spotify"

    const rawProducts = article.products?.length
        ? article.products
        : Array.from({ length: 8 }, () => ({
            name: "Product Name",
            price: "$000",
            imgs: [],
            color: null,
            soldOut: false,
            onSale: false,
        }))

    const filteredProducts = rawProducts.filter((p) => {
        if (localFilters.selectedColors && p.color?.toLowerCase() !== localFilters.selectedColors.toLowerCase()) return false
        if (localFilters.hideSoldOut && p.soldOut) return false
        if (localFilters.showSaleOnly && !p.onSale) return false
        return true
    })

    const sortedProducts = (() => {
        const arr = [...filteredProducts]
        if (sortLabel === "Price: Low to high") return arr.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        if (sortLabel === "Price: High to low") return arr.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
        return arr
    })()

    const gridCols  = isMobile && localFilters.selectedView === 8 ? 4 : (localFilters.selectedView || 4)
    const isCompact = localFilters.selectedView === 8 || (isMobile && localFilters.selectedView === 4)

    return (
        <div className="article-page">

            <button className="article-back" onClick={onBack}>← News</button>

            <div className="article-hero">
                <p className="article-date">{article.date}</p>
                <h1 className="article-title">{article.title}</h1>
                <p className="article-desc">{article.description}</p>
                {showShopSection && (
                    <a href="#article-collection" className="article-collection-link"
                        onClick={(e) => {
                            e.preventDefault()
                            document.getElementById("article-collection")?.scrollIntoView({ behavior: "smooth" })
                        }}>
                        View the Collection
                    </a>
                )}
            </div>

            <ArticleMedia article={article} onPhotoClick={(i) => setActiveIndex(i)} />

            {showShopSection && (
                <>
                    <div className="article-bar" id="article-collection">
                        <span className="article-bar-label">{article.title}</span>
                        <div className="article-bar-actions">
                            <button className="article-bar-btn" onClick={handleSortOpen}>
                                Sort: {sortLabel}
                            </button>
                            <button className="article-bar-btn" onClick={handleRefineOpen}>
                                Refine
                            </button>
                        </div>
                    </div>

                    <div
                        className={`article-products${isCompact ? " article-products--compact" : ""}`}
                        style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
                    >
                        {sortedProducts.map((p, i) => (
                            <div key={i} className="article-product" onClick={() => handleProductClick(p)}>
                                <div className="article-product-image">
                                    <SliderImage
                                        images={
                                            p.imgs?.length ? p.imgs
                                            : p.src ? [{ src: p.src, alt: p.name }]
                                            : []
                                        }
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </div>
                                {!isCompact && (
                                    <div className="article-product-info">
                                        <p className="article-product-name">{p.name}</p>
                                        <p className="article-product-price">
                                            {p.soldOut ? "Sold Out" : p.price}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}

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

            {activeIndex !== null && article.images?.length > 0 && (
                <PhotoView
                    photo={article.images[activeIndex]}
                    photos={article.images}
                    currentIndex={activeIndex}
                    onClose={() => setActiveIndex(null)}
                    onNavigate={(i) => setActiveIndex(i)}
                />
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

// News receives openDrawer from App and passes it into ArticlePage
export default function News({ openArticleId, onArticleOpened, openDrawer }) {
    const [activeArticle, setActiveArticle] = useState(null)

    useEffect(() => {
        if (openArticleId) {
            const found = newsItems.find(n => n.id === openArticleId)
            if (found) {
                setActiveArticle(found)
                onArticleOpened?.()
            }
        }
    }, [openArticleId])

    if (activeArticle) {
        return (
            <ArticlePage
                article={activeArticle}
                onBack={() => setActiveArticle(null)}
                openDrawer={openDrawer}
            />
        )
    }

    return (
        <div className="news-page">
            <div className="news-header">
                <h1 className="news-heading">News</h1>
            </div>
            <div className="news-grid">
                {newsItems.map((item) => (
                    <div key={item.id} className="news-card" onClick={() => setActiveArticle(item)}>
                        <div className="news-card-image">
                            {item.cover && <img src={item.cover} alt={item.title} />}
                        </div>
                        <div className="news-card-info">
                            <p className="news-card-title">{item.title}</p>
                            <p className="news-card-date">{item.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
