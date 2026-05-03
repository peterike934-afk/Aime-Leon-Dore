import { useState, useEffect } from "react"
import ProductDetail from "../ProductDetail.jsx"
import { useCart } from "./CartContext.jsx"
import RecentlyViewedPanel from "./Recentlyview.jsx"

// ── useBreakpoint hook ───────────────────────────────────────────
function useBreakpoint() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024)
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])
  return {
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isDesktop: width >= 1024,
    width,
  }
}

const menuSections = [
  {
    title: "Coffee and Tea",
    categories: [
      { label: "Iced", items: [
        { name: "Freddo Espresso",    src: "/t1.png" },
        { name: "Freddo Cappuccino",  src: "/t2.png" },
      ]},
      { label: "Tea", items: [
        { name: "Greek Mountain Tea (Hot or Iced)", src: "/t3.png" },
        { name: "Chamomile Tea",                    src: "/t4.png" },
        { name: "Orange Passion Tea (Hot or Iced)", src: "/t5.png" },
        { name: "Lemon Ginger Tea",                 src: "/t6.png" },
        { name: "Chai (Hot or Iced)",               src: "/t7.png" },
      ]},
      { label: "", items: [
        { name: "Espresso/Americano", src: "/t8.png" },
        { name: "Macchiato",          src: "/t9.png" },
        { name: "Cortado",            src: "/t10.png" },
        { name: "Cappuccino",         src: "/t11.png" },
        { name: "Latte",              src: "/t12.png" },
        { name: "Mocha",              src: "/t13.png" },
        { name: "Drip Coffee",        src: "/t14.png" },
        { name: "Greek Coffee",       src: "/t15.png" },
        { name: "Hot Chocolate",      src: "/t16.png" },
      ]},
    ],
  },
  {
    title: "Bakery",
    categories: [
      { label: "Cookies", items: [
        { name: "Chocolate Chip", src: "/cafe/cookie.jpg" },
      ]},
      { label: "Croissants", items: [
        { name: "Plain",        src: "/cafe/croissant-plain.jpg" },
        { name: "Almond",       src: "/cafe/croissant-almond.jpg" },
        { name: "Chocolate",    src: "/cafe/croissant-choco.jpg" },
        { name: "Nutella",      src: "/cafe/croissant-nutella.jpg" },
        { name: "Raspberry",    src: "/cafe/croissant-rasp.jpg" },
        { name: "Kouign-Amann", src: "/cafe/kouign.jpg" },
      ]},
      { label: "Sandwiches, Toast & Salads", items: [
        { name: "Ham & Cheese Baguette",          src: "/cafe/ham.jpg" },
        { name: "Turkey Club",                    src: "/cafe/turkey.jpg" },
        { name: "Sourdough Toast (Honey or Jam)", src: "/cafe/toast.jpg" },
        { name: "Caesar Salad",                   src: "/cafe/caesar.jpg" },
        { name: "Mediterranean Chopped Salad",    src: "/cafe/med-salad.jpg" },
      ]},
    ],
  },
  {
    title: "Periptero",
    categories: [
      { label: "Beverages", items: [
        { name: "Acqua Panna",      src: "/cafe/acqua.jpg" },
        { name: "Pellegrino",       src: "/cafe/pellegrino.jpg" },
        { name: "Bottle Coca-Cola", src: "/cafe/coke.jpg" },
        { name: "Amita Peach",      src: "/cafe/amita-peach.jpg" },
        { name: "Amita Visino",     src: "/cafe/amita-visino.jpg" },
        { name: "Amita Motion",     src: "/cafe/amita-motion.jpg" },
        { name: "Epsa Portokalada", src: "/cafe/epsa-porto.jpg" },
        { name: "Epsa Lemonada",    src: "/cafe/epsa-lemon.jpg" },
      ]},
      { label: "Grocery", items: [
        { name: "Cafe Leon Dore Espresso",               src: "/cafe/ald-espresso.jpg" },
        { name: "Café Leon Dore Olive Oil",              src: "/cafe/olive-oil.jpg" },
        { name: "Café Leon Dore Honey",                  src: "/cafe/honey.jpg" },
        { name: "Housemade Granola",                     src: "/cafe/granola.jpg" },
        { name: "Loumidis Coffee (6.8 oz)",              src: "/cafe/loumidis.jpg" },
        { name: "Vourderis Visino (Sour Cherry)",        src: "/cafe/visino.jpg" },
        { name: "Vourderis Vanilla",                     src: "/cafe/vanilla.jpg" },
        { name: "Mt. Taygetos Tea Bundle",               src: "/cafe/tea-bundle.jpg" },
        { name: "Evripos 10pk Tea Bags (Mountain Tea)",  src: "/cafe/evripos-mt.jpg" },
        { name: "Evripos 10pk Tea Bags (Chamomile Tea)", src: "/cafe/evripos-cham.jpg" },
      ]},
      { label: "Greek Chocolate", items: [
        { name: "Ion Milk Sokofreta",         src: "/cafe/ion-milk.jpg" },
        { name: "Ion Hazelnut Sokofreta",     src: "/cafe/ion-hazel.jpg" },
        { name: "Ion Dark Sokofreta",         src: "/cafe/ion-dark.jpg" },
        { name: "Ion Milk Chocolate Bar",     src: "/cafe/ion-milk-bar.jpg" },
        { name: "Ion Hazelnut Chocolate Bar", src: "/cafe/ion-hazel-bar.jpg" },
        { name: "Ion Almond Chocolate Bar",   src: "/cafe/ion-almond-bar.jpg" },
        { name: "Pavlidou Dark",              src: "/cafe/pavlidou.jpg" },
        { name: "Caprice Wafers",             src: "/cafe/caprice.jpg" },
        { name: "Choc. Chip Cookies",         src: "/cafe/choc-chip.jpg" },
      ]},
    ],
  },
]

const shopProducts = [
  { name: "Café Leon Dore Espresso Cup & Saucer (Set of 6)", price: "$150",     src: "/1.png" },
  { name: "Café Leon Dore / La Marzocco Apron",              price: "Sold Out", soldOut: true, src: "/3.png" },
  { name: "Café Leon Dore / La Marzocco Hat",                price: "Sold Out", soldOut: true, src: "/5.png" },
  { name: "Café Leon Dore Bottle Opener",                    price: "$25",      src: "/8.png" },
  { name: "Café Leon Dore Beanie",                           price: "$65",      src: "/12.png" },
  { name: "Café Leon Dore Logo Tee",                         price: "$85",      src: "/15.png" },
  { name: "Café Leon Dore Apron",                            price: "$130",     src: "/16.png" },
  { name: "Café Leon Dore Komboloi",                         price: "$100",     src: "21.png" },
  { name: "Café Leon Dore Ring Dish",                        price: "$25",      src: "/24.png" },
  { name: "Café Leon Dore Espresso Cup",                     price: "$55",      src: "/26.png" },
  { name: "Café Leon Dore Ashtray",                          price: "$55",      src: "/29.png" },
  { name: "Café Leon Dore Pencil Pack",                      price: "$15",      src: "/39.png" },
  { name: "Café Leon Dore Crewneck Sweatshirt",              price: "$165",     src: "/40.png" },
  { name: "Café Leon Dore Hat",                              price: "$65",      src: "/43.png" },
  { name: "Café Leon Dore Tote Bag",                         price: "Sold Out", soldOut: true, src: "/46.png" },
  { name: "Café Leon Dore",                                  price: "Sold Out", soldOut: true, src: "/50.png" },
]

