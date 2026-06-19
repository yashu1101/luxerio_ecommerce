import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useContext, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";

import "./Card.css";
import {
  faCartShopping,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Placeholder } from "../Placeholder/Placeholder";
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
  const { AddToWishlist, isInWishlist } = useContext(WishlistContext);
  const { AddToCart, isInCart } = useContext(CartContext);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <>
      {" "}
      <div className="card">
        <FontAwesomeIcon
          onClick={() => AddToWishlist(wishlist)}
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
              className={`card-wishlist-btn-icon  ${isInWishlist(wishlist) && "card-wishlist-btn-icon-active"} `}
              onClick={() => AddToWishlist(wishlist)}
              icon={faHeart}></FontAwesomeIcon>
          </button>

          <button className="card-cart-btn">
            <FontAwesomeIcon
              onClick={() => AddToCart(cart)}
              className={`card-cart-btn-icon  ${isInCart(cart) && "card-cart-btn-icon-active"} `}
              icon={faCartShopping}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </>
  );
};
