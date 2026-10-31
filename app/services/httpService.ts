import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { API_URL } from "~/utils/constants";

export const httpService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
httpService.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
httpService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("berg-user");
      localStorage.removeItem("berg-user-email");
      localStorage.removeItem("berg-user-response");
      localStorage.removeItem("berg-token");

      // Redirect to login only if on a private route
      const privateRoutes = ["/profile"];
      const currentPath = window.location.pathname;
      if (privateRoutes.some((route) => currentPath.startsWith(route))) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default httpService;
