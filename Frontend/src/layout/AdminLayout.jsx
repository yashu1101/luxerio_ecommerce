import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../components/AdminSidebar/AdminSidebar";
import "./AdminLayout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AccessDenied } from "../pages";
import { Loader } from "../components/Loader/Loader";
import { useUser } from "../hooks/useUser";

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: user, isLoading } = useUser();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // loading
  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <Loader></Loader>
      </div>
    );
  }

  // Access denied
  if (!isLoading && user?.role !== "admin") {
    return <AccessDenied></AccessDenied>;
  }
  return (
    <>
      <div className="admin-layout">
        <div
          className={`admin-layout-sidebar ${isSidebarOpen ? "admin-layout-sidebar-show" : "admin-layout-sidebar-hide"}`}>
          <AdminSidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}></AdminSidebar>
        </div>
        <div className="sidebar-toggle-button" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBarsStaggered}></FontAwesomeIcon>
        </div>
        <div className="admin-layout-content">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};
