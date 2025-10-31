import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  items: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (id) => {
        const items = get().items;
        if (!items.includes(id)) {
          set({ items: [...items, id] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((itemId) => itemId !== id) });
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'lunarituals_wishlist',
    }
  )
);