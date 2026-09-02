/* ============================================================
   Footer.jsx — Portfolio Footer
   ============================================================
   Giant "archisha." branding with DESIGN × CODE × CREATE,
   social links, and a back-to-top button.
   
   BEGINNER TIP:
   - The footer is a simple semantic <footer> element
   - window.scrollTo() with smooth behavior scrolls to top
   - CSS Grid organizes the footer into columns
   ============================================================ */

import React from 'react';
import { socialLinks } from '../data/portfolioData.js';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        {/* Giant Brand */}
        <div className="footer__brand">
          <h2 className="footer__brand-text">archisha.</h2>
          <p className="footer__tagline">DESIGN × CODE × CREATE</p>
        </div>

        {/* Links */}
        <div className="footer__links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              {link.label.toUpperCase()} ↗
            </a>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__credit">Designed & built with curiosity.</p>
          <p className="footer__copyright">© 2026 ARCHISHA GUPTA</p>
          <button className="footer__top-btn" onClick={scrollToTop} aria-label="Back to top">
            ↑ BACK TO TOP
          </button>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--text-black);
          color: var(--bg-cream);
          padding: var(--space-3xl) var(--space-lg) var(--space-xl);
          margin-top: var(--space-3xl);
        }

        .footer__content {
          max-width: 1280px;
          margin: 0 auto;
        }

        .footer__brand {
          margin-bottom: var(--space-2xl);
        }

        .footer__brand-text {
          font-family: var(--font-display);
          font-size: clamp(3rem, 10vw, 8rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.04em;
        }

        .footer__tagline {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          margin-top: var(--space-md);
          opacity: 0.6;
        }

        .footer__links {
          display: flex;
          gap: var(--space-xl);
          margin-bottom: var(--space-2xl);
          padding-bottom: var(--space-xl);
          border-bottom: 1px solid rgba(245, 238, 228, 0.12);
        }

        .footer__link {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--bg-cream);
          opacity: 0.7;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .footer__link:hover {
          opacity: 1;
        }

        .footer__bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-md);
        }

        .footer__credit {
          font-size: 0.8rem;
          opacity: 0.5;
          font-style: italic;
        }

        .footer__copyright {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          opacity: 0.5;
        }

        .footer__top-btn {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 10px 20px;
          border: 1px solid rgba(245, 238, 228, 0.3);
          border-radius: var(--radius-full);
          color: var(--bg-cream);
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .footer__top-btn:hover {
          background: var(--bg-cream);
          color: var(--text-black);
        }

        @media (max-width: 768px) {
          .footer__links {
            flex-direction: column;
            gap: var(--space-md);
          }

          .footer__bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
