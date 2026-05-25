import "./Cart.css";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

import { Navbar } from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/axios";
import { AuthContext } from "../../Context/AuthContext";
import { Loader } from "../../components/Loader/Loader";

export const Cart = () => {
  const {
    message,
  
    getCartItems,
    cart,
    decreaseQuantity,
    increaseQuantity,
    ItemQuantity,
    RemoveFromCart,
    loadingCart,
  } = useContext(CartContext);
  const navigate = useNavigate();
  const { user,loading } = useContext(AuthContext);
  const [error, setError] = useState();

  // get cart items
  useEffect(() => {
    getCartItems();
  }, [cart.length]);
 


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

  if (loadingCart) return <Loader height="100dvh" />;

  return (
    <>
      <div className="cart-section">
        <div className="cart-item-container">
          <div className="cart-heading-container">
            {cart.length > 0 ? (
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

          {cart?.map((item) => {
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

                  <div className="cart-item-quantity-container">
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="cart-item-decrease"
                      onClick={() => {
                        decreaseQuantity(item.product._id);
                      }}></FontAwesomeIcon>
                    <span className="cart-item-quantity-value">
                      Q : {item.quantity}
                    </span>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="cart-item-increase"
                      onClick={() => {
                        increaseQuantity(item.product._id);
                      }}></FontAwesomeIcon>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {cart.length > 0 && (
          <div className="cart-place-btn-container">
            <span className="total-amount">
              Total Price: ₹
              {cart
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
