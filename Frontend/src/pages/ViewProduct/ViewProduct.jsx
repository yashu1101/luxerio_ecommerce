import { useParams, Link, useNavigate, Outlet } from "react-router-dom";
import "./ViewProduct.css";

import { Navbar } from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import { PopupBox } from "../../components/PopupBox/PopupBox";
import { Reviews } from "../../components/Reviews/Reviews";
import { api } from "../../api/axios";
import { useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ProductContext } from "../../Context/ProductsContext";
import { Loader } from "../../components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { Placeholder } from "../../components/Placeholder/Placeholder";

export const ViewProduct = () => {
  const { productId } = useParams();

  const { user } = useContext(AuthContext);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // api for get single product data

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await api.get(`products/${productId}`);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const navigate = useNavigate();
  // show all reviews

  const { AddToWishlist } = useContext(WishlistContext);
  const { popup } = useContext(WishlistContext);
  const { cartPopup, AddToCart } = useContext(CartContext);

  // loading
  if (isLoading) return <Loader height={"100dvh"}></Loader>;
  // console.log(data)
  return (
    <>
      <div className="product-info">
        <div className="product-images-container">
          <div className="product-images">
            {user?.role !== "admin" && (
              <button
                onClick={() => {
                  AddToWishlist(data?._id);
                }}
                className="add-to-wishlist-btn">
                <FontAwesomeIcon
                  className="wishlist-icon"
                  icon={faHeart}></FontAwesomeIcon>
              </button>
            )}

           
           <div className="product-image-wrapper" >
             {!isImageLoaded && (
            <div className="image-placeholder">
              <Placeholder />
            </div>
          )}
             <img
              className="product-image"
              src={data?.thumbnail}
              alt="img"
              onLoad={() => {
                setIsImageLoaded(true);
              }}
              style={{display: isImageLoaded ? 'block' : 'none'}}
            />
           </div>
          </div>
          {user?.role !== "admin" && (
            <div className="product-action-buttons">
              <Link
                className="product-action-button card-buy-btn"
                to={`/checkout/${data?._id}`}>
                Buy Now
              </Link>
              <button
                onClick={() => {
                  AddToCart(data?._id);
                }}
                className="product-action-button add-to-cart-btn">
                Add To Cart
              </button>
            </div>
          )}
        </div>

        {/* product detail section */}
        <div className="product-details-container">
          <h3>{data?.title}</h3>
          <p>{data?.description}</p>

          <span className="rating">
            {" "}
            <FontAwesomeIcon
              className="viewProduct-rating-icon"
              icon={faStar}></FontAwesomeIcon>{" "}
            {data?.rating}
          </span>

          <div className="pricing">
            <span className="price">₹{data?.price}</span>
          </div>

          {data?.specifications && data?.specifications?.length != 0 && (
            <div className="product-specs">
              <div className="product-specs-title-bar">
                <span className="product-specs-title">Specification</span>
              </div>
              <div className="product-specs-tab">
                {data?.specifications?.map((specs) => {
                  return (
                    <div className="specs">
                      <span className="specs-label">{specs?.key}</span>
                      <span className="specs-value">{specs?.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {user?.role !== "admin" && (
        <div className="reviews-section">
          <div className="reviews-container">
            <div className="product-reviews">
              <div>
                <Reviews
                  reviews={data?.reviews}
                  productId={productId}></Reviews>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
