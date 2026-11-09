import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "~/lib/axios/axios.config";

interface Ad {
  url?: string;
  image_url?: string;
  system_image_url?: string;
}

interface AdsProps {
  placeholder?: number;
  className?: string;
}

const Ads = ({ placeholder = 4, className = "" }: AdsProps) => {
  const { data } = useQuery<Ad[]>({
    queryKey: ["ads"],
    queryFn: async () => {
      const res = await axiosPublic.get("/advertisements");
      return res?.data?.data || [];
    },
  });

  // Track ad images that fail to load (dead/blocked external URLs) so we can
  // fall back to the "No Ads Available" state instead of a broken image.
  const [failedAds, setFailedAds] = useState<Record<number, boolean>>({});

  // Filter for ads that have a valid image and haven't failed to load
  const hasValidAds = (data || []).some(
    (item, index) =>
      Boolean(item?.image_url || item?.system_image_url) && !failedAds[index]
  );

  if (!data || data.length === 0 || !hasValidAds) {
    return null;
  }

  return (
    <div className={`py-24 xl:py-36 ${className}`}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item, index) => {
            const imageSrc = item?.image_url || item?.system_image_url;
            if (!imageSrc || failedAds[index]) return null;

            return (
              <div key={index} className="relative">
                <a
                  href={item?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondaryBg w-full h-[180px] xl:h-[450px] flex items-center justify-center text-base md:text-xl text-primaryWhite overflow-hidden"
                >
                  <img
                    src={imageSrc}
                    alt={`Ad ${index + 1}`}
                    onError={(e) => {
                      // Fallback chain: image_url -> system_image_url -> hide ad
                      const img = e.currentTarget;
                      if (
                        item.image_url &&
                        item.system_image_url &&
                        img.dataset.fallback !== "system"
                      ) {
                        img.dataset.fallback = "system";
                        img.src = item.system_image_url;
                        return;
                      }
                      setFailedAds((prev) => ({ ...prev, [index]: true }));
                    }}
                    className="w-full h-full object-cover"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ads;
