import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useSlider = ({ category, sortBy }) => {
  return useQuery({
    queryKey: ["products", category, sortBy],
    queryFn: async () => {
      const res = await api.get(
        `products?category=${category || ""}&sortBy=${sortBy || ""}`,
      );

      return res?.data?.products;
    },
    staleTime: 60 * 1000 * 5,
  });
};
