import type React from "react";
import type { ApiResponse } from "./api";
import type { SelectValue } from "./product";
import type { WishlistStoreData } from "./wishlist";

// User Types
export interface User {
  id?: string;
  email: string;
  name?: string;
  picture?: string;
  image?: string;
  phone?: string;
  sub?: string;
  given_name?: string;
  family_name?: string;
}

// Auth Types
export interface LoginWithOtpInput {
  email: string;
}

export interface VerifyOtpInput {
  email: string;
  otp: string;
}

export interface ContactFormInput {
  company_name: string;
  email: string;
  phone: string;
  comment?: string;
  message?: string;
  not_a_robot: boolean;
}

export interface SubscribeInput {
  email: string;
}

export interface ReviewInput {
  product_id: string;
  rating: number;
  comment?: string;
}

export interface PriceAlertInput {
  product_url: string;
  caliber: string;
  threshold: number | string;
}

export interface PriceAlertData {
  threshold?: number;
  status?: "active" | "inactive" | string;
}

export interface ProfileUpdateInput {
  name?: string;
  email?: string;
  phone?: string;
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  authToken: string | null;
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  googleLogin: () => void;
  logout: () => Promise<ApiResponse>;
  loginWithOtp: (data: LoginWithOtpInput) => Promise<ApiResponse>;
  verifyOtp: (data: VerifyOtpInput) => Promise<ApiResponse>;
  contactList: (data: ContactFormInput) => Promise<ApiResponse>;
  subscribe: (data: SubscribeInput) => Promise<ApiResponse>;
  ProductReview: (data: ReviewInput) => Promise<ApiResponse>;
  ShipingReview: (data: ReviewInput) => Promise<ApiResponse>;
  profileData: () => Promise<ApiResponse<User>>;
  profileUpdate: (data: ProfileUpdateInput | FormData) => Promise<ApiResponse>;
  profileImgUpdate: (data: FormData) => Promise<ApiResponse>;
  productRating: (data: ReviewInput) => Promise<ApiResponse>;
  shipingRating: (data: ReviewInput) => Promise<ApiResponse>;
  setPriceAlert: (data: PriceAlertInput) => Promise<ApiResponse>;
  alertStatus: (id: string) => Promise<ApiResponse>;
  getPriceAlert: (data: { product_id: string }) => Promise<ApiResponse>;
  addToWishlist: (product_url: string, quantity?: string) => Promise<ApiResponse<WishlistStoreData>>;
  removeFromWishlist: (product_url: string) => Promise<ApiResponse>;
  getWishlistUrls: () => Promise<string[]>;
  refetchRating: boolean;
  setrefetchRating: React.Dispatch<React.SetStateAction<boolean>>;
  selectValue: SelectValue;
  setSelectValue: React.Dispatch<React.SetStateAction<SelectValue>>;
}
