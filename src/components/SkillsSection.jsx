/* ============================================================
   SkillsSection.jsx — Nirmaan 2026 Tech Stack & Capabilities Radar
   Backend-Driven Skills System (GitHub Projects + skills.json)
   ============================================================ */

import React, { useState, useEffect, useMemo } from 'react';
import { getSkills } from '../services/skillsApi.js';

// Visual accent colors for tech categories
const CATEGORY_COLORS = {
  Languages: '#0072E3',
  Frontend: '#FFB200',
  Backend: '#EF333A',
  Database: '#00AA3C',
  'AI / ML': '#AB54F7',
  Tools: '#FF6100',
  'Hardware / IoT': '#22C55E',
  Other: '#64748B'
};

export default function SkillsSection() {
  const [skillsList, setSkillsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    let isMounted = true;

    async function loadSkills() {
      try {
        setLoading(true);
        setError(null);
        const data = await getSkills();
        if (isMounted) {
          if (data && Array.isArray(data.skills)) {
            setSkillsList(data.skills);
          } else {
            setSkillsList([]);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.warn('[SKILLS SECTION] Failed to load dynamic skills:', err);
          setError('Technology stack temporarily unavailable.');
          setSkillsList([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadSkills();
    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamically compute available categories that actually contain skills
  const availableCategories = useMemo(() => {
    if (!skillsList || skillsList.length === 0) return ['ALL'];
    const cats = new Set(['ALL']);
    for (const skill of skillsList) {
      if (skill.category) {
        cats.add(skill.category.toUpperCase());
      }
    }
    return Array.from(cats);
  }, [skillsList]);

  // Filtered skills based on active category
  const filteredSkills = useMemo(() => {
    if (activeCategory === 'ALL') {
      return skillsList;
    }
    return skillsList.filter(
      s => s.category && s.category.toUpperCase() === activeCategory
    );
  }, [skillsList, activeCategory]);

  return (
    <section className="nirmaan-section" id="skills">
      
      {/* Section Header */}
      <div className="nirmaan-section-title">
        <span className="badge">06</span>
        <h2>TECH STACK &amp; CAPABILITIES RADAR</h2>
      </div>

      <p className="skills-intro">
        Engineering stack, core frameworks, and verified tooling synthesized directly from active GitHub repositories and applied project architectures.
      </p>

      {/* Main Board Container */}
      <div className="brutal-card skills-board-card">
        
        {/* Category Switcher Tabs */}
        {availableCategories.length > 1 && (
          <div className="skills-tab-bar">
            {availableCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`skills-tab-btn clay-card ${isActive ? 'skills-tab-btn--active' : ''}`}
                >
                  <span className="tab-category-name">{cat}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Skills Grid */}
        <div className="skills-grid-container">
          {loading && (
            <div className="skills-loading-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skill-card brutal-card clay-card skill-card-skeleton">
                  <div className="skeleton-title" />
                  <div className="skeleton-meta" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="skills-empty-state">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && filteredSkills.length === 0 && (
            <div className="skills-empty-state">
              <p>No verified technologies found in this category.</p>
            </div>
          )}

          {!loading && !error && filteredSkills.map((skill) => {
            const catColor = CATEGORY_COLORS[skill.category] || '#0072E3';
            const isGithub = skill.source === 'github';

            return (
              <div key={skill.id} className="skill-card brutal-card clay-card">
                
                {/* Top Metadata Row */}
                <div className="skill-card-top">
                  <span
                    className="skill-category-tag"
                    style={{ color: catColor, borderColor: catColor }}
                  >
                    {skill.category || 'Other'}
                  </span>

                  {isGithub ? (
                    <span className="skill-source-pill skill-source-pill--github">
                      GITHUB · {skill.count} {skill.count === 1 ? 'REPO' : 'REPOS'}
                    </span>
                  ) : (
                    <span className="skill-source-pill skill-source-pill--curated">
                      CURATED
                    </span>
                  )}
                </div>

                {/* Skill Name */}
                <h3 className="skill-name">{skill.name}</h3>

                {/* Associated Repositories Chip List */}
                {skill.projects && skill.projects.length > 0 && (
                  <div className="skill-projects-wrap">
                    <span className="projects-label">USED IN:</span>
                    <div className="projects-pills">
                      {skill.projects.map((proj) => (
                        <span key={proj} className="proj-pill" title={proj}>
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .skills-intro {
          font-size: 1.05rem;
          color: var(--text-gray);
          max-width: 680px;
          margin-bottom: 36px;
        }

        .skills-board-card {
          overflow: hidden;
          background: #FFFFFF;
        }

        /* Tabs */
        .skills-tab-bar {
          display: flex;
          background: rgba(244, 233, 225, 0.6);
          border-bottom: var(--border-medium);
          padding: 14px 20px;
          gap: 10px;
          flex-wrap: wrap;
        }

        .skills-tab-btn {
          background: #FFFFFF;
          color: var(--text-ink);
          border-radius: var(--radius-pill);
          padding: 8px 18px;
          display: flex;
          align-items: center;
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          transition: all 0.2s ease;
          border: 1.5px solid rgba(0, 0, 0, 0.12);
        }

        .skills-tab-btn:hover {
          transform: translateY(-2px);
        }

        .skills-tab-btn--active {
          background: var(--text-ink);
          color: var(--color-yellow);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          border-color: var(--text-ink);
        }

        /* Grid */
        .skills-grid-container {
          padding: 24px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }

        @media (min-width: 1024px) {
          .skills-grid-container {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
          }
        }

        .skill-card {
          background: rgba(244, 233, 225, 0.45);
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 16px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .skill-card:hover {
          transform: translateY(-3px);
          background-color: #FFFFFF;
          box-shadow: 0 8px 0 rgba(0, 0, 0, 0.12);
        }

        .skill-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .skill-category-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .skill-source-pill {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: var(--radius-pill);
          letter-spacing: 0.04em;
        }

        .skill-source-pill--github {
          background: rgba(0, 114, 227, 0.12);
          color: var(--color-blue);
        }

        .skill-source-pill--curated {
          background: rgba(0, 170, 60, 0.12);
          color: #00AA3C;
        }

        .skill-name {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 900;
          color: var(--text-ink);
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .skill-projects-wrap {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: auto;
          padding-top: 10px;
          border-top: 1px dashed rgba(0, 0, 0, 0.08);
        }

        .projects-label {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }

        .projects-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .proj-pill {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.1);
          color: var(--text-ink);
          padding: 2px 7px;
          border-radius: 6px;
          max-width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Loading Skeleton */
        .skills-loading-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
          width: 100%;
          grid-column: 1 / -1;
        }

        .skill-card-skeleton {
          min-height: 110px;
          opacity: 0.6;
          animation: pulseSkeleton 1.6s ease-in-out infinite;
        }

        @keyframes pulseSkeleton {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.85; }
        }

        .skeleton-title {
          height: 20px;
          width: 60%;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 4px;
        }

        .skeleton-meta {
          height: 14px;
          width: 40%;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
          margin-top: 12px;
        }

        .skills-empty-state {
          grid-column: 1 / -1;
          padding: 40px 20px;
          text-align: center;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
