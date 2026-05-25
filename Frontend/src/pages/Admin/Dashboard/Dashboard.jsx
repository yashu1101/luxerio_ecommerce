import "./Dashboard.css";
import {
  faBox,
  faLayerGroup,
  faUsers,
  faCartShopping,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { api } from "../../../api/axios";
import { useEffect } from "react";
import { AuthContext } from "../../../Context/AuthContext";

export const Dashboard = () => {
  const [totalProduct, setTotalProduct] = useState("");
  const [totalCategory, setTotalCategory] = useState("");
  const [totalUser, setTotalUser] = useState("");
  const [totalOrder, setTotalOrder] = useState("");
  const [totalRevenue, setTotalRevenue] = useState("");


  const [dashboardLoading, setDashboardLoading] = useState(false)
  const {user,loadind} = useContext(AuthContext)


//   get dashboard data 
  const getDashboardData = async () => {
    try {
      setDashboardLoading(true)
      const res = await api.get("dashboard/data");
      setTotalProduct(res?.data?.totalProduct);
      setTotalCategory(res?.data?.totalCategory);
      setTotalOrder(res?.data?.totalOrder);
      setTotalUser(res?.data?.totalUser);
      setTotalRevenue(res?.data?.totalRevenue);
    } catch (error) {
      console.log(error.response.data.message || "Somthing went wrong!");
    }finally{
      setDashboardLoading(false)
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-heading">Dashboard</h1>
        <p className="dashboard-subheading">Welcome back, {user?.username} 👋</p>
      </div>

      <div className="dashboard-cards-container">
        <div className="dashboard-card">
          <div className="dashboard-card-icon product-icon">
            <FontAwesomeIcon icon={faBox} />
          </div>

          <div className="dashboard-card-content">
            <span className="dashboard-card-title">Products</span>
            <span className="dashboard-card-value">{totalProduct}</span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon category-icon">
            <FontAwesomeIcon icon={faLayerGroup} />
          </div>

          <div className="dashboard-card-content">
            <span className="dashboard-card-title">Categories</span>
            <span className="dashboard-card-value">{totalCategory}</span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon user-icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>

          <div className="dashboard-card-content">
            <span className="dashboard-card-title">Users</span>
            <span className="dashboard-card-value">{totalUser}</span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-icon order-icon">
            <FontAwesomeIcon icon={faCartShopping} />
          </div>

          <div className="dashboard-card-content">
            <span className="dashboard-card-title">Orders</span>
            <span className="dashboard-card-value">{totalOrder}</span>
          </div>
        </div>

        <div className="dashboard-card revenue-card">
          <div className="dashboard-card-icon revenue-icon">
            <FontAwesomeIcon icon={faIndianRupeeSign} />
          </div>

          <div className="dashboard-card-content">
            <span className="dashboard-card-title">Revenue</span>
            <span className="dashboard-card-value">₹ {totalRevenue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
