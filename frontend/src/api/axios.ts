import axios from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

interface WaitingRequest {
  resolve: (value?: unknown) => void;
  reject: (value?: unknown) => void;
}

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshAccessToken = async () => {
  await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
    {},
    {
      withCredentials: true,
    },
  );
};

let waitingRequests: WaitingRequest[] = [];

let isRefreshing: boolean = false;

const retryWaitingRequests = (error?: unknown) => {
  waitingRequests.forEach((req) => {
    if (error) {
      req.reject(error);
    } else {
      req.resolve();
    }
  });

  waitingRequests = [];
};

authApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) return Promise.reject(error);

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          waitingRequests.push({ resolve, reject });
        })
          .then(() => authApi(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      originalRequest._retry = true;

      try {
        await refreshAccessToken();

        retryWaitingRequests();
        return authApi(originalRequest);
      } catch (error) {
        retryWaitingRequests(error);
        window.location.href = "/auth/sign-in";
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
