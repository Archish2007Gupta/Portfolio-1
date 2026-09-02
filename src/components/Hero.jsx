/* ============================================================
   Hero.jsx — Nirmaan 2026 Signature Hero Exhibition
   ============================================================ */

import React from 'react';
import { liveMetrics, heroCards } from '../data/portfolioData.js';
import { ArrowUpRight } from './Icons.jsx';

export default function Hero({ onOpenContact }) {
  return (
    <section className="hero-section" id="hero">
      {/* Top Multi-Color Stripe Bar */}
      <div className="top-stripe-bar">
        <span style={{ background: 'var(--color-red)' }} />
        <span style={{ background: 'var(--color-orange)' }} />
        <span style={{ background: 'var(--color-yellow)' }} />
        <span style={{ background: 'var(--color-green)' }} />
        <span style={{ background: 'var(--color-blue)' }} />
        <span style={{ background: 'var(--color-purple)' }} />
      </div>

      <div className="hero-inner">
        {/* Left Column: Bold Editorial Statement */}
        <div className="hero-main-col">
          
          {/* Top Pill Badges */}
          <div className="hero-badge-stack">
            <span className="sticker-tag sticker-tag--blue">
              ✦ ARCHISHA GUPTA
            </span>
            <span className="sticker-tag sticker-tag--yellow">
              CSE @ BMSIT 2025–29
            </span>
            <span className="sticker-tag sticker-tag--green-light">
              ● AVAILABLE FOR ROLES
            </span>
          </div>

          {/* Big Typography Headline with Staggered Delays */}
          <h1 className="hero-title">
            <span className="hero-title-line" style={{ color: 'var(--color-yellow)' }}>
              MOST BUILDERS
            </span>
            <span className="hero-title-line">
              PICK A SIDE.
            </span>
            <span className="hero-title-line hero-title-line--accent">
              I DON&apos;T.
            </span>
          </h1>

          {/* Subtext Statement */}
          <p className="hero-description">
            Building at the intersection of <strong style={{ color: 'var(--color-blue)' }}>code</strong> and{' '}
            <strong style={{ color: 'var(--color-orange)' }}>design</strong>. Design Associate @{' '}
            <span className="hero-highlight">Coding Club BMSIT</span> &amp; Editorial Director @{' '}
            <span className="hero-highlight">Rotaract BMS Yelahanka</span>. Exploring Web Experiences, UI/UX Systems, AI, and IoT Hardware.
          </p>

          {/* Action CTAs */}
          <div className="hero-action-row">
            <a href="#projects" className="hero-primary-btn clay-card">
              <span>EXPLORE WORK</span>
              <ArrowUpRight size={14} />
            </a>
            <button
              onClick={onOpenContact}
              className="hero-secondary-btn clay-card"
            >
              <span>LET&apos;S TALK</span>
            </button>
          </div>

          {/* Mini Skill Cards */}
          <div className="hero-mini-cards-grid">
            {heroCards.map((card) => (
              <div key={card.number} className="brutal-card hero-mini-card">
                <div
                  className="card-header-banner"
                  style={{ background: card.accent }}
                >
                  <span>{card.number}</span>
                  <span>{card.title}</span>
                </div>
                <div className="hero-card-body">
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>✦ {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Builder Telemetry & Live Status Station */}
        <div className="hero-side-col">
          
          {/* Live Metrics Card (Matching Nirmaan Live Event Card) */}
          <div className="clay-card hero-metrics-card">
            <div className="metrics-card-header">
              <span className="metrics-status-pill">
                <span className="pulse-dot" />
                <span>BUILDER TELEMETRY</span>
              </span>
              <span className="metrics-loc-tag">BLR, INDIA</span>
            </div>

            <div className="metrics-grid">
              {liveMetrics.map(([label, value], i) => {
                const colors = ['#0072E3', '#00AA3C', '#FF6100', '#AB54F7'];
                return (
                  <div key={label} className="metric-tile">
                    <p className="metric-label">{label}</p>
                    <p className="metric-value" style={{ color: colors[i] || '#000000' }}>
                      {value}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="metrics-card-footer">
              <p className="metrics-quote">
                &ldquo;Turning complex requirements into tactile, expressive, and reliable digital systems.&rdquo;
              </p>
            </div>
          </div>

          {/* Live Craft Radar Station Box */}
          <div className="clay-card hero-dispatch-box">
            <div className="dispatch-header">
              <span className="dispatch-kicker">CURRENT FOCUS // 2026</span>
              <span className="pulse-dot" />
            </div>
            
            <div className="dispatch-items-list">
              <div className="dispatch-item">
                <span className="dispatch-dot" style={{ background: '#0072E3' }} />
                <span>React, Next.js &amp; Responsive Web Architecture</span>
              </div>
              <div className="dispatch-item">
                <span className="dispatch-dot" style={{ background: '#FFB200' }} />
                <span>Tactile Claymorphic UI/UX &amp; Design Systems</span>
              </div>
              <div className="dispatch-item">
                <span className="dispatch-dot" style={{ background: '#00AA3C' }} />
                <span>ESP32 Hardware Microcontrollers &amp; Telemetry</span>
              </div>
            </div>

            <button onClick={onOpenContact} className="dispatch-cta-btn clay-card">
              <span>INITIATE COLLABORATION ↗</span>
            </button>
          </div>

        </div>

      </div>

      <style>{`
        .hero-section {
          background-color: var(--bg-paper);
          border-bottom: var(--border-thick);
          position: relative;
          padding-top: 60px;
        }

        @media (min-width: 1025px) {
          .hero-section {
            padding-top: 0;
            border-top: var(--border-thick);
            border-left: var(--border-thick);
            border-right: var(--border-thick);
            border-radius: var(--radius-brand) var(--radius-brand) 0 0;
            margin: 0 16px;
            overflow: hidden;
          }
        }

        .top-stripe-bar {
          display: flex;
          height: 10px;
          width: 100%;
          border-bottom: 2px solid #000000;
        }

        .top-stripe-bar span {
          flex: 1;
        }

        .hero-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px 60px 20px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }

        @media (min-width: 1025px) {
          .hero-inner {
            grid-template-columns: 1.35fr 0.85fr;
            padding: 56px 44px 72px 44px;
            gap: 48px;
            align-items: start;
          }
        }

        /* ── Left Column ── */
        .hero-main-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .hero-badge-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .sticker-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          padding: 6px 14px;
          border-radius: var(--radius-pill);
          border: var(--border-thin);
          box-shadow: 2px 2px 0px #000000;
          display: inline-flex;
          align-items: center;
        }

        .sticker-tag--blue {
          background: var(--color-blue);
          color: #FFFFFF;
        }

        .sticker-tag--yellow {
          background: var(--color-yellow);
          color: #11110F;
        }

        .sticker-tag--green-light {
          background: var(--color-green-light);
          color: #11110F;
        }

        .hero-title {
          display: flex;
          flex-direction: column;
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 6.2vw, 5.2rem);
          line-height: 0.95;
          letter-spacing: -0.04em;
          font-weight: 900;
          color: #11110F;
        }

        .hero-title-line--accent {
          color: var(--color-red);
          text-shadow: 3px 3px 0px #000000;
        }

        .hero-description {
          font-size: clamp(1rem, 1.3vw, 1.2rem);
          line-height: 1.6;
          color: var(--text-gray);
          max-width: 680px;
        }

        .hero-highlight {
          color: var(--text-ink);
          font-weight: 800;
          text-decoration: underline;
          text-decoration-color: var(--color-yellow);
          text-decoration-thickness: 3px;
        }

        .hero-action-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
        }

        .hero-primary-btn {
          background: var(--text-ink);
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

        .hero-primary-btn:hover {
          background: var(--color-blue);
          transform: translateY(-3px);
        }

        .hero-secondary-btn {
          background: var(--color-yellow);
          color: #11110F;
          padding: 14px 28px;
          border-radius: var(--radius-pill);
          font-family: var(--font-display);
          font-size: 0.92rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          transition: all 0.2s ease;
        }

        .hero-secondary-btn:hover {
          background: var(--color-orange);
          color: #FFFFFF;
          transform: translateY(-3px);
        }

        /* Mini Skill Cards */
        .hero-mini-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-top: 10px;
        }

        @media (min-width: 640px) {
          .hero-mini-cards-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .hero-mini-card {
          border-radius: 14px;
          overflow: hidden;
        }

        .hero-card-body {
          padding: 12px 14px;
        }

        .hero-card-body ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hero-card-body li {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-ink);
        }

        /* ── Right Column ── */
        .hero-side-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Live Metrics Card */
        .hero-metrics-card {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 24px;
          border: var(--border-medium);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .metrics-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .metrics-status-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--text-ink);
        }

        .metrics-loc-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          background: var(--bg-paper);
          padding: 2px 8px;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(0, 0, 0, 0.15);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .metric-tile {
          background: var(--bg-paper);
          border-radius: 12px;
          padding: 12px 14px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .metric-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .metric-value {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 900;
          line-height: 1;
        }

        .metrics-card-footer {
          border-top: 1px dashed rgba(0, 0, 0, 0.15);
          padding-top: 12px;
        }

        .metrics-quote {
          font-size: 0.84rem;
          line-height: 1.45;
          font-weight: 600;
          color: var(--text-gray);
          font-style: italic;
        }

        /* Dispatch Box */
        .hero-dispatch-box {
          background: #11110F;
          border-radius: 20px;
          padding: 22px;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .dispatch-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dispatch-kicker {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--color-yellow);
        }

        .dispatch-items-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .dispatch-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        .dispatch-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dispatch-cta-btn {
          background: var(--color-yellow);
          color: #11110F;
          padding: 10px 18px;
          border-radius: var(--radius-pill);
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 900;
          text-align: center;
          margin-top: 4px;
          transition: all 0.2s ease;
        }

        .dispatch-cta-btn:hover {
          background: #FFFFFF;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
