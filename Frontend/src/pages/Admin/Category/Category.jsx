import { api } from "../../../api/axios";
import { useNavigate } from "react-router-dom";

import "./Category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "../../../components/Loader/Loader";
import { AdminAnimation } from "../../../components/Animations/AdminAnimation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const Category = () => {
  //   FETCH CATEGORIES

  const { data: categories, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await api.get(`categories`);
      return res?.data;
    },
  });

  //  DELETE CATEGORIES

  const queryClient = useQueryClient();
  const { mutate: deleteCategoryMutate, isPending } = useMutation({
    mutationFn: async (categoryId) => {
      const res = await api.delete(`categories/${categoryId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
      console.log("Category added.");
    },
    onError: (error) =>
      console.log(error?.response?.data?.message || "Category not added."),
  });

  const navigate = useNavigate();
  const addCategoryForm = () => {
    navigate("/admin/categories/add");
  };

  // loading

  if (isLoading) {
    return <Loader height={"100dvh"}></Loader>;
  }

  return (
    <AdminAnimation>
      <div className="admin-categories-container">
        <div className="admin-categories-header">
          <span className="admin-categories-heading">Categories</span>
          <button
            className="admin-product-add-button"
            onClick={addCategoryForm}>
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
                        onClick={() => deleteCategoryMutate(category?._id)}
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
    </AdminAnimation>
  );
};
