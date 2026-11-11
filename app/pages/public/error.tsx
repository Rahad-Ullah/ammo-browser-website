import { Link } from "react-router";
import { generateMeta } from "~/utils";
import type { Route } from "./+types/error";

export function meta(): ReturnType<Route.MetaFunction> {
  return generateMeta({
    title: "Page Not Found | AmmoBrowser",
    description: "The page you're looking for doesn't exist or has been moved.",
    robots: "noindex, nofollow",
  });
}

export default function Error() {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-6xl xl:text-8xl heading-gradient mb-6">404</h1>
      <h2 className="text-2xl xl:text-4xl text-primaryWhite mb-4">Page Not Found</h2>
      <p className="text-secondaryColor text-lg mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-orange text-primaryWhite px-8 py-3 font-Poppins font-medium hover:bg-[#CC4910] transition"
      >
        Go Home
      </Link>
    </div>
  );
}
