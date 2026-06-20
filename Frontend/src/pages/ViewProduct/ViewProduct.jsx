import { useParams, Link, useNavigate } from "react-router-dom";
import "./ViewProduct.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";

import { Reviews } from "../../components/Reviews/Reviews";
import { api } from "../../api/axios";
import { Loader } from "../../components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { Placeholder } from "../../components/Placeholder/Placeholder";
import { useAddWishlist } from "../../hooks/useWishlistAction";
import { useUser } from "../../hooks/useUser";
import { useAddCart } from "../../hooks/useCartAction";

export const ViewProduct = () => {
  const { productId } = useParams();

  const { data: userData } = useUser();

  const { mutate: AddToWishlistMutate, isPending: addWishlistPending } =
    useAddWishlist();
  const { mutate: AddCartMutate, isPending: addCartPending } = useAddCart();

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
 

  


  // loading
  if (isLoading) return <Loader height={"100dvh"}></Loader>;

  return (
    <>
      <div className="product-info">
        <div className="product-images-container">
          <div className="product-images">
            {userData?.role !== "admin" && (
              <button
                onClick={() => {
                  AddToWishlistMutate(data?._id);
                }}
                className="add-to-wishlist-btn"
                disabled={addWishlistPending}>
                <FontAwesomeIcon
                  className="wishlist-icon"
                  icon={faHeart}></FontAwesomeIcon>
              </button>
            )}

            <div className="product-image-wrapper">
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
                style={{ display: isImageLoaded ? "block" : "none" }}
              />
            </div>
          </div>
          {userData?.role !== "admin" && (
            <div className="product-action-buttons">
              <Link
                className="product-action-button card-buy-btn"
                to={`/checkout/${data?._id}`}>
                Buy Now
              </Link>
              <button
                onClick={() => {
                  AddCartMutate(data?._id);
                }}
                className="product-action-button add-to-cart-btn"
                disabled={addCartPending}>
                  
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

      {userData?.role !== "admin" && (
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
