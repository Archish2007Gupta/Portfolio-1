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

  // Safe incremental migrations
  try {
    const adminTableInfo = dbInstance.prepare("PRAGMA table_info(admin_users)").all();
    const hasUpdatedAt = adminTableInfo.some(col => col.name === 'updated_at');
    if (!hasUpdatedAt) {
      dbInstance.exec("ALTER TABLE admin_users ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP");
    }

    const contactsTableInfo = dbInstance.prepare("PRAGMA table_info(contacts)").all();
    const hasStatus = contactsTableInfo.some(col => col.name === 'status');
    if (!hasStatus) {
      dbInstance.exec("ALTER TABLE contacts ADD COLUMN status TEXT NOT NULL DEFAULT 'new'");
    }

    dbInstance.exec("CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status)");
    dbInstance.exec("CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC)");
    dbInstance.exec("CREATE INDEX IF NOT EXISTS idx_projects_stars ON projects_cache(stars DESC)");
  } catch (err) {
    console.error('[DATABASE] Migration error checking schema:', err);
  }

  // Seed or sync configured admin user from environment
  if (env.ADMIN_USERNAME && env.ADMIN_PASSWORD_HASH) {
    try {
      const existing = dbInstance.prepare(
        'SELECT id, password_hash FROM admin_users WHERE username = ?'
      ).get(env.ADMIN_USERNAME);

      if (!existing) {
        dbInstance.prepare(
          'INSERT INTO admin_users (username, password_hash, created_at, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)'
        ).run(env.ADMIN_USERNAME, env.ADMIN_PASSWORD_HASH);
      } else if (existing.password_hash !== env.ADMIN_PASSWORD_HASH) {
        dbInstance.prepare(
          'UPDATE admin_users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE username = ?'
        ).run(env.ADMIN_PASSWORD_HASH, env.ADMIN_USERNAME);
      }
    } catch (err) {
      console.error('[DATABASE] Error syncing admin credentials:', err);
    }
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
