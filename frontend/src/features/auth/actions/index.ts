import { authApi } from "@/api/axios";
import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";
import useAuthStore from "../store";

export const signInAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const res = await authApi.post("/auth/sign-in", data);

    if (res.status !== 200) {
      return res.data;
    }
    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { message: "Something went wrong." };
    }
    throw error;
  }
};

export const signUpAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();

  const formData = await request.formData();
  const data = {
    email: formData.get("email"),
  };

  try {
    const res = await authApi.post("/auth/sign-up", data);

    if (res.status !== 200) {
      return res.data;
    }

    authStore.setAuth(res.data.data.email, res.data.data.token, "otp");

    return redirect("/auth/otp");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { message: "Something went wrong." };
    }
    throw error;
  }
};

export const verifyOtpAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const data = {
    code: formData.get("otp"),
    email: authStore.email,
    token: authStore.token,
  };

  console.log(data);
  try {
    const res = await authApi.post("/auth/verify-otp", data);
    if (res.status !== 200) {
      return res.data;
    }
    authStore.setAuth(
      res.data.data.email,
      res.data.data.verifyToken,
      "set-password",
    );

    return redirect("/auth/set-password");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || { message: "Something went wrong." };
    }
    throw error;
  }
};

export const setPasswordAction = async ({ request }: ActionFunctionArgs) => {
  const authStore = useAuthStore.getState();
  const formData = await request.formData();
  const data = {
    password: formData.get("password"),
    email: authStore.email,
    token: authStore.token,
  };

  try {
    const res = await authApi.post("/auth/confirm-password", data);
    if (res.status !== 200) {
      return res.data;
    }
    authStore.clearAuth();
    return redirect("/");
  } catch (error) {
    if (error instanceof AxiosError) {
      authStore.clearAuth();
      return error.response?.data || { message: "Something went wrong." };
    }
    throw error;
  }
};

export const logoutAction = async () => {
  try {
    await authApi.post("/auth/logout");
    return redirect("/auth/sign-in");
  } catch (error) {
    console.log(error);
  }
};
