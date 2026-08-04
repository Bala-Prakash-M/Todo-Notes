import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const ACCESS_TOKEN_STORAGE_KEY = "accessToken";

const readStoredAccessToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
};

let _accessToken: string | null = readStoredAccessToken();
let _onUnauthenticated: (() => void) | null = null;
let _onTokenChange: ((token: string | null) => void) | null = null;
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

export const setAccessToken = (token: string | null) => {
  _accessToken = token;

  if (typeof window !== "undefined") {
    if (token) {
      window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
    } else {
      window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    }
  }

  if (_onTokenChange) {
    _onTokenChange(token);
  }
};

export const getAccessToken = () => {
  return _accessToken;
};

export const registerOnTokenChange = (callback: (token: string | null) => void) => {
  _onTokenChange = callback;
};

export const registerOnUnauthenticated = (callback: () => void) => {
  _onUnauthenticated = callback;
};

export const refreshAccessToken = async () => {
  if (isRefreshing) {
    return new Promise<string>((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const response = await api.post<{ accessToken: string }>("/auth/refresh");
    const newAccessToken = response.data.accessToken;

    setAccessToken(newAccessToken);
    processQueue(null, newAccessToken);

    return newAccessToken;
  } catch (refreshError) {
    processQueue(refreshError, null);
    setAccessToken(null);

    if (_onUnauthenticated) {
      _onUnauthenticated();
    }

    throw refreshError;
  } finally {
    isRefreshing = false;
  }
};

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (_accessToken) {
      if (typeof config.headers.set === "function") {
        config.headers.set("Authorization", `Bearer ${_accessToken}`);
      } else {
        config.headers["Authorization"] = `Bearer ${_accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Prevent token refresh logic if the 401 occurred on auth routes: login, register, refresh, logout
    if (
      !originalRequest ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/logout")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (typeof originalRequest.headers.set === "function") {
                originalRequest.headers.set("Authorization", `Bearer ${token}`);
              } else {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
              }
              resolve(api(originalRequest));
            },
            reject: (err: any) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        if (typeof originalRequest.headers.set === "function") {
          originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);
        } else {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
