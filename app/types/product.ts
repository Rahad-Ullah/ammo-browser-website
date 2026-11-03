import type { PaginatedResponse } from "./api";
import type { Retailer } from "./retailer";

// Product Types
export interface KeyFeatures {
  image_url?: string;
}

export interface ProgressBar {
  current_total: number;
  target_amount: number;
  remaining_amount: number;
  message: string;
}

export interface Product {
  id: string;
  name?: string;
  price?: number;
  caliber?: string;
  brand?: string;
  casing?: string;
  grains?: string;
  shell_length?: string;
  shot_size?: string;
  num_of_rounds?: string;
  image?: string;
  retailer?: Retailer;
  shipping_cost?: number;
  progress_bar?: ProgressBar;
  description?: string;
  created_at?: string;
  updated_at?: string;
  cost_per_round?: number;
  condition?: string;
  retailer_avg_rating?: number;
  key_features?: KeyFeatures;
  sponsored?: number;
  url?: string;
  quantity?: number | null;
}

// Filter Types
export interface ProductFilterData {
  page?: number;
  search?: string;
  key_feature_id?: { id: string } | string | null;
  brand?: string;
  casing?: string;
  shell_length?: string;
  shot_size?: string;
  num_of_rounds?: string;
  shipping_review?: string;
  retailer_review?: string;
  price_sort?: string;
  grains?: string;
}

export interface SelectValue {
  key_feature_id: string;
  brand: string;
  casing: string;
  shell_length: string;
  shot_size: string;
  num_of_rounds: string;
  shipping_review: string;
  retailer_review: string;
  price_sort: string;
  grains: string;
  search: string;
}

// Redux Product State Types
export interface ProductState {
  loading: boolean;
  allProduct: PaginatedResponse<Product> | null;
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

export interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  className?: string;
}
