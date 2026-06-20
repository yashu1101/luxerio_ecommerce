import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await api.get("cart");
      return res?.data?.products;
    },
    staleTime: 5 * 60 * 1000,
  });
};
