import { useRef } from "react";
import "./sort.css";
import "./ShopAllPanel.css";
import "./index.css";

export default function Entry({
  onRefineOpen,
  onShopAllOpen,
  onSortOpen,
  sortLabel = "Recommended",
  selectedCategory,
  onCategoryClear,
  seasonFilter,
  onSeasonClear,
  discoverFilter,
  onDiscoverClear,
  currentPage,
  onNavigate,
  shopAllOpen,
  refineOpen,
}) {
  const shopRef = useRef(null);

  const getBarBottom = () => {
    if (shopRef.current) {
      return shopRef.current.getBoundingClientRect().bottom;
    }
    return 0;
  };

  // Active breadcrumb label — only one can be active at a time
  const activeLabel =
    selectedCategory ||
    seasonFilter ||
    discoverFilter ||
    (currentPage === "collections" ? "Collections" : null)

const handleClear = () => {
  if (selectedCategory && onCategoryClear) onCategoryClear()
  if (seasonFilter && onSeasonClear) onSeasonClear()
  if (discoverFilter && onDiscoverClear) onDiscoverClear()
  if (currentPage === "collections" && onNavigate) onNavigate("collections")
  onShopAllOpen(getBarBottom())
}
  return (
    <div className="entry-container">
      <div className="shop" ref={shopRef}>

        {/* ── Left: Shop All + breadcrumb ── */}
        <div className="shop-left">
          {/* Show +/- only when NO breadcrumb is active */}
        <button
          className="shopp"
          onClick={() => onShopAllOpen(getBarBottom())}
            >
           Shop All {shopAllOpen ? "−" : "+"}
           </button>

          {activeLabel && (
            <>
              <span className="shop-divider">›</span>
              <span className="shop-category">{activeLabel}</span>
              <button className="shop-category-clear" onClick={handleClear}>
              +
              </button>
            </>
          )}
        </div>

        {/* ── Right: Sort + Refine ── */}
        <div className="shop-holder">
          <button
            className="sort"
            onClick={() => onSortOpen(getBarBottom())}
          >
            Sort: {sortLabel}
          </button>

          <button
            className="refine"
            onClick={() => onRefineOpen(getBarBottom())}
          >
            Refine
          </button>
        </div>
      </div>
    </div>
  );
}
