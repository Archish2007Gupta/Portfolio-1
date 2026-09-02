/* ============================================================
   ProjectsSection.jsx — Nirmaan 2026 2-Column Grid Selected Work
   ============================================================ */

import React from 'react';
import { featuredProjects } from '../data/portfolioData.js';
import { ArrowUpRight } from './Icons.jsx';

export default function ProjectsSection() {
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

      {/* 2-Column Projects Grid */}
      <div className="projects-grid-2col">
        {featuredProjects.map((project) => (
          <article
            key={project.id}
            className="brutal-card project-card-2col clay-card"
          >
            {/* Card Banner Header */}
            <div
              className="card-header-banner"
              style={{ background: project.accent, color: '#FFFFFF' }}
            >
              <span className="banner-tag">{project.tag}</span>
              <span className="project-badge-pill">{project.badge}</span>
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
                    {project.title.toLowerCase()}.local
                  </span>
                </div>

                {/* Mockup Interactive Screen Content */}
                <div className="mockup-screen-content">
                  
                  {project.id === 'echonex' && (
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

                  {project.id === 'cleanzy' && (
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

                  {project.id === 'way2uni' && (
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

                  {project.id === 'sparkhabit' && (
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

                </div>

              </div>
            </div>

            {/* Project Details Body */}
            <div className="project-body-col">
              
              <div className="project-meta-row">
                <span className="project-category-tag">{project.category}</span>
              </div>

              <h3 className="project-title">{project.title}</h3>

              <p className="project-description">{project.description}</p>

              {/* Key Capabilities */}
              <div className="project-highlights-box">
                <span className="highlights-title">KEY CAPABILITIES:</span>
                <ul className="highlights-list">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="highlight-item">
                      <span className="highlight-bullet" style={{ color: project.accent }}>✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div className="project-stack-pills">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-pill">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="project-actions-row">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-action-btn project-action-btn--primary clay-card"
                >
                  <span>VIEW REPOSITORY</span>
                  <ArrowUpRight size={13} />
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
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
        ))}
      </div>

      <style>{`
        .projects-intro {
          font-size: 1.05rem;
          color: var(--text-gray);
          max-width: 680px;
          margin-bottom: 32px;
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
        .screen-echonex-telemetry {
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
          color: var(--color-green-light);
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
          font-size: 0.58rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.4;
          background: rgba(0, 0, 0, 0.4);
          padding: 6px 10px;
          border-radius: 6px;
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
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
        }

        .cleanzy-badge { color: var(--color-green-light); }

        .cleanzy-map-graphic {
          background: rgba(255, 255, 255, 0.05);
          border: 1px dashed rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cleanzy-pin {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .cleanzy-schedule-bar {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--color-yellow);
          font-weight: 800;
          text-align: center;
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
          font-size: 0.65rem;
          font-weight: 800;
        }

        .way2uni-campus { color: var(--color-yellow); }
        .way2uni-live { color: var(--color-green-light); }

        .way2uni-route-card {
          background: rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .route-step {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.68rem;
          font-weight: 600;
        }

        .step-num {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          background: rgba(255, 255, 255, 0.15);
          padding: 1px 4px;
          border-radius: 3px;
        }

        .way2uni-eta {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: #FFFFFF;
          font-weight: 800;
          text-align: center;
        }

        /* SPARKHABIT SCREEN */
        .screen-sparkhabit-lab {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .spark-header {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.8);
        }

        .spark-streak { color: #FF6100; }

        .spark-prompt-box {
          background: rgba(171, 84, 247, 0.15);
          border: 1px solid rgba(171, 84, 247, 0.3);
          border-radius: 8px;
          padding: 8px 10px;
        }

        .spark-prompt-title {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          color: var(--color-purple-light);
          font-weight: 800;
        }

        .spark-prompt-text {
          font-size: 0.72rem;
          color: #FFFFFF;
          font-weight: 600;
          margin-top: 2px;
        }

        .spark-timer-bar {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--color-yellow);
          font-weight: 800;
          text-align: center;
        }

        /* ── Project Body Details ── */
        .project-body-col {
          padding: 18px 20px 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
          justify-content: space-between;
        }

        .project-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .project-category-tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .project-title {
          font-family: var(--font-display);
          font-size: 1.6rem;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--text-ink);
        }

        .project-description {
          font-size: 0.88rem;
          line-height: 1.5;
          color: var(--text-gray);
        }

        /* Highlights Box */
        .project-highlights-box {
          background: rgba(244, 233, 225, 0.7);
          border-radius: 12px;
          padding: 12px 14px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .highlights-title {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .highlights-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-ink);
        }

        .highlight-bullet {
          font-size: 0.75rem;
          font-weight: 900;
        }

        /* Stack Pills */
        .project-stack-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .tech-pill {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          background: #FFFFFF;
          border: 1px solid #000000;
          padding: 2px 8px;
          border-radius: var(--radius-pill);
          color: var(--text-ink);
          box-shadow: 1px 1px 0px #000000;
        }

        /* Actions */
        .project-actions-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .project-action-btn {
          padding: 8px 16px;
          border-radius: var(--radius-pill);
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .project-action-btn--primary {
          background: var(--text-ink);
          color: #FFFFFF;
        }

        .project-action-btn--primary:hover {
          background: var(--color-blue);
          transform: translateY(-2px);
        }

        .project-action-btn--secondary {
          background: var(--color-yellow);
          color: var(--text-ink);
        }

        .project-action-btn--secondary:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
