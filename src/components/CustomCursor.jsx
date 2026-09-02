/* ============================================================
   CustomCursor.jsx — Sparkle Default & Orbital Circle with Glow on Hover
   ============================================================
   - Default State: Crisp, clean 4-Point Sparkle (✦)
   - Clickable Hover: Sleek Orbital Circle with Luminous Glow
   ============================================================ */

import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (target) {
        // Triggers glowing orbit on clickable links, pages, buttons, certificates, and openers
        const opensLinkOrPage = target.closest(
          'a[href], [role="link"], button, [role="button"], .gallery-card-item, .gallery-card-inner, .dept-card, .sidenav-social-btn, .project-action-btn, .flow-code-link, .gallery-action-btn, .sidenav-brand, .sidenav-card, .sidenav-badge, .modal-close-btn, .cert-lightbox-close-btn, .cert-lightbox-open-btn, .faq-question-btn, [data-link]'
        );
        setIsHovered(!!opensLinkOrPage);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // 60FPS Direct Tracking
    const render = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        className={`custom-cursor-layer ${isVisible ? 'custom-cursor-layer--visible' : ''} ${
          isHovered ? 'cursor--orbit-mode' : 'cursor--sparkle-mode'
        } ${isClicking ? 'cursor--clicking' : ''}`}
        aria-hidden="true"
      >
        <div ref={dotRef} className="cursor-dot-anchor">
          {/* Default State: Crisp Sparkle (✦) */}
          <div className="sparkle-glyph">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
              <path
                d="M12 0C12 6.6 17.4 12 24 12C17.4 12 12 17.4 12 24C12 17.4 6.6 12 0 12C6.6 12 12 6.6 12 0Z"
                fill="#FFB200"
                stroke="#11110F"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Hover State: Orbital Circle with Glow around it */}
          <div className="orbit-glow-circle-wrap">
            <div className="orbit-circle-glow" />
            <div className="orbit-circle-ring" />
            <div className="orbit-center-pin" />
          </div>
        </div>
      </div>

      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body, a, button, input, textarea, select, [role="button"], .clay-card {
            cursor: none !important;
          }
        }

        .custom-cursor-layer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 999999;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .custom-cursor-layer--visible {
          opacity: 1;
        }

        /* ── Anchor ── */
        .cursor-dot-anchor {
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
          will-change: transform;
        }

        /* ── DEFAULT STATE: SPARKLE (✦) ── */
        .sparkle-glyph {
          position: absolute;
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
          transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
          opacity: 1;
          filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
        }

        /* ── HOVER STATE: ORBITAL CIRCLE WITH GLOW ── */
        .orbit-glow-circle-wrap {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
        }

        /* Luminous outer glow around orbital circle */
        .orbit-circle-glow {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 178, 0, 0.4) 0%,
            rgba(255, 178, 0, 0.18) 50%,
            transparent 75%
          );
          filter: blur(4px);
        }

        /* Clean, sleek orbital circle ring */
        .orbit-circle-ring {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 2px solid #FFB200;
          background: rgba(255, 178, 0, 0.08);
          box-shadow: 
            0 0 10px rgba(255, 178, 0, 0.75),
            0 0 20px rgba(255, 178, 0, 0.35),
            inset 0 0 6px rgba(255, 178, 0, 0.35);
        }

        /* Pinpoint center dot */
        .orbit-center-pin {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #11110F;
          border: 1px solid #FFB200;
          box-shadow: 0 0 4px rgba(255, 178, 0, 0.8);
        }

        /* ── STATE TRANSITIONS ── */
        /* Orbit Mode (Hover on clickable links) */
        .cursor--orbit-mode .sparkle-glyph {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0) rotate(45deg);
        }

        .cursor--orbit-mode .orbit-glow-circle-wrap {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        /* Sparkle Mode (Default) */
        .cursor--sparkle-mode .sparkle-glyph {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }

        .cursor--sparkle-mode .orbit-glow-circle-wrap {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0);
        }

        /* ── CLICK FEEDBACK ── */
        .cursor--clicking .sparkle-glyph {
          transform: translate(-50%, -50%) scale(0.8) rotate(-15deg);
        }

        .cursor--clicking .orbit-glow-circle-wrap {
          transform: translate(-50%, -50%) scale(0.85);
        }
      `}</style>
    </>
  );
}
