import { createContext, useState } from "react";
import { api } from "../api/axios";
export const CheckoutContext = createContext();
export const CheckoutProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // state for save product id
  const [productId, setProductId] = useState("");

  // state for save address data
  const [address, setAddress] = useState({
    fullname: "",
    phone: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
  });

  // state for save payment method
  const [paymentMethod, setPaymentMethod] = useState("");
  // state for check order status
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  


  // api for craete order
  const createOrder = async (productId, address, paymentMethod) => {
    try {
      const res = await api.post("orders", {
        productId,
        address,
        paymentMethod,
        orderStatus: "pending",
      });

      setMessage(res?.data?.message);
      setIsOrderCreated(true);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  // api for craete cart order
  const createCartOrder = async (address, paymentMethod) => {
    try {
      const res = await api.post("cart/orders", {
        
        address,
        paymentMethod,
        orderStatus: "pending",
      });

      setMessage(res?.data?.message);
      setIsOrderCreated(true);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  return (
    <CheckoutContext.Provider
      value={{
        message,
        error,
        productId,
        setProductId,
        address,
        setAddress,
        paymentMethod,
        setPaymentMethod,
        createOrder,
        createCartOrder,
        isOrderCreated,
        setIsOrderCreated,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
