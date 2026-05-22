import { useParams } from "react-router-dom";

import { Card } from "../../components/Card/Card";
import { useContext, useEffect } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import { ProductContext } from "../../Context/ProductsContext";

import "./Searches.css";

import { Navbar } from "../../components/Navbar/Navbar";

export const Searches = () => {
  const {searchKeyword} = useParams()
    const { products, getAllProduct} = useContext(ProductContext)

    useEffect(()=>{
     
      getAllProduct({search: searchKeyword})
    },[searchKeyword])

    
  return (
    <>
      <Navbar adaptive={false} allowSearch={true}></Navbar>
      <div className="searches-section">
        <div className="searches-title-bar">
          {products?.length === 0 ? (
            <h1 className="searches-title">{`Showing 0 result for "${searchKeyword}".`}</h1>
          ) : (
            <h1 className="searches-title">{`Showing ${products.length} result for '${searchKeyword}'.`}</h1>
          )}
        </div>
        <div className="searches-container">
          <div className="searches">
            {products?.length > 0 &&
              products?.map((product) => {
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
