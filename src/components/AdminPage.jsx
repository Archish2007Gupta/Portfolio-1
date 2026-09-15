import React from 'react';

/**
 * AdminPage — Disabled (no backend deployed).
 * The admin dashboard requires the Node.js backend to be running.
 * Since the portfolio is now fully frontend-only, this page shows a
 * graceful informational message instead.
 */
export default function AdminPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0E0E10',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', 'Inter', sans-serif",
      padding: '24px',
    }}>
      <div style={{
        background: '#1A1A1F',
        border: '2px solid #2A2A30',
        borderRadius: '20px',
        padding: '48px 40px',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        {/* Icon */}
        <div style={{
          width: '64px',
          height: '64px',
          background: 'rgba(239, 51, 58, 0.12)',
          border: '2px solid rgba(239, 51, 58, 0.3)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '28px',
        }}>
          🔒
        </div>

        {/* Title */}
        <h1 style={{
          color: '#F0EEE8',
          fontSize: '1.5rem',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          marginBottom: '12px',
        }}>
          Admin Dashboard Disabled
        </h1>

        {/* Description */}
        <p style={{
          color: 'rgba(240, 238, 232, 0.55)',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          marginBottom: '32px',
        }}>
          The admin dashboard requires the backend server to be running.
          This portfolio is currently deployed as a static frontend-only build
          — no separate backend is needed.
        </p>

        {/* Status pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0, 170, 60, 0.1)',
          border: '1px solid rgba(0, 170, 60, 0.25)',
          borderRadius: '999px',
          padding: '8px 16px',
          marginBottom: '32px',
        }}>
          <span style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#00AA3C',
            boxShadow: '0 0 6px #00AA3C',
            display: 'inline-block',
          }} />
          <span style={{
            color: '#00AA3C',
            fontSize: '0.72rem',
            fontWeight: 800,
            fontFamily: 'monospace',
            letterSpacing: '0.06em',
          }}>
            FRONTEND-ONLY · NO BACKEND REQUIRED
          </span>
        </div>

        {/* Back link */}
        <div>
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFB200',
              color: '#11110F',
              padding: '12px 24px',
              borderRadius: '999px',
              fontWeight: 900,
              fontSize: '0.82rem',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
