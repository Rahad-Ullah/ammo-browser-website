import type { AxiosError } from "axios";
import { errorToast } from "./toast";
import { removeLocalStorage } from "./localStorage";

interface ApiErrorResponse {
  message?: string;
  code?: number;
}

interface ErrorResult {
  message?: string;
  status: number | null;
}

const defaultMessages: Record<number, string> = {
  400: "Invalid request. Please check.",
  401: "Unauthorized. Please log in.",
  403: "Access denied. No permission.",
  404: "Resource not found.",
  422: "Validation failed. Please check input.",
  500: "Server error. Try again.",
  503: "Service unavailable. Retry later.",
};

export const handleApiError = (
  error: AxiosError<ApiErrorResponse>,
): ErrorResult => {
  if (error.response) {
    const { status, data } = error.response;
    let message = data?.message || "An unexpected error occurred.";
    if (!data?.message && defaultMessages[status]) {
      message = defaultMessages[status];
    }

    if (data?.message === "Unauthenticated.") {
      removeLocalStorage("berg-user-response");
      removeLocalStorage("berg-user");
      removeLocalStorage("berg-token");
      console.log("error", error);
      console.log("error.response", error?.response?.data);
      const privateRoutes = ["/profile", "/wishlist"];
      const currentPath = window.location.pathname;
      window.dispatchEvent(new Event("auth:logout"));
      if (privateRoutes.some((route) => currentPath.startsWith(`/${route}`))) {
        window.location.href = "/login";
      }
    } else {
      errorToast(message);
    }
    return { message, status };
  } else if (error.request) {
    let message = "No response from server.";
    if (error.message?.includes("Network Error")) {
      message = "Please check your network.";
    }

    errorToast(message);
    return { message, status: null };
  } else {
    const message = error.message || "An error occurred.";
    errorToast(message);
    return { message, status: null };
  }
};
