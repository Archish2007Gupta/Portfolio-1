/* ============================================================
   CertificatesGallery.jsx — Exact Nirmaan 2026 gallery.tsx Format
   ============================================================ */

import React, { useState } from 'react';
import { certificatesData } from '../data/portfolioData.js';
import { ArrowUpRight, CloseIcon } from './Icons.jsx';

export default function CertificatesGallery({ onOpenContact }) {
  const [selectedCert, setSelectedCert] = useState(null);

  // Triplicated list for seamless 60fps infinite marquee loop
  const marqueeItems = [
    ...certificatesData,
    ...certificatesData,
    ...certificatesData,
  ];

  return (
    <section id="certificates" className="nirmaan-gallery-section" data-reveal>
      {/* Signature Nirmaan Claymorphic Container */}
      <div className="gallery-container clay-card">
        
        {/* Header Row */}
        <div className="gallery-header-row">
          <div>
            <span className="gallery-kicker">
              ARCHISHA ARCHIVES // VERIFIED REEL
            </span>
            <h2 className="gallery-headline">
              Credentials &amp; Certificates
            </h2>
          </div>

          <button
            onClick={onOpenContact}
            className="gallery-action-btn clay-card"
          >
            <span>Request Full Archive</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Single Row Horizontal Infinite Scroller */}
        <div className="gallery-scroller-viewport">
          <div className="gallery-marquee-track">
            {marqueeItems.map((cert, i) => (
              <div
                key={`${cert.id}-${i}`}
                className="gallery-card-item"
                onClick={() => setSelectedCert(cert)}
              >
                <div className="gallery-card-inner clay-card">
                  
                  {/* Aspect Video Preview Certificate Canvas */}
                  <div
                    className="gallery-preview-canvas"
                    style={{ background: cert.color }}
                  >
                    <div className="canvas-gradient-overlay" />
                    
                    {/* Top Bar: Issuer & Gold Seal */}
                    <div className="canvas-top-bar">
                      <span className="canvas-cat-badge">
                        🏛️ {cert.issuer}
                      </span>
                      <span className="cert-gold-seal" title="Verified Credential">
                        ★ VERIFIED
                      </span>
                    </div>

                    {/* Certificate Center Header */}
                    <div className="canvas-artwork-center">
                      <span className="artwork-icon">📜</span>
                      <h3 className="artwork-title-preview">
                        {cert.title}
                      </h3>
                      <p className="cert-domain-tag">{cert.category} // {cert.date}</p>
                    </div>

                    {/* Bottom Credential ID & Click CTA */}
                    <div className="canvas-bottom-bar">
                      <span className="cert-id-tag">{cert.credentialId}</span>
                      <span className="cert-view-hint">CLICK TO VIEW ↗</span>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Interactive Certificate Detail Modal */}
      {selectedCert && (
        <div className="dialog-backdrop" onClick={() => setSelectedCert(null)} role="dialog" aria-modal="true">
          <div className="dialog-content text-ink cert-modal-content" onClick={(e) => e.stopPropagation()}>
            
            <button
              onClick={() => setSelectedCert(null)}
              className="modal-close-btn clay-card"
              aria-label="Close dialog"
            >
              <CloseIcon size={16} />
            </button>

            {/* Modal Header */}
            <div className="cert-modal-header" style={{ background: selectedCert.color, color: '#FFFFFF' }}>
              <div className="cert-modal-badge-row">
                <span className="canvas-cat-badge">🏛️ {selectedCert.issuer}</span>
                <span className="cert-gold-seal">★ VERIFIED ACADEMIC RECORD</span>
              </div>
              <h2 className="cert-modal-title">{selectedCert.title}</h2>
              <p className="cert-modal-date">{selectedCert.category} · Completed {selectedCert.date}</p>
            </div>

            {/* Modal Body */}
            <div className="cert-modal-body">
              <p className="cert-modal-desc">{selectedCert.description}</p>
              
              <div className="cert-skills-box">
                <span className="cert-skills-label">ACCREDITED COMPETENCIES:</span>
                <div className="about-pills-row">
                  {selectedCert.tags.map((tag) => (
                    <span key={tag} className="tech-pill">
                      ✦ {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="cert-id-bar clay-card">
                <div>
                  <p className="quick-label">OFFICIAL CREDENTIAL IDENTIFIER</p>
                  <p className="quick-val">{selectedCert.credentialId}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCert(null);
                    if (onOpenContact) onOpenContact();
                  }}
                  className="cert-verify-btn clay-card"
                >
                  Request Official PDF Copy ↗
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .nirmaan-gallery-section {
          padding: 0;
          margin-bottom: 24px;
        }

        .gallery-container {
          background-color: var(--color-purple, #AB54F7);
          padding: 28px 20px;
          border-radius: var(--radius-brand, 32px);
          border: 2.5px solid #11110F;
          box-shadow: 6px 6px 0px #11110F;
          color: #F4E9E1;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .gallery-container {
            padding: 36px 32px;
          }
        }

        .gallery-header-row {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 28px;
        }

        @media (min-width: 640px) {
          .gallery-header-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .gallery-kicker {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--color-yellow, #FFB200);
          text-transform: uppercase;
          display: block;
          margin-bottom: 4px;
        }

        .gallery-headline {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
          color: #FFFFFF;
        }

        .gallery-action-btn {
          background: #F4E9E1;
          color: #11110F;
          font-family: var(--font-display);
          font-size: 0.88rem;
          font-weight: 900;
          padding: 12px 24px;
          border-radius: 9999px;
          border: 2px solid #11110F;
          box-shadow: 3px 3px 0px #11110F;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          align-self: flex-start;
        }

        .gallery-action-btn:hover {
          background: var(--color-yellow, #FFB200);
          transform: translateY(-2px);
          box-shadow: 5px 5px 0px #11110F;
        }

        /* ── Scroller Viewport (Flat without side blur/mask) ── */
        .gallery-scroller-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .gallery-marquee-track {
          display: flex;
          gap: 18px;
          width: max-content;
          animation: marqueeFlowCert 38s linear infinite;
        }

        .gallery-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marqueeFlowCert {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        /* ── Card Item ── */
        .gallery-card-item {
          width: 280px;
          flex-shrink: 0;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (min-width: 640px) {
          .gallery-card-item {
            width: 340px;
          }
        }

        .gallery-card-item:hover {
          transform: translateY(-4px) scale(1.02);
        }

        .gallery-card-inner {
          border-radius: 18px;
          overflow: hidden;
          border: 2px solid #11110F;
          box-shadow: 4px 4px 0px #11110F;
          background: #11110F;
        }

        .gallery-preview-canvas {
          aspect-ratio: 16 / 10;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .canvas-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.3) 100%);
          pointer-events: none;
        }

        .canvas-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .canvas-cat-badge {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 800;
          color: #FFFFFF;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(4px);
          padding: 3px 10px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.25);
        }

        .cert-gold-seal {
          background: var(--color-yellow, #FFB200);
          color: #11110F;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 900;
          padding: 2px 8px;
          border-radius: 9999px;
          border: 1px solid #11110F;
          box-shadow: 1.5px 1.5px 0px #11110F;
          letter-spacing: 0.04em;
        }

        .canvas-artwork-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 2;
          margin: auto 0;
        }

        .artwork-icon {
          font-size: 1.75rem;
          filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4));
          margin-bottom: 2px;
        }

        .artwork-title-preview {
          font-family: var(--font-display);
          font-size: 0.96rem;
          font-weight: 900;
          line-height: 1.2;
          color: #FFFFFF;
          letter-spacing: -0.02em;
        }

        .cert-domain-tag {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 700;
          text-transform: uppercase;
          margin-top: 2px;
        }

        .canvas-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 2;
          padding-top: 6px;
          border-top: 1px dashed rgba(255, 255, 255, 0.3);
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 800;
        }

        .cert-id-tag {
          color: var(--color-yellow, #FFB200);
        }

        .cert-view-hint {
          color: #FFFFFF;
          text-decoration: underline;
        }

        /* ── Modal Specific Styles ── */
        .cert-modal-content {
          padding: 0;
          overflow: hidden;
        }

        .cert-modal-header {
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cert-modal-badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .cert-modal-title {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 2.5vw, 1.8rem);
          font-weight: 900;
          line-height: 1.1;
          color: #FFFFFF;
        }

        .cert-modal-date {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 700;
        }

        .cert-modal-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: var(--bg-paper);
        }

        .cert-modal-desc {
          font-size: 0.92rem;
          line-height: 1.55;
          color: var(--text-gray);
        }

        .cert-skills-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cert-skills-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }

        .cert-id-bar {
          background: #FFFFFF;
          border-radius: 14px;
          padding: 14px 18px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
        }

        .cert-verify-btn {
          background: var(--text-ink);
          color: #FFFFFF;
          padding: 8px 16px;
          border-radius: var(--radius-pill);
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 900;
          transition: all 0.2s ease;
        }

        .cert-verify-btn:hover {
          background: var(--color-blue);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
