import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";

// 1. ADD PRODUCT HOOK
export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData) => {
      const res = await api.post("products", productData);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data?.message || "New product added.");

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) =>
      console.log(error?.response?.data?.message || "Something went wrong!"),
  });
};

// 2. UPDATE PRODUCT HOOK
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, updateData }) => {
      const res = await api.put(`products/${productId}`, updateData);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data?.message || "Product updated.");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) =>
      console.log(error?.response?.data?.message || "Something went wrong!"),
  });
};

// 3. DELETE PRODUCT HOOK
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const res = await api.delete(`products/${productId}`);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data?.message || "Product deleted.");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) =>
      console.log(error?.response?.data?.message || "Something went wrong!"),
  });
};
