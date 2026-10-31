import { useQuery } from "@tanstack/react-query";
import { BlogDetailsContent } from "~/components/organisms/blog";
import { blogService } from "~/services/httpServices/blogService";
import { generateMeta } from "~/utils";
import type { Route } from "./+types/blog-details";

export async function loader({ params, request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { slug } = params;

  try {
    const blog = await blogService.getBlogDetails(slug);
    return { blog, slug, url: url.toString() };
  } catch (error) {
    console.error("Failed to fetch blog details:", error);
    return { blog: null, slug, url: url.toString() };
  }
}

export function meta({
  loaderData,
}: Route.MetaArgs): ReturnType<Route.MetaFunction> {
  if (!loaderData?.blog) {
    return generateMeta({
      title: "Blog Post | AmmoBrowser",
      description:
        "Read our latest blog post on ammunition guides and tips.",
    });
  }

  const { blog, url } = loaderData;

  return generateMeta({
    title: blog.meta_title || `${blog.title} | AmmoBrowser Blog`,
    description: blog.meta_description || blog.sub_title,
    ogUrl: url,
    ogType: "article",
  });
}

export default function BlogDetailsPage({
  loaderData,
}: Route.ComponentProps) {
  const slug = loaderData.slug;

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blogDetails", slug],
    queryFn: () => blogService.getBlogDetails(slug),
    initialData: loaderData.blog ?? undefined,
    staleTime: 5 * 60 * 1000,
  });

  return <BlogDetailsContent blog={blog ?? null} isLoading={isLoading && !blog} />;
}
