import "./Cart.css";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Context/AuthContext";
import { Loader } from "../../components/Loader/Loader";

export const Cart = () => {
  const {
    message,
    data,
    isError,
    isLoading,
    isIncreasePending,
    isDecreasePending,
    error,
    decreaseQuantity,
    decreaseData,
    increaseQuantity,
    ItemQuantity,
    RemoveFromCart,
    loadingCart,
  } = useContext(CartContext);
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  // console.log(data);


  // Redirect to login page if user not logged In.
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth/login", { replace: true });
    }
  }, [user, loading, navigate]);

  const placeOrder = () => {
    navigate("/checkout");
  };

  // loading

  if (isLoading) return <Loader height="100dvh" />;

  return (
    <>
      <div className="cart-section">
        <div className="cart-item-container">
          <div className="cart-heading-container">
            {data && data.length > 0 ? (
              <h3 className="cart-heading">Cart Items</h3>
            ) : (
              <div className="cart-empty-text-container">
                <span className="cart-empty-text">Your cart is empty.</span>
                <Link to={"/"} className="shopnow-text">
                  Shop Now
                </Link>
              </div>
            )}
          </div>

          {data?.map((item) => {
            return (
              <div className="cart-item" key={item._id}>
                <FontAwesomeIcon
                  className="cart-item-remove-btn"
                  icon={faXmark}
                  onClick={() => {
                    RemoveFromCart(item.product._id);
                  }}></FontAwesomeIcon>
                <div className="cart-item-img-container">
                  <img
                    className="cart-item-img"
                    src={item?.product.thumbnail}
                    alt="cart item"
                  />
                </div>
                <div className="cart-item-detail">
                  <span className="cart-item-title">
                    {item?.product?.title}
                  </span>
                  <span className="cart-item-brand">
                    {item?.product?.brand}
                  </span>
                  <span className="cart-item-price">
                    {" "}
                    Total Price: ₹
                    {(item?.product?.price * item.quantity).toFixed(2)}{" "}
                  </span>

                  <div className="cart-item-quantity-container ">
                    <FontAwesomeIcon
                      icon={faMinus}
                      className={`cart-item-decrease ${isDecreasePending ? "cart-item-quantity-disabled" : ""}`}
                      onClick={() => {
                        decreaseQuantity(item.product._id);
                      }}></FontAwesomeIcon>
                    <span className="cart-item-quantity-value">
                      Q : {item.quantity}
                    </span>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className={`cart-item-increase ${isIncreasePending ? "cart-item-quantity-disabled" : ""}`}
                      onClick={() => {
                        increaseQuantity(item.product._id);
                      }}></FontAwesomeIcon>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {data && data.length > 0 && (
          <div className="cart-place-btn-container">
            <span className="total-amount">
              Total Price: ₹
              {data
                .reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0,
                )
                .toFixed(2)}
            </span>
            <button className="cart-place-btn" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        )}
      </div>
    </>
  );
};
