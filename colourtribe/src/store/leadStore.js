import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLeadStore = create(
  persist(
    (set) => ({
      name: '',
      phone: '',
      email: '',
      businessName: '',
      city: '',
      
      updateLead: (data) => set((state) => ({ ...state, ...data })),
      clearLead: () => set({ name: '', phone: '', email: '', businessName: '', city: '' })
    }),
    { name: 'ct-lead-info' }
  )
);
