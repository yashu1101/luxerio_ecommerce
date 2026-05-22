import { createContext, useState, useEffect } from "react";
import { api } from "../api/axios";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch wishlist

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await api.get("wishlist");
      setWishlist(res?.data?.products);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // check in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  // Add to wishlist
  const AddToWishlist = async (productId) => {
    try {
      setLoading(true);
      const exist = wishlist.find((item) => item._id === productId);
      if (exist) {
        console.log("Already exist.");
        setHeartColor(true);
      }
      const res = await api.post("wishlist", {
        productId: productId,
      });

      setMessage(res.data.message);
    } catch (error) {
      console.log(error.response.data.message || "Somthing went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Remove wishlist item
  const removeWishlistItem = async (productId) => {
    try {
      const res = await api.delete(`wishlist/${productId}`);
      setMessage(res.data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        AddToWishlist,
        removeWishlistItem,
        message,
        error,
        isInWishlist,
        loading
      }}>
      {children}
    </WishlistContext.Provider>
  );
};
