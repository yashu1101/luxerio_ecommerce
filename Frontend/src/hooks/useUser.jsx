import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get("auth/me");
      return res?.data?.user;
    },
    retry: false,

    staleTime: 60 * 1000 * 5,
  });
};
