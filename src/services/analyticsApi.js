/**
 * Privacy-Conscious Analytics Client
 * Handles anonymous session identifier management and non-blocking background event dispatch.
 * Strictly NO IP addresses, user agents, or personal information.
 *
 * Environment-aware:
 *  - Development:  Sends to /api/analytics/events (Vite proxy → localhost:5000)
 *  - Production:   Sends to VITE_API_BASE_URL/api/analytics/events (Railway backend)
 */

// Resolve API base once at module load (works at build time via Vite env injection)
const API_BASE = (
  typeof import.meta !== 'undefined' &&
  import.meta.env &&
  import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : ''
).replace(/\/+$/, '');

let memorySessionId = null;

/**
 * Retrieves or generates an anonymous session identifier.
 * Stored in sessionStorage for the duration of the browser tab.
 * Falls back to in-memory variable if sessionStorage is blocked.
 * @returns {string} Anonymous session ID (e.g., 'anon_4k9x2m_l8z1')
 */
export function getAnonymousSessionId() {
  if (memorySessionId) return memorySessionId;

  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      let stored = window.sessionStorage.getItem('portfolio_anon_session');
      if (stored && /^[a-zA-Z0-9_-]{8,64}$/.test(stored)) {
        memorySessionId = stored;
        return stored;
      }

      // Generate random anonymous ID
      const randomPart = Math.random().toString(36).substring(2, 10);
      const timePart = Date.now().toString(36);
      const newId = `anon_${randomPart}_${timePart}`;
      window.sessionStorage.setItem('portfolio_anon_session', newId);
      memorySessionId = newId;
      return newId;
    }
  } catch {
    // sessionStorage blocked or unavailable
  }

  if (!memorySessionId) {
    memorySessionId = `anon_${Math.random().toString(36).substring(2, 10)}_${Date.now().toString(36)}`;
  }
  return memorySessionId;
}

/**
 * Sends an approved analytics event in the background.
 * Asynchronous, non-blocking, and failure-tolerant.
 * Never interrupts user navigation, interactions, or causes console errors.
 * @param {{ event: string, section?: string, target?: string }} params
 */
export async function sendAnalyticsEvent({ event, section, target }) {
  if (!event || typeof event !== 'string') return;

  try {
    const sessionId = getAnonymousSessionId();
    const payload = {
      event: event.trim(),
      section: section ? String(section).trim().substring(0, 50) : null,
      target: target ? String(target).trim().substring(0, 100) : null,
      session_id: sessionId
    };

    const bodyString = JSON.stringify(payload);

    // Prefer fetch with keepalive to allow safe dispatch during clicks/nav
    if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
      fetch(`${API_BASE}/api/analytics/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bodyString,
        keepalive: true
      }).catch(() => {
        // Silently swallow network failures to guarantee portfolio functionality
      });
    }
  } catch {
    // Fail silently
  }
}

/**
 * Admin: Fetch aggregated summary metrics.
 * @returns {Promise<{ success: boolean, summary: object }>}
 */
export async function getAnalyticsSummary() {
  const res = await fetch(`${API_BASE}/api/admin/analytics/summary`, {
    method: 'GET',
    credentials: 'include'
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

/**
 * Admin: Fetch daily time-series activity for range ('7d' | '30d' | '90d').
 * @param {string} range
 * @returns {Promise<{ success: boolean, range: string, days: number, timeline: Array }>}
 */
export async function getAnalyticsTimeseries(range = '30d') {
  const res = await fetch(`${API_BASE}/api/admin/analytics/timeseries?range=${encodeURIComponent(range)}`, {
    method: 'GET',
    credentials: 'include'
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

/**
 * Admin: Fetch recent raw anonymous events.
 * @param {number} [limit=50]
 * @returns {Promise<{ success: boolean, events: Array }>}
 */
export async function getRecentAnalyticsEvents(limit = 50) {
  const res = await fetch(`${API_BASE}/api/admin/analytics/events?limit=${limit}`, {
    method: 'GET',
    credentials: 'include'
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

export default {
  getAnonymousSessionId,
  sendAnalyticsEvent,
  getAnalyticsSummary,
  getAnalyticsTimeseries,
  getRecentAnalyticsEvents
};
