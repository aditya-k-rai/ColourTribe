import { create } from 'zustand';

export const useAdminAuthStore = create((set) => ({
  isAuthenticated: false,
  adminUser: null,
  login: (email, password) => {
    // Mock login for development
    if (email === 'admin@colourtribe.in' && password === 'admin123') {
      window.sessionStorage.setItem('ct_admin_auth', 'true');
      set({ isAuthenticated: true, adminUser: { email, name: 'Main Admin' } });
      return true;
    }
    return false;
  },
  logout: () => {
    window.sessionStorage.removeItem('ct_admin_auth');
    set({ isAuthenticated: false, adminUser: null });
  },
  checkAuth: () => {
    const isAuth = window.sessionStorage.getItem('ct_admin_auth') === 'true';
    if (isAuth) {
      set({ isAuthenticated: true, adminUser: { email: 'admin@colourtribe.in', name: 'Main Admin' } });
    }
  }
}));
