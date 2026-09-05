import { request } from './api.js';

/**
 * Fetch dynamic project metadata from the portfolio backend.
 * Uses cached GitHub data from SQLite /api/projects.
 * @returns {Promise<{ success: boolean, projects: Array }>}
 */
export async function getProjects() {
  return await request('/api/projects', {
    method: 'GET'
  });
}

export default { getProjects };
