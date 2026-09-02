/* ============================================================
   SectionTitle.jsx — Nirmaan 2026 Signature Section Divider
   ============================================================ */

import React from 'react';
import { DownArrows } from './Icons.jsx';

export default function SectionTitle({
  children,
  bgColor = '#0072E3',
  textColor = '#FFB200',
}) {
  return (
    <div
      className="nirmaan-section-divider"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div className="section-divider-inner">
        <DownArrows />
        <h2 className="section-divider-text">{children}</h2>
        <DownArrows />
      </div>

      <style>{`
        .nirmaan-section-divider {
          border-top: var(--border-thick);
          border-bottom: var(--border-thick);
          padding: 16px 24px;
          margin: 40px 0;
          user-select: none;
        }

        .section-divider-inner {
          max-width: 1320px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .section-divider-text {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 2.5vw, 2rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          text-align: center;
          color: #11110F;
          line-height: 1;
        }

        @media (max-width: 600px) {
          .section-divider-inner svg {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
