import { useMutation } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useReviewAdd = () => {
  return useMutation({
    mutationFn: async ({ productId, comment, rating }) => {
      console.log(productId, comment, rating)
      const res = await api.post(`products/review/${productId}`, {
        comment: comment,
        rating: rating,
      });

      return res?.data;
    },

    onSuccess: (data) => console.log(data),
    onError: (error) =>
      console.log(error?.response?.data?.message || "Something went wrong!"),
  });
};
