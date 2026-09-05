import fs from 'fs';
import path from 'path';
import env from '../config/env.js';

/**
 * Service stub for local certificate filesystem management.
 * Will index public/certificates/ and serve certificate metadata in future phase.
 */
export const certificateService = {
  async getCertificates() {
    // To be implemented in the certificates phase
    return [];
  },

  async syncLocalCertificates() {
    // To be implemented in the certificates phase
    return { synced: 0 };
  }
};

export default certificateService;
