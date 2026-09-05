import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import env from '../config/env.js';

let dbInstance = null;

/**
 * Initializes the SQLite database connection and runs schema migrations.
 * @returns {Database.Database} SQLite database instance
 */
export function initDatabase() {
  if (dbInstance) {
    return dbInstance;
  }

  // Ensure data directory exists
  if (!fs.existsSync(env.PATHS.DATA_DIR)) {
    fs.mkdirSync(env.PATHS.DATA_DIR, { recursive: true });
  }

  // Open database connection
  dbInstance = new Database(env.PATHS.DB_FILE);

  // Performance and safety pragmas
  dbInstance.pragma('journal_mode = WAL');
  dbInstance.pragma('foreign_keys = ON');

  // Apply schema migrations
  if (fs.existsSync(env.PATHS.SCHEMA_FILE)) {
    const schemaSql = fs.readFileSync(env.PATHS.SCHEMA_FILE, 'utf-8');
    dbInstance.exec(schemaSql);
  } else {
    console.warn(`[DATABASE] Schema file not found at ${env.PATHS.SCHEMA_FILE}`);
  }

  return dbInstance;
}

/**
 * Get active database instance (initializes if not already connected)
 * @returns {Database.Database}
 */
export function getDb() {
  if (!dbInstance) {
    return initDatabase();
  }
  return dbInstance;
}

/**
 * Closes the database connection
 */
export function closeDatabase() {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}

export default {
  initDatabase,
  getDb,
  closeDatabase
};
