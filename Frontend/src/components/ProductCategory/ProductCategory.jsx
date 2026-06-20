import { Link } from "react-router-dom";
import "./ProductCategory.css";
import { api } from "../../api/axios";
import { useState, useEffect } from "react";
import { useCategory } from "../../hooks/useCategory";

export const ProductCategory = () => {
  const [category, setCategory] = useState();
  const [error, setError] = useState();
  const { data: categories} = useCategory()

  

  // render categories
  return (
    <div className="category-slider">
      {categories?.map((item) => {
        return (
          <Link to={`/category/${item.slug}`} key={item._id}>
            <div className="category-card">
              <img
                className="category-card-img"
                src={item.thumbnail}
                alt={item.title}
              />
              <span className="category-title"> {item.title} </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
