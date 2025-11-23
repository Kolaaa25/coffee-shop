import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (user, token) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },
  
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    set({ user: null, isAuthenticated: false });
  },
  
  checkAuth: () => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (token && user) {
      set({ user: JSON.parse(user), isAuthenticated: true });
      return true;
    }
    return false;
  },
}));

export default useAuthStore;
