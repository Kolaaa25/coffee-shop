import axios from 'axios';

// Ensure API URL always has /api suffix
const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  // Add /api if not present
  return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
};

const API_URL = getApiUrl();

console.log('🔧 [Admin axios] API_URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Додаємо токен до кожного запиту
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('📤 [Admin] Request:', config.method?.toUpperCase(), config.baseURL + config.url);
  return config;
});

// Log responses
api.interceptors.response.use(
  (response) => {
    console.log('✅ [Admin] Response OK:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ [Admin] Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return Promise.reject(error);
  }
);

export default api;
