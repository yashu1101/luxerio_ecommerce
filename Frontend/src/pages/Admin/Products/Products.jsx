import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../../components/Pagination/Pagination";
import "./Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "../../../components/Loader/Loader";
import { useProduct } from "../../../hooks/useProduct";
import { AdminAnimation } from "../../../components/Animations/AdminAnimation";
import { useDeleteProduct } from "../../../hooks/useProductAction";

export const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  console.log(currentPage);

  //   api for fetch products data
  const { data, isLoading, error } = useProduct({
    search: "",
    currentPage,
  });
  const { mutate: deleteProductMutate, isPending: isDeleteProductPending } =
    useDeleteProduct();

  const navigate = useNavigate();

  // navigate to view product page
  const viewProduct = (productId) => {
    navigate(`/admin/products/view/${productId}`);
  };

  // navigate to add product form
  const addProductsForm = () => {
    navigate("/admin/products/add");
  };

  // navigate to update product form
  const updateProductForm = (productId) => {
    navigate(`/admin/products/update/${productId}`);
  };


  if(isLoading) return <Loader height={'100dvh'} ></Loader>
  //   Render product card
  return (
    <AdminAnimation>
      <div className="admin-products-container">
        <div className="admin-products-header">
          <span className="admin-products-heading">Products</span>
          <button
            className="admin-product-add-button"
            onClick={addProductsForm}>
            Add product
          </button>
        </div>
        <div className="admin-products-table-container">
          <table className="admin-products-table">
            <thead>
              <tr>
                <th className="products-table-heading">Image</th>
                <th className="products-table-heading">Title</th>
                <th className="products-table-heading product-category-heading">
                  Category
                </th>
                <th className="products-table-heading">Price</th>
                <th className="products-table-heading">Stock</th>
                <th className="products-table-heading">Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.products?.map((product) => {
                return (
                  <tr className="admin-product-table-row" key={product?._id}>
                    <td className="product-table-coll product-img-coll">
                      <img
                        className="admin-product-thumbnail"
                        src={product?.thumbnail}
                        alt={""}
                      />
                    </td>
                    <td className="product-table-coll product-title-coll">
                      {" "}
                      {product?.title}
                    </td>
                    <td className="product-table-coll product-category-coll">
                      {" "}
                      {product?.category}
                    </td>
                    <td className="product-table-coll product-price-coll">
                      {product?.price}
                    </td>
                    <td className="product-table-coll product-stock-coll">
                      {product?.stock}
                    </td>
                    <td className="product-table-coll product-action-coll">
                      <div className="product-action-container">
                        <FontAwesomeIcon
                          onClick={() => viewProduct(product._id)}
                          className="admin-product-action-button action-view-product"
                          icon={faEye}></FontAwesomeIcon>{" "}
                        <FontAwesomeIcon
                          onClick={() => updateProductForm(product._id)}
                          className="admin-product-action-button action-edit-product"
                          icon={faEdit}></FontAwesomeIcon>{" "}
                        <FontAwesomeIcon
                          onClick={() => deleteProductMutate(product._id)}
                          className="admin-product-action-button action-delete-product"
                          icon={faTrash}></FontAwesomeIcon>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="admin-products-pagination">
          <Pagination
            currentPage={currentPage}
            totalPage={data?.totalPage}
            setCurrentPage={setCurrentPage}></Pagination>
        </div>
      </div>
    </AdminAnimation>
  );
};
