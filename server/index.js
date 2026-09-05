import app from './app.js';
import env from './config/env.js';
import { initDatabase, closeDatabase } from './db/database.js';
import logger from './utils/logger.js';

async function startServer() {
  try {
    // 1. Initialize SQLite Database and run migrations
    logger.info(`Connecting to SQLite database at ${env.PATHS.DB_FILE}...`);
    initDatabase();
    logger.info('Database initialized successfully with active schema.');

    // 2. Start HTTP Server
    const server = app.listen(env.PORT, () => {
      logger.info(`Portfolio Backend running on http://localhost:${env.PORT}`);
      logger.info(`Environment: ${env.NODE_ENV}`);
      logger.info(`Allowed Client Origin: ${env.CLIENT_ORIGIN}`);
      logger.info(`Health check available at GET http://localhost:${env.PORT}/api/health`);
    });

    // 3. Graceful Shutdown Handlers
    const shutdown = (signal) => {
      logger.info(`Received ${signal}. Shutting down gracefully...`);
      server.close(() => {
        logger.info('HTTP server closed.');
        closeDatabase();
        logger.info('Database connection closed.');
        process.exit(0);
      });

      // Force shutdown after 10 seconds if lingering
      setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
