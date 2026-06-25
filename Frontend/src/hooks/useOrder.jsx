import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

// GET ALL ORDER HOOK
export const useOrderAll = () => {
  return useQuery({
    queryKey: ["orderAll"],
    queryFn: async () => {
      const res = await api.get("orders/all");

      return res?.data?.orders;
    },
    staleTime: 5 * 60 * 1000,
    // refetchOnMount: true
  });
};

// GET SINGLE ORDER HOOK
export const useOrderSingle = () => {
  return useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await api.get("orders");
      return res?.data?.orders;
    },
    staleTime: 5 * 60 * 1000,
  });
};

// VIEW ORDER HOOK
export const useOrderView = (orderId) => {
  return useQuery({
    queryKey: ["viewOrder", orderId],
    queryFn: async () => {
      const res = await api.get(`orders/view/${orderId}`);
      
      return res?.data?.order;
    },
   
    staleTime: 5 * 60 * 1000,
    // refetchOnMount: true
    
  });
};
