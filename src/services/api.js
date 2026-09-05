/**
 * Base API client helper using relative /api path.
 * In development, Vite proxy directs /api to http://localhost:5000.
 * In production, same-origin or configured reverse proxy serves /api.
 */
const API_BASE = '';

export async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    ...options,
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
