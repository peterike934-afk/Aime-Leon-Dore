import { useRef, useEffect, useState } from "react"
import products from "../product"
import { useCart } from "../Components/CartContext"
import RecentlyViewedPanel from "./Recentlyview.jsx"

const ALL_CATEGORIES = [
    "Curated Selects", "New Arrivals", "Outerwear", "Sweaters",
    "Accessories", "Sweatshirts", "Shirting", "Headwear",
    "Footwear", "Pants", "Shorts", "Tees & Polos",
    "Suiting", "Jewelry", "Bags & Leather Goods", "Sweatpants",
]

const getCategoryGroup = (cat) => {
    if (["Sweaters"].includes(cat)) return "KNIT"
    if (["Outerwear","Sweatshirts","Sweatpants","Pants","Shorts","Shirting","Tees & Polos","Suiting"].includes(cat)) return "CLOTHING"
    if (["Accessories","Headwear","Jewelry","Bags & Leather Goods"].includes(cat)) return "ACCESSORIES"
    if (["Footwear"].includes(cat)) return "FOOTWEAR"
    return "CATEGORIES"
}

const HighlightMatch = ({ text, query }) => {
    if (!query) return <>{text}</>
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return <span style={{ color: "#bbb" }}>{text}</span>
    return (
        <>
            <span style={{ color: "#bbb" }}>{text.slice(0, idx)}</span>
            <span style={{ color: "#1a1a1a" }}>{text.slice(idx, idx + query.length)}</span>
            <span style={{ color: "#bbb" }}>{text.slice(idx + query.length)}</span>
        </>
    )
}

const ITEMS_PER_PAGE = 8

