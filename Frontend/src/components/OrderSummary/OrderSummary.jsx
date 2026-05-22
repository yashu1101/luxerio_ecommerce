import "./OrderSummary.css";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CheckoutContext } from "../../Context/CheckoutContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/axios";
import { CartContext } from "../../Context/CartContext";
export const OrderSummary = ({ productId }) => {
  const { address, paymentMethod, setError, error } =
    useContext(CheckoutContext);

  const { cart } = useContext(CartContext);
  const [items, setItems] = useState({});

  // const {productId} = useParams();

  // get single item
  const orderSummaryItem = async () => {
    try {
      const res = await api.get(`products/${productId}`);
      setItems(res?.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    orderSummaryItem();
  }, []);

  // console.log(productId, items);

  let orderItems = productId ? [items] : cart;

  console.log(orderItems);

  return (
    <div className="order-summary-container">
      {/* <span>Order summary</span> */}
      <div className="order-summary">
        <div className="order-summary-item-container">
          {orderItems.map((item) => {
            return (
              <div key={item._id} className="order-summary-item">
                <div className="order-summary-item-img">
                  <img
                    src={item?.product?.thumbnail || item?.thumbnail}
                    alt="img"
                  />
                </div>
                <div className="order-summary-item-detail">
                  <span className="order-summary-item-title">
                    {item?.product?.title || item?.title}
                  </span>
                  {/* <span className="order-summary-item-brand">{item?.product?.brand}</span> */}
                  <span className="order-summary-item-price">
                    Price: ₹{item?.product?.price || item?.price}
                  </span>
                  <span className="order-summary-item-quantity">
                    Qty: {item?.quantity || 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="order-summary-detail">
          <div className="order-summary-detail-totalprice">
            <span>Total Price</span>
            <span>
              ₹{productId
                ? items.price
                : cart
                    .reduce(
                      (total, item) =>
                        total + item.product.price * item.quantity,
                      0,
                    )
                    .toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
