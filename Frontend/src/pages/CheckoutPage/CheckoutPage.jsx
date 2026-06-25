import "./CheckoutPage.css";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { PaymentForm } from "../../components/PaymentForm/PaymentForm";
import { AddressForm } from "../../components/AddressForm/AddressForm";
import { CheckoutContext } from "../../Context/CheckoutContext";
import { useContext, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useCreateCartOrder, useCreateOrder } from "../../hooks/useOrderAction";
export const CheckoutPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { address, paymentMethod } = useContext(CheckoutContext);

  const [addressContainer, setAddressContainer] = useState(false);
  const [paymentContainer, setPaymentContainer] = useState(false);
  const [isAddressDone, setIsAddressDone] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [isOrderCreated, setIsOrderCreated] = useState(false);

  const [isOrderFailed, setIsOrderFailed] = useState(false);

  const { mutate: createOrderMutate, isPending: isOrderPending } =
    useCreateOrder();
  const { mutate: createCartOrderMutate, isPending: isCartOrderPending } =
    useCreateCartOrder();

  const handleCreateOrder = () => {
    // CREATE SINGLE ORDER
    if (productId) {
      createOrderMutate(
        { productId, address, paymentMethod },
        {
          onSuccess: () => {
            setIsOrderCreated(true)
            navigate("/myorders");
          },
        },
      );
    } else {
      // CREATE CART ORDER
      createCartOrderMutate(
        { address, paymentMethod },
        {
          onSuccess: () => {
            setIsOrderCreated(true)
            navigate("/myorders");
          },
        },
      );
    }
  };

  // redirect to myorders page after order created
  // useEffect(() => {
  //   if (isOrderCreated) {
  //     setTimeout(() => {
  //       navigate("/myorders");
  //     }, 2000);
  //   }
  // }, [isOrderCreated, navigate]);

  return (
    <>
      <div className="checkout-section">
        <h3 className="checkout-heading">Secure Checkout</h3>

        <div className="checkout-container">
          {/* chekout order summary  */}
          <div className="checkout-summary-container">
            <OrderSummary productId={productId}></OrderSummary>
          </div>

          {/* chekout steps  */}
          <div className="checkout-step-container">
            {/* address step */}
            <div className="checkout-address-wrapper">
              <div className="checkout-edit-address">
                <div className="checkout-current-address">
                  {address?.addressLine ? (
                    <>
                      <span className="checkout-deliver-text">
                        Deliver To:
                        <span style={{ fontWeight: "700" }}>
                          {address?.fullname}
                        </span>
                      </span>
                      <span className="checkout-address-text">
                        {`${address?.addressLine}, ${address?.city}, ${address?.state} - ${address?.pincode}`}
                      </span>
                    </>
                  ) : (
                    <span>Address</span>
                  )}
                </div>
                <div className="checkout-add-address-button">
                  <button
                    className="add-address-button"
                    onClick={() => setAddressContainer(!addressContainer)}>
                    Add Address
                  </button>
                </div>
              </div>
              <div
                className={`checkout-address-container ${addressContainer ? "checkout-address-container-show" : ""}`}>
                <AddressForm setIsAddressDone={setIsAddressDone}></AddressForm>
              </div>
            </div>

            {/* payment step */}
            <div
              className={`checkout-payment-wrapper ${!isAddressDone && "step-disabled"}`}>
              <div className="checkout-edit-payment">
                <div className="checkout-current-payment">
                  <span className="checkout-payment-label-text">
                    Payment Method
                  </span>
                  <span className="checkout-payment-value-text">
                    {paymentMethod}
                  </span>
                </div>
                <div className="checkout-add-payment-button">
                  <button
                    className="add-payment-button"
                    onClick={() => setPaymentContainer(!paymentContainer)}>
                    Add Payment
                  </button>
                </div>
              </div>
              <div
                className={`checkout-payment-container ${paymentContainer ? "checkout-payment-container-show" : ""}`}>
                <PaymentForm setIsPaymentDone={setIsPaymentDone}></PaymentForm>
              </div>
            </div>
            <div
              className={`checkout-order-place-wrapper ${!(isAddressDone && isPaymentDone) && "step-disabled"}`}>
              <button
                className="checkout-order-place-button"
                onClick={handleCreateOrder}>
                Place Order
              </button>
            </div>
            {/* checkout step indicators */}
            <div className="checkout-step-indicator-container">
              <div className="step-indicators">
                <div className="step-indicator">
                  <span className="step-indicator-icon-container">
                    <FontAwesomeIcon
                      className={`step-indicator-icon ${isAddressDone ? "step-indicator-icon-fill" : ""}`}
                      icon={faCircleCheck}></FontAwesomeIcon>
                  </span>
                  <span className="step-indicator-text">Address</span>
                </div>
                <div className="step-indicator">
                  <span className="step-indicator-icon-container">
                    <FontAwesomeIcon
                      className={`step-indicator-icon ${isPaymentDone ? "step-indicator-icon-fill" : ""}`}
                      icon={faCircleCheck}></FontAwesomeIcon>
                  </span>
                  <span className="step-indicator-text">Payment</span>
                </div>
                <div className="step-indicator">
                  <span className="step-indicator-icon-container">
                    <FontAwesomeIcon
                      className={`step-indicator-icon ${isOrderCreated ? "step-indicator-icon-fill" : ""}`}
                      icon={faCircleCheck}></FontAwesomeIcon>
                  </span>
                  <span className="step-indicator-text">Confirmed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
