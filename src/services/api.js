/**
 * Base API client helper.
 *
 * Environment-aware API base URL resolution:
 *  - Development:  VITE_API_BASE_URL is unset (or empty).
 *                  Vite dev-server proxy forwards /api → http://localhost:5000.
 *  - Production:   VITE_API_BASE_URL is set to the Railway backend URL
 *                  (e.g. https://portfolio-backend.railway.app).
 *                  All /api/* requests go directly to Railway.
 *
 * NEVER expose GITHUB_TOKEN or any server-side secret through VITE_* variables.
 */
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

export async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  };

  const response = await fetch(url, config);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage = data?.message || `Request failed with status ${response.status}`;
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export default { request };
