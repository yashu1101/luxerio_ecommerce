import { createContext, useEffect, useState } from "react";
import { api } from "../api/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  const [cartPopup, setCartPopup] = useState("");
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);

  const queryClient = useQueryClient();

  // Fetch cart items
  const getCartItems = async () => {
    const res = await api.get("cart");
    return res?.data?.products;
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });

  // Check if item is in cart
  const isInCart = (productId) => {
    return cart.some((item) => item.product._id === productId);
  };

  // Add to cart

  const { mutate: AddToCart } = useMutation({
    mutationFn: async (productId) => {
      const res = await api.post("cart", { productId });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setMessage(data?.message || "Added to cart");
    },

    onError: (error) => {
      console.log(error);
    },
  });

  // increase cart item quantity

  const { mutate: increaseQuantity, isPending: isIncreasePending } =
    useMutation({
      mutationFn: async (productId) => {
        const res = await api.put(`cart/increase/${productId}`);
        return res.data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        setMessage(data?.message || "Quantity increased!");
      },

      onError: (error) => {
        console.error(error);
      },
    });

  // decrease cart item quantity
  const { mutate: decreaseQuantity, isPending: isDecreasePending } =
    useMutation({
      mutationFn: async (productId) => {
        const res = await api.put(`cart/decrease/${productId}`);
        return res.data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        setMessage(data?.message || "Quantity decreased!");
      },

      onError: (error) => {
        console.error(error);
      },
    });

  // remove from cart

  const { mutate: RemoveFromCart } = useMutation({
    mutationFn: async (productId) => {
      const res = await api.delete(`cart/${productId}`);
      return res.data.message;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      console.log(data);
    },
    onError: (error) => console.log(error),
  });
  return (
    <CartContext.Provider
      value={{
        cartPopup,
        message,
        error,
        data,
        isError,
        isLoading,

        error,
        AddToCart,
        RemoveFromCart,
        decreaseQuantity,
        increaseQuantity,
        isIncreasePending,
        isDecreasePending,
        isInCart,
        loadingCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
