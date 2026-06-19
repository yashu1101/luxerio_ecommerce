import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await api.post("auth/logout");
      return res.data;
    },

    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      console.log("LoggedOut")
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });
};
