/* ============================================================
   Footer.jsx — Nirmaan 2026 & units.gr Workspace Grid Footer
   ============================================================ */

import React from 'react';
import { profile } from '../data/portfolioData.js';

export default function Footer({ onOpenContact }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="nirmaan-grid-footer">
      <div className="footer-container">
        
        {/* Grid workspace container matching units.gr layout */}
        <div className="footer-workspace-grid clay-card">
          
          {/* Animated scattered grid block snap-elements */}
          <div className="scattered-block block-purple" title="Snap Block" />
          <div className="scattered-block block-blue" title="Snap Block" />
          <div className="scattered-block block-yellow" title="Snap Block" />
          <div className="scattered-block block-orange" title="Snap Block" />
          <div className="scattered-block block-green" title="Snap Block" />

          {/* Giant branding typography with snapped accents */}
          <div className="giant-brand-wrap" onClick={scrollToTop}>
            <h2 className="giant-brand-text">
              archisha.
              {/* Embedded custom color spots overlapping letters */}
              <span className="snap-accent-dot snap-accent-red" />
              <span className="snap-accent-bar snap-accent-green" />
            </h2>
          </div>

        </div>

        {/* Footer bottom details & navigation links */}
        <div className="footer-bottom-row">
          
          <div className="footer-attribution">
            <p className="footer-copyright">
              © {new Date().getFullYear()} ARCHISHA GUPTA
            </p>
            <p className="footer-byline">
              Designed &amp; Built with <span className="heart-accent">♥</span> by{' '}
              <span className="author-name">Archisha Gupta</span>
              {' · '}CSE @ BMSIT &amp; Design Associate @ Coding Club BMSIT
            </p>
          </div>

          {/* Outline Pill navigation items */}
          <div className="footer-pill-links" aria-label="Footer links">
            <button onClick={scrollToTop} className="footer-outline-pill">
              Back to Top ↑
            </button>
            <button onClick={onOpenContact} className="footer-outline-pill footer-outline-pill--highlight">
              Initiate Contact ↗
            </button>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-outline-pill"
            >
              GitHub ↗
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-outline-pill"
            >
              LinkedIn ↗
            </a>
          </div>

        </div>

      </div>

      <style>{`
        .nirmaan-grid-footer {
          margin-top: 40px;
          padding-bottom: 30px;
        }

        .footer-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* ── Grid Workspace Container ── */
        .footer-workspace-grid {
          position: relative;
          height: clamp(200px, 25vw, 320px);
          overflow: hidden;
          border-radius: var(--radius-brand);
          border: 2px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.12);
          background-color: #F2EAE1;
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.12) 1px, transparent 1px);
          background-size: 36px 36px;
        }

        /* ── Scattered Grid Snap Blocks ── */
        .scattered-block {
          position: absolute;
          width: 36px;
          height: 36px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .scattered-block:hover {
          transform: scale(1.3) rotate(15deg) !important;
        }

        .block-purple {
          left: 20%;
          top: 15%;
          background: var(--color-purple);
          animation: floatBlock1 5s ease-in-out infinite;
        }

        .block-blue {
          left: 72%;
          top: 22%;
          background: var(--color-blue);
          animation: floatBlock2 6.2s ease-in-out infinite 0.5s;
        }

        .block-yellow {
          left: 52%;
          top: 38%;
          background: var(--color-yellow);
          animation: floatBlock3 5.6s ease-in-out infinite 1s;
        }

        .block-orange {
          left: 33%;
          top: 45%;
          background: var(--color-orange);
          animation: floatBlock4 4.8s ease-in-out infinite 1.5s;
        }

        .block-green {
          left: 85%;
          top: 48%;
          background: var(--color-green-light);
          animation: floatBlock1 5.2s ease-in-out infinite 0.8s;
        }

        @keyframes floatBlock1 {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          30% { transform: translateY(-12px) rotate(8deg) scale(1.08); }
          70% { transform: translateY(10px) rotate(-6deg) scale(0.96); }
        }

        @keyframes floatBlock2 {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          30% { transform: translateY(14px) rotate(-10deg) scale(0.95); }
          70% { transform: translateY(-8px) rotate(8deg) scale(1.1); }
        }

        @keyframes floatBlock3 {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          30% { transform: translateY(-16px) rotate(12deg) scale(1.12); }
          70% { transform: translateY(10px) rotate(-12deg) scale(0.92); }
        }

        @keyframes floatBlock4 {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          30% { transform: translateY(10px) rotate(-8deg) scale(0.96); }
          70% { transform: translateY(-14px) rotate(10deg) scale(1.09); }
        }

        /* ── Giant Branding Typography ── */
        .giant-brand-wrap {
          position: absolute;
          bottom: 16px;
          left: 24px;
          z-index: 10;
          user-select: none;
          cursor: pointer;
        }

        @media (min-width: 768px) {
          .giant-brand-wrap {
            bottom: 24px;
            left: 36px;
          }
        }

        .giant-brand-text {
          font-family: var(--font-display);
          font-size: clamp(54px, 10.5vw, 130px);
          line-height: 0.9;
          letter-spacing: -0.05em;
          font-weight: 900;
          color: var(--text-ink);
          position: relative;
          display: inline-block;
        }

        .snap-accent-dot {
          position: absolute;
          left: 18px;
          bottom: 2px;
          width: 16px;
          height: 16px;
          background: var(--color-red);
          border-radius: 2px;
          z-index: 20;
          animation: spinScaleAccent 3s ease-in-out infinite;
        }

        .snap-accent-bar {
          position: absolute;
          left: 115px;
          bottom: 18px;
          width: 10px;
          height: 24px;
          background: var(--color-green-light);
          border-radius: 2px;
          z-index: 20;
          animation: pulseBarAccent 2.5s ease-in-out infinite;
        }

        @keyframes spinScaleAccent {
          0%, 100% { transform: rotate(45deg) scale(1); }
          50% { transform: rotate(90deg) scale(1.25); }
        }

        @keyframes pulseBarAccent {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-4px) scaleY(1.2); }
        }

        /* ── Footer Bottom Details Row ── */
        .footer-bottom-row {
          margin-top: 24px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
        }

        .footer-attribution {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
        }

        .footer-copyright {
          font-family: var(--font-display);
          font-size: 0.88rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-ink);
        }

        .footer-byline {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-ink);
        }

        .heart-accent {
          color: var(--color-red);
          font-weight: 900;
        }

        .author-name {
          font-weight: 900;
          color: var(--text-ink);
          text-decoration: underline;
          text-decoration-color: var(--color-blue);
        }

        /* ── Outline Pill Links ── */
        .footer-pill-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .footer-outline-pill {
          border-radius: var(--radius-pill);
          border: 1.5px solid rgba(0, 0, 0, 0.4);
          padding: 8px 18px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--text-ink);
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
        }

        .footer-outline-pill:hover {
          background: var(--text-ink);
          color: #FFFFFF;
          border-color: var(--text-ink);
          transform: translateY(-2px);
        }

        .footer-outline-pill--highlight {
          background: var(--color-yellow);
          border-color: #000000;
        }

        .footer-outline-pill--highlight:hover {
          background: var(--color-orange);
          color: #FFFFFF;
        }
      `}</style>
    </footer>
  );
}
