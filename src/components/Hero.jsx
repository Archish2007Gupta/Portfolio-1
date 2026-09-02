/* ============================================================
   Hero.jsx — Editorial Brutalist Hero Banner
   ============================================================
   Features:
   - Multi-color top status stripe bar
   - Ultra-bold Clash Display / Unbounded typography
   - Floating sticker tags & tactile card badges
   - Analog vintage clock dial instrument
   - Kept warm cream background as requested
   ============================================================ */

import React from 'react';
import CreativeCompass from './CreativeCompass.jsx';
import { heroCards } from '../data/portfolioData.js';

export default function Hero() {
  return (
    <section className="hero-container" id="hero">
      {/* Top Multi-Color Stripe Bar */}
      <div className="top-stripe-bar">
        <span style={{ background: 'var(--nirmaan-red)' }} />
        <span style={{ background: 'var(--nirmaan-orange)' }} />
        <span style={{ background: 'var(--nirmaan-yellow)' }} />
        <span style={{ background: 'var(--nirmaan-green)' }} />
        <span style={{ background: 'var(--nirmaan-blue)' }} />
        <span style={{ background: 'var(--nirmaan-purple)' }} />
      </div>

      {/* Main Hero Grid */}
      <div className="hero-content">
        {/* Left Side: Statement & Stickers */}
        <div className="hero-left">
          {/* Status Stickers */}
          <div className="hero-stickers">
            <span className="sticker-tag sticker-tag--blue">
              ✦ ARCHISHA GUPTA
            </span>
            <span className="sticker-tag sticker-tag--yellow">
              CSE 2025–29
            </span>
            <span className="sticker-tag sticker-tag--green">
              ● AVAILABLE FOR ROLES
            </span>
          </div>

          {/* Big Typography Headline */}
          <h1 className="hero-headline">
            <span className="hero-headline__line">MOST BUILDERS</span>
            <span className="hero-headline__line">PICK A SIDE.</span>
            <span className="hero-headline__line hero-headline__line--highlight">
              I DON'T.
            </span>
          </h1>

          {/* Core Brand Statement */}
          <p className="hero-subtext">
            Building at the intersection of <strong style={{ color: 'var(--nirmaan-blue)' }}>code</strong> and{' '}
            <strong style={{ color: 'var(--nirmaan-orange)' }}>design</strong>. Design Associate @ Coding Club BMSIT & Editorial Director @ Rotaract.
          </p>

          {/* Action CTAs */}
          <div className="hero-ctas">
            <a href="#projects" className="hero-btn hero-btn--primary">
              EXPLORE WORK ↗
            </a>
            <a href="#contact" className="hero-btn hero-btn--secondary">
              GET IN TOUCH
            </a>
          </div>
        </div>

        {/* Right Side: Analog Clock Instrument & Cards */}
        <div className="hero-right">
          {/* Vintage Analog Clock Instrument */}
          <div className="hero-clock-wrapper">
            <CreativeCompass />
          </div>

          {/* Tactile Cards */}
          <div className="hero-cards-grid">
            {heroCards.map((card, i) => (
              <div key={card.number} className="nirmaan-card hero-mini-card">
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
      </div>

      <style>{`
        .hero-container {
          background: var(--bg-cream);
          padding-top: 80px;
          padding-bottom: 60px;
          border-bottom: var(--border-thick);
          position: relative;
        }

        .hero-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px 24px;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 48px;
          align-items: center;
        }

        /* Stickers */
        .hero-stickers {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
        }

        /* Big Headline */
        .hero-headline {
          font-family: var(--font-hero);
          font-size: clamp(2.8rem, 6.5vw, 5.2rem);
          line-height: 0.95;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .hero-headline__line {
          display: block;
        }

        .hero-headline__line--highlight {
          color: var(--nirmaan-orange);
          text-shadow: 3px 3px 0px #11110F;
        }

        .hero-subtext {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-gray);
          max-width: 540px;
          margin-bottom: 32px;
        }

        /* Buttons */
        .hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero-btn {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 14px 28px;
          border-radius: var(--radius-pill);
          border: var(--border-medium);
          text-decoration: none;
          box-shadow: var(--shadow-tactile);
          transition: all 0.2s ease;
        }

        .hero-btn--primary {
          background: var(--text-black);
          color: var(--nirmaan-yellow);
        }

        .hero-btn--primary:hover {
          background: var(--nirmaan-blue);
          color: white;
          transform: translate(-3px, -3px);
          box-shadow: var(--shadow-hover);
        }

        .hero-btn--secondary {
          background: var(--bg-white);
          color: var(--text-black);
        }

        .hero-btn--secondary:hover {
          background: var(--nirmaan-yellow);
          transform: translate(-3px, -3px);
          box-shadow: var(--shadow-hover);
        }

        /* Right Column */
        .hero-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }

        .hero-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          width: 100%;
        }

        .hero-mini-card {
          font-size: 0.75rem;
        }

        .hero-card-body {
          padding: 12px;
        }

        .hero-card-body ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--text-gray);
        }

        @media (max-width: 900px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-stickers, .hero-ctas {
            justify-content: center;
          }

          .hero-subtext {
            margin: 0 auto 32px auto;
          }
        }
      `}</style>
    </section>
  );
}
