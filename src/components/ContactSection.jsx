/* ============================================================
   ContactSection.jsx — Contact & Resume Action
   ============================================================ */

import React, { useState } from 'react';
import { socialLinks } from '../data/portfolioData.js';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:archishagupta4907@gmail.com?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`;
    window.open(mailtoLink);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('archishagupta4907@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section" id="contact">
      <div className="nirmaan-section-title">
        <span className="badge">08</span>
        <h2>CONTACT</h2>
      </div>

      <div className="ct-grid">
        {/* Left Side Info */}
        <div className="ct-left">
          <h3 className="ct-heading">
            HAVE AN IDEA?
            <br />
            <span style={{ color: 'var(--nirmaan-blue)' }}>LET’S BUILD SOMETHING.</span>
          </h3>
          <p className="ct-body">
            Open to building, collaborating, experimenting and making things that sit somewhere between code and design.
          </p>

          {/* Email with copy */}
          <div className="ct-email-box">
            <span className="ct-email">archishagupta4907@gmail.com</span>
            <button className="ct-copy-btn" onClick={copyEmail}>
              {copied ? 'COPIED ✓' : 'COPY EMAIL'}
            </button>
          </div>

          {/* Action Links */}
          <div className="ct-actions">
            <a
              href="https://www.linkedin.com/in/archisha-gupta-4a6266385/"
              target="_blank"
              rel="noopener noreferrer"
              className="nirmaan-card ct-action-card"
            >
              <span className="ct-action-label">LINKEDIN</span>
              <span className="ct-action-arrow">↗</span>
            </a>

            <a
              href="https://github.com/Archish2007Gupta"
              target="_blank"
              rel="noopener noreferrer"
              className="nirmaan-card ct-action-card"
            >
              <span className="ct-action-label">GITHUB</span>
              <span className="ct-action-arrow">↗</span>
            </a>

            <a
              href="mailto:archishagupta4907@gmail.com"
              className="nirmaan-card ct-action-card"
            >
              <span className="ct-action-label">EMAIL</span>
              <span className="ct-action-arrow">↗</span>
            </a>

            <button
              onClick={copyEmail}
              className="nirmaan-card ct-action-card ct-action-card--highlight"
            >
              <span className="ct-action-label">VIEW RESUME</span>
              <span className="ct-action-arrow">↗</span>
            </button>
          </div>
        </div>

        {/* Right Side Contact Form */}
        <form className="nirmaan-card ct-form" onSubmit={handleSubmit}>
          <div className="card-header-banner" style={{ background: 'var(--nirmaan-purple)' }}>
            <span>SEND A MESSAGE</span>
            <span>✦ DIRECT INBOX</span>
          </div>

          <div className="ct-form-body">
            <div className="ct-field">
              <label className="meta-label" htmlFor="contact-name">YOUR NAME</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="ct-input"
                placeholder="e.g. Alex Smith"
              />
            </div>

            <div className="ct-field">
              <label className="meta-label" htmlFor="contact-email">YOUR EMAIL</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="ct-input"
                placeholder="alex@example.com"
              />
            </div>

            <div className="ct-field">
              <label className="meta-label" htmlFor="contact-message">MESSAGE</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className="ct-input ct-textarea"
                placeholder="Tell me about your project, idea, or role..."
                rows={4}
              />
            </div>

            <button type="submit" className="ct-submit-btn">
              {submitted ? 'MESSAGE SENT ✓' : 'SEND MESSAGE ↗'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        .ct-heading {
          font-family: var(--font-hero);
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
        }

        .ct-body {
          font-size: 1rem;
          color: var(--text-gray);
          line-height: 1.6;
          margin-bottom: 24px;
          max-width: 440px;
        }

        .ct-email-box {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .ct-email {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-black);
        }

        .ct-copy-btn {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 6px 14px;
          border: var(--border-medium);
          border-radius: var(--radius-pill);
          background: var(--nirmaan-yellow);
          box-shadow: 2px 2px 0px #11110F;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ct-copy-btn:hover {
          background: var(--nirmaan-blue);
          color: white;
          transform: translate(-2px, -2px);
          box-shadow: 3px 3px 0px #11110F;
        }

        .ct-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .ct-action-card {
          padding: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-decoration: none;
          color: inherit;
          background: var(--bg-white);
          cursor: pointer;
        }

        .ct-action-card--highlight {
          background: var(--nirmaan-yellow);
        }

        .ct-action-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .ct-action-arrow {
          font-size: 0.9rem;
          font-weight: 800;
        }

        .ct-form {
          overflow: hidden;
        }

        .ct-form-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ct-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ct-input {
          font-family: var(--font-body);
          font-size: 0.9rem;
          padding: 12px 14px;
          border: var(--border-medium);
          border-radius: var(--radius-sm);
          background: var(--bg-cream);
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .ct-input:focus {
          border-color: var(--nirmaan-blue);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
        }

        .ct-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .ct-submit-btn {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          padding: 14px 28px;
          background: var(--text-black);
          color: var(--nirmaan-yellow);
          border: var(--border-medium);
          border-radius: var(--radius-pill);
          box-shadow: var(--shadow-tactile);
          cursor: pointer;
          transition: all 0.2s ease;
          align-self: flex-start;
        }

        .ct-submit-btn:hover {
          background: var(--nirmaan-blue);
          color: white;
          transform: translate(-2px, -2px);
          box-shadow: var(--shadow-hover);
        }

        @media (max-width: 768px) {
          .ct-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
