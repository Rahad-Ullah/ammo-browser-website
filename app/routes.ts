import { type RouteConfig, layout, route } from "@react-router/dev/routes";
import { authRoutes } from "./routes/auth.routes";
import { publicRoutes } from "./routes/public.routes";
import { privateRoutes } from "./routes/private.routes";

export default [
  // Resource route (no layout): dynamically generated sitemap incl. blog posts.
  route("sitemap.xml", "pages/public/sitemap.tsx"),
  layout("pages/public/layout.tsx", publicRoutes),
  layout("pages/auth/layout.tsx", authRoutes),
  layout("pages/private/layout.tsx", privateRoutes),
] satisfies RouteConfig;
