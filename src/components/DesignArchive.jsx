/* ============================================================
   DesignArchive.jsx — Exact Nirmaan Department / Gallery Grid Format
   ============================================================ */

import React, { useState } from 'react';
import { designGallery } from '../data/portfolioData.js';
import { ArrowUpRight, CloseIcon } from './Icons.jsx';

export default function DesignArchive({ onOpenContact }) {
  const [selectedAsset, setSelectedAsset] = useState(null);

  // Curated showcase of 6 design assets
  const items = designGallery.slice(0, 6);

  return (
    <section id="gallery" className="nirmaan-gallery-section" data-reveal>
      {/* Red Clay Container (Matching attached Nirmaan Department showcase) */}
      <div className="design-dept-container clay-card">
        
        {/* Top Header Row */}
        <div className="dept-header-top">
          <span className="dept-kicker">ARCHISHA 2026 // VISUAL WORKS</span>
          <span className="dept-count-pill">6 WORKS</span>
        </div>

        {/* Big Headline */}
        <h2 className="dept-headline">DESIGN GALLERY</h2>

        {/* Subtext Description */}
        <p className="dept-description">
          The visual identity, branding systems, hackathon collaterals, and print designs crafted by Archisha.
        </p>

        {/* 2-Column Grid of White Member/Asset Cards */}
        <div className="dept-cards-grid">
          {items.map((item) => (
            <div
              key={item.id}
              className="dept-card clay-card"
              onClick={() => setSelectedAsset(item)}
            >
              {/* Top Info Row */}
              <div className="dept-card-top">
                
                {/* Left: Thumbnail Icon/Preview Squircle */}
                <div
                  className="dept-thumb-frame"
                  style={{ background: item.color }}
                >
                  <span className="dept-thumb-icon">
                    {item.id === 1 && '🎨'}
                    {item.id === 2 && '⚡'}
                    {item.id === 3 && '🪪'}
                    {item.id === 4 && '👕'}
                    {item.id === 5 && '📱'}
                    {item.id === 6 && '📰'}
                  </span>
                </div>

                {/* Right: Title, Category & Badges */}
                <div className="dept-card-info">
                  <h3 className="dept-item-title">{item.title.toUpperCase()}</h3>
                  <p className="dept-item-subtitle">{item.category} (Coding Club &amp; Events)</p>
                  
                  {/* Badges Stack */}
                  <div className="dept-badges-stack">
                    <span className="badge-pill badge-pill--yellow">
                      {item.category.toUpperCase()}
                    </span>
                    {item.tags[0] && (
                      <span className="badge-pill badge-pill--black">
                        {item.tags[0].toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>

              </div>

              {/* Divider Line */}
              <div className="dept-divider" />

              {/* Bottom Action Bar */}
              <div className="dept-card-bottom">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAsset(item);
                  }}
                  className="dept-pill-btn"
                >
                  <span>DETAILS</span>
                  <ArrowUpRight size={11} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenContact) onOpenContact();
                    else setSelectedAsset(item);
                  }}
                  className="dept-pill-btn"
                >
                  <span>VIEW ASSET</span>
                  <ArrowUpRight size={11} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive Asset Detail Modal */}
      {selectedAsset && (
        <div className="dialog-backdrop" onClick={() => setSelectedAsset(null)} role="dialog" aria-modal="true">
          <div className="dialog-content text-ink cert-modal-content" onClick={(e) => e.stopPropagation()}>
            
            <button
              onClick={() => setSelectedAsset(null)}
              className="modal-close-btn clay-card"
              aria-label="Close dialog"
            >
              <CloseIcon size={16} />
            </button>

            {/* Modal Header Banner */}
            <div className="cert-modal-header" style={{ background: selectedAsset.color, color: '#FFFFFF' }}>
              <div className="cert-modal-badge-row">
                <span className="canvas-cat-badge">🎨 {selectedAsset.category}</span>
                <span className="cert-gold-seal">★ ARCHISHA PORTFOLIO</span>
              </div>
              <h2 className="cert-modal-title">{selectedAsset.title}</h2>
              <p className="cert-modal-date">Curated Visual Specimen · 2025–2026</p>
            </div>

            {/* Modal Body */}
            <div className="cert-modal-body">
              <p className="cert-modal-desc">{selectedAsset.description}</p>
              
              <div className="cert-skills-box">
                <span className="cert-skills-label">DESIGN SPECIFICATIONS &amp; TOOLS:</span>
                <div className="about-pills-row">
                  {selectedAsset.tags.map((tag) => (
                    <span key={tag} className="tech-pill">
                      ✦ {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="cert-id-bar clay-card">
                <div>
                  <p className="quick-label">DELIVERABLE TYPE</p>
                  <p className="quick-val">{selectedAsset.category} System</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedAsset(null);
                    if (onOpenContact) onOpenContact();
                  }}
                  className="cert-verify-btn clay-card"
                >
                  Request Full High-Res Figma File ↗
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .design-dept-container {
          background-color: #EF333A;
          border-radius: 36px;
          padding: 32px 24px 36px 24px;
          border: 3px solid #000000;
          box-shadow: 6px 6px 0px #000000;
          color: #11110F;
        }

        @media (min-width: 640px) {
          .design-dept-container {
            border-radius: 40px;
            padding: 40px 36px 44px 36px;
          }
        }

        .dept-header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .dept-kicker {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: #11110F;
        }

        .dept-count-pill {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          color: #FFFFFF;
        }

        .dept-headline {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #11110F;
          margin: 4px 0 14px 0;
        }

        .dept-description {
          font-size: clamp(1.05rem, 1.4vw, 1.25rem);
          font-weight: 700;
          color: #11110F;
          line-height: 1.4;
          max-width: 780px;
          margin-bottom: 28px;
        }

        /* ── Cards Grid (3 in one row on desktop) ── */
        .dept-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 640px) {
          .dept-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (min-width: 1025px) {
          .dept-cards-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
          }
        }

        /* ── White Card ── */
        .dept-card {
          background: #FFFFFF;
          border-radius: 22px;
          padding: 18px 18px;
          border: 2px solid #000000;
          box-shadow: 4px 4px 0px #000000;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .dept-card:hover {
          transform: translateY(-3px) scale(1.01);
          box-shadow: 6px 6px 0px #000000;
        }

        .dept-card-top {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .dept-thumb-frame {
          width: 58px;
          height: 58px;
          border-radius: 16px;
          border: 2px solid #000000;
          box-shadow: 2px 2px 0px #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .dept-thumb-icon {
          font-size: 1.6rem;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }

        .dept-card-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
        }

        .dept-item-title {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 900;
          color: #11110F;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .dept-item-subtitle {
          font-size: 0.78rem;
          font-weight: 700;
          color: rgba(17, 17, 15, 0.7);
        }

        .dept-badges-stack {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 6px;
          flex-wrap: wrap;
        }

        .badge-pill {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 900;
          letter-spacing: 0.05em;
          padding: 2px 8px;
          border-radius: 9999px;
          line-height: 1.2;
        }

        .badge-pill--yellow {
          background: #FFB200;
          color: #11110F;
          border: 1px solid #000000;
          box-shadow: 1px 1px 0px #000000;
        }

        .badge-pill--black {
          background: #11110F;
          color: #FFFFFF;
        }

        .dept-divider {
          height: 1px;
          background: rgba(17, 17, 15, 0.1);
          margin: 14px 0 12px 0;
        }

        .dept-card-bottom {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 8px;
        }

        .dept-pill-btn {
          background: #11110F;
          color: #FFFFFF;
          padding: 6px 14px;
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.05em;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .dept-pill-btn:hover {
          background: #FFB200;
          color: #11110F;
          border-color: #000000;
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
}
