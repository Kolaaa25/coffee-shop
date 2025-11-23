import api from '../utils/axios';

export const menuService = {
  // Get all menu items
  getAllItems: async () => {
    const response = await api.get('/menu');
    return response.data;
  },

  // Get menu items by category
  getItemsByCategory: async (category) => {
    const response = await api.get(`/menu?category=${category}`);
    return response.data;
  },

  // Get single item
  getItemById: async (id) => {
    const response = await api.get(`/menu/${id}`);
    return response.data;
  },

  // Get popular items
  getPopularItems: async () => {
    const response = await api.get('/menu/featured/popular');
    return response.data;
  },
};
