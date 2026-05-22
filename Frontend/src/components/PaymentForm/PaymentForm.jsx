import { useState, useContext } from "react";
import { CheckoutContext } from "../../Context/CheckoutContext";
import "./PaymentForm.css";
export const PaymentForm = ({ setIsPaymentDone }) => {
  const [selectMethod, isMethodSelect] = useState("");
  const { setPaymentMethod } = useContext(CheckoutContext);

  const handleOnSubmit = () => {
    setPaymentMethod(selectMethod);
    setIsPaymentDone(true);
  };
  return (
    <div className="payment-method-container">
      <span></span>
      <div className="payment-methods">
        <label className="payment-method-wrapper">
          <span>UPI</span>{" "}
          <input
            onChange={(e) => {
              isMethodSelect(e.target.value);
            }}
            className="payment-method"
            type="radio"
            name="payment-method"
            id=""
            value="UPI"
          />
        </label>
        <label className="payment-method-wrapper">
          <span>Debit/Credit Card</span>{" "}
          <input
            onChange={(e) => {
              isMethodSelect(e.target.value);
            }}
            className="payment-method"
            type="radio"
            name="payment-method"
            id=""
            value="CARD"
          />
        </label>
        <label className="payment-method-wrapper">
          <span>Cash On Delivery</span>
          <input
            onChange={(e) => {
              isMethodSelect(e.target.value);
            }}
            className="payment-method"
            type="radio"
            name="payment-method"
            id=""
            value="COD"
          />
        </label>
        
      </div>
      <button onClick={handleOnSubmit} className="payment-proceed-button">
        PROCEED
      </button>
    </div>
  );
};
