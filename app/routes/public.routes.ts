import { index, route } from "@react-router/dev/routes";

export const publicRoutes = [
  index("pages/public/home.tsx"),
  route("ammo", "pages/public/ammo.tsx"),
  route("ammo/:caliber", "pages/public/ammo-caliber.tsx"),
  route("ammo/:caliber/:productSlug", "pages/public/product-details.tsx"),
  route("blog", "pages/public/blog.tsx"),
  route("blog/:slug", "pages/public/blog-details.tsx"),
  route("contact", "pages/public/contact.tsx"),
  route("faq", "pages/public/faq.tsx"),
  route("privacy", "pages/public/privacy.tsx"),
  route("cookies", "pages/public/cookies.tsx"),
  route("terms-and-condition", "pages/public/terms.tsx"),
  route("retailers", "pages/public/retailers.tsx"),
  route("retailers/:slug", "pages/public/retailer-details.tsx"),
  route("product-details/:id", "pages/public/product-details.tsx", {
    id: "legacy-product-details",
  }),
  route("*", "pages/public/error.tsx"),
];
