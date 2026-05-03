import { useEffect, useState, useRef } from "react";

export default function FlowerSplash({ onDone }) {
  const [fading, setFading] = useState(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 4200);
    const doneTimer = setTimeout(() => onDoneRef.current?.(), 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []); // ← empty: runs once on mount, timers never reset

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 9999, background: "#ffffff",
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: fading ? 0 : 1,
      transition: "opacity 0.8s ease",
      pointerEvents: fading ? "none" : "all",
    }}>
      <style>{`
        @keyframes flowerSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      <img
        src="/aimelogo.png"
        alt="Loading"
        style={{
          width: "45px",
          height: "45px",
          objectFit: "contain",
          animation: "flowerSpin 1.6s linear infinite",
        }}
      />
    </div>
  );
}
