import { create } from 'zustand';

export const useAdminAuthStore = create((set) => ({
  isAuthenticated: false,
  adminUser: null,
  login: (email) => {
    // Admin array verification should be handled by the component before calling this
    window.sessionStorage.setItem('ct_admin_auth', 'true');
    set({ isAuthenticated: true, adminUser: { email, name: email === 'adtyamighty@gmail.com' ? 'Aditya' : 'Lotwaala' } });
    return true;
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
