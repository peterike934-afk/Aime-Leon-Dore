import { useState, useEffect } from "react";
import "./Accessibility.css";

const options = [
    { key: "bw", label: "Black and White" },
    { key: "high-contrast", label: "High Contrast" },
    { key: "invert-images", label: "Image Invert" },
    { key: "no-style", label: "Remove All Styling" },
];

export default function AccessibilityMenu({ isOpen, onClose }) {
    const [active, setActive] = useState({
        bw: false,
        "high-contrast": false,
        "invert-images": false,
        "no-style": false,
    });

    // Load saved preferences on mount
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("a11y") || "{}");
        setActive(prev => ({ ...prev, ...saved }));
        applyClasses({ ...active, ...saved });
    }, []);

    const applyClasses = (state) => {
        Object.keys(state).forEach((key) => {
            document.body.classList.toggle(key, state[key]);
        });
    };

    const toggle = (key) => {
        const updated = { ...active, [key]: !active[key] };
        setActive(updated);
        applyClasses(updated);
        localStorage.setItem("a11y", JSON.stringify(updated));
    };

    const turnOffAll = () => {
        const reset = { bw: false, "high-contrast": false, "invert-images": false, "no-style": false };
        setActive(reset);
        applyClasses(reset);
        localStorage.setItem("a11y", JSON.stringify(reset));
    };

    if (!isOpen) return null;

    return (
        <div className="a11y-panel">
            <div className="a11y-header">
                <span className="a11y-title">Accessibility Menu</span>
                <button className="a11y-close" onClick={onClose}>✕</button>
            </div>

            <div className="a11y-options">
                {options.map(({ key, label }) => (
                    <button
                        key={key}
                        className={`a11y-option${active[key] ? " a11y-option--active" : ""}`}
                        onClick={() => toggle(key)}
                    >
                        <span>{label}</span>
                        <span className="a11y-chevron">›</span>
                    </button>
                ))}
            </div>

            <div className="a11y-footer">
                <button className="a11y-reset" onClick={turnOffAll}>
                    Turn Off All Options
                </button>
                <button className="a11y-commitment">Commitment to Accessibility</button>
            </div>
        </div>
    );
}