const locations = [
  {
    imgSrc: "/hr1.png",
    city: "New York",
    address: "214 Mulberry St., New York, NY 10012",
    hours: [
      { days: "Monday – Saturday", time: "9:00am – 7:00pm" },
      { days: "Sunday",            time: "9:00am – 6:00pm" },
    ],
  },
  {
    imgSrc: "/hr2.png",
    city: "London",
    address: "32 Broadwick St., London W1F 8JB, UK",
    hours: [
      { days: "Monday – Saturday", time: "11:00am – 7:00pm" },
      { days: "Sunday",            time: "12:00pm – 6:00pm" },
    ],
  },
  {
    imgSrc: "/hr3.png",
    city: "Tokyo",
    address: "1-6-1 Jingumae, Shibuya, Tokyo 150-0001",
    hours: [
      { days: "Monday – Saturday", time: "10:00am – 8:00pm" },
      { days: "Sunday",            time: "10:00am – 7:00pm" },
    ],
  },
]

const NAV = ["Locations", "Menu", "History", "Shop"]
const allMenuItems = menuSections.flatMap(s => s.categories.flatMap(c => c.items))

// ── Accordion Section ────────────────────────────────────────────
function AccordionSection({ section, hoveredItem, onHover, isMobile }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: "1px solid #e8e8e8" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "20px 0", cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "18px", fontWeight: 600, fontFamily: "Courier New, monospace" }}>
          {section.title}
        </span>
        <span style={{
          fontSize: "22px", fontWeight: 300,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
          display: "inline-block", lineHeight: 1,
        }}>
          {open ? "—" : "+"}
        </span>
      </div>

      {open && (
        <>
          {isMobile && (
            <div style={{
              width: "100%", aspectRatio: "4/3",
              background: "#f2f2f2", overflow: "hidden", marginBottom: "16px",
            }}>
              <img
                src={hoveredItem?.src || "/cafe/menu-default.jpg"}
                alt={hoveredItem?.name || ""}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          )}

          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px" }}>
            <tbody>
              {section.categories.map((cat, ci) =>
                cat.items.map((item, ii) => (
                  <tr
                    key={`${ci}-${ii}`}
                    onMouseEnter={() => onHover(item)}
                    onTouchStart={() => onHover(item)}
                    style={{
                      borderBottom: "1px solid #e8e8e8", cursor: "default",
                      borderTop: ii === 0 && ci > 0 ? "1px solid #1a1a1a" : "none",
                    }}
                  >
                    <td style={{
                      width: isMobile ? "80px" : "120px",
                      padding: "10px 16px 10px 0",
                      fontSize: "9px", letterSpacing: "0.1em",
                      textTransform: "uppercase", color: "#aaa",
                      verticalAlign: "top", whiteSpace: "nowrap",
                      borderTop: ii === 0 && ci > 0 ? "1px solid #1a1a1a" : "none",
                      borderRight: "1px solid #1a1a1a",
                    }}>
                      {ii === 0 && cat.label ? cat.label : ""}
                    </td>
                    <td style={{
                      padding: "10px 0 10px 16px",
                      fontSize: "10px",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      color: hoveredItem?.name === item.name ? "#1a1a1a" : "#333",
                      fontWeight: hoveredItem?.name === item.name ? 500 : 400,
                      transition: "color 0.15s ease",
                      borderTop: ii === 0 && ci > 0 ? "1px solid #1a1a1a" : "none",
                    }}>
                      {item.name}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

// ── Main Cafe component ──────────────────────────────────────────
export default function Cafe() {
  const { addToRecentlyViewed, recentlyViewed } = useCart()
  const { isMobile, isTablet } = useBreakpoint()
  const isNarrow = isMobile || isTablet

  const [activeNav, setActiveNav] = useState("Locations")
  const [hoveredItem, setHoveredItem] = useState(allMenuItems[0])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productDetailOpen, setProductDetailOpen] = useState(false)
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

  const scrollTo = (id) => {
    setActiveNav(id)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" })
  }

  const toCafeProduct = (p) => ({
    id: p.name,
    name: p.name,
    price: p.soldOut ? "$0" : p.price,
    imgs: [{ src: p.src, alt: p.name }],
    isSale: false,
  })

  const shopCols = isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(4, 1fr)"

  return (
    <>
      <div style={{
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        color: "#1a1a1a",
        minHeight: "100vh",
      }}>

        {/* ── Hero ── */}
        <div style={{
          width: "100%",
          aspectRatio: isMobile ? "4/3" : "16/7",
          background: "#e8e8e8",
          overflow: "hidden",
        }}>
          <img
            src="/Cf.png"
            alt="Café Leon Dore"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* ── Sticky nav ── */}
        <div style={{
          position: "relative", top: 52, background: "#fff", zIndex: 100,
          display: "flex", gap: isMobile ? "16px" : "32px",
          padding: isMobile ? "12px 16px" : "14px 24px",
          justifyContent: "center",
          marginTop: "-52px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}>
          {NAV.map((item) => (
            <button key={item} onClick={() => scrollTo(item)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: 0, flexShrink: 0,
              fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase",
              fontFamily: "inherit",
              color: activeNav === item ? "#1a1a1a" : "#aaa",
              fontWeight: activeNav === item ? 500 : 400,
              transition: "color 0.15s ease",
            }}>
              {item}
            </button>
          ))}
        </div>

        {/* ── Description ── */}
        <div style={{
          padding: isMobile ? "32px 16px" : "48px 24px",
          maxWidth: "600px", margin: "0 auto", textAlign: "center",
        }}>
          <p style={{ fontSize: "11px", lineHeight: 1.9, color: "#555", marginTop: 40 }}>
            Café Leon Dore brings a curated menu inspired by Greek coffee and pastry culture to downtown New York.
            The menu features the Freddo Espresso and Freddo Cappuccino, two frothy iced espresso drinks,
            as well as an assortment of greek pastries and grocery items.
          </p>
          <p style={{ fontSize: "11px", lineHeight: 1.9, color: "#555", margin: "16px 0 0" }}>
            Located at 214 Mulberry St., the café is based on the same principles as Aimé Leon Dore:
            it embodies real community through meticulous craft and taste, with a clear and authentic point of view.
          </p>
        </div>

        {/* ── Locations ── */}
        <div id="locations" style={{ padding: isMobile ? "0 16px 60px" : "0 24px 80px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? "40px" : "24px",
          }}>
            {locations.map((loc, i) => (
              <div key={i}>
                <div style={{
                  width: "100%", aspectRatio: "4/5",
                  background: "#e8e8e8", overflow: "hidden", marginBottom: "16px",
                }}>
                  <img
                    src={loc.imgSrc} alt={loc.city}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <p style={{ fontSize: "11px", margin: "0 0 10px", color: "#1a1a1a", lineHeight: 1.7 }}>
                  {loc.address}
                </p>
                <p style={{
                  fontSize: "10px", margin: "0 0 6px",
                  color: "#aaa", letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  Hours
                </p>
                {loc.hours.map((h, j) => (
                  <p key={j} style={{ fontSize: "11px", color: "#555", margin: "0 0 3px", lineHeight: 1.7 }}>
                    {h.days} {h.time}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Menu ── */}
        <div id="menu" style={{ marginBottom: isMobile ? "60px" : "80px" }}>
          {isNarrow ? (
            <div style={{ padding: isMobile ? "0 16px" : "0 24px" }}>
              {menuSections.map((section, si) => (
                <AccordionSection
                  key={si}
                  section={section}
                  hoveredItem={hoveredItem}
                  onHover={setHoveredItem}
                  isMobile={true}
                />
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

              {/* ── Left: sticky image + name below ── */}
              <div style={{
                position: "sticky", top: 90,
                height: "calc(100vh - 90px)",
                display: "flex", flexDirection: "column",
              }}>
                {/* Image fills available space */}
                <div style={{ flex: 1, background: "#f2f2f2", overflow: "hidden" }}>
                  <img
                    src={hoveredItem?.src || "/cafe/menu-default.jpg"}
                    alt={hoveredItem?.name || ""}
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "contain", display: "block",
                      transition: "opacity 0.3s ease",
                    }}
                  />
                </div>

                {/* Name sits outside the card, below, left-aligned */}
                <p style={{
                  margin: "10px 0 0 0",
                  fontSize: "9px", letterSpacing: "0.12em",
                  textTransform: "uppercase", color: "#1a1a1a",
                  textAlign: "left",
                }}>
                  {hoveredItem?.name}
                </p>
              </div>

              {/* ── Right: accordion list ── */}
              <div style={{ padding: "0 40px" }}>
                {menuSections.map((section, si) => (
                  <AccordionSection
                    key={si}
                    section={section}
                    hoveredItem={hoveredItem}
                    onHover={setHoveredItem}
                    isMobile={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── History photos ── */}
        <div id="history" style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
          gap: isMobile ? "8px" : "12px",
          padding: isMobile ? "0 16px" : "0",
          marginBottom: isMobile ? "60px" : "80px",
        }}>
          {["/hst1.png", "/hst2.png"].map((imgPath, i) => (
            <div key={i} style={{ aspectRatio: "3/4", background: "#e8e8e8", overflow: "hidden" }}>
              <img
                src={imgPath} alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>

        {/* ── Shop ── */}
        <div id="shop" style={{ padding: isMobile ? "0 16px 60px" : "0 24px 80px" }}>
          <p style={{
            fontSize: "10px", letterSpacing: "0.1em",
            textTransform: "uppercase", color: "#aaa",
            margin: "0 0 24px",
            borderBottom: "1px solid #e8e8e8", paddingBottom: "12px",
          }}>
            Café Leon Dore
          </p>
          <div style={{ display: "grid", gridTemplateColumns: shopCols, gap: isMobile ? "16px 12px" : "12px" }}>
            {shopProducts.map((p, i) => (
              <div
                key={i}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const product = toCafeProduct(p)
                  addToRecentlyViewed(product)
                  setSelectedProduct(product)
                  setProductDetailOpen(true)
                }}
              >
                <div style={{
                  aspectRatio: "3/4", background: "#f2f2f2",
                  overflow: "hidden", marginBottom: "8px",
                }}>
                  <img
                    src={p.src} alt={p.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <p style={{ fontSize: isMobile ? "9px" : "10px", margin: "0 0 2px", color: "#1a1a1a", lineHeight: 1.4 }}>
                  {p.name}
                </p>
                <p style={{ fontSize: "10px", margin: 0, color: p.soldOut ? "#aaa" : "#888" }}>
                  {p.soldOut ? "Sold Out" : p.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recently Viewed strip ── */}
        {recentlyViewed?.length > 0 && (
          <div style={{
            borderTop: "1px solid #e8e8e8",
            padding: isMobile ? "24px 16px 40px" : "24px 24px 48px",
          }}>
            <p style={{
              fontSize: "9px", letterSpacing: "0.14em",
              textTransform: "uppercase", color: "#aaa", margin: "0 0 20px",
            }}>
              Recently Viewed
            </p>
            <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "8px" }}>
              {recentlyViewed.slice(0, isMobile ? 6 : 8).map((product) => (
                <div
                  key={product.id}
                  style={{ flexShrink: 0, width: isMobile ? "200px" : "260px", cursor: "pointer" }}
                  onClick={() => handleRvClick(product)}
                >
                  <div style={{
                    width: isMobile ? "200px" : "260px",
                    aspectRatio: "3/4", overflow: "hidden",
                    marginBottom: "8px", background: "#f2f2f2",
                  }}>
                    {product.imgs?.[0]?.src && (
                      <img
                        src={product.imgs[0].src}
                        alt={product.imgs[0].alt || product.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    )}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                    <p style={{ fontSize: "10px", margin: 0, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {product.name}
                    </p>
                    <p style={{ fontSize: "10px", color: "#888", margin: 0, flexShrink: 0 }}>
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Product Detail ── */}
        <ProductDetail
          isOpen={productDetailOpen}
          product={selectedProduct}
          onClose={() => { setProductDetailOpen(false); setSelectedProduct(null) }}
          onCheckout={() => { setProductDetailOpen(false); setSelectedProduct(null) }}
          onViewCart={() => { setProductDetailOpen(false); setSelectedProduct(null) }}
        />
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
