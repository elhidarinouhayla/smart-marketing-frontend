import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    // Construct the full URL for logging purposes
    const fullUrl = new URL(config.url || '', config.baseURL).href;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Standard
      config.headers['token'] = token; // Custom header required by this backend
      console.log(`[API] Requesting ${fullUrl} (with token)`);
    } else {
      console.warn(`[API] Requesting ${fullUrl} (WITHOUT token!)`);
    }
  }
  return config;
});

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the error for better debugging
    if (error.response) {
      console.error(`[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url} | Status: ${error.response.status}`, error.response.data);
      
      if (error.response.status === 401) {
        if (typeof window !== 'undefined') {
          console.warn('[API Auth] 401 Unauthorized - clearing token and redirecting to login');
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error(`[API Network Error] ${error.config?.method?.toUpperCase()} ${error.config?.url} | No response received`, error.message);
    } else {
      console.error('[API Setup Error]', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
