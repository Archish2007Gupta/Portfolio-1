/* ============================================================
   MarqueeBanner.jsx — Nirmaan 2026 Kinetic Ticker Ribbon
   ============================================================ */

import React from 'react';

export default function MarqueeBanner({
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
  speed = '50s',
  reverse = false,
}) {
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className="nirmaan-marquee-container"
      style={{
        backgroundColor: bgColorHex,
        color: textColorHex,
      }}
    >
      <div 
        className={`nirmaan-marquee-track ${reverse ? 'nirmaan-marquee-track--reverse' : ''}`}
        style={{ animationDuration: speed }}
      >
        <div className="nirmaan-marquee-group">
          {repeated.map((item, idx) => (
            <span key={`a-${idx}`} className="nirmaan-marquee-item">
              {item}
            </span>
          ))}
        </div>
        <div className="nirmaan-marquee-group" aria-hidden="true">
          {repeated.map((item, idx) => (
            <span key={`b-${idx}`} className="nirmaan-marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .nirmaan-marquee-container {
          overflow: hidden;
          white-space: nowrap;
          border-top: var(--border-thick);
          border-bottom: var(--border-thick);
          padding: 12px 0;
          margin: 32px 0;
          display: flex;
          user-select: none;
          width: 100%;
        }

        .nirmaan-marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marqueeScroll 50s linear infinite;
        }

        .nirmaan-marquee-track--reverse {
          animation: marqueeScrollReverse 50s linear infinite;
        }

        .nirmaan-marquee-group {
          display: flex;
          align-items: center;
          gap: 32px;
          padding-right: 32px;
          flex-shrink: 0;
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

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeScrollReverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
}
