import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";

// ADD WISHLIST HOOK
export const useAddWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId) => {
      
      const res = await api.post("wishlist", {
        productId: productId,
      });
      
      return res.data;
    },
    
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      console.log(data?.message || "Item added to wishlist.");
    },
    
    onError: (error) => {
      console.log(error?.response?.data?.message || "Something went wrong!");
    },
  });
};


// DELETE WISHLIST HOOK

export const useDeleteWishlist = ()=>{
  const queryClient = useQueryClient();
   return useMutation({
    mutationFn: async (productId) => {
      const res = await api.delete(`wishlist/${productId}`);
      return res?.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"]});
      console.log(data?.message || "Item deleted from wishlist");
    },
    onError: (error) => {
      console.log(error?.response?.data?.message || "Something went wrong!");
    },
  });
}
