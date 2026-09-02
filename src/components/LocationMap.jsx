/* ============================================================
   LocationMap.jsx — Nirmaan 2026 BMSIT Campus & Bengaluru Map Card
   ============================================================ */

import React, { useState, useEffect } from 'react';

export default function LocationMap() {
  const [blrTime, setBlrTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setBlrTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="nirmaan-section" id="location">
      
      {/* Section Header */}
      <div className="nirmaan-section-title">
        <span className="badge">07</span>
        <h2>CAMPUS DIRECTORY & LOCATION</h2>
      </div>

      <p className="location-intro">
        Based in Bengaluru, the Silicon Valley of India. Studying and building out of the BMS Institute of Technology & Management campus in Yelahanka.
      </p>

      {/* Map Main Card */}
      <div className="brutal-card location-card">
        
        <div className="card-header-banner" style={{ background: 'var(--color-blue)' }}>
          <span>CAMPUS COORDINATES // 13.1332° N, 77.5684° E</span>
          <span className="location-clock">BLR LIVE: {blrTime || '15:30 IST'}</span>
        </div>

        <div className="location-card-grid">
          
          {/* Left Info Column */}
          <div className="location-info-pane">
            <div className="location-badge-stack">
              <span className="sticker-tag sticker-tag--yellow">BMSIT CAMPUS</span>
              <span className="sticker-tag sticker-tag--green-light">
                <span className="pulse-dot" /> LIVE HQ
              </span>
            </div>

            <h3 className="location-venue-name">
              BMS Institute of Technology & Management
            </h3>

            <p className="location-address">
              Doddaballapur Main Road, Avalahalli, Yelahanka, Bengaluru, Karnataka 560064, India.
            </p>

            <div className="transit-cards-grid">
              <div className="transit-card">
                <span className="transit-icon">✈️</span>
                <div>
                  <p className="transit-title">Airport Transit</p>
                  <p className="transit-sub">25 mins from Kempegowda Int&apos;l (BLR)</p>
                </div>
              </div>

              <div className="transit-card">
                <span className="transit-icon">🚆</span>
                <div>
                  <p className="transit-title">Railway Hub</p>
                  <p className="transit-sub">10 mins from Yelahanka Junction</p>
                </div>
              </div>

              <div className="transit-card">
                <span className="transit-icon">⚡</span>
                <div>
                  <p className="transit-title">Innovation Labs</p>
                  <p className="transit-sub">Coding Club Lab &amp; IoT Research Center</p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=BMS+Institute+of+Technology+and+Management+Bangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="location-maps-btn clay-card"
            >
              <span>OPEN IN GOOGLE MAPS</span>
              <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                <path d="M11.25 4.5H4.5V2.8h9.65v9.65h-1.7V5.7L4.95 13.2l-1.2-1.2 7.5-7.5Z" fill="currentColor" />
              </svg>
            </a>
          </div>

          {/* Right Map Graphic Canvas */}
          <div className="location-map-visual">
            <div className="map-grid-bg" />
            
            {/* Pulsing Campus Pin */}
            <div className="map-pin-marker">
              <div className="map-pin-pulse" />
              <div className="map-pin-core">
                <span className="map-pin-emoji">📍</span>
              </div>
              <div className="map-pin-label">
                <span className="pin-title">BMSIT BENGALURU</span>
                <span className="pin-desc">CSE · CODING CLUB · ROTARACT</span>
              </div>
            </div>

            {/* Radar Coordinates Overlay */}
            <div className="map-radar-ring map-radar-ring--1" />
            <div className="map-radar-ring map-radar-ring--2" />
            <div className="map-radar-ring map-radar-ring--3" />
          </div>

        </div>

      </div>

      <style>{`
        .location-intro {
          font-size: 1.05rem;
          color: var(--text-gray);
          max-width: 680px;
          margin-bottom: 36px;
        }

        .location-card {
          overflow: hidden;
        }

        .location-clock {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          background: rgba(0, 0, 0, 0.25);
          padding: 2px 10px;
          border-radius: var(--radius-pill);
        }

        .location-card-grid {
          display: grid;
          grid-template-columns: 1fr;
        }

        @media (min-width: 1025px) {
          .location-card-grid {
            grid-template-columns: 1.15fr 0.85fr;
          }
        }

        .location-info-pane {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .location-badge-stack {
          display: flex;
          gap: 8px;
        }

        .location-venue-name {
          font-size: clamp(1.4rem, 2.4vw, 2rem);
          color: var(--text-ink);
          letter-spacing: -0.02em;
          line-height: 1.15;
        }

        .location-address {
          font-size: 0.95rem;
          line-height: 1.55;
          color: var(--text-gray);
        }

        .transit-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          margin: 6px 0;
        }

        .transit-card {
          background: rgba(244, 233, 225, 0.75);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .transit-icon {
          font-size: 1.2rem;
        }

        .transit-title {
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 900;
          color: var(--text-ink);
        }

        .transit-sub {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .location-maps-btn {
          background: var(--text-ink);
          color: var(--color-yellow);
          padding: 12px 24px;
          border-radius: var(--radius-pill);
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
          transition: all 0.2s ease;
        }

        .location-maps-btn:hover {
          background: var(--color-blue);
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        /* Right Map Graphic */
        .location-map-visual {
          background: #11110F;
          min-height: 280px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-top: var(--border-medium);
        }

        @media (min-width: 1025px) {
          .location-map-visual {
            border-top: none;
            border-left: var(--border-medium);
          }
        }

        .map-grid-bg {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .map-pin-marker {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .map-pin-core {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--color-yellow);
          border: 3px solid #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
        }

        .map-pin-emoji {
          font-size: 24px;
        }

        .map-pin-label {
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          padding: 6px 12px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .pin-title {
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 900;
          color: var(--color-yellow);
        }

        .pin-desc {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .map-radar-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          pointer-events: none;
        }

        .map-radar-ring--1 { width: 140px; height: 140px; }
        .map-radar-ring--2 { width: 240px; height: 240px; }
        .map-radar-ring--3 { width: 340px; height: 340px; }
      `}</style>
    </section>
  );
}
