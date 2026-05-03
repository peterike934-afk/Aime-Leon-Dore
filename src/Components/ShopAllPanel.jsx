import { useEffect, useRef, useState } from "react";
import "../ShopAllPanel.css";

const DISCOVER = [
  { label: "New Arrivals",    key: "new-arrivals",    disabled: false },
  { label: "Curated Selects", key: "curated-selects", disabled: false },
  { label: "Uniform",         key: "uniform",         disabled: false },
  { label: "Collections",     key: "collections",     disabled: false },
  { label: "Shop All",        key: "shop-all",        disabled: false },
];

const CATEGORIES = [
  "Tees & Polos", "Sweatshirts", "Shirting", "Sweaters", "Pants",
  "Sweatpants", "Shorts", "Outerwear", "Suiting", "Footwear",
  "Headwear", "Jewelry", "Bags & Leather Goods", "Accessories", "Gift Cards",
];

const SEASONS = [
  {
    label: "Spring / Summer 2026",
    items: ["Delivery 1", "Delivery 2", "Delivery 3"],
  },
];

const PARTNERSHIPS = [
  { label: "Partnerships", items: ["ALD / Technics"] },
];

export default function ShopAllPanel({
  isOpen,
  onClose,
  onNavigate,
  onCategorySelect,
  onDiscoverSelect,
  onSeasonSelect,
  selectedCategory,
  topOffset = 82,
}) {
  const panelRef = useRef(null);

  // Always stay expanded
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [seasonOpen,   setSeasonOpen]   = useState(true);
  const [partnerOpen,  setPartnerOpen]  = useState(true);

  useEffect(() => {
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    }
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  useEffect(() => {
    function handleKey(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleDiscoverClick = (item) => {
    if (item.disabled) return;
    if (item.key === "shop-all") {
      onDiscoverSelect(null);
      onSeasonSelect(null);
      onNavigate("shop");
      onClose();
    } else if (item.key === "collections") {
      onNavigate("collections");
      onClose();
    } else if (item.key === "new-arrivals") {
      onSeasonSelect(null);
      onDiscoverSelect("New Arrivals");
      onNavigate("shop-filtered");
      onClose();
    } else if (item.key === "curated-selects") {
      onSeasonSelect(null);
      onDiscoverSelect("Curated Selects");
      onNavigate("shop-filtered");
      onClose();
    } else if (item.key === "uniform") {
      onSeasonSelect(null);
      onDiscoverSelect("Uniform");
      onNavigate("shop-filtered");
      onClose();
    }
  };

  const handleCategoryClick = (cat) => {
    onDiscoverSelect(null);
    onSeasonSelect(null);
    onCategorySelect(cat);
    onClose();
  };

  const handleDeliveryClick = (delivery) => {
    onDiscoverSelect(null);
    onSeasonSelect(delivery);
    onNavigate("shop-filtered");
    onClose();
  };

  return (
    <>
      <div
        className={`shop-all-overlay${isOpen ? " shop-all-overlay--visible" : ""}`}
        style={{ top: topOffset }}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className={`shop-all-panel${isOpen ? " shop-all-panel--open" : ""}`}
        style={{ top: topOffset }}
      >
        <button className="shop-all-close" onClick={onClose}>✕</button>
        {/* DISCOVER */}
        <div className="shop-all-section">
          <p className="shop-all-section-label">Discover</p>
          <ul className="shop-all-list">
            {DISCOVER.map((item) => (
              <li
                key={item.label}
                className={`shop-all-item${item.disabled ? " shop-all-item--disabled" : ""}`}
                onClick={() => handleDiscoverClick(item)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* SHOP BY */}
        <div className="shop-all-section">
          <p className="shop-all-section-label">Shop By</p>

          <div
            className="shop-all-accordion-row"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            <span className="shop-all-accordion-label">Category</span>
            <span className="shop-all-icon">{categoryOpen ? "−" : "+"}</span>
          </div>
          {categoryOpen && (
            <ul className="shop-all-list shop-all-list--sub">
              {CATEGORIES.map((cat) => (
                <li
                  key={cat}
                  className={`shop-all-item${selectedCategory === cat ? " shop-all-item--active" : ""}`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}

          {SEASONS.map((season) => (
            <div key={season.label}>
              <div
                className="shop-all-accordion-row"
                onClick={() => setSeasonOpen(!seasonOpen)}
              >
                <span className="shop-all-accordion-label">{season.label}</span>
                <span className="shop-all-icon">{seasonOpen ? "−" : "+"}</span>
              </div>
              {seasonOpen && (
                <ul className="shop-all-list shop-all-list--sub">
                  {season.items.map((d) => (
                    <li
                      key={d}
                      className="shop-all-item"
                      onClick={() => handleDeliveryClick(d)}
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* PARTNERSHIPS */}
        <div className="shop-all-section shop-all-section--last">
          {PARTNERSHIPS.map((p) => (
            <div key={p.label}>
              <div
                className="shop-all-accordion-row"
                onClick={() => setPartnerOpen(!partnerOpen)}
              >
                <span className="shop-all-accordion-label">{p.label}</span>
                <span className="shop-all-icon">{partnerOpen ? "−" : "+"}</span>
              </div>
              {partnerOpen && (
                <ul className="shop-all-list shop-all-list--sub">
                  {p.items.map((item) => (
                    <li
                      key={item}
                      className="shop-all-item"
                      onClick={() => handleCategoryClick(item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
