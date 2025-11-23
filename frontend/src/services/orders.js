import api from '../utils/axios';

export const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Get user's orders
  getMyOrders: async () => {
    const response = await api.get('/orders/my-orders');
    return response.data;
  },
};
