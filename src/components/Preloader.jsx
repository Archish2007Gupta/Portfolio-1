/* ============================================================
   Preloader.jsx — Nirmaan 2026 Kinetic System Initialization
   ============================================================ */

import React, { useState, useEffect } from 'react';

const LOADING_STEPS = [
  '01 // INITIALIZING ARCHISHA CORE',
  '02 // COMPILING VISUAL DESIGN ASSETS',
  '03 // SYNTHESIZING CODE RADAR',
  '04 // LAUNCHING DIGITAL EXHIBITION',
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExiting(true), 250);
          setTimeout(() => onComplete(), 700);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 3;
        const capped = Math.min(next, 100);

        if (capped > 75) setStepIndex(3);
        else if (capped > 50) setStepIndex(2);
        else if (capped > 25) setStepIndex(1);
        else setStepIndex(0);

        return capped;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`preloader-overlay ${isExiting ? 'preloader-overlay--exit' : ''}`}>
      <div className="preloader-content">
        
        {/* Brand Banner */}
        <div className="preloader-brand">
          <span className="preloader-logo">archisha</span>
          <span className="preloader-dot">.</span>
        </div>

        {/* Dynamic Step Text */}
        <div className="preloader-step-pill clay-card">
          <span className="pulse-dot" />
          <span className="preloader-step-text">{LOADING_STEPS[stepIndex]}</span>
        </div>

        {/* Big Counter */}
        <div className="preloader-counter">
          <span className="counter-number">{progress.toString().padStart(3, '0')}</span>
          <span className="counter-symbol">%</span>
        </div>

        {/* Progress Bar with Nirmaan Colored Blocks */}
        <div className="preloader-bar-wrapper clay-card">
          <div
            className="preloader-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Bottom Metadata Tags */}
        <div className="preloader-tags">
          <span className="sticker-tag sticker-tag--blue">BMSIT CSE 2025–29</span>
          <span className="sticker-tag sticker-tag--yellow">CODING CLUB BMSIT</span>
          <span className="sticker-tag sticker-tag--green">ROTARACT</span>
        </div>

      </div>

      <style>{`
        .preloader-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background-color: var(--bg-paper);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.6s cubic-bezier(0.8, 0, 0.15, 1), opacity 0.6s ease;
        }

        .preloader-overlay--exit {
          transform: translateY(-100%);
          opacity: 0;
        }

        .preloader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 20px;
          max-width: 500px;
          width: 90%;
          padding: 30px;
        }

        .preloader-brand {
          display: flex;
          align-items: baseline;
        }

        .preloader-logo {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 4.5rem);
          font-weight: 900;
          color: var(--text-ink);
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .preloader-dot {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 4.5rem);
          font-weight: 900;
          color: var(--color-green-light);
          line-height: 1;
        }

        .preloader-step-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #FFFFFF;
          border-radius: var(--radius-pill);
          padding: 8px 18px;
        }

        .preloader-step-text {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-ink);
        }

        .preloader-counter {
          display: flex;
          align-items: baseline;
          font-family: var(--font-display);
          line-height: 1;
        }

        .counter-number {
          font-size: clamp(4rem, 12vw, 6.5rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          color: var(--text-ink);
        }

        .counter-symbol {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          color: var(--color-yellow);
          margin-left: 4px;
        }

        .preloader-bar-wrapper {
          width: 100%;
          height: 16px;
          background: #FFFFFF;
          border-radius: var(--radius-pill);
          overflow: hidden;
          padding: 3px;
        }

        .preloader-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #0072E3, #FFB200, #EF333A, #00AA3C, #AB54F7);
          border-radius: var(--radius-pill);
          transition: width 0.1s ease;
        }

        .preloader-tags {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
