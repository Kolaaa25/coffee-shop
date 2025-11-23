import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// 🐛 DEBUG: Перевірка API URL
console.log('🔧 [axios.js] VITE_API_URL from env:', import.meta.env.VITE_API_URL);
console.log('🔧 [axios.js] Final API_URL:', API_URL);
console.log('🔧 [axios.js] All env vars:', import.meta.env);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    console.log('📤 [axios] Making request to:', config.baseURL + config.url);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ [axios] Request error:', error);
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => {
    console.log('✅ [axios] Response OK from:', response.config.url, '| Status:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ [axios] Response error:', {
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      fullURL: error.config?.baseURL + error.config?.url,
      status: error.response?.status,
      message: error.message
    });
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
