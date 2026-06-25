import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "../../../components/Loader/Loader";
import { DateFormator } from "../../../utility/DateFormator";
import { useOrderAll } from "../../../hooks/useOrder";

export const Order = () => {


  const { data, isLoading, error } = useOrderAll()
  // console.log(data)


  //  navigate to orede details page
  const navigate = useNavigate();
  const viewOrderDetails = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  // Loading

  if (isLoading) {
    return (
      <div className="admin-orders-container">
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="admin-orders-container">
      <div className="admin-orders-header">
        <span className="admin-orders-heading">Orders</span>
      </div>
      <div className="admin-orders-table-container">
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th className="orders-table-heading">OrderId</th>
              <th className="orders-table-heading">User</th>
              <th className="orders-table-heading">Address</th>
              <th className="orders-table-heading">Items</th>

              <th className="orders-table-heading">Total Price</th>
              <th className="orders-table-heading">Payment</th>
              <th className="orders-table-heading">OrderedAt</th>
              <th className="orders-table-heading">DeliveryDate</th>
              <th className="orders-table-heading">Status</th>
              <th className="orders-table-heading">Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((order) => {
              return (
                <tr className="admin-order-table-row" key={order?._id}>
                  <td className="order-table-coll order-id-coll ">
                    {" "}
                    {order?._id.slice(0, 4) + "..." + order?._id.slice(-4)}
                  </td>
                  <td className="order-table-coll order-user-coll ">
                    {" "}
                    <span className="order-user-name">
                      {order?.user?.username}
                    </span>
                  </td>
                  <td className="order-table-coll order-address-coll ">
                    {`${order?.address?.city}, ${order?.address?.state} `}
                  </td>
                  <td className="order-table-coll order-item-coll ">
                    {order?.items?.length > 10
                      ? "10+ items"
                      : order?.items?.length + " items"}
                  </td>

                  <td className="order-table-coll order-totalprice-coll ">
                    {order?.totalPrice?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                  <td className="order-table-coll order-payment-coll ">
                    {order?.paymentMethod}
                  </td>
                  <td className="order-table-coll order-orderdate-coll ">
                    {DateFormator(order?.createdAt)}
                  </td>
                  <td className="order-table-coll order-deliverydate-coll ">
                    {DateFormator(order?.deliveryDate)}
                  </td>
                  <td className={`order-table-coll order-status-coll  `}>
                    <span
                      className={` status-coll-text ${
                        order?.status === "pending"
                          ? "order-status-pending"
                          : order?.status === "shipped"
                            ? "order-status-shipped"
                            : order?.status === "delivered"
                              ? "order-status-delivered"
                              : order?.status === "cancelled"
                                ? "order-status-cancelled"
                                : ""
                      }`}>
                      {order?.status}
                    </span>
                  </td>

                  <td className="order-table-coll order-action-coll ">
                    <FontAwesomeIcon
                      className=" action-view-order-button"
                      icon={faEye}
                      onClick={() =>
                        viewOrderDetails(order?._id)
                      }></FontAwesomeIcon>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
