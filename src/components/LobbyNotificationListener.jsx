/* ============================================================
   LobbyNotificationListener.jsx — Real-Time Activity Toast Simulator
   ============================================================ */

import React, { useState, useEffect } from 'react';

const SAMPLE_NOTIFICATIONS = [
  { icon: '⚡', title: 'Live Visitor', desc: 'Builder exploring Selected Work & Prototypes' },
  { icon: '🚀', title: 'GitHub Radar', desc: 'New commit pushed to SparkHabit repo' },
  { icon: '🎨', title: 'Coding Club BMSIT', desc: 'Design system asset reviewed & updated' },
  { icon: '📡', title: 'EchoNex Telemetry', desc: 'ESP32 sensor cloud synchronization active' },
  { icon: '✨', title: 'Design Archive', desc: 'New UI mockup added to visual gallery' },
];

export default function LobbyNotificationListener() {
  const [currentNotification, setCurrentNotification] = useState(null);

  useEffect(() => {
    // Show first notification after 4 seconds
    const initialTimer = setTimeout(() => {
      showRandomNotification();
    }, 4000);

    // Periodic notifications
    const interval = setInterval(() => {
      showRandomNotification();
    }, 18000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const showRandomNotification = () => {
    const randomItem =
      SAMPLE_NOTIFICATIONS[Math.floor(Math.random() * SAMPLE_NOTIFICATIONS.length)];
    setCurrentNotification(randomItem);

    // Auto dismiss after 5.5s
    setTimeout(() => {
      setCurrentNotification(null);
    }, 5500);
  };

  if (!currentNotification) return null;

  return (
    <div className="lobby-toast-container">
      <div className="lobby-toast-card clay-card">
        <span className="toast-icon">{currentNotification.icon}</span>
        <div className="toast-text-wrap">
          <div className="toast-header-row">
            <span className="toast-title">{currentNotification.title}</span>
            <span className="pulse-dot" />
          </div>
          <p className="toast-desc">{currentNotification.desc}</p>
        </div>
        <button
          onClick={() => setCurrentNotification(null)}
          className="toast-dismiss-btn"
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      </div>

      <style>{`
        .lobby-toast-container {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 1400;
          animation: slideInToast 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (min-width: 1025px) {
          .lobby-toast-container {
            left: 200px;
          }
        }

        .lobby-toast-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 18px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: 340px;
          border: 2px solid rgba(0, 0, 0, 0.15);
        }

        .toast-icon {
          font-size: 1.4rem;
        }

        .toast-text-wrap {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .toast-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .toast-title {
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 900;
          color: var(--text-ink);
        }

        .toast-desc {
          font-size: 0.75rem;
          color: var(--text-gray);
          line-height: 1.35;
        }

        .toast-dismiss-btn {
          font-size: 10px;
          color: var(--text-muted);
          padding: 4px;
        }

        .toast-dismiss-btn:hover {
          color: var(--text-ink);
        }

        @keyframes slideInToast {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
