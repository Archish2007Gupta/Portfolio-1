/* ============================================================
   Footer.jsx — Neo-Brutalist Grid Footer Component
   ============================================================ */

import React from 'react';
import { profile } from '../data/portfolioData.js';
import useResume from '../hooks/useResume.js';

export default function Footer({ onOpenContact }) {
  const resume = useResume();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'Selected Work', href: '#projects' },
    { label: 'Disciplines', href: '#disciplines' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'GitHub Radar', href: '#github' },
    { label: 'Design Archive', href: '#archive' },
    { label: 'Get in Touch', href: '#contact' },
  ];

  const socialLinks = [
    { label: 'GitHub ↗', href: profile.githubUrl },
    { label: 'LinkedIn ↗', href: profile.linkedinUrl },
    { label: 'Email Direct ↗', href: `mailto:${profile.email}` },
  ];

  return (
    <footer className="portfolio-footer">
      {/* Top Graphic Accent Bar */}
      <div className="footer-accent-strip">
        <span style={{ background: '#EF333A' }} />
        <span style={{ background: '#FFB200' }} />
        <span style={{ background: '#00AA3C' }} />
        <span style={{ background: '#0072E3' }} />
        <span style={{ background: '#AB54F7' }} />
        <span style={{ background: '#FF6100' }} />
      </div>

      <div className="footer-main-wrap">
        {/* Massive Call-to-Action Masthead */}
        <div className="footer-masthead">
          <div className="footer-masthead__left">
            <span className="footer-status-pill">● READY FOR IMPACT 2026</span>
            <h2 className="footer-huge-title">
              LET&apos;S BUILD<br />
              <span className="footer-huge-title__accent">SOMETHING</span><br />
              MEMORABLE.
            </h2>
          </div>

          <div className="footer-masthead__right">
            <p className="footer-manifesto">
              Available for high-stakes engineering hackathons, innovative open-source collaborations,
              and design-forward digital applications. Let&apos;s engineer reality together.
            </p>
            <button onClick={onOpenContact} className="footer-outline-pill footer-outline-pill--highlight">
              Initiate Contact ↗
            </button>
            {resume.available && (
              <>
                <a
                  href={resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-outline-pill footer-outline-pill--purple"
                  id="footer-view-cv-btn"
                  title="View Resume (PDF)"
                >
                  View CV ↗
                </a>
                <a
                  href={resume.downloadUrl || '/api/resume/download'}
                  className="footer-outline-pill footer-outline-pill--blue"
                  id="footer-download-cv-btn"
                  title="Download Resume (PDF)"
                  download="Archisha_Gupta_Resume.pdf"
                >
                  Download CV ↓
                </a>
              </>
            )}
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-outline-pill"
            >
              Star on GitHub ★
            </a>
          </div>
        </div>

        {/* Multi-Column Grid Links */}
        <div className="footer-columns-grid">
          {/* Col 1: Brand & Identity */}
          <div className="footer-col footer-col--brand">
            <div className="footer-brand-logo">
              <span className="footer-brand-logo__initials">AG</span>
              <span className="footer-brand-logo__name">ARCHISHA GUPTA</span>
            </div>
            <p className="footer-col__bio">
              B.Tech Computer Science &amp; Engineering &apos;29.<br />
              BMS Institute of Technology &amp; Management, Bengaluru.<br />
              Creative Technologist &amp; Full-Stack Builder.
            </p>
            <div className="footer-edition-stamp">
              <span>EXHIBITION ARCHIVE &apos;26</span>
            </div>
          </div>

          {/* Col 2: Navigation Index */}
          <div className="footer-col">
            <h4 className="footer-col__heading">INDEX NAVIGATION</h4>
            <ul className="footer-links-list">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="footer-nav-link">
                    <span className="footer-nav-link__num">0{idx + 1}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Presence & Network */}
          <div className="footer-col">
            <h4 className="footer-col__heading">EXTERNAL RADAR</h4>
            <ul className="footer-links-list">
              {socialLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-nav-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Systems Spec */}
          <div className="footer-col footer-col--spec">
            <h4 className="footer-col__heading">SPECIFICATIONS</h4>
            <div className="footer-spec-box">
              <div className="footer-spec-row">
                <span>ENGINE:</span>
                <strong>REACT + VITE</strong>
              </div>
              <div className="footer-spec-row">
                <span>DESIGN:</span>
                <strong>NIRMAAN 2026 BRUTALISM</strong>
              </div>
              <div className="footer-spec-row">
                <span>GRID:</span>
                <strong>4PX KINETIC</strong>
              </div>
              <div className="footer-spec-row">
                <span>LOCATION:</span>
                <strong>BENGALURU, INDIA</strong>
              </div>
            </div>

            <button onClick={scrollToTop} className="footer-back-to-top">
              BACK TO TOP ↑
            </button>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="footer-colophon-bar">
          <div className="footer-colophon-bar__copy">
            © 2026 ARCHISHA GUPTA. ALL RIGHTS RESERVED. CRAFTED WITH OBSESSIVE RIGOR.
          </div>
          <div className="footer-colophon-bar__coords">
            13.0827° N, 77.5877° E — BENGALURU
          </div>
        </div>
      </div>

      <style>{`
        .portfolio-footer {
          position: relative;
          background: #000000;
          color: #FFFFFF;
          border-top: 4px solid #000000;
          width: 100%;
          overflow: hidden;
        }

        /* Accent Strip */
        .footer-accent-strip {
          display: flex;
          height: 8px;
          width: 100%;
        }

        .footer-accent-strip span {
          flex: 1;
          height: 100%;
        }

        .footer-main-wrap {
          max-width: var(--max-content-width);
          margin: 0 auto;
          padding: 80px 32px 40px 32px;
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        /* Huge Masthead */
        .footer-masthead {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 40px;
          align-items: flex-end;
          padding-bottom: 60px;
          border-bottom: 2px solid #222220;
        }

        .footer-status-pill {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          background: #11110F;
          border: 1px solid #333330;
          color: var(--color-green);
          padding: 6px 14px;
          border-radius: var(--radius-pill);
          margin-bottom: 20px;
        }

        .footer-huge-title {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(3rem, 7.5vw, 6.5rem);
          line-height: 0.9;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: #FFFFFF;
          margin: 0;
        }

        .footer-huge-title__accent {
          color: var(--color-yellow);
          -webkit-text-stroke: 1px #000000;
        }

        .footer-masthead__right {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: flex-start;
        }

        .footer-manifesto {
          font-family: var(--font-body);
          font-size: 1.05rem;
          line-height: 1.5;
          color: #A3A39E;
          margin: 0;
        }

        .footer-outline-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: var(--radius-pill);
          border: 2px solid #FFFFFF;
          color: #FFFFFF;
          background: transparent;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .footer-outline-pill:hover {
          background: #FFFFFF;
          color: #000000;
          transform: translateY(-2px);
        }

        .footer-outline-pill--highlight {
          border-color: var(--color-orange);
          background: var(--color-orange);
          color: #FFFFFF;
        }

        .footer-outline-pill--purple {
          background: var(--color-purple);
          color: #FFFFFF;
          border-color: #000000;
        }

        .footer-outline-pill--purple:hover {
          background: #000000;
          color: var(--color-yellow);
        }

        .footer-outline-pill--blue {
          background: var(--color-blue);
          color: #FFFFFF;
          border-color: #000000;
        }

        .footer-outline-pill--blue:hover {
          background: #000000;
          color: #FFFFFF;
        }

        /* Multi-Column Grid */
        .footer-columns-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
          gap: 40px;
          padding-bottom: 40px;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-brand-logo__initials {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1.2rem;
          background: var(--color-red);
          color: #FFFFFF;
          padding: 6px 12px;
          border-radius: var(--radius-pill);
          border: 2px solid #FFFFFF;
        }

        .footer-brand-logo__name {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1.15rem;
          letter-spacing: 0.04em;
          color: #FFFFFF;
        }

        .footer-col__bio {
          font-family: var(--font-body);
          font-size: 0.85rem;
          line-height: 1.5;
          color: #888882;
          margin: 0;
        }

        .footer-edition-stamp {
          margin-top: 8px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--color-yellow);
        }

        .footer-col__heading {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #71716D;
          margin: 0;
          text-transform: uppercase;
        }

        .footer-links-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-nav-link {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 800;
          color: #D4D4D0;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: color 0.18s ease, transform 0.18s ease;
        }

        .footer-nav-link__num {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-green);
        }

        .footer-nav-link:hover {
          color: var(--color-yellow);
          transform: translateX(4px);
        }

        /* Spec Box */
        .footer-spec-box {
          background: #11110F;
          border: 1.5px solid #222220;
          border-radius: var(--radius-card);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-spec-row {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.72rem;
        }

        .footer-spec-row span {
          color: #71716D;
        }

        .footer-spec-row strong {
          color: #FFFFFF;
          font-weight: 700;
        }

        .footer-back-to-top {
          background: #FFFFFF;
          color: #000000;
          border: none;
          padding: 12px 16px;
          border-radius: var(--radius-pill);
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 0.82rem;
          cursor: pointer;
          letter-spacing: 0.06em;
          margin-top: 8px;
          transition: background 0.18s ease, transform 0.18s ease;
        }

        .footer-back-to-top:hover {
          background: var(--color-yellow);
          transform: translateY(-2px);
        }

        /* Colophon Bar */
        .footer-colophon-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          padding-top: 24px;
          border-top: 1px solid #1A1A18;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #61615D;
        }

        @media (max-width: 992px) {
          .footer-masthead {
            grid-template-columns: 1fr;
          }

          .footer-columns-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .footer-columns-grid {
            grid-template-columns: 1fr;
          }

          .footer-main-wrap {
            padding: 48px 16px 32px 16px;
          }
        }
      `}</style>
    </footer>
  );
}
