import { skillsData } from '../data/portfolioData.js';

/**
 * Returns hardcoded skills data (previously fetched from /api/skills).
 * No backend required — data is sourced directly from portfolioData.js.
 * @returns {Promise<{ success: boolean, skills: Array }>}
 */
export async function getSkills() {
  return { success: true, skills: skillsData };
}

export default { getSkills };
