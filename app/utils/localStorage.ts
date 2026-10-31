const isBrowser = typeof window !== "undefined";

export const setLocalStorage = <T>(key: string, value: T): string | void => {
  if (!isBrowser) return;
  try {
    const valueToStore =
      typeof value === "object" && value !== null
        ? JSON.stringify(value)
        : String(value);
    localStorage.setItem(key, valueToStore);
  } catch (error) {
    return (error as Error).message;
  }
};

export const getLocalStorage = <T = unknown>(key: string): T | string | null => {
  if (!isBrowser) return null;
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) {
      return null;
    }

    try {
      return JSON.parse(storedValue) as T;
    } catch {
      return storedValue;
    }
  } catch {
    return null;
  }
};

export const removeLocalStorage = (key: string): string | void => {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    return (error as Error).message;
  }
};

export const clearLocalStorage = (): string | void => {
  if (!isBrowser) return;
  try {
    localStorage.clear();
  } catch (error) {
    return (error as Error).message;
  }
};
