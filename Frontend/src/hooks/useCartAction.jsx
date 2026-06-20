//  ADD TO CART HOOK

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useAddCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId) => {
      const res = await api.post("cart", { productId });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      console.log(data?.message || "Item added to cart.");
    },

    onError: (error) => {
      console.log(error?.response?.data?.message || "Somthing went wrong!");
    },
  });
};

//  INCREASE CART ITEM HOOK

export const useIncreaseCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId) => {
      const res = await api.put(`cart/increase/${productId}`);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      console(data?.message || "Quantity increased.");
    },

    onError: (error) => {
      console.error(error?.response?.data?.message || "Somthing went wrong!");
    },
  });
};
//  DECREASE CART ITEM HOOK

export const useDecreaseCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId) => {
      const res = await api.put(`cart/decrease/${productId}`);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      console(data?.message || "Quantity decreased.");
    },

    onError: (error) => {
      console.error(error?.response?.data?.message || "Somthing went wrong!");
    },
  });
};
//  DELETE CART ITEM HOOK

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId) => {
      const res = await api.delete(`cart/${productId}`);
      return res.data;
    },

    onSuccess: (data) => {
      console.log(data?.message || "Cart item deleted.");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) =>
      console.log(error?.response?.data?.message || "Somthing went wrong!"),
  });
};
