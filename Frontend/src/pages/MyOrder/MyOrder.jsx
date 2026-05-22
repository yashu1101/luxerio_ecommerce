import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyOrder.css";
import { api } from "../../api/axios";
import { AuthContext } from "../../Context/AuthContext";
import { Loader } from "../../components/Loader/Loader";

export const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const [loadingData, setLoadingData] = useState(false);
  // const [loading,setLoading]

  const getOrder = async () => {
    try {
      setLoadingData(true);
      const res = await api.get("orders");
      setOrders(res?.data?.orders);
    } catch (error) {
      console.log(error.response.data.message || "Somthing went wrong!");
    } finally {
      setLoadingData(false);
    }
  };

  const navigate = useNavigate();
  // Redirect to login page if user not logged In.

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth/login", { replace: true });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    getOrder();
  }, []);

  if (loadingData) {
    return <Loader></Loader>;
  }

  return (
    <div className="myorder-section">
      <div className="myorder-heading-container">
        <h3>My Orders</h3>
      </div>
      <div className="myorder-container">
        {orders?.map((order) => {
          return (
            <Link className="myorder-link" to={`${order._id}`} key={order?._id}>
              <div
                className={`myorder-wrapper ${order?.status === "cancelled" && "myorder-wrapper-overlay"}`}>
                <div className="myorder-image-container">
                  <img
                    src={order?.items?.[0].product?.thumbnail}
                    alt={order?._id}
                    className="myorder-image"
                  />
                  {order?.items?.length > 1 && (
                    <div className="myorder-image-overlay">
                      {order?.items?.length === 2
                        ? "1 more item"
                        : `+${order?.items?.length - 1} more`}
                    </div>
                  )}
                </div>
                <div className="myorder-detail">
                  <span className="myorder-id">Order Id: {order?._id}</span>
                  <span className="myorder-item-qty">
                    Total Item: {order?.items?.length}
                  </span>
                  <span className="myorder-totalprice">
                    Total Price: ₹{order?.totalPrice}
                  </span>
                  <span
                    className={`myorder-status ${order?.status === "pending" ? "myorder-status-pending" : order?.status === "shipped" ? "myorder-status-shipped" : order?.status === "delivered" ? "myorder-status-delivered" : order?.status === "cancelled" ? "myorder-status-cancelled" : ""}`}>
                    {order?.status}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
