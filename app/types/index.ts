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

// Product Types
export interface Retailer {
  title?: string;
}

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

// Wishlist Store Response
export interface WishlistStoreData {
  subtotal: number;
  discount: number;
  remaining_for_discount: number;
  discount_message: string | null;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  access_token?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface NestedPaginatedResponse<T> {
  data: PaginatedResponse<T>;
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
  name: string;
  company_name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
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

// Component Props Types
export interface ButtonProps {
  btnTitle?: string;
  className?: string;
  img?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface InputProps {
  className?: string;
  icon?: React.ReactNode;
  type?: string;
  placeholder?: string;
  passwordToggle?: boolean;
  parentClass?: string;
  register?: ReturnType<typeof import("react-hook-form").useForm>["register"];
  name: string;
  errors?: Record<string, { message?: string }>;
}

export interface SelectProps {
  className?: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  name?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  className?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

// Blog Types
export interface BlogAuthor {
  name: string;
  avatar?: string;
}

export interface BlogCardProps {
  id: string;
  slug?: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
  image: string;
  author: BlogAuthor;
  date: string;
  readTime: string;
  link?: string;
}

export interface BlogContentSection {
  type: "paragraph" | "heading" | "image" | "list" | "quote";
  content?: string;
  items?: string[];
  src?: string;
  alt?: string;
  level?: 2 | 3 | 4;
}

export interface BlogDetailData extends BlogCardProps {
  content: BlogContentSection[];
  metaDescription?: string;
}

// SEO Types
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

// SEO Data from API
export interface SeoData {
  id?: string;
  page: "home" | "contact" | "faq" | "blog";
  title: string;
  description: string;
  keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  og_url?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  canonical_url?: string;
  robots?: string;
  author?: string;
  created_at?: string;
  updated_at?: string;
}

export type PageType = "home" | "contact" | "faq" | "blog";

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
}

// Blog API Types
export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

export interface ApiBlogListItem {
  id: number;
  title: string;
  sub_title: string;
  slug: string;
  image: string;
  category: { name: string; slug: string };
  tags: string[];
  created_at: string;
  author: string;
  reading_time: string;
}

export interface ApiBlogDetail extends ApiBlogListItem {
  content: string;
  meta_title: string;
  meta_description: string;
}

export interface BlogListParams {
  category?: string;
  tag?: string;
  search?: string;
  page?: number;
}

// Route Guard Props
export interface GuardProps {
  children: React.ReactNode;
}
