import fs from 'fs';
import path from 'path';
import env from '../config/env.js';
import { getDb } from '../db/database.js';
import githubService from './github.service.js';

/**
 * Recognized Canonical Technologies & Category Map.
 * Used for normalization, deduplication, and conservative detection.
 */
const CANONICAL_TECH = [
  // Languages
  { id: 'javascript', name: 'JavaScript', category: 'Languages', aliases: ['javascript', 'js', 'es6', 'es6+'] },
  { id: 'typescript', name: 'TypeScript', category: 'Languages', aliases: ['typescript', 'ts'] },
  { id: 'python', name: 'Python', category: 'Languages', aliases: ['python', 'py'] },
  { id: 'c-plus-plus', name: 'C++', category: 'Languages', aliases: ['c++', 'cpp'] },
  { id: 'c', name: 'C', category: 'Languages', aliases: ['c'] },
  { id: 'html', name: 'HTML', category: 'Frontend', aliases: ['html', 'html5'] },
  { id: 'css', name: 'CSS', category: 'Frontend', aliases: ['css', 'css3'] },

  // Frontend
  { id: 'react', name: 'React', category: 'Frontend', aliases: ['react', 'reactjs', 'react.js'] },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', aliases: ['tailwind', 'tailwindcss'] },
  { id: 'vite', name: 'Vite', category: 'Frontend', aliases: ['vite', 'vitejs'] },
  { id: 'nextjs', name: 'Next.js', category: 'Frontend', aliases: ['nextjs', 'next.js', 'next'] },

  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'Backend', aliases: ['node', 'nodejs', 'node.js'] },
  { id: 'express', name: 'Express', category: 'Backend', aliases: ['express', 'expressjs', 'express.js'] },
  { id: 'flask', name: 'Flask', category: 'Backend', aliases: ['flask'] },
  { id: 'websockets', name: 'WebSockets', category: 'Backend', aliases: ['websocket', 'websockets'] },

  // Database
  { id: 'sqlite', name: 'SQLite', category: 'Database', aliases: ['sqlite', 'sqlite3'] },
  { id: 'supabase', name: 'Supabase', category: 'Database', aliases: ['supabase'] },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Database', aliases: ['postgres', 'postgresql'] },
  { id: 'mysql', name: 'MySQL', category: 'Database', aliases: ['mysql'] },

  // AI / ML (Conservative allowlist, Prompt Engineering explicitly excluded per correction #2)
  { id: 'tensorflow', name: 'TensorFlow', category: 'AI / ML', aliases: ['tensorflow', 'tf'] },
  { id: 'opencv', name: 'OpenCV', category: 'AI / ML', aliases: ['opencv', 'cv2'] },
  { id: 'pytorch', name: 'PyTorch', category: 'AI / ML', aliases: ['pytorch', 'torch'] },

  // Tools
  { id: 'git', name: 'Git', category: 'Tools', aliases: ['git'] },
  { id: 'github', name: 'GitHub', category: 'Tools', aliases: ['github'] },
  { id: 'figma', name: 'Figma', category: 'Tools', aliases: ['figma'] },
  { id: 'canva', name: 'Canva', category: 'Tools', aliases: ['canva'] },

  // Hardware / IoT
  { id: 'esp32', name: 'ESP32', category: 'Hardware / IoT', aliases: ['esp32', 'esp-32'] },
  { id: 'arduino', name: 'Arduino', category: 'Hardware / IoT', aliases: ['arduino'] }
];

// Lookup maps for fast canonical lookup
const ALIAS_TO_CANONICAL = new Map();
for (const tech of CANONICAL_TECH) {
  for (const alias of tech.aliases) {
    ALIAS_TO_CANONICAL.set(alias.toLowerCase().trim(), tech);
  }
}

/**
 * Normalize an arbitrary tech string/alias to its canonical tech definition.
 * Returns null if not recognized in the canonical allowlist.
 */
