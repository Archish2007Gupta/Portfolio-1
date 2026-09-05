import { getDb } from '../db/database.js';
import githubService from '../services/github.service.js';

// Cache duration: 15 minutes
const CACHE_TTL_MS = 15 * 60 * 1000;

/**
 * Retrieve cached projects from SQLite
 * @returns {{ projects: Array, newestCachedAt: Date | null }}
 */
function getCachedProjects() {
  const db = getDb();
  const rows = db.prepare(`
    SELECT data_json, cached_at
    FROM projects_cache
    ORDER BY custom_order ASC, pushed_at DESC
  `).all();

  if (!rows || rows.length === 0) {
    return { projects: [], newestCachedAt: null };
  }

  const projects = [];
  let newestTime = 0;

  for (const row of rows) {
    try {
      const parsed = JSON.parse(row.data_json);
      projects.push(parsed);
      if (row.cached_at) {
        const time = new Date(row.cached_at.replace(' ', 'T') + 'Z').getTime();
        if (time > newestTime) {
          newestTime = time;
        }
      }
    } catch {
      // Ignore corrupted row
    }
  }

  return {
    projects,
    newestCachedAt: newestTime > 0 ? new Date(newestTime) : null
  };
}

export const projectsController = {
  /**
   * Public endpoint to get normalized project metadata.
   * Checks SQLite cache, falls back to stale cache during GitHub outages.
   * GET /api/projects
   */
  async getProjects(req, res, next) {
    try {
      const { projects: cachedList, newestCachedAt } = getCachedProjects();
      const now = Date.now();

      // If cache is present and within TTL, return immediately
      if (cachedList.length > 0 && newestCachedAt) {
        const cacheAge = now - newestCachedAt.getTime();
        if (cacheAge < CACHE_TTL_MS) {
          return res.status(200).json({
            success: true,
            projects: cachedList,
            cached: true
          });
        }
      }

      // Cache is either empty or stale; fetch fresh data from GitHub
      try {
        const freshList = await githubService.syncProjects();
        return res.status(200).json({
          success: true,
          projects: freshList,
          cached: false
        });
      } catch (ghError) {
        console.warn('[PROJECTS] GitHub fetch failed:', ghError.message);

        // Stale-cache fallback: return stale records if available
        if (cachedList.length > 0) {
          console.info('[PROJECTS] Returning stale cached projects as fallback.');
          return res.status(200).json({
            success: true,
            projects: cachedList,
            cached: true,
            stale: true
          });
        }

        // No cache available and GitHub failed
        return res.status(503).json({
          success: false,
          message: 'Unable to load projects right now.'
        });
      }
    } catch (err) {
      next(err);
    }
  },

  /**
   * Admin-only endpoint to force cache invalidation and refresh GitHub data.
   * POST /api/admin/projects/refresh
   */
  async refreshProjects(req, res, next) {
    try {
      const freshList = await githubService.syncProjects();
      res.status(200).json({
        success: true,
        message: 'Projects refreshed successfully.',
        count: freshList.length
      });
    } catch (err) {
      console.error('[PROJECTS] Admin refresh failed:', err.message);
      res.status(502).json({
        success: false,
        message: 'Failed to refresh projects from GitHub. Please check network or rate limits.'
      });
    }
  }
};

export default projectsController;
