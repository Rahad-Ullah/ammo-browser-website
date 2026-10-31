import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("berg-user-response");
      localStorage.removeItem("berg-user");
      localStorage.removeItem("berg-user-email");
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
