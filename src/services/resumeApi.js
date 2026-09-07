import { request } from './api.js';

/**
 * Fetch dynamic resume metadata from the portfolio backend.
 * Single source of truth: public/resume/resume.pdf via GET /api/resume.
 * @returns {Promise<{ success: boolean, available: boolean, url?: string, filename?: string, size?: number, updatedAt?: string, downloadUrl?: string }>}
 */
export async function getResumeMetadata() {
  try {
    const data = await request('/api/resume', {
      method: 'GET'
    });
    return data || { success: true, available: false };
  } catch (err) {
    console.warn('[RESUME API] Failed to fetch resume metadata:', err.message);
    return { success: true, available: false };
  }
}

export default { getResumeMetadata };
