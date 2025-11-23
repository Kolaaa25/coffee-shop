import { create } from 'zustand';
import { authService } from '../services/auth';

export const useAuthStore = create((set) => ({
  user: authService.getStoredUser(),
  isAuthenticated: authService.isAuthenticated(),
  loading: false,
  error: null,

  // Login
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.login(credentials);
      set({ user: data.user, isAuthenticated: true, loading: false });
      return data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Login failed', 
        loading: false 
      });
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.register(userData);
      set({ user: data.user, isAuthenticated: true, loading: false });
      return data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Registration failed', 
        loading: false 
      });
      throw error;
    }
  },

  // Logout
  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false, error: null });
  },

  // Update user
  updateUser: (userData) => {
    set({ user: userData });
    localStorage.setItem('user', JSON.stringify(userData));
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));
