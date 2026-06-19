import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await api.get("wishlist");
      return res?.data?.products;
    },
    staleTime: 5 * 60 * 1000,
  });
};
