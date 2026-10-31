import httpService from "../httpService";
import { handleApiResponse } from "~/utils/apiHelpers";
import { handleApiError } from "~/utils/errorHandler";
import type {
  BlogCategory,
  BlogTag,
  ApiBlogListItem,
  ApiBlogDetail,
  BlogListParams,
  PaginatedResponse,
} from "~/types";

const BLOG_ENDPOINTS = {
  CATEGORIES: "/blog/categories",
  TAGS: "/blog/tags",
  LIST: "/blog/list",
  DETAILS: "/blog/details",
};

export const blogService = {
  async getCategories(): Promise<BlogCategory[]> {
    try {
      const response = await httpService.get<{ data: BlogCategory[] }>(
        BLOG_ENDPOINTS.CATEGORIES
      );
      const data = handleApiResponse(response);
      return data.data;
    } catch (error) {
      handleApiError(error as Parameters<typeof handleApiError>[0]);
      throw error;
    }
  },

  async getTags(): Promise<BlogTag[]> {
    try {
      const response = await httpService.get<{ data: BlogTag[] }>(
        BLOG_ENDPOINTS.TAGS
      );
      const data = handleApiResponse(response);
      return data.data;
    } catch (error) {
      handleApiError(error as Parameters<typeof handleApiError>[0]);
      throw error;
    }
  },

  async getBlogList(
    params?: BlogListParams
  ): Promise<PaginatedResponse<ApiBlogListItem>> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.set("category", params.category);
      if (params?.tag) queryParams.set("tag", params.tag);
      if (params?.search) queryParams.set("search", params.search);
      if (params?.page) queryParams.set("page", String(params.page));

      const queryString = queryParams.toString();
      const url = `${BLOG_ENDPOINTS.LIST}${queryString ? `?${queryString}` : ""}`;

      const response = await httpService.get<{
        data: PaginatedResponse<ApiBlogListItem>;
      }>(url);
      const data = handleApiResponse(response);
      return data.data;
    } catch (error) {
      handleApiError(error as Parameters<typeof handleApiError>[0]);
      throw error;
    }
  },

  async getBlogDetails(slug: string): Promise<ApiBlogDetail> {
    try {
      const response = await httpService.get<{ data: ApiBlogDetail }>(
        `${BLOG_ENDPOINTS.DETAILS}/${slug}`
      );
      const data = handleApiResponse(response);
      return data.data;
    } catch (error) {
      handleApiError(error as Parameters<typeof handleApiError>[0]);
      throw error;
    }
  },
};
