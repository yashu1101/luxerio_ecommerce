import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderDetail.css";
import { DateFormator } from "../../../../utility/DateFormator";
import { Loader } from "../../../../components/Loader/Loader";
import { useOrderView } from "../../../../hooks/useOrder";
import { useUpdateOrderStatus } from "../../../../hooks/useOrderAction";

export function OrderDetail() {
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  const { orderId } = useParams();

  // VIEW ORDER
  const { data, isLoading } = useOrderView(orderId);
  //SET INITIAL STATUS VALUE
  const [statusValue, setStatusValue] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data?.status) {
      setStatusValue(data?.status);
    }
  }, [data]);

  // UPDATE ORDER STATUS
  const { mutate: orderStatusMutate, isPending } = useUpdateOrderStatus();

  const handleOnChange = (e) => {
    setStatusValue(e.target.value);
    setSaved(false);
  };

  const handleSave = () => {
    orderStatusMutate(
      { orderId, orderStatus: statusValue },
      {
        onSuccess: () => {
          setSaved(true);
        },
      },
    );
  };

  // Get first letter of Name
  const fullname = data?.user?.username;
  const first_letter = fullname?.split("")[0].toUpperCase();

  return isLoading ? (
    <Loader height={"100dvh"}></Loader>
  ) : (
    <div className="od-wrapper">
      <div className="od-container">
        <div className="od-header">
          <div className="od-header-left">
            <span className="od-label">Order Details</span>
            <h1 className="od-order-id">{data?._id || "N/A"}</h1>
          </div>

          {/* Status Dropdown */}
          <div className="od-status-control">
            <div
              className={`od-status-select-wrap status-${statusValue?.toLowerCase()}`}>
              <span className="od-status-dot" />
              <select
                className={`od-status-select status-${statusValue?.toLowerCase()}`}
                value={statusValue}
                onChange={handleOnChange}>
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <span className="od-select-arrow">▾</span>
            </div>

            <button
              className={`od-save-btn ${saving ? "saving" : ""} ${saved ? "saved" : ""}`}
              onClick={handleSave}
              disabled={saving}>
              {saving ? "Saving..." : saved ? "✓ Saved" : "Update"}
            </button>
          </div>
        </div>

        {/* ── Top 3-col Grid ── */}
        <div className="od-grid-top">
          {/* Customer */}
          <div className="od-card">
            <p className="od-card-title">Customer</p>
            <div className="od-avatar">{first_letter}</div>
            <p className="od-user-name">{data?.user?.username || "N/A"}</p>
            <p className="od-user-email">{data?.user?.email || "N/A"}</p>
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
                    {DateFormator(data?.createdAt) || "N/A"}
                  </p>
                </div>
              </div>
              <div className="od-tl-line" />
              <div className="od-tl-row">
                <div className="od-tl-dot dot-green" />
                <div>
                  <p className="od-tl-label">Delivery Date</p>
                  <p className="od-tl-value">
                    {DateFormator(data?.deliveryDate) || "N/A"}
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
                <p className="od-tl-value">{data?.paymentMethod || "N/A"}</p>
              </div>
            </div>
            <div className="od-divider" />
            <div className="od-info-row">
              <span className="od-info-icon">📍</span>
              <div>
                <p className="od-tl-label">Shipping Address</p>
                <p className="od-tl-value od-address">
                  {data?.address?.addressLine || "N/A"},{" "}
                  {data?.address?.city || "N/A"},{" "}
                  {data?.address?.state || "N/A"} -{" "}
                  {data?.address?.pincode || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Items Table ── */}
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
                {data?.items?.map((item, index) => {
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
            <span className="od-total-value">₹{data?.totalPrice || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
