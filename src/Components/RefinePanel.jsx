import { useState, useEffect, useRef } from "react";
import "./RefinePanel.css";

const APPAREL_SIZES  = ["XS", "S", "M", "L", "XL", "XXL"];
const FOOTWEAR_SIZES = ["6", "7", "8", "9", "10", "11", "12", "13"];
const HEADWEAR_SIZES = ["S/M", "L/XL", "One Size"];

const COLORS = [
  { name: "Black",  hex: "#1a1a1a" },
  { name: "White",  hex: "#ffffff" },
  { name: "Navy",   hex: "#1B2A4A" },
  { name: "Khaki",  hex: "#C3B091" },
  { name: "Olive",  hex: "#6B6B3A" },
  { name: "Grey",   hex: "#888888" },
  { name: "Brown",  hex: "#6B4226" },
  { name: "Red",    hex: "#B22222" },
  { name: "Blue",   hex: "#4A6FA5" },
  { name: "Green",  hex: "#3A5A40" },
];

const VIEW_OPTIONS_DESKTOP = [
  { label: "2 per row", value: 2 },
  { label: "3 per row", value: 3 },
  { label: "4 per row", value: 4 },
  { label: "8 per row", value: 8 },
];

const VIEW_OPTIONS_MOBILE = [
  { label: "1 per row", value: 1 },
  { label: "2 per row", value: 2 },
  { label: "3 per row", value: 4 },
];

// ─────────────────────────────────────────────
// Read saved sizes from localStorage (set by MySizes in Profile)
// Returns flat array of size strings e.g. ["S", "M", "9", "S/M"]
// ─────────────────────────────────────────────
function getSavedSizes() {
  try {
    const raw = localStorage.getItem("mySizes");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // parsed is { Apparel: [...], Footwear: [...], Headwear: [...] }
    return [
      ...(parsed.Apparel  || []),
      ...(parsed.Footwear || []),
      ...(parsed.Headwear || []),
    ];
  } catch {
    return [];
  }
}

