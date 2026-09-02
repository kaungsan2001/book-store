import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { CartItem } from "../schema";

interface CartState {
  cartItems: CartItem[];
}

interface CartActions {
  getCartItemCount: () => number;
  getTotalPrice: () => number;
  addCartItem: (item: CartItem) => void;
  updateQuantity: (quantity: number, id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const initialState: CartState = {
  cartItems: [],
};

const useCartStore = create<CartState & CartActions>()(
  persist(
    immer((set, get) => ({
      ...initialState,
      getCartItemCount: () => {
        const { cartItems } = get();
        const totalCount = cartItems.reduce(
          (count, currentItem) => count + currentItem.quantity,
          0,
        );
        return totalCount;
      },
      getTotalPrice: () => {
        const { cartItems } = get();
        const totalPrice = cartItems.reduce(
          (total, currentItem) =>
            total + currentItem.price * currentItem.quantity,
          0,
        );
        return totalPrice;
      },
      addCartItem: (newItem: CartItem) => {
        set((state) => {
          const isAlreadyAdded = state.cartItems.find(
            (item) => item.id === newItem.id,
          );
          if (isAlreadyAdded) {
            isAlreadyAdded.quantity = isAlreadyAdded.quantity || 1;
          } else {
            state.cartItems.push(newItem);
          }
        });
      },
      updateQuantity: (qty, id) => {
        set((state) => {
          const item = state.cartItems.find((item) => item.id === id);
          if (item) {
            item.quantity = qty;
          }
        });
      },
      removeItem: (id) => {
        console.log("Removing item with id:", id);
        set((state) => {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        });
      },
      clearCart: () => {
        set(initialState);
      },
    })),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCartStore;
