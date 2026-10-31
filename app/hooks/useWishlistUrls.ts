import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "~/hooks/providers/AuthProvider";
import { getLocalStorage } from "~/utils/localStorage";

export const WISHLIST_URLS_QUERY_KEY = ["wishlist-urls"];

export function useWishlistUrls() {
  const { authToken, getWishlistUrls } = useAuth();
  const token = getLocalStorage<string>("berg-user-response");

  const { data: wishlistUrls = [] } = useQuery<string[]>({
    queryKey: WISHLIST_URLS_QUERY_KEY,
    queryFn: getWishlistUrls,
    staleTime: 30 * 1000,
    enabled: !!token && !!authToken,
  });

  const wishlistUrlSet = useMemo(() => new Set(wishlistUrls), [wishlistUrls]);

  const isInWishlist = useCallback(
    (url?: string) => !!url && wishlistUrlSet.has(url),
    [wishlistUrlSet]
  );

  return { wishlistUrls, isInWishlist };
}