export default function RefinePanel({ isOpen, onClose, topOffset = 82, onFilterChange }) {
  const panelRef = useRef(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  const [showSaleOnly,   setShowSaleOnly]   = useState(false);
  const [hideSoldOut,    setHideSoldOut]    = useState(false);
  const [sizeOpen,       setSizeOpen]       = useState(false);
  const [colorOpen,      setColorOpen]      = useState(false);
  const [viewOpen,       setViewOpen]       = useState(false);
  const [selectedSizes,  setSelectedSizes]  = useState([]);
  const [selectedColors, setSelectedColors] = useState(null);
  const [selectedView,   setSelectedView]   = useState(4);

  // My Sizes toggle state
  const [mySizesOn,    setMySizesOn]    = useState(false);
  const [savedSizes,   setSavedSizes]   = useState([]);
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  // Load saved sizes from localStorage whenever panel opens
  useEffect(() => {
    if (isOpen) {
      const sizes = getSavedSizes();
      setSavedSizes(sizes);
      // If toggle was on but sizes changed, refresh selected
      if (mySizesOn) {
        setSelectedSizes(sizes);
      }
    }
  }, [isOpen]);

  // When toggle flips: apply or remove saved sizes
  function handleMySizesToggle() {
    if (!isLoggedIn || savedSizes.length === 0) return;
    const next = !mySizesOn;
    setMySizesOn(next);
    if (next) {
      // Add saved sizes to any already selected
      setSelectedSizes(prev => {
        const merged = [...new Set([...prev, ...savedSizes])];
        return merged;
      });
    } else {
      // Remove only the saved sizes, keep any manually selected ones
      setSelectedSizes(prev => prev.filter(s => !savedSizes.includes(s)));
    }
  }

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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({ selectedSizes, selectedColors, selectedView, hideSoldOut, showSaleOnly });
    }
  }, [selectedSizes, selectedColors, selectedView, hideSoldOut, showSaleOnly]);

  const toggleSize  = (s) => setSelectedSizes((p) => p.includes(s) ? p.filter((v) => v !== s) : [...p, s]);
  const toggleColor = (c) => setSelectedColors((prev) => prev === c ? null : c);

  const clearAll = () => {
    setSelectedSizes([]);
    setSelectedColors(null);
    setShowSaleOnly(false);
    setHideSoldOut(false);
    setSelectedView(4);
    setMySizesOn(false);
  };

  const appliedCount =
    selectedSizes.length +
    (selectedColors ? 1 : 0) +
    (showSaleOnly ? 1 : 0) +
    (hideSoldOut ? 1 : 0);

  const panelTop = isMobile ? 0 : topOffset;

  // Sub-label under My Sizes toggle
  const mySizesSub = () => {
    if (!isLoggedIn) {
      return <span className="refine-toggle-sub"><span className="refine-link">Sign in</span> to add your sizes</span>;
    }
    if (savedSizes.length === 0) {
      return <span className="refine-toggle-sub">No sizes saved yet</span>;
    }
    // Show a compact summary: Apparel: S, M · Footwear: 9
    try {
      const raw = localStorage.getItem("mySizes");
      const parsed = raw ? JSON.parse(raw) : {};
      const parts = [];
      if (parsed.Apparel?.length)  parts.push(`Apparel: ${parsed.Apparel.join(", ")}`);
      if (parsed.Footwear?.length) parts.push(`Footwear: ${parsed.Footwear.join(", ")}`);
      if (parsed.Headwear?.length) parts.push(`Headwear: ${parsed.Headwear.join(", ")}`);
      return <span className="refine-toggle-sub">{parts.join(" · ")}</span>;
    } catch {
      return null;
    }
  };

  const mySizesDisabled = !isLoggedIn || savedSizes.length === 0;

  return (
    <>
      <div
        className={`refine-overlay${isOpen ? " refine-overlay--open" : ""}`}
        style={{ top: panelTop }}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className={`refine-panel${isOpen ? " refine-panel--open" : ""}`}
        style={{ top: panelTop }}
      >
        <p className="refine-panel-title">Refine</p>

        <div className="refine-toggles">
          {/* ── MY SIZES TOGGLE ── */}
          <div
            className={`refine-toggle-row${mySizesDisabled ? "" : " refine-toggle-row--clickable"}`}
            onClick={mySizesDisabled ? undefined : handleMySizesToggle}
          >
            <div className="refine-toggle-info">
              <span className="refine-toggle-label">My Sizes</span>
              {mySizesSub()}
            </div>
            <div className={`refine-switch${mySizesOn ? " refine-switch--on" : ""}${mySizesDisabled ? " refine-switch--disabled" : ""}`}>
              <div className="refine-switch__thumb" />
            </div>
          </div>

          <div className="refine-toggle-row" onClick={() => setShowSaleOnly(!showSaleOnly)}>
            <span className="refine-toggle-label">Show sale items only</span>
            <div className={`refine-switch${showSaleOnly ? " refine-switch--on" : ""}`}>
              <div className="refine-switch__thumb" />
            </div>
          </div>

          <div className="refine-toggle-row" onClick={() => setHideSoldOut(!hideSoldOut)}>
            <span className="refine-toggle-label">Hide sold out products</span>
            <div className={`refine-switch${hideSoldOut ? " refine-switch--on" : ""}`}>
              <div className="refine-switch__thumb" />
            </div>
          </div>
        </div>

        <div className="refine-section-label">Filter by</div>

        <Accordion label="Size" isOpen={sizeOpen} onToggle={() => setSizeOpen(!sizeOpen)}>
          {[["Apparel", APPAREL_SIZES], ["Footwear", FOOTWEAR_SIZES], ["Headwear", HEADWEAR_SIZES]].map(([group, sizes]) => (
            <div className="refine-size-group" key={group}>
              <p className="refine-size-group-label">{group}</p>
              <div className="refine-size-grid">
                {sizes.map((s) => (
                  <button
                    key={s}
                    className={`refine-size-btn${selectedSizes.includes(s) ? " refine-size-btn--active" : ""}`}
                    onClick={() => toggleSize(s)}
                  >{s}</button>
                ))}
              </div>
            </div>
          ))}
        </Accordion>

        <Accordion label="Color" isOpen={colorOpen} onToggle={() => setColorOpen(!colorOpen)}>
          <div className="refine-color-grid">
            {COLORS.map((c) => (
              <button
                key={c.name}
                className={`refine-color-btn${selectedColors === c.name ? " refine-color-btn--active" : ""}`}
                onClick={() => toggleColor(c.name)}
              >
                <span className="refine-color-swatch" style={{
                  background: c.hex,
                  border: c.name === "White" ? "1px solid #ddd" : "none",
                }} />
                <span className="refine-color-name">{c.name}</span>
                {selectedColors === c.name && <span className="refine-color-check">✓</span>}
              </button>
            ))}
          </div>
        </Accordion>

        <Accordion label="View Options" isOpen={viewOpen} onToggle={() => setViewOpen(!viewOpen)}>
          <div className="refine-view-options">
            {(isMobile ? VIEW_OPTIONS_MOBILE : VIEW_OPTIONS_DESKTOP).map((v) => (
              <button
                key={v.value}
                className={`refine-view-btn${selectedView === v.value ? " refine-view-btn--active" : ""}`}
                onClick={() => setSelectedView(v.value)}
              >
                <span className={`refine-view-icon refine-view-icon--${v.value}`}>
                  {v.value === 8
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <span key={i} className="refine-view-icon__cell refine-view-icon__cell--tiny" />
                      ))
                    : Array.from({ length: v.value }).map((_, i) => (
                        <span key={i} className="refine-view-icon__cell" />
                      ))
                  }
                </span>
                <span>{v.label}</span>
              </button>
            ))}
          </div>
        </Accordion>

        <div className="refine-applied">
          <div className="refine-applied-header">
            <span className="refine-section-label" style={{ margin: 0, padding: 0 }}>Applied Filters</span>
            {appliedCount > 0 && (
              <button className="refine-clear-all" onClick={clearAll}>Clear All</button>
            )}
          </div>
          {appliedCount > 0 ? (
            <div className="refine-tags">
              {selectedSizes.map((s) => (
                <button key={s} className="refine-tag" onClick={() => toggleSize(s)}>{s} ✕</button>
              ))}
              {selectedColors && (
                <button className="refine-tag" onClick={() => setSelectedColors(null)}>
                  {selectedColors} ✕
                </button>
              )}
              {showSaleOnly && <button className="refine-tag" onClick={() => setShowSaleOnly(false)}>Sale Only ✕</button>}
              {hideSoldOut  && <button className="refine-tag" onClick={() => setHideSoldOut(false)}>Hide Sold Out ✕</button>}
            </div>
          ) : (
            <p className="refine-no-filters">No filters applied</p>
          )}
        </div>

    {appliedCount > 0 && (
          <button className="refine-footer-clear" onClick={clearAll}>
            Clear
          </button>
        )}

        {isMobile && (
          <button className="refine-footer-back" onClick={onClose}>
            Back
          </button>
        )}
      </div>
    </>
  );
}

function Accordion({ label, isOpen, onToggle, children }) {
  return (
    <div className="refine-accordion">
      <button className="refine-accordion__btn" onClick={onToggle}>
        <span>{label}</span>
        <span className={`refine-accordion__icon${isOpen ? " refine-accordion__icon--open" : ""}`}>+</span>
      </button>
      <div className={`refine-accordion__body${isOpen ? " refine-accordion__body--open" : ""}`}>
        <div className="refine-accordion__inner">{children}</div>
      </div>
    </div>
  );
}
