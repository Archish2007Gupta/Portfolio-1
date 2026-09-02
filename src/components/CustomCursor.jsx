/* ============================================================
   CustomCursor.jsx — Clean Orbit Dot & Little Spark Cursor
   ============================================================
   - Default State: Bold, smooth Orbit Dot (no outer circle ring)
   - Hover State: Crisp little sparkle (✦) on clickable elements
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
        // Spark triggers on links, pages, modals, certificates, and preview openers
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
          isHovered ? 'cursor--spark-mode' : 'cursor--orbit-mode'
        } ${isClicking ? 'cursor--clicking' : ''}`}
        aria-hidden="true"
      >
        {/* Central Core: Orbit Dot / Little Sparkle */}
        <div ref={dotRef} className="cursor-dot-anchor">
          {/* Orbit Dot (Bigger, Clean, No Outer Ring) */}
          <div className="orbit-core-dot" />

          {/* Little Sparkle (✦) */}
          <div className="little-spark-glyph">
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

        /* ── ORBIT DOT (Clean, Bigger Dot) ── */
        .orbit-core-dot {
          width: 13px;
          height: 13px;
          background: #11110F;
          border: 2px solid #FFFFFF;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
        }

        /* ── LITTLE SPARK (Hover Clickable State) ── */
        .little-spark-glyph {
          position: absolute;
          transform: translate(-50%, -50%) scale(0) rotate(-30deg);
          transition: transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
          opacity: 0;
          filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
        }

        /* State Transitions */
        .cursor--spark-mode .orbit-core-dot {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0);
        }

        .cursor--spark-mode .little-spark-glyph {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.15) rotate(0deg);
        }

        /* ── Click Feedback ── */
        .cursor--clicking .little-spark-glyph {
          transform: translate(-50%, -50%) scale(0.85) rotate(-15deg);
        }

        .cursor--clicking .orbit-core-dot {
          transform: translate(-50%, -50%) scale(1.3);
        }
      `}</style>
    </>
  );
}
