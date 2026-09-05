import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Search for .env in current directory, server/, and project root
const serverDir = path.resolve(__dirname, '..');
const rootDir = path.resolve(serverDir, '..');

const envPaths = [
  path.join(rootDir, '.env'),
  path.join(serverDir, '.env')
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

export const env = Object.freeze({
  NODE_ENV: process.env.NODE_ENV || 'development',
  isProduction: (process.env.NODE_ENV || 'development') === 'production',
  PORT: parseInt(process.env.PORT || '5000', 10),
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  GITHUB_USERNAME: process.env.GITHUB_USERNAME || 'Archish2007Gupta',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin',
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH || '',
  SESSION_SECRET: process.env.SESSION_SECRET || 'dev_secret_fallback_key_32_characters',
  
  // File and Database Paths
  PATHS: {
    ROOT: rootDir,
    SERVER: serverDir,
    DATA_DIR: path.join(serverDir, 'data'),
    DB_FILE: path.join(serverDir, 'data', 'portfolio.db'),
    SCHEMA_FILE: path.join(serverDir, 'db', 'schema.sql')
  }
});

// Basic sanity warnings for production
if (env.isProduction) {
  if (!process.env.CLIENT_ORIGIN) {
    console.warn('[CONFIG WARNING] CLIENT_ORIGIN is not explicitly set in production.');
  }
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.includes('dev_secret')) {
    console.warn('[CONFIG WARNING] SESSION_SECRET is using a default insecure value in production.');
  }
}

export default env;
