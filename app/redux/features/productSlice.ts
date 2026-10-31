import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllProductThunk } from "~/services/httpServices/productService";
import type { ProductFilterData, NestedPaginatedResponse, Product } from "~/types";

interface ProductState {
  loading: boolean;
  allProduct: NestedPaginatedResponse<Product> | null;
  error: string | null;
  success: boolean;
  isUpdated: boolean;
  isCreated: boolean;
  isDeleting: boolean;
  productFilterData: ProductFilterData | null;
  isProductsApiCall: boolean;
  cancelPreviousRequest: boolean;
  pendingCount: number;
}

const initialState: ProductState = {
  loading: false,
  allProduct: null,
  error: null,
  success: false,
  isUpdated: false,
  isCreated: false,
  isDeleting: false,
  productFilterData: null,
  isProductsApiCall: true,
  cancelPreviousRequest: false,
  pendingCount: 0,
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addProductFilterData(state, action: PayloadAction<ProductFilterData>) {
      state.productFilterData = action.payload;
    },
    resetSuccess(state) {
      state.success = false;
    },
    setIsProductApiCall(state) {
      state.isProductsApiCall = true;
    },
    resetProductApiCall(state) {
      state.isProductsApiCall = false;
    },
    setCancelPreviousRequest(state, action: PayloadAction<boolean>) {
      state.cancelPreviousRequest = action.payload;
    },
    resetError(state) {
      state.error = null;
    },
    silentUpdateProducts(state, action: PayloadAction<NestedPaginatedResponse<Product>>) {
      state.allProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductThunk.pending, (state) => {
        state.pendingCount += 1;
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProductThunk.fulfilled, (state, action) => {
        state.allProduct = action.payload;
        state.success = true;
        state.error = null;
        state.pendingCount = Math.max(0, state.pendingCount - 1);
        state.loading = state.pendingCount > 0;
        state.cancelPreviousRequest = false;
      })
      .addCase(getAllProductThunk.rejected, (state, action) => {
        state.error = (action.payload as string) || action.error?.message || "Request failed";
        state.success = false;
        state.pendingCount = Math.max(0, state.pendingCount - 1);
        state.loading = state.pendingCount > 0;
        state.cancelPreviousRequest = false;
      });
  },
});

export const {
  addProductFilterData,
  resetSuccess,
  resetProductApiCall,
  setIsProductApiCall,
  setCancelPreviousRequest,
  resetError,
  silentUpdateProducts,
} = productSlice.actions;

export default productSlice.reducer;
