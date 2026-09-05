import env from '../config/env.js';
import { getDb } from '../db/database.js';

/**
 * Clean and extract a short plain-text summary from markdown README content.
 * Strips HTML tags, markdown links/images, badges, and headings.
 */
function extractSummaryFromReadme(rawReadme) {
  if (!rawReadme || typeof rawReadme !== 'string') return '';
  
  // Remove HTML comments and tags
  let text = rawReadme.replace(/<!--[\s\S]*?-->/g, '');
  text = text.replace(/<[^>]*>/g, '');
  
  // Remove markdown badges / images [![...](...)](...)
  text = text.replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, '');
  text = text.replace(/!\[.*?\]\(.*?\)/g, '');

  // Split into lines
  const lines = text.split('\n');
  const paragraphs = [];
  let currentPara = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    // Skip empty lines, headings, blockquotes, code fences, horizontal rules
    if (!line || line.startsWith('#') || line.startsWith('```') || line.startsWith('---') || line.startsWith('>')) {
      if (currentPara.length > 0) {
        paragraphs.push(currentPara.join(' '));
        currentPara = [];
      }
      continue;
    }
    // Skip badges or markdown links on their own line
    if (line.startsWith('[![') || (line.startsWith('[') && line.endsWith(')'))) {
      continue;
    }
    currentPara.push(line);
  }
  if (currentPara.length > 0) {
    paragraphs.push(currentPara.join(' '));
  }

  // Find the first meaningful paragraph with >= 20 characters
  const summaryPara = paragraphs.find(p => p.length >= 20) || paragraphs[0] || '';
  // Strip inline markdown formatting like [link](url), **bold**, `code`
  const cleaned = summaryPara
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[*_~`]/g, '')
    .trim();

  if (cleaned.length > 280) {
    return cleaned.slice(0, 277) + '...';
  }
  return cleaned;
}

export const githubService = {
  /**
   * Helper to build safe GitHub API request headers
   */
  getHeaders(useAuth = true) {
    const headers = {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'Portfolio-Backend-App'
    };

    const token = env.GITHUB_TOKEN;
    if (useAuth && token && !token.includes('placeholder') && token.trim().length > 10) {
      headers['Authorization'] = `Bearer ${token.trim()}`;
    }

    return headers;
  },

  /**
   * Fetch public repositories for configured GITHUB_USERNAME
   */
  async fetchRepositories(username = env.GITHUB_USERNAME) {
    const targetUser = username || 'Archish2007Gupta';
    const url = `https://api.github.com/users/${encodeURIComponent(targetUser)}/repos?sort=pushed&per_page=100`;

    let res = await fetch(url, { headers: this.getHeaders(true) });

    // Fall back to unauthenticated request if token was invalid/expired (401 Bad credentials)
    if (res.status === 401) {
      console.warn('[GITHUB SERVICE] Authenticated request returned 401 (bad token). Retrying unauthenticated...');
      res = await fetch(url, { headers: this.getHeaders(false) });
    }

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`GitHub API request failed (${res.status}): ${errText || res.statusText}`);
    }

    const repos = await res.json();
    if (!Array.isArray(repos)) {
      throw new Error('Unexpected GitHub API response: expected array of repositories');
    }

    // Exclude forks
    return repos.filter(repo => !repo.fork);
  },

  /**
   * Fetch repository README to supply description if missing
   */
  async fetchReadme(owner, repo) {
    try {
      const url = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`;
      const headers = this.getHeaders(true);
      headers['Accept'] = 'application/vnd.github.raw+json';

      let res = await fetch(url, { headers });
      if (res.status === 401) {
        headers['Accept'] = 'application/vnd.github.raw+json';
        delete headers['Authorization'];
        res = await fetch(url, { headers });
      }

      if (!res.ok) return null;
      return await res.text();
    } catch {
      return null;
    }
  },

  /**
   * Normalize a raw GitHub repository object into the canonical portfolio project format
   */
  normalizeProject(repo, readmeContent = null) {
    // 1. Normalize topics to lowercase trimmed strings
    const rawTopics = Array.isArray(repo.topics) ? repo.topics : [];
    const topics = rawTopics.map(t => String(t).toLowerCase().trim());

    // 2. Classification rule (strictly topic-based)
    // Rule 1 & 2: portfolio + featured => selected
    // Rule 3: portfolio (without featured) => portfolio
    // Rule 4: practice => practice
    // Rule 5: other => github
    let classification = 'github';
    const hasPortfolio = topics.includes('portfolio');
    const hasFeatured = topics.includes('featured');
    const hasPractice = topics.includes('practice');

    if (hasPortfolio && hasFeatured) {
      classification = 'selected';
    } else if (hasPortfolio) {
      classification = 'portfolio';
    } else if (hasPractice) {
      classification = 'practice';
    }

    // 3. Ordering rule: portfolio-order-XX
    let order = 9999;
    const orderTopic = topics.find(t => /^portfolio-order-(\d+)$/.test(t));
    if (orderTopic) {
      const match = orderTopic.match(/^portfolio-order-(\d+)$/);
      if (match && match[1]) {
        order = parseInt(match[1], 10);
      }
    }

    // 4. Description rule: GitHub description -> README extract -> ""
    let description = '';
    if (repo.description && repo.description.trim().length > 0) {
      description = repo.description.trim();
    } else if (readmeContent) {
      description = extractSummaryFromReadme(readmeContent);
    }

    // 5. Tech stack & highlights derivation
    const techStack = [];
    if (repo.language) {
      techStack.push(repo.language);
    }
    // Add technical topics (excluding structural classification topics)
    const nonMetaTopics = topics.filter(
      t => !['portfolio', 'featured', 'practice'].includes(t) && !t.startsWith('portfolio-order-')
    );
    for (const t of nonMetaTopics) {
      // Capitalize cleanly
      const formatted = t.length <= 3 ? t.toUpperCase() : t.charAt(0).toUpperCase() + t.slice(1);
      if (!techStack.includes(formatted)) {
        techStack.push(formatted);
      }
    }

    return {
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description,
      language: repo.language || null,
      topics,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      html_url: repo.html_url,
      homepage: repo.homepage && repo.homepage.trim() ? repo.homepage.trim() : null,
      default_branch: repo.default_branch || 'main',
      owner: repo.owner?.login || env.GITHUB_USERNAME,
      readme: readmeContent ? true : false,
      classification,
      is_featured: classification === 'selected' ? 1 : 0,
      order,
      techStack,
      highlights: []
    };
  },

  /**
   * Fetch, normalize, and update SQLite projects_cache.
   * Atomic operation using better-sqlite3 transaction.
   */
  async syncProjects() {
    const rawRepos = await this.fetchRepositories();
    const normalizedList = [];

    for (const repo of rawRepos) {
      let readme = null;
      // Only fetch README if description is completely empty to save rate limits
      if (!repo.description || repo.description.trim().length === 0) {
        readme = await this.fetchReadme(repo.owner?.login || env.GITHUB_USERNAME, repo.name);
      }
      const project = this.normalizeProject(repo, readme);
      normalizedList.push(project);
    }

    // Sort: custom order ascending (e.g. 1, 2, ...), then newest pushed_at first
    normalizedList.sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      const dateA = new Date(a.pushed_at || 0).getTime();
      const dateB = new Date(b.pushed_at || 0).getTime();
      return dateB - dateA;
    });

    // Atomic SQLite cache update
    const db = getDb();
    const upsertStmt = db.prepare(`
      INSERT INTO projects_cache (
        github_id, name, full_name, description, html_url, homepage,
        topics, stars, forks, language, created_at_gh, updated_at,
        pushed_at, default_branch, owner, classification, is_featured,
        custom_order, data_json, cached_at, last_synced
      ) VALUES (
        @github_id, @name, @full_name, @description, @html_url, @homepage,
        @topics, @stars, @forks, @language, @created_at_gh, @updated_at,
        @pushed_at, @default_branch, @owner, @classification, @is_featured,
        @custom_order, @data_json, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      )
      ON CONFLICT(github_id) DO UPDATE SET
        name = excluded.name,
        full_name = excluded.full_name,
        description = excluded.description,
        html_url = excluded.html_url,
        homepage = excluded.homepage,
        topics = excluded.topics,
        stars = excluded.stars,
        forks = excluded.forks,
        language = excluded.language,
        created_at_gh = excluded.created_at_gh,
        updated_at = excluded.updated_at,
        pushed_at = excluded.pushed_at,
        default_branch = excluded.default_branch,
        owner = excluded.owner,
        classification = excluded.classification,
        is_featured = excluded.is_featured,
        custom_order = excluded.custom_order,
        data_json = excluded.data_json,
        cached_at = CURRENT_TIMESTAMP,
        last_synced = CURRENT_TIMESTAMP
    `);

    // Fetch existing active github_ids to purge repos that were deleted on GitHub
    const activeIds = new Set(normalizedList.map(p => p.id));

    const syncTransaction = db.transaction(() => {
      for (const p of normalizedList) {
        upsertStmt.run({
          github_id: p.id,
          name: p.name,
          full_name: p.full_name,
          description: p.description,
          html_url: p.html_url,
          homepage: p.homepage,
          topics: JSON.stringify(p.topics),
          stars: p.stars,
          forks: p.forks,
          language: p.language,
          created_at_gh: p.created_at,
          updated_at: p.updated_at,
          pushed_at: p.pushed_at,
          default_branch: p.default_branch,
          owner: p.owner,
          classification: p.classification,
          is_featured: p.is_featured,
          custom_order: p.order,
          data_json: JSON.stringify(p)
        });
      }

      // Delete any cached projects that no longer exist in GitHub response
      const allCached = db.prepare('SELECT github_id FROM projects_cache').all();
      for (const row of allCached) {
        if (!activeIds.has(row.github_id)) {
          db.prepare('DELETE FROM projects_cache WHERE github_id = ?').run(row.github_id);
        }
      }
    });

    syncTransaction();

    return normalizedList;
  }
};

export default githubService;
