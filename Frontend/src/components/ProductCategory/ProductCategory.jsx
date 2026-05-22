import { Link } from "react-router-dom";
import "./ProductCategory.css";
import { api } from "../../api/axios";
import { useState, useEffect } from "react";

export const ProductCategory = () => {
  const [category, setCategory] = useState();
  const [error, setError] = useState();

  // fetch category data
  const fetchData = async () => {
    try {
      const res = await api.get("categories");
      setCategory(res.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // render categories
  return (
    <div className="category-slider">
      {category?.map((item) => {
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
