import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCircleInfo,
  faHeadphones,
  faHeadset,
  faHeart,
  faPhone,
  faShoppingBag,
  faShoppingBasket,
  faShoppingCart,
  faUser,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";

import starImage from "../../assets/icons/stars.png";
import { useEffect } from "react";
import { useLogout } from "../../hooks/useLogout";

export const Sidebar = ({ isSidebar, setIsOpen }) => {
  const { UserLogout, message, user } = useContext(AuthContext);
  const {mutate: logoutMutate, isPending} = useLogout()

 

  return (
    <>
      <div className="sidebar">
        {user == null && (
          <div className="auth-buttons">
            <Link to={"/auth/login"} className="auth-button auth-login-btn">
              Login
            </Link>
            <Link to={"/auth/signup"} className="auth-button auth-signup-btn">
              Signup
            </Link>
          </div>
        )}

        {user && (
          <li className="sidebar-item sidebar-auth-name">
            <span>Welcome</span>
            <span className="sidebar-username">{user?.username}</span>
            <span className="logout-button" onClick={logoutMutate}>
              Logout
              <FontAwesomeIcon
                className="logout-button-icon"
                onClick={UserLogout}
                icon={faArrowRightFromBracket}></FontAwesomeIcon>
            </span>

           
          </li>
        )}
        <li className="sidebar-item">
          <Link
            to="/myprofile"
            className="sidebar-link"
            onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon
              className="sidebar-link-button"
              icon={faUser}></FontAwesomeIcon>{" "}
            Profile
          </Link>
        </li>
        {user?.role === "admin" && (
          <li className="sidebar-item">
            <Link
              to="/admin"
              className="sidebar-link sidebar-admin-link"
              onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon
                className="sidebar-link-button sidebar-admin-icon"
                icon={faUserGear}></FontAwesomeIcon>{" "}
              Admin
            </Link>
          </li>
        )}
        <li className="sidebar-item">
          <Link
            to="/wishlist"
            className="sidebar-link"
            onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon
              className="sidebar-link-button"
              icon={faHeart}></FontAwesomeIcon>{" "}
            Wishlist
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="cart"
            className="sidebar-link"
            onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon
              className="sidebar-link-button"
              icon={faShoppingCart}></FontAwesomeIcon>{" "}
            Cart
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="myorders"
            className="sidebar-link"
            onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon
              className="sidebar-link-button"
              icon={faShoppingBasket}></FontAwesomeIcon>{" "}
            Orders
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="#"
            className="sidebar-link"
            onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon
              className="sidebar-link-button"
              icon={faCircleInfo}></FontAwesomeIcon>{" "}
            Help
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="#"
            className="sidebar-link"
            onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon
              className="sidebar-link-button"
              icon={faHeadset}></FontAwesomeIcon>{" "}
            Contact
          </Link>
        </li>
        <li className="sidebar-item sidebar-ai-button">
          <Link
            to="chat"
            style={{ color: "inherit" }}
            className="nav-action-ai-button-link"
            onClick={() => setIsOpen(false)}>
            <span className="nav-action-ai-text"> Ask ai </span>{" "}
            <span className="nav-action-ai-img-container">
              <img
                className="nav-action-ai-button-img"
                src={starImage}
                alt=""
              />
            </span>
          </Link>
        </li>
      </div>
    </>
  );
};
