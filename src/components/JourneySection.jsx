/* ============================================================
   JourneySection.jsx — Experience, Education & Hackathons
   ============================================================
   Features:
   - EXPERIENCE: Coding Club BMSIT (Design Associate) & Rotaract (Editorial Director)
   - EDUCATION: BMS Institute of Technology & Management (B.Tech CSE 2025-2029)
   - HACKATHONS: Decode2Deploy, RNSIT ImpactX, VyuhaTech 2.0
   ============================================================ */

import React from 'react';
import { experience, education, events, hackathonDescription } from '../data/portfolioData.js';

export default function JourneySection() {
  return (
    <>
      {/* ── 1. EXPERIENCE SECTION ── */}
      <section className="section" id="experience">
        <div className="nirmaan-section-title">
          <span className="badge">04</span>
          <h2>EXPERIENCE</h2>
        </div>

        <div className="exp-grid">
          {experience.map((exp) => (
            <div key={exp.id} className="nirmaan-card exp-card">
              <div className="card-header-banner" style={{ background: exp.accent }}>
                <span>{exp.number} // {exp.org}</span>
                <span>{exp.period}</span>
              </div>

              <div className="exp-body">
                <div className="exp-header-row">
                  <h3 className="exp-role">{exp.role}</h3>
                  <span className="exp-org-badge">{exp.org}</span>
                </div>

                <p className="exp-desc">{exp.description}</p>

                <div className="exp-tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="sticker-tag" style={{ fontSize: '0.55rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. JOURNEY / EDUCATION & HACKATHONS SECTION ── */}
      <section className="section" id="journey">
        <div className="nirmaan-section-title">
          <span className="badge">06</span>
          <h2>JOURNEY & EDUCATION</h2>
        </div>

        <div className="journey-grid">
          {/* Compact Education Card */}
          <div className="nirmaan-card edu-card">
            <div className="card-header-banner" style={{ background: 'var(--nirmaan-blue)' }}>
              <span>ACADEMIC EDUCATION</span>
              <span>{education.period}</span>
            </div>

            <div className="edu-body">
              <span className="meta-label">UNDERGRADUATE DEGREE</span>
              <h3 className="edu-degree">{education.degree}</h3>
              <p className="edu-inst">{education.institution}</p>
              <span className="sticker-tag sticker-tag--blue" style={{ marginTop: '12px' }}>
                📍 {education.location}
              </span>
            </div>
          </div>

          {/* Hackathons & Events Section */}
          <div className="nirmaan-card hackathons-card">
            <div className="card-header-banner" style={{ background: 'var(--nirmaan-red)' }}>
              <span>HACKATHONS & EVENTS</span>
              <span>BUILT UNDER PRESSURE</span>
            </div>

            <div className="hackathons-body">
              <p className="hackathons-quote">{hackathonDescription}</p>

              <div className="events-list">
                {events.map((ev) => (
                  <div key={ev.number} className="event-row">
                    <span className="event-num" style={{ color: ev.accent }}>
                      {ev.number}
                    </span>
                    <span className="event-name">{ev.name}</span>
                    <span className="event-org">{ev.org}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .exp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .exp-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .exp-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
        }

        .exp-header-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .exp-role {
          font-family: var(--font-hero);
          font-size: 1.3rem;
          line-height: 1.1;
        }

        .exp-org-badge {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-gray);
          letter-spacing: 0.08em;
        }

        .exp-desc {
          font-size: 0.9rem;
          color: var(--text-gray);
          line-height: 1.6;
        }

        .exp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
        }

        /* Journey Grid */
        .journey-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 28px;
          align-items: start;
        }

        .edu-card, .hackathons-card {
          overflow: hidden;
        }

        .edu-body, .hackathons-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .edu-degree {
          font-family: var(--font-hero);
          font-size: 1.4rem;
          line-height: 1.1;
        }

        .edu-inst {
          font-size: 0.95rem;
          color: var(--text-gray);
          font-weight: 500;
        }

        .hackathons-quote {
          font-size: 0.95rem;
          font-style: italic;
          color: var(--text-black);
          border-left: 3px solid var(--nirmaan-red);
          padding-left: 12px;
          margin-bottom: 8px;
        }

        .events-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .event-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: var(--bg-white);
          border: var(--border-thin);
          border-radius: 8px;
          box-shadow: 2px 2px 0px #11110F;
        }

        .event-num {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 800;
        }

        .event-name {
          font-family: var(--font-hero);
          font-size: 0.95rem;
          font-weight: 800;
        }

        .event-org {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--text-gray);
          margin-left: auto;
        }

        @media (max-width: 900px) {
          .exp-grid, .journey-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
