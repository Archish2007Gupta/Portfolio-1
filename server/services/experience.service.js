import fs from 'fs';
import path from 'path';
import env from '../config/env.js';

/**
 * Validates whether a URL is a safe HTTP or HTTPS link.
 * Rejects javascript:, data:, and file: schemes to prevent XSS.
 * @param {string} urlStr
 * @returns {boolean}
 */
function isValidHttpUrl(urlStr) {
  if (typeof urlStr !== 'string' || !urlStr.trim()) return false;
  try {
    const parsed = new URL(urlStr.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export const experienceService = {
  /**
   * Get the absolute path to the experience.json file.
   * Path traversal protected to ensure it resolves inside DATA_DIR.
   * @returns {string}
   */
  getExperienceFilePath() {
    const dataDir = path.resolve(env.PATHS.DATA_DIR);
    const resolvedPath = path.resolve(dataDir, 'experience.json');
    if (!resolvedPath.startsWith(dataDir)) {
      throw new Error('Path traversal attempt detected in experience file path');
    }
    return resolvedPath;
  },

  /**
   * Read and parse experience entries from server/data/experience.json.
   * Validates schema, sanitizes links, and sorts deterministically.
   * Single source of truth: server/data/experience.json.
   * @returns {Promise<Array<object>>}
   */
  async getExperience() {
    const filePath = this.getExperienceFilePath();

    if (!fs.existsSync(filePath)) {
      console.warn(`[EXPERIENCE SERVICE] experience.json not found at ${filePath}. Returning empty list.`);
      return [];
    }

    let rawContent;
    try {
      rawContent = await fs.promises.readFile(filePath, 'utf-8');
    } catch (readErr) {
      console.error('[EXPERIENCE SERVICE] Error reading experience.json:', readErr.message);
      return [];
    }

    let parsed;
    try {
      parsed = JSON.parse(rawContent);
    } catch (parseErr) {
      console.warn('[EXPERIENCE SERVICE] Invalid JSON in experience.json:', parseErr.message);
      return [];
    }

    if (!Array.isArray(parsed)) {
      console.warn('[EXPERIENCE SERVICE] Root content of experience.json is not an array.');
      return [];
    }

    const validatedItems = [];

    for (const item of parsed) {
      if (!item || typeof item !== 'object') continue;

      // Validate required fields
      const id = typeof item.id === 'string' ? item.id.trim() : null;
      const title = typeof item.title === 'string' ? item.title.trim() : null;
      const organization = typeof item.organization === 'string' ? item.organization.trim() : null;
      const description = typeof item.description === 'string' ? item.description.trim() : (typeof item.detail === 'string' ? item.detail.trim() : null);

      if (!id || !title || !organization || !description) {
        // Skip entry if required fields are missing
        continue;
      }

      // Normalize optional fields
      const type = typeof item.type === 'string' && item.type.trim() ? item.type.trim().toUpperCase() : 'EXPERIENCE';
      const tag = typeof item.tag === 'string' && item.tag.trim() ? item.tag.trim().toUpperCase() : type;
      const location = typeof item.location === 'string' && item.location.trim() ? item.location.trim() : null;
      const startDate = typeof item.startDate === 'string' && item.startDate.trim() ? item.startDate.trim() : null;
      const endDate = typeof item.endDate === 'string' && item.endDate.trim() ? item.endDate.trim() : null;
      const current = Boolean(item.current);
      const color = typeof item.color === 'string' && item.color.trim() ? item.color.trim() : '#0072E3';
      const order = typeof item.order === 'number' ? item.order : 9999;
      const period = typeof item.period === 'string' && item.period.trim() ? item.period.trim() : (current ? '2025 – Present' : 'Milestones');
      const periodLabel = typeof item.periodLabel === 'string' && item.periodLabel.trim() ? item.periodLabel.trim() : (current ? 'Academic & Core Roles' : 'Competitive Sprints');

      // Human-readable time badge
      const time = typeof item.time === 'string' && item.time.trim()
        ? item.time.trim()
        : (startDate ? `${startDate} — ${current ? 'Present' : (endDate || '')}` : 'Present');

      // Skills array
      const skills = Array.isArray(item.skills)
        ? item.skills.filter(s => typeof s === 'string' && s.trim()).map(s => s.trim())
        : [];

      // Links map with protocol validation
      const links = {};
      if (item.links && typeof item.links === 'object' && !Array.isArray(item.links)) {
        for (const [key, val] of Object.entries(item.links)) {
          if (typeof val === 'string' && isValidHttpUrl(val)) {
            links[key] = val.trim();
          }
        }
      }

      validatedItems.push({
        id,
        title,
        organization,
        type,
        tag,
        location,
        startDate,
        endDate,
        current,
        time,
        period,
        periodLabel,
        description,
        detail: description, // alias for existing JourneySection component compatibility
        skills,
        links,
        color,
        order
      });
    }

    // Deterministic sorting:
    // 1. Explicit order ascending (1, 2, 3...)
    // 2. Current roles first
    // 3. Newest start date descending
    // 4. Stable fallback by id
    validatedItems.sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      if (a.current !== b.current) {
        return a.current ? -1 : 1;
      }
      const dateA = a.startDate || '';
      const dateB = b.startDate || '';
      if (dateB !== dateA) {
        return dateB.localeCompare(dateA);
      }
      return a.id.localeCompare(b.id);
    });

    return validatedItems;
  }
};

export default experienceService;
