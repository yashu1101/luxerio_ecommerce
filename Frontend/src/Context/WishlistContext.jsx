import { createContext, useState } from "react";
import { api } from "../api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const queryClinet = useQueryClient();

 
  // Remove wishlist item

  const { mutate: removeWishlistItem } = useMutation({
    mutationFn: async (productId) => {
      const res = await api.delete(`wishlist/${productId}`);
      return res?.data?.message;
    },

    onSuccess: (data) => {
      queryClinet.invalidateQueries({ queryKey: ["wishlist"] });
      console.log(data);
    },
    onError: (error) => {
      console.log(erorr);
    },
  });

  return (
    <WishlistContext.Provider
      value={{
      
      
     
        removeWishlistItem,
        message,
   
      }}>
      {children}
    </WishlistContext.Provider>
  );
};
