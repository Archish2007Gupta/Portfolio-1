import React, { useState, useEffect, useCallback } from 'react';

// Use relative /api URL to leverage Vite proxy in dev and same-origin in prod
const API_BASE = '';

export default function AdminPage() {
  // Session & Authentication State
  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Login Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard Messages & Stats State
  const [stats, setStats] = useState({ newMessages: 0, totalMessages: 0, readMessages: 0, archivedMessages: 0 });
  const [messages, setMessages] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [dashboardError, setDashboardError] = useState('');

  // Modal / Detail States
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Analytics Tab State
  const [activeAdminTab, setActiveAdminTab] = useState('inbox');
  const [analyticsSummary, setAnalyticsSummary] = useState(null);
  const [analyticsTimeseries, setAnalyticsTimeseries] = useState(null);
  const [analyticsRange, setAnalyticsRange] = useState('30d');
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState('');

  // 1. Initial Session Check
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

  // 2. Fetch Dashboard Statistics
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/stats`, {
        method: 'GET',
        credentials: 'include'
      });
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (res.ok && data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Error loading admin stats:', err);
    }
  }, []);

  // 3. Fetch Messages List
  const fetchMessages = useCallback(async () => {
    try {
      setLoadingMessages(true);
      setDashboardError('');

      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', '10');
      if (statusFilter !== 'all') {
        params.set('status', statusFilter);
      }
      if (activeSearch) {
        params.set('search', activeSearch);
      }

      const res = await fetch(`${API_BASE}/api/admin/messages?${params.toString()}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setMessages(data.messages || []);
        if (data.pagination) {
          setPagination(data.pagination);
        }
      } else {
        setDashboardError(data.message || 'Unable to load messages.');
      }
    } catch (err) {
      setDashboardError('Unable to connect to server to load messages.');
    } finally {
      setLoadingMessages(false);
    }
  }, [page, statusFilter, activeSearch]);

  // Load dashboard data when authenticated or when filters change
  useEffect(() => {
    if (authenticated) {
      fetchStats();
      fetchMessages();
    }
  }, [authenticated, fetchStats, fetchMessages]);

  // Fetch Analytics Data
  const fetchAnalytics = useCallback(async (range = analyticsRange) => {
    try {
      setLoadingAnalytics(true);
      setAnalyticsError('');

      const [summaryRes, timeseriesRes] = await Promise.all([
        fetch(`${API_BASE}/api/admin/analytics/summary`, { credentials: 'include' }),
        fetch(`${API_BASE}/api/admin/analytics/timeseries?range=${encodeURIComponent(range)}`, { credentials: 'include' })
      ]);

      if (summaryRes.status === 401 || timeseriesRes.status === 401) {
        setAuthenticated(false);
        return;
      }

      const summaryData = await summaryRes.json();
      const timeseriesData = await timeseriesRes.json();

      if (summaryRes.ok && summaryData.success) {
        setAnalyticsSummary(summaryData.summary);
      }
      if (timeseriesRes.ok && timeseriesData.success) {
        setAnalyticsTimeseries(timeseriesData);
      }
    } catch (err) {
      setAnalyticsError('Unable to load visitor analytics.');
    } finally {
      setLoadingAnalytics(false);
    }
  }, [analyticsRange]);

  useEffect(() => {
    if (authenticated && activeAdminTab === 'analytics') {
      fetchAnalytics(analyticsRange);
    }
  }, [authenticated, activeAdminTab, analyticsRange, fetchAnalytics]);

  // 4. Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setLoginError('Please enter both username and password.');
      return;
    }

    try {
      setLoginLoading(true);
      setLoginError('');

      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setPassword('');
        setAuthenticated(true);
        setAdminUser(username);
        setPage(1);
      } else {
        setLoginError(data.message || 'Invalid credentials.');
        setPassword('');
      }
    } catch (err) {
      setLoginError('Unable to connect to server. Please try again.');
      setPassword('');
    } finally {
      setLoginLoading(false);
    }
  };

  // 5. Handle Logout
  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/admin/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      setAuthenticated(false);
      setAdminUser(null);
      setUsername('');
      setPassword('');
      setMessages([]);
      setSelectedMessage(null);
      setMessageToDelete(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // 6. Update Message Status (new, read, archived)
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setActionLoadingId(id);
      const res = await fetch(`${API_BASE}/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });

      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }

      const data = await res.json();
      if (res.ok && data.success) {
        // Update local message state
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, status: newStatus } : msg))
        );
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage((prev) => ({ ...prev, status: newStatus }));
        }
        fetchStats();
      } else {
        alert(data.message || 'Failed to update message status.');
      }
    } catch (err) {
      alert('Network error updating status.');
    } finally {
      setActionLoadingId(null);
    }
  };

  // 7. Delete Message
  const confirmDelete = async () => {
    if (!messageToDelete) return;
    const id = messageToDelete.id;

    try {
      setActionLoadingId(id);
      const res = await fetch(`${API_BASE}/api/admin/messages/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(null);
        }
        setMessageToDelete(null);
        fetchStats();
        // If page becomes empty, go to previous page
        if (messages.length <= 1 && page > 1) {
          setPage((p) => p - 1);
        } else {
          fetchMessages();
        }
      } else {
        alert(data.message || 'Failed to delete message.');
      }
    } catch (err) {
      alert('Network error deleting message.');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Search Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearch(searchInput.trim());
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setActiveSearch('');
    setPage(1);
  };

  // Navigation
  const navigateToHome = () => {
    window.location.href = '/';
  };

  // Format dates cleanly
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr.replace(' ', 'T') + 'Z');
      return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateStr;
    }
  };

  // ── Session Loading View ──
  if (checkingSession) {
    return (
      <div className="admin-page-root">
        <div className="admin-loading-card">
          <div className="spinner"></div>
          <p>Verifying admin session...</p>
        </div>
      </div>
    );
  }

  // ── Unauthenticated Login Screen ──
  if (!authenticated) {
    return (
      <div className="admin-page-root">
        <div className="admin-auth-card">
          <div className="admin-card-header">
            <div>
              <span className="admin-tag">SECURE ACCESS</span>
              <h1 className="admin-main-title">ADMIN LOGIN</h1>
            </div>
            <button onClick={navigateToHome} className="btn-ghost">
              &larr; Portfolio
            </button>
          </div>

          <p className="admin-subtext">Private control portal for portfolio administration</p>

          {loginError && (
            <div id="login-error-msg" className="admin-error-banner" role="alert">
              <span>⚠️ {loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="admin-form">
            <div className="form-group">
              <label htmlFor="admin-username">Username</label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loginLoading}
                autoComplete="username"
                placeholder="admin"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loginLoading}
                autoComplete="current-password"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              id="admin-login-btn"
              type="submit"
              disabled={loginLoading}
              className="btn-primary"
            >
              {loginLoading ? 'AUTHENTICATING...' : 'LOGIN TO DASHBOARD ↗'}
            </button>
          </form>
        </div>

        <AdminStyles />
      </div>
    );
  }

  // ── Authenticated Messages Dashboard ──
  return (
    <div className="admin-page-root">
      <div className="admin-dashboard-container">
        
        {/* Top App Header */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <span className="system-pill">PORTFOLIO // OS</span>
            <h1 className="topbar-title">ADMIN DASHBOARD</h1>
            <span className="user-badge">● {adminUser}</span>
          </div>

          <div className="topbar-actions">
            <button onClick={navigateToHome} className="btn-secondary">
              &larr; Public Portfolio
            </button>
            <button id="admin-logout-btn" onClick={handleLogout} className="btn-danger">
              LOGOUT
            </button>
          </div>
        </header>

        {/* Tab Switcher */}
        <div className="admin-nav-tabs">
          <button
            className={`admin-nav-tab ${activeAdminTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('inbox')}
            id="admin-tab-inbox"
          >
            <span>✉ CONTACT INBOX</span>
            {stats.newMessages > 0 && <span className="tab-badge">{stats.newMessages}</span>}
          </button>
          <button
            className={`admin-nav-tab ${activeAdminTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('analytics')}
            id="admin-tab-analytics"
          >
            <span>📊 VISITOR ANALYTICS &amp; INSIGHTS</span>
          </button>
        </div>

        {activeAdminTab === 'inbox' && (
          <>
            {/* Metric Cards Row */}
        <section className="metrics-grid">
          <div className="metric-card">
            <span className="metric-label">TOTAL INBOX</span>
            <div className="metric-value">{stats.totalMessages}</div>
            <span className="metric-sub">Lifetime messages received</span>
          </div>

          <div className={`metric-card highlight-green ${stats.newMessages > 0 ? 'pulse' : ''}`}>
            <span className="metric-label">NEW MESSAGES</span>
            <div className="metric-value text-green">{stats.newMessages}</div>
            <span className="metric-sub">Require your attention</span>
          </div>

          <div className="metric-card">
            <span className="metric-label">READ</span>
            <div className="metric-value text-blue">{stats.readMessages}</div>
            <span className="metric-sub">Reviewed inquiries</span>
          </div>

          <div className="metric-card">
            <span className="metric-label">ARCHIVED</span>
            <div className="metric-value text-purple">{stats.archivedMessages}</div>
            <span className="metric-sub">Saved records</span>
          </div>
        </section>

        {/* Main Inbox Panel */}
        <main className="inbox-panel">
          
          {/* Panel Header & Controls */}
          <div className="panel-header">
            <div>
              <h2 className="panel-title">CONTACT INBOX</h2>
              <p className="panel-desc">Manage inquiries submitted through the public Contact modal</p>
            </div>

            {/* Status Filter Tabs */}
            <div className="filter-tabs">
              <button
                className={`tab-btn ${statusFilter === 'all' ? 'active' : ''}`}
                onClick={() => { setStatusFilter('all'); setPage(1); }}
              >
                ALL ({stats.totalMessages})
              </button>
              <button
                className={`tab-btn ${statusFilter === 'new' ? 'active tab-new' : ''}`}
                onClick={() => { setStatusFilter('new'); setPage(1); }}
              >
                NEW ({stats.newMessages})
              </button>
              <button
                className={`tab-btn ${statusFilter === 'read' ? 'active tab-read' : ''}`}
                onClick={() => { setStatusFilter('read'); setPage(1); }}
              >
                READ ({stats.readMessages})
              </button>
              <button
                className={`tab-btn ${statusFilter === 'archived' ? 'active tab-archived' : ''}`}
                onClick={() => { setStatusFilter('archived'); setPage(1); }}
              >
                ARCHIVED ({stats.archivedMessages})
              </button>
            </div>
          </div>

          {/* Search Bar & Refresh Bar */}
          <div className="search-filter-bar">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="Search by name, email, subject, or message content..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="btn-search">SEARCH</button>
              {activeSearch && (
                <button type="button" onClick={handleClearSearch} className="btn-clear-search">
                  ✕ Clear ({activeSearch})
                </button>
              )}
            </form>

            <button
              onClick={() => { fetchStats(); fetchMessages(); }}
              disabled={loadingMessages}
              className="btn-refresh"
              title="Refresh messages"
            >
              {loadingMessages ? 'Refreshing...' : '↻ Refresh'}
            </button>
          </div>

          {/* Dashboard Error Alert */}
          {dashboardError && (
            <div className="dashboard-error-banner" role="alert">
              <span>⚠️ {dashboardError}</span>
              <button onClick={fetchMessages} className="btn-retry">Retry</button>
            </div>
          )}

          {/* Messages List Area */}
          {loadingMessages ? (
            <div className="inbox-loading-state">
              <div className="spinner"></div>
              <p>Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="inbox-empty-state">
              <div className="empty-icon">📭</div>
              <h3>
                {activeSearch
                  ? `No messages match "${activeSearch}"`
                  : statusFilter !== 'all'
                  ? `No messages in '${statusFilter.toUpperCase()}' status`
                  : 'No contact messages yet.'}
              </h3>
              <p>
                {activeSearch
                  ? 'Try searching with a different keyword or clear your filter.'
                  : 'Submissions from visitors will automatically appear here in real-time.'}
              </p>
              {activeSearch && (
                <button onClick={handleClearSearch} className="btn-secondary" style={{ marginTop: '12px' }}>
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="messages-list">
              {messages.map((msg) => (
                <article key={msg.id} className={`message-card card-${msg.status}`}>
                  
                  {/* Top Bar of Card */}
                  <div className="card-top">
                    <div className="sender-meta">
                      <strong className="sender-name">{msg.name}</strong>
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                        className="sender-email"
                        onClick={(e) => e.stopPropagation()}
                      >
                        ✉ {msg.email}
                      </a>
                    </div>

                    <div className="card-top-right">
                      <span className={`status-pill pill-${msg.status}`}>
                        {msg.status.toUpperCase()}
                      </span>
                      <time className="message-date">{formatDate(msg.created_at)}</time>
                    </div>
                  </div>

                  {/* Subject Tag if present */}
                  {msg.subject && (
                    <div className="card-subject-row">
                      <span className="subject-tag">DOMAIN // {msg.subject}</span>
                    </div>
                  )}

                  {/* Message Body Preview */}
                  <div className="card-body" onClick={() => setSelectedMessage(msg)}>
                    <p className="message-preview-text">{msg.message}</p>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="card-footer">
                    <button
                      onClick={() => setSelectedMessage(msg)}
                      className="btn-card-view"
                    >
                      View Full Message ↗
                    </button>

                    <div className="card-actions">
                      {msg.status !== 'read' && (
                        <button
                          onClick={() => handleUpdateStatus(msg.id, 'read')}
                          disabled={actionLoadingId === msg.id}
                          className="action-btn btn-mark-read"
                          title="Mark message as read"
                        >
                          Mark Read
                        </button>
                      )}

                      {msg.status !== 'new' && (
                        <button
                          onClick={() => handleUpdateStatus(msg.id, 'new')}
                          disabled={actionLoadingId === msg.id}
                          className="action-btn btn-mark-new"
                          title="Mark message as new"
                        >
                          Mark New
                        </button>
                      )}

                      {msg.status !== 'archived' && (
                        <button
                          onClick={() => handleUpdateStatus(msg.id, 'archived')}
                          disabled={actionLoadingId === msg.id}
                          className="action-btn btn-archive"
                          title="Archive message"
                        >
                          Archive
                        </button>
                      )}

                      <button
                        onClick={() => setMessageToDelete(msg)}
                        disabled={actionLoadingId === msg.id}
                        className="action-btn btn-delete"
                        title="Delete message"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="pagination-bar">
              <span className="pagination-info">
                Page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong> ({pagination.total} total messages)
              </span>

              <div className="pagination-buttons">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1 || loadingMessages}
                  className="btn-page"
                >
                  &larr; Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={page >= pagination.totalPages || loadingMessages}
                  className="btn-page"
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          )}

        </main>
          </>
        )}

        {/* ── ANALYTICS VIEW ── */}
        {activeAdminTab === 'analytics' && (
          <div className="analytics-dashboard-view">
            {/* Analytics Metric Cards Grid */}
            <section className="analytics-metrics-grid">
              <div className="metric-card">
                <span className="metric-label">TOTAL VISITS</span>
                <div className="metric-value text-blue">
                  {analyticsSummary ? analyticsSummary.totalVisits : 'N/A'}
                </div>
                <span className="metric-sub">Portfolio page views</span>
              </div>

              <div className="metric-card">
                <span className="metric-label">UNIQUE SESSIONS</span>
                <div className="metric-value text-green">
                  {analyticsSummary ? analyticsSummary.uniqueSessions : 'N/A'}
                </div>
                <span className="metric-sub">Estimated unique visitors</span>
              </div>

              <div className="metric-card">
                <span className="metric-label">PROJECT INTERACTIONS</span>
                <div className="metric-value text-yellow">
                  {analyticsSummary ? analyticsSummary.projectInteractions : 'N/A'}
                </div>
                <span className="metric-sub">Views &amp; demo clicks</span>
              </div>

              <div className="metric-card">
                <span className="metric-label">GITHUB CLICKS</span>
                <div className="metric-value">
                  {analyticsSummary ? analyticsSummary.githubClicks : 'N/A'}
                </div>
                <span className="metric-sub">Repo &amp; profile views</span>
              </div>

              <div className="metric-card">
                <span className="metric-label">RESUME VIEWS</span>
                <div className="metric-value text-purple">
                  {analyticsSummary ? analyticsSummary.resumeViews : 'N/A'}
                </div>
                <span className="metric-sub">PDF previews opened</span>
              </div>

              <div className="metric-card">
                <span className="metric-label">RESUME DOWNLOADS</span>
                <div className="metric-value text-purple">
                  {analyticsSummary ? analyticsSummary.resumeDownloads : 'N/A'}
                </div>
                <span className="metric-sub">Direct file downloads</span>
              </div>

              <div className="metric-card">
                <span className="metric-label">CONTACT SUCCESSES</span>
                <div className="metric-value text-green">
                  {analyticsSummary ? analyticsSummary.contactSuccesses : 'N/A'}
                </div>
                <span className="metric-sub">Inquiries submitted</span>
              </div>

              <div className="metric-card highlight-green">
                <span className="metric-label">CONVERSION RATE</span>
                <div className="metric-value text-green">
                  {analyticsSummary ? analyticsSummary.conversionRate : 'N/A'}
                </div>
                <span className="metric-sub">Visits to contact ratio</span>
              </div>
            </section>

            {/* Time-Series & Detailed Breakdown Panel */}
            <main className="inbox-panel">
              <div className="panel-header">
                <div>
                  <h2 className="panel-title">ACTIVITY TRENDS &amp; TELEMETRY</h2>
                  <p className="panel-desc">
                    Aggregated daily portfolio interactions over selected time horizon
                  </p>
                </div>

                {/* Range Filter Buttons */}
                <div className="filter-tabs">
                  <button
                    className={`tab-btn ${analyticsRange === '7d' ? 'active' : ''}`}
                    onClick={() => setAnalyticsRange('7d')}
                    id="range-7d-btn"
                  >
                    7 DAYS
                  </button>
                  <button
                    className={`tab-btn ${analyticsRange === '30d' ? 'active' : ''}`}
                    onClick={() => setAnalyticsRange('30d')}
                    id="range-30d-btn"
                  >
                    30 DAYS
                  </button>
                  <button
                    className={`tab-btn ${analyticsRange === '90d' ? 'active' : ''}`}
                    onClick={() => setAnalyticsRange('90d')}
                    id="range-90d-btn"
                  >
                    90 DAYS
                  </button>
                  <button
                    onClick={() => fetchAnalytics(analyticsRange)}
                    disabled={loadingAnalytics}
                    className="btn-refresh"
                    title="Refresh analytics"
                  >
                    {loadingAnalytics ? '...' : '↻'}
                  </button>
                </div>
              </div>

              {analyticsError && (
                <div className="dashboard-error-banner" role="alert">
                  <span>⚠️ {analyticsError}</span>
                  <button onClick={() => fetchAnalytics(analyticsRange)} className="btn-retry">
                    Retry
                  </button>
                </div>
              )}

              {loadingAnalytics ? (
                <div className="inbox-loading-state">
                  <div className="spinner"></div>
                  <p>Aggregating telemetry records...</p>
                </div>
              ) : (
                <>
                  {/* Daily Activity Breakdown Table */}
                  <div className="analytics-table-wrap">
                    <table className="analytics-table">
                      <thead>
                        <tr>
                          <th>DATE</th>
                          <th>VISITS</th>
                          <th>SESSIONS</th>
                          <th>PROJECT CLICKS</th>
                          <th>GITHUB CLICKS</th>
                          <th>RESUME VIEWS</th>
                          <th>RESUME DL</th>
                          <th>CONTACTS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analyticsTimeseries?.timeline && analyticsTimeseries.timeline.length > 0 ? (
                          analyticsTimeseries.timeline
                            .slice()
                            .reverse()
                            .map((day) => (
                              <tr key={day.date}>
                                <td className="date-cell">
                                  <strong>{day.date}</strong>
                                </td>
                                <td>
                                  <span className={day.visits > 0 ? 'cell-val-active' : 'cell-val-zero'}>
                                    {day.visits}
                                  </span>
                                </td>
                                <td>
                                  <span className={day.uniqueSessions > 0 ? 'cell-val-active' : 'cell-val-zero'}>
                                    {day.uniqueSessions}
                                  </span>
                                </td>
                                <td>
                                  <span className={day.projectClicks > 0 ? 'cell-val-active' : 'cell-val-zero'}>
                                    {day.projectClicks}
                                  </span>
                                </td>
                                <td>
                                  <span className={day.githubClicks > 0 ? 'cell-val-active' : 'cell-val-zero'}>
                                    {day.githubClicks}
                                  </span>
                                </td>
                                <td>
                                  <span className={day.resumeViews > 0 ? 'cell-val-active' : 'cell-val-zero'}>
                                    {day.resumeViews}
                                  </span>
                                </td>
                                <td>
                                  <span className={day.resumeDownloads > 0 ? 'cell-val-active' : 'cell-val-zero'}>
                                    {day.resumeDownloads}
                                  </span>
                                </td>
                                <td>
                                  <span className={day.contactSuccesses > 0 ? 'cell-val-highlight' : 'cell-val-zero'}>
                                    {day.contactSuccesses}
                                  </span>
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan="8" style={{ textAlign: 'center', padding: '24px', color: '#71717a' }}>
                              No activity recorded in this time range.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Top Projects & Sections Grid */}
                  <div className="analytics-breakdown-grid">
                    <div className="breakdown-card">
                      <h3 className="breakdown-title">TOP INTERACTED PROJECTS</h3>
                      {analyticsSummary?.topProjects && analyticsSummary.topProjects.length > 0 ? (
                        <div className="breakdown-list">
                          {analyticsSummary.topProjects.map((p, idx) => (
                            <div key={p.name || idx} className="breakdown-item">
                              <span className="breakdown-rank">#{idx + 1}</span>
                              <span className="breakdown-name">{p.name}</span>
                              <span className="breakdown-count">{p.count} events</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="breakdown-empty">No project interaction telemetry yet.</p>
                      )}
                    </div>

                    <div className="breakdown-card">
                      <h3 className="breakdown-title">TOP VIEWED SECTIONS</h3>
                      {analyticsSummary?.topSections && analyticsSummary.topSections.length > 0 ? (
                        <div className="breakdown-list">
                          {analyticsSummary.topSections.map((s, idx) => (
                            <div key={s.section || idx} className="breakdown-item">
                              <span className="breakdown-rank">#{idx + 1}</span>
                              <span className="breakdown-name">#{s.section}</span>
                              <span className="breakdown-count">{s.count} views</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="breakdown-empty">No section telemetry recorded yet.</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </main>
          </div>
        )}
      </div>

      {/* ── View Full Message Modal ── */}
      {selectedMessage && (
        <div className="modal-backdrop" onClick={() => setSelectedMessage(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="modal-header">
              <div>
                <span className={`status-pill pill-${selectedMessage.status}`}>
                  {selectedMessage.status.toUpperCase()}
                </span>
                <h3 className="modal-title">{selectedMessage.name}</h3>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Portfolio Inquiry')}`}
                  className="modal-email-link"
                >
                  ✉ {selectedMessage.email}
                </a>
              </div>
              <button onClick={() => setSelectedMessage(null)} className="modal-close-btn" aria-label="Close">
                ✕
              </button>
            </div>

            <div className="modal-meta-grid">
              <div>
                <span className="meta-lbl">Date Received</span>
                <p className="meta-val">{formatDate(selectedMessage.created_at)}</p>
              </div>
              <div>
                <span className="meta-lbl">Domain / Subject</span>
                <p className="meta-val">{selectedMessage.subject || 'General Inquiry'}</p>
              </div>
            </div>

            <div className="modal-message-body">
              <span className="meta-lbl">Full Message</span>
              <div className="message-content-scroll">
                {selectedMessage.message}
              </div>
            </div>

            <div className="modal-footer">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Portfolio Inquiry')}`}
                className="btn-primary"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                Reply via Email ↗
              </a>

              <div className="modal-footer-actions">
                {selectedMessage.status !== 'read' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage.id, 'read')}
                    className="action-btn btn-mark-read"
                  >
                    Mark Read
                  </button>
                )}
                {selectedMessage.status !== 'new' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage.id, 'new')}
                    className="action-btn btn-mark-new"
                  >
                    Mark New
                  </button>
                )}
                {selectedMessage.status !== 'archived' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage.id, 'archived')}
                    className="action-btn btn-archive"
                  >
                    Archive
                  </button>
                )}
                <button
                  onClick={() => {
                    const toDel = selectedMessage;
                    setSelectedMessage(null);
                    setMessageToDelete(toDel);
                  }}
                  className="action-btn btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {messageToDelete && (
        <div className="modal-backdrop" onClick={() => setMessageToDelete(null)}>
          <div className="modal-box confirm-dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="confirm-icon">⚠️</div>
            <h3 className="confirm-title">Delete Message Permanently?</h3>
            <p className="confirm-text">
              Are you sure you want to permanently delete the message from <strong>{messageToDelete.name}</strong> ({messageToDelete.email})?
            </p>
            <p className="confirm-sub">This action cannot be undone and will permanently remove this record from SQLite.</p>

            <div className="confirm-actions">
              <button
                onClick={() => setMessageToDelete(null)}
                disabled={actionLoadingId === messageToDelete.id}
                className="btn-secondary"
              >
                CANCEL
              </button>
              <button
                onClick={confirmDelete}
                disabled={actionLoadingId === messageToDelete.id}
                className="btn-danger-solid"
              >
                {actionLoadingId === messageToDelete.id ? 'DELETING...' : 'DELETE PERMANENTLY'}
              </button>
            </div>
          </div>
        </div>
      )}

      <AdminStyles />
    </div>
  );
}

// Scoped CSS styles component (protects src/index.css entirely)
function AdminStyles() {
  return (
    <style>{`
      .admin-page-root {
        min-height: 100vh;
        background-color: #0d0d12;
        color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        box-sizing: border-box;
      }

      .admin-page-root *, .admin-page-root *::before, .admin-page-root *::after {
        box-sizing: inherit;
      }

      /* ── Loading Card ── */
      .admin-loading-card {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        color: #a1a1aa;
        font-size: 14px;
      }

      /* ── Auth Screen ── */
      .admin-auth-card {
        max-width: 440px;
        margin: 80px auto;
        background: #14141a;
        border: 2px solid #272732;
        border-radius: 16px;
        padding: 36px;
        box-shadow: 0 24px 48px rgba(0, 0, 0, 0.6);
      }

      .admin-card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
      }

      .admin-tag {
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.1em;
        color: #EF333A;
        display: block;
        margin-bottom: 4px;
      }

      .admin-main-title {
        font-size: 22px;
        font-weight: 900;
        letter-spacing: 0.04em;
        margin: 0;
      }

      .admin-subtext {
        font-size: 13px;
        color: #71717a;
        margin: 4px 0 24px 0;
      }

      .admin-error-banner {
        background: rgba(239, 51, 58, 0.15);
        border: 1px solid #ef4444;
        border-radius: 8px;
        padding: 12px;
        color: #fca5a5;
        font-size: 13px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .admin-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .form-group label {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #d4d4d8;
      }

      .form-group input {
        padding: 12px 14px;
        background: #1c1c24;
        border: 1px solid #3f3f4e;
        border-radius: 8px;
        color: #ffffff;
        font-size: 15px;
        outline: none;
        transition: border-color 0.2s;
      }

      .form-group input:focus {
        border-color: #EF333A;
      }

      /* ── Nav Tabs ── */
      .admin-nav-tabs {
        display: flex;
        gap: 12px;
        margin-bottom: 20px;
        border-bottom: 1.5px solid #272732;
        padding-bottom: 12px;
      }

      .admin-nav-tab {
        background: transparent;
        border: 1.5px solid #272732;
        color: #a1a1aa;
        padding: 10px 18px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.04em;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.2s;
      }

      .admin-nav-tab:hover {
        border-color: #3f3f4e;
        color: #ffffff;
      }

      .admin-nav-tab.active {
        background: #1c1c24;
        border-color: #EF333A;
        color: #ffffff;
      }

      .tab-badge {
        background: #EF333A;
        color: #ffffff;
        font-size: 10px;
        font-weight: 900;
        padding: 1px 6px;
        border-radius: 10px;
      }

      /* Analytics Metrics Grid */
      .analytics-metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }

      /* Analytics Table */
      .analytics-table-wrap {
        overflow-x: auto;
        border: 1px solid #272732;
        border-radius: 10px;
        background: #14141a;
        margin-bottom: 24px;
      }

      .analytics-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
        text-align: left;
      }

      .analytics-table th {
        padding: 12px 14px;
        background: #1c1c24;
        color: #a1a1aa;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        border-bottom: 1px solid #272732;
      }

      .analytics-table td {
        padding: 12px 14px;
        border-bottom: 1px solid #1f1f28;
      }

      .date-cell {
        font-family: monospace;
        color: #d4d4d8;
      }

      .cell-val-active {
        color: #1BE349;
        font-weight: 700;
      }

      .cell-val-highlight {
        color: #FFB200;
        font-weight: 900;
      }

      .cell-val-zero {
        color: #52525b;
      }

      /* Analytics Breakdown Grid */
      .analytics-breakdown-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 20px;
      }

      .breakdown-card {
        background: #14141a;
        border: 1.5px solid #272732;
        border-radius: 12px;
        padding: 20px;
      }

      .breakdown-title {
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.05em;
        color: #a1a1aa;
        margin: 0 0 16px 0;
        text-transform: uppercase;
      }

      .breakdown-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .breakdown-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background: #1c1c24;
        border-radius: 6px;
        border: 1px solid #272732;
      }

      .breakdown-rank {
        font-size: 11px;
        font-weight: 800;
        color: #EF333A;
        margin-right: 8px;
      }

      .breakdown-name {
        flex: 1;
        font-size: 13px;
        font-weight: 700;
        color: #ffffff;
      }

      .breakdown-count {
        font-size: 12px;
        color: #1BE349;
        font-weight: 800;
      }

      .breakdown-empty {
        color: #52525b;
        font-size: 13px;
        margin: 0;
      }

      /* ── Dashboard Layout ── */
      .admin-dashboard-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 24px 20px 60px 20px;
      }

      /* Topbar */
      .dashboard-topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        background: #14141a;
        border: 1.5px solid #272732;
        border-radius: 14px;
        margin-bottom: 24px;
        flex-wrap: wrap;
        gap: 16px;
      }

      .topbar-left {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      }

      .system-pill {
        font-size: 10px;
        font-weight: 900;
        letter-spacing: 0.1em;
        padding: 3px 8px;
        background: #272732;
        color: #a1a1aa;
        border-radius: 4px;
      }

      .topbar-title {
        font-size: 18px;
        font-weight: 900;
        margin: 0;
        letter-spacing: 0.04em;
      }

      .user-badge {
        font-size: 12px;
        font-weight: 700;
        color: #1BE349;
        background: rgba(27, 227, 73, 0.1);
        padding: 2px 8px;
        border-radius: 12px;
        border: 1px solid rgba(27, 227, 73, 0.25);
      }

      .topbar-actions {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      /* Metrics Grid */
      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }

      .metric-card {
        background: #14141a;
        border: 1.5px solid #272732;
        border-radius: 12px;
        padding: 18px 20px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .metric-card.highlight-green {
        border-color: rgba(27, 227, 73, 0.4);
      }

      .metric-label {
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.08em;
        color: #a1a1aa;
      }

      .metric-value {
        font-size: 32px;
        font-weight: 900;
        line-height: 1;
        margin: 6px 0;
      }

      .metric-sub {
        font-size: 12px;
        color: #71717a;
      }

      .text-green { color: #1BE349; }
      .text-blue { color: #38bdf8; }
      .text-purple { color: #AB54F7; }

      /* Inbox Panel */
      .inbox-panel {
        background: #14141a;
        border: 1.5px solid #272732;
        border-radius: 16px;
        padding: 24px;
      }

      .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 16px;
        padding-bottom: 20px;
        border-bottom: 1px solid #272732;
      }

      .panel-title {
        font-size: 20px;
        font-weight: 900;
        margin: 0;
        letter-spacing: 0.04em;
      }

      .panel-desc {
        font-size: 13px;
        color: #71717a;
        margin: 4px 0 0 0;
      }

      /* Filter Tabs */
      .filter-tabs {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        background: #1c1c24;
        padding: 4px;
        border-radius: 10px;
        border: 1px solid #272732;
      }

      .tab-btn {
        background: transparent;
        border: none;
        color: #a1a1aa;
        padding: 8px 14px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.04em;
        cursor: pointer;
        transition: all 0.2s;
      }

      .tab-btn:hover {
        color: #ffffff;
      }

      .tab-btn.active {
        background: #272732;
        color: #ffffff;
      }

      .tab-btn.active.tab-new {
        background: rgba(27, 227, 73, 0.2);
        color: #1BE349;
      }

      .tab-btn.active.tab-read {
        background: rgba(56, 189, 248, 0.2);
        color: #38bdf8;
      }

      .tab-btn.active.tab-archived {
        background: rgba(171, 84, 247, 0.2);
        color: #AB54F7;
      }

      /* Search & Action Bar */
      .search-filter-bar {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        margin: 20px 0;
        flex-wrap: wrap;
      }

      .search-form {
        display: flex;
        gap: 8px;
        flex: 1;
        min-width: 260px;
      }

      .search-input {
        flex: 1;
        padding: 10px 14px;
        background: #1c1c24;
        border: 1px solid #272732;
        border-radius: 8px;
        color: #ffffff;
        font-size: 13px;
        outline: none;
      }

      .search-input:focus {
        border-color: #EF333A;
      }

      .btn-search {
        background: #272732;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        padding: 0 16px;
        font-size: 12px;
        font-weight: 800;
        cursor: pointer;
      }

      .btn-search:hover {
        background: #3f3f4e;
      }

      .btn-clear-search {
        background: rgba(239, 51, 58, 0.15);
        color: #fca5a5;
        border: 1px solid rgba(239, 51, 58, 0.3);
        border-radius: 8px;
        padding: 0 12px;
        font-size: 12px;
        cursor: pointer;
      }

      .btn-refresh {
        background: #1c1c24;
        border: 1px solid #272732;
        color: #a1a1aa;
        padding: 0 14px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
      }

      .btn-refresh:hover {
        color: #ffffff;
        border-color: #3f3f4e;
      }

      /* Error Alert */
      .dashboard-error-banner {
        background: rgba(239, 51, 58, 0.15);
        border: 1px solid #ef4444;
        color: #fca5a5;
        border-radius: 8px;
        padding: 12px 16px;
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
      }

      .btn-retry {
        background: #ef4444;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        padding: 4px 10px;
        font-size: 11px;
        font-weight: 800;
        cursor: pointer;
      }

      /* Empty & Loading States */
      .inbox-loading-state, .inbox-empty-state {
        padding: 60px 20px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        color: #a1a1aa;
      }

      .empty-icon {
        font-size: 40px;
        margin-bottom: 4px;
      }

      .inbox-empty-state h3 {
        margin: 0;
        font-size: 18px;
        color: #ffffff;
      }

      .inbox-empty-state p {
        margin: 0;
        font-size: 13px;
        max-width: 420px;
        color: #71717a;
      }

      /* Message Cards */
      .messages-list {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }

      .message-card {
        background: #181820;
        border: 1.5px solid #272732;
        border-radius: 12px;
        padding: 18px 20px;
        transition: border-color 0.2s, transform 0.2s;
      }

      .message-card:hover {
        border-color: #3f3f4e;
      }

      .message-card.card-new {
        border-left: 4px solid #1BE349;
      }

      .message-card.card-read {
        border-left: 4px solid #38bdf8;
      }

      .message-card.card-archived {
        border-left: 4px solid #AB54F7;
        opacity: 0.85;
      }

      .card-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 10px;
      }

      .sender-meta {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }

      .sender-name {
        font-size: 16px;
        color: #ffffff;
      }

      .sender-email {
        font-size: 13px;
        color: #38bdf8;
        text-decoration: none;
      }

      .sender-email:hover {
        text-decoration: underline;
      }

      .card-top-right {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .status-pill {
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.06em;
        padding: 3px 8px;
        border-radius: 4px;
      }

      .pill-new {
        background: rgba(27, 227, 73, 0.15);
        color: #1BE349;
        border: 1px solid rgba(27, 227, 73, 0.3);
      }

      .pill-read {
        background: rgba(56, 189, 248, 0.15);
        color: #38bdf8;
        border: 1px solid rgba(56, 189, 248, 0.3);
      }

      .pill-archived {
        background: rgba(171, 84, 247, 0.15);
        color: #AB54F7;
        border: 1px solid rgba(171, 84, 247, 0.3);
      }

      .message-date {
        font-size: 12px;
        color: #71717a;
      }

      .card-subject-row {
        margin-bottom: 10px;
      }

      .subject-tag {
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.06em;
        color: #FFB200;
        background: rgba(255, 178, 0, 0.1);
        padding: 3px 8px;
        border-radius: 4px;
        border: 1px solid rgba(255, 178, 0, 0.25);
      }

      .card-body {
        cursor: pointer;
        padding: 8px 12px;
        background: #131318;
        border-radius: 8px;
        margin-bottom: 12px;
        transition: background 0.2s;
      }

      .card-body:hover {
        background: #101014;
      }

      .message-preview-text {
        margin: 0;
        font-size: 13.5px;
        line-height: 1.5;
        color: #d4d4d8;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
      }

      .btn-card-view {
        background: transparent;
        border: none;
        color: #a1a1aa;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        padding: 4px 0;
      }

      .btn-card-view:hover {
        color: #ffffff;
      }

      .card-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .action-btn {
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.04em;
        border: 1px solid transparent;
        cursor: pointer;
        transition: all 0.2s;
      }

      .btn-mark-read {
        background: rgba(56, 189, 248, 0.1);
        color: #38bdf8;
        border-color: rgba(56, 189, 248, 0.3);
      }

      .btn-mark-read:hover {
        background: #38bdf8;
        color: #000000;
      }

      .btn-mark-new {
        background: rgba(27, 227, 73, 0.1);
        color: #1BE349;
        border-color: rgba(27, 227, 73, 0.3);
      }

      .btn-mark-new:hover {
        background: #1BE349;
        color: #000000;
      }

      .btn-archive {
        background: rgba(171, 84, 247, 0.1);
        color: #AB54F7;
        border-color: rgba(171, 84, 247, 0.3);
      }

      .btn-archive:hover {
        background: #AB54F7;
        color: #ffffff;
      }

      .btn-delete {
        background: rgba(239, 51, 58, 0.1);
        color: #EF333A;
        border-color: rgba(239, 51, 58, 0.3);
      }

      .btn-delete:hover {
        background: #EF333A;
        color: #ffffff;
      }

      /* Pagination */
      .pagination-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 24px;
        padding-top: 18px;
        border-top: 1px solid #272732;
        flex-wrap: wrap;
        gap: 12px;
      }

      .pagination-info {
        font-size: 13px;
        color: #a1a1aa;
      }

      .pagination-buttons {
        display: flex;
        gap: 8px;
      }

      .btn-page {
        padding: 8px 14px;
        background: #1c1c24;
        border: 1px solid #272732;
        border-radius: 6px;
        color: #ffffff;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
      }

      .btn-page:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      /* Buttons Common */
      .btn-primary {
        background: #EF333A;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        padding: 12px 20px;
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.04em;
        cursor: pointer;
        transition: opacity 0.2s;
      }

      .btn-primary:hover {
        opacity: 0.9;
      }

      .btn-secondary {
        background: #1c1c24;
        color: #d4d4d8;
        border: 1px solid #272732;
        border-radius: 8px;
        padding: 8px 14px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
      }

      .btn-secondary:hover {
        color: #ffffff;
        border-color: #3f3f4e;
      }

      .btn-danger {
        background: rgba(239, 51, 58, 0.15);
        color: #fca5a5;
        border: 1px solid rgba(239, 51, 58, 0.4);
        border-radius: 8px;
        padding: 8px 14px;
        font-size: 12px;
        font-weight: 800;
        cursor: pointer;
      }

      .btn-danger:hover {
        background: #EF333A;
        color: #ffffff;
      }

      .btn-danger-solid {
        background: #EF333A;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        padding: 10px 18px;
        font-size: 13px;
        font-weight: 800;
        cursor: pointer;
      }

      .btn-ghost {
        background: transparent;
        border: none;
        color: #71717a;
        font-size: 13px;
        cursor: pointer;
        padding: 4px;
      }

      .btn-ghost:hover {
        color: #ffffff;
      }

      /* Modal Popups */
      .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
      }

      .modal-box {
        background: #14141a;
        border: 2px solid #272732;
        border-radius: 16px;
        padding: 28px;
        max-width: 640px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 24px 48px rgba(0, 0, 0, 0.8);
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
        border-bottom: 1px solid #272732;
        padding-bottom: 16px;
      }

      .modal-title {
        font-size: 20px;
        font-weight: 900;
        margin: 6px 0 2px 0;
      }

      .modal-email-link {
        color: #38bdf8;
        font-size: 13px;
        text-decoration: none;
      }

      .modal-close-btn {
        background: #1c1c24;
        border: 1px solid #272732;
        color: #a1a1aa;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .modal-close-btn:hover {
        color: #ffffff;
        border-color: #EF333A;
      }

      .modal-meta-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 20px;
        background: #181820;
        padding: 14px 16px;
        border-radius: 8px;
      }

      .meta-lbl {
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: #71717a;
        display: block;
        margin-bottom: 4px;
      }

      .meta-val {
        margin: 0;
        font-size: 13.5px;
        font-weight: 600;
        color: #d4d4d8;
      }

      .modal-message-body {
        margin-bottom: 24px;
      }

      .message-content-scroll {
        background: #0d0d12;
        border: 1px solid #272732;
        border-radius: 8px;
        padding: 16px;
        font-size: 14px;
        line-height: 1.6;
        color: #ffffff;
        white-space: pre-wrap;
        max-height: 260px;
        overflow-y: auto;
      }

      .modal-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
        border-top: 1px solid #272732;
        padding-top: 18px;
      }

      .modal-footer-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      /* Confirm Dialog */
      .confirm-dialog {
        max-width: 440px;
        text-align: center;
      }

      .confirm-icon {
        font-size: 36px;
        margin-bottom: 10px;
      }

      .confirm-title {
        font-size: 18px;
        font-weight: 900;
        margin: 0 0 10px 0;
      }

      .confirm-text {
        font-size: 13.5px;
        color: #d4d4d8;
        line-height: 1.5;
        margin: 0 0 8px 0;
      }

      .confirm-sub {
        font-size: 12px;
        color: #ef4444;
        margin: 0 0 24px 0;
      }

      .confirm-actions {
        display: flex;
        justify-content: center;
        gap: 12px;
      }

      /* Spinner */
      .spinner {
        width: 24px;
        height: 24px;
        border: 3px solid #272732;
        border-top-color: #EF333A;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  );
}
