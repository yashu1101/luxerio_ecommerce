import { useEffect, useState } from "react";
import { api } from "../../../api/axios";
import { useNavigate } from "react-router-dom";

import "./Category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Loader } from "../../../components/Loader/Loader";

export const Category = () => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //   api for fetch categories data
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get(`categories`);

      setCategories(res?.data);
    } catch (error) {
      setError(error.response.data.message || "Somthing went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  //   api for delete categories
  const deleteCategory = async (categoryId) => {
    try {
      const res = await api.delete(`categories/${categoryId}`);
      setMessage(res.data.message);
      fetchCategories();
    } catch (error) {
      setError(error.response.data.message || "Somthing went wrong!");
    }
  };

  const navigate = useNavigate();
  const addCategoryForm = () => {
    navigate("/admin/categories/add");
  };

  // loading

  if (loading) {
    return (
      <div className="admin-categories-container">
        <Loader></Loader>
      </div>
    );
  }

  //   Render product card
  return (
    <div className="admin-categories-container">
      <div className="admin-categories-header">
        <span className="admin-categories-heading">Categories</span>
        <button className="admin-product-add-button" onClick={addCategoryForm}>
          Add category
        </button>
      </div>
      <div className="admin-categories-table-container">
        <table className="admin-categories-table">
          <thead>
            <tr>
              <th className="categories-table-heading">Image</th>
              <th className="categories-table-heading">Title</th>
              <th className="categories-table-heading">Slug</th>
              <th className="categories-table-heading">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories?.map((category) => {
              return (
                <tr className="admin-category-table-row" key={category?._id}>
                  <td className="category-table-coll category-img-coll">
                    <img
                      className="admin-category-thumbnail"
                      src={category?.thumbnail}
                      alt={""}
                    />
                  </td>
                  <td className="category-table-coll category-name-coll ">
                    {" "}
                    {category?.title}
                  </td>
                  <td className="category-table-coll category-slug-coll ">
                    {category?.slug}
                  </td>

                  <td className="category-table-coll category-action-coll ">
                    {" "}
                    <FontAwesomeIcon
                      className="admin-category-action-button action-edit"
                      icon={faEdit}></FontAwesomeIcon>{" "}
                    <FontAwesomeIcon
                      onClick={() => deleteCategory(category?._id)}
                      className="admin-category-action-button action-delete"
                      icon={faTrash}></FontAwesomeIcon>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};
