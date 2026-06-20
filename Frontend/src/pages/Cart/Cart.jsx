import "./Cart.css";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CartContext } from "../../Context/CartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Context/AuthContext";
import { Loader } from "../../components/Loader/Loader";
import { useCart } from "../../hooks/useCart";
import {
  useDecreaseCart,
  useDeleteCart,
  useIncreaseCart,
} from "../../hooks/useCartAction";

export const Cart = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const { data, isLoading, error } = useCart();
  const { mutate: deleteCartMutate, isPending: deleteCartPending } =
    useDeleteCart();
  const { mutate: increaseCartMutate, isPending: increaseCartPending } =
    useIncreaseCart();
  const { mutate: decreaseCartMutate, isPending: decreaseCartPending } =
    useDecreaseCart();

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
              <motion.div
                className="cart-item"
                key={item._id}
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: 50 }}
                transition={{ duration: 0.3, ease: "easeIn" }}>
                  
                <FontAwesomeIcon
                  className="cart-item-remove-btn"
                  icon={faXmark}
                  onClick={() => {
                    deleteCartMutate(item.product._id);
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
                      className={`cart-item-decrease ${decreaseCartPending ? "cart-item-quantity-disabled" : ""}`}
                      onClick={() => {
                        decreaseCartMutate(item.product._id);
                      }}></FontAwesomeIcon>
                    <span className="cart-item-quantity-value">
                      Q : {item.quantity}
                    </span>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className={`cart-item-increase ${increaseCartPending ? "cart-item-quantity-disabled" : ""}`}
                      onClick={() => {
                        increaseCartMutate(item.product._id);
                      }}></FontAwesomeIcon>
                  </div>
                </div>
              </motion.div>
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
