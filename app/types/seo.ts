// SEO Types
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export type PageType = "home" | "contact" | "faq" | "blog";

// SEO Data from API
export interface SeoData {
  id?: string;
  page: PageType;
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
