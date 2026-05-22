import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "./SearchBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import { ProductContext } from "../../Context/ProductsContext";
export const SearchBar = ({ maxWidth }) => {
  const [search, setSearch] = useState("");
  // const { message, SearchProduct, searchItems } = useContext(SearchContext);

  const navigate = useNavigate();

  const handleOnClick = (e) => {
    setSearch(e.target.value);
  };
  const handleOnEnterKey = (e) => {
    if (e.key === "Enter") {
      if (search.trim() === "" || !search) return e.preventDefault();
      navigate(`/search/${encodeURIComponent(search.trim())}`);
    }
  };

  const isSearchEmpty = search.trim() === "";

  return (
    <>
      <div className="searchbar-container">
        <div className="searchbar">
          <input
            className="search-box"
            type="text"
            placeholder="Search for products"
            onChange={handleOnClick}
            onKeyDown={handleOnEnterKey}
          />

          <span
            className={`search-button ${isSearchEmpty ? "disabled" : ""}`}
            title={isSearchEmpty ? "Enter something to search" : "Search"}
          >
            {isSearchEmpty ? (
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
            ) : (
              <Link to={`/search/${encodeURIComponent(search.trim())}`}>
                <FontAwesomeIcon className="search-icon" icon={faSearch} />
              </Link>
            )}
          </span>
        </div>
      </div>
    </>
  );
};
