import api from '../utils/axios';
import { getCachedMenu } from './backendCache';

export const menuService = {
  // Get all menu items (with caching)
  getAllItems: async () => {
    const data = await getCachedMenu();
    return data;
  },

  // Get menu items by category
  getItemsByCategory: async (category) => {
    const data = await getCachedMenu();
    const filteredItems = data.data.filter(item => item.category === category);
    return { ...data, data: filteredItems };
  },

  // Get single item
  getItemById: async (id) => {
    const response = await api.get(`/menu/${id}`);
    return response.data;
  },

  // Get popular items (from cache)
  getPopularItems: async () => {
    const data = await getCachedMenu();
    // Return first 6 items as "popular" or filter by a popular flag if exists
    const popularItems = data.data.filter(item => item.popular) || data.data.slice(0, 6);
    return { ...data, data: popularItems };
  },
};
