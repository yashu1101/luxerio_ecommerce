import { useParams } from "react-router-dom";

import { Card } from "../../components/Card/Card";

import "./Searches.css";

import { Navbar } from "../../components/Navbar/Navbar";
import { useProduct } from "../../hooks/useProduct";
import { Loader } from "../../components/Loader/Loader";

export const Searches = () => {
  const { searchKeyword } = useParams();

  const { data, isLoading, error } = useProduct({
    search: searchKeyword,
  });

  if(isLoading) return <Loader height={'100dvh'} ></Loader>

  return (
    <>
      <Navbar adaptive={false} allowSearch={true}></Navbar>
      <div className="searches-section">
        <div className="searches-title-bar">
          {data?.products?.length === 0 ? (
            <h1 className="searches-title">{`Showing 0 result for "${searchKeyword}".`}</h1>
          ) : (
            <h1 className="searches-title">{`Showing ${data?.products.length} result for '${searchKeyword}'.`}</h1>
          )}
        </div>
        <div className="searches-container">
          <div className="searches">
            {data?.products?.length > 0 &&
              data?.products?.map((product) => {
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
        </div>
      </div>
    </>
  );
};
