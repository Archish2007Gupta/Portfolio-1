/* ============================================================
   ProjectsSection.jsx — Nirmaan 2026 2-Column Grid Selected Work
   Dynamic GitHub Integration (GitHub as Single Source of Truth)
   ============================================================ */

import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/projectsApi.js';
import { ArrowUpRight } from './Icons.jsx';

const ACCENT_PALETTE = ['#0072E3', '#00AA3C', '#FFB200', '#AB54F7', '#EF333A', '#FF6100'];

/**
 * Determine if a project has a specialized interactive visual mockup
 */
function getVisualKey(project) {
  const name = (project.name || '').toLowerCase();
  if (name.includes('echonex')) return 'echonex';
  if (name.includes('cleanzy')) return 'cleanzy';
  if (name.includes('way2uni')) return 'way2uni';
  if (name.includes('sparkhabit')) return 'sparkhabit';
  return 'generic';
}

export default function ProjectsSection() {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjects();
        if (isMounted) {
          if (data && Array.isArray(data.projects)) {
            // Strictly filter by classification === 'selected' (portfolio + featured)
            const selected = data.projects.filter(
              (p) => p.classification === 'selected'
            );
            setSelectedProjects(selected);
          } else {
            setSelectedProjects([]);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('[PROJECTS] Failed to fetch dynamic projects:', err);
          setError('Projects temporarily unavailable.');
          setSelectedProjects([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="nirmaan-section" id="projects">
      
      {/* Section Header */}
      <div className="nirmaan-section-title">
        <span className="badge">03</span>
        <h2>SELECTED WORK &amp; PROTOTYPES</h2>
      </div>

      <p className="projects-intro">
        A curated selection of hardware-software integrations, full-stack web platforms, and creative technology experiments.
      </p>

      {/* Loading State */}
      {loading && (
        <div className="projects-loading-banner brutal-card clay-card">
          <span className="pulse-dot" style={{ width: 10, height: 10, background: 'var(--color-blue, #0072E3)' }} />
          <span>SYNCHRONIZING REPOSITORIES FROM GITHUB TELEMETRY...</span>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="projects-empty-card brutal-card clay-card">
          <div className="empty-indicator">⚠️</div>
          <h3>PROJECTS TEMPORARILY UNAVAILABLE</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Empty State (when 0 projects are tagged portfolio + featured) */}
      {!loading && !error && selectedProjects.length === 0 && (
        <div className="projects-empty-card brutal-card clay-card">
          <div className="empty-indicator">✦</div>
          <h3>NO FEATURED PROJECTS YET</h3>
          <p>
            Repositories tagged with <code>portfolio</code> and <code>featured</code> on GitHub will automatically appear here in Selected Work.
          </p>
        </div>
      )}

      {/* 2-Column Projects Grid for Selected Work */}
      {!loading && !error && selectedProjects.length > 0 && (
        <div className="projects-grid-2col">
          {selectedProjects.map((project, index) => {
            const accent = ACCENT_PALETTE[index % ACCENT_PALETTE.length];
            const visualKey = getVisualKey(project);
            const tagNumber = String(index + 1).padStart(2, '0');
            const displayTitle = (project.name || 'PROJECT').toUpperCase();
            const category = project.language ? `${project.language} · Web Platform` : 'Full Stack Application';

            return (
              <article
                key={project.id || project.name}
                className="brutal-card project-card-2col clay-card"
              >
                {/* Card Banner Header */}
                <div
                  className="card-header-banner"
                  style={{ background: accent, color: '#FFFFFF' }}
                >
                  <span className="banner-tag">FEATURED {tagNumber}</span>
                  <span className="project-badge-pill">
                    {project.language ? project.language.toUpperCase() : 'GITHUB REPO'}
                  </span>
                </div>

                {/* Interactive Visual Preview Box */}
                <div className="project-preview-wrap">
                  <div className="project-mockup-frame clay-card">
                    
                    {/* Mockup Top Window Bar */}
                    <div className="mockup-window-bar">
                      <div className="mockup-window-dots">
                        <span style={{ background: '#EF333A' }} />
                        <span style={{ background: '#FFB200' }} />
                        <span style={{ background: '#00AA3C' }} />
                      </div>
                      <span className="mockup-window-title">
                        {project.name.toLowerCase()}.local
                      </span>
                    </div>

                    {/* Mockup Interactive Screen Content */}
                    <div className="mockup-screen-content">
                      
                      {visualKey === 'echonex' && (
                        <div className="screen-echonex-telemetry">
                          <div className="telemetry-chip">
                            <span className="pulse-dot" />
                            <span>ESP32 FIRMWARE ONLINE</span>
                          </div>
                          <div className="telemetry-gauge-grid">
                            <div className="telemetry-tile">
                              <span className="tile-label">VOICE AGENT</span>
                              <span className="tile-val" style={{ color: '#0072E3' }}>READY</span>
                            </div>
                            <div className="telemetry-tile">
                              <span className="tile-label">SENSORS</span>
                              <span className="tile-val" style={{ color: '#00AA3C' }}>4 ACTIVE</span>
                            </div>
                            <div className="telemetry-tile">
                              <span className="tile-label">CLOUD SYNC</span>
                              <span className="tile-val" style={{ color: '#FFB200' }}>SUPABASE</span>
                            </div>
                          </div>
                          <p className="telemetry-command-log">
                            &gt; esp32_wifi_connected (192.168.1.42)<br />
                            &gt; telemetry: temp=24.5C, humidity=58%
                          </p>
                        </div>
                      )}

                      {visualKey === 'cleanzy' && (
                        <div className="screen-cleanzy-dispatch">
                          <div className="cleanzy-header">
                            <span className="cleanzy-badge">DISPATCH RADAR</span>
                            <span className="cleanzy-stat">12 ACTIVE BINS</span>
                          </div>
                          <div className="cleanzy-map-graphic">
                            <div className="cleanzy-pin">📍 WARD 42 (85% FULL)</div>
                            <div className="cleanzy-pin">🚛 FLEET UNIT #04 EN ROUTE</div>
                          </div>
                          <div className="cleanzy-schedule-bar">
                            <span>NEXT PICKUP: TODAY 16:30</span>
                          </div>
                        </div>
                      )}

                      {visualKey === 'way2uni' && (
                        <div className="screen-way2uni-nav">
                          <div className="way2uni-top">
                            <span className="way2uni-campus">BMSIT DIRECTORY</span>
                            <span className="way2uni-live">OCCUPANCY</span>
                          </div>
                          <div className="way2uni-route-card">
                            <div className="route-step">
                              <span className="step-num">01</span>
                              <span>Main Entrance → CSE Dept</span>
                            </div>
                            <div className="route-step">
                              <span className="step-num">02</span>
                              <span>Elevator B → IoT Lab</span>
                            </div>
                          </div>
                          <div className="way2uni-eta">ETA: 3 MINS WALK (STEP-FREE)</div>
                        </div>
                      )}

                      {visualKey === 'sparkhabit' && (
                        <div className="screen-sparkhabit-lab">
                          <div className="spark-header">
                            <span>DAILY SPRINT // DAY #18</span>
                            <span className="spark-streak">🔥 18 DAYS</span>
                          </div>
                          <div className="spark-prompt-box">
                            <p className="spark-prompt-title">TODAY&apos;S PROMPT:</p>
                            <p className="spark-prompt-text">&ldquo;Tactile volume slider knob.&rdquo;</p>
                          </div>
                          <div className="spark-timer-bar">
                            <span>04:12 REMAINING</span>
                          </div>
                        </div>
                      )}

                      {visualKey === 'generic' && (
                        <div className="screen-generic-telemetry">
                          <div className="telemetry-chip">
                            <span className="pulse-dot" />
                            <span>GITHUB REPOSITORY ONLINE</span>
                          </div>
                          <div className="telemetry-gauge-grid">
                            <div className="telemetry-tile">
                              <span className="tile-label">PRIMARY LANG</span>
                              <span className="tile-val" style={{ color: '#0072E3' }}>
                                {project.language || 'CODE'}
                              </span>
                            </div>
                            <div className="telemetry-tile">
                              <span className="tile-label">STARS</span>
                              <span className="tile-val" style={{ color: '#FFB200' }}>
                                ⭐ {project.stars}
                              </span>
                            </div>
                            <div className="telemetry-tile">
                              <span className="tile-label">DEFAULT BRANCH</span>
                              <span className="tile-val" style={{ color: '#00AA3C' }}>
                                {project.default_branch || 'main'}
                              </span>
                            </div>
                          </div>
                          <p className="telemetry-command-log">
                            &gt; repository: {project.full_name || project.name}<br />
                            &gt; telemetry: active git tree
                          </p>
                        </div>
                      )}

                    </div>

                  </div>
                </div>

                {/* Project Details Body */}
                <div className="project-body-col">
                  
                  <div className="project-meta-row">
                    <span className="project-category-tag">{category}</span>
                  </div>

                  <h3 className="project-title">{displayTitle}</h3>

                  <p className="project-description">
                    {project.description || 'Open source project hosted on GitHub by @Archish2007Gupta.'}
                  </p>

                  {/* Key Capabilities */}
                  <div className="project-highlights-box">
                    <span className="highlights-title">KEY CAPABILITIES:</span>
                    <ul className="highlights-list">
                      {project.highlights && project.highlights.length > 0 ? (
                        project.highlights.map((h, i) => (
                          <li key={i} className="highlight-item">
                            <span className="highlight-bullet" style={{ color: accent }}>✦</span>
                            <span>{h}</span>
                          </li>
                        ))
                      ) : (
                        <>
                          <li className="highlight-item">
                            <span className="highlight-bullet" style={{ color: accent }}>✦</span>
                            <span>Real-time GitHub metrics: {project.stars} stars, {project.forks} forks</span>
                          </li>
                          <li className="highlight-item">
                            <span className="highlight-bullet" style={{ color: accent }}>✦</span>
                            <span>Maintained branch: {project.default_branch || 'main'}</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="project-stack-pills">
                    {project.techStack && project.techStack.length > 0 ? (
                      project.techStack.map((tech) => (
                        <span key={tech} className="tech-pill">
                          {tech}
                        </span>
                      ))
                    ) : project.language ? (
                      <span className="tech-pill">{project.language}</span>
                    ) : null}
                  </div>

                  {/* Action Links */}
                  <div className="project-actions-row">
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-btn project-action-btn--primary clay-card"
                    >
                      <span>VIEW REPOSITORY</span>
                      <ArrowUpRight size={13} />
                    </a>

                    {project.homepage && (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-btn project-action-btn--secondary clay-card"
                      >
                        <span>LIVE DEMO</span>
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>

                </div>

              </article>
            );
          })}
        </div>
      )}

      <style>{`
        .projects-intro {
          font-size: 1.05rem;
          color: var(--text-gray);
          max-width: 680px;
          margin-bottom: 32px;
        }

        /* ── Loading Banner ── */
        .projects-loading-banner {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background-color: var(--bg-paper);
          border-radius: var(--radius-brand);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--text-main);
          margin-bottom: 28px;
        }

        /* ── Empty Card ── */
        .projects-empty-card {
          padding: 48px 24px;
          text-align: center;
          background-color: var(--bg-paper);
          border-radius: var(--radius-brand);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }

        .projects-empty-card .empty-indicator {
          font-size: 2rem;
          color: var(--color-blue);
        }

        .projects-empty-card h3 {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 900;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .projects-empty-card p {
          color: var(--text-gray);
          max-width: 520px;
          margin: 0;
          font-size: 0.92rem;
          line-height: 1.5;
        }

        .projects-empty-card code {
          background: rgba(0, 114, 227, 0.12);
          color: var(--color-blue);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-weight: 700;
        }

        /* ── 2-Column Grid Layout ── */
        .projects-grid-2col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }

        @media (min-width: 900px) {
          .projects-grid-2col {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }
        }

        .project-card-2col {
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-brand);
          overflow: hidden;
          background-color: var(--bg-paper);
        }

        .card-header-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 18px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.06em;
        }

        .banner-tag {
          font-family: var(--font-display);
          font-weight: 900;
        }

        .project-badge-pill {
          font-size: 0.62rem;
          background: rgba(0, 0, 0, 0.25);
          padding: 2px 8px;
          border-radius: var(--radius-pill);
          letter-spacing: 0.05em;
        }

        .project-preview-wrap {
          padding: 16px 18px 0 18px;
        }

        /* Mockup Frame */
        .project-mockup-frame {
          background: #11110F;
          border-radius: 14px;
          overflow: hidden;
          color: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.2);
        }

        .mockup-window-bar {
          background: #222220;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mockup-window-dots {
          display: flex;
          gap: 5px;
        }

        .mockup-window-dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .mockup-window-title {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .mockup-screen-content {
          padding: 14px 16px;
          min-height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* ECHONEX SCREEN */
        .screen-echonex-telemetry,
        .screen-generic-telemetry {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .telemetry-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--color-green-light, #1BE349);
          font-weight: 800;
        }

        .telemetry-gauge-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }

        .telemetry-tile {
          background: rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 6px 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .tile-label {
          font-family: var(--font-mono);
          font-size: 0.52rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .tile-val {
          font-family: var(--font-display);
          font-size: 0.76rem;
          font-weight: 900;
        }

        .telemetry-command-log {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.45);
          margin: 0;
          line-height: 1.4;
        }

        /* CLEANZY SCREEN */
        .screen-cleanzy-dispatch {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cleanzy-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cleanzy-badge {
          background: var(--color-green, #00AA3C);
          color: #FFFFFF;
          font-size: 0.58rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .cleanzy-stat {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: #FFB200;
        }

        .cleanzy-map-graphic {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 6px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .cleanzy-schedule-bar {
          font-family: var(--font-mono);
          font-size: 0.56rem;
          color: rgba(255, 255, 255, 0.4);
        }

        /* WAY2UNI SCREEN */
        .screen-way2uni-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .way2uni-top {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.6rem;
        }

        .way2uni-campus {
          font-weight: 800;
          color: #FFB200;
        }

        .way2uni-live {
          color: #1BE349;
        }

        .way2uni-route-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          padding: 6px 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .route-step {
          display: flex;
          gap: 6px;
          font-size: 0.58rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .step-num {
          font-family: var(--font-mono);
          color: #0072E3;
          font-weight: 800;
        }

        .way2uni-eta {
          font-family: var(--font-mono);
          font-size: 0.56rem;
          color: rgba(255, 255, 255, 0.45);
        }

        /* SPARKHABIT SCREEN */
        .screen-sparkhabit-lab {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .spark-header {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: #AB54F7;
          font-weight: 800;
        }

        .spark-streak {
          color: #FFB200;
        }

        .spark-prompt-box {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          padding: 6px 8px;
        }

        .spark-prompt-title {
          font-family: var(--font-mono);
          font-size: 0.5rem;
          color: rgba(255, 255, 255, 0.4);
          margin: 0 0 2px 0;
        }

        .spark-prompt-text {
          font-size: 0.65rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
        }

        .spark-timer-bar {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          color: rgba(255, 255, 255, 0.45);
        }

        /* Project Body Column */
        .project-body-col {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .project-meta-row {
          margin-bottom: 6px;
        }

        .project-category-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-gray);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .project-title {
          font-family: var(--font-display);
          font-size: 1.55rem;
          font-weight: 900;
          color: var(--text-main);
          margin: 0 0 10px 0;
          letter-spacing: -0.02em;
        }

        .project-description {
          font-size: 0.88rem;
          line-height: 1.5;
          color: var(--text-gray);
          margin: 0 0 16px 0;
        }

        /* Highlights */
        .project-highlights-box {
          background: rgba(0, 0, 0, 0.03);
          border: 1px dashed rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 16px;
        }

        .highlights-title {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.06em;
          margin-bottom: 6px;
        }

        .highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .highlight-item {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-size: 0.76rem;
          color: var(--text-main);
          font-weight: 600;
        }

        .highlight-bullet {
          font-size: 0.7rem;
        }

        /* Tech Stack */
        .project-stack-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }

        .tech-pill {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-pill);
          background: rgba(0, 0, 0, 0.06);
          color: var(--text-main);
        }

        /* Actions */
        .project-actions-row {
          margin-top: auto;
          display: flex;
          gap: 10px;
        }

        .project-action-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 14px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-decoration: none;
          border-radius: var(--radius-brand);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .project-action-btn:hover {
          transform: translateY(-2px);
        }

        .project-action-btn--primary {
          background-color: #11110F;
          color: #FFFFFF;
        }

        .project-action-btn--secondary {
          background-color: #FFFFFF;
          color: #11110F;
          border: 1px solid rgba(0, 0, 0, 0.15);
        }
      `}</style>

    </section>
  );
}
