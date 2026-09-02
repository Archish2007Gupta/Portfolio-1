/* ============================================================
   Navbar.jsx — Exact NIRMAAN Clay Navigation Sidebar
   ============================================================
   Exact replication of NIRMAAN's CSS & layout:
   - Background: Transparent paper backdrop blur `rgba(244, 233, 225, 0.3)`
   - Cards: NIRMAAN `clay-card` with white inner border `2px solid rgba(255,255,255,0.4)`
     and dual shadow `0 4px 8px -1px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.45)`
   - Hover: `scale(1.02)`
   - 7 Archisha portfolio section names
   ============================================================ */

import React, { useState, useEffect } from 'react';
import { socialLinks } from '../data/portfolioData.js';

const SIDE_NAV_ITEMS = [
  { id: 'about', num: '01', title: 'Overview', bg: '#0072E3', textColor: '#FFFFFF' },
  { id: 'work', num: '02', title: 'Skills', bg: '#FFB200', textColor: '#11110F' },
  { id: 'projects', num: '03', title: 'Selected Work', bg: '#FF6100', textColor: '#FFFFFF' },
  { id: 'experience', num: '04', title: 'Experience', bg: '#EF333A', textColor: '#FFFFFF' },
  { id: 'designs', num: '05', title: 'Design', bg: '#00AA3C', textColor: '#11110F' },
  { id: 'experiments', num: '06', title: 'Bug Game', bg: '#22C55E', textColor: '#11110F' },
  { id: 'contact', num: '07', title: 'Contact', bg: '#AB54F7', textColor: '#FFFFFF' },
];

export default function Navbar() {
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
      for (const item of SIDE_NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 120) {
            setActiveId(item.id);
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
          {isOpen ? '✕' : '☰ MENU'}
        </button>
      )}

      {/* ── Left Side Navigation Sidebar ── */}
      <aside className={`sidenav ${isOpen ? 'sidenav--open' : 'sidenav--closed'}`}>
        <div className="sidenav-inner">
          
          {/* Top Brand Logo */}
          <div className="sidenav-brand" onClick={() => scrollTo('hero')}>
            <span className="sidenav-brand__text">archisha</span>
            <span className="sidenav-brand__dot">.</span>
          </div>

          {/* 7 Clay Nav Cards */}
          <nav className="sidenav-cards">
            {SIDE_NAV_ITEMS.map((item) => {
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
            <button className="clay-card sidenav-badge" onClick={() => scrollTo('hero')}>
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
                  {link.icon === 'github' && '🐙'}
                  {link.icon === 'linkedin' && 'in'}
                  {link.icon === 'mail' && '✉'}
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
          width: 165px;
          z-index: 1000;
          background: rgba(244, 233, 225, 0.35);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 10px 8px;
          overflow-y: auto;
          scrollbar-width: none;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sidenav::-webkit-scrollbar {
          display: none;
        }

        @media (min-width: 1280px) {
          .sidenav {
            width: 180px;
          }
        }

        .sidenav-inner {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          min-height: 520px;
        }

        /* Brand Logo */
        .sidenav-brand {
          display: flex;
          align-items: baseline;
          cursor: pointer;
          padding: 0 4px 4px 4px;
        }

        .sidenav-brand__text {
          font-family: var(--font-hero);
          font-size: 26px;
          font-weight: 900;
          color: #11110F;
          letter-spacing: -0.05em;
          line-height: 1;
        }

        @media (min-width: 1280px) {
          .sidenav-brand__text {
            font-size: 30px;
          }
        }

        .sidenav-brand__dot {
          font-family: var(--font-hero);
          font-size: 26px;
          font-weight: 900;
          color: #22C55E;
          line-height: 1;
        }

        @media (min-width: 1280px) {
          .sidenav-brand__dot {
            font-size: 30px;
          }
        }

        /* Cards Stack */
        .sidenav-cards {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: 6px 0;
          justify-content: space-between;
        }

        /* Exact NIRMAAN Clay Card Styling */
        .clay-card.sidenav-card {
          width: 100%;
          min-height: 42px;
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: left;
          box-shadow: 0 4px 8px -1px rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.45);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        @media (min-width: 1280px) {
          .clay-card.sidenav-card {
            min-height: 46px;
            padding: 10px 12px;
          }
        }

        .clay-card.sidenav-card:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 14px -1px rgba(0, 0, 0, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.6);
        }

        .clay-card.sidenav-card--active {
          transform: scale(1.02);
          box-shadow: 0 0 0 2px #8B5CF6, 0 6px 14px -1px rgba(0, 0, 0, 0.18);
        }

        .sidenav-card__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .sidenav-card__num {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 400;
          opacity: 0.75;
          line-height: 1;
        }

        @media (min-width: 1280px) {
          .sidenav-card__num {
            font-size: 11px;
          }
        }

        .sidenav-card__arrow {
          opacity: 0.8;
          transition: transform 0.2s ease;
        }

        .sidenav-card:hover .sidenav-card__arrow {
          transform: translate(2px, -2px);
        }

        .sidenav-card__title {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
          padding-top: 6px;
          border-top: 1px solid rgba(17, 17, 15, 0.1);
        }

        .clay-card.sidenav-badge {
          background: #F4E9E1;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 10px;
          padding: 5px;
          text-align: center;
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(17, 17, 15, 0.7);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .clay-card.sidenav-badge:hover {
          transform: scale(1.02);
        }

        .sidenav-socials {
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .clay-card.sidenav-social-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #11110F;
          color: #FFFFFF;
          border: 1px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          transition: transform 0.15s ease, background 0.15s ease;
        }

        .clay-card.sidenav-social-btn:hover {
          background: #EF333A;
          transform: scale(1.1);
        }

        .sidenav-toggle-btn {
          position: fixed;
          top: 12px;
          left: 12px;
          z-index: 1100;
          background: #11110F;
          color: #FFB200;
          border: none;
          border-radius: 999px;
          padding: 6px 14px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 800;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        @media (min-width: 1025px) {
          body {
            padding-left: 170px;
          }
        }
        @media (min-width: 1280px) {
          body {
            padding-left: 185px;
          }
        }

        @media (max-width: 1024px) {
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
