import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PRODUCTS } from '../data/products.seed';

export const useProductStore = create(
  persist(
    (set, get) => ({
      products: PRODUCTS,
      
      addProduct: (product) => set((state) => ({
        products: [product, ...state.products]
      })),
      
      updateProduct: (id, updatedProduct) => set((state) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...updatedProduct } : p)
      })),
      
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),
      
      getProductBySku: (sku) => {
        return get().products.find(p => p.sku === sku);
      },
      
      getProductsByCategory: (categoryId) => {
        return get().products.filter(p => p.categoryId === categoryId);
      }
    }),
    {
      name: 'colourtribe-products-storage', // unique name for localStorage key
      version: 1, // Optional: useful for migrations if the schema changes
    }
  )
);
