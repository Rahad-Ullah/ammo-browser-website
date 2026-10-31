import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Legacy aliases for backward compatibility
export const useStoreDispatch = useAppDispatch;
export const useStoreSelector = useAppSelector;
