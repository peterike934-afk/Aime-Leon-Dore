// ProductPage.jsx  —  usage example
import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./components/CartDrawer";

export default function ProductPage({ product }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { addToCart, addToRecentlyViewed, cartCount } = useCart();

  const handleAddToBag = () => {
    addToCart(product);           // adds to context
    addToRecentlyViewed(product); // feeds the "You May Also Like" section
    setDrawerOpen(true);          // opens the drawer
  };

  return (
    <div>
      {/* Bag icon with live count (put this in your Navbar) */}
      <button onClick={() => setDrawerOpen(true)}>
        Bag ({cartCount})
      </button>

      {/* Your product info */}
      <h1>{product.name}</h1>
      <p>{product.price}</p>

      {/* Add to Bag */}
      <button onClick={handleAddToBag}>Add to Bag</button>

      {/* Drawer — only needs isOpen + onClose */}
      <CartDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

// ─── Product object shape CartContext expects ─────────────────────────────────
// {
//   id           : string | number   (required — used as React key + cart lookup)
//   name         : string            (required)
//   price        : string            (required — e.g. "$295", used in subtotal calc)
//   imageUrl?    : string
//   brand?       : string
//   variant?     : string            (e.g. "Size M / Navy")
//   isSale?      : boolean
//   originalPrice?: string           (shown with strikethrough when isSale is true)
//   shipDate?    : string            (e.g. "April 1")
// }
