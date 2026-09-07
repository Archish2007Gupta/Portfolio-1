import { request } from './api.js';

/**
 * Fetch dynamic experience and timeline records from the portfolio backend.
 * Single source of truth: server/data/experience.json via GET /api/experience.
 * @returns {Promise<{ success: boolean, experience: Array }>}
 */
export async function getExperience() {
  return await request('/api/experience', {
    method: 'GET'
  });
}

export default { getExperience };