const Search = ({ isOpen, onClose, onNavigate, onCategorySelect, onDiscoverSelect }) => {
    const inputRef = useRef(null)
    const { recentlyViewed } = useCart()
    const [query, setQuery] = useState("")
    const [activeTab, setActiveTab] = useState("shop")
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
    const debounceRef = useRef(null)

    const [rvPanelItem, setRvPanelItem] = useState(null)
    const [rvPanelOpen, setRvPanelOpen] = useState(false)

    const handleRvClick = (product) => {
        setRvPanelItem(product)
        setRvPanelOpen(true)
    }

    const openRvFullDetails = (item) => {
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent("rv-full-details", { detail: item }))
        }, 50)
    }

    const filteredProducts = query.trim()
        ? products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
          )
        : []

    const filteredCategories = query.trim()
        ? ALL_CATEGORIES.filter(c => c.toLowerCase().includes(query.toLowerCase()))
        : []

    const hasResults = filteredProducts.length > 0
    const noResults = query.trim().length > 0 && !hasResults

    const groupedCategories = filteredCategories.reduce((acc, cat) => {
        const group = getCategoryGroup(cat)
        if (!acc[group]) acc[group] = []
        acc[group].push(cat)
        return acc
    }, {})

    const visibleProducts = filteredProducts.slice(0, visibleCount)
    const hasMore = visibleCount < filteredProducts.length

  useEffect(() => {
    if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 50)
    } else {
        setQuery("")
        setActiveTab("shop")
        setVisibleCount(ITEMS_PER_PAGE)
        if (inputRef.current) inputRef.current.value = ""
    }
}, [isOpen])

    useEffect(() => { setVisibleCount(ITEMS_PER_PAGE) }, [query])

    useEffect(() => {
        const handleKey = (e) => { if (e.key === "Escape") onClose() }
        document.addEventListener("keydown", handleKey)
        return () => document.removeEventListener("keydown", handleKey)
    }, [onClose])

    const handleInputChange = (e) => {
        const val = e.target.value
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            setQuery(val)
            setActiveTab("shop")
        }, 300)
    }

    const goToProduct = (id) => { onClose(); onNavigate("home") }
    const goToCategory = (cat) => { onClose(); onCategorySelect(cat); onNavigate("home") }

    if (!isOpen) return null

    return (
        <>
            <div className="search-wrapper">

                {/* ── Search bar ── */}
                <div className="search-header">
                    <input
                        ref={inputRef}
                        type="text"
                        className="search-input"
                        placeholder="SEARCH"
                        onChange={handleInputChange}
                    />
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {/* ── DEFAULT STATE ── */}
                {!query.trim() && (
                    <div className="search-dropdown">
                        <div className="dropdown-links">
                            <h4>Recommendations</h4>
                            <a href="#" onClick={e => { e.preventDefault(); onClose(); onDiscoverSelect("Curated Selects"); onNavigate("Curated Selects") }}>Curated Selects</a>
                            <a href="#" onClick={e => { e.preventDefault(); onClose(); onDiscoverSelect("New Arrivals");  onNavigate("New Arrivals") }}>New Arrivals</a>
                            <a href="#" onClick={e => { e.preventDefault(); onClose(); onCategorySelect("Outerwear"); onNavigate("Outerwear") }}>Outerwear</a>
                            <a href="#" onClick={e => { e.preventDefault(); onClose(); onCategorySelect("Sweaters"); onNavigate("Sweaters") }}>Sweaters</a>
                            <a href="#" onClick={e => { e.preventDefault(); onClose(); onCategorySelect("Accessories"); onNavigate("Accessories") }}>Accessories</a>
                        </div>
                        <div className="dropdown-image">
                            <div className="image-card" onClick={() => { onClose(); onNavigate("lookbook") }}>
                                <img src="./searchA.png" alt="Lookbook" />
                                <span className="image-label">LOOKBOOK</span>
                            </div>
                            <div className="image-card" onClick={() => { onClose(); onNavigate("news") }}>
                                <img src="./searchB.png" alt="News" />
                                <span className="image-label">NEWS</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── ACTIVE SEARCH ── */}
                {query.trim() && (
                    <div className="search-results-wrapper">

                        {/* NO RESULTS */}
                        {noResults && (
                            <>
                                <div className="no-results-msg">
                                    No results found for &ldquo;{query}&rdquo;
                                </div>
                                {recentlyViewed.length > 0 && (
                                    <div className="recently-viewed-section">
                                        <p className="recently-viewed-label">RECENTLY VIEWED</p>
                                        <div className="recently-viewed-scroll">
                                            {recentlyViewed.map((product) => (
                                                <div key={product.id} className="rv-card" onClick={() => handleRvClick(product)}>
                                                    <div className="rv-img-wrap">
                                                        <img src={product.imgs[0].src} alt={product.imgs[0].alt} />
                                                    </div>
                                                    <div className="result-info">
                                                        <span className="result-name">{product.name}</span>
                                                        <span className="result-price">{product.price}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* HAS RESULTS */}
                        {hasResults && (
                            <>
                                {/* Suggestions */}
                                {filteredCategories.length > 0 && (
                                    <div className="search-suggestions">
                                        {Object.entries(groupedCategories).map(([group, cats]) => (
                                            <div key={group} className="suggestion-group">
                                                <span className="suggestion-group-label">{group}</span>
                                                {cats.map((cat) => (
                                                    <a
                                                        key={cat}
                                                        href={`/shopall?category=${encodeURIComponent(cat)}`}
                                                        className="suggestion-link"
                                                        onClick={(e) => { e.preventDefault(); goToCategory(cat) }}
                                                    >
                                                        <HighlightMatch text={cat.toUpperCase()} query={query} />
                                                    </a>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Tabs */}
                                <div className="results-tabs">
                                    <button
                                        className={`tab-btn ${activeTab === "shop" ? "active" : ""}`}
                                        onClick={() => setActiveTab("shop")}
                                    >
                                        SHOP ({filteredProducts.length})
                                    </button>
                                    <button
                                        className={`tab-btn ${activeTab === "news" ? "active" : ""}`}
                                        onClick={() => setActiveTab("news")}
                                    >
                                        NEWS (0)
                                    </button>
                                </div>

                                {/* Product grid */}
                                {activeTab === "shop" && (
                                    <>
                                        <div className="results-grid">
                                            {visibleProducts.map((product) => (
                                                <div
                                                    key={product.id}
                                                    className="result-card"
                                                    onClick={() => goToProduct(product.id)}
                                                >
                                                    <div className="result-img-wrap">
                                                        <img src={product.imgs[0].src} alt={product.imgs[0].alt} />
                                                    </div>
                                                    <div className="result-info">
                                                        <span className="result-name">{product.name}</span>
                                                        <span className="result-price">{product.price}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {hasMore && (
                                            <div className="view-more-wrap">
                                                <button
                                                    className="view-more-btn"
                                                    onClick={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}
                                                >
                                                    VIEW MORE
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}

                                {activeTab === "news" && (
                                    <div className="no-results-msg">
                                        No news results for &ldquo;{query}&rdquo;
                                    </div>
                                )}

                                {/* Recently Viewed */}
                                {recentlyViewed.length > 0 && (
                                    <div className="recently-viewed-section">
                                        <p className="recently-viewed-label">RECENTLY VIEWED</p>
                                        <div className="recently-viewed-scroll">
                                            {recentlyViewed.map((product) => (
                                                <div key={product.id} className="rv-card" onClick={() => handleRvClick(product)}>
                                                    <div className="rv-img-wrap">
                                                        <img src={product.imgs[0].src} alt={product.imgs[0].alt} />
                                                    </div>
                                                    <div className="result-info">
                                                        <span className="result-name">{product.name}</span>
                                                        <span className="result-price">{product.price}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
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
                        openRvFullDetails(item)
                    }}
                />
            )}
        </>
    )
}

export default Search
