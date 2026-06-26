import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Status = "none" | "otp" | "verify" | "reset" | "set-password";

type State = {
  email: string | null;
  token: string | null;
  status: Status;
};

const initialState: State = {
  email: null,
  token: null,
  status: "none",
};

type Actions = {
  setAuth: (email: string, token: string, status: Status) => void;
  clearAuth: () => void;
};

const useAuthStore = create<Actions & State>()(
  persist(
    immer((set) => ({
      ...initialState,
      setAuth: (email, token, status) =>
        set((state) => {
          state.email = email;
          state.token = token;
          state.status = status;
        }),
      clearAuth: () => set(initialState),
    })),
    {
      name: "auth-credentials",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useAuthStore;
