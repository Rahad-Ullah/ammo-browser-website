import type { SeoData } from "~/types";

export interface GenerateMetaConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogImageType?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterSite?: string;
  author?: string;
  robots?: string;
  themeColor?: string;
}

export const generateMeta = (config: GenerateMetaConfig = {}) => [
  { title: config.title || "AmmoBrowser - Your Premium Ammunition Source" },
  {
    name: "description",
    content: config.description || "Find the best deals on ammunition. Browse our extensive selection of ammo from top brands with competitive prices and fast shipping.",
  },
  { name: "keywords", content: config.keywords || "ammunition, ammo, bullets, shooting supplies, firearms ammunition, buy ammo online" },
  { name: "robots", content: config.robots || "index, follow" },
  { name: "author", content: config.author || "AmmoBrowser" },
  { name: "language", content: "English" },

  // Open Graph
  { property: "og:type", content: config.ogType || "website" },
  { property: "og:title", content: config.title || "AmmoBrowser - Your Premium Ammunition Source" },
  { property: "og:description", content: config.description || "Find the best deals on ammunition. Browse our extensive selection of ammo from top brands with competitive prices and fast shipping." },
  { property: "og:image", content: config.ogImage || "" },
  { property: "og:image:type", content: config.ogImageType || "image/jpg" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:url", content: config.ogUrl || "" },
  { property: "og:site_name", content: "AmmoBrowser" },
  { property: "og:locale", content: "en_US" },

  // Twitter Card
  { name: "twitter:card", content: config.twitterCard || "summary_large_image" },
  { name: "twitter:title", content: config.title || "AmmoBrowser - Your Premium Ammunition Source" },
  { name: "twitter:description", content: config.description || "Find the best deals on ammunition. Browse our extensive selection of ammo from top brands with competitive prices and fast shipping." },
  { name: "twitter:image", content: config.ogImage || "" },
  { name: "twitter:site", content: config.twitterSite || "@ammobrowser" },
  { name: "twitter:creator", content: "@ammobrowser" },

  // Theme
  { name: "theme-color", content: config.themeColor || "#000000" },
];

// Helper to convert SeoData to GenerateMetaConfig
export const seoDataToMetaConfig = (seoData: SeoData | null, url: string): GenerateMetaConfig => {
  if (!seoData) {
    return {}; // Return empty config, generateMeta will use defaults
  }

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    ogImage: seoData.og_image,
    ogUrl: seoData.og_url || url,
    author: seoData.author,
    robots: seoData.robots,
    twitterCard: seoData.twitter_card,
  };
};
