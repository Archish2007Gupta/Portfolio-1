import env from '../config/env.js';

/**
 * Service stub for GitHub API integration.
 * Will fetch repository data and maintain local SQLite cache in future phase.
 */
export const githubService = {
  async fetchRepositories() {
    // To be implemented in the GitHub projects phase
    return [];
  },

  async syncProjects() {
    // To be implemented in the GitHub projects phase
    return { synced: 0 };
  }
};

export default githubService;
