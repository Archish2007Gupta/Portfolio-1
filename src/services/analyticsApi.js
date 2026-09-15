/**
 * Privacy-Conscious Analytics Client — No-Op Mode
 * Analytics event dispatch is silenced; no backend is deployed.
 * getAnonymousSessionId() remains functional (pure client-side).
 */

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
 * No-op — analytics events are not sent (no backend deployed).
 * @param {{ event: string, section?: string, target?: string }} _params
 */
export async function sendAnalyticsEvent(_params) {
  // Silently suppressed — no backend
}

/**
 * Admin analytics stubs — always return empty since no backend is deployed.
 */
export async function getAnalyticsSummary() {
  return { success: false, summary: null };
}

export async function getAnalyticsTimeseries(_range = '30d') {
  return { success: false, timeline: [] };
}

export async function getRecentAnalyticsEvents(_limit = 50) {
  return { success: false, events: [] };
}

export default {
  getAnonymousSessionId,
  sendAnalyticsEvent,
  getAnalyticsSummary,
  getAnalyticsTimeseries,
  getRecentAnalyticsEvents
};
