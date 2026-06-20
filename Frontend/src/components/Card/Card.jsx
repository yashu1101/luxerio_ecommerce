import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useState } from "react";


import "./Card.css";
import {
  faCartShopping,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Placeholder } from "../Placeholder/Placeholder";
import { useAddWishlist } from "../../hooks/useWishlistAction";
import { useAddCart } from "../../hooks/useCartAction";
export const Card = ({
  productId,
  src,
  title,
  rating,
  price,
  brand,
  wishlist,
  cart,
}) => {
  const {
    mutate: AddToWishlistMutate,
    isPending,
    error: wishlistError,
  } = useAddWishlist();

  const { mutate: AddCartMutate, error: cartError } = useAddCart();

  // const { AddToCart, isInCart } = useContext(CartContext);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <>
      {" "}
      <div className="card">
        <FontAwesomeIcon
          onClick={() => AddToWishlistMutate(wishlist)}
          className="card-wishlist-btn-icon-mobile"
          icon={faHeart}></FontAwesomeIcon>

        <Link to={`/view/${productId}`} className="card-image-container">
          {!isImageLoaded && (
            <div className="card-placeholder">
              <Placeholder />
            </div>
          )}

          <img
            className="card-image"
            loading="lazy"
            src={src}
            alt="img"
            onLoad={() => {
              setIsImageLoaded(true);
            }}
          />
        </Link>
        <div className="card-details">
          <div className="card-sub-details">
            <span className="product-brand">{brand}</span>
            <span className="product-rating">
              {rating}
              <FontAwesomeIcon className="rating-icon" icon={faStar}>
                {" "}
              </FontAwesomeIcon>{" "}
            </span>
          </div>
          <span className="product-title">{title}</span>

          <span className="product-price">{`₹${price}`}</span>
        </div>

        <div className="card-overlay">
          <button className="card-wishlist-btn">
            <FontAwesomeIcon
              className={`card-wishlist-btn-icon  ${"card-wishlist-btn-icon-active"} `}
              onClick={() => AddToWishlistMutate(wishlist)}
              icon={faHeart}></FontAwesomeIcon>
          </button>

          <button className="card-cart-btn">
            <FontAwesomeIcon
              onClick={() => AddCartMutate(cart)}
              className={`card-cart-btn-icon  ${"card-cart-btn-icon-active"} `}
              icon={faCartShopping}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </>
  );
};
