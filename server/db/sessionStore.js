import session from 'express-session';

/**
 * SQLite-backed session store for express-session using better-sqlite3.
 */
export class SqliteSessionStore extends session.Store {
  /**
   * @param {Object} options
   * @param {import('better-sqlite3').Database} options.db - Active better-sqlite3 database instance
   * @param {number} [options.ttl=86400] - Session TTL in seconds (default 24 hours)
   */
  constructor(options = {}) {
    super();
    if (!options.db) {
      throw new Error('SqliteSessionStore requires a better-sqlite3 db instance.');
    }

    this.db = options.db;
    this.ttl = options.ttl || 86400; // 24 hours

    // Prepared statements for high-speed parameter-bound queries
    this.getStmt = this.db.prepare('SELECT sess, expired_at FROM sessions WHERE sid = ?');
    this.setStmt = this.db.prepare(
      'INSERT OR REPLACE INTO sessions (sid, sess, expired_at) VALUES (?, ?, ?)'
    );
    this.destroyStmt = this.db.prepare('DELETE FROM sessions WHERE sid = ?');
    this.touchStmt = this.db.prepare('UPDATE sessions SET expired_at = ? WHERE sid = ?');
    this.cleanupStmt = this.db.prepare('DELETE FROM sessions WHERE expired_at < ?');

    // Run session cleanup every 15 minutes
    this.cleanupInterval = setInterval(() => {
      try {
        const now = Math.floor(Date.now() / 1000);
        this.cleanupStmt.run(now);
      } catch (err) {
        // Silently catch background cleanup errors
      }
    }, 15 * 60 * 1000);
    this.cleanupInterval.unref();
  }

  get(sid, callback) {
    try {
      const row = this.getStmt.get(sid);
      if (!row) {
        return callback(null, null);
      }

      const now = Math.floor(Date.now() / 1000);
      if (row.expired_at < now) {
        this.destroy(sid, () => {});
        return callback(null, null);
      }

      const sess = JSON.parse(row.sess);
      callback(null, sess);
    } catch (err) {
      callback(err);
    }
  }

  set(sid, sessionData, callback) {
    try {
      let expiredAt;
      if (sessionData && sessionData.cookie && sessionData.cookie.expires) {
        expiredAt = Math.floor(new Date(sessionData.cookie.expires).getTime() / 1000);
      } else {
        expiredAt = Math.floor(Date.now() / 1000) + this.ttl;
      }

      const sessStr = JSON.stringify(sessionData);
      this.setStmt.run(sid, sessStr, expiredAt);
      callback(null);
    } catch (err) {
      callback(err);
    }
  }

  destroy(sid, callback) {
    try {
      this.destroyStmt.run(sid);
      if (callback) callback(null);
    } catch (err) {
      if (callback) callback(err);
    }
  }

  touch(sid, sessionData, callback) {
    try {
      let expiredAt;
      if (sessionData && sessionData.cookie && sessionData.cookie.expires) {
        expiredAt = Math.floor(new Date(sessionData.cookie.expires).getTime() / 1000);
      } else {
        expiredAt = Math.floor(Date.now() / 1000) + this.ttl;
      }

      this.touchStmt.run(expiredAt, sid);
      if (callback) callback(null);
    } catch (err) {
      if (callback) callback(err);
    }
  }
}

export default SqliteSessionStore;
