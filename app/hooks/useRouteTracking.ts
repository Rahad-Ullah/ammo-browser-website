import { useEffect } from "react";
import { useLocation } from "react-router";
import { getLocalStorage, setLocalStorage } from "~/utils/localStorage";

interface RouteTrackingOptions {
  excludePaths?: string[];
  maxHistory?: number;
}

const DEFAULT_EXCLUDE_PATHS = ["/login", "/otp-verification"];
const DEFAULT_MAX_HISTORY = 10;

export function useRouteTracking(options: RouteTrackingOptions = {}) {
  const location = useLocation();
  const {
    excludePaths = DEFAULT_EXCLUDE_PATHS,
    maxHistory = DEFAULT_MAX_HISTORY
  } = options;

  useEffect(() => {
    const currentPath = location.pathname;

    // Skip if current path is in exclude list
    if (excludePaths.includes(currentPath)) {
      return;
    }

    try {
      // Get existing visited routes
      const visitedRoutes = getLocalStorage<string[]>("visitedRoutes") || [];

      // Check if current path is already the last visited route
      if (visitedRoutes[visitedRoutes.length - 1] === currentPath) {
        return;
      }

      // Add current route to the array
      const updatedRoutes = [...visitedRoutes, currentPath];

      // Keep only the last N routes
      const limitedRoutes = updatedRoutes.slice(-maxHistory);

      // Save back to localStorage
      setLocalStorage("visitedRoutes", limitedRoutes);
    } catch (error) {
      console.error("Error tracking route:", error);
    }
  }, [location.pathname, excludePaths, maxHistory]);
}
