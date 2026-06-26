import "./Dashboard.css";
import {
  faBox,
  faLayerGroup,
  faUsers,
  faCartShopping,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../../../api/axios";
import { AdminAnimation } from "../../../components/Animations/AdminAnimation";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../../components/Loader/Loader";
import { useUser } from "../../../hooks/useUser";

export const Dashboard = () => {
  const { data: user, isLoading: isUserLoading } = useUser();
  //   get dashboard data

  const { data, isLoading } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const res = await api.get("dashboard/data");
      return res?.data;
    },
  });

  if (isLoading && isUserLoading) return <Loader height={"100dvh"}></Loader>;

  return (
    <AdminAnimation>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-heading">Dashboard</h1>
          <p className="dashboard-subheading">
            Welcome back, {user?.username} 👋
          </p>
        </div>

        <div className="dashboard-cards-container">
          <div className="dashboard-card">
            <div className="dashboard-card-icon product-icon">
              <FontAwesomeIcon icon={faBox} />
            </div>

            <div className="dashboard-card-content">
              <span className="dashboard-card-title">Products</span>
              <span className="dashboard-card-value">{data?.totalProduct}</span>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon category-icon">
              <FontAwesomeIcon icon={faLayerGroup} />
            </div>

            <div className="dashboard-card-content">
              <span className="dashboard-card-title">Categories</span>
              <span className="dashboard-card-value">
                {data?.totalCategory}
              </span>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon user-icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>

            <div className="dashboard-card-content">
              <span className="dashboard-card-title">Users</span>
              <span className="dashboard-card-value">{data?.totalUser}</span>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon order-icon">
              <FontAwesomeIcon icon={faCartShopping} />
            </div>

            <div className="dashboard-card-content">
              <span className="dashboard-card-title">Orders</span>
              <span className="dashboard-card-value">{data?.totalOrder}</span>
            </div>
          </div>

          <div className="dashboard-card revenue-card">
            <div className="dashboard-card-icon revenue-icon">
              <FontAwesomeIcon icon={faIndianRupeeSign} />
            </div>

            <div className="dashboard-card-content">
              <span className="dashboard-card-title">Revenue</span>
              <span className="dashboard-card-value">
                ₹ {data?.totalRevenue}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminAnimation>
  );
};
