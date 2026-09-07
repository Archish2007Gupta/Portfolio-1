import { request } from './api.js';

/**
 * Fetch dynamic technology stack and skills from the portfolio backend.
 * Primary source of truth: GitHub repositories (+ optional server/data/skills.json curation).
 * @returns {Promise<{ success: boolean, skills: Array }>}
 */
export async function getSkills() {
  return await request('/api/skills', {
    method: 'GET'
  });
}

export default { getSkills };
