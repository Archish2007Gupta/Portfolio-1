import rateLimit from 'express-rate-limit';

/**
 * Standard API rate limiter: 100 requests per 15 minutes window
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});

/**
 * Strict rate limiter for sensitive endpoints (like contact submissions or login)
 */
export const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 requests per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Submission limit reached. Please try again later.'
  }
});

/**
 * Dedicated rate limiter for admin login brute-force protection
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 10, // Max 10 attempts per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.'
  }
});

/**
 * Dedicated rate limiter for contact form submissions (5 submissions per 15 min per IP)
 */
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 5, // Limit each IP to 5 submissions per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact submissions from this IP. Please try again after 15 minutes.'
  }
});

export default {
  apiLimiter,
  strictLimiter,
  loginLimiter,
  contactLimiter
};
