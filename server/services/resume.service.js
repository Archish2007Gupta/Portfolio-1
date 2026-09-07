import fs from 'fs';
import path from 'path';
import env from '../config/env.js';

const RESUME_FILENAME = 'resume.pdf';

/**
 * Checks if the file at the given path starts with PDF magic bytes (%PDF-).
 * @param {string} filePath 
 * @returns {boolean}
 */
function isValidPdfFile(filePath) {
  try {
    const stats = fs.statSync(filePath);
    if (!stats.isFile() || stats.size < 5) {
      return false;
    }

    const buffer = Buffer.alloc(5);
    const fd = fs.openSync(filePath, 'r');
    fs.readSync(fd, buffer, 0, 5, 0);
    fs.closeSync(fd);

    // %PDF- magic bytes: 0x25, 0x50, 0x44, 0x46, 0x2d
    return buffer.toString('utf-8').startsWith('%PDF-');
  } catch (err) {
    return false;
  }
}

export const resumeService = {
  /**
   * Get the verified directory for resume storage.
   * Path traversal protected.
   * @returns {string}
   */
  getResumeDir() {
    return path.resolve(env.PATHS.ROOT, 'public', 'resume');
  },

  /**
   * Resolves and verifies the path of the resume file.
   * Prevents path traversal outside public/resume/.
   * @param {string} [customFilename]
   * @returns {string|null} Resolved path, or null if traversal attempt or invalid extension
   */
  resolveResumePath(customFilename = RESUME_FILENAME) {
    const resumeDir = this.getResumeDir();
    // Strictly disallow path separators or non-pdf extensions in requested filenames
    const sanitized = path.basename(customFilename);
    if (!sanitized.toLowerCase().endsWith('.pdf')) {
      return null;
    }

    const resolved = path.resolve(resumeDir, sanitized);
    // Path traversal check
    if (!resolved.startsWith(resumeDir + path.sep) && resolved !== path.join(resumeDir, sanitized)) {
      return null;
    }

    return resolved;
  },

  /**
   * Retrieves safe metadata for the active resume.
   * Single source of truth: public/resume/resume.pdf.
   * Does NOT leak any server filesystem paths or secrets.
   * @returns {Promise<{ available: boolean, url?: string, filename?: string, size?: number, updatedAt?: string, downloadUrl?: string }>}
   */
  async getResumeMetadata() {
    const filePath = this.resolveResumePath(RESUME_FILENAME);

    if (!filePath || !fs.existsSync(filePath)) {
      return {
        available: false
      };
    }

    if (!isValidPdfFile(filePath)) {
      return {
        available: false
      };
    }

    try {
      const stats = await fs.promises.stat(filePath);
      return {
        available: true,
        url: `/resume/${RESUME_FILENAME}`,
        filename: RESUME_FILENAME,
        size: stats.size,
        updatedAt: stats.mtime.toISOString(),
        downloadUrl: '/api/resume/download'
      };
    } catch (err) {
      return {
        available: false
      };
    }
  },

  /**
   * Returns verified file path for streaming/download if it exists and is a valid PDF.
   * @returns {string|null}
   */
  getVerifiedFilePath() {
    const filePath = this.resolveResumePath(RESUME_FILENAME);
    if (!filePath || !fs.existsSync(filePath) || !isValidPdfFile(filePath)) {
      return null;
    }
    return filePath;
  }
};

export default resumeService;
