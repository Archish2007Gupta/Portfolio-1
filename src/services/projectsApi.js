import { githubRepos } from '../data/portfolioData.js';

const GITHUB_USERNAME = 'Archish2007Gupta';

/**
 * Fetch public repositories directly from the GitHub API (no auth token needed).
 * Returns data in the same shape as the old /api/projects endpoint.
 * Falls back to the static githubRepos list from portfolioData.js on failure.
 * @returns {Promise<{ success: boolean, projects: Array }>}
 */
export async function getProjects() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`,
      { headers: { Accept: 'application/vnd.github+json' } }
    );

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const repos = await res.json();

    if (!Array.isArray(repos)) throw new Error('Unexpected GitHub response');

    const projects = repos
      .filter(r => !r.fork)
      .map(r => {
        const topics = Array.isArray(r.topics) ? r.topics.map(t => String(t).toLowerCase().trim()) : [];
        const hasPortfolio = topics.includes('portfolio');
        const hasFeatured = topics.includes('featured');
        const hasPractice = topics.includes('practice');
        let classification = 'github';
        if (hasPortfolio && hasFeatured) classification = 'selected';
        else if (hasPortfolio) classification = 'portfolio';
        else if (hasPractice) classification = 'practice';

        return {
          id: r.id,
          name: r.name,
          full_name: r.full_name,
          description: r.description || '',
          language: r.language || null,
          topics,
          stars: r.stargazers_count || 0,
          forks: r.forks_count || 0,
          html_url: r.html_url,
          homepage: r.homepage || null,
          pushed_at: r.pushed_at,
          classification,
          is_featured: classification === 'selected' ? 1 : 0,
        };
      });

    return { success: true, projects };
  } catch (err) {
    console.warn('[PROJECTS API] GitHub fetch failed, using static fallback:', err.message);
    // Fallback: convert static githubRepos to the projects shape
    const fallback = githubRepos.map(r => ({
      id: r.name,
      name: r.name,
      full_name: `${GITHUB_USERNAME}/${r.name}`,
      description: r.desc || '',
      language: r.lang || null,
      langColor: r.langColor,
      topics: [],
      stars: r.stars || 0,
      forks: r.forks || 0,
      html_url: r.url || `https://github.com/${GITHUB_USERNAME}/${r.name}`,
      homepage: null,
      classification: 'github',
      is_featured: 0,
    }));
    return { success: true, projects: fallback };
  }
}

export default { getProjects };
