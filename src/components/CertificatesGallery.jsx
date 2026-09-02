/* ============================================================
   CertificatesGallery.jsx — Autoplay Infinite Vault with Seamless Drag & Scroll
   ============================================================ */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { certificatesData } from '../data/portfolioData.js';
import { ArrowUpRight, CloseIcon } from './Icons.jsx';

export default function CertificatesGallery({ onOpenContact }) {
  const [selectedCert, setSelectedCert] = useState(null);
  const scrollerRef = useRef(null);
  const animFrameId = useRef(null);
  const isInteracting = useRef(false);
  const isHovered = useRef(false);
  const resumeTimeout = useRef(null);

  // Drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasDragged = useRef(false);

  // Duplicated list once for infinite continuous 60fps loop
  const marqueeItems = [
    ...certificatesData,
    ...certificatesData,
  ];

  // Helper to pause autoplay temporarily and resume after idle
  const pauseAndScheduleResume = useCallback((delay = 2000) => {
    isInteracting.current = true;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      if (!isHovered.current && !isDragging.current) {
        isInteracting.current = false;
      }
    }, delay);
  }, []);

  // Continuous Autoplay Ticker (60fps)
  useEffect(() => {
    const scrollContainer = scrollerRef.current;
    if (!scrollContainer) return;

    let lastTime = performance.now();
    const speed = 0.75; // pixels per frame

    const tick = (now) => {
      const delta = Math.min((now - lastTime) / 16.67, 2); // normalize delta time
      lastTime = now;

      if (!isInteracting.current && !isHovered.current && scrollContainer) {
        const maxLoopWidth = scrollContainer.scrollWidth / 2;
        scrollContainer.scrollLeft += speed * delta;

        // Seamless infinite loop wrap
        if (scrollContainer.scrollLeft >= maxLoopWidth) {
          scrollContainer.scrollLeft -= maxLoopWidth;
        } else if (scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft += maxLoopWidth;
        }
      }

      animFrameId.current = requestAnimationFrame(tick);
    };

    animFrameId.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    };
  }, []);

  // ── Mouse Drag & Touch Handlers ──
  const handleMouseDown = (e) => {
    if (!scrollerRef.current) return;
    isDragging.current = true;
    isInteracting.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - scrollerRef.current.offsetLeft;
    scrollLeftStart.current = scrollerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !scrollerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 4) {
      hasDragged.current = true;
    }
    scrollerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      pauseAndScheduleResume(1800);
    }
  };

  // Wheel / Trackpad scroll interrupt
  const handleWheel = () => {
    pauseAndScheduleResume(2000);
  };

  // Hover interrupt
  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    isDragging.current = false;
    pauseAndScheduleResume(800);
  };

  // Touch support for mobile
  const handleTouchStart = () => {
    isInteracting.current = true;
  };

  const handleTouchEnd = () => {
    pauseAndScheduleResume(2000);
  };

  // Card Click (Modal opener)
  const handleCardClick = (cert) => {
    if (!hasDragged.current) {
      setSelectedCert(cert);
    }
  };

  return (
    <section id="certificates" className="nirmaan-gallery-section" data-reveal>
      {/* Signature Nirmaan Claymorphic Container */}
      <div className="gallery-container clay-card">
        
        {/* Header Row */}
        <div className="gallery-header-row">
          <div>
            <span className="gallery-kicker">
              ARCHISHA ARCHIVES // VERIFIED VAULT
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

        {/* Live Continuous Autoplay Scroller with Interactive Interrupt */}
        <div
          ref={scrollerRef}
          className="gallery-scroller-viewport"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="gallery-items-track">
            {marqueeItems.map((cert, index) => (
              <div
                key={`${cert.id}-${index}`}
                className="gallery-card-item"
                onClick={() => handleCardClick(cert)}
              >
                <div className="gallery-card-inner clay-card">
                  
                  {/* Full Card Certificate Visual Canvas */}
                  <div className="cert-full-card-canvas">
                    <div className="cert-full-img-wrap">
                      <img
                        src={cert.file}
                        alt={cert.title}
                        className="cert-full-img"
                        loading="lazy"
                        draggable="false"
                      />
                      
                      {/* Minimal Floating Corner Badges */}
                      <div className="cert-img-badge-overlay">
                        <span className="cert-hover-tag">
                          🏛️ {cert.issuer}
                        </span>
                        <span className="cert-click-pill">
                          VIEW FULL ↗
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Full-Screen High-Resolution Certificate Lightbox Modal */}
      {selectedCert && (
        <div 
          className="cert-lightbox-backdrop" 
          onClick={() => setSelectedCert(null)} 
          role="dialog" 
          aria-modal="true"
        >
          <div 
            className="cert-lightbox-modal clay-card" 
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header Bar */}
            <div className="cert-lightbox-header">
              <div className="cert-lightbox-header-left">
                <div className="cert-lightbox-tags">
                  <span className="cert-tag-pill">🏛️ {selectedCert.issuer}</span>
                  <span className="cert-tag-gold">★ VERIFIED RECORD</span>
                  <span className="cert-tag-mono">{selectedCert.credentialId}</span>
                </div>
                <h3 className="cert-lightbox-title">{selectedCert.title}</h3>
              </div>

              <div className="cert-lightbox-actions">
                <a
                  href={selectedCert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-lightbox-open-btn clay-card"
                  title="Open high-res original in new tab"
                >
                  <span>Open Full Pic</span>
                  <ArrowUpRight size={14} />
                </a>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="cert-lightbox-close-btn clay-card"
                  aria-label="Close certificate lightbox"
                >
                  <CloseIcon size={18} />
                </button>
              </div>
            </div>

            {/* Main High-Resolution Full Picture Display */}
            <div className="cert-lightbox-image-viewer">
              <img
                src={selectedCert.file}
                alt={selectedCert.title}
                className="cert-lightbox-full-img"
              />
            </div>

            {/* Footer Bar with Tags & Description */}
            <div className="cert-lightbox-footer">
              <div className="cert-lightbox-tags-row">
                <span className="cert-competencies-label">ACCREDITED SKILLS:</span>
                {selectedCert.tags.map((tag) => (
                  <span key={tag} className="tech-pill">
                    ✦ {tag}
                  </span>
                ))}
              </div>

              <p className="cert-lightbox-desc">
                {selectedCert.description}
              </p>
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
          margin-bottom: 24px;
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
          padding: 11px 22px;
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

        /* ── Autoplay Scroller Viewport (No scrollbar) ── */
        .gallery-scroller-viewport {
          position: relative;
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 8px 4px 18px 4px;
          margin: -8px -4px -18px -4px;
          cursor: grab;
          user-select: none;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE / Edge */
        }

        .gallery-scroller-viewport::-webkit-scrollbar {
          display: none; /* Chrome / Safari */
          width: 0;
          height: 0;
        }

        .gallery-scroller-viewport:active {
          cursor: grabbing;
        }

        .gallery-items-track {
          display: flex;
          gap: 20px;
          width: max-content;
        }

        /* ── Full Card Item ── */
        .gallery-card-item {
          width: 300px;
          flex-shrink: 0;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (min-width: 640px) {
          .gallery-card-item {
            width: 360px;
          }
        }

        .gallery-card-item:hover {
          transform: translateY(-4px) scale(1.01);
        }

        .gallery-card-inner {
          border-radius: 20px;
          overflow: hidden;
          border: 2px solid #11110F;
          box-shadow: 4px 4px 0px #11110F;
          background: #FFFFFF;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .gallery-card-item:hover .gallery-card-inner {
          box-shadow: 6px 6px 0px #11110F;
        }

        .cert-full-card-canvas {
          width: 100%;
          height: 215px;
          position: relative;
          background: #FFFFFF;
        }

        @media (min-width: 640px) {
          .cert-full-card-canvas {
            height: 215px;
          }
        }

        /* ── Real Certificate Image ── */
        .cert-full-img-wrap {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cert-full-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
          transition: transform 0.3s ease;
        }

        .gallery-card-item:hover .cert-full-img {
          transform: scale(1.03);
        }

        .cert-img-badge-overlay {
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 5;
        }

        .cert-hover-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 900;
          color: #FFFFFF;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(6px);
          padding: 4px 10px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.35);
        }

        .cert-click-pill {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 900;
          color: #11110F;
          background: var(--color-yellow, #FFB200);
          padding: 4px 10px;
          border-radius: 9999px;
          border: 1px solid #11110F;
          box-shadow: 1px 1px 0px #11110F;
        }

        /* ── Full Certificate High-Res Lightbox ── */
        .cert-lightbox-backdrop {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(17, 17, 15, 0.88);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: fadeInLightbox 0.25s ease;
        }

        @keyframes fadeInLightbox {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .cert-lightbox-modal {
          background: #FFFFFF;
          border-radius: 24px;
          border: 2.5px solid #11110F;
          box-shadow: 8px 8px 0px #11110F;
          max-width: 900px;
          width: 100%;
          max-height: 94vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: scaleUpLightbox 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scaleUpLightbox {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Lightbox Header */
        .cert-lightbox-header {
          padding: 18px 24px;
          border-bottom: 2px solid #11110F;
          background: #F4E9E1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .cert-lightbox-header-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cert-lightbox-tags {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .cert-tag-pill {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          color: #FFFFFF;
          background: #11110F;
          padding: 3px 10px;
          border-radius: 9999px;
        }

        .cert-tag-gold {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 900;
          color: #11110F;
          background: var(--color-yellow, #FFB200);
          padding: 3px 9px;
          border-radius: 9999px;
          border: 1px solid #11110F;
        }

        .cert-tag-mono {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          color: rgba(17, 17, 15, 0.6);
        }

        .cert-lightbox-title {
          font-family: var(--font-display);
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 900;
          line-height: 1.2;
          color: #11110F;
        }

        .cert-lightbox-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .cert-lightbox-open-btn {
          background: var(--color-blue);
          color: #FFFFFF;
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 900;
          padding: 8px 16px;
          border-radius: 9999px;
          border: 1.5px solid #11110F;
          box-shadow: 2px 2px 0px #11110F;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .cert-lightbox-open-btn:hover {
          background: var(--color-purple, #AB54F7);
          transform: translateY(-2px);
        }

        .cert-lightbox-close-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid #11110F;
          box-shadow: 2px 2px 0px #11110F;
          background: #FFFFFF;
          color: #11110F;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cert-lightbox-close-btn:hover {
          background: var(--color-red, #EF333A);
          color: #FFFFFF;
          transform: rotate(90deg);
        }

        /* Image Viewer Body */
        .cert-lightbox-image-viewer {
          flex: 1;
          padding: 16px;
          background: #0E0E0E;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: auto;
          min-height: 320px;
          max-height: 65vh;
        }

        .cert-lightbox-full-img {
          max-width: 100%;
          max-height: 60vh;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        }

        /* Footer */
        .cert-lightbox-footer {
          padding: 14px 20px;
          background: #F4E9E1;
          border-top: 2px solid #11110F;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cert-lightbox-tags-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .cert-competencies-label {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 800;
          color: rgba(17, 17, 15, 0.7);
        }

        .cert-lightbox-desc {
          font-size: 0.82rem;
          line-height: 1.4;
          color: rgba(17, 17, 15, 0.85);
        }
      `}</style>
    </section>
  );
}
