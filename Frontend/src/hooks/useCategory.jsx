import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await api.get("categories");
      return res?.data;
    },
    staleTime: 5*60*1000,
    
  });
};
