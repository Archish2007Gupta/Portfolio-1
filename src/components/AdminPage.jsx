import React, { useState, useEffect } from 'react';

// Use backend port 5000 in dev, or relative URL if proxied / same-origin
const API_BASE = 'http://localhost:5000';

export default function AdminPage() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Session verification on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      setCheckingSession(true);
      const res = await fetch(`${API_BASE}/api/admin/session`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok && data.authenticated) {
        setAuthenticated(true);
        setAdminUser(data.admin?.username || 'admin');
      } else {
        setAuthenticated(false);
        setAdminUser(null);
      }
    } catch (err) {
      setAuthenticated(false);
      setAdminUser(null);
    } finally {
      setCheckingSession(false);
    }
  };

  // 2. Login submit handler
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setPassword('');
        setAuthenticated(true);
        setAdminUser(username);
      } else {
        setError(data.message || 'Invalid credentials.');
        setPassword('');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again.');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  // 3. Logout handler
  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch(`${API_BASE}/api/admin/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      setAuthenticated(false);
      setAdminUser(null);
      setUsername('');
      setPassword('');
      setError('');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Navigation back to public portfolio
  const navigateToHome = () => {
    window.location.href = '/';
  };

  // Render loading state while checking session
  if (checkingSession) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p style={styles.textMuted}>Checking session...</p>
        </div>
      </div>
    );
  }

  // Render Authenticated Admin Dashboard Placeholder
  if (authenticated) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.headerRow}>
            <span style={styles.badge}>AUTHENTICATED</span>
            <button onClick={navigateToHome} style={styles.linkButton}>
              &larr; Back to Portfolio
            </button>
          </div>

          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.greeting}>
            Logged in as <strong>{adminUser}</strong>
          </p>

          <div style={styles.noticeBox}>
            <p style={{ margin: 0, fontWeight: 600 }}>Authentication successful.</p>
            <p style={{ margin: '8px 0 0 0', color: '#666' }}>
              Future admin features will appear here.
            </p>
          </div>

          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            disabled={loading}
            style={styles.logoutButton}
          >
            {loading ? 'Logging out...' : 'LOGOUT'}
          </button>
        </div>
      </div>
    );
  }

  // Render Admin Login Screen
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <h1 style={styles.title}>ADMIN LOGIN</h1>
          <button onClick={navigateToHome} style={styles.linkButton}>
            &larr; Portfolio
          </button>
        </div>

        <p style={styles.subtitle}>Private administrative authentication</p>

        {error && (
          <div id="login-error-msg" style={styles.errorBox}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="admin-username" style={styles.label}>
              Username
            </label>
            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              autoComplete="username"
              placeholder="admin"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="admin-password" style={styles.label}>
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              placeholder="••••••••"
              style={styles.input}
              required
            />
          </div>

          <button
            id="admin-login-btn"
            type="submit"
            disabled={loading}
            style={styles.submitButton}
          >
            {loading ? 'AUTHENTICATING...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0c',
    color: '#ffffff',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px'
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#121216',
    border: '2px solid #27272a',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 800,
    letterSpacing: '0.05em',
    margin: 0,
    color: '#ffffff'
  },
  subtitle: {
    fontSize: '14px',
    color: '#a1a1aa',
    marginTop: '6px',
    marginBottom: '24px'
  },
  greeting: {
    fontSize: '15px',
    color: '#d4d4d8',
    margin: '12px 0 20px 0'
  },
  badge: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor: '#052e16',
    color: '#4ade80',
    border: '1px solid #15803d'
  },
  linkButton: {
    background: 'transparent',
    border: 'none',
    color: '#a1a1aa',
    fontSize: '13px',
    cursor: 'pointer',
    padding: '4px 8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#d4d4d8',
    textTransform: 'uppercase',
    letterSpacing: '0.04em'
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 14px',
    backgroundColor: '#18181b',
    border: '1px solid #3f3f46',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#EF333A',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '15px',
    fontWeight: 800,
    letterSpacing: '0.08em',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'opacity 0.2s'
  },
  logoutButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#27272a',
    color: '#ffffff',
    border: '1px solid #3f3f46',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '0.05em',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  noticeBox: {
    backgroundColor: '#1c1917',
    border: '1px solid #44403c',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '24px',
    color: '#d6d3d1',
    fontSize: '14px',
    lineHeight: '1.5'
  },
  errorBox: {
    backgroundColor: 'rgba(239, 51, 58, 0.15)',
    border: '1px solid #ef4444',
    borderRadius: '6px',
    padding: '12px',
    color: '#fca5a5',
    fontSize: '13px',
    marginBottom: '16px'
  },
  textMuted: {
    color: '#a1a1aa',
    textAlign: 'center',
    margin: '20px 0'
  }
};
