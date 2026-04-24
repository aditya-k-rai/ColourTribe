import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useQuoteStore = create(
  persist(
    (set, get) => ({
      items: [],  // { productId, sku, name, categoryId, qty, color }
      
      isDrawerOpen: false,
      setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      addItem: (product, config) => set(state => {
        const existingIndex = state.items.findIndex(i => i.productId === product.id && i.color === config.color);
        
        if (existingIndex >= 0) {
          const newItems = [...state.items];
          newItems[existingIndex].qty += config.qty;
          return { items: newItems, isDrawerOpen: true };
        }
        
        return { 
          items: [...state.items, { 
            productId: product.id, 
            sku: product.sku,
            name: product.name,
            categoryId: product.categoryId,
            qty: config.qty,
            color: config.color,
          }],
          isDrawerOpen: true
        };
      }),

      updateQty: (productId, color, newQty) => set(state => ({
        items: state.items.map(i => {
          if (i.productId === productId && i.color === color) {
            return { ...i, qty: newQty };
          }
          return i;
        })
      })),

      removeItem: (productId, color) => set(state => ({
        items: state.items.filter(i => !(i.productId === productId && i.color === color))
      })),

      clearAll: () => set({ items: [] }),

      submittedQuotes: [],
      submitQuote: (leadData) => {
        const newQuote = {
          id: `CT-${Math.floor(1000 + Math.random() * 9000)}`,
          items: [...get().items],
          client: leadData.name,
          businessName: leadData.businessName,
          email: leadData.email,
          phone: leadData.phone,
          location: leadData.city,
          message: leadData.message,
          value: get().items.reduce((sum, item) => sum + (item.qty * 100), 0), // Mock value calculation
          status: 'pending',
          date: new Date().toISOString()
        };
        set(state => ({
          submittedQuotes: [newQuote, ...state.submittedQuotes],
          items: [],
          isDrawerOpen: false
        }));
        return newQuote;
      },

      updateQuoteStatus: (id, status) => set(state => ({
        submittedQuotes: state.submittedQuotes.map(q => q.id === id ? { ...q, status } : q)
      })),

      deleteQuote: (id) => set(state => ({
        submittedQuotes: state.submittedQuotes.filter(q => q.id !== id)
      })),

      getItemCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { 
      name: 'ct-quote-cart-v2',
      version: 2
    }
  )
);
