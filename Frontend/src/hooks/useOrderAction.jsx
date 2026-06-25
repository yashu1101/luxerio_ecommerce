import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";

// CREATE SINGLE PRODUCT ORDER
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, address, paymentMethod }) => {
      const res = await api.post("orders", {
        productId,
        address,
        paymentMethod,
        orderStatus: "pending",
      });
      return res?.data;
    },
    onSuccess: (data) => {
      console.log(data?.message || "Order created.");
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
    onError: (error) =>
      console.log(error?.response?.data?.message || "Something went wrong!"),
  });
};

// CREATE CART ORDER
export const useCreateCartOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ address, paymentMethod }) => {
      const res = await api.post("cart/orders", {
        address,
        paymentMethod,
        orderStatus: "pending",
      });
      return res?.data;
    },
    onSuccess: (data) => {
      console.log(data?.message || "Order created.");
      queryClient.invalidateQueries({ queryKey: ["order"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) =>
      console.log(error?.response?.data?.message || "Something went wrong!"),
  });
};

// CANCEL ORDER
export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId) => {
      const res = await api.patch(`orders/cancel/${orderId}`);
      return res?.data;
    },
    onSuccess: (data,variables) => {
      console.log(data?.message || "Order cancelled.");
      queryClient.invalidateQueries({ queryKey: ["order"] });
      queryClient.invalidateQueries({ queryKey: ["viewOrder", variables.orderId ]});
  
    },
    onError: (error) =>
      console.log(error?.response?.data?.message || "Something went wrong!"),
  });
};

// UPDATE ORDER STATUS (FOR ADMIN)
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, orderStatus }) => {
      const res = await api.patch("orders/update", {
        orderId: orderId,
        orderStatus: orderStatus,
      });
      return res?.data;
    },
    onSuccess: (data,variables) => {
      console.log(data?.message || "Order status updated.");
      queryClient.invalidateQueries({ queryKey: ["viewOrder", variables.orderId ]});
      queryClient.invalidateQueries({ queryKey: ['orderAll'] });
    },
    onError: (error) =>
      console.log(error?.response?.data?.message || "Something went wrong!"),
  });
};
