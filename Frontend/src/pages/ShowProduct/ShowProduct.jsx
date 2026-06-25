import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../components/Card/Card";
import "./ShowProduct.css";
import { Filter } from "../../components/Filter/Filter";
import { useContext } from "react";

import { ProductContext } from "../../Context/ProductsContext";
import { Pagination } from "../../components/Pagination/Pagination";
import { Loader } from "../../components/Loader/Loader";
import { useProduct } from "../../hooks/useProduct";

export const ShowProduct = () => {
  const { categoryName } = useParams();

  const {
    checkedBrands,
    checkedColors,
    selectedOption,
    selectedPrice,
    setCheckedBrands,
    setCheckedColors,
    setSelectedPrice,
    setSelectedOption,
    currentPage,
    setCurrentPage,
    totalPage,
    setTotalPage
  } = useContext(ProductContext);

  const { data, isLoading, error } = useProduct({
    categoryName,
    checkedBrands,
    checkedColors,
    selectedOption,
    selectedPrice,
    currentPage
  });

  console.log(data)

  useEffect(() => {
    setCheckedBrands([]);
    setCheckedColors([]);
    setSelectedPrice("");
    setSelectedOption("");
  }, [categoryName]);

  // console.log(data);
  // console.log(error);

  return (
    <>
      <div className="product-section">
        <Filter category={categoryName}></Filter>

        {isLoading ? (
          <Loader height={"80dvh"}></Loader>
        ) : (
          <div className="products">
            {data?.products?.map((product) => {
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
            totalPage={data?.totalPage}
            setCurrentPage={setCurrentPage}></Pagination>
        </div>
      </div>
    </>
  );
};
