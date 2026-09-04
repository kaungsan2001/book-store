import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { Product } from "../schema";

interface State {
  product: Product | null;
}

const initialState: State = {
  product: null,
};
interface Actions {
  setBuyNowProduct: (p: Product) => void;
}
const useProductStore = create<Actions & State>()(
  persist(
    immer((set) => ({
      ...initialState,
      setBuyNowProduct: (product: Product) =>
        set((state) => {
          state.product = product;
        }),
    })),
    {
      name: "buynow-product",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useProductStore;
