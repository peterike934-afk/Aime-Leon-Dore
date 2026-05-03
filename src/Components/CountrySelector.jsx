import { useState, useEffect } from "react";
import "./CountrySelector.css";

const countries = [
    { code: "US", name: "United States", currency: "USD", symbol: "$" },
    { code: "GB", name: "United Kingdom", currency: "GBP", symbol: "£" },
    { code: "CA", name: "Canada", currency: "CAD", symbol: "$" },
    { code: "FR", name: "France", currency: "EUR", symbol: "€" },
    { code: "DE", name: "Germany", currency: "EUR", symbol: "€" },
    { code: "IT", name: "Italy", currency: "EUR", symbol: "€" },
    { code: "ES", name: "Spain", currency: "EUR", symbol: "€" },
    { code: "JP", name: "Japan", currency: "JPY", symbol: "¥" },
    { code: "AU", name: "Australia", currency: "AUD", symbol: "$" },
    { code: "NG", name: "Nigeria", currency: "NGN", symbol: "₦" },
    { code: "GH", name: "Ghana", currency: "GHS", symbol: "₵" },
    { code: "ZA", name: "South Africa", currency: "ZAR", symbol: "R" }
];

const CountrySelector = ({ isOpen, onClose, onSelect }) => {
    const [selected, setSelected] = useState(countries[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const savedCountry = localStorage.getItem("country");
        const found = countries.find(c => c.code === savedCountry);
        if (found) setSelected(found);
    }, []);

    // Freeze background scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.width = "100%";
        } else {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") {
                if (dropdownOpen) setDropdownOpen(false);
                else onClose();
            }
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose, dropdownOpen]);

    if (!isOpen) return null;


const handleSave = () => {
    localStorage.setItem("country", selected.code);
    localStorage.setItem("currency", selected.currency);
    localStorage.setItem("symbol", selected.symbol);
    window.dispatchEvent(new Event("storage"));
    onSelect && onSelect({ label: selected.code, currency: `${selected.symbol}${selected.currency}` });
    setSaved(true);
    setTimeout(() => {
        setSaved(false);
        onClose();
    }, 2000);
};
    return (
        <div className="cs-overlay">
            <div className="cs-backdrop" onClick={onClose} />

            <div className="cs-modal">
                {!saved ? (
                    <>
                        <button className="cs-close" onClick={onClose}>✕</button>

                        <h2 className="cs-title">Update Your Country/Region?</h2>
                        <span className="cs-label">Currently Shipping To:</span>

                        <div className="cs-dropdown-wrapper">
                            <button
                                className={`cs-dropdown-trigger${dropdownOpen ? " open" : ""}`}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <span className="cs-dropdown-trigger-text">
                                    <span>{selected.name}</span>
                                    <span className="cs-dropdown-currency">
                                        {selected.symbol} {selected.currency}
                                    </span>
                                </span>
                                <span className="cs-chevron" />
                            </button>

                            {dropdownOpen && (
                                <div className="cs-dropdown-list">
                                    {countries.map((country) => (
                                        <div
                                            key={country.code}
                                            className={`cs-dropdown-item${selected.code === country.code ? " cs-dropdown-item--active" : ""}`}
                                            onClick={() => {
                                                setSelected(country);
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            <span>{country.name}</span>
                                            <span className="cs-dropdown-item-currency">
                                                {country.symbol} {country.currency}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button className="cs-save-btn" onClick={handleSave}>
                            Save
                        </button>
                    </>
                ) : (
                    <div className="cs-success">
                        <p className="cs-success-title">Shipping Country Successfully Updated.</p>
                        <button className="cs-save-btn" onClick={onClose}>Continue Shopping</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountrySelector;