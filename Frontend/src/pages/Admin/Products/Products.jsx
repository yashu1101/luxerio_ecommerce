import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/axios";
import { Card } from "../../../components/Card/Card";
import { Pagination } from "../../../components/Pagination/Pagination";
import "./Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faEdit,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ProductContext } from "../../../Context/ProductsContext";
import { Loader } from "../../../components/Loader/Loader";

export const Products = () => {
  const [products, setProducts] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const { deleteProduct, message } = useContext(ProductContext);
  console.log(currentPage);

  //   api for fetch products data
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get(`products?page=${currentPage}&limit=10`);

      setProducts(res?.data?.products);
      setTotalPage(res?.data?.totalPage);
    } catch (error) {
      //   setError(error.response.data.message || "Somthing went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

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

  //   Render product card
  return (
    <div className="admin-products-container">
      <div className="admin-products-header">
        <span className="admin-products-heading">Products</span>
        <button className="admin-product-add-button" onClick={addProductsForm}>
          Add product
        </button>
      </div>
      <div className="admin-products-table-container">
        <table className="admin-products-table">
          {loading && <Loader></Loader>}
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
            {products?.map((product) => {
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
                        onClick={() => deleteProduct(product._id)}
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
          totalPage={totalPage}
          setCurrentPage={setCurrentPage}></Pagination>
      </div>
    </div>
  );
};
