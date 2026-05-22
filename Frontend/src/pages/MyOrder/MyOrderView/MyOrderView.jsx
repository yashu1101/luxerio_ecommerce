import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../api/axios";
import { Loader } from "../../../components/Loader/Loader";
import { DateFormator } from "../../../utility/DateFormator";
import "./MyOrderView.css";

export const MyOrderView = () => {
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(false);
  const { orderId } = useParams();

  // get order detail
  const orderDetail = async () => {
    try {
      setLoading(true);
      const res = await api.get(`orders/view/${orderId}`);
      setOrderData(res?.data?.order);
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    orderDetail();
  }, [orderId]);

  // cancel order

  const navigate = useNavigate();
  const cancelOrder = async () => {
    try {
      const res = await api.patch(`orders/cancel/${orderId}`);
      console.log(res?.data?.message || "Order Cancelled.");
      navigate("/myorders");
    } catch (error) {
      console.log(error.response.data.message || "Somthing went wrong!");
    }
  };
  // console.log(orderData);

  // first letter
  const fullname = orderData?.user?.username;
  const first_letter = fullname?.split("")[0]?.toUpperCase();

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="user-od-wrapper">
      <div className="od-container">
        {/* Header */}
        <div className="od-header">
          <div>
            <span className="od-label">Order Details</span>
            <h1 className="od-order-id">{orderData?._id || "N/A"}</h1>
          </div>

          {/* ✅ status  */}
          <div className="od-status">
            <div
              className={`od-status-view ${
                orderData?.status === "pending"
                  ? "status-pending"
                  : orderData?.status === "shipped"
                    ? "status-shipped"
                    : orderData?.status === "delivered"
                      ? "status-delivered"
                      : orderData?.status === "cancelled"
                        ? "status-cancelled"
                        : ""
              } `}>
              {orderData?.status || "N/A"}
            </div>
            {orderData?.status !== "cancelled" &&
              orderData?.status !== "delivered" && (
                <button onClick={cancelOrder} className="od-status-update">
                  Cancel
                </button>
              )}
          </div>
        </div>

        {/* Top Grid */}
        <div className="od-grid-top">
          {/* Customer */}
          <div className="od-card">
            <p className="od-card-title">Customer</p>
            <div className="od-avatar">{first_letter}</div>
            <p className="od-user-name">{orderData?.user?.username}</p>
            {/* <p className="od-user-email">{orderData?.user?.email}</p> */}
          </div>

          {/* Timeline */}
          <div className="od-card">
            <p className="od-card-title">Timeline</p>
            <div className="od-timeline">
              <div className="od-tl-row">
                <div className="od-tl-dot dot-blue" />
                <div>
                  <p className="od-tl-label">Order Placed</p>
                  <p className="od-tl-value">
                    {orderData?.createdAt
                      ? DateFormator(orderData.createdAt)
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="od-tl-line" />
              <div className="od-tl-row">
                <div className="od-tl-dot dot-green" />
                <div>
                  <p className="od-tl-label">Delivery Date</p>
                  <p className="od-tl-value">
                    {orderData?.deliveryDate
                      ? DateFormator(orderData.deliveryDate)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Address */}
          <div className="od-card">
            <p className="od-card-title">Payment & Delivery</p>
            <div className="od-info-row">
              <span className="od-info-icon">💳</span>
              <div>
                <p className="od-tl-label">Payment Method</p>
                <p className="od-tl-value">
                  {orderData?.paymentMethod || "N/A"}
                </p>
              </div>
            </div>
            <div className="od-divider" />
            <div className="od-info-row">
              <span className="od-info-icon">📍</span>
              <div>
                <p className="od-tl-label">Shipping Address</p>
                <p className="od-tl-value od-address">
                  {orderData?.address?.addressLine || "N/A"},{" "}
                  {orderData?.address?.city || "N/A"},{" "}
                  {orderData?.address?.state || "N/A"} -{" "}
                  {orderData?.address?.pincode || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="od-card od-items-card">
          <p className="od-card-title">Items Ordered</p>
          <div className="od-table-wrapper">
            <table className="od-table">
              <thead>
                {
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                }
              </thead>
              <tbody>
                {/* replace these rows with your api data using .map() */}
                {orderData?.items?.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td className="od-td-num">{index + 1}</td>
                      <td className="od-td-name">
                        <span className="od-item-emoji">
                          <img
                            style={{ width: "50px" }}
                            src={item?.product?.thumbnail}
                            alt={item?.product?.title}
                          />
                        </span>
                        {item?.product?.title || "N/A"}
                      </td>
                      <td className="od-td-qty">×{item?.quantity}</td>
                      <td className="od-td-price">
                        ₹{item?.price?.toFixed(2) || "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="od-total-row">
            <span className="od-total-label">Total Amount</span>
            <span className="od-total-value">
              ₹{orderData?.totalPrice || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
