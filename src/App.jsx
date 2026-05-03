import React from "react"
import ProductCard from "./ProductCard.jsx"
import Product from "./product"
import Header from "./Header.jsx"
import Profile from "./Components/Profile.jsx"
import Entry from "./entry.jsx"
import Search from "./Components/Search.jsx"
import RefinePanel from "./Components/RefinePanel"
import ShopAllPanel from "./Components/ShopAllPanel"
import Cart from "./Components/Cart.jsx"
import Checkout from "./Components/Checkout.jsx"
import { CartProvider, useCart } from "./Components/CartContext.jsx"
import "./search.css"
import CountrySelector from "./Components/CountrySelector.jsx"
import ProductDetail from './ProductDetail.jsx'
import ClientServices from "./Components/ClientServices.jsx"
import LegalPrivacy from "./Components/LegalPrivacy.jsx"
import Careers from "./Components/Career.jsx"
import Accessibility from "./Components/Accessibity.jsx"
import About from "./Components/About.jsx"
import Lookbook from "./Components/Lookbook.jsx"
import Sort from "./Sort.jsx"
import News from "./Components/News.jsx"
import Store from "./Components/Store.jsx"
import Cafe from "./Components/Cafe.jsx"
import Sonny from "./Components/Sonny.jsx"
import Sound from './Components/Sound'
import Create from "./Components/Create.jsx"
import Collections from "./Components/Collections.jsx"
import Home from "./Home.jsx"
import "./Components/RefinePanel.css"
import FlowerSplash from "./FlowerSplash.jsx"
import DrawerLoader from "./DrawerLoader.jsx"

const HEADER_HEIGHT = 52
const PRODUCTS_PER_PAGE = 32

const CATEGORY_ORDER = [
  "Tees & Polos", "Sweatshirts", "Shirting", "Sweaters", "Pants",
  "Sweatpants", "Shorts", "Outerwear", "Suiting", "Footwear",
  "Headwear", "Jewelry", "Bags & Leather Goods", "Accessories", "Gift Cards",
]

const DISCOVER_ORDER = ["New Arrivals", "Curated Selects"]
const SEASON_ORDER   = ["Delivery 1", "Delivery 2", "Delivery 3"]

const NAV_CATEGORY_MAP = {
  "new-arrivals": { discover: "New Arrivals" },
  "tees-polos":   { category: "Tees & Polos" },
  "sweatshirts":  { category: "Sweatshirts" },
  "shirting":     { category: "Shirting" },
  "sweaters":     { category: "Sweaters" },
  "pants":        { category: "Pants" },
  "sweatpants":   { category: "Sweatpants" },
  "shorts":       { category: "Shorts" },
  "outerwear":    { category: "Outerwear" },
  "suiting":      { category: "Suiting" },
  "footwear":     { category: "Footwear" },
  "headwear":     { category: "Headwear" },
  "jewelry":      { category: "Jewelry" },
  "bags":         { category: "Bags & Leather Goods" },
  "accessories":  { category: "Accessories" },
}

// ── Drawer config ────────────────────────────────────────────────────────────
// Maps each logical drawer name → { side, width } so DrawerLoader can cover
// exactly the right panel. Adjust widths to match your actual panel CSS.
const DRAWER_CONFIG = {
  search:          { side: "right", width: 480 },
  profile:         { side: "right", width: 480 },
  cart:            { side: "right", width: 480 },
  checkout:        { side: "right", width: 480 },
  productDetail:   { side: "right", width: 480 },
  countrySelector: { side: "right", width: 480 },
  shopAll:         { side: "left",  width: 360 },  // ShopAllPanel opens from the left
  refine:          { side: "right", width: 360 },  // RefinePanel opens from the right
  sort:            { side: "right", width: 360 },  // Sort opens from the right
}
// ─────────────────────────────────────────────────────────────────────────────

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null
  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:"2px", padding:"48px 0 64px" }}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
        style={{ width:"36px", height:"36px", display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:currentPage===1?"default":"pointer", opacity:currentPage===1?0.25:0.6, fontSize:"18px", color:"inherit", transition:"opacity 0.15s" }}>
        &#8249;
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button key={p} onClick={() => onPageChange(p)}
          style={{ width:"36px", height:"36px", display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:currentPage===p?"1px solid currentColor":"1px solid transparent", cursor:"pointer", fontSize:"11px", letterSpacing:"0.08em", fontWeight:currentPage===p?"500":"400", opacity:currentPage===p?1:0.45, color:"inherit", transition:"opacity 0.15s" }}>
          {p}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
        style={{ width:"36px", height:"36px", display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:currentPage===totalPages?"default":"pointer", opacity:currentPage===totalPages?0.25:0.6, fontSize:"18px", color:"inherit", transition:"opacity 0.15s" }}>
        &#8250;
      </button>
    </div>
  )
}

