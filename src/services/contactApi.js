import { request } from './api.js';

/**
 * Submit contact message to /api/contact
 * @param {{ name: string, email: string, subject?: string, message: string }} payload
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function submitContact(payload) {
  return await request('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export default { submitContact };
