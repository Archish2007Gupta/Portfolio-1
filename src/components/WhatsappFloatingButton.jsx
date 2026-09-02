/* ============================================================
   WhatsappFloatingButton.jsx — Floating Quick Connect Assistant
   ============================================================ */

import React, { useState } from 'react';
import { profile } from '../data/portfolioData.js';

export default function WhatsappFloatingButton({ onOpenContact }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="floating-action-container">
      {/* Expanded Quick Connect Card */}
      {isOpen && (
        <div className="quick-connect-card brutal-card">
          <div className="card-header-banner" style={{ background: 'var(--color-green)' }}>
            <span>QUICK CONNECT</span>
            <button
              onClick={() => setIsOpen(false)}
              className="quick-card-close"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="quick-card-body">
            <p className="quick-card-intro">
              Have a question or looking to collaborate? Reach out instantly:
            </p>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenContact();
              }}
              className="quick-menu-btn quick-menu-btn--primary clay-card"
            >
              <span>💬 OPEN CONTACT DRAWER</span>
            </button>

            <a
              href={`mailto:${profile.email}`}
              className="quick-menu-btn clay-card"
            >
              <span>✉️ SEND DIRECT EMAIL</span>
            </a>

            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="quick-menu-btn clay-card"
            >
              <span>💼 CONNECT ON LINKEDIN</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="floating-trigger-btn clay-card"
        aria-label="Quick Connect"
      >
        <span className="floating-pulse-dot" />
        <span className="floating-icon">{isOpen ? '✕' : '💬'}</span>
      </button>

      <style>{`
        .floating-action-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1450;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .floating-trigger-btn {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--color-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .floating-trigger-btn:hover {
          transform: scale(1.1);
        }

        .floating-pulse-dot {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--color-yellow);
          border: 2px solid #000000;
          animation: pulseRing 1.8s infinite;
        }

        .floating-icon {
          font-size: 22px;
        }

        /* Expanded Card */
        .quick-connect-card {
          width: 290px;
          background: #FFFFFF;
          overflow: hidden;
          animation: popIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .quick-card-close {
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 900;
        }

        .quick-card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .quick-card-intro {
          font-size: 0.8rem;
          color: var(--text-gray);
          line-height: 1.4;
        }

        .quick-menu-btn {
          padding: 10px 14px;
          border-radius: 12px;
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 800;
          text-align: left;
          background: rgba(244, 233, 225, 0.8);
          color: var(--text-ink);
          display: flex;
          align-items: center;
          gap: 6px;
          transition: transform 0.15s ease;
        }

        .quick-menu-btn:hover {
          transform: translateX(3px);
          background: #FFFFFF;
        }

        .quick-menu-btn--primary {
          background: var(--text-ink);
          color: var(--color-yellow);
        }

        .quick-menu-btn--primary:hover {
          background: var(--color-blue);
          color: #FFFFFF;
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
