import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            itemCount: get().itemCount + 1,
          });
        } else {
          set({
            items: [...items, { ...item, quantity: 1 }],
            itemCount: get().itemCount + 1,
          });
        }
      },
      removeItem: (id) => {
        const items = get().items;
        const item = items.find((i) => i.id === id);
        set({
          items: items.filter((i) => i.id !== id),
          itemCount: get().itemCount - (item?.quantity || 0),
        });
      },
      updateQuantity: (id, quantity) => {
        const items = get().items;
        const oldQuantity = items.find((i) => i.id === id)?.quantity || 0;
        set({
          items: items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
          itemCount: get().itemCount + (quantity - oldQuantity),
        });
      },
      clearCart: () => set({ items: [], itemCount: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);