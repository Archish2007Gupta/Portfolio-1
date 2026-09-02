/* ============================================================
   AboutSection.jsx — Who Am I with NIRMAAN Visuals
   ============================================================ */

import React from 'react';

export default function AboutSection() {
  return (
    <section className="section" id="about">
      {/* Section Title */}
      <div className="nirmaan-section-title">
        <span className="badge">01</span>
        <h2>WHO AM I?</h2>
      </div>

      <div className="about-grid">
        {/* Left Statement */}
        <div className="about-left">
          <p className="about-big-text">
            I build things at the intersection of{' '}
            <span style={{ color: 'var(--nirmaan-blue)' }}>code</span> and{' '}
            <span style={{ color: 'var(--nirmaan-orange)' }}>design</span>.
          </p>
          <p className="about-body">
            I'm a Computer Science Engineering student at BMS Institute of
            Technology and Management, exploring web development, UI/UX, AI,
            IoT and creative technology.
          </p>

          <div className="about-roles">
            <span className="sticker-tag sticker-tag--blue">
              ✦ DESIGN ASSOCIATE @ CODING CLUB BMSIT
            </span>
            <span className="sticker-tag sticker-tag--purple">
              ★ EDITORIAL DIRECTOR @ ROTARACT BMS
            </span>
          </div>
        </div>

        {/* Right Stat Cards */}
        <div className="about-stats">
          {[
            { label: 'STUDYING', value: 'CSE', detail: 'B.Tech 2025–29', bg: 'var(--nirmaan-blue)' },
            { label: 'ROLE', value: 'DESIGN LEAD', detail: 'Coding Club BMSIT', bg: 'var(--nirmaan-yellow)' },
            { label: 'BASED IN', value: 'BENGALURU', detail: 'Karnataka, India', bg: 'var(--nirmaan-green)' },
            { label: 'INTERESTS', value: '6+ DOMAINS', detail: 'Code × UI/UX × AI × IoT', bg: 'var(--nirmaan-purple)' },
          ].map((stat) => (
            <div key={stat.label} className="nirmaan-card stat-card">
              <div className="card-header-banner" style={{ background: stat.bg }}>
                <span>{stat.label}</span>
                <span>✦</span>
              </div>
              <div className="stat-body">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-detail">{stat.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          align-items: start;
        }

        .about-big-text {
          font-family: var(--font-hero);
          font-size: clamp(1.6rem, 3.5vw, 2.5rem);
          line-height: 1.15;
          margin-bottom: 20px;
        }

        .about-body {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-gray);
          margin-bottom: 24px;
        }

        .about-roles {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }

        .about-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .stat-card {
          overflow: hidden;
        }

        .stat-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-value {
          font-family: var(--font-hero);
          font-size: 1.3rem;
          color: var(--text-black);
        }

        .stat-detail {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-gray);
        }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
