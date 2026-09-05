import fs from 'fs';
import path from 'path';
import env from '../config/env.js';

// Supported certificate file extensions (lowercase)
const SUPPORTED_EXTENSIONS = new Set(['.pdf', '.png', '.jpg', '.jpeg', '.webp']);

/**
 * Format a human-readable title from a certificate filename.
 * Strips extension, replaces underscores and hyphens with spaces,
 * and capitalizes words cleanly.
 * Does NOT invent issuers, dates, or false facts.
 */
function formatTitleFromFilename(filename) {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);

  // Replace separators with spaces
  const cleaned = base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!cleaned) return filename;

  // Title-case words nicely
  return cleaned
    .split(' ')
    .map(word => {
      if (/^[A-Z0-9]+$/.test(word)) return word; // preserve acronyms like AI, MATLAB, CSE
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export const certificateService = {
  /**
   * Get the absolute path to the certificates directory
   */
  getCertificatesDir() {
    return path.join(env.PATHS.ROOT, 'public', 'certificates');
  },

  /**
   * Read optional metadata file (public/certificates/certificates.json) if present.
   * Returns a map keyed by normalized filename.
   */
  readMetadataFile(certsDir) {
    const metaFilePath = path.join(certsDir, 'certificates.json');
    if (!fs.existsSync(metaFilePath)) {
      return new Map();
    }

    try {
      const rawContent = fs.readFileSync(metaFilePath, 'utf-8');
      const parsed = JSON.parse(rawContent);
      const metaMap = new Map();

      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (item && item.filename) {
            metaMap.set(item.filename.toLowerCase().trim(), item);
          }
        }
      }
      return metaMap;
    } catch (err) {
      console.warn('[CERTIFICATE SERVICE] Could not parse certificates.json metadata file:', err.message);
      return new Map();
    }
  },

  /**
   * Scan public/certificates/ and return normalized certificate records.
   * Single source of truth: the filesystem.
   */
  async getCertificates() {
    const certsDir = this.getCertificatesDir();

    // If directory does not exist, return empty array gracefully
    if (!fs.existsSync(certsDir)) {
      console.warn(`[CERTIFICATE SERVICE] Certificate folder does not exist at ${certsDir}`);
      return [];
    }

    let dirents;
    try {
      dirents = await fs.promises.readdir(certsDir, { withFileTypes: true });
    } catch (err) {
      console.error('[CERTIFICATE SERVICE] Error reading certificate directory:', err.message);
      return [];
    }

    // Load optional certificates.json metadata
    const metadataMap = this.readMetadataFile(certsDir);

    const certificates = [];

    for (const dirent of dirents) {
      // Only process files, ignore directories and dotfiles
      if (!dirent.isFile() || dirent.name.startsWith('.')) {
        continue;
      }

      const filename = dirent.name;
      const ext = path.extname(filename).toLowerCase();

      // Ignore unsupported extensions (.json, .txt, .env, .js, etc.)
      if (!SUPPORTED_EXTENSIONS.has(ext)) {
        continue;
      }

      // Prevent path traversal or unsafe filenames
      if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        continue;
      }

      const filePath = path.join(certsDir, filename);

      let stat;
      try {
        stat = await fs.promises.stat(filePath);
      } catch (statErr) {
        console.warn(`[CERTIFICATE SERVICE] Could not stat file ${filename}:`, statErr.message);
        continue;
      }

      const fileType = ext.slice(1); // 'pdf', 'png', 'jpg', etc.
      const meta = metadataMap.get(filename.toLowerCase()) || {};

      // Build safe clean certificate record
      const title = meta.title && meta.title.trim() ? meta.title.trim() : formatTitleFromFilename(filename);
      const issuer = meta.issuer && meta.issuer.trim() ? meta.issuer.trim() : null;
      const date = meta.date && meta.date.trim() ? meta.date.trim() : null;
      const category = meta.category && meta.category.trim() ? meta.category.trim() : (fileType === 'pdf' ? 'Academic / Technical Document' : 'Verified Accreditation');
      const order = typeof meta.order === 'number' ? meta.order : 9999;
      const credentialId = meta.credentialId || null;
      const tags = Array.isArray(meta.tags) ? meta.tags : [category, issuer].filter(Boolean);
      const description = meta.description || `Official accreditation document: ${title}`;

      // Slug ID for stable frontend keying
      const id = filename.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

      const fileUrl = `/certificates/${encodeURIComponent(filename)}`;

      certificates.push({
        id,
        filename,
        title,
        issuer,
        date,
        category,
        credentialId,
        tags,
        description,
        fileUrl,
        file: fileUrl, // alias for existing CertificatesGallery compatibility
        fileType,
        size: stat.size,
        modifiedAt: stat.mtime.toISOString(),
        order
      });
    }

    // Deterministic sorting:
    // 1. Explicit order ascending (1, 2, ...)
    // 2. Modified date descending (newest first)
    // 3. Filename alphabetically
    certificates.sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      const timeA = new Date(a.modifiedAt).getTime();
      const timeB = new Date(b.modifiedAt).getTime();
      if (timeB !== timeA) {
        return timeB - timeA;
      }
      return a.filename.localeCompare(b.filename);
    });

    return certificates;
  }
};

export default certificateService;
