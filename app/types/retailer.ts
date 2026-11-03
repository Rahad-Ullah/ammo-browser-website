// Retailer Types
export interface Retailer {
  id?: number | string;
  title?: string;
  name?: string;
}

export interface RetailerItem {
  id: number;
  title: string;
  retailer_website: string | null;
  google_rating: string | null;
  free_shipping: boolean;
  discount_type: string | null;
  discount_value: string | number | null;
  minimum_purchase_amount: string | number | null;
  products_count: number;
}

export interface PaginatedRetailersResponse {
  current_page: number;
  data: RetailerItem[];
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  next_page_url?: string | null;
  path?: string;
  per_page?: number;
  prev_page_url?: string | null;
  to?: number;
  total?: number;
}

export interface RetailerQueryParams {
  page?: number;
  search?: string;
  title?: string;
  free_shipping?: boolean;
  google_rating?: number | string;
}
