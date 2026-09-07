/* ============================================================
   Hero.jsx — Kinetic Brutalism Hero Component
   ============================================================ */

import React from 'react';
import { liveMetrics, heroCards } from '../data/portfolioData.js';
import { ArrowUpRight } from './Icons.jsx';
import useResume from '../hooks/useResume.js';

export default function Hero({ onOpenContact }) {
  const resume = useResume();
  return (
    <section className="hero-section" id="hero">
      {/* Top Multi-Color Stripe Bar */}
      <div className="hero-stripe-bar">
        <span style={{ background: '#EF333A' }} />
        <span style={{ background: '#FFB200' }} />
        <span style={{ background: '#00AA3C' }} />
        <span style={{ background: '#0072E3' }} />
        <span style={{ background: '#AB54F7' }} />
      </div>

      <div className="hero-container">
        {/* Top Status & Year Pill */}
        <div className="hero-meta-row">
          <div className="hero-meta-pill">
            <span className="hero-meta-pill__dot" />
            <span className="hero-meta-pill__text">SYSTEM STATUS: ALL RADARS OPERATIONAL</span>
          </div>
          <div className="hero-year-badge clay-badge">
            <span>EDITION &apos;26</span>
          </div>
        </div>

        {/* Massive Typographic Display */}
        <div className="hero-headline-block">
          <h1 className="hero-headline">
            <span className="hero-headline__line hero-headline__line--1">
              ARCHISHA
            </span>
            <span className="hero-headline__line hero-headline__line--2">
              <span className="hero-name-accent">GUPTA</span>
              <span className="hero-badge-tag clay-badge">B.TECH CSE &apos;29</span>
            </span>
          </h1>

          <p className="hero-subheadline">
            Full-Stack Systems Builder &amp; Creative Technologist crafting high-impact digital experiences,
            distributed backend engines, and modern visual identities.
          </p>
        </div>

        {/* Action Button Strip & Metrics */}
        <div className="hero-interactive-strip">
          <div className="hero-cta-group">
            <a href="#projects" className="hero-primary-btn clay-btn">
              <span>EXPLORE WORK</span>
              <ArrowUpRight size={18} />
            </a>
            <button
              onClick={onOpenContact}
              className="hero-secondary-btn clay-card"
            >
              <span>LET&apos;S TALK</span>
            </button>
            {resume.available && (
              <a
                href={resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-resume-btn clay-card"
                title="View Archisha's Resume (PDF)"
                id="hero-view-cv-btn"
              >
                <span>VIEW CV</span>
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>

          {/* Mini Skill Cards */}
          <div className="hero-mini-cards-grid">
            {heroCards.map((card, idx) => (
              <div
                key={idx}
                className="hero-mini-card clay-card"
                style={{ '--card-accent': card.accent }}
              >
                <div className="hero-mini-card__header">
                  <span className="hero-mini-card__tag">{card.tag}</span>
                  <span className="hero-mini-card__dot" style={{ background: card.accent }} />
                </div>
                <h2 className="hero-mini-card__title">{card.title}</h2>
                <p className="hero-mini-card__metric">{card.metric}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="hero-metrics-ribbon">
          {liveMetrics.map((item, idx) => (
            <div key={idx} className="hero-metric-cell">
              <span className="hero-metric-cell__value">{item.value}</span>
              <span className="hero-metric-cell__label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          min-height: calc(100vh - 40px);
          background: var(--color-paper);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-bottom: 40px;
          overflow: hidden;
        }

        /* Multi-Color Top Stripe */
        .hero-stripe-bar {
          display: flex;
          width: 100%;
          height: 8px;
          border-bottom: 2.5px solid #000000;
        }

        .hero-stripe-bar span {
          flex: 1;
          height: 100%;
        }

        .hero-container {
          max-width: var(--max-content-width);
          width: 100%;
          margin: 0 auto;
          padding: 32px 32px 0 32px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Meta Row */
        .hero-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .hero-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #000000;
          color: #FFFFFF;
          padding: 8px 18px;
          border-radius: var(--radius-pill);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .hero-meta-pill__dot {
          width: 8px;
          height: 8px;
          background: var(--color-green);
          border-radius: 50%;
          animation: pulseGreen 1.6s ease-in-out infinite alternate;
        }

        @keyframes pulseGreen {
          0% { opacity: 0.4; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }

        .hero-year-badge {
          background: var(--color-yellow);
          color: #000000;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 0.85rem;
          padding: 6px 16px;
          border-radius: var(--radius-pill);
          border: 2px solid #000000;
        }

        /* Massive Headline */
        .hero-headline-block {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .hero-headline {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(3.5rem, 11vw, 9.5rem);
          line-height: 0.88;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: #11110F;
          margin: 0;
        }

        .hero-headline__line {
          display: block;
        }

        .hero-headline__line--2 {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 20px;
        }

        .hero-name-accent {
          color: var(--color-red);
          text-shadow: 4px 4px 0px #000000;
          -webkit-text-stroke: 1px #000000;
        }

        .hero-badge-tag {
          font-family: var(--font-mono);
          font-size: clamp(0.75rem, 1.6vw, 1.25rem);
          font-weight: 800;
          letter-spacing: 0.04em;
          background: var(--color-blue);
          color: #FFFFFF;
          padding: 6px 18px;
          border-radius: var(--radius-pill);
          border: 2.5px solid #000000;
          vertical-align: middle;
          box-shadow: 3px 3px 0px #000000;
        }

        .hero-subheadline {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.8vw, 1.35rem);
          font-weight: 500;
          line-height: 1.45;
          max-width: 780px;
          color: #2D2D2A;
          margin-top: 8px;
        }

        /* Action Buttons & Mini Cards */
        .hero-interactive-strip {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .hero-cta-group {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
        }

        .hero-primary-btn {
          background: var(--color-yellow);
          color: #000000;
          padding: 14px 32px;
          border-radius: var(--radius-pill);
          border: 2.5px solid #000000;
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 900;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 4px 4px 0px #000000;
          text-decoration: none;
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-primary-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0px #000000;
          background: #FFC024;
        }

        .hero-secondary-btn {
          background: #FFFFFF;
          color: #000000;
          padding: 14px 28px;
          border-radius: var(--radius-pill);
          font-family: var(--font-display);
          font-size: 0.92rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .hero-secondary-btn:hover {
          background: #000000;
          color: #FFFFFF;
          transform: translateY(-3px);
        }

        .hero-resume-btn {
          background: var(--color-purple);
          color: #FFFFFF;
          padding: 14px 28px;
          border-radius: var(--radius-pill);
          font-family: var(--font-display);
          font-size: 0.92rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .hero-resume-btn:hover {
          background: #000000;
          color: var(--color-yellow);
          transform: translateY(-3px);
        }

        /* Mini Skill Cards */
        .hero-mini-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .hero-mini-card {
          background: #FFFFFF;
          padding: 18px 20px;
          border-radius: var(--radius-card);
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-left: 6px solid var(--card-accent);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-mini-card:hover {
          transform: translateY(-4px);
        }

        .hero-mini-card__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .hero-mini-card__tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #71716D;
          text-transform: uppercase;
        }

        .hero-mini-card__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .hero-mini-card__title {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 900;
          color: #11110F;
          margin: 0;
        }

        .hero-mini-card__metric {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 600;
          color: #555550;
          margin: 0;
        }

        /* Metrics Ribbon */
        .hero-metrics-ribbon {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          background: #000000;
          border-radius: var(--radius-card);
          border: 3px solid #000000;
          box-shadow: var(--shadow-hard);
          overflow: hidden;
        }

        .hero-metric-cell {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          border-right: 2px solid #222220;
        }

        .hero-metric-cell:last-child {
          border-right: none;
        }

        .hero-metric-cell__value {
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          font-weight: 900;
          color: var(--color-yellow);
          line-height: 1;
        }

        .hero-metric-cell__label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #A3A39E;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .hero-container {
            padding: 20px 16px 0 16px;
            gap: 24px;
          }

          .hero-metrics-ribbon {
            grid-template-columns: 1fr 1fr;
          }

          .hero-headline__line--2 {
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}
