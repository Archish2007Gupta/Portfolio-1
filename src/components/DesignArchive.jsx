/* ============================================================
   DesignArchive.jsx — Visual Design Gallery & Exhibition
   ============================================================
   Categories:
   POSTERS, BRANDING, UI/UX, EVENT DESIGN, APPAREL, SOCIAL MEDIA, ID CARDS, CERTIFICATES.
   Visual exhibition layout with tactile cards, badges, and filters.
   ============================================================ */

import React, { useState } from 'react';
import { designCategories, designItems } from '../data/portfolioData.js';

export default function DesignArchive() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filtered =
    activeCategory === 'ALL'
      ? designItems
      : designItems.filter((item) => item.category === activeCategory);

  return (
    <section className="section" id="designs">
      <div className="nirmaan-section-title">
        <span className="badge">05</span>
        <h2>DESIGN ARCHIVE</h2>
      </div>

      <p className="des-statement">
        CODE ISN'T THE ONLY THING I CREATE.
      </p>
      <p className="des-sub">
        From branding and ID cards to posters, apparel, and user interfaces — exploring visual communication and creative design.
      </p>

      {/* Category Filters */}
      <div className="des-filters">
        {designCategories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'filter-btn--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="des-grid">
        {filtered.map((item) => (
          <div key={item.id} className="nirmaan-card des-item">
            {/* Visual Thumbnail */}
            <div
              className="des-visual"
              style={{ backgroundColor: item.accent }}
            >
              <span className="des-visual-label">{item.category}</span>
            </div>

            <div className="des-item-info">
              <span className="des-item-title">{item.title}</span>
              <span className="sticker-tag" style={{ fontSize: '0.55rem', alignSelf: 'flex-start' }}>
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .des-statement {
          font-family: var(--font-hero);
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          line-height: 1.1;
          margin-bottom: 8px;
        }

        .des-sub {
          font-size: 0.95rem;
          color: var(--text-gray);
          margin-bottom: 24px;
        }

        .des-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 32px;
        }

        .des-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .des-item {
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .des-visual {
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: var(--border-medium);
        }

        .des-visual-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.85);
          background: rgba(17, 17, 15, 0.6);
          padding: 4px 10px;
          border-radius: 4px;
        }

        .des-item-info {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .des-item-title {
          font-family: var(--font-hero);
          font-size: 0.9rem;
          font-weight: 800;
          line-height: 1.2;
        }

        @media (max-width: 1000px) {
          .des-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 700px) {
          .des-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .des-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
