# Blog Components Documentation

## Overview
This directory contains all blog-related components built following the atomic design pattern. These components are fully responsive, styled with Tailwind CSS, and ready to use with your blog data.

## Components Created

### Organisms
1. **BlogBanner** (existing) - Hero banner with title and description
2. **BlogSearchBar** (new) - Search bar with popular tags
3. **BlogGrid** (new) - Responsive grid layout for blog cards

### Molecules (in `/app/components/molecules/`)
4. **BlogCard** - Individual blog card component
5. **BlogCategoryFilter** - Category filter buttons
6. **BlogPaginationInfo** - Pagination information display

## Component Structure

```
app/
├── components/
│   ├── molecules/
│   │   ├── BlogCard.tsx
│   │   ├── BlogCategoryFilter.tsx
│   │   └── BlogPaginationInfo.tsx
│   └── organisms/
│       └── blog/
│           ├── BlogBanner.tsx
│           ├── BlogSearchBar.tsx
│           └── BlogGrid.tsx
└── pages/
    └── public/
        └── blog.tsx (fully integrated example)
```

## Usage Example

See [blog.tsx](../../../pages/public/blog.tsx) for a complete implementation example.

### Basic Implementation

```tsx
import { useState } from "react";
import { BlogBanner, BlogSearchBar, BlogGrid } from "~/components/organisms/blog";
import { BlogCategoryFilter, BlogPaginationInfo, Pagination } from "~/components/molecules";

export default function Blog() {
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <BlogBanner title="Insights, guides & updates" />

      <div className="container">
        <BlogSearchBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        <BlogCategoryFilter
          categories={["All", "Handgun Ammo", "Rifle Ammo"]}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <BlogGrid blogs={blogData} isLoading={false} />

        <BlogPaginationInfo
          currentPage={1}
          itemsPerPage={6}
          totalItems={12}
          currentPageItemCount={6}
        />
      </div>
    </>
  );
}
```

## Data Structure

### Blog Item Interface

```typescript
interface BlogItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  link?: string;
}
```

### Example Data

```typescript
const blogData = [
  {
    id: "1",
    title: "Top 7 Handgun Ammo Picks for 2025",
    description: "A balanced Handgun Loading reliability, consistency, and value...",
    category: "Handgun Ammo",
    image: "/assets/blog/handgun-ammo.jpg",
    author: {
      name: "Ammo Browser Editorial",
      avatar: "/assets/user.png"
    },
    date: "28/07/2025",
    readTime: "8 min read"
  }
];
```

## Component Props

### BlogCard
```typescript
interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  author: { name: string; avatar?: string };
  date: string;
  readTime: string;
  link?: string;
}
```

### BlogSearchBar
```typescript
interface BlogSearchBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  popularTags?: string[];
  onTagClick?: (tag: string) => void;
}
```

### BlogCategoryFilter
```typescript
interface BlogCategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}
```

### BlogGrid
```typescript
interface BlogGridProps {
  blogs: BlogItem[];
  isLoading?: boolean;
}
```

### BlogPaginationInfo
```typescript
interface BlogPaginationInfoProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  currentPageItemCount: number;
}
```

## Styling

All components use Tailwind CSS with the project's custom theme:
- **Primary Background**: `bg-mainBG`
- **Card Background**: `bg-cynicalBlack`
- **Primary Text**: `text-primaryWhite`
- **Secondary Text**: `text-thirdColor`
- **Accent Color**: `bg-orange` / `text-orange`
- **Input Background**: `bg-additionalColor`

## Responsive Breakpoints

- **Mobile**: Base styles (< 640px)
- **Small (sm)**: 640px
- **Medium (md)**: 768px
- **Large (lg)**: 1024px
- **Extra Large (xl)**: 1680px
- **2XL**: 1680px

### Grid Layout
- Mobile: 1 column
- Small (sm): 2 columns
- Large (lg): 3 columns
- Extra Large (xl): 4 columns

## Features

### BlogCard
- Hover scale effect (1.02x zoom)
- Image zoom on hover
- Category badge overlay
- Truncated title (2 lines max)
- Truncated description (3 lines max)
- Author info with avatar
- "Read article" button with arrow icon
- Responsive typography and spacing

### BlogSearchBar
- Search input with icon
- Popular tags as clickable buttons
- Tag click triggers search
- Responsive flex layout
- Horizontal scrolling on mobile

### BlogCategoryFilter
- Active/inactive button states
- Horizontal scrolling on mobile
- Smooth transitions
- Full-width on mobile, auto-width on desktop

### BlogGrid
- Responsive grid layout (1-4 columns)
- Loading state with CardLoader skeletons
- Empty state message
- Consistent gap spacing

## Image Requirements

You'll need to provide the following images:

### Blog Images
Place in `/app/assets/blog/`:
- `handgun-ammo-picks.jpg`
- `ammo-storage.jpg`
- `rifle-ammo-guide.jpg`
- `shotgun-shells.jpg`
- (Additional blog images as needed)

### Author Avatars
Place in `/app/assets/`:
- `user.png` (default avatar)
- (Additional author avatars as needed)

## Customization

### Changing Colors
Update in `tailwind.config.js` or use inline Tailwind classes:
```tsx
<BlogCard
  className="!bg-gray-800 !hover:bg-gray-700"
  {...blogData}
/>
```

### Changing Grid Layout
Modify the grid classes in `BlogGrid.tsx`:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Changing Items Per Page
Update in your page component:
```tsx
const itemsPerPage = 8; // Change from 6 to 8
```

## Integration with API

Replace sample data with API calls:

```tsx
import { useQuery } from "@tanstack/react-query";

export default function Blog() {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => fetch("/api/blogs").then(res => res.json())
  });

  return (
    <BlogGrid blogs={blogs || []} isLoading={isLoading} />
  );
}
```

## Accessibility

- All interactive elements are keyboard accessible
- Images have alt text
- Buttons have proper ARIA labels
- Form inputs have proper labels
- Color contrast meets WCAG AA standards

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All components are pure UI components with no built-in data fetching
- State management is handled at the page level
- Components are fully typed with TypeScript
- No external dependencies beyond react-router and react-icons
- Follows existing project patterns and conventions
