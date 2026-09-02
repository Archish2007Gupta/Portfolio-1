/* ============================================================
   Disciplines.jsx — Nirmaan 2026 Challenge Domains in EventFlow Format
   ============================================================ */

import React, { useEffect, useRef, useState } from 'react';
import { domainTracks } from '../data/portfolioData.js';

export default function Disciplines({ onOpenContact }) {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Capture window height for dynamic section sizing on desktop
  useEffect(() => {
    const updateHeight = () => setWindowHeight(window.innerHeight);
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Dynamically measure horizontal track scroll range on desktop
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const calculateRange = () => {
      const trackWidth = track.scrollWidth;
      const containerWidth = container.clientWidth;
      const maxScroll = Math.max(0, trackWidth - containerWidth);
      setScrollRange(maxScroll);
    };

    calculateRange();

    const resizeObserver = new ResizeObserver(calculateRange);
    resizeObserver.observe(container);
    resizeObserver.observe(track);

    return () => resizeObserver.disconnect();
  }, []);

  // Track scroll progress within the sticky section
  useEffect(() => {
    const handleScroll = () => {
      const target = targetRef.current;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const totalDist = rect.height - window.innerHeight;
      if (totalDist <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalDist, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollRange, windowHeight]);

  const sectionHeight = windowHeight > 0 ? windowHeight + scrollRange : undefined;
  const translateX = -(scrollProgress * scrollRange);

  return (
    <section id="tracks" className="my-gap w-full nirmaan-flow-section" data-reveal>
      
      {/* ── DESKTOP LAYOUT (>= 1024px): Smooth Sticky Horizontal Scroll Track ── */}
      <div
        ref={targetRef}
        className="flow-desktop-wrapper"
        style={{ height: sectionHeight ? `${sectionHeight}px` : '250vh' }}
      >
        <div className="flow-sticky-viewport">
          <div className="flow-sticky-inner">
            
            {/* Left Side: Fixed Description Card */}
            <div className="flow-fixed-card flow-fixed-card--yellow clay-card">
              <div className="flow-card-top-row">
                <span className="flow-kicker flow-kicker--dark">CHALLENGE DOMAINS</span>
                <span className="pulse-dot" />
              </div>

              <div className="flow-card-content">
                <h2 className="flow-main-heading flow-main-heading--dark">6 Tracks.</h2>
                <p className="flow-main-desc flow-main-desc--dark">
                  Specialized innovation domains spanning web architecture, UI/UX systems, AI speech agents, embedded IoT microcontrollers, and real-world product delivery.
                </p>
                <div className="flow-progress-pill flow-progress-pill--dark">
                  <span>TRACK 0{Math.min(Math.floor(scrollProgress * domainTracks.length) + 1, domainTracks.length)} / 0{domainTracks.length}</span>
                </div>
              </div>
            </div>

            {/* Right Side: Horizontal Scroll Track Container */}
            <div ref={containerRef} className="flow-track-container">
              <div
                ref={trackRef}
                className="flow-track-row"
                style={{ transform: `translateX(${translateX}px)` }}
              >
                {domainTracks.map((track, idx) => (
                  <div key={track.id} className="flow-project-card">
                    
                    {/* Clean Full-Height Domain Card (No emoji top box) */}
                    <div className="flow-details-card flow-details-card--full clay-card">
                      <div>
                        {/* Top Badge & Number */}
                        <div className="flow-track-header-row">
                          <span
                            className="flow-stage-pill"
                            style={{ background: track.color, color: '#FFFFFF' }}
                          >
                            Track 0{idx + 1}
                          </span>
                          <span className="flow-project-cat">{track.badge}</span>
                        </div>

                        <h3 className="flow-project-title flow-track-big-title">{track.title}</h3>
                        <p className="flow-project-desc">{track.description}</p>
                      </div>

                      {/* Core Technologies Highlights List */}
                      <div className="flow-track-skills-box">
                        <span className="flow-skills-title">CORE SKILLS &amp; STACK:</span>
                        <ul className="flow-highlights-list">
                          {track.skills.map((skill, i) => (
                            <li key={i} className="flow-highlight-item">
                              <span className="flow-highlight-bullet" style={{ background: track.color }} />
                              <span>{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Card Footer Action */}
                      <div className="flow-card-footer">
                        <span className="track-tag-indicator">
                          <span className="pulse-dot" />
                          <span>ACTIVE FOCUS</span>
                        </span>
                        <button
                          onClick={onOpenContact}
                          className="flow-code-link"
                          style={{ border: 'none', cursor: 'pointer' }}
                        >
                          PROPOSE BRIEF ↗
                        </button>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── MOBILE / TABLET LAYOUT (< 1024px): Clean Responsive Vertical & Swipeable Cards ── */}
      <div className="flow-mobile-wrapper">
        {/* Mobile Header Card */}
        <div className="flow-mobile-header flow-mobile-header--yellow clay-card">
          <div>
            <span className="flow-mobile-kicker flow-kicker--dark">CHALLENGE DOMAINS</span>
            <h2 className="flow-mobile-title flow-main-heading--dark">6 Tracks.</h2>
            <p className="flow-mobile-desc flow-main-desc--dark">
              Specialized innovation domains spanning web architecture, UI/UX systems, AI speech agents, embedded IoT microcontrollers, and real-world product delivery.
            </p>
          </div>
        </div>

        {/* Mobile Horizontal Snap-Scroll Card List */}
        <div className="flow-mobile-scroll">
          {domainTracks.map((track, idx) => (
            <div key={track.id} className="flow-mobile-card-item">
              
              <div className="flow-mobile-details clay-card">
                <div>
                  <div className="flow-track-header-row">
                    <span
                      className="flow-stage-pill"
                      style={{ background: track.color, color: '#FFFFFF' }}
                    >
                      Track 0{idx + 1}
                    </span>
                    <span className="flow-project-cat">{track.badge}</span>
                  </div>

                  <h3 className="flow-project-title">{track.title}</h3>
                  <p className="flow-project-desc">{track.description}</p>
                </div>

                <div className="flow-track-skills-box">
                  <ul className="flow-highlights-list">
                    {track.skills.map((skill, i) => (
                      <li key={i} className="flow-highlight-item">
                        <span className="flow-highlight-bullet" style={{ background: track.color }} />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flow-card-footer">
                  <button
                    onClick={onOpenContact}
                    className="flow-code-link"
                    style={{ border: 'none', cursor: 'pointer' }}
                  >
                    PROPOSE BRIEF ↗
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      <style>{`
        .disciplines-flow-section {
          width: 100%;
          margin: 40px 0;
        }

        /* ── DESKTOP STICKY SCROLL CONTAINER (Original Nirmaan Flow Sizing) ── */
        .flow-desktop-wrapper {
          display: none;
          position: relative;
          width: 100%;
        }

        @media (min-width: 1025px) {
          .flow-desktop-wrapper {
            display: block;
          }
        }

        .flow-sticky-viewport {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          padding: 40px 0;
        }

        .flow-sticky-inner {
          display: flex;
          gap: 24px;
          align-items: stretch;
          height: 82vh;
          max-height: 680px;
          width: 100%;
          padding: 0 32px;
          max-width: 1440px;
          margin: 0 auto;
        }

        /* Left Fixed Description Card (Original Nirmaan Flow Sizing) */
        .flow-fixed-card {
          display: flex;
          width: 340px;
          flex-shrink: 0;
          flex-direction: column;
          justify-content: space-between;
          border-radius: var(--radius-brand);
          background-color: var(--color-yellow);
          padding: 36px 30px;
          color: #11110F;
          z-index: 10;
        }

        @media (min-width: 1280px) {
          .flow-fixed-card {
            width: 360px;
          }
        }

        .flow-card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .flow-kicker--dark {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #11110F;
        }

        .flow-card-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .flow-main-heading--dark {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 4vw, 3.2rem);
          font-weight: 900;
          text-transform: uppercase;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #11110F;
        }

        .flow-main-desc--dark {
          font-size: 0.96rem;
          line-height: 1.55;
          font-weight: 600;
          color: rgba(17, 17, 15, 0.9);
        }

        .flow-progress-pill--dark {
          background: rgba(17, 17, 15, 0.12);
          border: 1px solid rgba(17, 17, 15, 0.25);
          padding: 6px 14px;
          border-radius: var(--radius-pill);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 800;
          color: #11110F;
          align-self: flex-start;
        }

        /* Right Horizontal Track Container (Original Nirmaan Flow Sizing) */
        .flow-track-container {
          min-width: 0;
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .flow-track-row {
          display: flex;
          gap: 24px;
          align-items: stretch;
          padding: 8px 0;
          will-change: transform;
          transition: transform 0.08s linear;
        }

        .flow-project-card {
          flex-shrink: 0;
          width: 340px;
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 1280px) {
          .flow-project-card {
            width: 360px;
          }
        }

        /* Clean Full-Height Details Card */
        .flow-details-card--full {
          flex: 1;
          border-radius: 24px;
          background-color: var(--bg-paper);
          padding: 28px;
          color: var(--text-ink);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 16px;
        }

        .flow-track-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .flow-stage-pill {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(0, 0, 0, 0.15);
          letter-spacing: 0.05em;
        }

        .flow-project-cat {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .flow-track-big-title {
          font-family: var(--font-display);
          font-size: 1.45rem;
          font-weight: 900;
          text-transform: uppercase;
          color: var(--text-ink);
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 10px;
        }

        .flow-project-desc {
          font-size: 0.92rem;
          line-height: 1.55;
          color: var(--text-gray);
        }

        .flow-track-skills-box {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          padding-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .flow-skills-title {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .flow-highlights-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .flow-highlight-item {
          font-size: 0.84rem;
          font-weight: 700;
          color: var(--text-ink);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .flow-highlight-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .flow-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px dashed rgba(0, 0, 0, 0.12);
          padding-top: 12px;
        }

        .track-tag-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--text-ink);
        }

        .flow-code-link {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 900;
          color: var(--color-blue);
          padding: 6px 12px;
          border-radius: var(--radius-pill);
          background: rgba(0, 114, 227, 0.1);
          transition: background 0.15s ease, color 0.15s ease;
        }

        .flow-code-link:hover {
          background: var(--color-blue);
          color: #FFFFFF;
        }

        /* ── MOBILE / TABLET LAYOUT (< 1024px) ── */
        .flow-mobile-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 0 16px;
        }

        @media (min-width: 1025px) {
          .flow-mobile-wrapper {
            display: none;
          }
        }

        .flow-mobile-header--yellow {
          border-radius: var(--radius-brand);
          background-color: var(--color-yellow);
          padding: 24px;
          color: #11110F;
        }

        .flow-mobile-title {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 900;
          text-transform: uppercase;
          line-height: 1;
          margin-top: 4px;
          color: #11110F;
        }

        .flow-mobile-desc {
          font-size: 0.88rem;
          line-height: 1.45;
          margin-top: 8px;
          color: rgba(17, 17, 15, 0.9);
        }

        .flow-mobile-scroll {
          display: flex;
          overflow-x: auto;
          gap: 14px;
          padding-bottom: 16px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .flow-mobile-scroll::-webkit-scrollbar {
          display: none;
        }

        .flow-mobile-card-item {
          flex-shrink: 0;
          width: 290px;
          scroll-snap-align: center;
          display: flex;
          flex-direction: column;
        }

        .flow-mobile-details {
          flex: 1;
          border-radius: 20px;
          background-color: var(--bg-paper);
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
        }
      `}</style>
    </section>
  );
}
