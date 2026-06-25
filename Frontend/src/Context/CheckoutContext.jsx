import { createContext, useState } from "react";
export const CheckoutContext = createContext();
export const CheckoutProvider = ({ children }) => {
  const [address, setAddress] = useState({
    fullname: "",
    phone: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");

  return (
    <CheckoutContext.Provider
      value={{
        address,
        setAddress,
        paymentMethod,
        setPaymentMethod,
      }}>
      {children}
    </CheckoutContext.Provider>
  );
};
