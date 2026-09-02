/* ============================================================
   AboutSection.jsx — Nirmaan 2026 Overview, 4 Pillars & Craft Flow
   ============================================================ */

import React from 'react';
import { values, announcements } from '../data/portfolioData.js';

export default function AboutSection({ onOpenContact }) {
  return (
    <section className="about-section" id="overview">
      {/* Section Header */}
      <div className="nirmaan-section-title">
        <span className="badge">01</span>
        <h2>OVERVIEW &amp; CORE PILLARS</h2>
      </div>

      <div className="about-grid">
        
        {/* Left Col: Core Narrative Card */}
        <div className="about-main-card brutal-card">
          <div className="card-header-banner" style={{ background: 'var(--color-blue)' }}>
            <span>PROFILE IDENTITY // ARCHISHA GUPTA</span>
            <span className="pulse-dot" />
          </div>

          <div className="about-card-body">
            <h3 className="about-headline">
              Engineering with aesthetic precision, structured systems, and end-to-end craft.
            </h3>

            <p className="about-paragraph">
              I am a Computer Science Engineering student (2025–2029) at BMS Institute of Technology &amp; Management, Bengaluru. I operate at the vital intersection where design systems and code converge — transforming raw ideas into tactile, responsive, and production-ready applications.
            </p>

            <p className="about-paragraph">
              As a <strong>Design Associate @ Coding Club BMSIT</strong> and <strong>Editorial Director @ Rotaract Club of BMS Yelahanka</strong>, I lead brand design, UI/UX systems, event marketing collateral, and technical documentation. My work ranges from hardware sensor telemetry with ESP32 to interactive React web platforms.
            </p>

            {/* Quick Skills Summary Chips */}
            <div className="about-pills-row">
              <span className="clay-card skill-pill" style={{ background: '#FFB200' }}>
                ✦ DESIGN SYSTEMS
              </span>
              <span className="clay-card skill-pill" style={{ background: '#0072E3', color: '#FFFFFF' }}>
                ✦ FRONTEND ARCHITECTURE
              </span>
              <span className="clay-card skill-pill" style={{ background: '#1BE349' }}>
                ✦ IOT &amp; SENSORS
              </span>
              <span className="clay-card skill-pill" style={{ background: '#AB54F7', color: '#FFFFFF' }}>
                ✦ EDITORIAL DIRECTION
              </span>
            </div>
          </div>
        </div>

        {/* Right Col: Live Activity Announcement Log */}
        <div className="about-side-col">
          <div className="brutal-card announcements-card">
            <div className="card-header-banner" style={{ background: 'var(--color-yellow)' }}>
              <span>LIVE ACTIVITY &amp; ANNOUNCEMENTS</span>
              <span className="log-badge">LOG_2026</span>
            </div>

            <div className="announcements-body">
              {announcements.map((item) => (
                <div key={item.id} className="announcement-item">
                  <div className="announcement-meta">
                    <span
                      className="announcement-tag"
                      style={{ background: '#FFFFFF', color: '#000000' }}
                    >
                      {item.tag}
                    </span>
                    <span className="announcement-date">{item.date}</span>
                  </div>
                  <p className="announcement-desc">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 4 Core Value Pillars (Nirmaan Judging & Value Pillars) */}
      <div className="values-header">
        <h3 className="values-title">ENGINEERING &amp; DESIGN VALUES</h3>
        <p className="values-subtitle">
          The 4 foundational principles guiding every interface, system, and prototype I build.
        </p>
      </div>

      <div className="values-grid">
        {values.map((val) => (
          <div key={val.mark} className="brutal-card value-card">
            <div
              className="card-header-banner"
              style={{ background: val.accent, color: '#FFFFFF' }}
            >
              <span>{val.mark}</span>
              <span>{val.title}</span>
            </div>

            <div className="value-card-body">
              <p className="value-desc">{val.copy}</p>
              
              <div className="value-metric-pill clay-card">
                <span className="metric-tag">PRINCIPLE</span>
                <span className="metric-val">{val.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .about-section {
          max-width: 1320px;
          margin: 0 auto;
          padding: 40px 20px 60px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        @media (min-width: 900px) {
          .about-grid {
            grid-template-columns: 1.25fr 0.75fr;
            gap: 32px;
          }
        }

        /* Narrative Card */
        .about-main-card {
          overflow: hidden;
        }

        .about-card-body {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .about-headline {
          font-family: var(--font-display);
          font-size: clamp(1.25rem, 2.2vw, 1.65rem);
          font-weight: 900;
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: var(--text-ink);
        }

        .about-paragraph {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-gray);
        }

        .about-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }

        .skill-pill {
          padding: 8px 14px;
          border-radius: var(--radius-pill);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.05em;
        }

        /* Announcements Card */
        .announcements-card {
          overflow: hidden;
          height: 100%;
        }

        .log-badge {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          opacity: 0.85;
        }

        .announcements-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .announcement-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-bottom: 14px;
          border-bottom: 1px dashed rgba(0, 0, 0, 0.12);
        }

        .announcement-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .announcement-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .announcement-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: var(--radius-pill);
          border: 1px solid #000000;
        }

        .announcement-date {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .announcement-desc {
          font-size: 0.82rem;
          color: var(--text-gray);
          line-height: 1.45;
        }

        /* Values Pillars */
        .values-header {
          margin-top: 36px;
          margin-bottom: 20px;
        }

        .values-title {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .values-subtitle {
          font-size: 0.88rem;
          color: var(--text-gray);
          margin-top: 4px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }

        @media (min-width: 640px) {
          .values-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 1025px) {
          .values-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .value-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .value-card-body {
          padding: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          gap: 14px;
        }

        .value-desc {
          font-size: 0.82rem;
          line-height: 1.45;
          color: var(--text-gray);
        }

        .value-metric-pill {
          background: rgba(244, 233, 225, 0.75);
          padding: 8px 12px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .metric-tag {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 800;
          color: var(--text-muted);
        }

        .metric-val {
          font-family: var(--font-display);
          font-size: 0.76rem;
          font-weight: 800;
          color: var(--text-ink);
        }
      `}</style>
    </section>
  );
}
