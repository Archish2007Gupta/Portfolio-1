import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import env from './config/env.js';
import { apiLimiter } from './middleware/rateLimit.js';
import { errorHandler, notFoundHandler, AppError } from './middleware/errorHandler.js';

// Route imports
import contactRoutes from './routes/contact.routes.js';
import projectsRoutes from './routes/projects.routes.js';
import certificatesRoutes from './routes/certificates.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS Configuration - Restrict to configured client origin
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like curl, local health checks)
    if (!origin) return callback(null, true);

    const allowedOrigins = [env.CLIENT_ORIGIN];
    if (!env.isProduction) {
      allowedOrigins.push('http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000');
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new AppError(`Origin '${origin}' not allowed by CORS policy`, 403));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Body parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Health Check Endpoint (not throttled)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running'
  });
});

// General API rate limiting for all subsequent /api routes
app.use('/api', apiLimiter);

// Mount API feature routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/admin', adminRoutes);

// 404 Handler for undefined routes
app.use(notFoundHandler);

// Centralized Error Handler
app.use(errorHandler);

export default app;
