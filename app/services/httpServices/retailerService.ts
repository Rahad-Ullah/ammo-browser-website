import httpService from "../httpService";
import { handleApiResponse } from "~/utils/apiHelpers";
import { extractRetailerIdFromSlug, createRetailerSlug } from "~/utils/retailerHelpers";
import type {
  RetailerItem,
  PaginatedRetailersResponse,
  RetailerQueryParams,
  Product,
  NestedPaginatedResponse,
} from "~/types";

const RETAILER_ENDPOINTS = {
  LIST: "/retailers",
  DETAILS: "/retailers/details",
};

export const retailerService = {
  /**
   * Fetches paginated retailers from backend endpoint: GET /api/retailers
   * Supports 3 query parameters + page:
   *   - search="abc"
   *   - free_shipping=true
   *   - google_rating=4.8
   *   - page={number}
   */
  async getPaginatedRetailers(
    params?: RetailerQueryParams | number
  ): Promise<PaginatedRetailersResponse | null> {
    const queryParams: RetailerQueryParams =
      typeof params === "number" ? { page: params } : params || {};

    const urlParams = new URLSearchParams();
    if (queryParams.page) urlParams.set("page", String(queryParams.page));
    const searchTerm = queryParams.search || queryParams.title;
    if (searchTerm && searchTerm.trim()) {
      urlParams.set("search", searchTerm.trim());
    }
    if (
      queryParams.free_shipping === true ||
      (queryParams.free_shipping as unknown) === "true"
    ) {
      urlParams.set("free_shipping", "true");
    }
    if (
      queryParams.google_rating !== undefined &&
      queryParams.google_rating !== null &&
      queryParams.google_rating !== ""
    ) {
      urlParams.set("google_rating", String(queryParams.google_rating));
    }

    const queryString = urlParams.toString();
    const endpoint = `${RETAILER_ENDPOINTS.LIST}${queryString ? `?${queryString}` : ""}`;

    try {
      const response = await httpService.get<{
        success: boolean;
        data: PaginatedRetailersResponse;
      }>(endpoint);
      const res = handleApiResponse(response);

      if (res?.data && Array.isArray(res.data.data)) {
        return res.data;
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch paginated retailers:", error);
      return null;
    }
  },

  /**
   * Fetches the list of all retailers from the backend.
   * Extracts data array directly from API response: response.data.data.data
   */
  async getAllRetailers(
    params?: RetailerQueryParams | number
  ): Promise<RetailerItem[]> {
    try {
      const paginated = await this.getPaginatedRetailers(params);
      if (paginated?.data && Array.isArray(paginated.data)) {
        return paginated.data;
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch retailers:", error);
      return [];
    }
  },

  /**
   * Fetches single retailer details by extracted ID or slug from real backend data.
   */
  async getRetailerDetails(idOrSlug: string): Promise<RetailerItem | null> {
    const rawId = extractRetailerIdFromSlug(idOrSlug);
    const numericId = rawId ? Number(rawId) : null;

    // 1. Try single retailer endpoint on backend if available: GET /retailers/:id
    if (numericId !== null && !isNaN(numericId)) {
      try {
        const response = await httpService.get<any>(
          `${RETAILER_ENDPOINTS.LIST}/${numericId}`
        );
        const res = handleApiResponse(response);
        const item = res?.data?.data || res?.data;
        if (item && item.id) {
          return item as RetailerItem;
        }
      } catch {
        // Endpoint /retailers/:id may not be isolated; continue to lookup from list
      }

      // Try GET /retailers/details/:id
      try {
        const response = await httpService.get<any>(
          `${RETAILER_ENDPOINTS.DETAILS}/${numericId}`
        );
        const res = handleApiResponse(response);
        const item = res?.data?.data || res?.data;
        if (item && item.id) {
          return item as RetailerItem;
        }
      } catch {
        // Continue to list lookup
      }
    }

    // 2. Fetch the real retailers list and find by matching ID or slug
    try {
      const retailers = await this.getAllRetailers(1);
      const found = retailers.find((r) => {
        if (numericId !== null && r.id === numericId) return true;
        const generatedSlug = createRetailerSlug(r.title, r.id);
        return generatedSlug.toLowerCase() === idOrSlug.toLowerCase();
      });

      if (found) return found;
    } catch (error) {
      console.error("Failed to find retailer details:", error);
    }

    return null;
  },

  /**
   * Fetches active product deals for a given retailer ID from backend.
   */
  async getRetailerProducts(
    retailerId: string | number,
    page: number = 1
  ): Promise<Product[]> {
    try {
      const parsedId = Number(retailerId) || retailerId;
      const response = await httpService.post<NestedPaginatedResponse<Product>>(
        "/v2/products/filter",
        {
          retailer: [parsedId],
          page,
        }
      );
      const data = handleApiResponse(response);
      return data?.data?.data || [];
    } catch (error) {
      console.error("Failed to fetch retailer products:", error);
      return [];
    }
  },
};
