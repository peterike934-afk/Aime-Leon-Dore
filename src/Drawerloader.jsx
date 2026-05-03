import { useEffect, useState, useRef } from "react";

/**
 * DrawerLoader
 *
 * Props:
 *   onDone      — called when the loader finishes
 *   side        — "right" (default) | "left"  — which side the drawer opens from
 *   topOffset   — number (px) — top of the panel area (e.g. entryBottom or HEADER_HEIGHT)
 *   width       — max-width of the panel in px (default 480)
 */
export default function DrawerLoader({ onDone, side = "right", topOffset = 0, width = 480 }) {
  const [fading, setFading] = useState(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2700);
    const doneTimer = setTimeout(() => onDoneRef.current?.(), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  /* Position the overlay so it covers exactly the drawer panel */
  const positionStyle =
    side === "left"
      ? { left: 0, right: "auto" }
      : { right: 0, left: "auto" };

  return (
    <>
      <style>{`
        .dl-overlay {
          position: fixed;
          top: ${topOffset}px;
          bottom: 0;
          width: 100%;
          max-width: ${width}px;
          background: #ffffff;
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.3s ease;
        }
        .dl-overlay--out {
          opacity: 0;
          pointer-events: none;
        }
        .dl-dots {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .dl-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #e0e0e0;
        }
        .dl-dot--1 { animation: dl-dot1 1.2s ease-in-out infinite; }
        .dl-dot--2 { animation: dl-dot2 1.2s ease-in-out infinite; }
        .dl-dot--3 { animation: dl-dot3 1.2s ease-in-out infinite; }

        @keyframes dl-dot1 {
          0%, 100%        { background: #1a1a1a; transform: scale(1.25); }
          25%, 50%, 75%   { background: #e0e0e0; transform: scale(1);    }
        }
        @keyframes dl-dot2 {
          0%, 100%        { background: #e0e0e0; transform: scale(1);    }
          25%, 75%        { background: #1a1a1a; transform: scale(1.25); }
          50%             { background: #e0e0e0; transform: scale(1);    }
        }
        @keyframes dl-dot3 {
          0%, 25%, 75%, 100% { background: #e0e0e0; transform: scale(1);    }
          50%                { background: #1a1a1a; transform: scale(1.25); }
        }

        @media (max-width: 768px) {
          .dl-overlay { max-width: 100%; }
        }
      `}</style>

      <div
        className={`dl-overlay${fading ? " dl-overlay--out" : ""}`}
        style={positionStyle}
      >
        <div className="dl-dots">
          <div className="dl-dot dl-dot--1" />
          <div className="dl-dot dl-dot--2" />
          <div className="dl-dot dl-dot--3" />
        </div>
      </div>
    </>
  );
}
