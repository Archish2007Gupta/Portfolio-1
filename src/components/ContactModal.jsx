/* ============================================================
   ContactModal.jsx — Nirmaan 2026 Interactive "Let's Talk" Drawer Modal
   ============================================================ */

import React, { useState } from 'react';
import { profile } from '../data/portfolioData.js';
import { CloseIcon } from './Icons.jsx';

export default function ContactModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Software / Frontend',
    message: '',
  });

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          role: formData.role,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Unable to send your message right now. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect right now. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError('');
    setFormData({ name: '', email: '', role: 'Software / Frontend', message: '' });
    onClose();
  };

  return (
    <div className="dialog-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="dialog-content text-ink" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn clay-card"
          aria-label="Close dialog"
        >
          <CloseIcon size={16} />
        </button>

        {/* Header */}
        <div className="modal-header-block">
          <div className="modal-icon-badge clay-card">✦</div>
          <div>
            <h2 className="modal-headline">LET'S TALK // ARCHISHA</h2>
            <p className="modal-subtitle">
              Open for SWE/UI/UX roles, hackathons, and creative technology projects.
            </p>
          </div>
        </div>

        {/* Quick Contact Links Bar */}
        <div className="modal-links-bar clay-card">
          <div>
            <p className="quick-label">DIRECT EMAIL INBOX</p>
            <p className="quick-val">{profile.email}</p>
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="quick-action-btn clay-card"
          >
            MAIL ↗
          </a>
        </div>

        {submitted ? (
          <div className="modal-success-box clay-card">
            <h3 className="success-title">⚡ QUEST DISPATCHED!</h3>
            <p className="success-desc">
              Thank you for reaching out! Your message has been logged. I will reply to <strong>{formData.email}</strong> shortly.
            </p>
            <button onClick={handleReset} className="success-done-btn clay-card">
              BACK TO PORTFOLIO
            </button>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            {error && (
              <div className="modal-error-box" role="alert">
                <span>⚠️ {error}</span>
              </div>
            )}

            <div className="form-grid-two">
              <label className="field">
                <span>Your Name / Handle</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Chen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={loading}
                />
              </label>

              <label className="field">
                <span>Email Address</span>
                <input
                  type="email"
                  required
                  placeholder="e.g. builder@tech.org"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={loading}
                />
              </label>
            </div>

            <label className="field">
              <span>Collaboration Type / Domain</span>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                disabled={loading}
              >
                <option>Software / Frontend Engineering</option>
                <option>UI/UX &amp; Design Systems</option>
                <option>IoT &amp; Embedded Systems</option>
                <option>Hackathon Sprint Teammate</option>
                <option>General Inquiries &amp; Coffee Chat</option>
              </select>
            </label>

            <label className="field">
              <span>Project Brief &amp; Notes</span>
              <textarea
                rows={3}
                required
                placeholder="Tell me about your project, timeline, or idea..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                disabled={loading}
              />
            </label>

            <button
              type="submit"
              className="modal-submit-btn clay-card"
              disabled={loading}
              style={{ opacity: loading ? 0.75 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'SENDING MESSAGE...' : 'SEND MESSAGE ↗'}
            </button>
          </form>
        )}

      </div>

      <style>{`
        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--text-ink);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 900;
        }

        .modal-close-btn:hover {
          background: var(--color-red);
        }

        .modal-header-block {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          padding-right: 40px;
        }

        .modal-icon-badge {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: var(--color-yellow);
          color: var(--text-ink);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 900;
          flex-shrink: 0;
        }

        .modal-headline {
          font-size: 1.45rem;
          line-height: 1.1;
          color: var(--text-ink);
        }

        .modal-subtitle {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-gray);
          margin-top: 4px;
        }

        .modal-links-bar {
          background: rgba(171, 84, 247, 0.12);
          border: 1.5px solid rgba(171, 84, 247, 0.3);
          border-radius: 16px;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
        }

        .quick-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--color-purple);
          letter-spacing: 0.08em;
        }

        .quick-val {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-ink);
        }

        .quick-action-btn {
          background: var(--color-purple);
          color: #FFFFFF;
          padding: 6px 14px;
          border-radius: var(--radius-pill);
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 900;
        }

        .modal-error-box {
          background: rgba(239, 51, 58, 0.12);
          border: 1.5px solid var(--color-red);
          border-radius: 12px;
          padding: 10px 14px;
          color: var(--color-red);
          font-size: 0.82rem;
          font-weight: 700;
          font-family: var(--font-mono);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-grid-two {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 600px) {
          .form-grid-two {
            grid-template-columns: 1fr 1fr;
          }
        }

        .modal-submit-btn {
          background: var(--color-yellow);
          color: var(--text-ink);
          padding: 16px 28px;
          border-radius: var(--radius-pill);
          font-family: var(--font-display);
          font-size: 0.92rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          text-align: center;
          margin-top: 8px;
          transition: transform 0.2s ease;
        }

        .modal-submit-btn:hover {
          background: var(--color-green);
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        /* Success Card */
        .modal-success-box {
          background: rgba(27, 227, 73, 0.2);
          border: 2px solid var(--color-green);
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .success-title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          color: var(--text-ink);
        }

        .success-desc {
          font-size: 0.95rem;
          color: var(--text-gray);
          line-height: 1.5;
        }

        .success-done-btn {
          background: var(--text-ink);
          color: #FFFFFF;
          padding: 10px 24px;
          border-radius: var(--radius-pill);
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 900;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}
