// Wishlist Store Response
export interface WishlistStoreData {
  subtotal: number;
  discount: number;
  remaining_for_discount: number;
  discount_message: string | null;
}

// Wishlist Types
export interface WishlistRetailer {
  id: number;
  title: string;
  free_shipping: number;
  discount_type: string;
  discount_value: string;
  minimum_purchase_amount: string;
}

export interface WishlistProduct {
  product_id: number;
  title: string;
  url: string;
  brand: string | null;
  caliber: string;
  num_of_rounds: number;
  cost_per_round: number;
  quantity: number;
  product_total: number;
}

export interface WishlistPricing {
  subtotal: number;
  total_weight: number;
  discount: number;
  remaining_for_discount: number;
  shipping: number;
  final_total: number;
}

export interface WishlistRetailerGroup {
  retailer: WishlistRetailer;
  products: WishlistProduct[];
  pricing: WishlistPricing;
  free_shipping_message?: string | null;
}
