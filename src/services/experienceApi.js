import { experienceData } from '../data/portfolioData.js';

/**
 * Returns hardcoded experience data (previously fetched from /api/experience).
 * No backend required — data is sourced directly from portfolioData.js.
 * @returns {Promise<{ success: boolean, experience: Array }>}
 */
export async function getExperience() {
  return { success: true, experience: experienceData };
}

export default { getExperience };
