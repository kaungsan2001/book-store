import { authApi } from "@/api/axios";
import { redirect } from "react-router";
import useAuthStore from "../store";
import { Paths } from "@/config/constants";

export const authCheckLoader = async () => {
  try {
    const res = await authApi.get("/auth/check");
    if (res.status !== 200) {
      return null;
    }

    return redirect("/");
  } catch (error) {
    console.log(error);
  }
};

export const otpLoader = () => {
  const authStore = useAuthStore.getState();

  if (authStore.status !== "otp") {
    return redirect(Paths.signUp);
  }

  return null;
};

export const setPasswordLoader = () => {
  const authStore = useAuthStore.getState();

  if (authStore.status !== "set-password") {
    return redirect(Paths.signUp);
  }

  return null;
};
