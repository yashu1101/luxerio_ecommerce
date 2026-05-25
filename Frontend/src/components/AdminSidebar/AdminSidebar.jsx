import { NavLink, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
export const AdminSidebar = ({ isSidebarOpen, setIsSidebarOpen, }) => {
  const { user, UserLogout } = useContext(AuthContext);
  const { sidebarHideOnElementClick, setSidebarHideOnElementClick } =
    useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const HideSidebarOnElementClick = () => {
    setSidebarHideOnElementClick(true);
  };

  const navigate = useNavigate();
  const adminLogout = async () => {
    const result = await UserLogout();
    if (result.status) {
      navigate("/");
    }
  };

  const username = user?.username;
  const firstLetter = username?.split("")[0] || "?";
  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-profile-container">
        <span className="admin-sidebar-toggle" onClick={toggleSidebar}>
          <FontAwesomeIcon
            className="admin-sidebar-toggle-icon"
            icon={faXmark}></FontAwesomeIcon>
        </span>
        <span className="sidebar-profile-circle"></span>
        <span className="sidebar-profile-circle-2">{firstLetter}</span>
        <span className="admin-sidebar-profile-name">
          {user?.username || ""}
        </span>
        <span className="admin-sidebar-profile-role">Role: {user?.role}</span>
        <span className="admin-sidebar-profile-logout" onClick={adminLogout}>
          LOGOUT
        </span>
      </div>
      <ul className="admin-sidebar-list">
        <li
          className="admin-sidebar-list-element"
          onClick={toggleSidebar}>
          <NavLink
            className={({ isActive }) =>
              `admin-sidebar-navlinks ${isActive ? "admin-sidebar-navlinks-active" : ""}`
            }
            to="dashboard">
            Dashboard
          </NavLink>
        </li>
        <li
          className="admin-sidebar-list-element"
          onClick={toggleSidebar}>
          <NavLink
            className={({ isActive }) =>
              `admin-sidebar-navlinks ${isActive ? "admin-sidebar-navlinks-active" : ""}`
            }
            to="products">
            Products
          </NavLink>
        </li>
        <li
          className="admin-sidebar-list-element"
          onClick={toggleSidebar}>
          <NavLink
            className={({ isActive }) =>
              `admin-sidebar-navlinks ${isActive ? "admin-sidebar-navlinks-active" : ""}`
            }
            to="categories">
            Categories
          </NavLink>
        </li>
        <li
          className="admin-sidebar-list-element"
          onClick={toggleSidebar}>
          <NavLink
            className={({ isActive }) =>
              `admin-sidebar-navlinks ${isActive ? "admin-sidebar-navlinks-active" : ""}`
            }
            to="orders">
            Orders
          </NavLink>
        </li>
        <li
          className="admin-sidebar-list-element"
          onClick={toggleSidebar}>
          <NavLink
            className={({ isActive }) =>
              `admin-sidebar-navlinks ${isActive ? "admin-sidebar-navlinks-active" : ""}`
            }
            to="users">
            Users
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
