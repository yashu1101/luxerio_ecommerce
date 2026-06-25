import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faShoppingCart,
  faBarsStaggered,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "./Navbar.css";
import { useEffect, useState } from "react";
import { SearchBar } from "../Searchbar/SearchBar";
import { Sidebar } from "../Sidebar/Sidebar";
import starImage from "../../assets/icons/stars.png";

export const Navbar = ({ adaptive }) => {
  const [headerBG, setHeaderBG] = useState({ backgroundColor: "transparent" });
  const [navTitleColor, setNavTitleColor] = useState({ color: "white" });
  const [navBtnColor, setNavBtnColor] = useState({ color: "white" });
  const [navSearch, setNavSearch] = useState(true);
  const [isSidebar, setIsSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // =================SIDEBAR TOGGLE===============

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let timeoutId = null;

  const ShowSidebar = () => {
    if (!isMobile) {
      setIsSidebar(true);
      clearTimeout(timeoutId);
    }
  };

  const HideSidebar = () => {
    if (!isMobile) {
      timeoutId = setTimeout(() => {
        setIsSidebar(false);
      }, 500);
    }
  };

  // MOBILE: toggle on click
  const ToggleSidebar = () => {
    if (isMobile) {
      setIsSidebar(!isSidebar);
    }
  };

  return (
    <>
      <div className="header">
        <div className="navbar">
          <Link to="/">
            <span className="navbar-title">Luxerio</span>
          </Link>

          <div className="nav-actions">
            <div className="nav-search">
              <SearchBar></SearchBar>
            </div>

            {/* ==================== NAV ICON ==================== */}

            <li className="nav-action-btn nav-action-btn-ai-search">
              <Link
                to="chat"
                style={{ color: "inherit" }}
                className="nav-action-ai-button-link">
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
            {/* <li className="nav-action-btn">
              <Link to="/wishlist" style={{ color: "inherit" }}>
                <FontAwesomeIcon className="nav-action-icon" icon={faHeart} />
              </Link>
            </li>

            <li className="nav-action-btn">
              <Link to="/cart" style={{ color: "inherit" }}>
                <FontAwesomeIcon
                  className="nav-action-icon"
                  icon={faShoppingCart}
                />
              </Link>
            </li> */}
            <li
              className="nav-action-btn"
              onMouseOver={ShowSidebar}
              onMouseLeave={HideSidebar}
              onClick={ToggleSidebar}>
              <FontAwesomeIcon className="nav-action-icon" icon={faBarsStaggered} />
            </li>
            {/* <li
              className="nav-action-btn"
              onMouseOver={ShowSidebar}
              onMouseLeave={HideSidebar}
              onClick={ToggleSidebar}>
              <FontAwesomeIcon className="nav-action-icon" icon={faSearch} />
            </li> */}
          </div>

          {/* ==================== SIDEBAR ==================== */}
          {isSidebar && (
            <div
              className="nav-sidebar"
              onMouseOver={ShowSidebar}
              onMouseLeave={HideSidebar}>
              <Sidebar setIsOpen={setIsSidebar}></Sidebar>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
