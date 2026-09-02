/* ============================================================
   ProjectsSection.jsx — Scroll-Driven Horizontal Flow
   ============================================================
   Features:
   - Sticky left "ONE FLOW." red card (remains fixed in place).
   - Scroll-Driven Movement: As the user scrolls down the page vertically,
     the project cards track dynamically translates to the left!
   - Full responsive fallback for touch/mobile screens.
   ============================================================ */

import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../data/portfolioData.js';

// Specific bullet points for each project
const PROJECT_BULLETS = {
  echonex: [
    'Smart voice-controlled assistant combining ESP32 & sensors',
    'AI interaction with real-time web control dashboard',
    'Supabase integration for cloud state & automation',
  ],
  cleanzy: [
    'On-demand waste pickup & scheduling platform',
    'Smart route tracking & digital waste management',
    'Clean UI/UX designed around user convenience',
  ],
  way2uni: [
    'Campus discovery & interactive building navigation',
    'AI-assisted routing for students & visitors',
    'Integrated map vectors & facility guide',
  ],
  sparkhabit: [
    'Platform for short daily creative challenges',
    'Consistency tracking & streak system',
    'Designed to spark visual exploration & habits',
  ],
};

function ProjectThumbnail({ project }) {
  return (
    <div className="oneflow-thumb" style={{ background: project.accent + '20' }}>
      <span className="oneflow-thumb__badge">
        PROJECT {project.number}
      </span>
      <div className="oneflow-thumb__content">
        <span className="oneflow-thumb__num">{project.number}</span>
        <span className="oneflow-thumb__title">{project.title}</span>
        <div className="oneflow-thumb__tags">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="oneflow-thumb__tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const outerSectionRef = useRef(null);
  const trackRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!outerSectionRef.current || !trackRef.current) return;

      // Measure the outer sticky section bounds
      const section = outerSectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Total distance the section will be sticky
      const totalStickyScroll = section.offsetHeight - windowHeight;
      if (totalStickyScroll <= 0) return;

      // Distance scrolled into the sticky section
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalStickyScroll));

      // Calculate maximum horizontal shift needed for the track
      const track = trackRef.current;
      const maxShift = track.scrollWidth - track.clientWidth;

      // Set smooth translateX position based on vertical page scroll progress
      setTranslateX(progress * maxShift);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position update

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manual arrow button navigation
  const scrollManual = (direction) => {
    if (!outerSectionRef.current || !trackRef.current) return;
    const track = trackRef.current;
    const maxShift = track.scrollWidth - track.clientWidth;
    const step = 380;
    
    setTranslateX((prev) => {
      const next = direction === 'left' ? prev - step : prev + step;
      return Math.max(0, Math.min(maxShift, next));
    });
  };

  return (
    <div className="oneflow-sticky-outer" ref={outerSectionRef} id="projects">
      <div className="oneflow-sticky-inner">
        <div className="section oneflow-section">
          {/* Top Header Badge */}
          <div className="oneflow-header-bar">
            <span className="sticker-tag sticker-tag--blue">✦ PROJECT INDEX / 04 PROJECTS</span>
            <span className="sticker-tag sticker-tag--yellow">SCROLL TO EXPLORE WORK</span>
          </div>

          {/* Main Grid: Fixed Left Card + Scroll-Driven Right Track */}
          <div className="oneflow-grid">
            
            {/* ── Left Column: Red Vertical Card (Kept Fixed) ── */}
            <div className="oneflow-left-card">
              <div className="oneflow-icon-wrap">
                <div className="oneflow-diamond">
                  <div className="oneflow-diamond__inner" />
                </div>
              </div>

              <div className="oneflow-left-content">
                <h2 className="oneflow-left-title">
                  ONE FLOW.
                </h2>
                <p className="oneflow-left-desc">
                  A few things I’ve built while figuring out how code, design and ideas can work together from kickoff to live deployment.
                </p>
              </div>

              {/* Manual Arrow Buttons */}
              <div className="oneflow-nav-arrows">
                <button
                  className="oneflow-arrow-btn"
                  onClick={() => scrollManual('left')}
                  aria-label="Scroll left"
                >
                  ←
                </button>
                <button
                  className="oneflow-arrow-btn"
                  onClick={() => scrollManual('right')}
                  aria-label="Scroll right"
                >
                  →
                </button>
              </div>
            </div>

            {/* ── Right Column: Dynamically Translating Project Cards Track ── */}
            <div className="oneflow-track-wrap">
              <div
                className="oneflow-track"
                ref={trackRef}
                style={{
                  transform: `translateX(-${translateX}px)`,
                }}
              >
                {projects.map((project) => {
                  const bullets = PROJECT_BULLETS[project.id] || [];

                  return (
                    <div key={project.id} className="oneflow-card">
                      <ProjectThumbnail project={project} />

                      <div className="oneflow-card__body">
                        <div className="oneflow-card__header">
                          <h3 className="oneflow-card__title">{project.title}</h3>
                          <span className="oneflow-card__subtitle">{project.category}</span>
                        </div>

                        <div className="oneflow-card__divider" />

                        <ul className="oneflow-card__bullets">
                          {bullets.map((bullet, i) => (
                            <li key={i}>
                              <span className="oneflow-bullet-dot">●</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="oneflow-card__footer">
                          {project.github ? (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="oneflow-link-btn"
                            >
                              VIEW PROJECT ↗
                            </a>
                          ) : (
                            <span className="oneflow-link-btn oneflow-link-btn--disabled">
                              IN DEVELOPMENT
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Scoped Styling ── */}
      <style>{`
        /* Outer Sticky Container */
        .oneflow-sticky-outer {
          position: relative;
          height: 250vh;
        }

        .oneflow-sticky-inner {
          position: sticky;
          top: 90px;
          height: calc(100vh - 110px);
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .oneflow-section {
          width: 100%;
          padding-top: 10px;
          padding-bottom: 10px;
        }

        .oneflow-header-bar {
          display: flex;
          gap: 10px;
          margin-bottom: 16px;
        }

        .oneflow-grid {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 28px;
          align-items: center;
        }

        /* ── Left Column: Red Card (Original Scale - Untouched) ── */
        .oneflow-left-card {
          background: var(--nirmaan-red, #EF4444);
          color: #FFFFFF;
          border-radius: 32px;
          border: var(--border-thick);
          box-shadow: var(--shadow-tactile);
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 480px;
          flex-shrink: 0;
          z-index: 5;
        }

        .oneflow-icon-wrap {
          margin-bottom: 24px;
        }

        .oneflow-diamond {
          width: 56px;
          height: 56px;
          border: 3px solid #11110F;
          background: #11110F;
          border-radius: 14px;
          transform: rotate(45deg);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .oneflow-diamond__inner {
          width: 24px;
          height: 24px;
          background: var(--nirmaan-yellow, #FFC900);
          border: 2px solid #11110F;
          border-radius: 4px;
        }

        .oneflow-left-title {
          font-family: var(--font-hero);
          font-size: clamp(2.4rem, 4vw, 3.5rem);
          line-height: 0.95;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
          color: #FFFFFF;
          text-shadow: 2px 2px 0px #11110F;
        }

        .oneflow-left-desc {
          font-size: 0.95rem;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.92);
          font-weight: 500;
        }

        .oneflow-nav-arrows {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .oneflow-arrow-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 2px solid #11110F;
          background: #FFFFFF;
          color: #11110F;
          font-size: 1.1rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 2px 2px 0px #11110F;
          transition: all 0.2s ease;
        }

        .oneflow-arrow-btn:hover {
          background: var(--nirmaan-yellow);
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0px #11110F;
        }

        /* ── Right Column: Dynamically Horizontal Scroll Track ── */
        .oneflow-track-wrap {
          overflow: hidden;
          width: 100%;
        }

        .oneflow-track {
          display: flex;
          gap: 20px;
          padding: 4px 0 12px 0;
          transition: transform 0.1s ease-out;
          will-change: transform;
        }

        /* Compact Project Card */
        .oneflow-card {
          flex: 0 0 300px;
          background: var(--bg-cream-card, #FAF6F0);
          border: var(--border-medium);
          border-radius: 20px;
          box-shadow: var(--shadow-tactile);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 390px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .oneflow-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: var(--shadow-hover);
        }

        .oneflow-thumb {
          height: 140px;
          border-bottom: var(--border-medium);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          overflow: hidden;
        }

        .oneflow-thumb__badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #11110F;
          color: #FFFFFF;
          font-family: var(--font-mono);
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 3px 6px;
          border-radius: 4px;
          z-index: 2;
        }

        .oneflow-thumb__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          text-align: center;
        }

        .oneflow-thumb__num {
          font-family: var(--font-hero);
          font-size: 2.4rem;
          font-weight: 900;
          color: rgba(17, 17, 15, 0.15);
          line-height: 1;
        }

        .oneflow-thumb__title {
          font-family: var(--font-hero);
          font-size: 1.15rem;
          font-weight: 800;
          color: #11110F;
          letter-spacing: 0.04em;
        }

        .oneflow-thumb__tags {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .oneflow-thumb__tag {
          font-family: var(--font-mono);
          font-size: 0.5rem;
          font-weight: 700;
          padding: 2px 6px;
          background: #FFFFFF;
          border: 1px solid #11110F;
          border-radius: 4px;
        }

        .oneflow-card__body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .oneflow-card__header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 6px;
        }

        .oneflow-card__title {
          font-family: var(--font-hero);
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.01em;
        }

        .oneflow-card__subtitle {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          font-weight: 700;
          color: var(--text-gray);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .oneflow-card__divider {
          height: 1px;
          background: rgba(17, 17, 15, 0.15);
          width: 100%;
        }

        .oneflow-card__bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.75rem;
          color: #333330;
          line-height: 1.3;
        }

        .oneflow-card__bullets li {
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }

        .oneflow-bullet-dot {
          color: var(--nirmaan-red, #EF4444);
          font-size: 0.55rem;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .oneflow-card__footer {
          margin-top: auto;
        }

        .oneflow-link-btn {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #11110F;
          background: var(--nirmaan-yellow, #FFC900);
          border: var(--border-medium);
          border-radius: var(--radius-pill);
          padding: 6px 14px;
          display: inline-block;
          box-shadow: var(--shadow-tactile-sm);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .oneflow-link-btn:hover {
          background: var(--nirmaan-blue, #2563EB);
          color: #FFFFFF;
          transform: translate(-2px, -2px);
          box-shadow: var(--shadow-hover);
        }

        .oneflow-link-btn--disabled {
          opacity: 0.5;
          pointer-events: none;
          background: #E5E5E5;
        }

        /* Responsive Fallback */
        @media (max-width: 900px) {
          .oneflow-sticky-outer {
            height: auto;
          }
          .oneflow-sticky-inner {
            position: relative;
            top: 0;
            height: auto;
          }
          .oneflow-grid {
            grid-template-columns: 1fr;
          }
          .oneflow-left-card {
            height: auto;
          }
          .oneflow-track {
            overflow-x: auto;
            transform: none !important;
          }
          .oneflow-card {
            flex: 0 0 300px;
            height: 450px;
          }
        }
      `}</style>
    </div>
  );
}
