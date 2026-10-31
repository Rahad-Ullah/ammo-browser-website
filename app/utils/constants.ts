export const pageSize = 10;

export const history: {
  navigate: ((path: string) => void) | null;
  location: Location | null;
} = {
  navigate: null,
  location: null,
};

export const rejectWithValue = {
  rejectWithValue: (msg: string) => new Error(msg),
};

export const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";
