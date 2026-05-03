import { useEffect } from "react";
import { useCart } from "../context/CartContext"; // adjust path if needed
import styles from "./CartDrawer.module.css";

// ─── CartDrawer ───────────────────────────────────────────────────────────────
/**
 * Props:
 *  isOpen  : boolean
 *  onClose : () => void
 *
 * Reads everything else directly from CartContext:
 *  cartItems, recentlyViewed, removeFromCart, updateQuantity, subtotal
 */
export default function CartDrawer({ isOpen, onClose }) {
  const {
    cartItems,
    recentlyViewed,
    removeFromCart,
    updateQuantity,
    subtotal,
  } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >
        {/* ── Header ── */}
        <div className={styles.header}>
          <span className={styles.headerTitle}>Cart</span>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close cart"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.2" />
              <line x1="13" y1="1" x2="1"  y2="13" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className={styles.body}>

          {/* Cart items */}
          {cartItems.length === 0 ? (
            <p className={styles.empty}>Your bag is empty.</p>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQty={(delta) => updateQuantity(item.id, delta)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))
          )}

          {/* You May Also Like — driven by recentlyViewed from context */}
          {recentlyViewed.length > 0 && (
            <div className={styles.upsell}>
              <p className={styles.upsellTitle}>You May Also Like</p>
              <div className={styles.upsellGrid}>
                {recentlyViewed.map((product) => (
                  <div key={product.id} className={styles.upsellItem}>
                    <div className={styles.upsellThumb}>
                      {product.imageUrl && (
                        <img src={product.imageUrl} alt={product.name} />
                      )}
                    </div>
                    <p className={styles.upsellName}>{product.name}</p>
                    <p className={styles.upsellPrice}>{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <p className={styles.freeShip}>
            Your order is eligible for free shipping
          </p>

          <div className={styles.subtotalRow}>
            <span className={styles.subtotalLabel}>Subtotal</span>
            <span className={styles.subtotalAmount}>
              ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 0 })}
            </span>
          </div>

          <div className={styles.footerBtns}>
            <button className={styles.btnUpdate}>Update</button>
            <button className={styles.btnCheckout}>Checkout</button>
          </div>

          <button className={styles.viewCart}>View Cart</button>
        </div>
      </aside>
    </>
  );
}

// ─── CartItem (internal) ──────────────────────────────────────────────────────
/**
 * Expects item shape from CartContext:
 * {
 *   id, name, price,           ← required
 *   brand?, variant?,          ← optional display fields
 *   imageUrl?,                 ← optional thumbnail
 *   isSale?, originalPrice?,   ← if isSale, shows strikethrough + salePrice
 *   shipDate?,                 ← optional ship date string
 *   quantity                   ← managed by context
 * }
 */
function CartItem({ item, onUpdateQty, onRemove }) {
  return (
    <div className={styles.item}>

      {/* Thumbnail */}
      <div className={styles.itemThumb}>
        {item.imageUrl
          ? <img src={item.imageUrl} alt={item.name} />
          : <div className={styles.itemThumbPlaceholder} />
        }
      </div>

      {/* Info */}
      <div className={styles.itemInfo}>
        {item.brand    && <span className={styles.itemBrand}>{item.brand}</span>}
        <span className={styles.itemName}>{item.name}</span>
        {item.variant  && <span className={styles.itemVariant}>{item.variant}</span>}

        <div className={styles.itemPrice}>
          {item.isSale ? (
            <>
              <span className={styles.originalPrice}>{item.originalPrice}</span>
              <span className={styles.salePrice}>{item.price} — FINAL SALE</span>
            </>
          ) : (
            <span>{item.price}</span>
          )}
        </div>

        {item.shipDate && (
          <span className={styles.shipDate}>Est. Ship Date: {item.shipDate}</span>
        )}

        {/* Qty controls — call updateQuantity(id, delta) from context */}
        <div className={styles.qtyRow}>
          <button
            className={styles.qtyBtn}
            onClick={() => onUpdateQty(-1)}
            aria-label="Decrease quantity"
          >−</button>
          <span className={styles.qtyNum}>{item.quantity}</span>
          <button
            className={styles.qtyBtn}
            onClick={() => onUpdateQty(1)}
            aria-label="Increase quantity"
          >+</button>
        </div>
      </div>

      {/* Remove */}
      <button className={styles.removeBtn} onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}
