/* ============================================================
   DesignArchive.jsx — Nirmaan 2026 Exact Event Gallery Format
   ============================================================ */

import React from 'react';
import { designGallery } from '../data/portfolioData.js';
import { ArrowUpRight } from './Icons.jsx';

export default function DesignArchive({ onOpenContact }) {
  // Triplicated array for smooth infinite marquee loop
  const marqueeItems = [...designGallery, ...designGallery, ...designGallery];

  return (
    <section id="design-archive" className="nirmaan-gallery-section" data-reveal>
      <div className="gallery-card-wrapper clay-card">
        
        {/* Header with Navigation Link */}
        <div className="gallery-header-row">
          <div>
            <span className="gallery-kicker">
              ARCHISHA ARCHIVES // LIVE REEL
            </span>
            <h2 className="gallery-headline">
              Design Gallery
            </h2>
          </div>

          {/* Action Trigger Button */}
          <button
            onClick={onOpenContact}
            className="gallery-action-btn clay-card"
          >
            <span>View Full Archive</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Single Row Horizontal Infinite Scroller */}
        <div className="gallery-scroller-viewport">
          <div className="gallery-marquee-track">
            {marqueeItems.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                className="gallery-card-item"
                onClick={onOpenContact}
              >
                <div className="gallery-card-inner clay-card">
                  
                  {/* Aspect Video Preview Visual Canvas */}
                  <div
                    className="gallery-preview-canvas"
                    style={{ background: item.color }}
                  >
                    <div className="canvas-gradient-overlay" />
                    
                    {/* Badge & Category */}
                    <div className="canvas-top-bar">
                      <span className="canvas-cat-badge">{item.category}</span>
                      <span className="canvas-id-badge">#{String(item.id).padStart(2, '0')}</span>
                    </div>

                    {/* Graphic Artwork Simulation */}
                    <div className="canvas-artwork-center">
                      <div className="artwork-icon-wrap">
                        {item.category === 'Branding' && '✦'}
                        {item.category === 'Posters' && '✹'}
                        {item.category === 'ID Cards' && '🪪'}
                        {item.category === 'Apparel' && '👕'}
                        {item.category === 'UI/UX' && '❖'}
                        {item.category === 'Certificates' && '🏆'}
                        {item.category === 'Social Media' && '📱'}
                      </div>
                      <p className="artwork-title-preview">{item.title}</p>
                    </div>

                    {/* Bottom Tag Bar */}
                    <div className="canvas-bottom-bar">
                      <span>{item.tags[0]}</span>
                      <span>✦</span>
                      <span>{item.tags[1] || 'Design'}</span>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .nirmaan-gallery-section {
          width: 100%;
          margin: 40px 0;
        }

        .gallery-card-wrapper {
          background-color: var(--color-purple);
          padding: 24px;
          border-radius: var(--radius-brand);
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .gallery-card-wrapper {
            padding: 32px 28px;
          }
        }

        /* ── Header Row ── */
        .gallery-header-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding-bottom: 20px;
          margin-bottom: 24px;
        }

        .gallery-kicker {
          font-family: var(--font-display);
          font-size: clamp(10px, 1.5vw, 12px);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-yellow);
          font-weight: 900;
          display: block;
        }

        .gallery-headline {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          text-transform: uppercase;
          color: #FFFFFF;
          font-weight: 900;
          line-height: 1.05;
          margin-top: 4px;
          letter-spacing: -0.03em;
        }

        .gallery-action-btn {
          border-radius: var(--radius-pill);
          background-color: var(--color-yellow);
          padding: 10px 20px;
          font-family: var(--font-display);
          font-size: 0.82rem;
          text-transform: uppercase;
          font-weight: 900;
          color: #11110F;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }

        .gallery-action-btn:hover {
          transform: scale(1.05);
          background-color: #FFFFFF;
        }

        .gallery-action-btn:active {
          transform: translateY(2px);
        }

        /* ── Single Row Horizontal Scroller ── */
        .gallery-scroller-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 10px 0;
        }

        .gallery-marquee-track {
          display: flex;
          width: max-content;
          gap: 20px;
          align-items: center;
          animation: marqueeScroll 34s linear infinite;
        }

        .gallery-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .gallery-card-item {
          flex-shrink: 0;
          width: 260px;
          cursor: pointer;
        }

        @media (min-width: 640px) {
          .gallery-card-item {
            width: 320px;
          }
        }

        .gallery-card-inner {
          background-color: var(--bg-paper);
          padding: 10px;
          border-radius: 20px;
          color: var(--text-ink);
          border: 2px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          overflow: hidden;
        }

        .gallery-card-inner:hover {
          transform: scale(1.03);
        }

        /* ── Preview Canvas (Aspect Video) ── */
        .gallery-preview-canvas {
          position: relative;
          aspect-ratio: 16 / 9;
          width: 100%;
          overflow: hidden;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 14px;
          color: #FFFFFF;
          transition: transform 0.5s ease;
        }

        .gallery-preview-canvas:hover {
          transform: scale(1.04);
        }

        .canvas-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%);
          pointer-events: none;
        }

        .canvas-top-bar {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .canvas-cat-badge {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 900;
          background: rgba(0, 0, 0, 0.4);
          padding: 2px 8px;
          border-radius: var(--radius-pill);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .canvas-id-badge {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 800;
          color: var(--color-yellow);
        }

        .canvas-artwork-center {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
        }

        .artwork-icon-wrap {
          font-size: 1.8rem;
          line-height: 1;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }

        .artwork-title-preview {
          font-family: var(--font-display);
          font-size: 0.88rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          line-height: 1.15;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
          max-width: 90%;
        }

        .canvas-bottom-bar {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.55rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.85);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
      `}</style>
    </section>
  );
}
