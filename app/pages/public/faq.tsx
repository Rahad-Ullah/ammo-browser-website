import { FaqBanner } from "~/components/organisms/faq";
import { TopPicks } from "~/components/organisms/shared";
import { seoService } from "~/services/httpServices/seoService";
import { generateMeta, seoDataToMetaConfig } from "~/utils";
import type { Route } from "./+types/faq";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  try {
    const seoData = await seoService.getSeoData("faq");
    return { seoData, url: url.toString() };
  } catch (error) {
    console.error("Failed to fetch SEO data for faq page:", error);
    return { seoData: null, url: url.toString() };
  }
}

export function meta({ loaderData }: Route.MetaArgs): ReturnType<Route.MetaFunction> {
  if (!loaderData) {
    return generateMeta();
  }

  const config = seoDataToMetaConfig(loaderData.seoData, loaderData.url);
  return generateMeta(config);
}

export default function FAQ() {
  return (
    <>
      <FaqBanner />
      <div className="container">
        <TopPicks />
      </div>
    </>
  );
}
