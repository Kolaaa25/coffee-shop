import api from '../utils/axios';

export const paymentService = {
  // Create Stripe checkout session
  createCheckoutSession: async (items, deliveryDetails) => {
    const response = await api.post('/create-checkout-session', {
      items,
      deliveryDetails,
    });
    return response.data;
  },

  // Verify payment session
  verifySession: async (sessionId) => {
    const response = await api.get(`/verify-session/${sessionId}`);
    return response.data;
  },
};
