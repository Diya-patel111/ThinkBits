import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Pointing to the Express server
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Append JWT token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token expiration globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized, token might be expired.
      console.warn('Unauthorized access - perhaps the token expired.');
      // Keep state in sync:
      localStorage.removeItem('token');
      // optionally window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;