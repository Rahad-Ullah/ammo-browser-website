import httpService from "../httpService";
import { createThunkHandler, handleApiResponse } from "~/utils/apiHelpers";
import { handleApiError } from "~/utils/errorHandler";
import { createRequestQueue } from "~/utils/requestQueue";
import type { ProductFilterData, NestedPaginatedResponse, Product } from "~/types";

const PRODUCT_ENDPOINTS = {
  ALL_PRODUCTS: "/v2/products/filter",
};

// Dedicated FIFO queue for product list requests
const productListQueue = createRequestQueue();

function productFilterPayload(queryData: ProductFilterData): ProductFilterData {
  const payload: ProductFilterData = { ...queryData };
  const keyFeature = payload.key_feature_id;
  delete payload.key_feature_id;

  const caliberName =
    keyFeature && typeof keyFeature === "object" && "caliber" in keyFeature
      ? String((keyFeature as { caliber?: string }).caliber || "").trim()
      : "";
  if (!payload.search && caliberName) payload.search = caliberName;

  return payload;
}

export const productManagementService = {
  async getAllProducts(
    queryData: ProductFilterData,
    options?: { silent?: boolean }
  ): Promise<NestedPaginatedResponse<Product>> {
    try {
      const response = await productListQueue.enqueue(() =>
        httpService.post<NestedPaginatedResponse<Product>>(
          PRODUCT_ENDPOINTS.ALL_PRODUCTS,
          productFilterPayload(queryData)
        )
      );
      const data = handleApiResponse(response);
      return data;
    } catch (error) {
      if (!options?.silent) {
        handleApiError(error as Parameters<typeof handleApiError>[0]);
      }
      throw error;
    }
  },
};

export const getAllProductThunk = createThunkHandler<NestedPaginatedResponse<Product>, ProductFilterData>(
  "get/product/all",
  (queryData) => productManagementService.getAllProducts(queryData)
);
