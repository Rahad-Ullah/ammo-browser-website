import httpService from "../httpService";
import { handleApiResponse } from "~/utils/apiHelpers";
import { handleApiError } from "~/utils/errorHandler";
import type { SeoData, PageType } from "~/types";

const SEO_ENDPOINTS = {
  GET_SEO_DATA: "/seo-data",
};

export const seoService = {
  async getSeoData(page: PageType): Promise<SeoData> {
    try {
      const response = await httpService.get<{ data: SeoData }>(
        `${SEO_ENDPOINTS.GET_SEO_DATA}?page=${page}`
      );
      const data = handleApiResponse(response);
      return data.data;
    } catch (error) {
      handleApiError(error as Parameters<typeof handleApiError>[0]);
      throw error;
    }
  },
};
