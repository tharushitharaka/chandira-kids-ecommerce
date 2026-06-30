import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000, // 15s timeout — prevent hanging requests
});

// ── Request: Attach JWT token ──────────────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ck_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Response: Handle expired tokens & server errors ───────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear local auth and redirect
      localStorage.removeItem('ck_token');
      localStorage.removeItem('ck_user');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
