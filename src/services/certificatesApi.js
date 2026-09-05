import { request } from './api.js';

/**
 * Certificates API client service (prepared for future certificates phase)
 */
export async function getCertificates() {
  return await request('/api/certificates', {
    method: 'GET'
  });
}

export default { getCertificates };
