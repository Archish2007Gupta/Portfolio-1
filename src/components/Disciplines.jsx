/* ============================================================
   Disciplines.jsx — Skills & Areas of Work (Categorized Tags)
   ============================================================
   Organized into: CODE, WEB / DEVELOPMENT, IoT, DESIGN, INTERESTS.
   No fake percentage bars — editorial technical tag clusters with hover lifts.
   ============================================================ */

import React from 'react';
import { skillCategories, disciplines } from '../data/portfolioData.js';

export default function Disciplines() {
  return (
    <section className="section" id="work">
      {/* Section Title */}
      <div className="nirmaan-section-title">
        <span className="badge">02</span>
        <h2>SKILLS & DISCIPLINES</h2>
      </div>

      {/* Skills Matrix Grid */}
      <div className="skills-matrix">
        {skillCategories.map((cat) => (
          <div key={cat.category} className="nirmaan-card skill-cat-card">
            {/* Color Top Banner */}
            <div
              className="card-header-banner"
              style={{ background: cat.accent }}
            >
              <span>{cat.category}</span>
              <span>✦</span>
            </div>

            {/* Skill Tags List */}
            <div className="skill-cat-body">
              <div className="skill-tags-wrapper">
                {cat.skills.map((skill) => (
                  <span key={skill} className="sticker-tag skill-tag">
                    ✦ {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* What I Build Cards Grid */}
      <div className="disciplines-header" style={{ marginTop: '48px', marginBottom: '24px' }}>
        <h3 className="disciplines-sub-title">WHAT I BUILD</h3>
      </div>
      <div className="disciplines-grid">
        {disciplines.map((d) => (
          <div key={d.number} className="nirmaan-card discipline-card">
            <div
              className="card-header-banner"
              style={{ background: d.accent }}
            >
              <span>DISCIPLINE //{d.number}</span>
              <span>✦</span>
            </div>
            <div className="discipline-body">
              <h4 className="discipline-title">{d.title}</h4>
              <p className="discipline-desc">{d.description}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .skills-matrix {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .skill-cat-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .skill-cat-body {
          padding: 20px;
          flex: 1;
        }

        .skill-tags-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-tag {
          font-size: 0.7rem;
          background: #FFFFFF;
          padding: 6px 12px;
          transition: transform 0.15s ease, background 0.15s ease;
        }

        .skill-tag:hover {
          background: var(--nirmaan-yellow);
          transform: translate(-2px, -2px);
        }

        .disciplines-sub-title {
          font-family: var(--font-hero);
          font-size: 1.4rem;
          letter-spacing: -0.01em;
        }

        .disciplines-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .discipline-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .discipline-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .discipline-title {
          font-family: var(--font-hero);
          font-size: 1.1rem;
        }

        .discipline-desc {
          font-size: 0.85rem;
          color: var(--text-gray);
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .skills-matrix, .disciplines-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .skills-matrix, .disciplines-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
