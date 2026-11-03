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
