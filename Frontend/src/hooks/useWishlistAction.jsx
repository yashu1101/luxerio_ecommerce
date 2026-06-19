import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";

// ADD WISHLIST HOOK
export const useAddWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId) => {
      const exist = data?.find((item) => item._id === productId);
      if (exist) {
        console.log("Item already added.");
      }
      const res = await api.post("wishlist", {
        productId: productId,
      });

      return res.data;
    },

    onSuccess: (data) => {
      queryClinet.invalidateQueries({ queryKey: ["wishlist"] });
      console.log(data);
    },

    onError: (error) => {
      console.log(error?.response?.data?.message || "Somthing went wrong!");
    },
  });
};
