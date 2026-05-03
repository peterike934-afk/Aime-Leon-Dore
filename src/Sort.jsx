import { useEffect, useRef } from "react";
import "./sort.css";

const OPTIONS = [
  "Recommended",
  "New arrivals",
  "Price: Low to high",
  "Price: High to low",
];

export default function Sort({
  isOpen,
  onClose,
  sortLabel,
  onSelect,
  topOffset = 82,
}) {
  const panelRef = useRef(null);

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

  const handleClear = () => {
    onSelect("Recommended");
    onClose();
  };

  return (
    <>
      <div
        className={`sort-overlay${isOpen ? " sort-overlay--open" : ""}`}
        style={{ top: topOffset }}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className={`sort-dropdown${isOpen ? " sort-dropdown--open" : ""}`}
        style={{ top: topOffset }}
      >
        <p className="sort-dropdown-title">Sort By</p>
        <div className="sort-options">
          {OPTIONS.map((option) => (
            <button
              key={option}
              className={`sort-option${sortLabel === option ? " sort-option--active" : ""}`}
              onClick={() => { onSelect(option); onClose(); }}
            >
              {option}
            </button>
          ))}
        </div>
        <button className="sort-clear" onClick={handleClear}>
          Back
        </button>
      </div>
    </>
  );
}
