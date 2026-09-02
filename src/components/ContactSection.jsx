/* ============================================================
   ContactSection.jsx — Nirmaan 2026 FAQs & Contact Section
   ============================================================ */

import React, { useState } from 'react';
import { faqs, socialLinks, profile } from '../data/portfolioData.js';

export default function ContactSection({ onOpenContact }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section className="nirmaan-section" id="contact">
      
      {/* Section Header */}
      <div className="nirmaan-section-title">
        <span className="badge">06</span>
        <h2>FAQ & CONTACT CHANNELS</h2>
      </div>

      <div className="contact-main-grid">
        
        {/* Left Column: FAQ Accordion */}
        <div className="faq-pane">
          <h3 className="pane-heading">FREQUENTLY ASKED QUESTIONS</h3>
          
          <div className="faq-accordion-stack">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div key={idx} className="brutal-card faq-card">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="faq-question-btn"
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-toggle-symbol">{isOpen ? '−' : '+'}</span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-panel">
                      <p className="faq-answer-text">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Direct Contact & Social Cards */}
        <div className="direct-contact-pane">
          <h3 className="pane-heading">INITIATE COLLABORATION</h3>
          
          <div className="brutal-card contact-box-card">
            <div className="card-header-banner" style={{ background: 'var(--color-yellow)', color: '#000' }}>
              <span>DIRECT CHANNELS</span>
              <span className="pulse-dot" />
            </div>

            <div className="contact-box-body">
              <h4 className="contact-box-title">
                Let&apos;s build something extraordinary together.
              </h4>
              <p className="contact-box-sub">
                Whether you have an ambitious hackathon idea, an open internship role, or want to discuss design systems, I&apos;m always excited to connect.
              </p>

              <button onClick={onOpenContact} className="contact-primary-trigger clay-card">
                <span>OPEN CONTACT DRAWER ↗</span>
              </button>

              <div className="contact-links-list">
                <a
                  href={`mailto:${profile.email}`}
                  className="contact-link-item clay-card"
                >
                  <span className="link-icon">✉️</span>
                  <div>
                    <span className="link-label">EMAIL</span>
                    <p className="link-detail">{profile.email}</p>
                  </div>
                </a>

                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item clay-card"
                >
                  <span className="link-icon">💼</span>
                  <div>
                    <span className="link-label">LINKEDIN</span>
                    <p className="link-detail">archisha-gupta</p>
                  </div>
                </a>

                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item clay-card"
                >
                  <span className="link-icon">🐙</span>
                  <div>
                    <span className="link-label">GITHUB</span>
                    <p className="link-detail">Archish2007Gupta</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
        }

        @media (min-width: 1025px) {
          .contact-main-grid {
            grid-template-columns: 1.15fr 0.85fr;
            gap: 40px;
          }
        }

        .pane-heading {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          margin-bottom: 20px;
        }

        /* FAQ Accordion */
        .faq-accordion-stack {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .faq-card {
          overflow: hidden;
          background: #FFFFFF;
        }

        .faq-question-btn {
          width: 100%;
          padding: 18px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          gap: 12px;
        }

        .faq-question-text {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 900;
          color: var(--text-ink);
          line-height: 1.25;
        }

        .faq-toggle-symbol {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 900;
          color: var(--color-blue);
          line-height: 1;
        }

        .faq-answer-panel {
          padding: 0 22px 20px;
          border-top: 1px dashed rgba(0, 0, 0, 0.08);
          padding-top: 14px;
        }

        .faq-answer-text {
          font-size: 0.94rem;
          line-height: 1.55;
          color: var(--text-gray);
        }

        /* Direct Contact Box */
        .contact-box-card {
          overflow: hidden;
        }

        .contact-box-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-box-title {
          font-size: 1.35rem;
          line-height: 1.15;
          color: var(--text-ink);
        }

        .contact-box-sub {
          font-size: 0.92rem;
          line-height: 1.5;
          color: var(--text-gray);
        }

        .contact-primary-trigger {
          background: var(--text-ink);
          color: var(--color-yellow);
          padding: 14px 24px;
          border-radius: var(--radius-pill);
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          text-align: center;
          margin: 6px 0;
          transition: all 0.2s ease;
        }

        .contact-primary-trigger:hover {
          background: var(--color-blue);
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        .contact-links-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 6px;
        }

        .contact-link-item {
          background: rgba(244, 233, 225, 0.7);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 14px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: transform 0.2s ease;
        }

        .contact-link-item:hover {
          transform: translateX(4px);
          background: #FFFFFF;
        }

        .link-icon {
          font-size: 1.3rem;
        }

        .link-label {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .link-detail {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-ink);
        }
      `}</style>
    </section>
  );
}
