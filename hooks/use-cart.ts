"use client";

import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  _hasHydrated: boolean;

  // Actions
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setHasHydrated: (state: boolean) => void;

  // Getters
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getSubtotal: () => number;
  getVAT: () => number;
  getShipping: () => number;
  getGrandTotal: () => number;
}

const SHIPPING_COST = 50;
const VAT_RATE = 0.2;

const persistOptions: PersistOptions<CartStore, Partial<CartStore>> = {
  name: "audiophile-cart",
  partialize: (state) => ({ items: state.items }),
  // ✅ hydration callback replaces the old `onFinishHydration`
  onRehydrateStorage: () => (state) => {
    if (state) state.setHasHydrated(true);
  },
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { ...item, quantity }],
            isOpen: true,
          };
        });
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalItems: () => get().items.reduce((t, i) => t + i.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((t, i) => t + i.price * i.quantity, 0),

      getSubtotal: () => get().getTotalPrice(),
      getVAT: () => get().getSubtotal() * VAT_RATE,
      getShipping: () => (get().items.length > 0 ? SHIPPING_COST : 0),

      getGrandTotal: () => {
        const subtotal = get().getSubtotal();
        const vat = get().getVAT();
        const shipping = get().getShipping();
        return subtotal + vat + shipping;
      },
    }),
    persistOptions
  )
);
