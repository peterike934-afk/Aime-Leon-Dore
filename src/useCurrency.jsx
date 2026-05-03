import { useState, useEffect } from "react";

const rates = {
    USD: 1,
    GBP: 0.79,
    CAD: 1.36,
    EUR: 0.92,
    JPY: 149.5,
    AUD: 1.53,
    NGN: 1580,
    GHS: 12.5,
    ZAR: 18.6,
};

export function useCurrency() {
    const [currency, setCurrency] = useState(localStorage.getItem("currency") || "USD");
    const [symbol, setSymbol] = useState(localStorage.getItem("symbol") || "$");

    useEffect(() => {
        const update = () => {
            setCurrency(localStorage.getItem("currency") || "USD");
            setSymbol(localStorage.getItem("symbol") || "$");
        };
        window.addEventListener("storage", update);
        return () => window.removeEventListener("storage", update);
    }, []);

    const convert = (priceStr) => {
        // Strip any existing symbol and parse the number
        const base = parseFloat(String(priceStr).replace(/[^0-9.]/g, ""));
        if (isNaN(base)) return priceStr;

        const rate = rates[currency] ?? 1;
        const converted = base * rate;

        // Format nicely — JPY and NGN don't use decimals
        const noDecimals = ["JPY", "NGN", "GHS"];
        const formatted = noDecimals.includes(currency)
            ? Math.round(converted).toLocaleString()
            : converted.toFixed(2);

        return `${symbol}${formatted}`;
    };

    return { currency, symbol, convert };
}