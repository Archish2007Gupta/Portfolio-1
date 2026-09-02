/* ============================================================
   Navbar.jsx — Exact NIRMAAN Clay Navigation Sidebar from Portfolio-1
   ============================================================ */

import React, { useState, useEffect } from 'react';
import { sideNavItems, socialLinks } from '../data/portfolioData.js';

export default function Navbar({ onOpenContact }) {
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (mobile) setIsOpen(false);
      else setIsOpen(true);
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sideNavItems.length - 1; i >= 0; i--) {
        const item = sideNavItems[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top - 120) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id) => {
    if (id === 'contact' && onOpenContact) {
      onOpenContact();
      if (isMobile) setIsOpen(false);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    if (isMobile) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          className="sidenav-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? '✕ CLOSE' : '☰ MENU'}
        </button>
      )}

      {/* ── Left Side Navigation Sidebar ── */}
      <aside className={`sidenav ${isOpen ? 'sidenav--open' : 'sidenav--closed'}`}>
        <div className="sidenav-inner">
          
          {/* Top Brand Logo (Links to Top / Start) */}
          <div 
            className="sidenav-brand" 
            onClick={() => scrollTo('hero')}
            title="Go to Start (Top)"
            role="button"
            tabIndex={0}
          >
            <span className="sidenav-brand__text">archisha</span>
            <span className="sidenav-brand__dot">.</span>
          </div>

          {/* Clay Nav Cards (01 to 07) */}
          <nav className="sidenav-cards">
            {sideNavItems.map((item) => {
              const isActive = activeId === item.id;

              return (
                <button
                  key={item.id}
                  className={`clay-card sidenav-card ${isActive ? 'sidenav-card--active' : ''}`}
                  style={{
                    backgroundColor: item.bg,
                    color: item.textColor,
                  }}
                  onClick={() => scrollTo(item.id)}
                >
                  <div className="sidenav-card__top">
                    <span className="sidenav-card__num">{item.num}</span>
                    <svg className="sidenav-card__arrow" width="12" height="12" viewBox="0 0 18 18" fill="none">
                      <path d="M11.25 4.5H4.5V2.8h9.65v9.65h-1.7V5.7L4.95 13.2l-1.2-1.2 7.5-7.5Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="sidenav-card__title">{item.title}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="sidenav-bottom">
            <button
              className="clay-card sidenav-badge"
              onClick={() => (onOpenContact ? onOpenContact() : scrollTo('contact'))}
            >
              ARCHISHA 2026
            </button>

            <div className="sidenav-socials">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-card sidenav-social-btn"
                  aria-label={link.label}
                >
                  {link.icon === 'github' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  )}
                  {link.icon === 'linkedin' && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  )}
                  {link.icon === 'mail' && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

        </div>
      </aside>

      {/* Scoped CSS for exact NIRMAAN clay navbar */}
      <style>{`
        /* Sidebar container fixed on left */
        .sidenav {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          height: 100dvh;
          width: 168px;
          z-index: 1000;
          background: rgba(244, 233, 225, 0.35);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 10px 8px 12px 8px;
          overflow-y: auto;
          scrollbar-width: none;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sidenav::-webkit-scrollbar {
          display: none;
        }

        @media (min-width: 1280px) {
          .sidenav {
            width: 182px;
            padding: 12px 10px 14px 10px;
          }
        }

        .sidenav-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 540px;
        }

        /* Brand Logo */
        .sidenav-brand {
          display: flex;
          align-items: baseline;
          cursor: pointer;
          padding: 2px 4px 6px 4px;
          user-select: none;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .sidenav-brand:hover {
          transform: scale(1.04);
        }

        .sidenav-brand__text {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 900;
          color: #11110F;
          letter-spacing: -0.05em;
          line-height: 1;
        }

        @media (min-width: 1280px) {
          .sidenav-brand__text {
            font-size: 28px;
          }
        }

        .sidenav-brand__dot {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 900;
          color: #22C55E;
          line-height: 1;
        }

        @media (min-width: 1280px) {
          .sidenav-brand__dot {
            font-size: 28px;
          }
        }

        /* Cards Stack - fits all 7 cards comfortably */
        .sidenav-cards {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: 4px 0 6px 0;
          min-height: 0;
        }

        @media (min-width: 1280px) {
          .sidenav-cards {
            gap: 7px;
            margin: 6px 0 8px 0;
          }
        }

        /* Exact NIRMAAN Clay Card Styling */
        .clay-card.sidenav-card {
          width: 100%;
          flex: 1 1 0;
          min-height: 46px;
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.45);
          padding: 7px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: left;
          box-shadow: 0 3px 6px -1px rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.45);
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (min-width: 1280px) {
          .clay-card.sidenav-card {
            min-height: 50px;
            border-radius: 13px;
            padding: 8px 12px;
          }
        }

        .clay-card.sidenav-card:hover {
          transform: scale(1.025);
          box-shadow: 0 6px 14px -1px rgba(0, 0, 0, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.6);
        }

        .clay-card.sidenav-card--active {
          transform: scale(1.025);
          box-shadow: 0 0 0 2px #11110F, 0 6px 14px -1px rgba(0, 0, 0, 0.2);
        }

        .sidenav-card__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          line-height: 1;
        }

        .sidenav-card__num {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 600;
          opacity: 0.85;
          line-height: 1;
        }

        @media (min-width: 1280px) {
          .sidenav-card__num {
            font-size: 11.5px;
          }
        }

        .sidenav-card__arrow {
          opacity: 0.85;
          transition: transform 0.2s ease;
        }

        .sidenav-card:hover .sidenav-card__arrow {
          transform: translate(1px, -1px);
        }

        .sidenav-card__title {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        @media (min-width: 1280px) {
          .sidenav-card__title {
            font-size: 13px;
          }
        }

        /* Bottom Section */
        .sidenav-bottom {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: auto;
          flex-shrink: 0;
        }

        /* Badge button at bottom */
        .clay-card.sidenav-badge {
          width: 100%;
          background: #11110F;
          color: #FFFFFF;
          border-radius: 9999px;
          border: 2px solid rgba(255, 255, 255, 0.35);
          padding: 7px 10px;
          font-family: var(--font-display);
          font-size: 10.5px;
          font-weight: 900;
          letter-spacing: 0.04em;
          cursor: pointer;
          box-shadow: 0 4px 8px -1px rgba(0, 0, 0, 0.16);
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .clay-card.sidenav-badge:hover {
          transform: translateY(-1px);
          background: var(--color-blue);
        }

        /* Circular Social Buttons */
        .sidenav-socials {
          display: flex;
          justify-content: space-between;
          gap: 5px;
        }

        .clay-card.sidenav-social-btn {
          flex: 1;
          height: 32px;
          border-radius: 9999px;
          background: #FFFFFF;
          color: #11110F;
          border: 1.5px solid rgba(0, 0, 0, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
          text-decoration: none;
        }

        .clay-card.sidenav-social-btn:hover {
          transform: translateY(-2px);
          background: var(--color-yellow);
          color: #11110F;
        }

        /* Mobile Toggle Button */
        .sidenav-toggle-btn {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 1001;
          background: #11110F;
          color: #FFFFFF;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 9999px;
          padding: 8px 16px;
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.04em;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        /* Mobile Drawer State */
        @media (max-width: 1024px) {
          .sidenav {
            width: 200px;
            background: rgba(244, 233, 225, 0.95);
            box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
          }

          .sidenav--closed {
            transform: translateX(-100%);
          }

          .sidenav--open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
