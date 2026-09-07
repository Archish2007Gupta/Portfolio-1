import { getDb } from '../db/database.js';

// Approved event types
export const ALLOWED_EVENTS = Object.freeze([
  'page_view',
  'section_view',
  'project_view',
  'project_click',
  'github_click',
  'resume_view',
  'resume_download',
  'contact_success'
]);

// Allowed time-series ranges
export const ALLOWED_RANGES = Object.freeze({
  '7d': 7,
  '30d': 30,
  '90d': 90
});

// Known standard targets (combined with dynamic projects_cache)
const GENERAL_TARGETS = new Set([
  'resume.pdf',
  'github_profile',
  'contribution_graph',
  'footer_links',
  'hero_cta'
]);

export const analyticsService = {
  /**
   * Validates and normalizes project / action target against known projects and actions.
   * Prevents arbitrary or malicious strings from polluting target records.
   * @param {string} event
   * @param {string|null} target
   * @returns {string|null} Sanitized target or null
   */
  validateAndSanitizeTarget(event, target) {
    if (!target || typeof target !== 'string') return null;
    const sanitized = target.trim().substring(0, 100);
    if (!sanitized) return null;

    // For general events, accept clean slug
    if (GENERAL_TARGETS.has(sanitized.toLowerCase())) {
      return sanitized;
    }

    // For project/github events, check against projects_cache or sanitize slug
    if (['project_view', 'project_click', 'github_click'].includes(event)) {
      try {
        const db = getDb();
        const projectRow = db.prepare(
          'SELECT name FROM projects_cache WHERE LOWER(name) = LOWER(?) LIMIT 1'
        ).get(sanitized);

        if (projectRow) {
          return projectRow.name;
        }
      } catch (err) {
        // Fallback to sanitized slug if database check fails
      }
    }

    // Return safe sanitized string (alphanumeric, dashes, underscores, dots)
    const cleanTarget = sanitized.replace(/[^a-zA-Z0-9_\-.\/]/g, '').substring(0, 80);
    return cleanTarget || null;
  },

  /**
   * Records a validated, privacy-conscious analytics event.
   * Single source of truth: SQLite analytics_events.
   * NO IP addresses or personal info is ever accepted or stored.
   * @param {{ event: string, section?: string, target?: string, sessionId: string }} params
   * @returns {boolean}
   */
  recordEvent({ event, section, target, sessionId }) {
    // 1. Validate event type
    if (!event || typeof event !== 'string' || !ALLOWED_EVENTS.includes(event.trim())) {
      throw new Error(`Invalid event type '${event}'. Allowed: ${ALLOWED_EVENTS.join(', ')}`);
    }

    // 2. Validate anonymous session identifier
    if (!sessionId || typeof sessionId !== 'string') {
      throw new Error('Missing anonymous session identifier');
    }
    const cleanSessionId = sessionId.trim();
    if (!/^[a-zA-Z0-9_-]{8,64}$/.test(cleanSessionId)) {
      throw new Error('Invalid session identifier format');
    }

    // 3. Validate and sanitize section (max 50 chars)
    let cleanSection = null;
    if (section && typeof section === 'string') {
      cleanSection = section.trim().replace(/[^a-zA-Z0-9_-]/g, '').substring(0, 50);
    }

    // 4. Validate and sanitize target (max 100 chars)
    const cleanTarget = this.validateAndSanitizeTarget(event, target);

    // 5. Parameterized SQL insert
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO analytics_events (event_type, section, target, session_id, created_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);

    stmt.run(event.trim(), cleanSection, cleanTarget, cleanSessionId);
    return true;
  },

  /**
   * Retrieves aggregated summary metrics for the admin dashboard.
   * @returns {object} Summary stats
   */
  getSummary() {
    const db = getDb();

    // Counts by event_type
    const counts = db.prepare(`
      SELECT 
        event_type,
        COUNT(*) as count
      FROM analytics_events
      GROUP BY event_type
    `).all();

    const countsMap = {};
    for (const row of counts) {
      countsMap[row.event_type] = row.count;
    }

    const totalVisits = countsMap['page_view'] || 0;
    const projectInteractions = (countsMap['project_view'] || 0) + (countsMap['project_click'] || 0);
    const githubClicks = countsMap['github_click'] || 0;
    const resumeViews = countsMap['resume_view'] || 0;
    const resumeDownloads = countsMap['resume_download'] || 0;
    const contactSuccesses = countsMap['contact_success'] || 0;

    // Unique anonymous sessions
    const sessionRow = db.prepare(`
      SELECT COUNT(DISTINCT session_id) as unique_sessions FROM analytics_events
    `).get();
    const uniqueSessions = sessionRow ? sessionRow.unique_sessions : 0;

    // Factual conversion rate (visit -> contact submission)
    const conversionRate = totalVisits > 0
      ? `${((contactSuccesses / totalVisits) * 100).toFixed(1)}%`
      : 'N/A';

    // Top interacted projects
    const topProjects = db.prepare(`
      SELECT 
        target as name, 
        COUNT(*) as count 
      FROM analytics_events 
      WHERE event_type IN ('project_view', 'project_click', 'github_click') 
        AND target IS NOT NULL 
        AND target != ''
      GROUP BY target 
      ORDER BY count DESC 
      LIMIT 6
    `).all();

    // Top viewed sections
    const topSections = db.prepare(`
      SELECT 
        section, 
        COUNT(*) as count 
      FROM analytics_events 
      WHERE event_type = 'section_view' 
        AND section IS NOT NULL 
        AND section != ''
      GROUP BY section 
      ORDER BY count DESC 
      LIMIT 8
    `).all();

    return {
      totalVisits,
      uniqueSessions,
      projectInteractions,
      githubClicks,
      resumeViews,
      resumeDownloads,
      contactSuccesses,
      conversionRate,
      topProjects,
      topSections
    };
  },

  /**
   * Retrieves daily time-series activity for the specified range.
   * @param {string} range '7d' | '30d' | '90d'
   * @returns {object} Daily time-series breakdown
   */
  getTimeseries(range = '30d') {
    if (!ALLOWED_RANGES[range]) {
      throw new Error(`Invalid range '${range}'. Allowed ranges: ${Object.keys(ALLOWED_RANGES).join(', ')}`);
    }

    const numDays = ALLOWED_RANGES[range];
    const db = getDb();

    // Fetch daily aggregated event counts
    const rows = db.prepare(`
      SELECT 
        strftime('%Y-%m-%d', created_at) as date,
        COUNT(CASE WHEN event_type = 'page_view' THEN 1 END) as visits,
        COUNT(DISTINCT session_id) as unique_sessions,
        COUNT(CASE WHEN event_type IN ('project_click', 'project_view') THEN 1 END) as project_clicks,
        COUNT(CASE WHEN event_type = 'github_click' THEN 1 END) as github_clicks,
        COUNT(CASE WHEN event_type = 'resume_view' THEN 1 END) as resume_views,
        COUNT(CASE WHEN event_type = 'resume_download' THEN 1 END) as resume_downloads,
        COUNT(CASE WHEN event_type = 'contact_success' THEN 1 END) as contact_successes
      FROM analytics_events
      WHERE created_at >= datetime('now', '-' || ? || ' days')
      GROUP BY strftime('%Y-%m-%d', created_at)
      ORDER BY date ASC
    `).all(numDays);

    const rowsByDate = new Map();
    for (const r of rows) {
      rowsByDate.set(r.date, r);
    }

    // Build complete daily timeline up to today (including zero-event days)
    const timeline = [];
    const today = new Date();

    for (let i = numDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];

      const existing = rowsByDate.get(dateStr);
      if (existing) {
        timeline.push({
          date: dateStr,
          visits: existing.visits || 0,
          uniqueSessions: existing.unique_sessions || 0,
          projectClicks: existing.project_clicks || 0,
          githubClicks: existing.github_clicks || 0,
          resumeViews: existing.resume_views || 0,
          resumeDownloads: existing.resume_downloads || 0,
          contactSuccesses: existing.contact_successes || 0
        });
      } else {
        timeline.push({
          date: dateStr,
          visits: 0,
          uniqueSessions: 0,
          projectClicks: 0,
          githubClicks: 0,
          resumeViews: 0,
          resumeDownloads: 0,
          contactSuccesses: 0
        });
      }
    }

    return {
      range,
      days: numDays,
      timeline
    };
  },

  /**
   * Retrieves recent anonymized telemetry events for admin log viewing.
   * @param {number} [limit=50]
   * @returns {Array<object>}
   */
  getRecentEvents(limit = 50) {
    const db = getDb();
    const cleanLimit = Math.min(Math.max(parseInt(limit, 10) || 50, 1), 200);

    return db.prepare(`
      SELECT 
        id, 
        event_type, 
        section, 
        target, 
        created_at
      FROM analytics_events
      ORDER BY created_at DESC, id DESC
      LIMIT ?
    `).all(cleanLimit);
  },

  /**
   * Lightweight 90-day retention cleanup.
   * Deletes events older than the specified retention days.
   * NEVER touches contacts, projects, certificates, experience, or sessions!
   * @param {number} [retentionDays=90]
   * @returns {number} Number of purged events
   */
  cleanupOldEvents(retentionDays = 90) {
    const db = getDb();
    const days = parseInt(retentionDays, 10) || 90;
    const info = db.prepare(`
      DELETE FROM analytics_events
      WHERE created_at < datetime('now', '-' || ? || ' days')
    `).run(days);

    return info.changes;
  }
};

export default analyticsService;