export function normalizeTech(rawStr) {
  if (typeof rawStr !== 'string' || !rawStr.trim()) return null;
  const cleaned = rawStr.toLowerCase().trim().replace(/^[#\-_.]+/, '').replace(/[#\-_.]+$/, '');
  return ALIAS_TO_CANONICAL.get(cleaned) || null;
}

/**
 * Conservative README detection:
 * Detects technologies ONLY from unambiguous usage phrases (e.g. "built with React", "tech stack: React, Vite").
 * Rejects speculative phrases like "Future improvements may include Docker" or "Similar projects use Kubernetes".
 * Never detects "Prompt Engineering".
 * @param {string} text - Cleaned description or README text
 * @returns {Set<string>} Set of canonical tech IDs detected
 */
export function extractConservativeTechFromText(text) {
  const detectedIds = new Set();
  if (!text || typeof text !== 'string') return detectedIds;

  // Patterns indicating active implementation of technologies
  const activeUsagePatterns = [
    /(?:built\s+(?:with|using)|tech\s*stack|technologies\s*used|stack\s*:|tools\s*:|powered\s*by|developed\s*(?:with|using)|written\s*in)\s*[:\-]?\s*([^\n\r.]+)/gi,
    /(?:made\s+(?:with|using|colon\s+of\s+[^.\n]+using))\s*[:\-]?\s*([^\n\r.]+)/gi
  ];

  for (const pattern of activeUsagePatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const segment = match[1] || '';
      
      // Tokenize the matched segment by commas, slashes, ampersands, or 'and'
      const tokens = segment.split(/[,/&+|\s]+/).map(t => t.trim()).filter(Boolean);
      for (const token of tokens) {
        const canonical = normalizeTech(token);
        if (canonical) {
          detectedIds.add(canonical.id);
        }
      }
    }
  }

  return detectedIds;
}

export const skillsService = {
  /**
   * Get the absolute path to skills.json with path traversal protection.
   */
  getSkillsFilePath() {
    const dataDir = path.resolve(env.PATHS.DATA_DIR);
    const resolvedPath = path.resolve(dataDir, 'skills.json');
    if (!resolvedPath.startsWith(dataDir)) {
      throw new Error('Path traversal attempt detected in skills file path');
    }
    return resolvedPath;
  },

  /**
   * Read optional skills.json overrides and additional curation.
   */
  readSkillsOverrideFile() {
    const filePath = this.getSkillsFilePath();
    if (!fs.existsSync(filePath)) {
      return { overrides: [], additional: [], hidden: [] };
    }

    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        overrides: Array.isArray(parsed.overrides) ? parsed.overrides : [],
        additional: Array.isArray(parsed.additional) ? parsed.additional : [],
        hidden: Array.isArray(parsed.hidden) ? parsed.hidden : []
      };
    } catch (err) {
      console.warn('[SKILLS SERVICE] Could not parse skills.json, using defaults:', err.message);
      return { overrides: [], additional: [], hidden: [] };
    }
  },

  /**
   * Load project records from SQLite projects_cache.
   * If empty, attempts safe sync using githubService.
   */
  async loadProjects() {
    const db = getDb();
    let rows = db.prepare(`
      SELECT name, language, topics, description, data_json
      FROM projects_cache
    `).all();

    if (!rows || rows.length === 0) {
      // Empty cache: attempt to sync using Phase 5 githubService
      try {
        console.info('[SKILLS SERVICE] projects_cache is empty. Triggering GitHub sync...');
        await githubService.syncProjects();
        rows = db.prepare(`
          SELECT name, language, topics, description, data_json
          FROM projects_cache
        `).all();
      } catch (syncErr) {
        console.warn('[SKILLS SERVICE] GitHub sync failed, proceeding with available cache:', syncErr.message);
      }
    }

    const projects = [];
    for (const row of rows || []) {
      try {
        let topics = [];
        if (row.topics) {
          topics = typeof row.topics === 'string' ? JSON.parse(row.topics) : row.topics;
        }

        let description = row.description || '';
        if (row.data_json) {
          try {
            const data = JSON.parse(row.data_json);
            if (data.description && !description) description = data.description;
            if (Array.isArray(data.topics) && (!topics || topics.length === 0)) topics = data.topics;
          } catch {
            // Ignore malformed row json
          }
        }

        projects.push({
          name: row.name,
          language: row.language,
          topics: Array.isArray(topics) ? topics : [],
          description
        });
      } catch {
        // Skip unparseable row
      }
    }

    return projects;
  },

  /**
   * Aggregate and normalize skills from GitHub projects and skills.json.
   * Single source of truth: GitHub repositories + optional skills.json overrides.
   * @returns {Promise<Array<object>>}
   */
  async getSkills() {
    const projects = await this.loadProjects();
    const { overrides, additional, hidden } = this.readSkillsOverrideFile();
    const hiddenSet = new Set(hidden.map(id => String(id).toLowerCase().trim()));

    // Map: canonicalId -> { canonicalDef, projects: Set<string> }
    const detectedSkillsMap = new Map();

    for (const proj of projects) {
      const projectName = proj.name;
      const projTechIds = new Set();

      // 1. Primary repository language
      if (proj.language) {
        const canonical = normalizeTech(proj.language);
        if (canonical) {
          projTechIds.add(canonical.id);
        }
      }

      // 2. Repository topics
      for (const topic of proj.topics) {
        // Exclude meta classification topics
        if (['portfolio', 'featured', 'practice'].includes(topic) || topic.startsWith('portfolio-order-')) {
          continue;
        }
        const canonical = normalizeTech(topic);
        if (canonical) {
          projTechIds.add(canonical.id);
        }
      }

      // 3. Conservative description / README extraction
      if (proj.description) {
        const fromDesc = extractConservativeTechFromText(proj.description);
        for (const techId of fromDesc) {
          projTechIds.add(techId);
        }
      }

      // Associate each detected tech with this unique repository
      for (const techId of projTechIds) {
        if (!detectedSkillsMap.has(techId)) {
          const canonicalDef = CANONICAL_TECH.find(t => t.id === techId);
          if (canonicalDef) {
            detectedSkillsMap.set(techId, {
              id: canonicalDef.id,
              name: canonicalDef.name,
              category: canonicalDef.category,
              source: 'github',
              projects: new Set(),
              icon: null,
              order: 9999
            });
          }
        }
        detectedSkillsMap.get(techId).projects.add(projectName);
      }
    }

    // Convert detected skills to list
    const finalSkillsMap = new Map();

    for (const [id, skillData] of detectedSkillsMap.entries()) {
      if (hiddenSet.has(id)) continue;

      finalSkillsMap.set(id, {
        id: skillData.id,
        name: skillData.name,
        category: skillData.category,
        source: 'github',
        count: skillData.projects.size,
        projects: Array.from(skillData.projects).sort((a, b) => a.localeCompare(b)),
        icon: skillData.icon,
        order: skillData.order
      });
    }

    // Apply manual additional curation (Rule 3: do not duplicate if already detected from GitHub)
    for (const addSkill of additional) {
      if (!addSkill || !addSkill.id) continue;
      const normId = addSkill.id.toLowerCase().trim();
      if (hiddenSet.has(normId)) continue;

      if (!finalSkillsMap.has(normId)) {
        finalSkillsMap.set(normId, {
          id: normId,
          name: addSkill.name || normId,
          category: addSkill.category || 'Other',
          source: 'manual',
          count: typeof addSkill.count === 'number' ? addSkill.count : 0,
          projects: Array.isArray(addSkill.projects) ? addSkill.projects : [],
          icon: addSkill.icon || null,
          order: typeof addSkill.order === 'number' ? addSkill.order : 9999
        });
      }
    }

    // Apply overrides (presentation metadata, custom display names, categories, ordering)
    for (const ov of overrides) {
      if (!ov || !ov.id) continue;
      const normId = ov.id.toLowerCase().trim();
      const existing = finalSkillsMap.get(normId);
      if (existing) {
        if (ov.name) existing.name = ov.name;
        if (ov.category) existing.category = ov.category;
        if (typeof ov.order === 'number') existing.order = ov.order;
        if (ov.icon !== undefined) existing.icon = ov.icon;
      }
    }

    const skillsList = Array.from(finalSkillsMap.values());

    // Deterministic sorting:
    // 1. Explicit order ascending (1, 2, 3...)
    // 2. Count descending (more used repos first)
    // 3. Name alphabetically
    skillsList.sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.name.localeCompare(b.name);
    });

    return skillsList;
  }
};

export default skillsService;
