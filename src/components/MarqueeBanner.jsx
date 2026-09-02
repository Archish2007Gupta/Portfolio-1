/* ============================================================
   MarqueeBanner.jsx — Infinite Scrolling Ticker
   ============================================================
   A horizontal scrolling banner that repeats text infinitely.
   Common on editorial and brutalist websites.
   
   BEGINNER TIP:
   - CSS @keyframes creates the infinite scroll animation
   - We duplicate the text so it loops seamlessly
   - The banner uses overflow:hidden to clip the moving text
   ============================================================ */

import React from 'react';

export default function MarqueeBanner() {
  // The text that repeats in the ticker
  const items = [
    'DESIGN',
    '✦',
    'CODE',
    '✦',
    'CREATE',
    '✦',
    'BUILD',
    '✦',
    'EXPERIMENT',
    '✦',
    'DESIGN',
    '✦',
    'CODE',
    '✦',
    'CREATE',
    '✦',
    'BUILD',
    '✦',
    'EXPERIMENT',
    '✦',
  ];

  return (
    <div className="marquee">
      <div className="marquee__track">
        {/* Render the items twice so the loop is seamless */}
        {[0, 1].map((group) => (
          <div key={group} className="marquee__group" aria-hidden={group === 1}>
            {items.map((item, i) => (
              <span
                key={`${group}-${i}`}
                className={item === '✦' ? 'marquee__dot' : 'marquee__text'}
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        .marquee {
          width: 100%;
          overflow: hidden;
          border-top: var(--border);
          border-bottom: var(--border);
          padding: var(--space-lg) 0;
          background: var(--text-black);
        }

        .marquee__track {
          display: flex;
          width: max-content;
          animation: marqueeScroll 20s linear infinite;
        }

        .marquee__group {
          display: flex;
          gap: var(--space-xl);
          padding-right: var(--space-xl);
          flex-shrink: 0;
        }

        .marquee__text {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--bg-cream);
          white-space: nowrap;
        }

        .marquee__dot {
          font-size: clamp(1rem, 2vw, 1.5rem);
          color: var(--accent-yellow);
          display: flex;
          align-items: center;
        }

        /* Infinite scroll animation */
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee:hover .marquee__track {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