function AppContent() {
  useCart()
  const { addToRecentlyViewed } = useCart()

  // ── PAGE SPLASH (refresh + shop) ──────────────────────────────────────────
  const [showSplash, setShowSplash]   = React.useState(true)
  const [shopLoading, setShopLoading] = React.useState(false)

  // ── DRAWER LOADER ─────────────────────────────────────────────────────────
  // drawerLoaderKey  — incremented on each open so DrawerLoader remounts fresh
  // drawerLoading    — whether the loader is visible
  // activeDrawer     — which logical drawer is opening ("search", "shopAll", …)
  const [drawerLoaderKey, setDrawerLoaderKey] = React.useState(0)
  const [drawerLoading, setDrawerLoading]     = React.useState(false)
  const [activeDrawer, setActiveDrawer]       = React.useState(null)

  /**
   * openDrawer(drawerName, openFn)
   *   drawerName — key in DRAWER_CONFIG ("search", "shopAll", "refine", …)
   *   openFn     — function that sets the panel's own isOpen state to true
   */
  const openDrawer = React.useCallback((drawerName, openFn) => {
    openFn()
    setActiveDrawer(drawerName)
    setDrawerLoaderKey(k => k + 1)
    setDrawerLoading(true)
  }, [])
  // ──────────────────────────────────────────────────────────────────────────

  const [discoverFilter, setDiscoverFilter]           = React.useState(null)
  const [seasonFilter, setSeasonFilter]               = React.useState(null)
  const [searchOpen, setSearchOpen]                   = React.useState(false)
  const [profileOpen, setProfileOpen]                 = React.useState(false)
  const [countrySelectorOpen, setCountrySelectorOpen] = React.useState(false)
  const [refineOpen, setRefineOpen]                   = React.useState(false)
  const [shopAllOpen, setShopAllOpen]                 = React.useState(false)
  const [cartOpen, setCartOpen]                       = React.useState(false)
  const [checkoutOpen, setCheckoutOpen]               = React.useState(false)
  const [selectedProduct, setSelectedProduct]         = React.useState(null)
  const [productDetailOpen, setProductDetailOpen]     = React.useState(false)
  const [currentPage, setCurrentPage]                 = React.useState("home")
  const [a11yOpen, setA11yOpen]                       = React.useState(false)
  const [sortOpen, setSortOpen]                       = React.useState(false)
  const [sortLabel, setSortLabel]                     = React.useState("Recommended")
  const [isSignedIn, setIsSignedIn]                   = React.useState(() => localStorage.getItem("loggedIn") === "true")
  const [currentPageNum, setCurrentPageNum]           = React.useState(1)
  const [entryBottom, setEntryBottom]                 = React.useState(HEADER_HEIGHT)
  const [heroScrolled, setHeroScrolled]               = React.useState(false)
  const [pageScrolled, setPageScrolled]               = React.useState(false)
  const [time, setTime]                               = React.useState("")
  const [newsArticleId, setNewsArticleId]             = React.useState(null)
  const [isMobile, setIsMobile]                       = React.useState(window.innerWidth <= 768)

  const containerRef   = React.useRef(null)
  const currentPageRef = React.useRef(currentPage)

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  React.useEffect(() => { currentPageRef.current = currentPage }, [currentPage])

  React.useEffect(() => {
    const tick = () => {
      const now = new Date()
      const formatter = new Intl.DateTimeFormat("en-US", { timeZone:"America/New_York", weekday:"long", year:"numeric", month:"long", day:"numeric", hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false })
      const parts = formatter.formatToParts(now)
      const get = (type) => parts.find(p => p.type === type)?.value ?? ""
      setTime(`Queens, NY | ${get("weekday")}, ${get("month")} ${get("day")}, ${get("year")} | ${get("hour")}:${get("minute")}:${get("second")} EST`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const [activeFilters, setActiveFilters] = React.useState({
    selectedColors: null, selectedSizes: [], selectedCategory: null,
    selectedView: 4, hideSoldOut: false, showSaleOnly: false,
  })

  const [selectedCountry, setSelectedCountry] = React.useState(() => {
    const code = localStorage.getItem("country"), currency = localStorage.getItem("currency"), symbol = localStorage.getItem("symbol")
    if (code && currency && symbol) return { label: code, currency: `${symbol}${currency}` }
    return { label: "US", currency: "$USD" }
  })

  const handleContainerRef = React.useCallback((node) => {
    if (containerRef.current && containerRef._scrollHandler)
      containerRef.current.removeEventListener("scroll", containerRef._scrollHandler)
    if (node) {
      let lastScrollTop = 0
      const handler = () => {
        const page = currentPageRef.current, scrollTop = node.scrollTop
        if (page === "home") setHeroScrolled(scrollTop > 10)
        else setPageScrolled(scrollTop > 60)
        const entryEl = node.querySelector(".entry-container")
        if (entryEl) {
          if (scrollTop < lastScrollTop) entryEl.classList.remove("entry-container--hidden")
          else if (scrollTop > lastScrollTop && scrollTop > 60) entryEl.classList.add("entry-container--hidden")
        }
        lastScrollTop = scrollTop
      }
      node.addEventListener("scroll", handler, { passive: true })
      containerRef.current = node
      containerRef._scrollHandler = handler
    }
  }, [])

  React.useEffect(() => {
    setHeroScrolled(false); setPageScrolled(false)
    if (containerRef.current) {
      if (containerRef._scrollHandler) containerRef.current.removeEventListener("scroll", containerRef._scrollHandler)
      containerRef.current.scrollTop = 0
      if (containerRef._scrollHandler) containerRef.current.addEventListener("scroll", containerRef._scrollHandler, { passive: true })
    }
  }, [currentPage])

  const closeAll = React.useCallback(() => {
    setSearchOpen(false); setProfileOpen(false); setCartOpen(false)
    setCountrySelectorOpen(false); setRefineOpen(false); setShopAllOpen(false)
    setSortOpen(false); setA11yOpen(false); setCheckoutOpen(false); setProductDetailOpen(false)
  }, [])

  const goToShop = React.useCallback(() => { setShopLoading(true) }, [])

  const navigate = React.useCallback((page, articleId = null) => {
    if (page === "shop-filtered") {
      setSearchOpen(false); setProfileOpen(false); setCartOpen(false)
      setRefineOpen(false); setSortOpen(false); setShopAllOpen(false)
      setCurrentPage("shop"); setCurrentPageNum(1); return
    }
    if (page === "shop" || page === "Recommended") {
      closeAll(); setDiscoverFilter(null); setSeasonFilter(null)
      setActiveFilters(prev => ({ ...prev, selectedCategory: null }))
      setSortLabel("Recommended"); setCurrentPageNum(1); setCurrentPage("shop"); goToShop(); return
    }
    if (SEASON_ORDER.includes(page)) {
      closeAll(); setDiscoverFilter(null); setSeasonFilter(page)
      setActiveFilters(prev => ({ ...prev, selectedCategory: null }))
      setCurrentPageNum(1); setCurrentPage("shop"); goToShop(); return
    }
    if (NAV_CATEGORY_MAP[page]) {
      closeAll()
      const mapped = NAV_CATEGORY_MAP[page]; setSeasonFilter(null)
      if (mapped.discover) { setDiscoverFilter(mapped.discover); setActiveFilters(prev => ({ ...prev, selectedCategory: null })) }
      else { setDiscoverFilter(null); setActiveFilters(prev => ({ ...prev, selectedCategory: mapped.category })) }
      setCurrentPageNum(1); setCurrentPage("shop"); goToShop(); return
    }
    closeAll()
    if (page === "news" && articleId) setNewsArticleId(articleId)
    setCurrentPage(page); setCurrentPageNum(1)
  }, [closeAll, goToShop])

  React.useEffect(() => {
    const handler = (e) => { setSelectedProduct(e.detail); setProductDetailOpen(true) }
    window.addEventListener("rv-full-details", handler)
    return () => window.removeEventListener("rv-full-details", handler)
  }, [])

  React.useEffect(() => { setCurrentPageNum(1) }, [activeFilters])

  const filteredProducts = Product.filter((item) => {
    if (discoverFilter && item.discover !== discoverFilter) return false
    if (seasonFilter && item.season !== seasonFilter) return false
    if (activeFilters.selectedColors && !item.color?.toLowerCase().includes(activeFilters.selectedColors.toLowerCase())) return false
    if (activeFilters.hideSoldOut && item.soldOut) return false
    if (activeFilters.showSaleOnly && !item.onSale) return false
    if (activeFilters.selectedCategory && item.category?.toLowerCase() !== activeFilters.selectedCategory.toLowerCase()) return false
    return true
  })

  const sortedProducts = (() => {
    const arr = [...filteredProducts]
    if (sortLabel === "New arrivals") return arr.filter(i => i.discover === "New Arrivals")
    const px = (s) => parseFloat(String(s).replace(/[^0-9.]/g, "")) || 0
    if (sortLabel === "Price: Low to high")  return arr.sort((a,b) => px(a.price) - px(b.price))
    if (sortLabel === "Price: High to low") return arr.sort((a,b) => px(b.price) - px(a.price))
    return arr
  })()

  const gridCols   = isMobile && activeFilters.selectedView === 8 ? 4 : (activeFilters.selectedView || 4)
  const isCompact  = activeFilters.selectedView === 8 || (isMobile && activeFilters.selectedView === 4)
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE)

  const currentCatIndex      = CATEGORY_ORDER.indexOf(activeFilters.selectedCategory)
  const nextCategory         = currentCatIndex !== -1 && currentCatIndex < CATEGORY_ORDER.length - 1 ? CATEGORY_ORDER[currentCatIndex + 1] : null
  const currentDiscoverIndex = DISCOVER_ORDER.indexOf(discoverFilter)
  const nextDiscover         = currentDiscoverIndex !== -1 && currentDiscoverIndex < DISCOVER_ORDER.length - 1 ? DISCOVER_ORDER[currentDiscoverIndex + 1] : null
  const currentSeasonIndex   = SEASON_ORDER.indexOf(seasonFilter)
  const nextSeason           = currentSeasonIndex !== -1 && currentSeasonIndex < SEASON_ORDER.length - 1 ? SEASON_ORDER[currentSeasonIndex + 1] : null

  const showNextButton = currentPageNum === totalPages && (
    (activeFilters.selectedCategory && nextCategory) || (discoverFilter && nextDiscover) || (seasonFilter && nextSeason)
  )
  const nextLabel = activeFilters.selectedCategory && nextCategory ? `NEXT: ${nextCategory.toUpperCase()}`
    : discoverFilter && nextDiscover ? `NEXT: ${nextDiscover.toUpperCase()}`
    : seasonFilter && nextSeason ? `NEXT: ${nextSeason.toUpperCase()}` : null

  const handleNextClick = () => {
    if (activeFilters.selectedCategory && nextCategory) handleCategorySelect(nextCategory)
    else if (discoverFilter && nextDiscover) { setDiscoverFilter(nextDiscover); setCurrentPageNum(1) }
    else if (seasonFilter && nextSeason) handleSeasonSelect(nextSeason)
    if (containerRef.current) containerRef.current.scrollTop = 0
  }

  const paginatedProducts = sortedProducts.slice((currentPageNum - 1) * PRODUCTS_PER_PAGE, currentPageNum * PRODUCTS_PER_PAGE)
  const handlePageChange  = (page) => { setCurrentPageNum(page); if (containerRef.current) containerRef.current.scrollTop = 0 }

  const productElement = paginatedProducts.map((item) => (
    <ProductCard key={item.id} {...item} compact={isCompact}
      onClick={(product) => { setSelectedProduct(product); addToRecentlyViewed(product); setProductDetailOpen(true) }}
      onAddToBag={() => { closeAll(); setCartOpen(true) }}
    />
  ))

  const handleCategorySelect = (cat) => {
    setSortLabel("Recommended"); setDiscoverFilter(null); setSeasonFilter(null)
    setActiveFilters(prev => ({ ...prev, selectedCategory: cat })); setCurrentPageNum(1)
  }
  const handleCategoryClear = () => { setActiveFilters(prev => ({ ...prev, selectedCategory: null })); setCurrentPageNum(1) }
  const handleSeasonSelect  = (season) => {
    setSortLabel("Recommended"); setDiscoverFilter(null); setSeasonFilter(season)
    setActiveFilters(prev => ({ ...prev, selectedCategory: null })); setCurrentPageNum(1)
  }
  const handleSeasonClear   = () => { setSeasonFilter(null);   setCurrentPageNum(1) }
  const handleDiscoverClear = () => { setDiscoverFilter(null); setCurrentPageNum(1) }

  const shopAllOpenRef = React.useRef(false)
  React.useEffect(() => { shopAllOpenRef.current = shopAllOpen }, [shopAllOpen])

  // Derive DrawerLoader props from activeDrawer + entryBottom
  const drawerCfg     = activeDrawer ? DRAWER_CONFIG[activeDrawer] : null
  // Panels that start below the Entry bar use entryBottom as their top offset;
  // header-level panels (search, profile, cart, …) start at HEADER_HEIGHT.
  const ENTRY_DRAWERS = new Set(["shopAll", "refine", "sort"])
  const loaderTop     = drawerCfg
    ? (ENTRY_DRAWERS.has(activeDrawer) ? entryBottom : HEADER_HEIGHT)
    : HEADER_HEIGHT

  const EntryBar = (
    <Entry
      onRefineOpen={(bottom) => { closeAll(); setEntryBottom(bottom); openDrawer("refine", () => setRefineOpen(true)) }}
      onShopAllOpen={(bottom) => {
        if (shopAllOpenRef.current) {
          setShopAllOpen(false); setDiscoverFilter(null); setSeasonFilter(null)
          setActiveFilters(prev => ({ ...prev, selectedCategory: null }))
          setSortLabel("Recommended"); setCurrentPageNum(1); setCurrentPage("shop")
        } else {
          setSearchOpen(false); setProfileOpen(false); setCartOpen(false)
          setRefineOpen(false); setSortOpen(false); setEntryBottom(bottom)
          openDrawer("shopAll", () => setShopAllOpen(true))
        }
      }}
      onSortOpen={(bottom) => { closeAll(); setEntryBottom(bottom); openDrawer("sort", () => setSortOpen(true)) }}
      sortLabel={sortLabel}
      selectedCategory={activeFilters.selectedCategory}
      onCategoryClear={handleCategoryClear}
      seasonFilter={seasonFilter}
      onSeasonClear={handleSeasonClear}
      discoverFilter={discoverFilter}
      onDiscoverClear={handleDiscoverClear}
      currentPage={currentPage}
      onNavigate={navigate}
      shopAllOpen={shopAllOpen}
      refineOpen={refineOpen}
    />
  )

  const ProductGrid = (
    <>
      {EntryBar}
      <main className={`product-grid${isCompact ? " product-grid--compact" : ""}`} style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
        {productElement}
      </main>
      <Pagination currentPage={currentPageNum} totalPages={totalPages} onPageChange={handlePageChange} />
      {showNextButton && nextLabel && (
        <div style={{ display:"flex", justifyContent:"center", padding:"48px 0 64px" }}>
          <button onClick={handleNextClick} style={{ background:"#1a1a1a", color:"#fff", border:"none", padding:"13px 36px", fontSize:"11px", letterSpacing:"0.12em", fontWeight:"500", cursor:"pointer", whiteSpace:"nowrap" }}>
            {nextLabel}
          </button>
        </div>
      )}
    </>
  )

  const isTransparent = currentPage === "home" && !heroScrolled && !searchOpen && !profileOpen && !cartOpen
  const logoScrolled  = currentPage === "home" ? heroScrolled : pageScrolled

  return (
    <>
      {/* ── PAGE REFRESH SPLASH — 5 sec spinning flower ── */}
      {showSplash && <FlowerSplash onDone={() => setShowSplash(false)} />}

      {/* ── SHOP OPEN SPLASH — 5 sec spinning flower ── */}
      {shopLoading && <FlowerSplash onDone={() => setShopLoading(false)} />}

      {/* ── DRAWER LOADER — 3 bouncing dots, positioned inside the opening panel ── */}
      {drawerLoading && drawerCfg && (
        <DrawerLoader
          key={drawerLoaderKey}
          onDone={() => setDrawerLoading(false)}
          side={drawerCfg.side}
          width={drawerCfg.width}
          topOffset={loaderTop}
        />
      )}

      <Header
        onSearchOpen={() => { closeAll(); openDrawer("search", () => setSearchOpen(true)) }}
        onProfileOpen={() => { closeAll(); openDrawer("profile", () => setProfileOpen(true)) }}
        onCartOpen={() => { closeAll(); openDrawer("cart", () => setCartOpen(true)) }}
        onShippingOpen={() => { closeAll(); openDrawer("countrySelector", () => setCountrySelectorOpen(true)) }}
        onA11yOpen={() => { closeAll(); setA11yOpen(true) }}
        onNavigate={navigate}
        selectedCountry={selectedCountry}
        onSelect={(country) => setSelectedCountry(country)}
        isSignedIn={isSignedIn}
        transparent={isTransparent}
        logoScrolled={logoScrolled}
        isCafe={currentPage === "cafe"}
      />

      {currentPage === "home" && (
        <div className={`home__timebar${heroScrolled ? " home__timebar--scrolled" : ""}`}>
          <span>{time}</span>
        </div>
      )}

      <div ref={handleContainerRef} data-page-container style={{
        position:"fixed", top:currentPage==="home"?0:`${HEADER_HEIGHT}px`,
        left:0, right:0, bottom:0, overflowY:"auto", overflowX:"hidden",
        overscrollBehavior:"none", background:currentPage==="home"?"transparent":"#fff", zIndex:0,
      }}>
        {currentPage === "home" && !searchOpen && !profileOpen && !cartOpen
          ? <Home onNavigate={navigate} onSeasonSelect={handleSeasonSelect} />
          : currentPage === "client-services" ? <ClientServices heroImage="/client-service.png" />
          : currentPage === "legal-privacy"   ? <LegalPrivacy heroImage="/legal-pravacy.png" />
          : currentPage === "careers"         ? <Careers />
          : currentPage === "lookbook"        ? <Lookbook openDrawer={openDrawer} />
          : currentPage === "news"            ? <News openArticleId={newsArticleId} onArticleOpened={() => setNewsArticleId(null)} openDrawer={openDrawer} />
          : currentPage === "stores"          ? <Store />
          : currentPage === "cafe"            ? <Cafe />
          : currentPage === "sonny"           ? <Sonny onProfileOpen={() => { closeAll(); openDrawer("profile", () => setProfileOpen(true)) }} isSignedIn={isSignedIn} />
          : currentPage === "sound"           ? <Sound nightMode={false} />
          : currentPage === "create"          ? <Create onBack={() => navigate("home")} />
          : currentPage === "about"           ? <About />
          : currentPage === "collections"     ? (
            <>{EntryBar}<Collections onProductClick={(product) => { setSelectedProduct(product); addToRecentlyViewed(product); setProductDetailOpen(true) }} /></>
          ) : ProductGrid
        }
      </div>

      <CountrySelector isOpen={countrySelectorOpen} onClose={() => setCountrySelectorOpen(false)} onNavigate={navigate} onSelect={(country) => setSelectedCountry(country)} />
      <RefinePanel isOpen={refineOpen} onClose={() => setRefineOpen(false)} topOffset={entryBottom} onFilterChange={(filters) => setActiveFilters(prev => ({ ...prev, ...filters, selectedCategory: prev.selectedCategory }))} />
      <Sort isOpen={sortOpen} onClose={() => setSortOpen(false)} sortLabel={sortLabel} onSelect={setSortLabel} topOffset={entryBottom} />
      <ShopAllPanel isOpen={shopAllOpen} onClose={() => setShopAllOpen(false)} onNavigate={navigate} onCategorySelect={handleCategorySelect} onDiscoverSelect={setDiscoverFilter} onSeasonSelect={handleSeasonSelect} selectedCategory={activeFilters.selectedCategory} topOffset={entryBottom} />
      <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={navigate} onCategorySelect={handleCategorySelect} onDiscoverSelect={setDiscoverFilter} />
      <Profile isOpen={profileOpen} onClose={() => setProfileOpen(false)} onSignIn={() => setIsSignedIn(true)} onSignOut={() => setIsSignedIn(false)} onNavigate={navigate} />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} onCheckout={() => { closeAll(); openDrawer("checkout", () => setCheckoutOpen(true)) }} />
      <Checkout isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} onBackToCart={() => { setCheckoutOpen(false); openDrawer("cart", () => setCartOpen(true)) }} />
      <ProductDetail
        isOpen={productDetailOpen} product={selectedProduct}
        onClose={() => { setProductDetailOpen(false); setSelectedProduct(null) }}
        onCheckout={() => { closeAll(); setSelectedProduct(null); openDrawer("checkout", () => setCheckoutOpen(true)) }}
        onViewCart={() => { closeAll(); setSelectedProduct(null); openDrawer("cart", () => setCartOpen(true)) }}
        onNavigate={navigate}
      />
      <Accessibility isOpen={a11yOpen} onClose={() => setA11yOpen(false)} />
    </>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}
