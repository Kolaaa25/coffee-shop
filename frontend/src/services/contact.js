import api from '../utils/axios';

export const contactService = {
  // Send contact form message
  sendMessage: async (formData) => {
    const response = await api.post('/contact', formData);
    return response.data;
  },
};
