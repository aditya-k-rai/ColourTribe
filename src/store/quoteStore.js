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

      getItemCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: 'ct-quote-cart' }
  )
);
