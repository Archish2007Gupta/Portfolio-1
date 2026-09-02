/* ============================================================
   MarqueeBanner.jsx — Nirmaan 2026 Kinetic Ticker Ribbon
   ============================================================ */

import React from 'react';

export default function MarqueeBanner({
  color = 'bg-red',
  textColor = 'text-yellow',
  bgColorHex = '#EF333A',
  textColorHex = '#FFB200',
  items = [
    '✦ ARCHISHA GUPTA',
    '✦ CREATIVE DEVELOPER',
    '✦ UI/UX DESIGNER',
    '✦ CSE @ BMSIT 2025–29',
    '✦ CODING CLUB CORE',
    '✦ ROTARACT EDITORIAL',
    '✦ BUILD. INNOVATE. IMPACT.',
  ],
}) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className="nirmaan-marquee-container"
      style={{
        backgroundColor: bgColorHex,
        color: textColorHex,
      }}
    >
      <div className="nirmaan-marquee-track">
        {repeated.map((item, idx) => (
          <span key={idx} className="nirmaan-marquee-item">
            {item}
          </span>
        ))}
      </div>

      <style>{`
        .nirmaan-marquee-container {
          overflow: hidden;
          white-space: nowrap;
          border-top: var(--border-thick);
          border-bottom: var(--border-thick);
          padding: 12px 0;
          display: flex;
          user-select: none;
        }

        .nirmaan-marquee-track {
          display: flex;
          gap: 32px;
          animation: marquee 24s linear infinite;
          will-change: transform;
        }

        .nirmaan-marquee-container:hover .nirmaan-marquee-track {
          animation-play-state: paused;
        }

        .nirmaan-marquee-item {
          font-family: var(--font-display);
          font-size: clamp(1rem, 1.6vw, 1.25rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }
      `}</style>
    </div>
  );
}
