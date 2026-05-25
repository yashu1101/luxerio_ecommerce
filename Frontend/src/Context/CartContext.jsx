import { createContext, useEffect, useState } from "react";
import { api } from "../api/axios";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cartPopup, setCartPopup] = useState("");
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);

  // Fetch cart items
  const getCartItems = async () => {
    try {
      setLoadingCart(true);
      const res = await api.get("cart");
      setCart(res?.data?.products);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  // Check if item is in cart
  const isInCart = (productId) => {
    return cart.some((item) => item.product._id === productId);
  };

  // Add to cart

  const AddToCart = async (productId) => {
    try {
      setLoadingCart(true);
      const res = await api.post("cart", { productId });
      setMessage(res.data.message);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoadingCart(false);
    }
  };
  // increase cart item quantity

  const increaseQuantity = async (productId) => {
    try {
      const res = await api.put(`cart/increase/${productId}`);
      getCartItems();
      setMessage(res.data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  // decrease cart item quantity

  const decreaseQuantity = async (productId) => {
    try {
      const res = await api.put(`cart/decrease/${productId}`);
      getCartItems();
      setMessage(res.data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  // remove from cart

  const RemoveFromCart = async (productId) => {
    try {
      
      const res = await api.delete(`cart/${productId}`);
      setMessage(res.data.message);
      getCartItems();
    } catch (error) {
      setError(error.response.data.message);
    } 
  };
  return (
    <CartContext.Provider
      value={{
        cartPopup,
        message,
        error,
        cart,
        getCartItems,
        AddToCart,
        RemoveFromCart,
        decreaseQuantity,
        increaseQuantity,
        isInCart,
        loadingCart
      }}>
      {children}
    </CartContext.Provider>
  );
};
