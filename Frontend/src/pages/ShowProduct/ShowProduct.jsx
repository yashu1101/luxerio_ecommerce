import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { Card } from "../../components/Card/Card";
import "./ShowProduct.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { Filter } from "../../components/Filter/Filter";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import { ProductContext } from "../../Context/ProductsContext";
import { Pagination } from "../../components/Pagination/Pagination";
import { Loader } from "../../components/Loader/Loader";

export const ShowProduct = () => {
  const { categoryName } = useParams();

  const {
    products,
    getAllProduct,
    loading,
    currentPage,
    setCurrentPage,
    totalPage,
  } = useContext(ProductContext);

  useEffect(() => {
    getAllProduct({ category: categoryName });
  }, [categoryName, currentPage]);

  return (
    <>
      <div className="product-section">
        <Filter category={categoryName}></Filter>

        {loading ? (
          <Loader height={"80vh"}></Loader>
        ) : (
          <div className="products">
            {products?.map((product) => {
              return (
                <div className="product" key={product?._id}>
                  <Card
                    productId={product?._id}
                    title={product?.title}
                    src={product?.thumbnail}
                    rating={product?.rating}
                    brand={
                      !product?.brand
                        ? ""
                        : product?.brand.trim().length > 8
                          ? product?.brand.trim().substring(0, 8) + ".."
                          : product?.brand
                    }
                    price={product?.price}
                    description={
                      product?.description.trim().length > 50
                        ? product?.description.trim().substring(0, 50) + "..."
                        : product?.description
                    }
                    wishlist={product?._id}
                    cart={product?._id}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="pagination-button-container">
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            setCurrentPage={setCurrentPage}></Pagination>
        </div>
      </div>
    </>
  );
};
