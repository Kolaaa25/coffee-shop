import api from '../utils/axios';

// Orders API
export const ordersAPI = {
  getAll: async () => {
    const response = await api.get('/orders');
    return response.data.data || response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data.data || response.data;
  },
  
  updateStatus: async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data.data || response.data;
  },
};

// Menu API
export const menuAPI = {
  getAll: async () => {
    const response = await api.get('/menu');
    return response.data.data || response.data; // Handle both {data: []} and []
  },
  
  create: async (item) => {
    const response = await api.post('/menu', item);
    return response.data.data || response.data;
  },
  
  update: async (id, item) => {
    const response = await api.put(`/menu/${id}`, item);
    return response.data.data || response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/menu/${id}`);
    return response.data.data || response.data;
  },
};

// Stats API
export const statsAPI = {
  getDashboard: async () => {
    const response = await api.get('/stats/dashboard');
    return response.data.data || response.data;
  },
};

// Users/Customers API
export const usersAPI = {
  getAll: async () => {
    const response = await api.get('/auth/users');
    return response.data.data || response.data;
  },
};
